
import { Button } from "@/components/ui/button";

interface ResumeOptionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
}

export const ResumeOptionCard = ({ title, description, icon, onClick }: ResumeOptionCardProps) => {
  return (
    <div className="bg-cssecondary rounded-xl p-8 flex flex-col items-center text-center hover:shadow-[0_0_20px_rgba(74,227,181,0.2)] transition-all">
      <div className="text-csgreen text-4xl mb-6">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      <Button 
        onClick={onClick}
        className="bg-gray-800 hover:bg-gray-700 border border-gray-700 w-full"
      >
        Select
      </Button>
    </div>
  );
};
