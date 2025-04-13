
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ResumeOptionCard } from "@/components/ResumeOptionCard";
import { Button } from "@/components/ui/button";
import { FileUp, FilePlus } from "lucide-react";
import { Link } from "react-router-dom";

const Resume = () => {
  const [step, setStep] = useState(1);
  
  const handleNext = () => {
    setStep(current => current + 1);
  };
  
  const handlePrevious = () => {
    setStep(current => Math.max(1, current - 1));
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
                  Let's perfect your resume
                </h1>
                <p className="text-gray-400">
                  AI-Powered resume maker and enhancer
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ResumeOptionCard 
                  title="I already have one"
                  description="We'll help you enhance your resume"
                  icon={<FileUp />}
                  onClick={handleNext}
                />
                <ResumeOptionCard 
                  title="I want to start one"
                  description="We'll guide you to create your resume"
                  icon={<FilePlus />}
                  onClick={handleNext}
                />
              </div>
            </>
          )}
          
          {step === 2 && (
            <div className="bg-cssecondary p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">
                Tell us about your experience
              </h2>
              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline" 
                  className="border-gray-700 hover:bg-gray-800"
                  onClick={handlePrevious}
                >
                  Back
                </Button>
                <Button 
                  className="bg-csgreen text-black hover:bg-csgreen/90"
                  onClick={handleNext}
                >
                  Next
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
