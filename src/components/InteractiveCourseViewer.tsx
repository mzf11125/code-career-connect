
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, ExternalLink } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseData, getCourseProgress, updateModuleProgress, CourseProgress, saveCourse } from "@/services/courseService";
import { toast } from "sonner";
import { marked } from "marked";
import { generateEducationalContent } from "./course/EducationalContentGenerator";
import { CourseProgress as CourseProgressComponent } from "./course/CourseProgress";
import { ModuleCard } from "./course/ModuleCard";
import { ResourcesTab } from "./course/ResourcesTab";

interface InteractiveCourseViewerProps {
  courseData: CourseData | null;
  courseId: string | null;
  markdown: string;
}

export function InteractiveCourseViewer({ courseData, courseId, markdown }: InteractiveCourseViewerProps) {
  const [activeModule, setActiveModule] = useState(0);
  const [activeTab, setActiveTab] = useState("content");
  const [progress, setProgress] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState(false);
  const [enhancedCourseData, setEnhancedCourseData] = useState<CourseData | null>(null);

  // Load user progress when component mounts
  useEffect(() => {
    if (courseId) {
      loadProgress();
    }
  }, [courseId]);

  // Initialize and potentially save enhanced course data
  useEffect(() => {
    initializeCourseData();
  }, [courseData]);

  const initializeCourseData = async () => {
    let initialCourseData = courseData || {
      title: "Complete Programming Course",
      description: "Comprehensive course with real-world projects and industry-standard practices",
      modules: generateEducationalContent("Complete Programming Course", "Programming"),
      goals: [],
      estimatedDuration: "4 weeks"
    };

    // If courseData exists but doesn't have modules, generate them based on the actual course data
    if (courseData && (!courseData.modules || courseData.modules.length === 0)) {
      // Enhanced logic to detect course topic from the course data
      let topicToUse = courseData.title;
      
      // Check if the course object has content or description that might contain topic info
      if (courseData.description) {
        topicToUse = courseData.description;
      }
      
      // Enhanced topic detection from title
      const titleLower = courseData.title.toLowerCase();
      if (titleLower.includes('python')) {
        topicToUse = 'Python Programming';
      } else if (titleLower.includes('web development') || titleLower.includes('html') || titleLower.includes('css') || titleLower.includes('javascript')) {
        topicToUse = 'Web Development';
      } else if (titleLower.includes('react')) {
        topicToUse = 'React Development';
      } else if (titleLower.includes('data')) {
        topicToUse = 'Data Science';
      }
      
      const generatedModules = generateEducationalContent(courseData.title, topicToUse);
      
      // Create enhanced course data with generated modules
      initialCourseData = {
        ...courseData,
        modules: generatedModules,
        estimatedDuration: "4 weeks"
      };

      // Save the enhanced course data to Supabase if we have a courseId and user is authenticated
      if (courseId) {
        await saveEnhancedCourseData(initialCourseData, topicToUse);
      }
    }

    setEnhancedCourseData(initialCourseData);
  };

  const saveEnhancedCourseData = async (enhancedData: CourseData, topic: string) => {
    try {
      const { data, error } = await saveCourse(topic, enhancedData);
      if (error) {
        console.error('Error saving enhanced course data:', error);
        toast.error("Failed to save course enhancements");
      } else {
        console.log('Enhanced course data saved successfully:', data);
        toast.success("Course content enhanced and saved!");
      }
    } catch (err) {
      console.error('Unexpected error saving enhanced course:', err);
    }
  };

  const loadProgress = async () => {
    if (!courseId) return;
    
    try {
      const { data, error } = await getCourseProgress(courseId);
      if (error) {
        console.error('Error loading progress:', error);
      } else {
        setProgress(data || []);
      }
    } catch (err) {
      console.error('Error loading progress:', err);
    }
  };

  const getModuleProgress = (moduleId: string): CourseProgress | undefined => {
    return progress.find(p => p.moduleId === moduleId);
  };

  const isModuleCompleted = (moduleId: string): boolean => {
    const moduleProgress = getModuleProgress(moduleId);
    return moduleProgress?.completed || false;
  };

  const handleMarkModuleComplete = async (moduleId: string) => {
    if (!courseId) {
      toast.error("Course not saved. Cannot track progress.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await updateModuleProgress(courseId, moduleId, true);
      if (error) {
        toast.error(`Error updating progress: ${error}`);
      } else {
        toast.success("Module marked as completed!");
        await loadProgress(); // Reload progress
      }
    } catch (err) {
      toast.error("Failed to update progress");
    }
    setLoading(false);
  };

  const calculateProgressPercentage = (): number => {
    if (!enhancedCourseData || enhancedCourseData.modules.length === 0) return 0;
    const completedModules = enhancedCourseData.modules.filter(module => isModuleCompleted(module.id)).length;
    return (completedModules / enhancedCourseData.modules.length) * 100;
  };

  // Fallback to markdown display if no course data is available
  if (!enhancedCourseData) {
    return (
      <div className="bg-cssecondary rounded-lg p-6">
        {markdown ? (
          <div>
            <div className="mb-4 p-3 bg-yellow-900/20 border border-yellow-700 rounded-lg">
              <p className="text-yellow-200 text-sm">
                <BookOpen className="inline mr-2" size={16} />
                Course generated but not saved to database. Sign in to enable progress tracking and interactive features.
              </p>
            </div>
            <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }} />
          </div>
        ) : (
          <p className="text-gray-400 text-center">No course data available. Please generate a course first.</p>
        )}
      </div>
    );
  }

  const progressPercentage = calculateProgressPercentage();
  const completedModules = enhancedCourseData.modules.filter(module => isModuleCompleted(module.id)).length;

  return (
    <div className="bg-cssecondary rounded-lg p-6 overflow-hidden">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{enhancedCourseData.title}</h2>
        <p className="text-gray-400">{enhancedCourseData.description}</p>
        
        <CourseProgressComponent
          completedModules={completedModules}
          totalModules={enhancedCourseData.modules.length}
          progressPercentage={progressPercentage}
        />
      </div>

      <Tabs defaultValue="content" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-2 mb-6">
          <TabsTrigger value="content" className="data-[state=active]:bg-csgreen data-[state=active]:text-black">
            <BookOpen className="mr-2" size={18} /> Course Content
          </TabsTrigger>
          <TabsTrigger value="resources" className="data-[state=active]:bg-csgreen data-[state=active]:text-black">
            <ExternalLink className="mr-2" size={18} /> Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-0">
          <div className="space-y-4">
            {enhancedCourseData.modules.map((module, index) => (
              <ModuleCard
                key={module.id}
                module={module}
                index={index}
                isCompleted={isModuleCompleted(module.id)}
                isActive={activeModule === index}
                courseId={courseId}
                loading={loading}
                onStartModule={setActiveModule}
                onMarkComplete={handleMarkModuleComplete}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="mt-0">
          <ResourcesTab module={enhancedCourseData.modules[activeModule]} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
