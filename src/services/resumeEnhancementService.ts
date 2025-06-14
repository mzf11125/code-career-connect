
import { supabase } from "@/integrations/supabase/client";

export interface ResumeContent {
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  skills: string;
  experience: string;
  education: string;
  [key: string]: any;
}

export interface EnhancementRequest {
  enhancementType: 'rephrase' | 'rewrite' | 'ats_optimize' | 'custom';
  resumeContent: ResumeContent;
  userPrompt?: string;
  resumeId: string;
}

export interface EnhancementResult {
  success: boolean;
  enhancedContent?: ResumeContent;
  enhancementId?: string;
  error?: string;
}

export const enhanceResume = async (request: EnhancementRequest): Promise<EnhancementResult> => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      throw new Error('User not authenticated');
    }

    const response = await supabase.functions.invoke('enhance-resume', {
      body: request,
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (response.error) {
      throw new Error(response.error.message || 'Enhancement failed');
    }

    return response.data;
  } catch (error) {
    console.error('Resume enhancement error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

export const getResumeTemplates = async () => {
  try {
    const { data, error } = await supabase
      .from('resume_templates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching templates:', error);
    return { data: null, error };
  }
};

export const saveResume = async (resumeData: {
  title: string;
  content: ResumeContent;
  templateId?: string;
}) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('user_resumes')
      .insert({
        user_id: user.id,
        title: resumeData.title,
        content: resumeData.content,
        template_id: resumeData.templateId,
      })
      .select()
      .single();

    if (error) throw error;
    console.log('Resume saved to database:', data);
    return { data, error: null };
  } catch (error) {
    console.error('Error saving resume:', error);
    return { data: null, error };
  }
};

export const updateResumeContent = async (resumeId: string, content: ResumeContent) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('user_resumes')
      .update({
        content: content,
        updated_at: new Date().toISOString(),
      })
      .eq('id', resumeId)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) throw error;
    console.log('Resume content updated in database:', data);
    return { data, error: null };
  } catch (error) {
    console.error('Error updating resume content:', error);
    return { data: null, error };
  }
};

export const getUserResumes = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('user_resumes')
      .select(`
        *,
        template:resume_templates(name, category)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error fetching resumes:', error);
    return { data: null, error };
  }
};

export const createResumeVersion = async (resumeId: string, content: ResumeContent, changesSummary?: string) => {
  try {
    // Get the latest version number
    const { data: versions } = await supabase
      .from('resume_versions')
      .select('version_number')
      .eq('resume_id', resumeId)
      .order('version_number', { ascending: false })
      .limit(1);

    const nextVersion = versions && versions.length > 0 ? versions[0].version_number + 1 : 1;

    const { data, error } = await supabase
      .from('resume_versions')
      .insert({
        resume_id: resumeId,
        version_number: nextVersion,
        content: content,
        changes_summary: changesSummary,
        created_by_ai: true,
      })
      .select()
      .single();

    if (error) throw error;
    console.log('Resume version created:', data);
    return { data, error: null };
  } catch (error) {
    console.error('Error creating resume version:', error);
    return { data: null, error };
  }
};
