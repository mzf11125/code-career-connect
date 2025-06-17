
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Mentor {
  id: string;
  user_id: string;
  name: string;
  role: string;
  bio?: string;
  expertise: string[];
  rating: number;
  review_count: number;
  image_url?: string;
  hourly_rate?: number;
  availability_schedule?: any;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}

export const getAllMentors = async () => {
  try {
    const { data, error } = await supabase
      .from('mentors')
      .select('*')
      .eq('is_available', true)
      .order('rating', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching mentors:', error);
    return { data: null, error };
  }
};

export const getMentorById = async (mentorId: string) => {
  try {
    const { data, error } = await supabase
      .from('mentors')
      .select('*')
      .eq('id', mentorId)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching mentor:', error);
    return { data: null, error };
  }
};

export const searchMentors = async (query: string) => {
  try {
    const { data, error } = await supabase
      .from('mentors')
      .select('*')
      .eq('is_available', true)
      .or(`name.ilike.%${query}%,role.ilike.%${query}%,expertise.cs.{${query}}`)
      .order('rating', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error searching mentors:', error);
    return { data: null, error };
  }
};
