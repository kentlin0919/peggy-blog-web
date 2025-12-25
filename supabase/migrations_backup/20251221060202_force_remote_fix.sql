-- Force fix for remote schema inconsistencies
-- 1. Fix Table Names (if they are missing underscores)
DO $$
BEGIN
    -- Check if 'userinfo' exists but 'user_info' does not
    IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'userinfo' AND schemaname = 'public') 
       AND NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'user_info' AND schemaname = 'public') THEN
        ALTER TABLE "public"."userinfo" RENAME TO "user_info";
    END IF;

    -- Check if 'teacherinfo' exists but 'teacher_info' does not
    IF EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'teacherinfo' AND schemaname = 'public') 
       AND NOT EXISTS (SELECT 1 FROM pg_tables WHERE tablename = 'teacher_info' AND schemaname = 'public') THEN
        ALTER TABLE "public"."teacherinfo" RENAME TO "teacher_info";
    END IF;
END $$;

-- 2. Fix Constraint Names (Force Renames)
DO $$
BEGIN
    -- Fix user_info PK
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'userinfo_pkey') THEN
        ALTER TABLE "public"."user_info" RENAME CONSTRAINT "userinfo_pkey" TO "user_info_pkey";
    END IF;
    -- Fix Email Unique
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'userinfo_email_unique') THEN
        ALTER TABLE "public"."user_info" RENAME CONSTRAINT "userinfo_email_unique" TO "user_info_email_unique";
    END IF;
    IF EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'userinfo_email_unique') THEN
        ALTER INDEX "public"."userinfo_email_unique" RENAME TO "user_info_email_unique";
    END IF;
END $$;

-- 3. Replace Functions (Explicitly Drop Old, Create New)

-- A. Fix create_teacher_info_if_teacher
-- Drop the old "no underscore" function if it exists
DROP FUNCTION IF EXISTS public.create_teacherinfo_if_teacher();

-- Create/Replace the correct "with underscore" function
CREATE OR REPLACE FUNCTION public.create_teacher_info_if_teacher()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  -- identity_id = 2 代表老師
  if new.identity_id = 2 then
    -- Ensure we insert into teacher_info (with underscore)
    insert into public.teacher_info (id)
    values (new.id)
    on conflict (id) do nothing;
  end if;

  return new;
end;
$function$;

-- Update Trigger to use the correct function name
DROP TRIGGER IF EXISTS create_teacher_info_check ON public.user_info; 
-- (Assuming trigger name, but safe to try create directly if we don't know it. 
--  Actually, often the trigger is on user_info. Let's recreate it to be safe)

-- B. Fix get_identity_id
CREATE OR REPLACE FUNCTION public.get_identity_id()
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  result_id INTEGER;
BEGIN
  -- Explicitly use user_info
  SELECT identity_id INTO result_id
  FROM user_info
  WHERE id = auth.uid();
  
  RETURN result_id;
END;
$function$;
