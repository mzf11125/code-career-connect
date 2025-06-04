
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { saveCourse, CourseData, CourseModule } from "./courseService";

interface CourseGenerationResponse {
  courseMarkdown: string;
  courseData: CourseData | null;
  courseId: string | null;
  success: boolean;
  error?: string;
}

const parseMarkdownToCourseData = (markdown: string): CourseData | null => {
  try {
    const lines = markdown.split('\n');
    let title = '';
    let description = '';
    const goals: string[] = [];
    const modules: CourseModule[] = [];
    
    let currentSection = '';
    let currentModule: Partial<CourseModule> = {};
    let currentModuleIndex = 0;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Extract title (first # heading)
      if (line.startsWith('# ') && !title) {
        title = line.substring(2).trim();
        continue;
      }
      
      // Extract description (text after title before goals)
      if (!line.startsWith('#') && !line.startsWith('-') && !line.startsWith('*') && line.length > 0 && title && !description && !line.includes('Goal') && !line.includes('Module')) {
        description = line;
        continue;
      }
      
      // Extract goals
      if (line.toLowerCase().includes('goal') && line.startsWith('#')) {
        currentSection = 'goals';
        continue;
      }
      
      if (currentSection === 'goals' && (line.startsWith('- ') || line.startsWith('* '))) {
        goals.push(line.substring(2).trim());
        continue;
      }
      
      // Extract modules
      if (line.toLowerCase().includes('module') && line.startsWith('#')) {
        if (currentModule.title) {
          modules.push({
            id: `module-${currentModuleIndex}`,
            title: currentModule.title || '',
            description: currentModule.description || '',
            learningObjectives: currentModule.learningObjectives || [],
            resources: currentModule.resources || [],
            estimatedTime: '15-30 minutes'
          });
          currentModuleIndex++;
        }
        
        currentModule = {
          title: line.replace(/#+\s*/, '').trim(),
          description: '',
          learningObjectives: [],
          resources: []
        };
        currentSection = 'module';
        continue;
      }
      
      if (currentSection === 'module' && currentModule.title) {
        if (!line.startsWith('#') && !line.startsWith('-') && !line.startsWith('*') && line.length > 0 && !currentModule.description) {
          currentModule.description = line;
        } else if (line.startsWith('- ') || line.startsWith('* ')) {
          const content = line.substring(2).trim();
          if (content.includes('http')) {
            // It's a resource
            const urlMatch = content.match(/\[(.*?)\]\((.*?)\)/);
            if (urlMatch) {
              currentModule.resources = currentModule.resources || [];
              currentModule.resources.push({
                title: urlMatch[1],
                url: urlMatch[2],
                type: 'article'
              });
            } else if (content.includes('http')) {
              // Simple URL format
              currentModule.resources = currentModule.resources || [];
              currentModule.resources.push({
                title: content.split('http')[0].trim() || 'Resource',
                url: content.includes('http') ? content.substring(content.indexOf('http')) : content,
                type: 'article'
              });
            }
          } else {
            // It's a learning objective
            currentModule.learningObjectives = currentModule.learningObjectives || [];
            currentModule.learningObjectives.push(content);
          }
        }
      }
    }
    
    // Add the last module
    if (currentModule.title) {
      modules.push({
        id: `module-${currentModuleIndex}`,
        title: currentModule.title,
        description: currentModule.description || '',
        learningObjectives: currentModule.learningObjectives || [],
        resources: currentModule.resources || [],
        estimatedTime: '15-30 minutes'
      });
    }
    
    return {
      title: title || 'Generated Course',
      description: description || 'AI-generated course content',
      goals,
      modules,
      estimatedDuration: `${modules.length * 20} minutes`
    };
  } catch (error) {
    console.error('Error parsing markdown:', error);
    return null;
  }
};

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
    
    console.log('Course generated successfully, parsing content...');
    console.log('Generated content:', data.courseContent);
    
    // Parse the markdown into structured data
    const courseData = parseMarkdownToCourseData(data.courseContent);
    
    // Always return the markdown content, even if parsing fails
    let savedCourse = null;
    let saveError = null;
    
    // Try to save the course if we have structured data
    if (courseData) {
      const saveResult = await saveCourse(topic, courseData);
      savedCourse = saveResult.data;
      saveError = saveResult.error;
      
      if (saveError) {
        console.error('Error saving course:', saveError);
      } else {
        console.log('Course saved successfully with ID:', savedCourse?.id);
      }
    }
    
    return {
      courseMarkdown: data.courseContent,
      courseData,
      courseId: savedCourse?.id || null,
      success: true
    };
  } catch (err: any) {
    console.error("Error generating course:", err);
    return {
      courseMarkdown: "",
      courseData: null,
      courseId: null,
      success: false,
      error: err.message || "Unknown error occurred"
    };
  }
};
