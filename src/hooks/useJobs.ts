
import { useQuery } from "@tanstack/react-query";
import { fetchJobs, type JobFilters } from "@/services/jobService";

export const useJobs = (filters: JobFilters = {}) => {
  return useQuery({
    queryKey: ['jobs', filters],
    queryFn: () => fetchJobs(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
