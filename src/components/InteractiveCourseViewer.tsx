
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Play, BookOpen, CircleCheck, CirclePlay, MousePointerClick, BookText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Module {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  readings: { title: string; url: string }[];
  complete: boolean;
}

interface Quiz {
  id: string;
  title: string;
  questions: {
    question: string;
    options: string[];
    answer: number;
  }[];
}

interface CourseContent {
  title: string;
  description: string;
  modules: Module[];
  quizzes: Quiz[];
}

export function InteractiveCourseViewer({ markdown }: { markdown: string }) {
  const [activeModule, setActiveModule] = useState(0);
  const [activeTab, setActiveTab] = useState("content");
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  
  // In a real app, this would be parsed from the markdown or loaded from an API
  // For now, we'll use a mock course structure
  const courseContent: CourseContent = {
    title: "Generated Course",
    description: "Your AI-generated course curriculum",
    modules: [
      {
        id: "module-1",
        title: "Module 1: Getting Started",
        description: "Introduction to the key concepts and tools",
        videoUrl: "https://example.com/video1",
        readings: [
          { title: "Introduction to the field", url: "https://example.com/reading1" },
          { title: "Setting up your environment", url: "https://example.com/reading2" }
        ],
        complete: false
      },
      {
        id: "module-2",
        title: "Module 2: Core Principles",
        description: "Understand the fundamental principles",
        videoUrl: "https://example.com/video2",
        readings: [
          { title: "Core concepts explained", url: "https://example.com/reading3" },
          { title: "Practical applications", url: "https://example.com/reading4" }
        ],
        complete: false
      }
    ],
    quizzes: [
      {
        id: "quiz-1",
        title: "Module 1 Quiz",
        questions: [
          {
            question: "What is the main purpose of this course?",
            options: [
              "To provide entertainment",
              "To teach practical skills",
              "To fulfill academic requirements",
              "All of the above"
            ],
            answer: 1
          },
          {
            question: "Which tool is NOT typically used in this field?",
            options: [
              "Data analysis software",
              "Cooking utensils",
              "Programming languages",
              "Documentation tools"
            ],
            answer: 1
          }
        ]
      }
    ]
  };

  const handleQuizStart = () => {
    setQuizActive(true);
    setSelectedAnswer(null);
    setShowAnswer(false);
  };

  const handleAnswerSelection = (index: number) => {
    setSelectedAnswer(index);
  };

  const checkAnswer = () => {
    setShowAnswer(true);
  };

  const nextQuestion = () => {
    if (currentQuiz < courseContent.quizzes[0].questions.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setQuizActive(false);
      setCurrentQuiz(0);
    }
  };

  return (
    <div className="bg-cssecondary rounded-lg p-6 overflow-hidden">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{courseContent.title}</h2>
        <p className="text-gray-400">{courseContent.description}</p>
        
        <div className="mt-4">
          <Progress value={25} className="h-2 mb-1" />
          <div className="flex justify-between text-xs text-gray-400">
            <span>25% complete</span>
            <span>2/8 modules</span>
          </div>
        </div>
      </div>

      <Tabs defaultValue="content" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3 mb-6">
          <TabsTrigger value="content" className="data-[state=active]:bg-csgreen data-[state=active]:text-black">
            <BookOpen className="mr-2" size={18} /> Course Content
          </TabsTrigger>
          <TabsTrigger value="video" className="data-[state=active]:bg-csgreen data-[state=active]:text-black">
            <Play className="mr-2" size={18} /> Video Lessons
          </TabsTrigger>
          <TabsTrigger value="quiz" className="data-[state=active]:bg-csgreen data-[state=active]:text-black">
            <MousePointerClick className="mr-2" size={18} /> Quizzes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-0">
          <div className="space-y-4">
            {courseContent.modules.map((module, index) => (
              <Card key={module.id} className={`bg-csdark border-gray-800 ${activeModule === index ? 'border-csgreen' : ''}`}>
                <CardHeader className="py-3 px-4">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-md flex items-center">
                      {module.complete ? (
                        <CircleCheck className="mr-2 text-csgreen" size={20} />
                      ) : (
                        <BookText className="mr-2" size={20} />
                      )}
                      {module.title}
                    </CardTitle>
                    <Badge variant={module.complete ? "default" : "outline"} className={module.complete ? "bg-csgreen text-black" : ""}>
                      {module.complete ? "Completed" : "In Progress"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-4 pt-0 px-4">
                  <CardDescription>{module.description}</CardDescription>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center text-sm">
                      <CirclePlay className="mr-2 text-csgreen" size={16} />
                      <span>1 video lecture (15 min)</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <BookOpen className="mr-2 text-csgreen" size={16} />
                      <span>{module.readings.length} reading materials</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MousePointerClick className="mr-2 text-csgreen" size={16} />
                      <span>1 quiz</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0 px-4 pb-4">
                  <Button 
                    onClick={() => setActiveModule(index)} 
                    variant={activeModule === index ? "default" : "outline"}
                    className={activeModule === index ? "bg-csgreen text-black" : "border-csgreen text-white"}
                  >
                    {activeModule === index ? "Currently Studying" : "Start Module"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="video" className="mt-0">
          <Card className="bg-csdark border-gray-800">
            <CardHeader>
              <CardTitle>{courseContent.modules[activeModule].title} - Video Lecture</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-black/50 rounded-md flex items-center justify-center mb-4">
                <Play size={48} className="text-csgreen opacity-80" />
              </div>
              <p className="text-sm text-gray-400">
                This video lecture covers the core concepts of {courseContent.modules[activeModule].title.split(":")[1]}.
                Watch the complete video to track your progress.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="border-csgreen">
                Previous Video
              </Button>
              <Button className="bg-csgreen text-black">
                Mark as Completed
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="quiz" className="mt-0">
          <Card className="bg-csdark border-gray-800">
            <CardHeader>
              <CardTitle>{!quizActive ? "Available Quizzes" : `Quiz: Question ${currentQuiz + 1}`}</CardTitle>
            </CardHeader>
            <CardContent>
              {!quizActive ? (
                <div className="space-y-4">
                  {courseContent.quizzes.map(quiz => (
                    <div key={quiz.id} className="flex justify-between items-center border-b border-gray-800 pb-4">
                      <div>
                        <h3 className="font-medium">{quiz.title}</h3>
                        <p className="text-sm text-gray-400">{quiz.questions.length} questions · Estimated time: 10 minutes</p>
                      </div>
                      <Button onClick={handleQuizStart} className="bg-csgreen text-black">
                        Start Quiz
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-lg font-medium">
                    {courseContent.quizzes[0].questions[currentQuiz].question}
                  </div>
                  <div className="space-y-3">
                    {courseContent.quizzes[0].questions[currentQuiz].options.map((option, index) => (
                      <div 
                        key={index}
                        onClick={() => handleAnswerSelection(index)}
                        className={`p-4 border rounded-md cursor-pointer transition-colors ${
                          selectedAnswer === index 
                            ? 'border-csgreen bg-csgreen bg-opacity-10' 
                            : 'border-gray-700 hover:border-gray-500'
                        } ${
                          showAnswer && index === courseContent.quizzes[0].questions[currentQuiz].answer
                            ? 'border-green-500 bg-green-500 bg-opacity-10'
                            : showAnswer && selectedAnswer === index && selectedAnswer !== courseContent.quizzes[0].questions[currentQuiz].answer
                              ? 'border-red-500 bg-red-500 bg-opacity-10'
                              : ''
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 ${
                            selectedAnswer === index ? 'bg-csgreen' : 'border border-gray-500'
                          }`}>
                            {selectedAnswer === index && <Check size={14} className="text-black" />}
                          </div>
                          {option}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            {quizActive && (
              <CardFooter>
                {!showAnswer ? (
                  <Button 
                    onClick={checkAnswer} 
                    disabled={selectedAnswer === null}
                    className="bg-csgreen text-black ml-auto"
                  >
                    Check Answer
                  </Button>
                ) : (
                  <Button 
                    onClick={nextQuestion} 
                    className="bg-csgreen text-black ml-auto"
                  >
                    {currentQuiz < courseContent.quizzes[0].questions.length - 1 ? "Next Question" : "Finish Quiz"}
                  </Button>
                )}
              </CardFooter>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
