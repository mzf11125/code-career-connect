
export interface Job {
  id: string;
  external_id?: string;
  title: string;
  company: string;
  location: string;
  job_type?: string;
  description?: string;
  posted_date?: string;
  url?: string;
  skills?: string[];
  responsibilities?: string;
  requirements?: string;
  salary_range?: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}
