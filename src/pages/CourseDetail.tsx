
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Clock, Star, Users, Play, Award, Video } from "lucide-react";
import { usePublishedCourses } from "@/hooks/useEnhancedCourses";
import { InteractiveCourseViewer } from "@/components/InteractiveCourseViewer";

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { data: coursesResult, isLoading, error } = usePublishedCourses();
  
  const courses = coursesResult?.data || [];
  const course = courses.find(c => c.id === courseId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse text-center">
            <div className="h-8 bg-gray-700 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-48 mx-auto"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <Card className="bg-gray-900/50 border-gray-800 max-w-md">
            <CardContent className="text-center py-8">
              <h1 className="text-2xl font-bold mb-4">Course Not Found</h1>
              <p className="text-gray-400 mb-6">
                The course you're looking for doesn't exist or has been removed.
              </p>
              <Button 
                onClick={() => navigate('/courses')}
                className="bg-csgreen text-black hover:bg-csgreen/90"
              >
                <ArrowLeft className="mr-2" size={18} />
                Back to Courses
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <section className="py-8 px-6 md:px-12">
          <div className="container mx-auto max-w-6xl">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/courses')}
              className="mb-6 text-gray-400 hover:text-white"
            >
              <ArrowLeft className="mr-2" size={18} />
              Back to Courses
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <div className="mb-6">
                  {course.image_url && (
                    <div className="w-full h-64 bg-gray-800 rounded-lg overflow-hidden mb-6">
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
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {course.is_free && (
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                        Free
                      </Badge>
                    )}
                    <Badge variant="outline" className="border-gray-600 text-gray-400">
                      {course.category}
                    </Badge>
                    <Badge variant="outline" className="border-gray-600 text-gray-400">
                      {course.difficulty_level}
                    </Badge>
                  </div>

                  <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                  <p className="text-xl text-gray-300 mb-4">{course.topic}</p>
                  <p className="text-gray-400 leading-relaxed">
                    {course.description || "Learn essential skills with this comprehensive course designed to take you from beginner to proficient level."}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Clock className="h-6 w-6 text-csgreen" />
                    </div>
                    <div className="text-sm text-gray-400">Duration</div>
                    <div className="font-medium">{course.estimated_duration}</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <BookOpen className="h-6 w-6 text-csgreen" />
                    </div>
                    <div className="text-sm text-gray-400">Level</div>
                    <div className="font-medium capitalize">{course.difficulty_level}</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="h-6 w-6 text-csgreen" />
                    </div>
                    <div className="text-sm text-gray-400">Students</div>
                    <div className="font-medium">1,234</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Star className="h-6 w-6 text-csgreen" />
                    </div>
                    <div className="text-sm text-gray-400">Rating</div>
                    <div className="font-medium">4.8</div>
                  </div>
                </div>

                {/* Course Content */}
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-csgreen" />
                      Course Content
                    </CardTitle>
                    <CardDescription>
                      Interactive lessons and practical exercises
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <InteractiveCourseViewer 
                      courseData={course.content} 
                      courseId={course.id} 
                      markdown="" 
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Card className="bg-gray-900/50 border-gray-800 sticky top-6">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-csgreen mb-2">
                        {course.is_free ? 'Free' : '$99'}
                      </div>
                      {!course.is_free && (
                        <div className="text-sm text-gray-400 line-through">$199</div>
                      )}
                    </div>

                    <Button className="w-full mb-4 bg-csgreen text-black hover:bg-csgreen/90">
                      <Play className="mr-2" size={18} />
                      Start Learning
                    </Button>

                    <div className="space-y-4 text-sm">
                      <div className="flex items-center gap-3">
                        <Video className="h-4 w-4 text-csgreen" />
                        <span>HD video content</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-4 w-4 text-csgreen" />
                        <span>Downloadable resources</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Award className="h-4 w-4 text-csgreen" />
                        <span>Certificate of completion</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-4 w-4 text-csgreen" />
                        <span>Lifetime access</span>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 mt-6 pt-6">
                      <h4 className="font-medium mb-3">This course includes:</h4>
                      <div className="space-y-2 text-sm text-gray-400">
                        <div>• {Math.floor(Math.random() * 30) + 10} video lessons</div>
                        <div>• Interactive exercises</div>
                        <div>• Hands-on projects</div>
                        <div>• Community access</div>
                        <div>• Mobile and TV access</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetail;
