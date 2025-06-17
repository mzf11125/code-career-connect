
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Brain } from "lucide-react";
import { getModuleQuiz, getQuizQuestions, submitQuizAttempt, type Quiz, type QuizQuestion } from "@/services/enhancedCourseService";
import { toast } from "sonner";

interface QuizComponentProps {
  moduleId: string;
  onComplete: (passed: boolean, score: number) => void;
}

export function QuizComponent({ moduleId, onComplete }: QuizComponentProps) {
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadQuiz();
  }, [moduleId]);

  const loadQuiz = async () => {
    setLoading(true);
    try {
      const quizResult = await getModuleQuiz(moduleId);
      if (quizResult.error || !quizResult.data) {
        toast.error("No quiz available for this module");
        return;
      }

      setQuiz(quizResult.data);
      
      const questionsResult = await getQuizQuestions(quizResult.data.id);
      if (questionsResult.error) {
        toast.error("Failed to load quiz questions");
        return;
      }

      setQuestions(questionsResult.data || []);
    } catch (error) {
      toast.error("Failed to load quiz");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    let totalPoints = 0;

    questions.forEach(question => {
      totalPoints += question.points;
      if (answers[question.id] === question.correct_answer) {
        correct += question.points;
      }
    });

    return totalPoints > 0 ? Math.round((correct / totalPoints) * 100) : 0;
  };

  const handleSubmitQuiz = async () => {
    if (Object.keys(answers).length !== questions.length) {
      toast.error("Please answer all questions before submitting");
      return;
    }

    setSubmitting(true);
    try {
      const finalScore = calculateScore();
      const passed = finalScore >= (quiz?.passing_score || 70);

      const result = await submitQuizAttempt(quiz!.id, answers, finalScore, passed);
      if (result.error) {
        toast.error("Failed to submit quiz");
        return;
      }

      setScore(finalScore);
      setShowResults(true);
      onComplete(passed, finalScore);

      if (passed) {
        toast.success(`Quiz passed with ${finalScore}%!`);
      } else {
        toast.error(`Quiz failed with ${finalScore}%. Passing score is ${quiz?.passing_score}%`);
      }
    } catch (error) {
      toast.error("Failed to submit quiz");
    } finally {
      setSubmitting(false);
    }
  };

  const renderQuestion = (question: QuizQuestion) => {
    switch (question.question_type) {
      case 'multiple_choice':
        return (
          <RadioGroup
            value={answers[question.id] || ''}
            onValueChange={(value) => handleAnswerChange(question.id, value)}
          >
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${question.id}-${index}`} />
                <Label htmlFor={`${question.id}-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );

      case 'true_false':
        return (
          <RadioGroup
            value={answers[question.id] || ''}
            onValueChange={(value) => handleAnswerChange(question.id, value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id={`${question.id}-true`} />
              <Label htmlFor={`${question.id}-true`}>True</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id={`${question.id}-false`} />
              <Label htmlFor={`${question.id}-false`}>False</Label>
            </div>
          </RadioGroup>
        );

      case 'short_answer':
        return (
          <Input
            placeholder="Enter your answer..."
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
          />
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-6">
          <div className="text-center">Loading quiz...</div>
        </CardContent>
      </Card>
    );
  }

  if (!quiz || questions.length === 0) {
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardContent className="p-6">
          <div className="text-center text-gray-400">No quiz available for this module</div>
        </CardContent>
      </Card>
    );
  }

  if (showResults) {
    const passed = score >= (quiz.passing_score || 70);
    return (
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            {passed ? (
              <CheckCircle className="h-16 w-16 text-green-500" />
            ) : (
              <XCircle className="h-16 w-16 text-red-500" />
            )}
          </div>
          <CardTitle className={passed ? "text-green-400" : "text-red-400"}>
            {passed ? "Quiz Passed!" : "Quiz Failed"}
          </CardTitle>
          <CardDescription>
            Your score: {score}% (Passing score: {quiz.passing_score}%)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {questions.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.correct_answer;
              
              return (
                <div key={question.id} className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-start gap-2 mb-2">
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium">Question {index + 1}: {question.question}</p>
                      <p className="text-sm text-gray-400 mt-1">
                        Your answer: <span className={isCorrect ? "text-green-400" : "text-red-400"}>{userAnswer}</span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-400 mt-1">
                          Correct answer: {question.correct_answer}
                        </p>
                      )}
                      {question.explanation && (
                        <p className="text-sm text-gray-300 mt-2 italic">{question.explanation}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  }

  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;
  const currentQ = questions[currentQuestion];

  return (
    <Card className="bg-gray-900/50 border-gray-800">
      <CardHeader>
        <div className="flex items-center gap-2 mb-4">
          <Brain className="h-6 w-6 text-purple-500" />
          <CardTitle>{quiz.title}</CardTitle>
        </div>
        {quiz.description && <CardDescription>{quiz.description}</CardDescription>}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <span>Passing score: {quiz.passing_score}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {currentQ && (
          <div>
            <h3 className="text-lg font-medium mb-4">{currentQ.question}</h3>
            {renderQuestion(currentQ)}
          </div>
        )}

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          {currentQuestion < questions.length - 1 ? (
            <Button
              onClick={() => setCurrentQuestion(prev => prev + 1)}
              disabled={!answers[currentQ?.id]}
              className="bg-csgreen text-black hover:bg-csgreen/90"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmitQuiz}
              disabled={submitting || Object.keys(answers).length !== questions.length}
              className="bg-csgreen text-black hover:bg-csgreen/90"
            >
              {submitting ? "Submitting..." : "Submit Quiz"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
