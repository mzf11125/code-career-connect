import { useState } from "react";
import { Star, Calendar, Clock, Video, Smile, BookOpen, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createMentorRequest, createChatSession } from "@/services/mentorshipService";
import useAuth from "@/hooks/useAuth";
import { getOptimizedImageUrl, getImageFallback } from "@/utils/imageUtils";

interface MentorCardProps {
  name: string;
  role: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
}

export const MentorCard = ({ name, role, rating, reviewCount, imageUrl }: MentorCardProps) => {
  const [bookingLoading, setBookingLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Generate a mentor ID based on name (in real app, this would come from props)
  const mentorId = `mentor-${name.toLowerCase().replace(/\s+/g, '-')}`;

  const handleBookSession = async () => {
    if (!user) {
      toast.error("Please sign in to book a session");
      navigate("/login");
      return;
    }

    setBookingLoading(true);
    
    try {
      // Create mentor request
      const { data: requestData, error: requestError } = await createMentorRequest(
        mentorId, 
        `I would like to book a session with ${name}`
      );

      if (requestError) {
        throw requestError;
      }

      // Create chat session
      const { data: chatData, error: chatError } = await createChatSession(
        mentorId,
        user.id,
        `Mentoring with ${name}`
      );

      if (chatError) {
        throw chatError;
      }

      toast.success(`Session request sent to ${name}! You can now start chatting.`);
      
      // Navigate to dashboard where they can see their chats
      navigate("/dashboard");
      
    } catch (error) {
      console.error("Error booking session:", error);
      toast.error("Failed to book session. Please try again.");
    } finally {
      setBookingLoading(false);
    }
  };

  const optimizedImageUrl = getOptimizedImageUrl(imageUrl);
  const fallbackImageUrl = getImageFallback('mentor');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="group bg-gradient-to-br from-cssecondary/90 to-cssecondary/60 backdrop-blur-sm rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-500 cursor-pointer shadow-xl hover:shadow-[0_20px_40px_rgba(74,227,181,0.15)] border border-gray-800/50 hover:border-csgreen/30">
          <div className="aspect-square overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
            <img 
              src={imageError ? fallbackImageUrl : optimizedImageUrl}
              alt={name} 
              className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
              onError={() => setImageError(true)}
              loading="lazy"
            />
            <div className="absolute top-4 right-4 z-20">
              <Badge className="bg-csgreen/90 text-black backdrop-blur-sm border-0 font-medium">
                Top Rated
              </Badge>
            </div>
            <div className="absolute bottom-4 left-4 z-20">
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1">
                <Star className="fill-csgreen text-csgreen" size={16} />
                <span className="text-white font-bold">{rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-bold text-xl mb-2 text-white group-hover:text-csgreen transition-colors">
              {name}
            </h3>
            <p className="text-gray-400 mb-4 text-sm">{role}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={i < Math.floor(rating) ? "fill-csgreen text-csgreen" : "text-gray-600"} 
                    size={14} 
                  />
                ))}
                <span className="text-gray-400 text-xs ml-2">({reviewCount})</span>
              </div>
              <Badge variant="outline" className="border-csgreen/30 text-csgreen">
                Available
              </Badge>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-csdark/95 to-cssecondary/95 backdrop-blur-xl border-gray-800/50">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-csgreen to-blue-400 bg-clip-text text-transparent">
            {name}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="about" className="w-full mt-6">
          <TabsList className="w-full grid grid-cols-3 mb-8 bg-gray-800/50 backdrop-blur-sm">
            <TabsTrigger value="about" className="data-[state=active]:bg-csgreen data-[state=active]:text-black font-medium">
              Profile
            </TabsTrigger>
            <TabsTrigger value="sessions" className="data-[state=active]:bg-csgreen data-[state=active]:text-black font-medium">
              Sessions
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-csgreen data-[state=active]:text-black font-medium">
              Reviews
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="about">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="relative rounded-2xl overflow-hidden mb-6">
                  <img 
                    src={imageError ? fallbackImageUrl : optimizedImageUrl}
                    alt={name} 
                    className="w-full aspect-square object-cover rounded-2xl border-2 border-csgreen/20"
                    onError={() => setImageError(true)}
                  />
                  <div className="absolute top-4 right-4">
                    <div className="bg-csgreen rounded-full p-2 shadow-lg">
                      <Star className="fill-black text-black" size={20} />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Star className="fill-csgreen text-csgreen" size={20} />
                    <span className="font-bold text-xl">{rating.toFixed(1)}</span>
                    <span className="text-gray-400">({reviewCount} reviews)</span>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg mb-3 text-csgreen">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {["React", "TypeScript", role.split(" ")[0]].map((skill) => (
                        <Badge key={skill} className="bg-gray-800/80 text-gray-200 hover:bg-csgreen hover:text-black transition-colors">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-lg mb-3 text-csgreen">Availability</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-gray-300">
                        <Calendar size={18} className="text-csgreen" />
                        <span>Weekdays & Weekends</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <Clock size={18} className="text-csgreen" />
                        <span>9:00 AM - 6:00 PM PST</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <h2 className="font-bold text-2xl mb-4 flex items-center gap-3">
                  <span className="bg-csgreen text-black rounded-full p-2">
                    <Smile size={20} />
                  </span>
                  About {name.split(" ")[0]}
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                  {name.split(" ")[0]} is a {role} with over {Math.floor(Math.random() * 10) + 3} years of industry experience. 
                  They specialize in building scalable applications and mentoring junior developers. 
                  {name.split(" ")[0]} has worked with startups and enterprise companies, bringing a wealth of knowledge to their mentoring sessions.
                </p>
                
                <h3 className="font-bold text-xl mt-8 mb-4 flex items-center gap-3">
                  <span className="bg-csgreen text-black rounded-full p-2">
                    <Check size={20} />
                  </span>
                  How I Can Help
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: Video, text: "1:1 video sessions tailored to your learning goals" },
                    { icon: Smile, text: "Personalized guidance and career advice" },
                    { icon: Star, text: "Portfolio reviews and improvement suggestions" },
                    { icon: Calendar, text: "Weekly sessions with progress tracking" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl hover:bg-gray-800/70 transition-colors">
                      <item.icon size={20} className="text-csgreen mt-1 flex-shrink-0" />
                      <span className="text-gray-300">{item.text}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8">
                  <Button 
                    onClick={handleBookSession}
                    disabled={bookingLoading}
                    className="w-full bg-gradient-to-r from-csgreen to-blue-400 text-black hover:opacity-90 font-bold py-4 text-lg rounded-xl transition-all duration-300"
                  >
                    {bookingLoading ? "Booking Session..." : `Book a Session with ${name.split(" ")[0]}`}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="sessions">
            <div className="space-y-4">
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Introduction Call</h3>
                <p className="text-gray-300 text-sm mb-3">A 30-minute free introduction session to discuss your goals and how I can help.</p>
                <div className="flex justify-between items-center">
                  <span className="text-csgreen font-bold">Free</span>
                  <Button variant="outline" className="border-csgreen text-csgreen hover:bg-csgreen hover:text-black">
                    Book Now
                  </Button>
                </div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Technical Mentorship</h3>
                <p className="text-gray-300 text-sm mb-3">1-hour session focused on specific technical challenges or concepts.</p>
                <div className="flex justify-between items-center">
                  <span className="text-csgreen font-bold">$75 / hour</span>
                  <Button variant="outline" className="border-csgreen text-csgreen hover:bg-csgreen hover:text-black">
                    Book Now
                  </Button>
                </div>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Career Coaching Package</h3>
                <p className="text-gray-300 text-sm mb-3">4 sessions package for ongoing career guidance and skill development.</p>
                <div className="flex justify-between items-center">
                  <span className="text-csgreen font-bold">$250 / package</span>
                  <Button variant="outline" className="border-csgreen text-csgreen hover:bg-csgreen hover:text-black">
                    Book Now
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews">
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-csgreen">{rating.toFixed(1)}</span>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i}
                        className={i < Math.floor(rating) ? "fill-csgreen text-csgreen" : "text-gray-600"}
                        size={18} 
                      />
                    ))}
                  </div>
                </div>
                <span className="text-gray-400">{reviewCount} reviews</span>
              </div>
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-b border-gray-800 pb-4 hover:bg-gray-800/30 p-3 rounded-lg transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-medium">Student{Math.floor(Math.random() * 1000)}</div>
                      <div className="flex mt-1">
                        {[...Array(5)].map((_, j) => (
                          <Star 
                            key={j} 
                            className={j < 5 ? "fill-csgreen text-csgreen" : "text-gray-600"} 
                            size={14} 
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">{i} month{i > 1 ? 's' : ''} ago</div>
                  </div>
                  <p className="text-sm text-gray-300">
                    {i === 1 
                      ? `${name.split(" ")[0]} was incredibly helpful in guiding me through complex ${role.includes("Engineer") ? "system design" : "product"} concepts. The sessions were well-structured and tailored to my needs.` 
                      : `Working with ${name.split(" ")[0]} has been transformative for my career. Their expertise and teaching style are exactly what I needed.`}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
