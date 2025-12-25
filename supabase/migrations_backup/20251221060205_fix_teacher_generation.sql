-- Fix trigger function to generate teacher_code
CREATE OR REPLACE FUNCTION public.create_teacher_info_if_teacher()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.teacher_info (id, teacher_code)
  VALUES (NEW.id, public.generate_teacher_code())
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Update RPC to handle teacher_code correctly
CREATE OR REPLACE FUNCTION public.admin_promote_to_teacher(
  target_user_id uuid,
  teacher_name text,
  is_active boolean DEFAULT true
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_user_role integer;
BEGIN
  -- 1. Verify Super Admin
  SELECT identity_id INTO current_user_role
  FROM public.user_info
  WHERE id = auth.uid();

  IF current_user_role IS DISTINCT FROM 1 THEN
    RAISE EXCEPTION 'Access Denied: Only Super Admins can promote teachers.';
  END IF;

  -- 2. Update user_info
  -- This will fire the trigger create_teacher_info_check
  UPDATE public.user_info
  SET 
    identity_id = 2, -- Teacher
    name = teacher_name,
    is_active = admin_promote_to_teacher.is_active,
    updated_at = now()
  WHERE id = target_user_id;

  -- 3. Ensure teacher_info exists check
  IF NOT EXISTS (SELECT 1 FROM public.teacher_info WHERE id = target_user_id) THEN
      INSERT INTO public.teacher_info (id, teacher_code)
      VALUES (target_user_id, public.generate_teacher_code());
  END IF;

END;
$$;
