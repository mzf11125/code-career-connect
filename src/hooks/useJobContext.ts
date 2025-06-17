
import { useState, useEffect } from 'react';

export interface JobContext {
  jobTitle?: string;
  company?: string;
  description?: string;
  requirements?: string;
  responsibilities?: string;
  skills?: string[];
}

export const useJobContext = () => {
  const [jobContext, setJobContext] = useState<JobContext | null>(null);

  useEffect(() => {
    const storedContext = localStorage.getItem('resumeJobContext');
    if (storedContext) {
      try {
        setJobContext(JSON.parse(storedContext));
      } catch (error) {
        console.error('Error parsing job context:', error);
        localStorage.removeItem('resumeJobContext');
      }
    }
  }, []);

  const clearJobContext = () => {
    localStorage.removeItem('resumeJobContext');
    setJobContext(null);
  };

  const getOptimizedSummary = (): string => {
    if (!jobContext) return '';
    
    const { jobTitle, company, skills } = jobContext;
    const skillsText = skills?.length ? ` with expertise in ${skills.slice(0, 3).join(', ')}` : '';
    
    return `Motivated professional seeking ${jobTitle || 'opportunities'} at ${company || 'innovative companies'}${skillsText}. Proven track record of delivering high-quality results and collaborating effectively in dynamic environments.`;
  };

  const getOptimizedSkills = (): string => {
    if (!jobContext?.skills) return '';
    return jobContext.skills.join(', ');
  };

  return {
    jobContext,
    clearJobContext,
    getOptimizedSummary,
    getOptimizedSkills,
    hasJobContext: !!jobContext,
  };
};
