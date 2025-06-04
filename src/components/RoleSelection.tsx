
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, BookOpen } from 'lucide-react';
import useAuth from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface RoleSelectionProps {
  onComplete: () => void;
}

export const RoleSelection = ({ onComplete }: RoleSelectionProps) => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { updateUserRoles } = useAuth();
  const navigate = useNavigate();

  const toggleRole = (role: string) => {
    setSelectedRoles(prev => 
      prev.includes(role) 
        ? prev.filter(r => r !== role)
        : [...prev, role]
    );
  };

  const handleSubmit = async () => {
    if (selectedRoles.length === 0) {
      toast.error('Please select at least one role');
      return;
    }

    setLoading(true);
    const { error } = await updateUserRoles(selectedRoles);
    
    if (error) {
      toast.error('Failed to set roles: ' + error.message);
    } else {
      toast.success('Roles set successfully!');
      navigate('/');
      onComplete();
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Choose Your Role</h2>
        <p className="text-gray-400 mb-6">You can select both roles if applicable</p>
      </div>

      <div className="space-y-4">
        <Card 
          className={`p-6 cursor-pointer border-2 transition-all ${
            selectedRoles.includes('student') 
              ? 'border-csgreen bg-csgreen/10' 
              : 'border-gray-800 hover:border-gray-700'
          }`}
          onClick={() => toggleRole('student')}
        >
          <div className="flex items-center gap-4">
            <BookOpen size={24} className={selectedRoles.includes('student') ? 'text-csgreen' : 'text-gray-400'} />
            <div>
              <h3 className="font-semibold">Student</h3>
              <p className="text-sm text-gray-400">Access courses, mentorship, and career resources</p>
            </div>
          </div>
        </Card>

        <Card 
          className={`p-6 cursor-pointer border-2 transition-all ${
            selectedRoles.includes('mentor') 
              ? 'border-csgreen bg-csgreen/10' 
              : 'border-gray-800 hover:border-gray-700'
          }`}
          onClick={() => toggleRole('mentor')}
        >
          <div className="flex items-center gap-4">
            <Users size={24} className={selectedRoles.includes('mentor') ? 'text-csgreen' : 'text-gray-400'} />
            <div>
              <h3 className="font-semibold">Mentor</h3>
              <p className="text-sm text-gray-400">Share knowledge and guide students in their career journey</p>
            </div>
          </div>
        </Card>
      </div>

      <Button 
        onClick={handleSubmit}
        disabled={selectedRoles.length === 0 || loading}
        className="w-full bg-csgreen text-black hover:bg-csgreen/90"
      >
        {loading ? 'Setting up...' : 'Continue'}
      </Button>
    </div>
  );
};
