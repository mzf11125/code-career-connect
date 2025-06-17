
import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUserRoles } from '@/hooks/useUserRoles';
import { StudentDashboard } from './StudentDashboard';
import { MentorDashboard } from './MentorDashboard';
import { Navbar } from '@/components/Navbar';

interface DashboardLayoutProps {
  children?: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { roles, loading, isStudent, isMentor, isLearner } = useUserRoles();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-white">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (roles.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Card className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">No Role Assigned</h2>
            <p className="text-gray-400">Please contact support to assign your role.</p>
          </Card>
        </div>
      </div>
    );
  }

  const hasMultipleRoles = roles.length > 1;
  const hasStudentRole = isStudent || isLearner;

  if (!hasMultipleRoles) {
    return (
      <div className="min-h-screen bg-gray-950">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          {hasStudentRole && <StudentDashboard />}
          {isMentor && <MentorDashboard />}
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue={hasStudentRole ? "student" : "mentor"} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            {hasStudentRole && <TabsTrigger value="student">Student Dashboard</TabsTrigger>}
            {isMentor && <TabsTrigger value="mentor">Mentor Dashboard</TabsTrigger>}
          </TabsList>
          
          {hasStudentRole && (
            <TabsContent value="student">
              <StudentDashboard />
            </TabsContent>
          )}
          
          {isMentor && (
            <TabsContent value="mentor">
              <MentorDashboard />
            </TabsContent>
          )}
        </Tabs>
        {children}
      </div>
    </div>
  );
};
