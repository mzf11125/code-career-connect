
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FeatureCard } from "@/components/FeatureCard";
import { MentorCard } from "@/components/MentorCard";
import { PricingCard } from "@/components/PricingCard";
import { Link } from "react-router-dom";
import { Users, BookOpen, FileText, BriefcaseBusiness, Code, Award, ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const featuresRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToNextSection = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Web3 inspired background elements */}
      <div className="noise"></div>
      <div className="hex-grid"></div>
      <div className="grid-bg fixed inset-0 z-0"></div>
      
      {/* Animated background blobs - more vibrant and varied */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] blob-animation"></div>
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-[120px] blob-animation" style={{ animationDelay: '-5s' }}></div>
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-csgreen/15 rounded-full blur-[150px] blob-animation" style={{ animationDelay: '-10s' }}></div>
        <div className="absolute center right-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-[130px] blob-animation" style={{ animationDelay: '-15s' }}></div>
      </div>
      
      <Navbar />
      
      <main className="z-10 relative scroll-container">
        {/* Hero section with full height and enhanced styling */}
        <section className="full-screen-section px-6 md:px-12 overflow-hidden">
          <div className={`container mx-auto text-center relative z-10 transition-all duration-1000 transform hero-content ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              WELCOME TO<br />
              <span className="bg-gradient-to-r from-csgreen via-blue-400 to-purple-400 text-transparent bg-clip-text text-glow">
                UnemployedCS Students
              </span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto mb-12 text-xl">
              Your ultimate platform for mentorship, learning resources, and job opportunities for CS students and graduates
            </p>
            <Link to="/signup">
              <Button className="bg-csgreen text-black hover:bg-csgreen/90 px-8 py-6 rounded-xl glow relative overflow-hidden group">
                <span className="relative z-10 text-lg font-medium">Start Your Journey</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </Button>
            </Link>
            
            {/* Web3 decorative elements */}
            <div className="mt-32 flex justify-center">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-csgreen/50 to-transparent"></div>
                <div className="text-csgreen opacity-70">Web3 Inspired</div>
                <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-csgreen/50 to-transparent"></div>
              </div>
            </div>
          </div>
          
          {/* Scroll indicator */}
          <div className="section-divider fade-in-bottom" style={{ animationDelay: '1s' }}>
            <button 
              onClick={scrollToNextSection} 
              className="text-csgreen hover:text-white transition-colors scroll-indicator"
              aria-label="Scroll to next section"
            >
              <ChevronDown size={36} />
            </button>
          </div>
        </section>
        
        {/* Features section - with web3 card styling */}
        <section ref={featuresRef} className="full-screen-section px-6 md:px-12 bg-cssecondary relative z-10">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">OUR FEATURES</h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
              Our platform offers everything you need to accelerate your CS career and land your dream job
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="web3-card p-6 relative overflow-hidden group">
                <div className="text-csgreen mb-4 text-3xl"><Users /></div>
                <h3 className="text-xl font-bold mb-2">Expert Mentors</h3>
                <p className="text-gray-400">Connect with professionals from top tech companies</p>
                <div className="absolute -right-10 -top-10 w-20 h-20 rounded-full bg-csgreen/10 group-hover:bg-csgreen/20 transition-all duration-500"></div>
              </div>
              
              <div className="web3-card p-6 relative overflow-hidden group">
                <div className="text-csgreen mb-4 text-3xl"><BookOpen /></div>
                <h3 className="text-xl font-bold mb-2">Learning Resources</h3>
                <p className="text-gray-400">Access curated courses and study materials</p>
                <div className="absolute -right-10 -top-10 w-20 h-20 rounded-full bg-csgreen/10 group-hover:bg-csgreen/20 transition-all duration-500"></div>
              </div>
              
              <div className="web3-card p-6 relative overflow-hidden group">
                <div className="text-csgreen mb-4 text-3xl"><FileText /></div>
                <h3 className="text-xl font-bold mb-2">Resume Builder</h3>
                <p className="text-gray-400">Create standout resumes with AI assistance</p>
                <div className="absolute -right-10 -top-10 w-20 h-20 rounded-full bg-csgreen/10 group-hover:bg-csgreen/20 transition-all duration-500"></div>
              </div>
              
              <div className="web3-card p-6 relative overflow-hidden group">
                <div className="text-csgreen mb-4 text-3xl"><BriefcaseBusiness /></div>
                <h3 className="text-xl font-bold mb-2">Job Opportunities</h3>
                <p className="text-gray-400">Apply to exclusive job listings for new graduates</p>
                <div className="absolute -right-10 -top-10 w-20 h-20 rounded-full bg-csgreen/10 group-hover:bg-csgreen/20 transition-all duration-500"></div>
              </div>
            </div>
            
            {/* Scroll indicator */}
            <div className="section-divider">
              <button 
                onClick={() => document.querySelector('.mentors-section')?.scrollIntoView({ behavior: 'smooth' })} 
                className="text-csgreen hover:text-white transition-colors scroll-indicator"
                aria-label="Scroll to next section"
              >
                <ChevronDown size={36} />
              </button>
            </div>
          </div>
        </section>
        
        {/* Mentors section - with improved UI */}
        <section className="full-screen-section px-6 md:px-12 relative mentors-section">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div className="relative flex justify-center md:justify-start floating" style={{ gap: 24 }}>
                <div className="w-64 h-64 bg-cssecondary rounded-xl relative z-10 glass border border-csgreen/30" style={{ marginRight: '-5rem' }}></div>
                <div className="w-64 h-64 bg-csgreen/10 rounded-xl border border-csgreen/20"></div>
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-4">Mentors That Make a Difference</h2>
                <p className="text-gray-400 mb-6">
                  Learn from professionals who have been where you are and successfully navigated the tech industry. Our mentors provide personalized guidance to help you achieve your career goals.
                </p>
                <Link to="/mentors">
                  <Button className="bg-gradient-to-r from-csgreen to-blue-400 text-black hover:opacity-90 glow">
                    Browse Mentors
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Updated mentor cards with real Unsplash photos */}
              <MentorCard 
                name="Sarah Chen"
                role="Senior Software Engineer at Google"
                rating={5.0}
                reviewCount={342}
                imageUrl="https://images.unsplash.com/photo-1494790108755-2616b612b5c5?w=400&h=400&fit=crop&crop=face"
              />
              <MentorCard 
                name="Marcus Johnson"
                role="Full Stack Developer at Microsoft"
                rating={4.9}
                reviewCount={217}
                imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
              />
              <MentorCard 
                name="Emily Rodriguez"
                role="Tech Lead at Meta"
                rating={5.0}
                reviewCount={189}
                imageUrl="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
              />
              <MentorCard 
                name="David Park"
                role="Senior DevOps Engineer at Amazon"
                rating={4.8}
                reviewCount={156}
                imageUrl="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
              />
            </div>
            
            {/* Scroll indicator */}
            <div className="section-divider">
              <button 
                onClick={() => document.querySelector('.resume-builder-section')?.scrollIntoView({ behavior: 'smooth' })} 
                className="text-csgreen hover:text-white transition-colors scroll-indicator"
                aria-label="Scroll to next section"
              >
                <ChevronDown size={36} />
              </button>
            </div>
          </div>
          
          {/* Decorative mesh grid */}
          <div className="absolute bottom-0 left-0 right-0 h-40 opacity-30 bg-gradient-to-t from-cssecondary to-transparent"></div>
        </section>
        
        {/* Resume Builder section - with web3 styling and sample resume */}
        <section className="full-screen-section px-6 md:px-12 bg-cssecondary relative resume-builder-section">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-4">Build a Resume That Gets You Hired</h2>
                <p className="text-gray-400 mb-6">
                  Our AI-powered resume builder helps you create professional, ATS-friendly resumes that highlight your strengths and stand out to recruiters.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3 group">
                    <div className="mt-1 text-csgreen bg-csgreen/10 p-2 rounded-full border border-csgreen/30 group-hover:bg-csgreen/30 transition-all"><Code size={18} /></div>
                    <span className="pt-1">Tailored for tech roles with industry-specific templates</span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <div className="mt-1 text-csgreen bg-csgreen/10 p-2 rounded-full border border-csgreen/30 group-hover:bg-csgreen/30 transition-all"><Award size={18} /></div>
                    <span className="pt-1">AI suggestions to optimize your content for specific job listings</span>
                  </li>
                </ul>
                <Link to="/resume">
                  <Button className="bg-gradient-to-r from-csgreen to-blue-400 text-black hover:opacity-90 glow">
                    Create Your Resume <ArrowRight size={16} className="ml-2" />
                  </Button>
                </Link>
              </div>
              <div className="relative">
                {/* Sample resume image */}
                <div className="bg-white rounded-xl shadow-2xl p-6 web3-card border border-csgreen/20 max-w-md mx-auto">
                  <img 
                    src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=800&fit=crop" 
                    alt="Professional Resume Sample" 
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-20 h-20 rounded-full border border-csgreen/30 opacity-30"></div>
                <div className="absolute -bottom-10 -left-10 w-16 h-16 rounded-full border border-blue-400/30 opacity-30"></div>
              </div>
            </div>
            
            {/* Scroll indicator */}
            <div className="section-divider">
              <button 
                onClick={() => document.querySelector('.pricing-section')?.scrollIntoView({ behavior: 'smooth' })} 
                className="text-csgreen hover:text-white transition-colors scroll-indicator"
                aria-label="Scroll to next section"
              >
                <ChevronDown size={36} />
              </button>
            </div>
          </div>
        </section>
        
        {/* Pricing section - marked as currently free */}
        <section className="full-screen-section px-6 md:px-12 relative pricing-section">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block bg-csgreen/20 border border-csgreen/40 rounded-full px-6 py-2 mb-4">
                <span className="text-csgreen font-semibold">🎉 CURRENTLY FREE FOR ALL USERS! 🎉</span>
              </div>
              <h2 className="text-4xl font-bold mb-4 line-through opacity-50">START LANDING JOBS WITH US!</h2>
              <p className="text-gray-400 max-w-2xl mx-auto mb-16">
                All features are currently available for free during our beta phase. Future pricing shown below.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-50">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/10 rounded-xl"></div>
                <div className="line-through">
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
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/10 rounded-xl"></div>
                <div className="line-through">
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
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-red-500/10 rounded-xl"></div>
                <div className="line-through">
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
            </div>
            
            {/* Web3 decorative elements */}
            <div className="mt-20 flex justify-center">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-csgreen/50 to-transparent"></div>
                <div className="text-csgreen opacity-70">Enjoy Free Access During Beta</div>
                <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-csgreen/50 to-transparent"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
