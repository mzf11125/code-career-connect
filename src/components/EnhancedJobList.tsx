
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Calendar, ExternalLink, FileText, Loader2 } from "lucide-react";
import { Job } from "@/types/job";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface EnhancedJobListProps {
  jobs: Job[];
  isLoading: boolean;
  error?: Error;
  onSyncJobs?: () => void;
  isSyncing?: boolean;
}

export const EnhancedJobList = ({ jobs, isLoading, error, onSyncJobs, isSyncing }: EnhancedJobListProps) => {
  const navigate = useNavigate();

  const handleOptimizeResume = (job: Job) => {
    // Store job context in localStorage for the resume builder
    const jobContext = {
      jobTitle: job.title,
      company: job.company,
      description: job.description,
      requirements: job.requirements,
      responsibilities: job.responsibilities,
      skills: job.skills,
    };
    
    localStorage.setItem('resumeJobContext', JSON.stringify(jobContext));
    navigate('/resume');
    toast.success('Job context saved for resume optimization!');
  };

  const handleApplyOnLinkedIn = (job: Job) => {
    if (job.url) {
      window.open(job.url, '_blank');
    } else {
      toast.error('LinkedIn URL not available for this job');
    }
  };

  const formatPostedDate = (dateString?: string) => {
    if (!dateString) return 'Recently';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-csgreen" />
        <p className="text-gray-400">Loading jobs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">Error loading jobs: {error.message}</p>
        {onSyncJobs && (
          <Button 
            onClick={onSyncJobs} 
            disabled={isSyncing}
            className="bg-csgreen text-black hover:bg-csgreen/90"
          >
            {isSyncing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Retry Sync
          </Button>
        )}
      </div>
    );
  }

  if (!jobs?.length) {
    return (
      <div className="text-center py-12 space-y-4">
        <Briefcase className="h-12 w-12 text-gray-400 mx-auto" />
        <div>
          <p className="text-gray-400 text-lg mb-2">No jobs found</p>
          <p className="text-gray-500 text-sm">Try adjusting your search criteria</p>
        </div>
        {onSyncJobs && (
          <Button 
            onClick={onSyncJobs} 
            disabled={isSyncing}
            className="bg-csgreen text-black hover:bg-csgreen/90"
          >
            {isSyncing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Sync New Jobs
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      {onSyncJobs && (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <p className="text-gray-400 text-sm">{jobs.length} jobs found</p>
          <Button 
            onClick={onSyncJobs} 
            disabled={isSyncing}
            variant="outline"
            size="sm"
            className="border-csgreen text-csgreen hover:bg-csgreen/10 w-full sm:w-auto"
          >
            {isSyncing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Sync Latest Jobs
          </Button>
        </div>
      )}
      
      <div className="space-y-4 w-full">
        {jobs.map((job) => (
          <div key={job.id} className="bg-cssecondary p-4 sm:p-6 rounded-lg hover:ring-1 hover:ring-csgreen transition-all w-full overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4 gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold mb-2 text-white break-words">{job.title}</h3>
                <p className="text-gray-300 font-medium break-words">{job.company}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 job-card-actions w-full lg:w-auto lg:ml-4">
                <Button
                  onClick={() => handleOptimizeResume(job)}
                  className="bg-csgreen text-black hover:bg-csgreen/90 flex items-center justify-center gap-2 text-sm px-3 py-2"
                  size="sm"
                >
                  <FileText className="h-4 w-4" />
                  <span className="whitespace-nowrap">Optimize Resume</span>
                </Button>
                <Button
                  onClick={() => handleApplyOnLinkedIn(job)}
                  variant="outline"
                  size="sm"
                  className="border-blue-500 text-blue-400 hover:bg-blue-500/10 flex items-center justify-center gap-2 text-sm px-3 py-2"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="whitespace-nowrap">Apply on LinkedIn</span>
                </Button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-4">
              <div className="flex items-center gap-1 min-w-0">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{job.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4 flex-shrink-0" />
                <span>{job.job_type || 'Full-time'}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span>{formatPostedDate(job.posted_date)}</span>
              </div>
              {job.salary_range && (
                <div className="text-csgreen font-medium">
                  {job.salary_range}
                </div>
              )}
            </div>

            {job.skills && job.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.slice(0, 6).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-csgreen/20 text-csgreen text-xs">
                    {skill}
                  </Badge>
                ))}
                {job.skills.length > 6 && (
                  <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                    +{job.skills.length - 6} more
                  </Badge>
                )}
              </div>
            )}
            
            {job.description && (
              <p className="text-gray-300 line-clamp-3 leading-relaxed break-words">
                {job.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
