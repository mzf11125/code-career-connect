
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

export const FeatureCard = ({ title, description, icon, className }: FeatureCardProps) => {
  return (
    <div className={cn("bg-cssecondary p-6 rounded-xl relative overflow-hidden group transition-all duration-300 hover:shadow-[0_0_20px_rgba(74,227,181,0.3)]", className)}>
      <div className="absolute -right-10 -top-10 w-20 h-20 rounded-full bg-csgreen/10 group-hover:bg-csgreen/20 transition-all duration-500"></div>
      <div className="text-csgreen mb-4 text-3xl">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};
