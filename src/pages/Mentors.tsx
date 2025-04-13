
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
      imageUrl: "/public/lovable-uploads/3dac3197-5287-43e6-8bb7-1d05f7a74f8c.png"
    },
    {
      id: 2,
      name: "David Chen",
      role: "Product Manager",
      rating: 4.9,
      reviewCount: 217,
      imageUrl: "/public/lovable-uploads/75c315fd-034d-4d96-8d6f-6daf038e0965.png"
    },
    {
      id: 3,
      name: "Michael Zhang",
      role: "Tech Lead",
      rating: 5.0,
      reviewCount: 189,
      imageUrl: "/public/lovable-uploads/30dbc055-777d-4b4b-9228-2fc4cfa077db.png"
    },
    {
      id: 4,
      name: "Jessica Lee",
      role: "UX Designer",
      rating: 4.8,
      reviewCount: 156,
      imageUrl: "/public/lovable-uploads/8f9f5200-1a35-4a55-ac5d-998a35145b4c.png"
    },
    {
      id: 5,
      name: "Alex Rodriguez",
      role: "Full Stack Developer",
      rating: 4.7,
      reviewCount: 125,
      imageUrl: "/public/lovable-uploads/8f9f5200-1a35-4a55-ac5d-998a35145b4c.png"
    },
    {
      id: 6,
      name: "Emma Wilson",
      role: "Data Scientist",
      rating: 5.0,
      reviewCount: 98,
      imageUrl: "/public/lovable-uploads/3dac3197-5287-43e6-8bb7-1d05f7a74f8c.png"
    },
    {
      id: 7,
      name: "Ryan Thompson",
      role: "Mobile Developer",
      rating: 4.9,
      reviewCount: 112,
      imageUrl: "/public/lovable-uploads/30dbc055-777d-4b4b-9228-2fc4cfa077db.png"
    },
    {
      id: 8,
      name: "Sophia Garcia",
      role: "DevOps Engineer",
      rating: 4.8,
      reviewCount: 89,
      imageUrl: "/public/lovable-uploads/75c315fd-034d-4d96-8d6f-6daf038e0965.png"
    }
  ];
  
  const filteredMentors = mentors.filter(mentor => 
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    mentor.role.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <section className="py-16 px-6 md:px-12">
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-center mb-4">Meet our mentors</h1>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Connect with experienced professionals who can guide you through your CS career journey
            </p>
            
            <div className="max-w-md mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input 
                  placeholder="Search mentors by name or role..."
                  className="pl-10 bg-cssecondary border-gray-800"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
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
            
            <div className="flex justify-center">
              <Button className="bg-cssecondary hover:bg-gray-800 mr-4">View All</Button>
              <Button className="bg-csgreen text-black hover:bg-csgreen/90">Choose Plan</Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Mentors;
