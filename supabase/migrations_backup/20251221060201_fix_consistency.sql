-- Migration to fix remote schema inconsistencies (renaming userinfo -> user_info style constraints)
-- This uses DO blocks to check existence so it won't fail on local DB where things are already correct.

DO $$
BEGIN
    -- 1. Fix Constraint Names on user_info
    
    -- Rename PK constraint if it has the "wrong" name
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'userinfo_pkey' AND conrelid = 'public.user_info'::regclass) THEN
        ALTER TABLE "public"."user_info" RENAME CONSTRAINT "userinfo_pkey" TO "user_info_pkey";
    END IF;

    -- Rename Email Unique index/constraint
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'userinfo_email_unique' AND conrelid = 'public.user_info'::regclass) THEN
        ALTER TABLE "public"."user_info" RENAME CONSTRAINT "userinfo_email_unique" TO "user_info_email_unique";
    END IF;
    IF EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'userinfo_email_unique') THEN
        ALTER INDEX "public"."userinfo_email_unique" RENAME TO "user_info_email_unique";
    END IF;

    -- Rename Identity Unique index/constraint
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'userinfo_identity_unique' AND conrelid = 'public.user_info'::regclass) THEN
        ALTER TABLE "public"."user_info" RENAME CONSTRAINT "userinfo_identity_unique" TO "user_info_identity_unique";
    END IF;
    IF EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'userinfo_identity_unique') THEN
        ALTER INDEX "public"."userinfo_identity_unique" RENAME TO "user_info_identity_unique";
    END IF;

    -- Rename FK constraint
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'userinfo_id_fkey' AND conrelid = 'public.user_info'::regclass) THEN
        ALTER TABLE "public"."user_info" RENAME CONSTRAINT "userinfo_id_fkey" TO "user_info_id_fkey";
    END IF;


    -- 2. Fix Constraint Names on teacher_info
    
    IF EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'teacherinfo_teacher_code_unique' AND conrelid = 'public.teacher_info'::regclass) THEN
        ALTER TABLE "public"."teacher_info" RENAME CONSTRAINT "teacherinfo_teacher_code_unique" TO "teacher_info_teacher_code_unique";
    END IF;
    IF EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'teacherinfo_teacher_code_unique') THEN
        ALTER INDEX "public"."teacherinfo_teacher_code_unique" RENAME TO "teacher_info_teacher_code_unique";
    END IF;

END $$;

-- 3. Replace Functions to ensure they reference snake_case tables correctly
-- (This is safe to run even if already correct, as it's CREATE OR REPLACE)

CREATE OR REPLACE FUNCTION public.get_identity_id()
 RETURNS integer
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $func$
DECLARE
  result_id INTEGER;
BEGIN
  -- Explicitly use user_info
  SELECT identity_id INTO result_id
  FROM user_info
  WHERE id = auth.uid();
  
  RETURN result_id;
END;
$func$;

CREATE OR REPLACE FUNCTION public.has_role(target_role_name text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $func$
BEGIN
  -- Explicitly use user_info
  RETURN EXISTS (
    SELECT 1 
    FROM user_info u
    JOIN identity i ON u.identity_id = i.identity_id
    WHERE u.id = auth.uid() 
      AND i.name = target_role_name
  );
END;
$func$;

-- Fix create_teacher_info_if_teacher (Restore original name and logic)
-- Drop the potential "no underscore" version if it exists
DROP FUNCTION IF EXISTS public.create_teacherinfo_if_teacher();

CREATE OR REPLACE FUNCTION public.create_teacher_info_if_teacher()
 RETURNS trigger
 LANGUAGE plpgsql
AS $func$
begin
  -- identity_id = 2 代表老師
  if new.identity_id = 2 then
    insert into public.teacher_info (id)
    values (new.id)
    on conflict (id) do nothing;
  end if;

  return new;
end;
$func$;

-- Assign Unique Teacher Code
CREATE OR REPLACE FUNCTION public.assign_unique_teacher_code()
 RETURNS trigger
 LANGUAGE plpgsql
AS $func$
declare
  new_code char(4);
begin
  if new.teacher_code is null then
    loop
      new_code := public.generate_teacher_code();
      exit when not exists (
        select 1 from public.teacher_info
        where teacher_code = new_code
      );
    end loop;

    new.teacher_code := new_code;
  end if;

  return new;
end;
$func$;
