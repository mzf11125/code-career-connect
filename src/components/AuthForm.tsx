
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from 'sonner';
import useAuth from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
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
  const [googleLoading, setGoogleLoading] = useState(false);
  
  const { signUp, signIn, user, updateUserRoles } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user && !showRoleSelection) {
      navigate('/');
    }
  }, [user, showRoleSelection, navigate]);

  // Check if we're coming back from OAuth
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const roles = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', session.user.id);

        if (!roles.data || roles.data.length === 0) {
          setShowRoleSelection(true);
        }
      }
    };

    checkSession();
  }, []);
  
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
    
    try {
      if (type === 'signup') {
        const { error } = await signUp(email, password, fullName);
        
        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('This email is already registered. Please try logging in instead.');
          } else {
            throw error;
          }
        } else {
          toast.success('Please check your email to verify your account');
          // The user will be redirected to role selection after email verification
        }
      } else {
        const { error } = await signIn(email, password);
        
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast.error('Invalid email or password. Please try again.');
          } else {
            throw error;
          }
        }
      }
    } catch (error: unknown) {
      console.error('Auth error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setGoogleLoading(true);
      const redirectUrl = `${window.location.origin}/auth/callback`;
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error('Google sign in error:', error);
      toast.error('Failed to sign in with Google. Please try again.');
      setGoogleLoading(false);
    }
  };

  if (showRoleSelection) {
    return (
      <div className="w-full max-w-md mx-auto glass px-8 py-10 rounded-xl">
        <RoleSelection onComplete={() => {
          setShowRoleSelection(false);
          navigate('/');
        }} />
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
          onClick={handleGoogleSignIn}
          disabled={googleLoading || loading}
          className="w-full border-gray-800 text-white hover:bg-gray-800 flex items-center justify-center gap-2"
        >
          {googleLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Please wait...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign {type === 'login' ? 'in' : 'up'} with Google
            </>
          )}
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
