
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Play, Check } from "lucide-react";

interface CourseCardProps {
  title: string;
  reviewCount: number;
  description: string;
  hourlyRate: number;
  skills: string[];
  imageUrl?: string;
  progress?: number;
}

export const CourseCard = ({ title, reviewCount, description, hourlyRate, skills, progress = 0 }: CourseCardProps) => {
  return (
    <div className="bg-cssecondary rounded-xl p-6 hover:shadow-[0_0_20px_rgba(74,227,181,0.2)] transition-all">
      <div className="flex gap-3 mb-3">
        <div className="w-8 h-8 bg-gray-700 rounded-md"></div>
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm text-gray-400">({reviewCount} reviews)</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill) => (
          <Badge key={skill} variant="outline" className="bg-gray-800 text-xs">
            {skill}
          </Badge>
        ))}
      </div>
      
      <p className="text-sm text-gray-400 mb-4">
        {description}
      </p>
      
      <div className="flex justify-between items-center mb-3">
        <span className="text-xl font-bold text-csgreen">${hourlyRate}/hr</span>
        {progress > 0 && (
          <div className="flex items-center gap-2">
            <BookOpen className="text-csgreen" size={16} />
            <span className="text-xs text-gray-300">{progress}% complete</span>
          </div>
        )}
      </div>

      {progress > 0 && (
        <Progress value={progress} className="h-1 bg-gray-700" />
      )}
    </div>
  );
};
