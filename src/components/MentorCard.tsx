
import { Star, Calendar, Clock, Video, Smile } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
        <div className="bg-cssecondary rounded-xl overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer">
          <div className="aspect-square overflow-hidden">
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-5">
            <h3 className="font-bold text-xl">{name}</h3>
            <p className="text-gray-400 mb-3">{role}</p>
            
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold">{rating.toFixed(1)}</span>
              <div className="flex items-center">
                <Star className="fill-csgreen text-csgreen" size={18} />
              </div>
              <span className="text-gray-400 text-sm">{reviewCount} reviews</span>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-csdark border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <div className="md:col-span-1">
            <img 
              src={imageUrl} 
              alt={name} 
              className="w-full aspect-square object-cover rounded-lg"
            />
            
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="fill-csgreen text-csgreen" size={18} />
                <span className="font-bold">{rating.toFixed(1)}</span>
                <span className="text-gray-400 text-sm">({reviewCount} reviews)</span>
              </div>
              
              <h3 className="font-bold mt-4 mb-2">Expertise</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {["React", "TypeScript", role.split(" ")[0]].map((skill) => (
                  <Badge key={skill} className="bg-gray-800 text-gray-200">
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
            <h2 className="font-bold text-xl mb-3">About {name.split(" ")[0]}</h2>
            <p className="text-gray-300 mb-4">
              {name.split(" ")[0]} is a {role} with over {Math.floor(Math.random() * 10) + 3} years of industry experience. 
              They specialize in building scalable applications and mentoring junior developers. 
              {name.split(" ")[0]} has worked with startups and enterprise companies, bringing a wealth of knowledge to their mentoring sessions.
            </p>
            
            <h3 className="font-bold mt-6 mb-3">How I Can Help</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              <div className="flex items-start gap-2">
                <Video size={18} className="text-csgreen mt-1" />
                <span className="text-sm">1:1 video sessions</span>
              </div>
              <div className="flex items-start gap-2">
                <Smile size={18} className="text-csgreen mt-1" />
                <span className="text-sm">Personalized guidance</span>
              </div>
              <div className="flex items-start gap-2">
                <Star size={18} className="text-csgreen mt-1" />
                <span className="text-sm">Portfolio reviews</span>
              </div>
              <div className="flex items-start gap-2">
                <Calendar size={18} className="text-csgreen mt-1" />
                <span className="text-sm">Weekly sessions</span>
              </div>
            </div>
            
            <h3 className="font-bold mt-6 mb-3">Recent Reviews</h3>
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="border-b border-gray-800 pb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex">
                      {[...Array(5)].map((_, j) => (
                        <Star 
                          key={j} 
                          className={j < 5 ? "fill-csgreen text-csgreen" : "text-gray-600"} 
                          size={14} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">a month ago</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    {i === 1 
                      ? `${name.split(" ")[0]} was incredibly helpful in guiding me through complex ${role.includes("Engineer") ? "system design" : "product"} concepts. The sessions were well-structured and tailored to my needs.` 
                      : `Working with ${name.split(" ")[0]} has been transformative for my career. Their expertise and teaching style are exactly what I needed.`}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <Button className="w-full bg-csgreen text-black hover:bg-csgreen/90">
                Book a Session
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
