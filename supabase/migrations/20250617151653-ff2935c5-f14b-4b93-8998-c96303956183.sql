
-- Drop the existing enum constraint and recreate it with the correct values
ALTER TABLE public.user_roles DROP CONSTRAINT IF EXISTS user_roles_role_check;

-- Add a new check constraint that allows the roles your application actually uses
ALTER TABLE public.user_roles ADD CONSTRAINT user_roles_role_check 
CHECK (role IN ('mentor', 'learner', 'student'));

-- Also update the enum type to include all valid roles
DROP TYPE IF EXISTS public.app_role CASCADE;
CREATE TYPE public.app_role AS ENUM ('mentor', 'learner', 'student');
