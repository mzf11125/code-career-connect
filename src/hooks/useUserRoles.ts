
import { useState, useEffect } from 'react';
import useAuth from '@/hooks/useAuth';

export const useUserRoles = () => {
  const { user, getUserRoles } = useAuth();
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      if (user) {
        setLoading(true);
        const userRoles = await getUserRoles(user.id);
        setRoles(userRoles);
        setLoading(false);
      } else {
        setRoles([]);
        setLoading(false);
      }
    };

    fetchRoles();
  }, [user, getUserRoles]);

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
