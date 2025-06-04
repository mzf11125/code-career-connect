import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoleSelection } from '@/components/RoleSelection';
import useAuth from '@/hooks/useAuth';

export const RoleSelectionPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not logged in, redirect to signup
    if (!user) {
      navigate('/signup');
    }
  }, [user, navigate]);

  const handleComplete = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4">
      <RoleSelection onComplete={handleComplete} />
    </div>
  );
};

export default RoleSelectionPage;
