
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Play, Check, Calendar, Clock, Video, Star, Award } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InteractiveCourseViewer } from "./InteractiveCourseViewer";

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
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-cssecondary rounded-xl p-6 hover:shadow-[0_0_20px_rgba(74,227,181,0.2)] transition-all cursor-pointer">
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
      </DialogTrigger>

      <DialogContent className="sm:max-w-[850px] max-h-[90vh] overflow-y-auto bg-csdark border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="overview" className="w-full mt-4">
          <TabsList className="w-full grid grid-cols-3 mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-csgreen data-[state=active]:text-black">
              <BookOpen className="mr-2" size={18} /> Overview
            </TabsTrigger>
            <TabsTrigger value="curriculum" className="data-[state=active]:bg-csgreen data-[state=active]:text-black">
              <Play className="mr-2" size={18} /> Curriculum
            </TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-csgreen data-[state=active]:text-black">
              <Star className="mr-2" size={18} /> Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <h2 className="font-bold text-xl mb-3">About This Course</h2>
                <p className="text-gray-300 mb-4">
                  {description} This course will give you a comprehensive understanding of the topic and practical skills that you can immediately apply in your work or projects.
                </p>
                
                <h3 className="font-bold mt-6 mb-3">What You'll Learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check size={18} className="text-csgreen mt-1" />
                      <span className="text-sm">Master {skill} techniques and best practices</span>
                    </div>
                  ))}
                  <div className="flex items-start gap-2">
                    <Check size={18} className="text-csgreen mt-1" />
                    <span className="text-sm">Build real-world projects</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check size={18} className="text-csgreen mt-1" />
                    <span className="text-sm">Get personalized feedback</span>
                  </div>
                </div>
                
                <h3 className="font-bold mt-6 mb-3">Course Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Duration</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock size={16} className="text-csgreen" />
                      <span>{Math.floor(Math.random() * 10) + 4} weeks</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Difficulty</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Award size={16} className="text-csgreen" />
                      <span>{skills.includes("Advanced") ? "Advanced" : "Intermediate"}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Video Lessons</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Video size={16} className="text-csgreen" />
                      <span>{Math.floor(Math.random() * 30) + 10} videos</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Certificate</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Award size={16} className="text-csgreen" />
                      <span>Upon completion</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-1 bg-cssecondary p-4 rounded-lg">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-2xl font-bold text-csgreen">${hourlyRate}/hr</span>
                  {progress > 0 && (
                    <Badge className="bg-csgreen text-black">In Progress</Badge>
                  )}
                </div>
                
                <Button className="w-full mb-3 bg-csgreen text-black hover:bg-csgreen/90">
                  {progress > 0 ? "Continue Learning" : "Enroll Now"}
                </Button>
                
                <div className="text-center text-sm text-gray-400 mb-4">
                  {progress > 0 ? `${progress}% complete` : "Start learning today"}
                </div>
                
                <div className="border-t border-gray-700 pt-3 mt-3">
                  <h4 className="font-medium mb-2">This course includes:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Video size={16} className="text-csgreen" />
                      <span className="text-sm">High-quality video content</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen size={16} className="text-csgreen" />
                      <span className="text-sm">Comprehensive materials</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check size={16} className="text-csgreen" />
                      <span className="text-sm">Hands-on projects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={16} className="text-csgreen" />
                      <span className="text-sm">Certificate of completion</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="curriculum" className="mt-0">
            <InteractiveCourseViewer markdown="" />
          </TabsContent>

          <TabsContent value="reviews" className="mt-0">
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl font-bold">{(Math.random() * (5 - 4.5) + 4.5).toFixed(1)}</div>
                <div>
                  <div className="flex mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="fill-csgreen text-csgreen" size={18} />
                    ))}
                  </div>
                  <div className="text-sm text-gray-400">{reviewCount} reviews</div>
                </div>
              </div>
              
              <div className="space-y-6">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b border-gray-800 pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="font-medium">User{Math.floor(Math.random() * 1000)}</div>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, j) => (
                            <Star 
                              key={j} 
                              className={j < 5 ? "fill-csgreen text-csgreen" : "text-gray-600"} 
                              size={14} 
                            />
                          ))}
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">{i} month{i > 1 ? 's' : ''} ago</div>
                    </div>
                    <p className="text-sm text-gray-300">
                      {i === 1 
                        ? `This course exceeded my expectations! The material is well-structured and the instructor explains complex topics clearly. I learned a lot and was able to apply it immediately.` 
                        : i === 2 
                        ? `Great course with thorough explanations and practical examples. The interactive quizzes helped me retain the information better. Highly recommend!` 
                        : `One of the best courses I've taken. The instructor is knowledgeable and responsive to questions. The projects are challenging but doable and really help solidify the concepts.`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
