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

// Course Management - Using existing courses table
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

    // Map the courses to include enhanced properties
    const enhancedCourses = data?.map(course => ({
      ...course,
      is_published: true,
      is_free: true,
      difficulty_level: 'beginner',
      estimated_duration: '4 weeks',
      category: 'Programming'
    })) as EnhancedCourse[];

    return { data: enhancedCourses, error: null };
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

    const enhancedCourses = data?.map(course => ({
      ...course,
      is_published: false,
      is_free: true,
      difficulty_level: 'beginner',
      estimated_duration: '4 weeks',
      category: 'Programming'
    })) as EnhancedCourse[];

    return { data: enhancedCourses, error: null };
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

// Placeholder functions for future implementation when database types are synced
export const getCourseModules = async (courseId: string): Promise<{ data: CourseModule[] | null; error: string | null }> => {
  console.log('getCourseModules placeholder - courseId:', courseId);
  return { data: [], error: null };
};

export const createModule = async (moduleData: Partial<CourseModule>): Promise<{ data: CourseModule | null; error: string | null }> => {
  console.log('createModule placeholder - moduleData:', moduleData);
  return { data: null, error: "Feature not yet implemented" };
};

export const getModuleQuiz = async (moduleId: string): Promise<{ data: Quiz | null; error: string | null }> => {
  console.log('getModuleQuiz placeholder - moduleId:', moduleId);
  return { data: null, error: null };
};

export const getQuizQuestions = async (quizId: string): Promise<{ data: QuizQuestion[] | null; error: string | null }> => {
  console.log('getQuizQuestions placeholder - quizId:', quizId);
  return { data: [], error: null };
};

export const submitQuizAttempt = async (quizId: string, answers: Record<string, any>, score: number, passed: boolean): Promise<{ data: QuizAttempt | null; error: string | null }> => {
  console.log('submitQuizAttempt placeholder - quizId:', quizId, 'score:', score, 'passed:', passed);
  return { data: null, error: "Feature not yet implemented" };
};

export const updateModuleProgress = async (
  moduleId: string,
  updates: Partial<StudentModuleProgress>
): Promise<{ error: string | null }> => {
  console.log('updateModuleProgress placeholder - moduleId:', moduleId, 'updates:', updates);
  return { error: null };
};

export const getModuleProgress = async (moduleId: string): Promise<{ data: StudentModuleProgress | null; error: string | null }> => {
  console.log('getModuleProgress placeholder - moduleId:', moduleId);
  return { data: null, error: null };
};

export const getModuleResources = async (moduleId: string): Promise<{ data: LearningResource[] | null; error: string | null }> => {
  console.log('getModuleResources placeholder - moduleId:', moduleId);
  return { data: [], error: null };
};
