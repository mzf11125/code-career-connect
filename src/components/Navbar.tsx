
import { Link } from "react-router-dom";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { Menu, X, Users, BookOpen, FileText, Briefcase, LogOut, User, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";

export const Navbar = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  
  if (isAuthPage) return null;
  
  const navItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Mentors", path: "/mentors", icon: <Users size={18} /> },
    { name: "Courses", path: "/courses", icon: <BookOpen size={18} /> },
    { name: "Resume", path: "/resume", icon: <FileText size={18} /> },
    { name: "Jobs", path: "/jobs", icon: <Briefcase size={18} /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    toast.success('Logged out successfully');
  };
  
  return (
    <nav className="w-full py-4 px-6 md:px-12 flex items-center justify-between backdrop-blur-md bg-csdark/90 sticky top-0 z-50 border-b border-gray-800">
      <Logo />
      
      <div className="hidden md:flex items-center gap-8">
        {user && navItems.map((item) => (
          <Link 
            key={item.path}
            to={item.path} 
            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-md transition-all ${
              isActive(item.path) 
                ? "text-csgreen bg-csgreen/10 font-medium" 
                : "text-white hover:text-csgreen hover:bg-gray-800/50"
            }`}
          >
            {item.icon}
            {item.name}
            {isActive(item.path) && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-csgreen"></div>
            )}
          </Link>
        ))}
      </div>
      
      <div className="hidden md:flex items-center gap-4">
        {user ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-white">
              <User size={18} />
              <span className="text-sm">{user.email}</span>
            </div>
            <Button 
              onClick={handleSignOut}
              variant="outline" 
              size="sm"
              className="border-gray-600 text-white hover:bg-gray-800"
            >
              <LogOut size={16} />
              Sign Out
            </Button>
          </div>
        ) : (
          <>
            <Link to="/signup">
              <Button variant="outline" className="border-csgreen text-white hover:bg-csgreen hover:text-black">
                Sign Up
              </Button>
            </Link>
            <Link to="/login">
              <Button className="bg-gradient-to-r from-csgreen to-blue-400 text-black hover:opacity-90">
                Login
              </Button>
            </Link>
          </>
        )}
      </div>
      
      <button 
        className="md:hidden text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-csdark border-b border-gray-800 py-4 px-6 md:hidden flex flex-col gap-4">
          {user && navItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`flex items-center gap-2 py-2 ${
                isActive(item.path) 
                  ? "text-csgreen font-medium" 
                  : "text-white hover:text-csgreen"
              }`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
          
          <div className="flex flex-col gap-3 mt-2 pt-4 border-t border-gray-800">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-white">
                  <User size={18} />
                  <span className="text-sm">{user.email}</span>
                </div>
                <Button 
                  onClick={handleSignOut}
                  variant="outline" 
                  className="w-full border-gray-600 text-white hover:bg-gray-800"
                >
                  <LogOut size={16} />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Link to="/signup">
                  <Button variant="outline" className="w-full border-csgreen text-white hover:bg-csgreen hover:text-black">
                    Sign Up
                  </Button>
                </Link>
                <Link to="/login">
                  <Button className="w-full bg-gradient-to-r from-csgreen to-blue-400 text-black hover:opacity-90">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
