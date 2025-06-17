import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, MessageCircle, CheckCircle, Clock, Calendar, Video, BookOpen } from 'lucide-react';
import { getMentorRequests, getChatSessions, updateMentorRequestStatus } from '@/services/mentorshipService';
import { SessionsList } from '@/components/session/SessionsList';
import { CourseManagement } from '@/components/course/CourseManagement';
import { toast } from 'sonner';

export const MentorDashboard = () => {
  const [mentorRequests, setMentorRequests] = useState<any[]>([]);
  const [chatSessions, setChatSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      
      try {
        const [requestsResult, sessionsResult] = await Promise.all([
          getMentorRequests('received'),
          getChatSessions(),
        ]);

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

  const handleRequestAction = async (requestId: string, action: 'accepted' | 'rejected') => {
    try {
      const { error } = await updateMentorRequestStatus(requestId, action);
      if (error) throw error;

      setMentorRequests(prev => 
        prev.map(req => 
          req.id === requestId ? { ...req, status: action } : req
        )
      );

      toast.success(`Request ${action} successfully`);
    } catch (error) {
      console.error('Error updating request:', error);
      toast.error(`Failed to ${action} request`);
    }
  };

  if (loading) {
    return <div className="text-white">Loading mentor dashboard...</div>;
  }

  const pendingRequests = mentorRequests.filter(r => r.status === 'pending').length;
  const acceptedRequests = mentorRequests.filter(r => r.status === 'accepted').length;
  const activeSessions = chatSessions.filter(s => s.status === 'active').length;
  const totalMentees = new Set(chatSessions.map(s => s.learner_id)).size;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Users className="text-csgreen" size={24} />
        <h1 className="text-2xl font-bold text-white">Mentor Dashboard</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{pendingRequests}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Mentees</CardTitle>
            <Users className="h-4 w-4 text-csgreen" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalMentees}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Sessions</CardTitle>
            <MessageCircle className="h-4 w-4 text-csgreen" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{activeSessions}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Accepted Requests</CardTitle>
            <CheckCircle className="h-4 w-4 text-csgreen" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{acceptedRequests}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-gray-800">
          <TabsTrigger value="overview" className="data-[state=active]:bg-csgreen data-[state=active]:text-black">
            Overview
          </TabsTrigger>
          <TabsTrigger value="courses" className="data-[state=active]:bg-csgreen data-[state=active]:text-black">
            Courses
          </TabsTrigger>
          <TabsTrigger value="sessions" className="data-[state=active]:bg-csgreen data-[state=active]:text-black">
            Sessions
          </TabsTrigger>
          <TabsTrigger value="requests" className="data-[state=active]:bg-csgreen data-[state=active]:text-black">
            Requests
          </TabsTrigger>
          <TabsTrigger value="chats" className="data-[state=active]:bg-csgreen data-[state=active]:text-black">
            Messages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Pending Mentor Requests */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingRequests === 0 ? (
                <p className="text-gray-400">No pending requests.</p>
              ) : (
                <div className="space-y-4">
                  {mentorRequests
                    .filter(req => req.status === 'pending')
                    .slice(0, 3)
                    .map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium text-white">New Mentorship Request</h3>
                          <p className="text-sm text-gray-400">
                            {request.message || 'No message provided'}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Requested: {new Date(request.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRequestAction(request.id, 'rejected')}
                            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                          >
                            Decline
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleRequestAction(request.id, 'accepted')}
                            className="bg-csgreen text-black hover:bg-csgreen/90"
                          >
                            Accept
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <CourseManagement />
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <SessionsList userType="mentor" />
        </TabsContent>

        <TabsContent value="requests" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Mentorship Requests</CardTitle>
            </CardHeader>
            <CardContent>
              {mentorRequests.length === 0 ? (
                <p className="text-gray-400">No requests yet.</p>
              ) : (
                <div className="space-y-4">
                  {mentorRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-white">Mentorship Request</h3>
                        <p className="text-sm text-gray-400">
                          {request.message || 'No message provided'}
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                          <p className="text-xs text-gray-500">
                            Requested: {new Date(request.created_at).toLocaleDateString()}
                          </p>
                          <Badge className={
                            request.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                            request.status === 'accepted' ? 'bg-green-100 text-green-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {request.status}
                          </Badge>
                        </div>
                      </div>
                      {request.status === 'pending' && (
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRequestAction(request.id, 'rejected')}
                            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                          >
                            Decline
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleRequestAction(request.id, 'accepted')}
                            className="bg-csgreen text-black hover:bg-csgreen/90"
                          >
                            Accept
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chats" className="space-y-6">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Active Mentoring Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              {activeSessions === 0 ? (
                <p className="text-gray-400">No active sessions.</p>
              ) : (
                <div className="space-y-4">
                  {chatSessions
                    .filter(session => session.status === 'active')
                    .slice(0, 10)
                    .map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium text-white">{session.title}</h3>
                          <p className="text-sm text-gray-400">
                            Last activity: {new Date(session.last_message_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {session.unread_count_mentor > 0 && (
                            <Badge variant="destructive">{session.unread_count_mentor}</Badge>
                          )}
                          <Button size="sm" variant="outline">
                            Open Chat
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
