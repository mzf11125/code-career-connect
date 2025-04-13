
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Download, Wand2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const tailorFormSchema = z.object({
  jobTitle: z.string().min(2, { message: "Job title is required" }),
  company: z.string().min(2, { message: "Company name is required" }),
  jobDescription: z.string().min(50, { message: "Please provide a detailed job description" }),
  customCoverLetter: z.string().optional(),
  highlightSkills: z.string().optional(),
});

type TailorFormValues = z.infer<typeof tailorFormSchema>;

interface ResumeTailorProps {
  onComplete: (data: TailorFormValues) => void;
  onBack: () => void;
}

export const ResumeTailor = ({ onComplete, onBack }: ResumeTailorProps) => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  
  const form = useForm<TailorFormValues>({
    resolver: zodResolver(tailorFormSchema),
    defaultValues: {
      jobTitle: "",
      company: "",
      jobDescription: "",
      customCoverLetter: "",
      highlightSkills: "",
    }
  });

  const generateCoverLetter = () => {
    const jobTitle = form.getValues('jobTitle');
    const company = form.getValues('company');
    const jobDescription = form.getValues('jobDescription');
    
    if (!jobTitle || !company || !jobDescription) {
      toast({
        title: "Missing information",
        description: "Please fill out job title, company, and job description first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation (in a real app, this would call an AI service)
    setTimeout(() => {
      const aiGeneratedLetter = `Dear Hiring Manager,

I am writing to express my interest in the ${jobTitle} position at ${company}. Based on the job description, I believe my skills and experience make me an excellent candidate for this role.

The description mentions several key requirements that align with my background and expertise. I am particularly skilled in the technical areas mentioned, and I have successfully completed similar projects in my previous roles.

I am excited about the opportunity to contribute to your team and help drive innovative solutions. My approach to problem-solving and collaborative work style would be valuable assets to your organization.

Thank you for considering my application. I look forward to discussing how my background aligns with your needs.

Sincerely,
[Your Name]`;
      
      form.setValue('customCoverLetter', aiGeneratedLetter);
      setIsGenerating(false);
      
      toast({
        title: "Cover letter generated",
        description: "A personalized cover letter has been created based on the job details.",
        icon: <Check className="h-4 w-4" />
      });
    }, 2000);
  };

  const analyzeSkills = () => {
    const jobDescription = form.getValues('jobDescription');
    
    if (!jobDescription) {
      toast({
        title: "Missing information",
        description: "Please fill out the job description first.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI skill extraction (in a real app, this would call an AI service)
    setTimeout(() => {
      const skills = "JavaScript, React, TypeScript, Node.js, Problem-solving, Team collaboration, Communication skills";
      form.setValue('highlightSkills', skills);
      setIsGenerating(false);
      
      toast({
        title: "Skills analyzed",
        description: "Key skills for this position have been identified.",
        icon: <Check className="h-4 w-4" />
      });
    }, 1500);
  };

  const onSubmit = (data: TailorFormValues) => {
    onComplete(data);
    toast({
      title: "Resume tailored",
      description: "Your resume has been customized for this job application.",
      icon: <Check className="h-4 w-4" />
    });
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Job Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Software Engineer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Tech Corp Inc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="jobDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white">Job Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Paste the full job description here..." 
                    className="min-h-[150px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="bg-gray-800/50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <FormLabel className="text-white">Key Skills to Highlight</FormLabel>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-csgreen text-csgreen hover:bg-csgreen/10"
                onClick={analyzeSkills}
                disabled={isGenerating}
              >
                <Wand2 className="w-4 h-4 mr-2" />
                {isGenerating ? "Analyzing..." : "Analyze Job"}
              </Button>
            </div>
            <FormField
              control={form.control}
              name="highlightSkills"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea 
                      placeholder="Skills that match this job's requirements..." 
                      className="min-h-[60px] bg-gray-900/50"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="bg-gray-800/50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <FormLabel className="text-white">Cover Letter</FormLabel>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-csgreen text-csgreen hover:bg-csgreen/10"
                onClick={generateCoverLetter}
                disabled={isGenerating}
              >
                <Wand2 className="w-4 h-4 mr-2" />
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
            </div>
            <FormField
              control={form.control}
              name="customCoverLetter"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea 
                      placeholder="Write or generate a custom cover letter..." 
                      className="min-h-[200px] bg-gray-900/50"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between mt-8">
            <Button 
              type="button" 
              variant="outline" 
              className="border-gray-700 hover:bg-gray-800"
              onClick={onBack}
            >
              Back
            </Button>
            <div className="space-x-3">
              <Button 
                type="button"
                variant="outline"
                className="border-csgreen text-csgreen hover:bg-csgreen/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Package
              </Button>
              <Button 
                type="submit"
                className="bg-csgreen text-black hover:bg-csgreen/90"
              >
                Apply with Tailored Resume
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};
