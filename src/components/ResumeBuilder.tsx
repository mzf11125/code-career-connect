import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

interface ResumeBuilderProps {
  onSave: (data: ResumeFormValues) => void;
  onCancel: () => void;
}

export const ResumeBuilder = ({ onSave, onCancel }: ResumeBuilderProps) => {
  const { toast } = useToast();
  const form = useForm<ResumeFormValues>({
    resolver: zodResolver(resumeFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      summary: "",
      skills: "",
      experience: "",
      education: ""
    }
  });

  const onSubmit = (data: ResumeFormValues) => {
    try {
      onSave(data);
      toast({
        title: "Resume saved",
        description: "Your resume has been saved successfully."
      });
    } catch (error) {
      toast({
        title: "Error saving resume",
        description: "There was an error saving your resume. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">Full Name</FormLabel>
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
                  <FormLabel className="text-white">Email</FormLabel>
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
                  <FormLabel className="text-white">Phone</FormLabel>
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
                <FormLabel className="text-white">Professional Summary</FormLabel>
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
                <FormLabel className="text-white">Skills</FormLabel>
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
                <FormLabel className="text-white">Work Experience</FormLabel>
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
                <FormLabel className="text-white">Education</FormLabel>
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
            <Button 
              type="button" 
              variant="outline" 
              className="border-gray-700 hover:bg-gray-800"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-csgreen text-black hover:bg-csgreen/90"
            >
              Save Resume
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
