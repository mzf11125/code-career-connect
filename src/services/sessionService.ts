
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Session {
  id: string;
  mentor_id: string;
  learner_id: string;
  scheduled_at: string;
  duration_minutes: number;
  meet_link?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  created_at: string;
  updated_at: string;
  mentor_name?: string;
  learner_name?: string;
}

export const createSession = async (sessionData: {
  mentor_id: string;
  scheduled_at: string;
  duration_minutes?: number;
  notes?: string;
}) => {
  try {
    // Get current user
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Not authenticated');

    // Generate a Google Meet link (simplified - in production you'd use Google Meet API)
    const meetLink = `https://meet.google.com/${Math.random().toString(36).substring(2, 15)}`;
    
    const { data, error } = await supabase
      .from('sessions')
      .insert({
        mentor_id: sessionData.mentor_id,
        learner_id: user.user.id,
        scheduled_at: sessionData.scheduled_at,
        duration_minutes: sessionData.duration_minutes || 60,
        meet_link: meetLink,
        notes: sessionData.notes,
      })
      .select()
      .single();

    if (error) throw error;

    // Create a chat session for the booking
    await supabase
      .from('chat_sessions')
      .insert({
        mentor_id: sessionData.mentor_id,
        learner_id: user.user.id,
        title: `Session Discussion - ${new Date(sessionData.scheduled_at).toLocaleDateString()}`,
      });

    return { data, error: null };
  } catch (error) {
    console.error('Error creating session:', error);
    return { data: null, error };
  }
};

export const getUserSessions = async (userType: 'mentor' | 'learner') => {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user.user) throw new Error('Not authenticated');

    const column = userType === 'mentor' ? 'mentor_id' : 'learner_id';
    
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq(column, user.user.id)
      .order('scheduled_at', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching sessions:', error);
    return { data: null, error };
  }
};

export const updateSessionStatus = async (sessionId: string, status: 'scheduled' | 'completed' | 'cancelled') => {
  try {
    const { data, error } = await supabase
      .from('sessions')
      .update({ status })
      .eq('id', sessionId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating session:', error);
    return { data: null, error };
  }
};

export const checkMentorAvailability = async (mentorId: string, scheduledAt: string, duration: number = 60) => {
  try {
    const startTime = new Date(scheduledAt);
    const endTime = new Date(startTime.getTime() + duration * 60000);

    const { data, error } = await supabase
      .from('sessions')
      .select('id')
      .eq('mentor_id', mentorId)
      .eq('status', 'scheduled')
      .gte('scheduled_at', startTime.toISOString())
      .lt('scheduled_at', endTime.toISOString());

    if (error) throw error;
    return { available: data.length === 0, error: null };
  } catch (error) {
    console.error('Error checking availability:', error);
    return { available: false, error };
  }
};
