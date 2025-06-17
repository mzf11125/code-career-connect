
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JobSearch } from "@/components/JobSearch";
import { EnhancedJobList } from "@/components/EnhancedJobList";
import { useJobs } from "@/hooks/useJobs";
import { syncJobsFromLinkedIn } from "@/services/jobService";
import { toast } from "sonner";

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  
  const { data: jobs = [], isLoading, error, refetch } = useJobs({ 
    query: searchQuery, 
    location: location,
    limit: 50 
  });

  const handleSyncJobs = async () => {
    setIsSyncing(true);
    try {
      const result = await syncJobsFromLinkedIn(
        searchQuery || 'software engineer',
        location || 'United States'
      );
      
      if (result?.success) {
        toast.success(`Successfully synced ${result.syncedCount} jobs from LinkedIn!`);
        refetch(); // Refresh the job list
      } else {
        toast.error('Failed to sync jobs from LinkedIn');
      }
    } catch (error) {
      console.error('Sync error:', error);
      toast.error('Failed to sync jobs from LinkedIn');
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-csgreen to-blue-400 bg-clip-text text-transparent">
              Find Your Next Opportunity
            </h1>
            <p className="text-gray-400 text-lg">
              Real-time job listings from LinkedIn, powered by AI
            </p>
          </div>
          
          <JobSearch 
            onSearch={(query, loc) => {
              setSearchQuery(query);
              setLocation(loc);
            }} 
          />
          
          <EnhancedJobList 
            jobs={jobs} 
            isLoading={isLoading} 
            error={error}
            onSyncJobs={handleSyncJobs}
            isSyncing={isSyncing}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;
