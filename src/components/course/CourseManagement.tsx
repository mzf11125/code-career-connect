
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Eye, Users, BookOpen } from "lucide-react";
import { useMentorCourses, useCreateCourse } from "@/hooks/useEnhancedCourses";
import { toast } from "sonner";

export function CourseManagement() {
  const { data: coursesResult, isLoading, error, refetch } = useMentorCourses();
  const createCourseMutation = useCreateCourse();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    topic: '',
    difficulty_level: 'beginner',
    estimated_duration: '',
    category: '',
    image_url: ''
  });

  const courses = coursesResult?.data || [];

  const handleCreateCourse = async () => {
    if (!newCourse.title || !newCourse.topic) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      const result = await createCourseMutation.mutateAsync(newCourse);
      if (result.error) {
        toast.error(result.error);
        return;
      }

      toast.success("Course created successfully!");
      setShowCreateDialog(false);
      setNewCourse({
        title: '',
        description: '',
        topic: '',
        difficulty_level: 'beginner',
        estimated_duration: '',
        category: '',
        image_url: ''
      });
      refetch();
    } catch (error) {
      toast.error("Failed to create course");
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading courses...</div>;
  }

  if (error) {
    return <div className="text-red-400">Error loading courses</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">My Courses</h2>
          <p className="text-gray-400">Create and manage your courses</p>
        </div>
        
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-csgreen text-black hover:bg-csgreen/90">
              <Plus className="h-4 w-4 mr-2" />
              Create Course
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-white">Create New Course</DialogTitle>
              <DialogDescription>
                Fill in the details to create a new course. You can add modules and content after creation.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title" className="text-white">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Course title"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, title: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="topic" className="text-white">Topic *</Label>
                  <Input
                    id="topic"
                    placeholder="Main topic"
                    value={newCourse.topic}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, topic: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description" className="text-white">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Course description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="difficulty" className="text-white">Difficulty</Label>
                  <Select value={newCourse.difficulty_level} onValueChange={(value) => setNewCourse(prev => ({ ...prev, difficulty_level: value }))}>
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="duration" className="text-white">Duration</Label>
                  <Input
                    id="duration"
                    placeholder="e.g., 4 weeks"
                    value={newCourse.estimated_duration}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, estimated_duration: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="category" className="text-white">Category</Label>
                  <Input
                    id="category"
                    placeholder="e.g., Programming"
                    value={newCourse.category}
                    onChange={(e) => setNewCourse(prev => ({ ...prev, category: e.target.value }))}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="image_url" className="text-white">Course Image URL</Label>
                <Input
                  id="image_url"
                  placeholder="https://example.com/image.jpg"
                  value={newCourse.image_url}
                  onChange={(e) => setNewCourse(prev => ({ ...prev, image_url: e.target.value }))}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateCourse}
                  disabled={createCourseMutation.isPending}
                  className="bg-csgreen text-black hover:bg-csgreen/90"
                >
                  {createCourseMutation.isPending ? "Creating..." : "Create Course"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {courses.length === 0 ? (
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No courses yet</h3>
            <p className="text-gray-400 mb-4">Create your first course to start teaching students</p>
            <Button 
              onClick={() => setShowCreateDialog(true)}
              className="bg-csgreen text-black hover:bg-csgreen/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Course
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="bg-gray-900/50 border-gray-800 hover:border-csgreen/50 transition-colors">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-white text-lg">{course.title}</CardTitle>
                    <CardDescription className="mt-1">{course.topic}</CardDescription>
                  </div>
                  <Badge variant={course.is_published ? "default" : "secondary"}>
                    {course.is_published ? "Published" : "Draft"}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm line-clamp-2">{course.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span className="capitalize">{course.difficulty_level}</span>
                  </div>
                  {course.estimated_duration && (
                    <div className="flex items-center gap-1">
                      <span>{course.estimated_duration}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <Users className="h-4 w-4" />
                    <span>0 students</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-400 hover:text-red-300">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
