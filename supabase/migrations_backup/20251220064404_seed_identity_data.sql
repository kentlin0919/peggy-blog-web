INSERT INTO public.identity (identity_id, name)
VALUES 
  (1, 'Super admin'),
  (2, 'teacher'),
  (3, 'student')
ON CONFLICT (identity_id) DO UPDATE SET name = EXCLUDED.name;
