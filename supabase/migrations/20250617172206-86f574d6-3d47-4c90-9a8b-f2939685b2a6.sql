
-- Create mentors table to store real mentor data
CREATE TABLE public.mentors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT,
  expertise TEXT[],
  rating DECIMAL(3,2) DEFAULT 0.0,
  review_count INTEGER DEFAULT 0,
  image_url TEXT,
  hourly_rate DECIMAL(10,2),
  availability_schedule JSONB,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.mentors ENABLE ROW LEVEL SECURITY;

-- Create policies for mentors
CREATE POLICY "Anyone can view active mentors" 
  ON public.mentors 
  FOR SELECT 
  USING (is_available = true);

CREATE POLICY "Mentors can update their own profile" 
  ON public.mentors 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users with mentor role can insert" 
  ON public.mentors 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create trigger for updated_at
CREATE TRIGGER handle_mentors_updated_at 
  BEFORE UPDATE ON public.mentors 
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Insert sample mentor data with proper UUIDs
INSERT INTO public.mentors (id, user_id, name, role, bio, expertise, rating, review_count, image_url, hourly_rate, is_available) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Sarah Chen', 'Senior Software Engineer at Google', 'Experienced full-stack developer with expertise in React and Node.js. I''ve been working at Google for 5+ years and love mentoring new developers.', ARRAY['React', 'TypeScript', 'Node.js', 'System Design'], 5.0, 342, 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face', 120.00, true),
  ('550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'Marcus Johnson', 'Tech Lead at Microsoft', 'Technical leadership expert specializing in system architecture and team management. I help developers transition into leadership roles.', ARRAY['Leadership', 'System Design', 'Azure', 'C#'], 4.9, 217, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face', 150.00, true),
  ('550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440003', 'Emily Rodriguez', 'Senior Product Manager at Meta', 'Product management expert with 8+ years of experience in tech startups and big tech. I specialize in user research and product strategy.', ARRAY['Product Strategy', 'User Research', 'Agile', 'Data Analysis'], 5.0, 189, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face', 140.00, true),
  ('550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', 'David Park', 'Principal Engineer at Amazon', 'Principal engineer with deep expertise in distributed systems and cloud architecture. I help engineers scale their technical skills.', ARRAY['AWS', 'Distributed Systems', 'Python', 'Microservices'], 4.8, 156, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face', 180.00, true),
  ('550e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', 'Alex Rodriguez', 'Full Stack Developer at Stripe', 'Full-stack developer with expertise in modern web technologies and cloud platforms. I focus on helping new developers build real-world projects.', ARRAY['JavaScript', 'React', 'Node.js', 'Docker'], 4.7, 125, 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face', 110.00, true),
  ('550e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440006', 'Emma Wilson', 'Data Scientist at Netflix', 'Data science expert with machine learning and AI specialization. I help developers transition into data science and ML engineering roles.', ARRAY['Python', 'Machine Learning', 'TensorFlow', 'Statistics'], 5.0, 98, 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face', 140.00, true),
  ('550e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440007', 'Ryan Thompson', 'Mobile Developer at Uber', 'Mobile app development specialist for iOS and Android platforms. I help developers build scalable mobile applications.', ARRAY['React Native', 'Swift', 'Kotlin', 'Mobile UI/UX'], 4.9, 112, 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face', 130.00, true),
  ('550e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440008', 'Sophia Garcia', 'DevOps Engineer at Tesla', 'DevOps and cloud infrastructure specialist with expertise in CI/CD and automation. I help teams improve their deployment and infrastructure practices.', ARRAY['Kubernetes', 'Docker', 'AWS', 'CI/CD'], 4.8, 89, 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face', 160.00, true);
