
import { supabase } from "@/integrations/supabase/client";

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  learningObjectives: string[];
  resources: { title: string; url: string; type: string }[];
  estimatedTime: string;
}

export interface CourseData {
  title: string;
  description: string;
  goals: string[];
  modules: CourseModule[];
  estimatedDuration: string;
}

export interface SavedCourse {
  id: string;
  title: string;
  description: string;
  topic: string;
  content: CourseData;
  created_at: string;
  updated_at: string;
}

export interface CourseProgress {
  moduleId: string;
  completed: boolean;
  completedAt?: string;
  progressData?: any;
}

export const saveCourse = async (topic: string, courseData: CourseData): Promise<{ data: SavedCourse | null; error: string | null }> => {
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
        topic: topic,
        content: courseData
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving course:', error);
      return { data: null, error: error.message };
    }

    return { data: data as SavedCourse, error: null };
  } catch (err: any) {
    console.error('Unexpected error saving course:', err);
    return { data: null, error: err.message || "Unknown error occurred" };
  }
};

export const getUserCourses = async (): Promise<{ data: SavedCourse[] | null; error: string | null }> => {
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
      console.error('Error fetching courses:', error);
      return { data: null, error: error.message };
    }

    return { data: data as SavedCourse[], error: null };
  } catch (err: any) {
    console.error('Unexpected error fetching courses:', err);
    return { data: null, error: err.message || "Unknown error occurred" };
  }
};

export const getCourseProgress = async (courseId: string): Promise<{ data: CourseProgress[] | null; error: string | null }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: null, error: "User not authenticated" };
    }

    const { data, error } = await supabase
      .from('course_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('course_id', courseId);

    if (error) {
      console.error('Error fetching course progress:', error);
      return { data: null, error: error.message };
    }

    const progress: CourseProgress[] = data.map(item => ({
      moduleId: item.module_id,
      completed: !!item.completed_at,
      completedAt: item.completed_at,
      progressData: item.progress_data
    }));

    return { data: progress, error: null };
  } catch (err: any) {
    console.error('Unexpected error fetching progress:', err);
    return { data: null, error: err.message || "Unknown error occurred" };
  }
};

export const updateModuleProgress = async (
  courseId: string, 
  moduleId: string, 
  completed: boolean, 
  progressData?: any
): Promise<{ error: string | null }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { error: "User not authenticated" };
    }

    const { error } = await supabase
      .from('course_progress')
      .upsert({
        user_id: user.id,
        course_id: courseId,
        module_id: moduleId,
        completed_at: completed ? new Date().toISOString() : null,
        progress_data: progressData
      });

    if (error) {
      console.error('Error updating module progress:', error);
      return { error: error.message };
    }

    return { error: null };
  } catch (err: any) {
    console.error('Unexpected error updating progress:', err);
    return { error: err.message || "Unknown error occurred" };
  }
};
