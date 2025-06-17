
import { Progress } from "@/components/ui/progress";

interface CourseProgressProps {
  completedModules: number;
  totalModules: number;
  progressPercentage: number;
}

export function CourseProgress({ completedModules, totalModules, progressPercentage }: CourseProgressProps) {
  return (
    <div className="mt-4">
      <Progress value={progressPercentage} className="h-2 mb-1" />
      <div className="flex justify-between text-xs text-gray-400">
        <span>{Math.round(progressPercentage)}% complete</span>
        <span>{completedModules}/{totalModules} modules</span>
      </div>
    </div>
  );
}
