
-- Create sessions table for booking mentor sessions
CREATE TABLE public.sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mentor_id UUID NOT NULL,
  learner_id UUID NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  meet_link TEXT,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for sessions
CREATE POLICY "Users can view sessions they're involved in" 
  ON public.sessions 
  FOR SELECT 
  USING (auth.uid() = mentor_id OR auth.uid() = learner_id);

CREATE POLICY "Learners can create sessions" 
  ON public.sessions 
  FOR INSERT 
  WITH CHECK (auth.uid() = learner_id);

CREATE POLICY "Users can update sessions they're involved in" 
  ON public.sessions 
  FOR UPDATE 
  USING (auth.uid() = mentor_id OR auth.uid() = learner_id);

-- Create trigger for updated_at
CREATE TRIGGER handle_sessions_updated_at 
  BEFORE UPDATE ON public.sessions 
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Create index for performance
CREATE INDEX idx_sessions_mentor_scheduled ON public.sessions(mentor_id, scheduled_at);
CREATE INDEX idx_sessions_learner_scheduled ON public.sessions(learner_id, scheduled_at);

-- Add constraint to prevent booking in the past
ALTER TABLE public.sessions 
ADD CONSTRAINT sessions_future_booking 
CHECK (scheduled_at > now());
