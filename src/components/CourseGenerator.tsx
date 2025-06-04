
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BookOpen, Award } from "lucide-react";
import { marked } from "marked";
import { InteractiveCourseViewer } from "./InteractiveCourseViewer";
import { generateCourse } from "@/services/courseGeneratorService";
import { CourseData } from "@/services/courseService";
import { toast } from "sonner";

export function CourseGenerator() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [courseMarkdown, setCourseMarkdown] = useState("");
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [courseId, setCourseId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [interactiveView, setInteractiveView] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCourseMarkdown("");
    setCourseData(null);
    setCourseId(null);
    setInteractiveView(false);
    
    if (!topic.trim()) {
      setError("Please enter a topic.");
      return;
    }
    
    setLoading(true);

    try {
      const response = await generateCourse(topic);
      
      if (!response.success) {
        setError(response.error || "Failed to generate course");
      } else {
        // Always set the markdown content if we have it
        if (response.courseMarkdown) {
          setCourseMarkdown(response.courseMarkdown);
          setInteractiveView(true); // Automatically switch to interactive view
        }
        
        // Set course data and ID if available
        if (response.courseData) {
          setCourseData(response.courseData);
        }
        
        if (response.courseId) {
          setCourseId(response.courseId);
        }
        
        // Show success message based on what we have
        if (response.courseMarkdown) {
          if (response.courseId) {
            toast.success("Course generated and saved successfully!");
          } else {
            toast.success("Course generated successfully! Note: Could not save to database - you may need to sign in for progress tracking.");
          }
        }
      }
    } catch (err: any) {
      setError("Error: " + err.message || "Unknown error");
    }
    
    setLoading(false);
  };

  return (
    <section className="bg-csdark p-6 rounded-xl mb-12 shadow hover:shadow-[0_0_24px_rgba(74,227,181,0.07)] transition">
      <div className="flex items-center mb-3 gap-2">
        <BookOpen className="text-csgreen" size={24} />
        <h2 className="font-bold text-2xl">Generate Your Free Custom Course</h2>
      </div>
      <p className="mb-3 text-gray-400">
        Use Gemini AI to create a complete self-paced learning roadmap for any CS topic, including learning objectives, milestones, and the best free resources.
      </p>
      <form onSubmit={handleGenerate} className="flex flex-col md:flex-row gap-4 items-stretch mb-4">
        <div className="flex-1">
          <label className="block text-sm text-gray-300 mb-1" htmlFor="topic">What topic do you want to learn?</label>
          <Input
            id="topic"
            className="w-full bg-cssecondary border-csgreen"
            value={topic}
            placeholder="e.g. Web Security, Data Science, Rust..."
            onChange={e => setTopic(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="self-end bg-csgreen text-black disabled:opacity-60"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </Button>
      </form>
      {error && <div className="text-destructive mb-3">{error}</div>}
      {courseMarkdown && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <Award className="inline text-csgreen mb-1 mr-2" />
              <span className="font-semibold text-lg">Course Plan</span>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className={!interactiveView ? "bg-csgreen/20 border-csgreen" : "border-gray-700"}
                onClick={() => setInteractiveView(false)}
              >
                Simple View
              </Button>
              <Button 
                variant="outline"
                className={interactiveView ? "bg-csgreen/20 border-csgreen" : "border-gray-700"}
                onClick={() => setInteractiveView(true)}
              >
                Interactive View
              </Button>
            </div>
          </div>
          
          {interactiveView ? (
            <InteractiveCourseViewer 
              courseData={courseData} 
              courseId={courseId}
              markdown={courseMarkdown} 
            />
          ) : (
            <div className="bg-cssecondary rounded-lg p-6 overflow-x-auto">
              <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: marked.parse(courseMarkdown) }} />
            </div>
          )}
        </div>
      )}
    </section>
  );
}
