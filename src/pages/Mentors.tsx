
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MentorCard } from "@/components/MentorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllMentors, searchMentors, type Mentor } from "@/services/mentorService";
import { toast } from "sonner";

const Mentors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredMentors, setFilteredMentors] = useState<Mentor[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadMentors();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    } else {
      setFilteredMentors(mentors);
    }
  }, [searchQuery, mentors]);

  const loadMentors = async () => {
    setLoading(true);
    try {
      const { data, error } = await getAllMentors();
      if (error) {
        toast.error('Failed to load mentors');
        // Fallback to mock data if no mentors in database
        setMentors([]);
      } else {
        setMentors(data || []);
      }
    } catch (error) {
      console.error('Error loading mentors:', error);
      toast.error('Failed to load mentors');
      setMentors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setFilteredMentors(mentors);
      return;
    }

    try {
      const { data, error } = await searchMentors(searchQuery.trim());
      if (error) {
        toast.error('Search failed');
        // Fallback to local filtering
        const filtered = mentors.filter(mentor => 
          mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          mentor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
          mentor.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setFilteredMentors(filtered);
      } else {
        setFilteredMentors(data || []);
      }
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to local filtering
      const filtered = mentors.filter(mentor => 
        mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        mentor.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mentor.expertise.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredMentors(filtered);
    }
  };

  const handleViewAllMentors = () => {
    setSearchQuery("");
  };

  const handleChoosePlan = () => {
    navigate("/");
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-csdark via-cssecondary to-csdark">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-csgreen"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-csdark via-cssecondary to-csdark">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-20 px-6 md:px-12">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-csgreen to-blue-400 bg-clip-text text-transparent">
                Meet our mentors
              </h1>
              <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                Connect with experienced professionals who can guide you through your CS career journey. 
                Get personalized mentorship from industry experts who've been where you want to go.
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto mb-16">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                  placeholder="Search mentors by name, role, or expertise..."
                  className="pl-12 pr-4 py-4 text-lg bg-cssecondary/80 border-gray-700 rounded-2xl backdrop-blur-sm hover:border-csgreen/50 focus:border-csgreen transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            {mentors.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 text-xl mb-4">No mentors available</div>
                <p className="text-gray-500">Check back later for amazing mentors!</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
                  {filteredMentors.map(mentor => (
                    <MentorCard 
                      key={mentor.id}
                      id={mentor.id}
                      name={mentor.name}
                      role={mentor.role}
                      rating={mentor.rating}
                      reviewCount={mentor.review_count}
                      imageUrl={mentor.image_url || ''}
                      expertise={mentor.expertise}
                      hourlyRate={mentor.hourly_rate}
                      bio={mentor.bio}
                    />
                  ))}
                </div>
                
                {filteredMentors.length === 0 && searchQuery && (
                  <div className="text-center py-16">
                    <div className="text-gray-400 text-xl mb-4">No mentors found</div>
                    <p className="text-gray-500">Try adjusting your search terms</p>
                  </div>
                )}
              </>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={handleViewAllMentors}
                className="bg-cssecondary hover:bg-gray-700 border border-gray-600 px-8 py-3 rounded-xl transition-all duration-300"
              >
                View All Mentors
              </Button>
              <Button 
                onClick={handleChoosePlan}
                className="bg-gradient-to-r from-csgreen to-blue-400 text-black hover:opacity-90 px-8 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Choose Your Plan
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Mentors;
