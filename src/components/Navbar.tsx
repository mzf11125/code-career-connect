
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  
  if (isAuthPage) return null;
  
  return (
    <nav className="w-full py-4 px-6 md:px-12 flex items-center justify-between">
      <Logo />
      
      <div className="hidden md:flex items-center gap-8">
        <Link to="/mentors" className="text-white hover:text-csgreen transition-colors">
          Mentors
        </Link>
        <Link to="/courses" className="text-white hover:text-csgreen transition-colors">
          Courses
        </Link>
        <Link to="/resume" className="text-white hover:text-csgreen transition-colors">
          Resume
        </Link>
        <Link to="/jobs" className="text-white hover:text-csgreen transition-colors">
          Jobs
        </Link>
      </div>
      
      <div className="flex items-center gap-4">
        <Link to="/signup">
          <Button variant="outline" className="border-csgreen text-white hover:bg-csgreen hover:text-black">
            Sign Up
          </Button>
        </Link>
        <Link to="/login">
          <Button className="bg-white text-black hover:bg-gray-200">
            Login
          </Button>
        </Link>
      </div>
    </nav>
  );
};
