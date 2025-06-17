
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import useAuth from '@/hooks/useAuth';

export const useUserRoles = () => {
  const { user } = useAuth();
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      if (user) {
        setLoading(true);
        
        // Fetch roles directly from Supabase instead of using auth context method
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        if (error) {
          console.error('Error fetching user roles:', error);
          setRoles([]);
        } else {
          setRoles(data.map(item => item.role));
        }
        setLoading(false);
      } else {
        setRoles([]);
        setLoading(false);
      }
    };

    fetchRoles();
  }, [user]);

  const hasRole = (role: string) => roles.includes(role);
  const isStudent = hasRole('student');
  const isMentor = hasRole('mentor');
  const isLearner = hasRole('learner');

  return {
    roles,
    loading,
    hasRole,
    isStudent,
    isMentor,
    isLearner,
  };
};
