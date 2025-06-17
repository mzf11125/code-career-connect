
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { getChatSessions } from '@/services/mentorshipService';
import type { ChatSession } from '@/services/mentorshipService';

interface ChatSessionListProps {
  onSelectSession: (sessionId: string, mentorName: string) => void;
  selectedSessionId?: string;
}

export const ChatSessionList = ({ onSelectSession, selectedSessionId }: ChatSessionListProps) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChatSessions();
  }, []);

  const loadChatSessions = async () => {
    try {
      const { data, error } = await getChatSessions();
      if (error) throw error;
      setSessions(data || []);
    } catch (error) {
      console.error('Error loading chat sessions:', error);
      toast.error('Failed to load chat sessions');
    } finally {
      setLoading(false);
    }
  };

  const formatLastMessage = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-csgreen"></div>
      </div>
    );
  }

  if (sessions.length === 0) {
    return (
      <div className="text-center py-8">
        <MessageCircle size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-300 mb-2">No conversations yet</h3>
        <p className="text-gray-400">Start by connecting with a mentor!</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-cssecondary to-csdark rounded-lg border border-gray-700">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Messages</h2>
      </div>
      <ScrollArea className="h-96">
        <div className="p-2">
          {sessions.map((session) => (
            <Button
              key={session.id}
              variant="ghost"
              className={`w-full p-4 mb-2 text-left justify-start hover:bg-gray-700/50 ${
                selectedSessionId === session.id ? 'bg-gray-700 ring-1 ring-csgreen' : ''
              }`}
              onClick={() => onSelectSession(session.id, session.title)}
            >
              <div className="flex items-center gap-3 w-full">
                <div className="w-10 h-10 bg-csgreen rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-black font-semibold text-sm">
                    {session.title.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-white truncate">{session.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock size={12} />
                      {formatLastMessage(session.last_message_at)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 truncate">
                    {session.status === 'active' ? 'Active conversation' : 'Conversation ended'}
                  </p>
                </div>
                {(session.unread_count_learner || 0) > 0 && (
                  <div className="w-5 h-5 bg-csgreen rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-black">
                      {session.unread_count_learner}
                    </span>
                  </div>
                )}
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
