
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FeatureCard } from "@/components/FeatureCard";
import { MentorCard } from "@/components/MentorCard";
import { PricingCard } from "@/components/PricingCard";
import { Link } from "react-router-dom";
import { Users, BookOpen, FileText, BriefcaseBusiness, Code, Award, ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        {/* Hero section */}
        <section className="relative py-20 px-6 md:px-12 overflow-hidden">
          {/* Background blobs */}
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-blue-500/20 rounded-full blur-[120px] blob-animation"></div>
          <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] blob-animation"></div>
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-csgreen/20 rounded-full blur-[120px] blob-animation"></div>
          
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              WELCOME TO<br />
              <span className="bg-gradient-to-r from-white to-csgreen text-transparent bg-clip-text">
                UnemployedCS Students
              </span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Your ultimate platform for mentorship, learning resources, and job opportunities for CS students and graduates
            </p>
            <Link to="/signup">
              <Button className="bg-csgreen text-black hover:bg-csgreen/90 px-8 py-6">
                Start
              </Button>
            </Link>
          </div>
        </section>
        
        {/* Features section */}
        <section className="py-20 px-6 md:px-12 bg-cssecondary">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">OUR FEATURES</h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
              Our platform offers everything you need to accelerate your CS career and land your dream job
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <FeatureCard 
                title="Expert Mentors"
                description="Connect with professionals from top tech companies"
                icon={<Users />}
              />
              <FeatureCard 
                title="Learning Resources"
                description="Access curated courses and study materials"
                icon={<BookOpen />}
              />
              <FeatureCard 
                title="Resume Builder"
                description="Create standout resumes with AI assistance"
                icon={<FileText />}
              />
              <FeatureCard 
                title="Job Opportunities"
                description="Apply to exclusive job listings for new graduates"
                icon={<BriefcaseBusiness />}
              />
            </div>
          </div>
        </section>
        
        {/* Mentors section */}
        <section className="py-20 px-6 md:px-12">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div className="relative flex justify-center md:justify-start" style={{ gap: 24 }}>
                <div className="w-64 h-64 bg-cssecondary rounded-xl relative z-10 glass" style={{ marginRight: '-5rem' }}></div>
                <div className="w-64 h-64 bg-csgreen/10 rounded-xl"></div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">Mentors That Make a Difference</h2>
                <p className="text-gray-400 mb-6">
                  Learn from professionals who have been where you are and successfully navigated the tech industry. Our mentors provide personalized guidance to help you achieve your career goals.
                </p>
                <Link to="/mentors">
                  <Button className="bg-csgreen text-black hover:bg-csgreen/90">
                    Browse Mentors
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MentorCard 
                name="Sarah Johnson"
                role="Senior Software Engineer"
                rating={5.0}
                reviewCount={342}
                imageUrl="/lovable-uploads/mentor2.jpg"
              />
              <MentorCard 
                name="David Chen"
                role="Product Manager"
                rating={4.9}
                reviewCount={217}
                imageUrl="/lovable-uploads/mentor3.jpg"
              />
              <MentorCard 
                name="Olivia Stone"
                role="Tech Lead"
                rating={5.0}
                reviewCount={189}
                imageUrl="/lovable-uploads/Olivia-Rodrigo.png"
              />
              <MentorCard 
                name="Jessica Lee"
                role="UX Designer"
                rating={4.8}
                reviewCount={156}
                imageUrl="/lovable-uploads/Olivia-Rodrigo.png"
              />
            </div>
          </div>
        </section>
        
        {/* Resume Builder section */}
        <section className="py-20 px-6 md:px-12 bg-cssecondary">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Build a Resume That Gets You Hired</h2>
                <p className="text-gray-400 mb-6">
                  Our AI-powered resume builder helps you create professional, ATS-friendly resumes that highlight your strengths and stand out to recruiters.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-csgreen"><Code size={18} /></div>
                    <span>Tailored for tech roles with industry-specific templates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-csgreen"><Award size={18} /></div>
                    <span>AI suggestions to optimize your content for specific job listings</span>
                  </li>
                </ul>
                <Link to="/resume">
                  <Button className="bg-csgreen text-black hover:bg-csgreen/90">
                    Create Your Resume <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 h-64 rounded-xl"></div>
                <div className="bg-gray-800 h-64 rounded-xl"></div>
                <div className="bg-gray-800 h-64 rounded-xl"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing section */}
        <section className="py-20 px-6 md:px-12">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">START LANDING JOBS WITH US!</h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
              Choose the plan that suits your needs and start your journey to landing your dream tech job
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PricingCard 
                title="Student"
                price={0}
                description="Perfect for students just starting their job search"
                features={[
                  "Access to basic resources",
                  "Resume builder",
                  "Job listings view",
                  "Community access"
                ]}
              />
              <PricingCard 
                title="Graduate"
                price={30}
                description="Ideal for recent graduates serious about their job search"
                features={[
                  "Everything in Student plan",
                  "1:1 mentorship sessions",
                  "Resume review by professionals",
                  "Mock interview practice",
                  "Priority job application"
                ]}
                highlighted
              />
              <PricingCard 
                title="Professional"
                price={50}
                description="For experienced professionals looking to level up their career"
                features={[
                  "Everything in Graduate plan",
                  "Career strategy sessions",
                  "Skill gap analysis",
                  "Personalized learning path",
                  "Executive mentorship access",
                  "Exclusive job opportunities"
                ]}
              />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

