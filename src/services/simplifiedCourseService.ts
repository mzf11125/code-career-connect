
import { supabase } from "@/integrations/supabase/client";

export interface EnhancedCourse {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  topic: string;
  is_published?: boolean;
  is_free?: boolean;
  difficulty_level?: string;
  estimated_duration?: string;
  category?: string;
  image_url?: string;
  content: any;
  created_at: string;
  updated_at: string;
}

// Simplified course management using only existing tables
export const getPublishedCourses = async (): Promise<{ data: EnhancedCourse[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching published courses:', error);
      return { data: null, error: error.message };
    }

    // Filter for published courses (assuming all courses are published for now)
    const publishedCourses = data?.map(course => ({
      ...course,
      is_published: true,
      is_free: true,
      difficulty_level: 'beginner',
      estimated_duration: '4 weeks',
      category: 'Programming'
    })) as EnhancedCourse[];

    return { data: publishedCourses, error: null };
  } catch (err: any) {
    console.error('Unexpected error fetching courses:', err);
    return { data: null, error: err.message || "Unknown error occurred" };
  }
};

export const getMentorCourses = async (): Promise<{ data: EnhancedCourse[] | null; error: string | null }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: null, error: "User not authenticated" };
    }

    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching mentor courses:', error);
      return { data: null, error: error.message };
    }

    const mentorCourses = data?.map(course => ({
      ...course,
      is_published: false,
      is_free: true,
      difficulty_level: 'beginner',
      estimated_duration: '4 weeks',
      category: 'Programming'
    })) as EnhancedCourse[];

    return { data: mentorCourses, error: null };
  } catch (err: any) {
    console.error('Unexpected error fetching mentor courses:', err);
    return { data: null, error: err.message || "Unknown error occurred" };
  }
};

export const createCourse = async (courseData: Partial<EnhancedCourse>): Promise<{ data: EnhancedCourse | null; error: string | null }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: null, error: "User not authenticated" };
    }

    const { data, error } = await supabase
      .from('courses')
      .insert({
        user_id: user.id,
        title: courseData.title,
        description: courseData.description,
        topic: courseData.topic,
        content: courseData.content || {
          difficulty_level: courseData.difficulty_level || 'beginner',
          estimated_duration: courseData.estimated_duration,
          category: courseData.category,
          image_url: courseData.image_url,
          is_published: false,
          is_free: courseData.is_free !== false
        }
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating course:', error);
      return { data: null, error: error.message };
    }

    return { data: data as EnhancedCourse, error: null };
  } catch (err: any) {
    console.error('Unexpected error creating course:', err);
    return { data: null, error: err.message || "Unknown error occurred" };
  }
};
