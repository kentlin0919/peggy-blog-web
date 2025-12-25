-- Create RPC to delete a user (for rollback purposes)
-- accessible only by Super Admin

CREATE OR REPLACE FUNCTION public.admin_delete_user(target_user_id uuid)
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
    RAISE EXCEPTION 'Access Denied: Only Super Admins can delete users.';
  END IF;

  -- 2. Delete from auth.users
  -- This will cascade to user_info and teacher_info
  DELETE FROM auth.users
  WHERE id = target_user_id;
END;
$$;
