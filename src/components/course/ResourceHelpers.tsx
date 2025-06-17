
import { Video, FileText, Brain, ExternalLink } from "lucide-react";

export const getResourceIcon = (type: string) => {
  switch (type) {
    case 'video':
      return <Video size={20} className="text-red-500" />;
    case 'quiz':
      return <Brain size={20} className="text-purple-500" />;
    case 'documentation':
      return <FileText size={20} className="text-blue-500" />;
    default:
      return <ExternalLink size={20} className="text-csgreen" />;
  }
};

export const getResourceBadgeColor = (type: string) => {
  switch (type) {
    case 'video':
      return 'bg-red-500/20 text-red-300';
    case 'quiz':
      return 'bg-purple-500/20 text-purple-300';
    case 'documentation':
      return 'bg-blue-500/20 text-blue-300';
    default:
      return 'bg-gray-500/20 text-gray-300';
  }
};
