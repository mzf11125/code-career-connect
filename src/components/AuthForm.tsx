
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { RoleSelection } from './RoleSelection';

interface AuthFormProps {
  type: 'login' | 'signup';
}

export const AuthForm = ({ type }: AuthFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { signUp, signIn, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user && !showRoleSelection) {
    navigate('/');
    return null;
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (type === 'signup' && !fullName) {
      toast.error('Please enter your full name');
      return;
    }
    
    setLoading(true);
    
    if (type === 'signup') {
      const { error } = await signUp(email, password, fullName);
      
      if (error) {
        if (error.message.includes('already registered')) {
          toast.error('This email is already registered. Please try logging in instead.');
        } else {
          toast.error('Signup failed: ' + error.message);
        }
      } else {
        toast.success('Please check your email to verify your account');
        // Show role selection after successful signup
        setShowRoleSelection(true);
      }
    } else {
      const { error } = await signIn(email, password);
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password. Please try again.');
        } else {
          toast.error('Login failed: ' + error.message);
        }
      } else {
        toast.success('Logged in successfully!');
        navigate('/');
      }
    }
    
    setLoading(false);
  };

  if (showRoleSelection) {
    return (
      <div className="w-full max-w-md mx-auto glass px-8 py-10 rounded-xl">
        <RoleSelection onComplete={() => setShowRoleSelection(false)} />
      </div>
    );
  }
  
  return (
    <div className="w-full max-w-md mx-auto glass px-8 py-10 rounded-xl">
      <div className="absolute -z-10 top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-40 w-72 h-72 bg-blue-500/30 rounded-full blur-[100px] blob-animation"></div>
        <div className="absolute bottom-20 right-40 w-72 h-72 bg-csgreen/30 rounded-full blur-[100px] blob-animation"></div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6 text-center">
        {type === 'login' ? 'Hey, welcome back!' : 'Hey, welcome!'}
      </h2>
      <p className="text-gray-400 text-center mb-8">
        {type === 'login' 
          ? 'Please enter your information to log in' 
          : 'Please create your account to sign up'}
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {type === 'signup' && (
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="bg-gray-900/50 border-gray-800"
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-gray-900/50 border-gray-800"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-900/50 border-gray-800 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          
          {type === 'login' && (
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-csgreen">
                Forgot Password?
              </Link>
            </div>
          )}
        </div>
        
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-white text-black hover:bg-gray-200"
        >
          {loading ? 'Please wait...' : (type === 'login' ? 'Sign In' : 'Sign Up')}
        </Button>
        
        <div className="relative flex items-center justify-center gap-4 my-4">
          <div className="h-px flex-1 bg-gray-800"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="h-px flex-1 bg-gray-800"></div>
        </div>
        
        <Button 
          type="button" 
          variant="outline" 
          className="w-full border-gray-800 text-white hover:bg-gray-800"
        >
          Sign {type === 'login' ? 'in' : 'up'} with Google
        </Button>
        
        {type === 'login' ? (
          <p className="text-sm text-gray-400 text-center mt-6">
            Don't have an account yet? <Link to="/signup" className="text-csgreen">Sign up</Link>
          </p>
        ) : (
          <p className="text-sm text-gray-400 text-center mt-6">
            Already have an account? <Link to="/login" className="text-csgreen">Sign in</Link>
          </p>
        )}
      </form>
    </div>
  );
};
