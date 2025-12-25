drop policy "staff_can_read_all_profiles" on "public"."user_info";

drop policy "users_can_read_own_profile" on "public"."user_info";

alter table "public"."teacher_info" drop constraint "teacher_info_teacher_code_unique";

alter table "public"."user_info" drop constraint "user_info_id_fkey";

alter table "public"."user_info" drop constraint "user_info_identity_unique";

drop index if exists "public"."teacher_info_teacher_code_unique";

drop index if exists "public"."user_info_identity_unique";

CREATE UNIQUE INDEX teacherinfo_teacher_code_unique ON public.teacher_info USING btree (teacher_code);

CREATE UNIQUE INDEX userinfo_identity_unique ON public.user_info USING btree (identity_id);

alter table "public"."teacher_info" add constraint "teacherinfo_teacher_code_unique" UNIQUE using index "teacherinfo_teacher_code_unique";

alter table "public"."user_info" add constraint "userinfo_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."user_info" validate constraint "userinfo_id_fkey";

alter table "public"."user_info" add constraint "userinfo_identity_unique" UNIQUE using index "userinfo_identity_unique";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.admin_promote_to_teacher(target_user_id uuid, teacher_name text, is_active boolean DEFAULT true)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  current_user_role integer;
BEGIN
  -- 1. Verify the caller is a Super Admin
  SELECT identity_id INTO current_user_role
  FROM public.user_info
  WHERE id = auth.uid();

  IF current_user_role IS DISTINCT FROM 1 THEN
    RAISE EXCEPTION 'Access Denied: Only Super Admins can promote teachers.';
  END IF;

  -- 2. Update user_info
  UPDATE public.user_info
  SET 
    identity_id = 2, -- Teacher
    name = teacher_name,
    is_active = admin_promote_to_teacher.is_active,
    updated_at = now()
  WHERE id = target_user_id;

  -- 3. Trigger logic will automatically create the teacher_info record
  -- because we changed identity_id from 3 to 2.
  -- But just in case, we can ensure it here safely (redundancy is fine if safe)
  INSERT INTO public.teacher_info (id)
  VALUES (target_user_id)
  ON CONFLICT (id) DO NOTHING;

END;
$function$
;

CREATE OR REPLACE FUNCTION public.assign_unique_teacher_code()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$declare
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
end;$function$
;

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
$function$
;

CREATE OR REPLACE FUNCTION public.has_role(target_role_name text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  -- 關聯查詢：從 userinfo 連去 identity 表，檢查名稱是否符合
  RETURN EXISTS (
    SELECT 1 
    FROM userinfo u
    JOIN identity i ON u.identity_id = i.id
    WHERE u.id = auth.uid() 
      AND i.name = target_role_name -- 比對您傳進來的名稱 (例如 'Teacher')
  );
END;
$function$
;


  create policy "Users can read own profile"
  on "public"."user_info"
  as permissive
  for select
  to public
using ((auth.uid() = id));



  create policy "admin_or_self_can_select"
  on "public"."user_info"
  as permissive
  for select
  to public
using (((id = auth.uid()) OR (EXISTS ( SELECT 1
   FROM (public.user_info me
     JOIN public.identity i ON ((i.identity_id = me.identity_id)))
  WHERE ((me.id = auth.uid()) AND (i.identity_id < 3))))));



