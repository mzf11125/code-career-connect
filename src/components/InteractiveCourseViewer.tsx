
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Play, BookOpen, CircleCheck, CirclePlay, MousePointerClick, BookText, ExternalLink, Video, FileText, Brain } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CourseData, getCourseProgress, updateModuleProgress, CourseProgress } from "@/services/courseService";
import { toast } from "sonner";
import { marked } from "marked";

interface InteractiveCourseViewerProps {
  courseData: CourseData | null;
  courseId: string | null;
  markdown: string;
}

const getResourceIcon = (type: string) => {
  switch (type) {
    case 'video':
      return <Video size={20} className="text-red-500" />;
    case 'quiz':
      return <Brain size={20} className="text-purple-500" />;
    case 'documentation':
      return <FileText size={20} className="text-blue-500" />;
    default:
      return <ExternalLink size={20} className="text-csgreen" />;
  }
};

const getResourceBadgeColor = (type: string) => {
  switch (type) {
    case 'video':
      return 'bg-red-500/20 text-red-300';
    case 'quiz':
      return 'bg-purple-500/20 text-purple-300';
    case 'documentation':
      return 'bg-blue-500/20 text-blue-300';
    default:
      return 'bg-gray-500/20 text-gray-300';
  }
};

// Generate sample learning content when course data doesn't have proper modules
const generateSampleModules = (courseTitle: string, courseTopic: string) => {
  return [
    {
      id: 'intro-module',
      title: 'Introduction to ' + courseTopic,
      description: 'Get started with the fundamentals and overview of the course.',
      learningObjectives: [
        'Understand the core concepts',
        'Set up your learning environment',
        'Preview what you\'ll accomplish'
      ],
      estimatedTime: '45 minutes',
      resources: [
        {
          title: 'Welcome Video',
          type: 'video',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          title: 'Course Overview PDF',
          type: 'documentation',
          url: '#'
        }
      ]
    },
    {
      id: 'fundamentals-module',
      title: 'Core Fundamentals',
      description: 'Deep dive into the essential concepts you need to master.',
      learningObjectives: [
        'Master the basic principles',
        'Practice with hands-on exercises',
        'Build your first project'
      ],
      estimatedTime: '2 hours',
      resources: [
        {
          title: 'Fundamentals Video Series',
          type: 'video',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          title: 'Practice Exercises',
          type: 'documentation',
          url: '#'
        },
        {
          title: 'Knowledge Check Quiz',
          type: 'quiz',
          url: '#'
        }
      ]
    },
    {
      id: 'advanced-module',
      title: 'Advanced Techniques',
      description: 'Learn advanced strategies and best practices.',
      learningObjectives: [
        'Apply advanced techniques',
        'Optimize your workflow',
        'Solve complex challenges'
      ],
      estimatedTime: '1.5 hours',
      resources: [
        {
          title: 'Advanced Tutorial',
          type: 'video',
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
        },
        {
          title: 'Best Practices Guide',
          type: 'documentation',
          url: '#'
        },
        {
          title: 'Final Assessment',
          type: 'quiz',
          url: '#'
        }
      ]
    }
  ];
};

export function InteractiveCourseViewer({ courseData, courseId, markdown }: InteractiveCourseViewerProps) {
  const [activeModule, setActiveModule] = useState(0);
  const [activeTab, setActiveTab] = useState("content");
  const [progress, setProgress] = useState<CourseProgress[]>([]);
  const [loading, setLoading] = useState(false);

  // Load user progress when component mounts
  useEffect(() => {
    if (courseId) {
      loadProgress();
    }
  }, [courseId]);

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

  // Create enhanced course data with sample modules if needed
  const enhancedCourseData = courseData || {
    title: "Sample Course",
    description: "This course contains sample learning materials",
    modules: generateSampleModules("Sample Course", "Learning")
  };

  // If courseData exists but doesn't have modules, generate them
  if (courseData && (!courseData.modules || courseData.modules.length === 0)) {
    enhancedCourseData.modules = generateSampleModules(courseData.title, courseData.title);
  }

  const calculateProgressPercentage = (): number => {
    if (!enhancedCourseData || enhancedCourseData.modules.length === 0) return 0;
    const completedModules = enhancedCourseData.modules.filter(module => isModuleCompleted(module.id)).length;
    return (completedModules / enhancedCourseData.modules.length) * 100;
  };

  // Fallback to markdown display if no course data is available and no courseData
  if (!courseData && !courseId) {
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
        
        <div className="mt-4">
          <Progress value={progressPercentage} className="h-2 mb-1" />
          <div className="flex justify-between text-xs text-gray-400">
            <span>{Math.round(progressPercentage)}% complete</span>
            <span>{completedModules}/{enhancedCourseData.modules.length} modules</span>
          </div>
        </div>
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
            {enhancedCourseData.modules.map((module, index) => {
              const isCompleted = isModuleCompleted(module.id);
              const isActive = activeModule === index;
              
              return (
                <Card key={module.id} className={`bg-csdark border-gray-800 ${isActive ? 'border-csgreen' : ''}`}>
                  <CardHeader className="py-3 px-4">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-md flex items-center">
                        {isCompleted ? (
                          <CircleCheck className="mr-2 text-csgreen" size={20} />
                        ) : (
                          <BookText className="mr-2" size={20} />
                        )}
                        {module.title}
                      </CardTitle>
                      <Badge variant={isCompleted ? "default" : "outline"} className={isCompleted ? "bg-csgreen text-black" : ""}>
                        {isCompleted ? "Completed" : "In Progress"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-4 pt-0 px-4">
                    <CardDescription>{module.description}</CardDescription>
                    
                    {module.learningObjectives && module.learningObjectives.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium mb-2">Learning Objectives:</h4>
                        <ul className="text-sm text-gray-400 space-y-1">
                          {module.learningObjectives.map((objective, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="mr-2">•</span>
                              <span>{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center text-sm">
                        <BookOpen className="mr-2 text-csgreen" size={16} />
                        <span>{module.resources?.length || 0} resources available</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <CirclePlay className="mr-2 text-csgreen" size={16} />
                        <span>Estimated time: {module.estimatedTime}</span>
                      </div>
                      {module.resources && module.resources.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {module.resources.map((resource, idx) => (
                            <Badge key={idx} className={`text-xs ${getResourceBadgeColor(resource.type)}`}>
                              {resource.type}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 px-4 pb-4 flex gap-2">
                    <Button 
                      onClick={() => setActiveModule(index)} 
                      variant={isActive ? "default" : "outline"}
                      className={isActive ? "bg-csgreen text-black" : "border-csgreen text-white"}
                    >
                      {isActive ? "Currently Studying" : "Start Module"}
                    </Button>
                    {!isCompleted && courseId && (
                      <Button 
                        onClick={() => handleMarkModuleComplete(module.id)}
                        disabled={loading}
                        variant="outline"
                        className="border-green-500 text-green-500 hover:bg-green-500 hover:text-black"
                      >
                        Mark Complete
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="resources" className="mt-0">
          <Card className="bg-csdark border-gray-800">
            <CardHeader>
              <CardTitle>{enhancedCourseData.modules[activeModule]?.title} - Resources</CardTitle>
              <CardDescription>
                Study materials and resources for this module
              </CardDescription>
            </CardHeader>
            <CardContent>
              {enhancedCourseData.modules[activeModule]?.resources && enhancedCourseData.modules[activeModule].resources.length > 0 ? (
                <div className="space-y-4">
                  {enhancedCourseData.modules[activeModule].resources.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getResourceIcon(resource.type)}
                        <div>
                          <h4 className="font-medium">{resource.title}</h4>
                          <p className="text-sm text-gray-400 capitalize flex items-center">
                            <Badge className={`text-xs mr-2 ${getResourceBadgeColor(resource.type)}`}>
                              {resource.type}
                            </Badge>
                            Learning Resource
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-csgreen text-csgreen hover:bg-csgreen hover:text-black"
                        onClick={() => window.open(resource.url, '_blank')}
                      >
                        {getResourceIcon(resource.type)}
                        <span className="ml-1">Open</span>
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Video className="mx-auto h-12 w-12 text-gray-500 mb-4" />
                  <p className="text-gray-400 mb-4">No resources available for this module yet.</p>
                  <p className="text-sm text-gray-500">Resources will be added as the course content is developed.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
