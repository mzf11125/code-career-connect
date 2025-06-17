
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { CourseGenerator } from "@/components/CourseGenerator";
import { EnhancedCourseList } from "@/components/course/EnhancedCourseList";

const Courses = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <section className="py-16 px-6 md:px-12">
          <div className="container mx-auto">
            <CourseGenerator />
            <h1 className="text-4xl font-bold text-center mb-4">Learn from Real Courses</h1>
            <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
              Access comprehensive courses created by experienced professionals with interactive content, quizzes, and real-world projects
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div>
                <Label htmlFor="search">Search Courses</Label>
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    id="search"
                    placeholder="Search by title or topic..."
                    className="pl-10 bg-cssecondary border-gray-800"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="difficulty" className="mt-2 bg-cssecondary border-gray-800">
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent className="bg-csdark border-gray-800">
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="category">Category</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="category" className="mt-2 bg-cssecondary border-gray-800">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent className="bg-csdark border-gray-800">
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="programming">Programming</SelectItem>
                    <SelectItem value="data-science">Data Science</SelectItem>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="mobile-development">Mobile Development</SelectItem>
                    <SelectItem value="machine-learning">Machine Learning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <EnhancedCourseList />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
