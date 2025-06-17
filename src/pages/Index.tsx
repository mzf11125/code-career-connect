import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FeatureCard } from "@/components/FeatureCard";
import { MentorCard } from "@/components/MentorCard";
import { PricingCard } from "@/components/PricingCard";
import { Link } from "react-router-dom";
import { Users, BookOpen, FileText, BriefcaseBusiness, Code, Award, ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { useMentors } from "@/hooks/useMentors";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const featuresRef = useRef<HTMLElement>(null);
  const { mentors, loading: mentorsLoading } = useMentors(4); // Limit to 4 mentors for homepage
  
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
        
        {/* Features section - enhanced with better styling */}
        <section ref={featuresRef} className="full-screen-section px-6 md:px-12 relative z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-cssecondary/80 via-cssecondary to-cssecondary/80"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(74,227,181,0.05),transparent_70%)]"></div>
          
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-20">
              <div className="inline-block bg-csgreen/10 border border-csgreen/30 rounded-full px-6 py-2 mb-6">
                <span className="text-csgreen font-semibold text-sm uppercase tracking-wider">Platform Features</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Everything You Need to Succeed
              </h2>
              <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
                Our comprehensive platform provides all the tools and resources to accelerate your CS career and land your dream job
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-csgreen to-blue-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-cssecondary/90 backdrop-blur-sm p-8 rounded-2xl border border-gray-800/50 hover:border-csgreen/30 transition-all duration-300 hover:transform hover:scale-[1.02]">
                  <div className="text-csgreen mb-6 p-3 bg-csgreen/10 rounded-xl w-fit">
                    <Users size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-csgreen transition-colors">Expert Mentors</h3>
                  <p className="text-gray-400 leading-relaxed">Connect with seasoned professionals from top tech companies who provide personalized guidance</p>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-cssecondary/90 backdrop-blur-sm p-8 rounded-2xl border border-gray-800/50 hover:border-blue-400/30 transition-all duration-300 hover:transform hover:scale-[1.02]">
                  <div className="text-blue-400 mb-6 p-3 bg-blue-400/10 rounded-xl w-fit">
                    <BookOpen size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">Learning Resources</h3>
                  <p className="text-gray-400 leading-relaxed">Access curated courses, tutorials, and study materials tailored to current industry demands</p>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-cssecondary/90 backdrop-blur-sm p-8 rounded-2xl border border-gray-800/50 hover:border-purple-400/30 transition-all duration-300 hover:transform hover:scale-[1.02]">
                  <div className="text-purple-400 mb-6 p-3 bg-purple-400/10 rounded-xl w-fit">
                    <FileText size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-purple-400 transition-colors">Resume Builder</h3>
                  <p className="text-gray-400 leading-relaxed">Create standout, ATS-friendly resumes with AI-powered suggestions and industry templates</p>
                </div>
              </div>
              
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-400 to-csgreen rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
                <div className="relative bg-cssecondary/90 backdrop-blur-sm p-8 rounded-2xl border border-gray-800/50 hover:border-pink-400/30 transition-all duration-300 hover:transform hover:scale-[1.02]">
                  <div className="text-pink-400 mb-6 p-3 bg-pink-400/10 rounded-xl w-fit">
                    <BriefcaseBusiness size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-pink-400 transition-colors">Job Opportunities</h3>
                  <p className="text-gray-400 leading-relaxed">Apply to exclusive job listings specifically curated for new graduates and entry-level positions</p>
                </div>
              </div>
            </div>
            
            {/* Divider */}
            <div className="flex justify-center mb-8">
              <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-csgreen/50 to-transparent"></div>
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
        
        {/* Mentors section - cleaned up and improved */}
        <section className="full-screen-section px-6 md:px-12 relative mentors-section">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
              <div className="order-2 md:order-1">
                <div className="inline-block bg-csgreen/10 border border-csgreen/30 rounded-full px-6 py-2 mb-6">
                  <span className="text-csgreen font-semibold text-sm uppercase tracking-wider">Expert Guidance</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Mentors That Make a Difference
                </h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  Learn from industry professionals who have successfully navigated the tech landscape. Our mentors provide personalized guidance, career insights, and practical advice to help you achieve your goals faster.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-csgreen rounded-full"></div>
                    <span className="text-gray-300">1-on-1 personalized sessions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-csgreen rounded-full"></div>
                    <span className="text-gray-300">Industry-specific career guidance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-csgreen rounded-full"></div>
                    <span className="text-gray-300">Portfolio and resume reviews</span>
                  </div>
                </div>
                <Link to="/mentors">
                  <Button className="bg-gradient-to-r from-csgreen to-blue-400 text-black hover:opacity-90 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105">
                    Browse All Mentors <ArrowRight size={20} className="ml-2" />
                  </Button>
                </Link>
              </div>
              
              <div className="order-1 md:order-2 relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-csgreen/20 to-blue-400/20 rounded-3xl blur-2xl"></div>
                <div className="relative bg-cssecondary/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div className="w-full aspect-square bg-gradient-to-br from-csgreen/20 to-blue-400/20 rounded-xl flex items-center justify-center">
                        <Users size={48} className="text-csgreen" />
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">500+</div>
                        <div className="text-sm text-gray-400">Expert Mentors</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="w-full aspect-square bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-xl flex items-center justify-center">
                        <Award size={48} className="text-blue-400" />
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">10k+</div>
                        <div className="text-sm text-gray-400">Success Stories</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {mentorsLoading ? (
              <div className="flex justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-csgreen"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {mentors.map(mentor => (
                  <MentorCard 
                    key={mentor.id}
                    id={mentor.id}
                    name={mentor.name}
                    role={mentor.role}
                    rating={mentor.rating}
                    reviewCount={mentor.review_count}
                    imageUrl={mentor.image_url || ''}
                    expertise={mentor.expertise}
                    hourlyRate={mentor.hourly_rate}
                    bio={mentor.bio}
                  />
                ))}
              </div>
            )}
            
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
