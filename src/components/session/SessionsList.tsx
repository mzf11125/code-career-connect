
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Video, MessageCircle, User } from 'lucide-react';
import { getUserSessions, updateSessionStatus, type Session } from '@/services/sessionService';
import { toast } from 'sonner';
import { useUserRoles } from '@/hooks/useUserRoles';

interface SessionsListProps {
  userType?: 'mentor' | 'learner';
}

export const SessionsList = ({ userType }: SessionsListProps) => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const { isMentor } = useUserRoles();

  const defaultUserType = userType || (isMentor ? 'mentor' : 'learner');

  useEffect(() => {
    loadSessions();
  }, [defaultUserType]);

  const loadSessions = async () => {
    setLoading(true);
    try {
      const { data, error } = await getUserSessions(defaultUserType);
      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Error loading sessions:', error);
      toast.error('Failed to load sessions');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (sessionId: string, status: 'completed' | 'cancelled') => {
    try {
      const { error } = await updateSessionStatus(sessionId, status);
      if (error) throw error;
      
      setSessions(prev => 
        prev.map(session => 
          session.id === sessionId ? { ...session, status } : session
        )
      );
      
      toast.success(`Session marked as ${status}`);
    } catch (error) {
      console.error('Error updating session:', error);
      toast.error('Failed to update session');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const upcomingSessions = sessions.filter(s => s.status === 'scheduled' && new Date(s.scheduled_at) > new Date());
  const pastSessions = sessions.filter(s => s.status !== 'scheduled' || new Date(s.scheduled_at) <= new Date());

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-csgreen"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upcoming Sessions */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Upcoming Sessions</h3>
        {upcomingSessions.length === 0 ? (
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="text-center py-8">
              <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-400">No upcoming sessions scheduled</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {upcomingSessions.map((session) => {
              const { date, time } = formatDateTime(session.scheduled_at);
              return (
                <Card key={session.id} className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <User className="text-csgreen" size={24} />
                        <div>
                          <h4 className="font-semibold text-white">
                            {defaultUserType === 'mentor' ? 'Session with Learner' : `Session with ${session.mentor_name || 'Mentor'}`}
                          </h4>
                          <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {time}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge className={getStatusColor(session.status)}>
                        {session.status}
                      </Badge>
                    </div>

                    {session.notes && (
                      <p className="text-gray-300 text-sm mb-4 bg-gray-700/50 p-3 rounded">
                        "{session.notes}"
                      </p>
                    )}

                    <div className="flex gap-2 flex-wrap">
                      {session.meet_link && (
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                          onClick={() => window.open(session.meet_link, '_blank')}
                        >
                          <Video size={16} className="mr-1" />
                          Join Meeting
                        </Button>
                      )}
                      
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-csgreen text-csgreen hover:bg-csgreen hover:text-black"
                      >
                        <MessageCircle size={16} className="mr-1" />
                        Start Chat
                      </Button>

                      {defaultUserType === 'mentor' && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(session.id, 'completed')}
                            className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                          >
                            Mark Complete
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleStatusUpdate(session.id, 'cancelled')}
                            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                          >
                            Cancel
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* Past Sessions */}
      {pastSessions.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Past Sessions</h3>
          <div className="grid gap-4">
            {pastSessions.slice(0, 5).map((session) => {
              const { date, time } = formatDateTime(session.scheduled_at);
              return (
                <Card key={session.id} className="bg-gray-800/30 border-gray-700/50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium text-white">
                          {defaultUserType === 'mentor' ? 'Session with Learner' : `Session with ${session.mentor_name || 'Mentor'}`}
                        </h4>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{date} at {time}</span>
                          <Badge className={getStatusColor(session.status)}>
                            {session.status}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-400 hover:text-white"
                      >
                        <MessageCircle size={16} className="mr-1" />
                        View Chat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
