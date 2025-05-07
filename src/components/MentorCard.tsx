
import { Star, Calendar, Clock, Video, Smile, BookOpen, Check } from "lucide-react";
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

interface MentorCardProps {
  name: string;
  role: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
}

export const MentorCard = ({ name, role, rating, reviewCount, imageUrl }: MentorCardProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-gradient-to-br from-cssecondary to-cssecondary/70 rounded-xl overflow-hidden hover:scale-[1.03] transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(74,227,181,0.2)] border border-gray-800">
          <div className="aspect-square overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
            />
            <div className="absolute bottom-3 left-3 z-20">
              <Badge className="bg-csgreen text-black">Top Rated</Badge>
            </div>
          </div>
          <div className="p-5">
            <h3 className="font-bold text-xl">{name}</h3>
            <p className="text-gray-400 mb-3">{role}</p>
            
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-csgreen">{rating.toFixed(1)}</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={i < Math.floor(rating) ? "fill-csgreen text-csgreen" : "text-gray-600"} 
                    size={16} 
                  />
                ))}
              </div>
              <span className="text-gray-400 text-sm">({reviewCount})</span>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-csdark to-cssecondary/30 border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-csgreen to-blue-400 bg-clip-text text-transparent">
            {name}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="about" className="w-full mt-4">
          <TabsList className="w-full grid grid-cols-3 mb-6 bg-gray-800">
            <TabsTrigger value="about" className="data-[state=active]:bg-csgreen data-[state=active]:text-black">
              Profile
            </TabsTrigger>
            <TabsTrigger value="sessions" className="data-[state=active]:bg-csgreen data-[state=active]:text-black">
              Sessions
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-csgreen data-[state=active]:text-black">
              Reviews
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="about">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="relative rounded-lg overflow-hidden">
                  <img 
                    src={imageUrl} 
                    alt={name} 
                    className="w-full aspect-square object-cover rounded-lg border-2 border-csgreen/20"
                  />
                  <div className="absolute top-3 right-3">
                    <div className="bg-csgreen rounded-full p-1.5 shadow-lg">
                      <Star className="fill-black text-black" size={18} />
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="fill-csgreen text-csgreen" size={18} />
                    <span className="font-bold">{rating.toFixed(1)}</span>
                    <span className="text-gray-400 text-sm">({reviewCount} reviews)</span>
                  </div>
                  
                  <h3 className="font-bold mt-4 mb-2">Expertise</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {["React", "TypeScript", role.split(" ")[0]].map((skill) => (
                      <Badge key={skill} className="bg-gray-800 text-gray-200 hover:bg-csgreen hover:text-black transition-colors">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <h3 className="font-bold mt-4 mb-2">Availability</h3>
                  <div className="flex items-center gap-2 text-gray-300 text-sm mb-2">
                    <Calendar size={16} className="text-csgreen" />
                    <span>Weekdays & Weekends</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Clock size={16} className="text-csgreen" />
                    <span>9:00 AM - 6:00 PM PST</span>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h2 className="font-bold text-xl mb-3 flex items-center gap-2">
                  <span className="bg-csgreen text-black rounded-full p-1">
                    <Smile size={18} />
                  </span>
                  About {name.split(" ")[0]}
                </h2>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {name.split(" ")[0]} is a {role} with over {Math.floor(Math.random() * 10) + 3} years of industry experience. 
                  They specialize in building scalable applications and mentoring junior developers. 
                  {name.split(" ")[0]} has worked with startups and enterprise companies, bringing a wealth of knowledge to their mentoring sessions.
                </p>
                
                <h3 className="font-bold mt-6 mb-3 flex items-center gap-2">
                  <span className="bg-csgreen text-black rounded-full p-1">
                    <Check size={18} />
                  </span>
                  How I Can Help
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  <div className="flex items-start gap-2 bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                    <Video size={18} className="text-csgreen mt-1" />
                    <span className="text-sm">1:1 video sessions tailored to your learning goals</span>
                  </div>
                  <div className="flex items-start gap-2 bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                    <Smile size={18} className="text-csgreen mt-1" />
                    <span className="text-sm">Personalized guidance and career advice</span>
                  </div>
                  <div className="flex items-start gap-2 bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                    <Star size={18} className="text-csgreen mt-1" />
                    <span className="text-sm">Portfolio reviews and improvement suggestions</span>
                  </div>
                  <div className="flex items-start gap-2 bg-gray-800/50 p-3 rounded-lg hover:bg-gray-800 transition-colors">
                    <Calendar size={18} className="text-csgreen mt-1" />
                    <span className="text-sm">Weekly sessions with progress tracking</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full bg-gradient-to-r from-csgreen to-blue-400 text-black hover:opacity-90 font-bold">
                    Book a Session with {name.split(" ")[0]}
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
