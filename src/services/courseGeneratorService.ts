
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface CourseGenerationResponse {
  courseMarkdown: string;
  success: boolean;
  error?: string;
}

export const generateCourse = async (topic: string): Promise<CourseGenerationResponse> => {
  try {
    console.log('Calling generate-course function with topic:', topic);
    
    const DEFAULT_PROMPT = `Create a comprehensive, milestone-based course roadmap for the following topic, using only free online resources accessible on the internet through scraping or public APIs. Provide an engaging title, a short description, a clear list of course goals, and 4-8 milestone modules. For each module, give a title, learning objectives, and suggest at least two *free* resources (with URLs) to help master the module. Use markdown formatting.`;
    
    const { data, error } = await supabase.functions.invoke('generate-course', {
      body: {
        prompt: DEFAULT_PROMPT,
        topic
      }
    });
    
    if (error) {
      console.error('Supabase function error:', error);
      throw new Error(error.message || "Failed to generate course");
    }
    
    if (!data || !data.courseContent) {
      throw new Error("No course content received");
    }
    
    console.log('Course generated successfully');
    
    return {
      courseMarkdown: data.courseContent,
      success: true
    };
  } catch (err: any) {
    console.error("Error generating course:", err);
    toast.error(`Error: ${err.message || "Failed to generate course"}`);
    return {
      courseMarkdown: "",
      success: false,
      error: err.message || "Unknown error occurred"
    };
  }
};
