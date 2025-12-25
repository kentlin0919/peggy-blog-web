-- FORCE FIX: Re-apply RLS fixes and Debug Function
-- This migration is necessary because 'supabase db pull' reverted our previous fixes
-- by re-introducing the recursive 'admin_or_self_can_select' policy.

BEGIN;

-- 1. DROP RECURSIVE POLICIES (AGAIN)
-- We strictly drop the bad policy that causes infinite recursion
DROP POLICY IF EXISTS "admin_or_self_can_select" ON "public"."user_info";

-- Drop the other overlapping policy to be clean
DROP POLICY IF EXISTS "Users can read own profile" ON "public"."user_info";

-- 2. CREATE CORRECT POLICIES
-- Ensure we have the safe policies in place

-- Users can always read their own profile
-- (using do nothing if exists would be nice, but PG doesn't support IF NOT EXISTS for policies easily without DO block)
-- So we drop and recreate to be sure.
DROP POLICY IF EXISTS "users_can_read_own_profile" ON "public"."user_info";
CREATE POLICY "users_can_read_own_profile"
ON "public"."user_info"
FOR SELECT
TO public
USING (auth.uid() = id);

-- Admins and Teachers (identity_id < 3) can read all profiles
-- Using get_identity_id() function which is SECURITY DEFINER to avoid RLS recursion
DROP POLICY IF EXISTS "staff_can_read_all_profiles" ON "public"."user_info";
CREATE POLICY "staff_can_read_all_profiles"
ON "public"."user_info"
FOR SELECT
TO public
USING (
  get_identity_id() < 3
);


-- 3. ENSURE DEBUG FUNCTION IS UP TO DATE
-- Re-apply the debug version of admin_check_email_exists just in case

CREATE OR REPLACE FUNCTION public.admin_check_email_exists(
  email_arg text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_role integer;
  email_exists boolean;
BEGIN
  -- 1. Verify the caller is a Super Admin
  current_user_role := get_identity_id();

  IF current_user_role IS DISTINCT FROM 1 THEN
    RAISE EXCEPTION 'Access Denied: Only Super Admins can check emails. Your Role ID: % (Expected: 1)', current_user_role;
  END IF;

  -- 2. Check if email exists in user_info
  SELECT EXISTS (
    SELECT 1 
    FROM public.user_info 
    WHERE email = email_arg
  ) INTO email_exists;

  RETURN email_exists;
END;
$$;

COMMIT;
