
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Users, 
  Clock, 
  Award, 
  MessageCircle,
  Calendar,
  TrendingUp,
  Target
} from 'lucide-react';
import { ChatSessionList } from '@/components/chat/ChatSessionList';
import { ChatInterface } from '@/components/chat/ChatInterface';

export const StudentDashboard = () => {
  const [selectedChatId, setSelectedChatId] = useState<string>('');
  const [selectedMentorName, setSelectedMentorName] = useState<string>('');

  const handleSelectChat = (sessionId: string, mentorName: string) => {
    setSelectedChatId(sessionId);
    setSelectedMentorName(mentorName);
  };

  // Mock data - in real app, this would come from Supabase
  const stats = {
    coursesCompleted: 3,
    totalCourses: 8,
    mentorSessions: 12,
    totalStudyHours: 47,
  };

  const recentCourses = [
    { id: 1, title: 'React Fundamentals', progress: 85, nextLesson: 'Hooks Deep Dive' },
    { id: 2, title: 'JavaScript Algorithms', progress: 60, nextLesson: 'Binary Search Trees' },
    { id: 3, title: 'System Design Basics', progress: 30, nextLesson: 'Load Balancing' },
  ];

  const upcomingMentorSessions = [
    { id: 1, mentor: 'Sarah Johnson', date: '2024-01-15', time: '2:00 PM', topic: 'Career Planning' },
    { id: 2, mentor: 'David Chen', date: '2024-01-17', time: '10:00 AM', topic: 'Technical Interview Prep' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Student!</h1>
        <p className="text-gray-400">Continue your CS learning journey</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-cssecondary to-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Courses Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-csgreen" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.coursesCompleted}/{stats.totalCourses}</div>
            <p className="text-xs text-gray-400">37.5% completion rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cssecondary to-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Mentor Sessions</CardTitle>
            <Users className="h-4 w-4 text-csgreen" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.mentorSessions}</div>
            <p className="text-xs text-gray-400">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cssecondary to-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Study Hours</CardTitle>
            <Clock className="h-4 w-4 text-csgreen" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalStudyHours}h</div>
            <p className="text-xs text-gray-400">This week</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cssecondary to-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Achievements</CardTitle>
            <Award className="h-4 w-4 text-csgreen" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">7</div>
            <p className="text-xs text-gray-400">Badges earned</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="overview" className="data-[state=active]:bg-csgreen data-[state=active]:text-black">
            Overview
          </TabsTrigger>
          <TabsTrigger value="courses" className="data-[state=active]:bg-csgreen data-[state=active]:text-black">
            Courses
          </TabsTrigger>
          <TabsTrigger value="mentors" className="data-[state=active]:bg-csgreen data-[state=active]:text-black">
            Mentors
          </TabsTrigger>
          <TabsTrigger value="messages" className="data-[state=active]:bg-csgreen data-[state=active]:text-black">
            Messages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Courses */}
            <Card className="bg-gradient-to-br from-cssecondary to-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-csgreen" />
                  Continue Learning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentCourses.map((course) => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium text-white">{course.title}</h3>
                      <Badge variant="outline" className="border-csgreen text-csgreen">
                        {course.progress}%
                      </Badge>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                    <p className="text-sm text-gray-400">Next: {course.nextLesson}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Upcoming Sessions */}
            <Card className="bg-gradient-to-br from-cssecondary to-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-csgreen" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingMentorSessions.map((session) => (
                  <div key={session.id} className="p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-white">{session.mentor}</h3>
                      <Badge className="bg-csgreen text-black">Scheduled</Badge>
                    </div>
                    <p className="text-sm text-gray-300">{session.topic}</p>
                    <p className="text-xs text-gray-400">{session.date} at {session.time}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card className="bg-gradient-to-br from-cssecondary to-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">My Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentCourses.map((course) => (
                  <div key={course.id} className="p-4 bg-gray-700/50 rounded-lg">
                    <h3 className="font-medium text-white mb-2">{course.title}</h3>
                    <Progress value={course.progress} className="h-2 mb-2" />
                    <p className="text-sm text-gray-400 mb-3">Progress: {course.progress}%</p>
                    <Button size="sm" className="w-full bg-csgreen hover:bg-csgreen/90 text-black">
                      Continue Course
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mentors" className="space-y-6">
          <Card className="bg-gradient-to-br from-cssecondary to-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">My Mentors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {upcomingMentorSessions.map((session) => (
                  <div key={session.id} className="p-4 bg-gray-700/50 rounded-lg">
                    <h3 className="font-medium text-white mb-2">{session.mentor}</h3>
                    <p className="text-sm text-gray-400 mb-3">Next session: {session.date}</p>
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-csgreen hover:bg-csgreen/90 text-black">
                        <MessageCircle size={16} className="mr-1" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-600">
                        View Profile
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            <div className="lg:col-span-1">
              <ChatSessionList 
                onSelectSession={handleSelectChat}
                selectedSessionId={selectedChatId}
              />
            </div>
            <div className="lg:col-span-2">
              {selectedChatId ? (
                <ChatInterface 
                  chatSessionId={selectedChatId}
                  mentorName={selectedMentorName}
                />
              ) : (
                <Card className="bg-gradient-to-br from-cssecondary to-gray-800 border-gray-700 h-full flex items-center justify-center">
                  <CardContent className="text-center">
                    <MessageCircle size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-300 mb-2">Select a conversation</h3>
                    <p className="text-gray-400">Choose a chat session to start messaging</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
