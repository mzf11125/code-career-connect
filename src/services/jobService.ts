
import { supabase } from "@/integrations/supabase/client";

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

export interface JobFilters {
  query?: string;
  location?: string;
  limit?: number;
  offset?: number;
}

export const fetchJobs = async (filters: JobFilters = {}): Promise<Job[]> => {
  try {
    let query = supabase
      .from('jobs')
      .select('*')
      .eq('is_active', true)
      .order('posted_date', { ascending: false });

    if (filters.query) {
      query = query.or(`title.ilike.%${filters.query}%,company.ilike.%${filters.query}%,description.ilike.%${filters.query}%`);
    }

    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    if (filters.limit) {
      query = query.limit(filters.limit);
    }

    if (filters.offset) {
      query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in fetchJobs:', error);
    throw error;
  }
};

export const syncJobsFromLinkedIn = async (searchQuery?: string, location?: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('sync-linkedin-jobs', {
      body: {
        searchQuery: searchQuery || 'software engineer',
        location: location || 'United States',
        limit: 50,
      },
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error syncing jobs from LinkedIn:', error);
    throw error;
  }
};

export const getJobById = async (id: string): Promise<Job | null> => {
  try {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching job by ID:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error in getJobById:', error);
    return null;
  }
};
