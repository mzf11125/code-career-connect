
-- Create jobs table to replace hardcoded data
CREATE TABLE public.jobs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  external_id TEXT UNIQUE, -- LinkedIn job ID for deduplication
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  job_type TEXT,
  description TEXT,
  posted_date DATE,
  url TEXT,
  skills TEXT[], -- Array of required skills
  responsibilities TEXT,
  requirements TEXT,
  salary_range TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN DEFAULT true
);

-- Add Row Level Security (RLS)
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access to active jobs
CREATE POLICY "Anyone can view active jobs" 
  ON public.jobs 
  FOR SELECT 
  USING (is_active = true);

-- Create policy for authenticated users to manage jobs (for admin/sync purposes)
CREATE POLICY "Authenticated users can manage jobs" 
  ON public.jobs 
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Create trigger for updated_at
CREATE TRIGGER handle_jobs_updated_at 
  BEFORE UPDATE ON public.jobs 
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Create index for better query performance
CREATE INDEX idx_jobs_external_id ON public.jobs(external_id);
CREATE INDEX idx_jobs_location ON public.jobs(location);
CREATE INDEX idx_jobs_company ON public.jobs(company);
CREATE INDEX idx_jobs_posted_date ON public.jobs(posted_date DESC);

-- Create function for job deduplication
CREATE OR REPLACE FUNCTION public.upsert_job(
  p_external_id TEXT,
  p_title TEXT,
  p_company TEXT,
  p_location TEXT,
  p_job_type TEXT,
  p_description TEXT,
  p_posted_date DATE,
  p_url TEXT,
  p_skills TEXT[],
  p_responsibilities TEXT,
  p_requirements TEXT,
  p_salary_range TEXT
) RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  job_id UUID;
BEGIN
  INSERT INTO public.jobs (
    external_id, title, company, location, job_type, description,
    posted_date, url, skills, responsibilities, requirements, salary_range
  ) VALUES (
    p_external_id, p_title, p_company, p_location, p_job_type, p_description,
    p_posted_date, p_url, p_skills, p_responsibilities, p_requirements, p_salary_range
  )
  ON CONFLICT (external_id) 
  DO UPDATE SET
    title = EXCLUDED.title,
    company = EXCLUDED.company,
    location = EXCLUDED.location,
    job_type = EXCLUDED.job_type,
    description = EXCLUDED.description,
    posted_date = EXCLUDED.posted_date,
    url = EXCLUDED.url,
    skills = EXCLUDED.skills,
    responsibilities = EXCLUDED.responsibilities,
    requirements = EXCLUDED.requirements,
    salary_range = EXCLUDED.salary_range,
    updated_at = now(),
    is_active = true
  RETURNING id INTO job_id;
  
  RETURN job_id;
END;
$$;
