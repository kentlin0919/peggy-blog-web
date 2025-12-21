CREATE OR REPLACE FUNCTION public.admin_check_email_exists(email_arg text)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
CREATE OR REPLACE FUNCTION public.admin_delete_user(target_user_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  current_user_role integer;
BEGIN
  -- 1. Verify Super Admin
  SELECT identity_id INTO current_user_role
  FROM public.user_info
  WHERE id = auth.uid();

  IF current_user_role IS DISTINCT FROM 1 THEN
    RAISE EXCEPTION 'Access Denied: Only Super Admins can delete users.';
  END IF;

  -- 2. Delete from auth.users
  -- This will cascade to user_info and teacher_info
  DELETE FROM auth.users
  WHERE id = target_user_id;
END;
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
CREATE OR REPLACE FUNCTION public.assign_unique_teacher_code()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
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
$function$
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

CREATE OR REPLACE FUNCTION public.generate_student_code()
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
  chars text[] := '{0,1,2,3,4,5,6,7,8,9}';
  result text := 'S';
  i integer;
  exists_check boolean;
BEGIN
  LOOP
    result := 'S';
    FOR i IN 1..6 LOOP
      result := result || chars[1+random()*(array_length(chars, 1)-1)];
    END LOOP;
    
    SELECT EXISTS(SELECT 1 FROM public.student_info WHERE student_code = result) INTO exists_check;
    
    IF NOT exists_check THEN
      RETURN result;
    END IF;
  END LOOP;
END;
CREATE OR REPLACE FUNCTION public.generate_teacher_code()
 RETURNS character
 LANGUAGE plpgsql
AS $function$
declare
  chars text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  result text := '';
  i int;
begin
  for i in 1..4 loop
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  end loop;

  return result::char(4);
end;
$function$
;

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
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
DECLARE
  v_identity_id int;
  v_teacher_code text;
  v_name text;
BEGIN
  -- Get metadata
  v_teacher_code := new.raw_user_meta_data->>'teacher_code';
  v_name := COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', new.email);
  
  -- Determine identity_id
  v_identity_id := COALESCE((new.raw_user_meta_data->>'identity_id')::int, 2);

  -- Insert into user_info
  INSERT INTO public.user_info (id, email, name, identity_id, is_active)
  VALUES (
    new.id,
    new.email,
    v_name,
    v_identity_id,
    true
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    email = EXCLUDED.email,
    name = EXCLUDED.name,
    identity_id = EXCLUDED.identity_id;

  -- If Identity is Student (2)
  IF v_identity_id = 2 THEN
    -- If teacher_code is provided, insert into student_info
    IF v_teacher_code IS NOT NULL AND v_teacher_code <> '' THEN
        INSERT INTO public.student_info (id, teacher_code, student_code)
        VALUES (new.id, v_teacher_code, public.generate_student_code())
        ON CONFLICT (id) DO UPDATE SET 
            teacher_code = EXCLUDED.teacher_code;
    END IF;
  END IF;

  RETURN new;
END;
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
