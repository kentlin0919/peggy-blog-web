-- FORCE FIX: Ensure teacher_code is always generated
-- This migration creates a trigger on teacher_info to assume the teacher_code
-- is generated if it's missing, fulfilling the NOT NULL constraint.

BEGIN;

-- 1. Ensure the generator function exists (idempotent)
CREATE OR REPLACE FUNCTION public.assign_unique_teacher_code()
RETURNS trigger
LANGUAGE plpgsql
AS $$
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
$$;


-- 2. Create the Trigger on teacher_info
-- This runs BEFORE INSERT, so it populates teacher_code before the NOT NULL check.
DROP TRIGGER IF EXISTS ensure_teacher_code_trigger ON public.teacher_info;

CREATE TRIGGER ensure_teacher_code_trigger
BEFORE INSERT ON public.teacher_info
FOR EACH ROW
EXECUTE FUNCTION public.assign_unique_teacher_code();

COMMIT;
