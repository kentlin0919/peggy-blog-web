-- Fix: Remove incorrect UNIQUE constraint on identity_id
-- This constraint prevents having multiple users with the same role (e.g., multiple teachers).

BEGIN;

ALTER TABLE public.user_info
DROP CONSTRAINT IF EXISTS userinfo_identity_unique;

-- Also verify if there are other incorrect unique constraints
-- But specifically 'userinfo_identity_unique' is the one reported in the error.

COMMIT;
