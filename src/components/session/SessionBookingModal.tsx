
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarIcon, Clock, Video } from 'lucide-react';
import { toast } from 'sonner';
import { createSession, checkMentorAvailability } from '@/services/sessionService';
import { useNavigate } from 'react-router-dom';

interface SessionBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentorId: string;
  mentorName: string;
}

interface SessionFormData {
  date: Date;
  time: string;
  duration: number;
  notes: string;
}

export const SessionBookingModal = ({ isOpen, onClose, mentorId, mentorName }: SessionBookingModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<SessionFormData>();

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ];

  const onSubmit = async (data: SessionFormData) => {
    if (!selectedDate || !data.time) {
      toast.error('Please select both date and time');
      return;
    }

    setIsLoading(true);

    try {
      // Combine date and time
      const [hours, minutes] = data.time.split(':').map(Number);
      const scheduledAt = new Date(selectedDate);
      scheduledAt.setHours(hours, minutes, 0, 0);

      // Check mentor availability
      const { available, error: availabilityError } = await checkMentorAvailability(
        mentorId, 
        scheduledAt.toISOString(), 
        data.duration
      );

      if (availabilityError) {
        toast.error('Error checking availability');
        return;
      }

      if (!available) {
        toast.error('This time slot is not available. Please choose another time.');
        return;
      }

      // Create the session
      const { data: session, error } = await createSession({
        mentor_id: mentorId,
        scheduled_at: scheduledAt.toISOString(),
        duration_minutes: data.duration,
        notes: data.notes,
      });

      if (error) {
        toast.error('Failed to book session. Please try again.');
        return;
      }

      toast.success(`Session booked successfully with ${mentorName}!`);
      onClose();
      navigate('/dashboard');
      
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Book Session with {mentorName}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Calendar Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CalendarIcon size={20} />
                  Select Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => date < new Date() || date < new Date(Date.now() - 86400000)}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>

            {/* Time & Duration Section */}
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock size={20} />
                    Select Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select onValueChange={(value) => setValue('time', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.time && (
                    <p className="text-red-500 text-sm mt-1">Time is required</p>
                  )}
                </CardContent>
              </Card>

              <div>
                <Label htmlFor="duration">Session Duration (minutes)</Label>
                <Select onValueChange={(value) => setValue('duration', parseInt(value))}>
                  <SelectTrigger>
                    <SelectValue placeholder="60 minutes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any specific topics or questions you'd like to discuss..."
              {...register('notes')}
              className="mt-1"
            />
          </div>

          {/* Meeting Info */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <Video size={20} />
                <span className="font-medium">Video Meeting</span>
              </div>
              <p className="text-sm text-blue-600">
                A Google Meet link will be automatically generated and shared with both you and your mentor.
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-csgreen hover:bg-csgreen/90 text-black"
              disabled={isLoading || !selectedDate}
            >
              {isLoading ? 'Booking...' : 'Book Session'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
