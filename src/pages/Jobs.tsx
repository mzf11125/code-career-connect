
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JobSearch } from "@/components/JobSearch";
import { JobList } from "@/components/JobList";
import { useJobs } from "@/hooks/useJobs";

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const { data: jobs = [], isLoading, error } = useJobs({ query: searchQuery, location });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Find Your Next Opportunity</h1>
          <JobSearch 
            onSearch={(query, loc) => {
              setSearchQuery(query);
              setLocation(loc);
            }} 
          />
          <JobList jobs={jobs} isLoading={isLoading} error={error} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;
