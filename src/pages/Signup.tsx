
import { AuthForm } from "@/components/AuthForm";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden bg-gradient-to-br from-csdark via-cssecondary to-csdark">
      <Link to="/" className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center gap-2 text-csgreen hover:underline transition-colors z-10">
        <ChevronLeft size={16} />
        Back to home
      </Link>
      
      <div className="w-full max-w-6xl flex flex-col lg:flex-row bg-gradient-to-br from-cssecondary/90 to-cssecondary/60 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-gray-800/50">
        <div className="w-full lg:w-1/2 relative order-2 lg:order-1">
          <div className="absolute inset-0 bg-gradient-to-br from-csgreen/10 to-blue-400/10" />
          <img 
            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop&crop=center" 
            alt="Diverse group of computer science students" 
            className="w-full h-64 lg:h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 lg:bottom-8 lg:left-8 lg:right-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
              Start your CS career journey
            </h2>
            <p className="text-gray-200 text-sm lg:text-base">
              Join thousands of students advancing their careers with expert mentorship.
            </p>
          </div>
        </div>
        
        <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex items-center justify-center order-1 lg:order-2">
          <div className="w-full max-w-md">
            <AuthForm type="signup" />
          </div>
        </div>
      </div>
      
      {/* Background decorations */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-csgreen/20 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-[120px] -z-10" />
    </div>
  );
};

export default Signup;
