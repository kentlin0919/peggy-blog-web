-- Fix infinite recursion in user_info table policy
-- The previous policy 'admin_or_self_can_select' queried user_info table directly which triggered RLS recursively.
-- We replace it with a policy that uses the 'get_identity_id()' SECURITY DEFINER function to verify roles.

BEGIN;

-- Drop the recursive policy
DROP POLICY IF EXISTS "admin_or_self_can_select" ON "public"."user_info";

-- Drop the other overlapping policy if it exists (good practice to clean up)
DROP POLICY IF EXISTS "Users can read own profile" ON "public"."user_info";

-- Create specific policies

-- 1. Users can always read their own profile
CREATE POLICY "users_can_read_own_profile"
ON "public"."user_info"
FOR SELECT
TO public
USING (auth.uid() = id);

-- 2. Admins and Teachers (identity_id < 3) can read all profiles
-- Assumption: identity_id 1 = Admin, 2 = Teacher, 3 = Student. So < 3 includes Admin and Teacher.
-- Using get_identity_id() function which is SECURITY DEFINER to avoid RLS recursion
CREATE POLICY "staff_can_read_all_profiles"
ON "public"."user_info"
FOR SELECT
TO public
USING (
  get_identity_id() < 3
);

COMMIT;
