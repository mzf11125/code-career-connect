
import { supabase } from "@/integrations/supabase/client";

export interface CourseModule {
  id: string;
  course_id: string;
  title: string;
  description?: string;
  order_index: number;
  video_url?: string;
  content?: string;
  estimated_duration?: string;
  created_at: string;
  updated_at: string;
}

export interface Quiz {
  id: string;
  module_id: string;
  title: string;
  description?: string;
  passing_score: number;
  created_at: string;
  updated_at: string;
}

export interface QuizQuestion {
  id: string;
  quiz_id: string;
  question: string;
  question_type: 'multiple_choice' | 'true_false' | 'short_answer';
  options?: string[];
  correct_answer: string;
  explanation?: string;
  points: number;
  order_index: number;
}

export interface LearningResource {
  id: string;
  module_id: string;
  title: string;
  description?: string;
  resource_type: 'pdf' | 'link' | 'video' | 'document';
  url: string;
  order_index: number;
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  answers: Record<string, any>;
  completed_at: string;
  passed: boolean;
}

export interface StudentModuleProgress {
  id: string;
  user_id: string;
  module_id: string;
  completed: boolean;
  video_watched: boolean;
  quiz_passed: boolean;
  last_accessed: string;
  completed_at?: string;
}

export interface EnhancedCourse {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  topic: string;
  is_published: boolean;
  is_free: boolean;
  difficulty_level: string;
  estimated_duration?: string;
  category?: string;
  image_url?: string;
  content: any;
  created_at: string;
  updated_at: string;
  modules?: CourseModule[];
}

// Course Management
export const getPublishedCourses = async (): Promise<{ data: EnhancedCourse[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching published courses:', error);
      return { data: null, error: error.message };
    }

    return { data: data as EnhancedCourse[], error: null };
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

    return { data: data as EnhancedCourse[], error: null };
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
        difficulty_level: courseData.difficulty_level || 'beginner',
        estimated_duration: courseData.estimated_duration,
        category: courseData.category,
        image_url: courseData.image_url,
        is_published: false,
        is_free: courseData.is_free !== false,
        content: courseData.content || {}
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

// Module Management - Using generic supabase queries
export const getCourseModules = async (courseId: string): Promise<{ data: CourseModule[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase.rpc('select_course_modules', {
      p_course_id: courseId
    });

    if (error) {
      console.error('Error fetching course modules:', error);
      return { data: null, error: error.message };
    }

    return { data: data as CourseModule[], error: null };
  } catch (err: any) {
    console.error('Unexpected error fetching modules:', err);
    return { data: null, error: err.message || "Unknown error occurred" };
  }
};

export const createModule = async (moduleData: Partial<CourseModule>): Promise<{ data: CourseModule | null; error: string | null }> => {
  try {
    const { data, error } = await supabase.rpc('insert_course_module', {
      p_course_id: moduleData.course_id,
      p_title: moduleData.title,
      p_description: moduleData.description,
      p_order_index: moduleData.order_index,
      p_video_url: moduleData.video_url,
      p_content: moduleData.content,
      p_estimated_duration: moduleData.estimated_duration
    });

    if (error) {
      console.error('Error creating module:', error);
      return { data: null, error: error.message };
    }

    return { data: data as CourseModule, error: null };
  } catch (err: any) {
    console.error('Unexpected error creating module:', err);
    return { data: null, error: err.message || "Unknown error occurred" };
  }
};

// Quiz Management
export const getModuleQuiz = async (moduleId: string): Promise<{ data: Quiz | null; error: string | null }> => {
  try {
    const { data, error } = await supabase.rpc('select_module_quiz', {
      p_module_id: moduleId
    });

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching quiz:', error);
      return { data: null, error: error.message };
    }

    return { data: data as Quiz || null, error: null };
  } catch (err: any) {
    console.error('Unexpected error fetching quiz:', err);
    return { data: null, error: err.message || "Unknown error occurred" };
  }
};

export const getQuizQuestions = async (quizId: string): Promise<{ data: QuizQuestion[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase.rpc('select_quiz_questions', {
      p_quiz_id: quizId
    });

    if (error) {
      console.error('Error fetching quiz questions:', error);
      return { data: null, error: error.message };
    }

    return { data: data as QuizQuestion[], error: null };
  } catch (err: any) {
    console.error('Unexpected error fetching quiz questions:', err);
    return { data: null, error: err.message || "Unknown error occurred" };
  }
};

export const submitQuizAttempt = async (quizId: string, answers: Record<string, any>, score: number, passed: boolean): Promise<{ data: QuizAttempt | null; error: string | null }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: null, error: "User not authenticated" };
    }

    const { data, error } = await supabase.rpc('insert_quiz_attempt', {
      p_user_id: user.id,
      p_quiz_id: quizId,
      p_score: score,
      p_answers: answers,
      p_passed: passed
    });

    if (error) {
      console.error('Error submitting quiz attempt:', error);
      return { data: null, error: error.message };
    }

    return { data: data as QuizAttempt, error: null };
  } catch (err: any) {
    console.error('Unexpected error submitting quiz:', err);
    return { data: null, error: err.message || "Unknown error occurred" };
  }
};

// Progress Management
export const updateModuleProgress = async (
  moduleId: string,
  updates: Partial<StudentModuleProgress>
): Promise<{ error: string | null }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { error: "User not authenticated" };
    }

    const { error } = await supabase.rpc('upsert_module_progress', {
      p_user_id: user.id,
      p_module_id: moduleId,
      p_completed: updates.completed,
      p_video_watched: updates.video_watched,
      p_quiz_passed: updates.quiz_passed
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

export const getModuleProgress = async (moduleId: string): Promise<{ data: StudentModuleProgress | null; error: string | null }> => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { data: null, error: "User not authenticated" };
    }

    const { data, error } = await supabase.rpc('select_module_progress', {
      p_user_id: user.id,
      p_module_id: moduleId
    });

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching module progress:', error);
      return { data: null, error: error.message };
    }

    return { data: data as StudentModuleProgress || null, error: null };
  } catch (err: any) {
    console.error('Unexpected error fetching progress:', err);
    return { data: null, error: err.message || "Unknown error occurred" };
  }
};

// Learning Resources
export const getModuleResources = async (moduleId: string): Promise<{ data: LearningResource[] | null; error: string | null }> => {
  try {
    const { data, error } = await supabase.rpc('select_learning_resources', {
      p_module_id: moduleId
    });

    if (error) {
      console.error('Error fetching learning resources:', error);
      return { data: null, error: error.message };
    }

    return { data: data as LearningResource[], error: null };
  } catch (err: any) {
    console.error('Unexpected error fetching resources:', err);
    return { data: null, error: err.message || "Unknown error occurred" };
  }
};
