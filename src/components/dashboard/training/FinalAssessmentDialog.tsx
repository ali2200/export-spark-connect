
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Award, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string | string[];
  type: "single" | "multiple";
  selectedAnswer?: string | string[];
}

interface FinalAssessmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function FinalAssessmentDialog({
  isOpen,
  onClose,
  onComplete
}: FinalAssessmentDialogProps) {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions: Question[] = [
    {
      id: "q1",
      question: "What is the primary purpose of export marketing?",
      options: [
        "Selling excess domestic inventory",
        "Expanding market reach to international customers",
        "Reducing production costs",
        "Meeting local regulatory requirements"
      ],
      correctAnswer: "Expanding market reach to international customers",
      type: "single"
    },
    {
      id: "q2",
      question: "Which of the following are important considerations in cross-cultural communication? (Select all that apply)",
      options: [
        "Understanding cultural context",
        "Using universal marketing messages",
        "Adapting to local customs and practices",
        "Ignoring cultural differences for global consistency"
      ],
      correctAnswer: ["Understanding cultural context", "Adapting to local customs and practices"],
      type: "multiple"
    },
    {
      id: "q3",
      question: "What is an effective product positioning strategy for Egyptian exports?",
      options: [
        "Always undercutting competitors on price",
        "Highlighting unique craftsmanship and cultural heritage",
        "Mimicking successful global brands",
        "Focusing only on domestic market strengths"
      ],
      correctAnswer: "Highlighting unique craftsmanship and cultural heritage",
      type: "single"
    },
    {
      id: "q4",
      question: "Which digital marketing approach is most effective for reaching international markets?",
      options: [
        "Using only English language content",
        "Creating localized content for target markets",
        "Focusing exclusively on social media",
        "Avoiding digital platforms entirely"
      ],
      correctAnswer: "Creating localized content for target markets",
      type: "single"
    }
  ];

  const handleSingleSelection = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const handleMultipleSelection = (value: string, checked: boolean) => {
    const currentAnswers = answers[questions[currentQuestion].id] as string[] || [];
    
    let newAnswers: string[];
    if (checked) {
      newAnswers = [...currentAnswers, value];
    } else {
      newAnswers = currentAnswers.filter(answer => answer !== value);
    }
    
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: newAnswers
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      evaluateAnswers();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const evaluateAnswers = () => {
    setIsSubmitting(true);
    
    let correctAnswers = 0;
    questions.forEach(question => {
      const userAnswer = answers[question.id];
      
      if (question.type === "single" && userAnswer === question.correctAnswer) {
        correctAnswers++;
      } else if (question.type === "multiple" && Array.isArray(userAnswer) && Array.isArray(question.correctAnswer)) {
        const isCorrect = 
          userAnswer.length === question.correctAnswer.length && 
          question.correctAnswer.every(answer => userAnswer.includes(answer));
        
        if (isCorrect) correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);
    setIsSubmitting(false);
  };

  const handleComplete = () => {
    if (score >= 70) {
      toast({
        title: "Congratulations!",
        description: "You've earned your Export Marketing Certification!",
      });
      onComplete();
    } else {
      toast({
        title: "Almost there!",
        description: "You need at least 70% to pass. Please try again.",
      });
      setShowResults(false);
      setCurrentQuestion(0);
    }
  };

  const currentQuestionData = questions[currentQuestion];
  const hasAnswer = !!answers[currentQuestionData?.id];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        {!showResults ? (
          <>
            <DialogHeader>
              <DialogTitle>Final Assessment</DialogTitle>
              <DialogDescription>
                Complete this assessment to earn your certification.
                Question {currentQuestion + 1} of {questions.length}
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <h3 className="font-medium mb-3">{currentQuestionData.question}</h3>
              
              {currentQuestionData.type === "single" ? (
                <RadioGroup
                  value={answers[currentQuestionData.id] as string || ""}
                  onValueChange={handleSingleSelection}
                  className="space-y-2"
                >
                  {currentQuestionData.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-2">
                  {currentQuestionData.options.map((option, index) => {
                    const currentAnswers = answers[currentQuestionData.id] as string[] || [];
                    const isChecked = currentAnswers.includes(option);
                    
                    return (
                      <div key={index} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`option-${index}`}
                          checked={isChecked}
                          onCheckedChange={(checked) => 
                            handleMultipleSelection(option, checked === true)
                          }
                        />
                        <Label htmlFor={`option-${index}`}>{option}</Label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <DialogFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={!hasAnswer || isSubmitting}
              >
                {currentQuestion < questions.length - 1 ? "Next" : "Submit"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-center">Assessment Complete</DialogTitle>
            </DialogHeader>

            <div className="py-6 text-center">
              <div className="mb-4">
                <Award className="w-16 h-16 mx-auto text-amber-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Your Score: {score}%</h3>
              <p className="text-muted-foreground mb-4">
                {score >= 70 
                  ? "Congratulations! You've passed the assessment!" 
                  : "You need at least 70% to pass. Please try again."}
              </p>
            </div>

            <DialogFooter>
              <Button 
                onClick={handleComplete} 
                className="w-full"
              >
                {score >= 70 ? "Get Your Certificate" : "Try Again"}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
