
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, ArrowRight, Save, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { TemplateSelector } from "./TemplateSelector";
import { ResumeEnhancer } from "./ResumeEnhancer";
import { saveResume, createResumeVersion, ResumeContent } from "@/services/resumeEnhancementService";

const resumeFormSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  summary: z.string().min(50, { message: "Summary should be at least 50 characters." }),
  skills: z.string().min(10, { message: "Please list at least a few skills." }),
  experience: z.string().min(50, { message: "Experience should be detailed." }),
  education: z.string().min(20, { message: "Please include your education details." }),
});

type ResumeFormValues = z.infer<typeof resumeFormSchema>;

interface EnhancedResumeBuilderProps {
  onSave: (data: ResumeFormValues) => void;
  onCancel: () => void;
  initialData?: Partial<ResumeFormValues>;
}

export const EnhancedResumeBuilder = ({ onSave, onCancel, initialData }: EnhancedResumeBuilderProps) => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [savedResumeId, setSavedResumeId] = useState<string | null>(null);
  const [resumeTitle, setResumeTitle] = useState("My Resume");

  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: {
      fullName: initialData?.fullName || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      summary: initialData?.summary || "",
      skills: initialData?.skills || "",
      experience: initialData?.experience || "",
      education: initialData?.education || "",
    }
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveResume = async () => {
    const formData = form.getValues();
    
    try {
      const { data, error } = await saveResume({
        title: resumeTitle,
        content: formData,
        templateId: selectedTemplate?.id,
      });

      if (error) {
        throw new Error('Failed to save resume');
      }

      setSavedResumeId(data.id);
      toast({
        title: "Resume saved successfully!",
        description: "Your resume has been saved and you can now enhance it with AI."
      });
      handleNext();
    } catch (error) {
      console.error('Error saving resume:', error);
      toast({
        title: "Error saving resume",
        description: "There was an error saving your resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEnhancementComplete = async (enhancedContent: ResumeContent) => {
    // Update the form with enhanced content
    form.reset(enhancedContent);
    
    // Create a new version if we have a saved resume
    if (savedResumeId) {
      await createResumeVersion(
        savedResumeId, 
        enhancedContent, 
        "AI-enhanced version"
      );
    }

    toast({
      title: "Enhancement applied!",
      description: "Your resume has been enhanced. Review the changes and save when ready."
    });
  };

  const onSubmit = (data: ResumeFormValues) => {
    onSave(data);
  };

  const steps = [
    { number: 1, title: "Template", description: "Choose a template" },
    { number: 2, title: "Content", description: "Fill your details" },
    { number: 3, title: "Save", description: "Save your resume" },
    { number: 4, title: "Enhance", description: "AI enhancement" }
  ];

  return (
    <div className="w-full space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= step.number 
                ? 'bg-csgreen text-black' 
                : 'bg-gray-700 text-gray-400'
            }`}>
              {step.number}
            </div>
            <div className="ml-2 hidden md:block">
              <p className={`text-sm font-medium ${
                currentStep >= step.number ? 'text-white' : 'text-gray-400'
              }`}>
                {step.title}
              </p>
              <p className="text-xs text-gray-500">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-12 h-px mx-4 ${
                currentStep > step.number ? 'bg-csgreen' : 'bg-gray-700'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      {currentStep === 1 && (
        <div>
          <TemplateSelector 
            onTemplateSelect={setSelectedTemplate}
            selectedTemplateId={selectedTemplate?.id}
          />
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!selectedTemplate}
              className="bg-csgreen text-black hover:bg-csgreen/90"
            >
              Next <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <Form {...form}>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="(123) 456-7890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Professional Summary</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="A brief summary of your professional background and career goals..." 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skills"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skills</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="JavaScript, React, Node.js, Python, etc." 
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Experience</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Details about your past roles, companies, and achievements..." 
                      className="min-h-[150px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="education"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Your educational background, degrees, institutions, etc." 
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handlePrevious}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button 
                type="button"
                onClick={handleNext}
                className="bg-csgreen text-black hover:bg-csgreen/90"
              >
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      )}

      {currentStep === 3 && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Save Your Resume</h3>
            <p className="text-gray-400">Give your resume a title and save it</p>
          </div>
          
          <div className="max-w-md mx-auto">
            <FormLabel>Resume Title</FormLabel>
            <Input 
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              placeholder="My FAANG Resume"
              className="mt-2"
            />
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button 
              onClick={handleSaveResume}
              className="bg-csgreen text-black hover:bg-csgreen/90"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Resume
            </Button>
          </div>
        </div>
      )}

      {currentStep === 4 && savedResumeId && (
        <div className="space-y-6">
          <ResumeEnhancer
            resumeContent={form.getValues()}
            resumeId={savedResumeId}
            onEnhancementComplete={handleEnhancementComplete}
          />
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePrevious}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button 
              onClick={() => onSubmit(form.getValues())}
              className="bg-csgreen text-black hover:bg-csgreen/90"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Complete Resume
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
