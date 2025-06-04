import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        // Wait for the session to be restored after redirect
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          // The onAuthStateChange in AuthContext will handle the redirection
          // based on whether the user has roles set or not
          console.log('User signed in:', session.user.id);
        } else {
          // No session found, redirect to login
          navigate('/login');
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
        navigate('/login');
      }
    };

    checkUser();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-csgreen mx-auto mb-4"></div>
        <p className="text-gray-200">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
