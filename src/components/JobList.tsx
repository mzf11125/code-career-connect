
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { Job } from "@/types/job";

interface JobListProps {
  jobs: Job[];
  isLoading: boolean;
  error?: Error;
}

export const JobList = ({ jobs, isLoading, error }: JobListProps) => {
  if (isLoading) {
    return <div className="text-center py-8">Loading jobs...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error loading jobs. Please try again.</div>;
  }

  if (!jobs?.length) {
    return <div className="text-center py-8">No jobs found. Try adjusting your search.</div>;
  }

  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <div key={job.id} className="bg-cssecondary p-6 rounded-lg hover:ring-1 hover:ring-csgreen transition-all">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-gray-400">{job.company}</p>
            </div>
            <Button variant="outline" className="border-csgreen text-csgreen hover:bg-csgreen/10">
              Apply Now
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{job.posted}</span>
            </div>
          </div>
          
          <p className="mt-4 text-gray-300 line-clamp-2">{job.description}</p>
        </div>
      ))}
    </div>
  );
};
