
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MentorCard } from "@/components/MentorCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Mentors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const mentors = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Software Engineer",
      rating: 5.0,
      reviewCount: 342,
      imageUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "David Chen",
      role: "Product Manager",
      rating: 4.9,
      reviewCount: 217,
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Michael Zhang",
      role: "Tech Lead",
      rating: 5.0,
      reviewCount: 189,
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 4,
      name: "Jessica Lee",
      role: "UX Designer",
      rating: 4.8,
      reviewCount: 156,
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 5,
      name: "Alex Rodriguez",
      role: "Full Stack Developer",
      rating: 4.7,
      reviewCount: 125,
      imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 6,
      name: "Emma Wilson",
      role: "Data Scientist",
      rating: 5.0,
      reviewCount: 98,
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 7,
      name: "Ryan Thompson",
      role: "Mobile Developer",
      rating: 4.9,
      reviewCount: 112,
      imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face"
    },
    {
      id: 8,
      name: "Sophia Garcia",
      role: "DevOps Engineer",
      rating: 4.8,
      reviewCount: 89,
      imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face"
    }
  ];
  
  const filteredMentors = mentors.filter(mentor => 
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    mentor.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
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
                  placeholder="Search mentors by name or expertise..."
                  className="pl-12 pr-4 py-4 text-lg bg-cssecondary/80 border-gray-700 rounded-2xl backdrop-blur-sm hover:border-csgreen/50 focus:border-csgreen transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
              {filteredMentors.map(mentor => (
                <MentorCard 
                  key={mentor.id}
                  name={mentor.name}
                  role={mentor.role}
                  rating={mentor.rating}
                  reviewCount={mentor.reviewCount}
                  imageUrl={mentor.imageUrl}
                />
              ))}
            </div>
            
            {filteredMentors.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 text-xl mb-4">No mentors found</div>
                <p className="text-gray-500">Try adjusting your search terms</p>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="bg-cssecondary hover:bg-gray-700 border border-gray-600 px-8 py-3 rounded-xl transition-all duration-300">
                View All Mentors
              </Button>
              <Button className="bg-gradient-to-r from-csgreen to-blue-400 text-black hover:opacity-90 px-8 py-3 rounded-xl font-semibold transition-all duration-300">
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
