
import { useState, useEffect } from 'react';
import { getAllMentors, type Mentor } from '@/services/mentorService';

export const useMentors = (limit?: number) => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const { data, error: fetchError } = await getAllMentors();
        
        if (fetchError) {
          setError('Failed to fetch mentors');
          console.error('Error fetching mentors:', fetchError);
        } else {
          const mentorData = data || [];
          setMentors(limit ? mentorData.slice(0, limit) : mentorData);
        }
      } catch (err) {
        setError('Failed to fetch mentors');
        console.error('Error fetching mentors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, [limit]);

  return { mentors, loading, error };
};
