
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle, Sparkles } from "lucide-react";
import { getResumeTemplates } from "@/services/resumeEnhancementService";
import { useToast } from "@/hooks/use-toast";

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  template_data: any;
  is_ats_friendly: boolean;
}

interface TemplateSelectorProps {
  onTemplateSelect: (template: Template) => void;
  selectedTemplateId?: string;
}

export const TemplateSelector = ({ onTemplateSelect, selectedTemplateId }: TemplateSelectorProps) => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await getResumeTemplates();
      
      if (error) {
        toast({
          title: "Error loading templates",
          description: "Failed to fetch resume templates",
          variant: "destructive"
        });
        return;
      }

      setTemplates(data || []);
    } catch (error) {
      console.error('Error fetching templates:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'faang':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'maang':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'tech':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-cssecondary border-gray-700">
            <CardHeader>
              <Skeleton className="h-6 w-3/4 bg-gray-700" />
              <Skeleton className="h-4 w-full bg-gray-700" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full bg-gray-700" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2">Choose a Resume Template</h3>
        <p className="text-gray-400">Select an ATS-friendly template optimized for top tech companies</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card 
            key={template.id} 
            className={`bg-cssecondary border-gray-700 hover:border-csgreen/50 transition-all cursor-pointer ${
              selectedTemplateId === template.id ? 'border-csgreen bg-csgreen/5' : ''
            }`}
            onClick={() => onTemplateSelect(template)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {template.name}
                    {selectedTemplateId === template.id && (
                      <CheckCircle className="h-5 w-5 text-csgreen" />
                    )}
                  </CardTitle>
                  <CardDescription className="text-gray-400 mt-1">
                    {template.description}
                  </CardDescription>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge className={getCategoryColor(template.category)}>
                  {template.category.toUpperCase()}
                </Badge>
                {template.is_ats_friendly && (
                  <Badge className="bg-csgreen/20 text-csgreen border-csgreen/30">
                    <Sparkles className="h-3 w-3 mr-1" />
                    ATS-Friendly
                  </Badge>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <Button 
                variant={selectedTemplateId === template.id ? "default" : "outline"}
                className={`w-full ${
                  selectedTemplateId === template.id 
                    ? 'bg-csgreen text-black hover:bg-csgreen/90' 
                    : 'border-gray-700 hover:bg-gray-700'
                }`}
              >
                {selectedTemplateId === template.id ? 'Selected' : 'Select Template'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
