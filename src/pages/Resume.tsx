
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ResumeOptionCard } from "@/components/ResumeOptionCard";
import { Button } from "@/components/ui/button";
import { FileUp, FilePlus, ArrowLeft, FileText, Mail, ArrowDown, Sparkles } from "lucide-react";
import { EnhancedResumeBuilder } from "@/components/EnhancedResumeBuilder";
import { ResumeUploader } from "@/components/ResumeUploader";
import { ResumeTailor } from "@/components/ResumeTailor";
import { useToast } from "@/hooks/use-toast";

// Types for our resume data
type ResumeFormData = {
  fullName: string;
  email: string;
  phone: string;
  summary: string;
  skills: string;
  experience: string;
  education: string;
};

type TailorData = {
  jobTitle: string;
  company: string;
  jobDescription: string;
  customCoverLetter?: string;
  highlightSkills?: string;
};

type ResumeFile = File | null;

const Resume = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [resumeType, setResumeType] = useState<'create' | 'upload' | null>(null);
  const [resumeData, setResumeData] = useState<ResumeFormData | null>(null);
  const [resumeFile, setResumeFile] = useState<ResumeFile>(null);
  const [tailorData, setTailorData] = useState<TailorData | null>(null);
  
  const handleNext = () => {
    setStep(current => current + 1);
  };
  
  const handlePrevious = () => {
    setStep(current => Math.max(1, current - 1));
  };

  const handleOptionSelect = (type: 'create' | 'upload') => {
    setResumeType(type);
    handleNext();
  };

  const handleResumeCreated = (data: ResumeFormData) => {
    setResumeData(data);
    handleNext();
  };

  const handleResumeUploaded = (file: File) => {
    setResumeFile(file);
    handleNext();
  };

  const handleResumeTailored = (data: TailorData) => {
    setTailorData(data);
    // In a real application, this would trigger an API call to process the resume
    // and potentially generate a download or submit to a job application
    toast({
      title: "Application ready!",
      description: "Your tailored resume and cover letter are ready for submission.",
    });
    // Optionally reset to step 1 or show a success screen
    setStep(4);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center py-16 px-6 md:px-12">
        <div className="w-full max-w-5xl">
          {step === 1 && (
            <>
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  AI-Powered Resume Builder
                </h1>
                <p className="text-gray-400 flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5 text-csgreen" />
                  Create ATS-friendly resumes optimized for FAANG/MAANG companies
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ResumeOptionCard 
                  title="I already have one"
                  description="Upload and enhance your existing resume with AI"
                  icon={<FileUp />}
                  onClick={() => handleOptionSelect('upload')}
                />
                <ResumeOptionCard 
                  title="I want to start one"
                  description="Build from scratch with AI-powered templates and enhancement"
                  icon={<FilePlus />}
                  onClick={() => handleOptionSelect('create')}
                />
              </div>
            </>
          )}
          
          {step === 2 && (
            <div className="bg-cssecondary p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handlePrevious}
                  className="mr-3"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-2xl font-bold">
                  {resumeType === 'create' ? 'AI Resume Builder' : 'Upload & Enhance Resume'}
                </h2>
              </div>
              
              {resumeType === 'create' && (
                <EnhancedResumeBuilder 
                  onSave={handleResumeCreated} 
                  onCancel={handlePrevious} 
                />
              )}
              
              {resumeType === 'upload' && (
                <ResumeUploader 
                  onUploadComplete={handleResumeUploaded} 
                  onCancel={handlePrevious} 
                />
              )}
            </div>
          )}
          
          {step === 3 && (
            <div className="bg-cssecondary p-8 rounded-xl">
              <div className="flex items-center mb-6">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handlePrevious}
                  className="mr-3"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <h2 className="text-2xl font-bold">
                  Tailor Your Resume
                </h2>
              </div>
              
              <ResumeTailor 
                onComplete={handleResumeTailored} 
                onBack={handlePrevious} 
              />
            </div>
          )}
          
          {step === 4 && (
            <div className="bg-cssecondary p-8 rounded-xl text-center">
              <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 rounded-full bg-csgreen/20 flex items-center justify-center mb-4">
                  <FileText className="text-csgreen h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold mb-2">
                  Your Application Is Ready!
                </h2>
                <p className="text-gray-400 max-w-md mx-auto">
                  Your resume and cover letter have been tailored for {tailorData?.jobTitle} at {tailorData?.company}.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center text-center">
                  <FileText className="text-csgreen h-6 w-6 mb-2" />
                  <h3 className="font-medium mb-1">Tailored Resume</h3>
                  <p className="text-gray-400 text-sm mb-3">Customized for the job requirements</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-700 hover:bg-gray-700 w-full"
                  >
                    <ArrowDown className="h-4 w-4 mr-2" />
                    Download Resume
                  </Button>
                </div>
                
                <div className="bg-gray-800/50 p-4 rounded-lg flex flex-col items-center text-center">
                  <Mail className="text-csgreen h-6 w-6 mb-2" />
                  <h3 className="font-medium mb-1">Cover Letter</h3>
                  <p className="text-gray-400 text-sm mb-3">Personalized for this application</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-700 hover:bg-gray-700 w-full"
                  >
                    <ArrowDown className="h-4 w-4 mr-2" />
                    Download Cover Letter
                  </Button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button 
                  variant="outline" 
                  className="border-gray-700 hover:bg-gray-800"
                  onClick={() => setStep(1)}
                >
                  Start New Resume
                </Button>
                <Button 
                  className="bg-csgreen text-black hover:bg-csgreen/90"
                >
                  Apply for Job
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resume;
