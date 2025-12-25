-- Enable pgcrypto for password hashing if not already enabled
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Fix the handle_new_user function to default to Student (identity_id = 3)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.user_info (
    id,
    email,
    name,
    identity_id, -- CHANGED: Default to 3 (Student) instead of 1 (Super Admin)
    created_at,
    updated_at
  )
  VALUES (
  new.id,
  new.email,
  COALESCE(new.raw_user_meta_data->>'name', ''),
  3, -- CHANGED: Default to Student
  now(),
  now()
);

  RETURN new;
END;
$$;

-- 2. Create the Super Admin account if it doesn't exist
DO $$
DECLARE
  new_user_id uuid := gen_random_uuid();
  user_email text := 'kent900919@gmail.com';
  user_password text := '0919';
  encrypted_pw text;
BEGIN
  -- Check if user exists by email
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = user_email) THEN
    -- Generate hashed password
    encrypted_pw := crypt(user_password, gen_salt('bf'));

    -- Insert into auth.users
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      recovery_sent_at,
      last_sign_in_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token,
      is_super_admin
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      new_user_id,
      'authenticated',
      'authenticated',
      user_email,
      encrypted_pw,
      now(),
      now(),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"name":"Super Admin"}',
      now(),
      now(),
      '',
      '',
      '',
      '',
      false
    );

    -- Note: The trigger handle_new_user will run immediately after this INSERT.
    -- It will create a user_info record with identity_id = 3 (Student).
    
    -- Update the user_info to be Super Admin (identity_id = 1)
    UPDATE public.user_info
    SET identity_id = 1
    WHERE id = new_user_id;
    
    RAISE NOTICE 'Created Super Admin user: %', user_email;
    
  ELSE
    -- If user already exists, ensure they have Super Admin role in user_info
    UPDATE public.user_info u
    SET identity_id = 1
    FROM auth.users au
    WHERE u.id = au.id AND au.email = user_email;
    
    RAISE NOTICE 'Updated existing user to Super Admin: %', user_email;
  END IF;
END $$;
