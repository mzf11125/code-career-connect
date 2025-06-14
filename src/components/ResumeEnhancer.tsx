
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Wand2, Sparkles, RefreshCw, FileText, Zap, Download } from "lucide-react";
import { enhanceResume, ResumeContent, saveResume } from "@/services/resumeEnhancementService";
import { downloadResumeAsPDF } from "@/services/resumeDownloadService";
import { useToast } from "@/hooks/use-toast";

interface ResumeEnhancerProps {
  resumeContent: ResumeContent;
  resumeId: string;
  onEnhancementComplete: (enhancedContent: ResumeContent) => void;
}

export const ResumeEnhancer = ({ resumeContent, resumeId, onEnhancementComplete }: ResumeEnhancerProps) => {
  const [enhancing, setEnhancing] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [currentResumeContent, setCurrentResumeContent] = useState<ResumeContent>(resumeContent);
  const [isOptimizedVersion, setIsOptimizedVersion] = useState(false);
  const { toast } = useToast();

  const enhancementTypes = [
    {
      type: 'rephrase',
      title: 'Rephrase Content',
      description: 'Make your resume more impactful with better word choices',
      icon: <RefreshCw className="h-5 w-5" />,
      color: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    },
    {
      type: 'rewrite',
      title: 'Complete Rewrite',
      description: 'Professional rewrite with improved structure and impact',
      icon: <FileText className="h-5 w-5" />,
      color: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    },
    {
      type: 'ats_optimize',
      title: 'ATS Optimization',
      description: 'Optimize for Applicant Tracking Systems with keywords',
      icon: <Zap className="h-5 w-5" />,
      color: 'bg-green-500/20 text-green-400 border-green-500/30'
    }
  ];

  const handleEnhancement = async (type: 'rephrase' | 'rewrite' | 'ats_optimize' | 'custom') => {
    setEnhancing(true);
    setSelectedType(type);

    try {
      const result = await enhanceResume({
        enhancementType: type,
        resumeContent: currentResumeContent,
        userPrompt: type === 'custom' ? customPrompt : undefined,
        resumeId
      });

      if (result.success && result.enhancedContent) {
        // Update the current resume content
        setCurrentResumeContent(result.enhancedContent);
        setIsOptimizedVersion(true);
        
        // Save the optimized resume as a new version in the database
        await saveOptimizedResume(result.enhancedContent, type);
        
        // Notify parent component
        onEnhancementComplete(result.enhancedContent);
        
        toast({
          title: "Resume enhanced and saved!",
          description: `Your resume has been ${type === 'custom' ? 'customized' : type}d using AI and saved to the database.`
        });
      } else {
        throw new Error(result.error || 'Enhancement failed');
      }
    } catch (error) {
      console.error('Enhancement error:', error);
      toast({
        title: "Enhancement failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive"
      });
    } finally {
      setEnhancing(false);
      setSelectedType("");
    }
  };

  const saveOptimizedResume = async (enhancedContent: ResumeContent, enhancementType: string) => {
    try {
      // Create a new resume entry for the optimized version
      const optimizedTitle = `${currentResumeContent.fullName} - ${enhancementType.charAt(0).toUpperCase() + enhancementType.slice(1)}d Resume`;
      
      const { data, error } = await saveResume({
        title: optimizedTitle,
        content: enhancedContent,
      });

      if (error) {
        console.error('Failed to save optimized resume:', error);
        throw new Error('Failed to save optimized resume to database');
      }

      console.log('Optimized resume saved successfully:', data);
      return data;
    } catch (error) {
      console.error('Error saving optimized resume:', error);
      throw error;
    }
  };

  const handleDownload = async () => {
    try {
      const result = await downloadResumeAsPDF(currentResumeContent);
      toast({
        title: "Download started",
        description: result.message
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error downloading your resume",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold mb-2 flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-csgreen" />
          AI Resume Enhancement
        </h3>
        <p className="text-gray-400">
          Use AI to make your resume more compelling and ATS-friendly
        </p>
        {isOptimizedVersion && (
          <Badge className="mt-2 bg-csgreen/20 text-csgreen">
            Optimized Version - Saved to Database
          </Badge>
        )}
      </div>

      {/* Download Section */}
      <Card className="bg-cssecondary border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Download className="h-5 w-5 text-csgreen" />
            Download Your Resume
          </CardTitle>
          <CardDescription className="text-gray-400">
            {isOptimizedVersion 
              ? "Download your optimized resume (saved in database)" 
              : "Download your current resume version"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleDownload}
            className="w-full bg-csgreen text-black hover:bg-csgreen/90"
          >
            <Download className="h-4 w-4 mr-2" />
            {isOptimizedVersion ? "Download Optimized Resume" : "Download Resume"}
          </Button>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {enhancementTypes.map((enhancement) => (
          <Card 
            key={enhancement.type}
            className="bg-cssecondary border-gray-700 hover:border-csgreen/50 transition-all"
          >
            <CardHeader className="text-center">
              <div className="mx-auto mb-2 p-3 rounded-full bg-gray-800 w-fit">
                {enhancement.icon}
              </div>
              <CardTitle className="text-lg">{enhancement.title}</CardTitle>
              <CardDescription className="text-gray-400">
                {enhancement.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => handleEnhancement(enhancement.type as any)}
                disabled={enhancing}
                className="w-full bg-csgreen text-black hover:bg-csgreen/90"
              >
                {enhancing && selectedType === enhancement.type ? (
                  <>
                    <Wand2 className="h-4 w-4 mr-2 animate-spin" />
                    Enhancing...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Enhance
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-cssecondary border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg">Custom Enhancement</CardTitle>
          <CardDescription className="text-gray-400">
            Provide specific instructions for how you want your resume enhanced
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="E.g., 'Make my experience section more technical and add more quantifiable achievements'"
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="min-h-[100px] bg-gray-900/50"
          />
          <Button
            onClick={() => handleEnhancement('custom')}
            disabled={enhancing || !customPrompt.trim()}
            className="w-full bg-csgreen text-black hover:bg-csgreen/90"
          >
            {enhancing && selectedType === 'custom' ? (
              <>
                <Wand2 className="h-4 w-4 mr-2 animate-spin" />
                Enhancing...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Custom Enhance
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
