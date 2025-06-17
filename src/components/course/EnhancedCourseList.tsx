
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Clock, Star, Users, Play } from "lucide-react";
import { usePublishedCourses } from "@/hooks/useEnhancedCourses";
import { useNavigate } from "react-router-dom";

export function EnhancedCourseList() {
  const { data: coursesResult, isLoading, error } = usePublishedCourses();
  const navigate = useNavigate();
  
  const courses = coursesResult?.data || [];

  const handleStartCourse = (courseId: string) => {
    // For now, just navigate to courses page
    // In future, navigate to specific course viewer
    navigate(`/courses/${courseId}`);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="bg-gray-900/50 border-gray-800 animate-pulse">
            <CardHeader>
              <div className="h-4 bg-gray-700 rounded w-3/4"></div>
              <div className="h-3 bg-gray-700 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-gray-700 rounded"></div>
                <div className="h-3 bg-gray-700 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="text-center py-8">
          <p className="text-red-400">Failed to load courses. Please try again.</p>
        </CardContent>
      </Card>
    );
  }

  if (courses.length === 0) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No courses available</h3>
          <p className="text-gray-400">Check back later for new courses!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <Card key={course.id} className="bg-gray-900/50 border-gray-800 hover:border-csgreen/50 transition-all hover:shadow-lg hover:shadow-csgreen/10">
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <CardTitle className="text-white text-lg leading-tight">{course.title}</CardTitle>
                <CardDescription className="mt-1">{course.topic}</CardDescription>
              </div>
              {course.is_free && (
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                  Free
                </Badge>
              )}
            </div>
            {course.image_url && (
              <div className="w-full h-32 bg-gray-800 rounded-lg overflow-hidden">
                <img 
                  src={course.image_url} 
                  alt={course.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
            )}
          </CardHeader>
          
          <CardContent className="space-y-4">
            <p className="text-gray-300 text-sm line-clamp-2">
              {course.description || "Learn essential skills with this comprehensive course."}
            </p>
            
            <div className="flex flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-1 text-gray-400">
                <BookOpen className="h-3 w-3" />
                <span className="capitalize">{course.difficulty_level}</span>
              </div>
              {course.estimated_duration && (
                <div className="flex items-center gap-1 text-gray-400">
                  <Clock className="h-3 w-3" />
                  <span>{course.estimated_duration}</span>
                </div>
              )}
              {course.category && (
                <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                  {course.category}
                </Badge>
              )}
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>0</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>4.8</span>
                </div>
              </div>
              
              <Button 
                size="sm" 
                className="bg-csgreen text-black hover:bg-csgreen/90"
                onClick={() => handleStartCourse(course.id)}
              >
                <Play className="h-4 w-4 mr-1" />
                Start Course
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
