
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
    let inLearningObjectives = false;
    let inResources = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Skip empty lines
      if (!line) continue;
      
      // Extract title (first # heading)
      if (line.startsWith('# ') && !title) {
        title = line.substring(2).trim();
        continue;
      }
      
      // Extract description (paragraph after title, before goals/modules)
      if (!line.startsWith('#') && !line.startsWith('-') && !line.startsWith('*') && 
          line.length > 10 && title && !description && 
          !line.toLowerCase().includes('goal') && 
          !line.toLowerCase().includes('module') &&
          !line.toLowerCase().includes('course')) {
        description = line;
        continue;
      }
      
      // Check for goals section
      if ((line.toLowerCase().includes('goal') || line.toLowerCase().includes('objective')) && 
          (line.startsWith('#') || line.startsWith('**'))) {
        currentSection = 'goals';
        inLearningObjectives = false;
        inResources = false;
        continue;
      }
      
      // Extract goals
      if (currentSection === 'goals' && (line.startsWith('- ') || line.startsWith('* ') || line.match(/^\d+\./))) {
        const goalText = line.replace(/^[-*\d.]\s*/, '').trim();
        if (goalText.length > 0) {
          goals.push(goalText);
        }
        continue;
      }
      
      // Check for module sections (## Module, ### Module, etc.)
      if (line.toLowerCase().includes('module') && line.startsWith('#')) {
        // Save previous module if exists
        if (currentModule.title) {
          modules.push({
            id: `module-${currentModuleIndex}`,
            title: currentModule.title,
            description: currentModule.description || '',
            learningObjectives: currentModule.learningObjectives || [],
            resources: currentModule.resources || [],
            estimatedTime: currentModule.estimatedTime || '20-30 minutes'
          });
          currentModuleIndex++;
        }
        
        // Start new module
        currentModule = {
          title: line.replace(/#+\s*/, '').trim(),
          description: '',
          learningObjectives: [],
          resources: [],
          estimatedTime: '20-30 minutes'
        };
        currentSection = 'module';
        inLearningObjectives = false;
        inResources = false;
        continue;
      }
      
      // Handle content within modules
      if (currentSection === 'module' && currentModule.title) {
        // Check for learning objectives subsection
        if (line.toLowerCase().includes('objective') || line.toLowerCase().includes('learn')) {
          inLearningObjectives = true;
          inResources = false;
          continue;
        }
        
        // Check for resources subsection
        if (line.toLowerCase().includes('resource') || line.toLowerCase().includes('material') || 
            line.toLowerCase().includes('link') || line.toLowerCase().includes('reference')) {
          inResources = true;
          inLearningObjectives = false;
          continue;
        }
        
        // Module description (first non-list line after module title)
        if (!line.startsWith('#') && !line.startsWith('-') && !line.startsWith('*') && 
            !line.match(/^\d+\./) && !currentModule.description && 
            !inLearningObjectives && !inResources && line.length > 5) {
          currentModule.description = line;
          continue;
        }
        
        // Handle list items
        if (line.startsWith('- ') || line.startsWith('* ') || line.match(/^\d+\./)) {
          const content = line.replace(/^[-*\d.]\s*/, '').trim();
          
          // Check if it's a resource (contains URL or looks like a link)
          if (content.includes('http') || content.includes('www.') || inResources) {
            const urlMatch = content.match(/\[(.*?)\]\((.*?)\)/);
            if (urlMatch) {
              currentModule.resources = currentModule.resources || [];
              currentModule.resources.push({
                title: urlMatch[1],
                url: urlMatch[2],
                type: 'article'
              });
            } else {
              // Simple format like "Title - URL" or just URL
              const parts = content.split(/[-–—]|:\s*/).map(p => p.trim());
              if (parts.length >= 2) {
                currentModule.resources = currentModule.resources || [];
                currentModule.resources.push({
                  title: parts[0],
                  url: parts[1].includes('http') ? parts[1] : `https://${parts[1]}`,
                  type: 'article'
                });
              } else if (content.includes('http')) {
                currentModule.resources = currentModule.resources || [];
                currentModule.resources.push({
                  title: 'Resource',
                  url: content,
                  type: 'article'
                });
              }
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
        estimatedTime: currentModule.estimatedTime || '20-30 minutes'
      });
    }
    
    // If no modules were found, create a basic structure from the content
    if (modules.length === 0) {
      console.log('No modules found, creating basic structure');
      modules.push({
        id: 'module-0',
        title: 'Course Content',
        description: 'Generated course content',
        learningObjectives: goals.length > 0 ? goals : ['Complete the course material'],
        resources: [{
          title: 'Course Material',
          url: '#',
          type: 'article'
        }],
        estimatedTime: '30 minutes'
      });
    }
    
    console.log('Parsed course data:', {
      title: title || 'Generated Course',
      description: description || 'AI-generated course content',
      goals: goals.length > 0 ? goals : ['Learn the fundamentals'],
      modules: modules,
      modulesCount: modules.length
    });
    
    return {
      title: title || 'Generated Course',
      description: description || 'AI-generated course content',
      goals: goals.length > 0 ? goals : ['Learn the fundamentals'],
      modules,
      estimatedDuration: `${modules.length * 25} minutes`
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
