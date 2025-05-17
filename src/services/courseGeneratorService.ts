
import { toast } from "sonner";

interface CourseGenerationResponse {
  courseMarkdown: string;
  success: boolean;
  error?: string;
}

export const generateCourse = async (topic: string): Promise<CourseGenerationResponse> => {
  try {
    // This would typically call a backend API endpoint
    // For now, we'll simulate this with a frontend call
    // In production, you should replace this with a proper backend call
    
    const DEFAULT_PROMPT = `Create a comprehensive, milestone-based course roadmap for the following topic, using only free online resources accessible on the internet through scraping or public APIs. Provide an engaging title, a short description, a clear list of course goals, and 4-8 milestone modules. For each module, give a title, learning objectives, and suggest at least two *free* resources (with URLs) to help master the module. Use markdown formatting.`;
    
    const res = await fetch("/api/generate-course", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: DEFAULT_PROMPT,
        topic
      }),
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || "Failed to generate course");
    }
    
    const data = await res.json();
    
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
