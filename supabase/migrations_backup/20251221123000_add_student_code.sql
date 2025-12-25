-- Create function to generate student_code
CREATE OR REPLACE FUNCTION public.generate_student_code()
RETURNS text
LANGUAGE plpgsql
AS $$
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
$$;

-- Add student_code column to student_info
ALTER TABLE public.student_info 
ADD COLUMN IF NOT EXISTS student_code text DEFAULT public.generate_student_code();

-- Add unique constraint for student_code
ALTER TABLE public.student_info
ADD CONSTRAINT student_info_student_code_key UNIQUE (student_code);

-- Update handle_new_user function to generate student_code
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
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
$$;
