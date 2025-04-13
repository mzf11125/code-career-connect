
import { AuthForm } from "@/components/AuthForm";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2 text-csgreen hover:underline">
        <ChevronLeft size={16} />
        Back to home
      </Link>
      
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-csdark rounded-xl overflow-hidden">
        <div className="w-full md:w-1/2 relative">
          <img 
            src="/public/lovable-uploads/bba80b72-fb3d-4fa7-914a-bf5875e8b152.png" 
            alt="Login visual" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
          <AuthForm type="login" />
        </div>
      </div>
    </div>
  );
};

export default Login;
