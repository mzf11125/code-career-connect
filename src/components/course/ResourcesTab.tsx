
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Video } from "lucide-react";
import { getResourceIcon, getResourceBadgeColor } from "./ResourceHelpers";

interface Resource {
  title: string;
  type: string;
  url: string;
  description: string;
}

interface Module {
  title: string;
  resources: Resource[];
}

interface ResourcesTabProps {
  module: Module;
}

export function ResourcesTab({ module }: ResourcesTabProps) {
  return (
    <Card className="bg-csdark border-gray-800">
      <CardHeader>
        <CardTitle>{module.title} - Learning Resources</CardTitle>
        <CardDescription>
          High-quality educational content from trusted sources
        </CardDescription>
      </CardHeader>
      <CardContent>
        {module.resources && module.resources.length > 0 ? (
          <div className="space-y-4">
            {module.resources.map((resource, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getResourceIcon(resource.type)}
                  <div className="flex-1">
                    <h4 className="font-medium">{resource.title}</h4>
                    <p className="text-sm text-gray-400 mt-1">{resource.description}</p>
                    <div className="flex items-center mt-2">
                      <Badge className={`text-xs mr-2 ${getResourceBadgeColor(resource.type)}`}>
                        {resource.type}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        {resource.type === 'video' ? 'Video Tutorial' : 
                         resource.type === 'quiz' ? 'Interactive Quiz' : 
                         'Documentation & Reading'}
                      </span>
                    </div>
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
  );
}
