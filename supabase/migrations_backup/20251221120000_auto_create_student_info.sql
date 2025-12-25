-- Create student_info table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.student_info (
    id uuid PRIMARY KEY REFERENCES public.user_info(id) ON DELETE CASCADE,
    teacher_code text NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    CONSTRAINT fk_student_teacher_code FOREIGN KEY (teacher_code) REFERENCES public.teacher_info(teacher_code) ON DELETE CASCADE
);

-- Enable RLS for student_info
ALTER TABLE public.student_info ENABLE ROW LEVEL SECURITY;

-- Create policy for student_info (view own info)
DROP POLICY IF EXISTS "Users can view own student info" ON public.student_info;
CREATE POLICY "Users can view own student info" ON public.student_info
    FOR SELECT USING (auth.uid() = id);

-- Create policy for teachers to view their students
DROP POLICY IF EXISTS "Teachers can view their students" ON public.student_info;
CREATE POLICY "Teachers can view their students" ON public.student_info
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.teacher_info ti
            WHERE ti.id = auth.uid()
            AND ti.teacher_code = public.student_info.teacher_code
        )
    );

-- Update handle_new_user function
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
        INSERT INTO public.student_info (id, teacher_code)
        VALUES (new.id, v_teacher_code)
        ON CONFLICT (id) DO UPDATE SET teacher_code = EXCLUDED.teacher_code;
    END IF;
  END IF;

  RETURN new;
END;
$$;
