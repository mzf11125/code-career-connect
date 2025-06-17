
import { supabase } from "@/integrations/supabase/client";

export interface MentorRequest {
  id: string;
  learner_id: string;
  mentor_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  message?: string;
  created_at: string;
  updated_at: string;
}

export interface ChatSession {
  id: string;
  learner_id: string;
  mentor_id: string;
  title: string;
  status: 'active' | 'closed';
  unread_count_learner: number;
  unread_count_mentor: number;
  last_message_at: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  chat_session_id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

export interface CourseEnrollment {
  id: string;
  learner_id: string;
  course_id: string;
  enrolled_at: string;
  progress_percentage: number;
  status: 'active' | 'completed' | 'paused';
}

// Mentor Request Services
export const createMentorRequest = async (mentorId: string, message?: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('mentor_requests')
      .insert({
        learner_id: user.id,
        mentor_id: mentorId,
        message: message,
      })
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating mentor request:', error);
    return { data: null, error };
  }
};

export const getMentorRequests = async (type: 'sent' | 'received') => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const column = type === 'sent' ? 'learner_id' : 'mentor_id';
    
    const { data, error } = await supabase
      .from('mentor_requests')
      .select('*')
      .eq(column, user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching mentor requests:', error);
    return { data: null, error };
  }
};

export const updateMentorRequestStatus = async (requestId: string, status: 'accepted' | 'rejected') => {
  try {
    const { data, error } = await supabase
      .from('mentor_requests')
      .update({ status })
      .eq('id', requestId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating mentor request:', error);
    return { data: null, error };
  }
};

// Chat Session Services
export const createChatSession = async (mentorId: string, learnerId: string, title?: string) => {
  try {
    const { data, error } = await supabase
      .from('chat_sessions')
      .insert({
        learner_id: learnerId,
        mentor_id: mentorId,
        title: title || 'Mentoring Session',
      })
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating chat session:', error);
    return { data: null, error };
  }
};

export const getChatSessions = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('chat_sessions')
      .select('*')
      .or(`learner_id.eq.${user.id},mentor_id.eq.${user.id}`)
      .order('last_message_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching chat sessions:', error);
    return { data: null, error };
  }
};

// Message Services
export const sendMessage = async (chatSessionId: string, content: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('messages')
      .insert({
        chat_session_id: chatSessionId,
        sender_id: user.id,
        content,
      })
      .select()
      .single();

    if (error) throw error;

    // Update last_message_at in chat session
    await supabase
      .from('chat_sessions')
      .update({ last_message_at: new Date().toISOString() })
      .eq('id', chatSessionId);

    return { data, error: null };
  } catch (error) {
    console.error('Error sending message:', error);
    return { data: null, error };
  }
};

export const getMessages = async (chatSessionId: string) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('chat_session_id', chatSessionId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching messages:', error);
    return { data: null, error };
  }
};

// Course Enrollment Services
export const enrollInCourse = async (courseId: string) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('course_enrollments')
      .insert({
        learner_id: user.id,
        course_id: courseId,
      })
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error enrolling in course:', error);
    return { data: null, error };
  }
};

export const getCourseEnrollments = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('course_enrollments')
      .select(`
        *,
        course:courses(*)
      `)
      .eq('learner_id', user.id)
      .order('enrolled_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching course enrollments:', error);
    return { data: null, error };
  }
};

export const updateCourseProgress = async (enrollmentId: string, progressPercentage: number) => {
  try {
    const { data, error } = await supabase
      .from('course_enrollments')
      .update({ 
        progress_percentage: progressPercentage,
        status: progressPercentage === 100 ? 'completed' : 'active'
      })
      .eq('id', enrollmentId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating course progress:', error);
    return { data: null, error };
  }
};
