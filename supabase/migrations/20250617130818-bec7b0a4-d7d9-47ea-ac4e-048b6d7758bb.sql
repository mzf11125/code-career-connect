
-- Create the app_role enum type first
CREATE TYPE public.app_role AS ENUM ('student', 'mentor', 'learner');

-- Create mentor_requests table for pending mentorship requests
CREATE TABLE public.mentor_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  learner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mentor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create chat_sessions table for mentor-learner conversations
CREATE TABLE public.chat_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  learner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  mentor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL DEFAULT 'Mentoring Session',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'closed')),
  unread_count_learner INTEGER DEFAULT 0,
  unread_count_mentor INTEGER DEFAULT 0,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create messages table for chat messages
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chat_session_id UUID REFERENCES public.chat_sessions(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create course_enrollments table to track learner course enrollments
CREATE TABLE public.course_enrollments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  learner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE NOT NULL,
  enrolled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
  UNIQUE(learner_id, course_id)
);

-- Enable RLS on all new tables
ALTER TABLE public.mentor_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;

-- Create a security definer function to check user roles (avoiding RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for mentor_requests
CREATE POLICY "Users can view their own mentor requests" 
  ON public.mentor_requests 
  FOR SELECT 
  USING (auth.uid() = learner_id OR auth.uid() = mentor_id);

CREATE POLICY "Learners can create mentor requests" 
  ON public.mentor_requests 
  FOR INSERT 
  WITH CHECK (auth.uid() = learner_id AND public.has_role(auth.uid(), 'learner'));

CREATE POLICY "Mentors can update their requests" 
  ON public.mentor_requests 
  FOR UPDATE 
  USING (auth.uid() = mentor_id AND public.has_role(auth.uid(), 'mentor'));

-- RLS policies for chat_sessions
CREATE POLICY "Users can view their own chat sessions" 
  ON public.chat_sessions 
  FOR SELECT 
  USING (auth.uid() = learner_id OR auth.uid() = mentor_id);

CREATE POLICY "Users can create chat sessions" 
  ON public.chat_sessions 
  FOR INSERT 
  WITH CHECK (auth.uid() = learner_id OR auth.uid() = mentor_id);

CREATE POLICY "Users can update their own chat sessions" 
  ON public.chat_sessions 
  FOR UPDATE 
  USING (auth.uid() = learner_id OR auth.uid() = mentor_id);

-- RLS policies for messages
CREATE POLICY "Users can view messages in their chat sessions" 
  ON public.messages 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.chat_sessions 
      WHERE id = chat_session_id 
      AND (learner_id = auth.uid() OR mentor_id = auth.uid())
    )
  );

CREATE POLICY "Users can send messages in their chat sessions" 
  ON public.messages 
  FOR INSERT 
  WITH CHECK (
    auth.uid() = sender_id AND 
    EXISTS (
      SELECT 1 FROM public.chat_sessions 
      WHERE id = chat_session_id 
      AND (learner_id = auth.uid() OR mentor_id = auth.uid())
    )
  );

-- RLS policies for course_enrollments
CREATE POLICY "Learners can view their own enrollments" 
  ON public.course_enrollments 
  FOR SELECT 
  USING (auth.uid() = learner_id);

CREATE POLICY "Learners can enroll in courses" 
  ON public.course_enrollments 
  FOR INSERT 
  WITH CHECK (auth.uid() = learner_id AND public.has_role(auth.uid(), 'learner'));

CREATE POLICY "Learners can update their own enrollments" 
  ON public.course_enrollments 
  FOR UPDATE 
  USING (auth.uid() = learner_id);

-- Create a generic function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers for updated_at columns
CREATE TRIGGER handle_mentor_requests_updated_at
  BEFORE UPDATE ON public.mentor_requests
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_chat_sessions_updated_at
  BEFORE UPDATE ON public.chat_sessions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
