
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Phone, Video, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';
import useAuth from '@/hooks/useAuth';
import { sendMessage, getMessages, getChatSessions } from '@/services/mentorshipService';
import type { Message, ChatSession } from '@/services/mentorshipService';

interface ChatInterfaceProps {
  chatSessionId: string;
  mentorName?: string;
  onClose?: () => void;
}

export const ChatInterface = ({ chatSessionId, mentorName = "Mentor", onClose }: ChatInterfaceProps) => {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    loadMessages();
  }, [chatSessionId]);

  const loadMessages = async () => {
    if (!chatSessionId) return;
    
    setLoading(true);
    try {
      const { data, error } = await getMessages(chatSessionId);
      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error loading messages:', error);
      toast.error('Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !user || sending) return;

    setSending(true);
    const messageContent = message.trim();
    setMessage('');

    try {
      const { data, error } = await sendMessage(chatSessionId, messageContent);
      if (error) throw error;
      
      // Add the new message to the local state
      if (data) {
        setMessages(prev => [...prev, data]);
      }
      
      toast.success('Message sent!');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
      setMessage(messageContent); // Restore message on error
    } finally {
      setSending(false);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-csgreen"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-csdark to-cssecondary rounded-lg border border-gray-700">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-csgreen rounded-full flex items-center justify-center">
            <span className="text-black font-semibold text-sm">
              {mentorName.charAt(0)}
            </span>
          </div>
          <div>
            <h3 className="font-semibold text-white">{mentorName}</h3>
            <p className="text-sm text-gray-400">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
            <Phone size={18} />
          </Button>
          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
            <Video size={18} />
          </Button>
          <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
            <MoreVertical size={18} />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              <p>Start your conversation with {mentorName}</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender_id === user?.id ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    msg.sender_id === user?.id
                      ? 'bg-csgreen text-black'
                      : 'bg-gray-700 text-white'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p className={`text-xs mt-1 ${
                    msg.sender_id === user?.id ? 'text-black/70' : 'text-gray-400'
                  }`}>
                    {formatTime(msg.created_at)}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-700">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
            disabled={sending}
          />
          <Button
            type="submit"
            disabled={!message.trim() || sending}
            className="bg-csgreen hover:bg-csgreen/90 text-black px-4"
          >
            {sending ? (
              <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-black"></div>
            ) : (
              <Send size={18} />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
