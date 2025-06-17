
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, MessageCircle, Users, TrendingUp } from 'lucide-react';
import { getCourseEnrollments, getMentorRequests, getChatSessions } from '@/services/mentorshipService';
import { toast } from 'sonner';

export const StudentDashboard = () => {
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [mentorRequests, setMentorRequests] = useState<any[]>([]);
  const [chatSessions, setChatSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      try {
        const [enrollmentsResult, requestsResult, sessionsResult] = await Promise.all([
          getCourseEnrollments(),
          getMentorRequests('sent'),
          getChatSessions(),
        ]);

        if (enrollmentsResult.data) setEnrollments(enrollmentsResult.data);
        if (requestsResult.data) setMentorRequests(requestsResult.data);
        if (sessionsResult.data) setChatSessions(sessionsResult.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="text-white">Loading student dashboard...</div>;
  }

  const completedCourses = enrollments.filter(e => e.status === 'completed').length;
  const activeCourses = enrollments.filter(e => e.status === 'active').length;
  const pendingRequests = mentorRequests.filter(r => r.status === 'pending').length;
  const activeSessions = chatSessions.filter(s => s.status === 'active').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <BookOpen className="text-csgreen" size={24} />
        <h1 className="text-2xl font-bold text-white">Student Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-csgreen" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{activeCourses}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Completed</CardTitle>
            <TrendingUp className="h-4 w-4 text-csgreen" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{completedCourses}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Mentor Requests</CardTitle>
            <Users className="h-4 w-4 text-csgreen" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{pendingRequests}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Chats</CardTitle>
            <MessageCircle className="h-4 w-4 text-csgreen" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{activeSessions}</div>
          </CardContent>
        </Card>
      </div>

      {/* Course Enrollments */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">My Courses</CardTitle>
        </CardHeader>
        <CardContent>
          {enrollments.length === 0 ? (
            <p className="text-gray-400">No courses enrolled yet.</p>
          ) : (
            <div className="space-y-4">
              {enrollments.slice(0, 5).map((enrollment) => (
                <div key={enrollment.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{enrollment.course?.title || 'Course Title'}</h3>
                    <p className="text-sm text-gray-400">{enrollment.course?.description || 'Course description'}</p>
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-csgreen h-2 rounded-full transition-all" 
                            style={{ width: `${enrollment.progress_percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-400">{enrollment.progress_percentage}%</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={enrollment.status === 'completed' ? 'default' : 'secondary'}>
                    {enrollment.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Chat Sessions */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Recent Mentoring Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          {chatSessions.length === 0 ? (
            <p className="text-gray-400">No mentoring sessions yet.</p>
          ) : (
            <div className="space-y-4">
              {chatSessions.slice(0, 3).map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-white">{session.title}</h3>
                    <p className="text-sm text-gray-400">
                      Last activity: {new Date(session.last_message_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {session.unread_count_learner > 0 && (
                      <Badge variant="destructive">{session.unread_count_learner}</Badge>
                    )}
                    <Badge variant={session.status === 'active' ? 'default' : 'secondary'}>
                      {session.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
