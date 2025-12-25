-- Secure function to check if email exists
-- Only accessible by Super Admins (identity_id = 1)

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
  SELECT identity_id INTO current_user_role
  FROM public.user_info
  WHERE id = auth.uid();

  IF current_user_role IS DISTINCT FROM 1 THEN
    RAISE EXCEPTION 'Access Denied: Only Super Admins can check emails.';
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
