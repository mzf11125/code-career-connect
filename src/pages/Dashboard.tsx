
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import useAuth from '@/hooks/useAuth';
import { useUserRoles } from '@/hooks/useUserRoles';

export const Dashboard = () => {
  const { user } = useAuth();
  const { roles, loading } = useUserRoles();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // If roles are loaded and user has no roles, redirect to role selection
    if (!loading && roles.length === 0) {
      navigate('/role-selection');
      return;
    }
  }, [user, roles, loading, navigate]);

  // Show loading while checking auth and roles
  if (!user || loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-csgreen mx-auto mb-4"></div>
          <p className="text-gray-200">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // If user has no roles, don't render anything (will redirect)
  if (roles.length === 0) {
    return null;
  }

  return <DashboardLayout />;
};

export default Dashboard;
