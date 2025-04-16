
import { useQuery } from "@tanstack/react-query";
import { Job } from "@/types/job";

interface UseJobsParams {
  query?: string;
  location?: string;
}

// For demo purposes, we'll use a mock API call
const fetchJobs = async ({ query, location }: UseJobsParams): Promise<Job[]> => {
  // This is where you would integrate with a real job board API
  // For now, returning mock data
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  
  return [
    {
      id: "1",
      title: "Senior React Developer",
      company: "Tech Corp",
      location: location || "San Francisco, CA",
      type: "Full-time",
      description: "We are looking for a Senior React Developer to join our team...",
      posted: "2 days ago",
      url: "https://example.com/job/1"
    },
    {
      id: "2",
      title: "Frontend Engineer",
      company: "StartupCo",
      location: location || "Remote",
      type: "Full-time",
      description: "Join our fast-growing startup as a Frontend Engineer...",
      posted: "1 week ago",
      url: "https://example.com/job/2"
    },
    // Add more mock jobs as needed
  ].filter(job => {
    if (!query && !location) return true;
    return (
      (!query || job.title.toLowerCase().includes(query.toLowerCase()) || 
       job.company.toLowerCase().includes(query.toLowerCase())) &&
      (!location || job.location.toLowerCase().includes(location.toLowerCase()))
    );
  });
};

export const useJobs = (params: UseJobsParams = {}) => {
  return useQuery({
    queryKey: ['jobs', params],
    queryFn: () => fetchJobs(params),
  });
};
