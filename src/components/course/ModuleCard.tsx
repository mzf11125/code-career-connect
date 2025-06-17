
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck, BookText, BookOpen, CirclePlay } from "lucide-react";
import { getResourceBadgeColor } from "./ResourceHelpers";

interface Module {
  id: string;
  title: string;
  description: string;
  learningObjectives: string[];
  estimatedTime: string;
  resources: Array<{
    title: string;
    type: string;
    url: string;
    description: string;
  }>;
}

interface ModuleCardProps {
  module: Module;
  index: number;
  isCompleted: boolean;
  isActive: boolean;
  courseId: string | null;
  loading: boolean;
  onStartModule: (index: number) => void;
  onMarkComplete: (moduleId: string) => void;
}

export function ModuleCard({
  module,
  index,
  isCompleted,
  isActive,
  courseId,
  loading,
  onStartModule,
  onMarkComplete
}: ModuleCardProps) {
  return (
    <Card className={`bg-csdark border-gray-800 ${isActive ? 'border-csgreen' : ''}`}>
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
            <span>{module.resources?.length || 0} learning resources available</span>
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
          onClick={() => onStartModule(index)} 
          variant={isActive ? "default" : "outline"}
          className={isActive ? "bg-csgreen text-black" : "border-csgreen text-white"}
        >
          {isActive ? "Currently Studying" : "Start Module"}
        </Button>
        {!isCompleted && courseId && (
          <Button 
            onClick={() => onMarkComplete(module.id)}
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
}
