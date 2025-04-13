
import { Star } from "lucide-react";

interface MentorCardProps {
  name: string;
  role: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
}

export const MentorCard = ({ name, role, rating, reviewCount, imageUrl }: MentorCardProps) => {
  return (
    <div className="bg-cssecondary rounded-xl overflow-hidden hover:scale-[1.02] transition-transform">
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
  );
};
