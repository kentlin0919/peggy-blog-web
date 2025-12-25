-- Secure function to promote a user to Teacher
-- Only accessible by Super Admins (identity_id = 1)

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
$$;

-- Ensure the trigger exists (just in case)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'create_teacher_info_check') THEN
    CREATE TRIGGER create_teacher_info_check
    AFTER UPDATE OF identity_id ON public.user_info
    FOR EACH ROW
    WHEN (NEW.identity_id = 2)
    EXECUTE FUNCTION public.create_teacher_info_if_teacher();
  END IF;
END $$;
