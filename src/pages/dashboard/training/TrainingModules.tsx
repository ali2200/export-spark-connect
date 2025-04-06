
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Play, Award, CheckCircle, LockIcon } from "lucide-react";

// Mock training data
const mockTrainingModules = [
  {
    id: "1",
    title: "Introduction to Export Marketing",
    description: "Learn the basics of export marketing and global trade.",
    duration: "2h 15m",
    lessons: 8,
    category: "basics",
    progress: 100,
    completed: true,
    image: "https://via.placeholder.com/400x225",
  },
  {
    id: "2",
    title: "Understanding International Markets",
    description: "Discover how to research and enter new international markets.",
    duration: "3h 45m",
    lessons: 12,
    category: "basics",
    progress: 60,
    completed: false,
    image: "https://via.placeholder.com/400x225",
  },
  {
    id: "3",
    title: "Egyptian Furniture Export",
    description: "Specialized training for furniture export from Egypt.",
    duration: "4h 30m",
    lessons: 16,
    category: "industry",
    progress: 25,
    completed: false,
    image: "https://via.placeholder.com/400x225",
  },
  {
    id: "4",
    title: "Textile Export Masterclass",
    description: "Comprehensive guide to textile export strategies.",
    duration: "5h 20m",
    lessons: 18,
    category: "industry",
    progress: 0,
    completed: false,
    image: "https://via.placeholder.com/400x225",
  },
  {
    id: "5",
    title: "Advanced Lead Generation",
    description: "Tactics and strategies to generate quality export leads.",
    duration: "3h 10m",
    lessons: 10,
    category: "skills",
    progress: 0,
    completed: false,
    image: "https://via.placeholder.com/400x225",
  },
  {
    id: "6",
    title: "Negotiation in Export Deals",
    description: "Master the art of negotiation in international trade.",
    duration: "2h 40m",
    lessons: 8,
    category: "skills",
    progress: 0,
    completed: false,
    image: "https://via.placeholder.com/400x225",
  },
];

export default function TrainingModules() {
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const handleContinueTraining = (module: any) => {
    toast({
      title: "Continuing training",
      description: `Resuming ${module.title} from where you left off.`,
    });
    setSelectedModule(module);
    setIsModalOpen(true);
  };

  const handleStartTraining = (module: any) => {
    toast({
      title: "Starting new training",
      description: `Beginning ${module.title} module.`,
    });
    setSelectedModule(module);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Training Center</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="all" className="space-y-4">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="all">All Modules</TabsTrigger>
                <TabsTrigger value="basics">Export Basics</TabsTrigger>
                <TabsTrigger value="industry">Industry Specific</TabsTrigger>
                <TabsTrigger value="skills">Advanced Skills</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockTrainingModules.map((module) => (
                  <Card key={module.id} className="overflow-hidden">
                    <div className="aspect-video w-full overflow-hidden">
                      <img 
                        src={module.image} 
                        alt={module.title} 
                        className="w-full h-full object-cover"
                      />
                      {module.progress > 0 && module.progress < 100 && (
                        <div className="relative -mt-1">
                          <Progress value={module.progress} className="h-1 rounded-none" />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant={module.completed ? "default" : "outline"}>
                          {module.category === "basics" && "Export Basics"}
                          {module.category === "industry" && "Industry Specific"}
                          {module.category === "skills" && "Advanced Skills"}
                        </Badge>
                        {module.completed && (
                          <Badge className="bg-green-500">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Completed
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold text-lg">{module.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 mb-3">{module.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground mb-4">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {module.lessons} lessons
                        <span className="mx-2">•</span>
                        <Play className="h-4 w-4 mr-1" />
                        {module.duration}
                      </div>
                      {module.progress > 0 && module.progress < 100 ? (
                        <Button 
                          className="w-full"
                          onClick={() => handleContinueTraining(module)}
                        >
                          Continue ({module.progress}%)
                        </Button>
                      ) : !module.completed ? (
                        <Button 
                          className="w-full" 
                          variant={module.progress === 0 ? "default" : "outline"}
                          onClick={() => handleStartTraining(module)}
                        >
                          Start Training
                        </Button>
                      ) : (
                        <Button 
                          className="w-full" 
                          variant="outline"
                          onClick={() => handleStartTraining(module)}
                        >
                          Review Again
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="basics">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockTrainingModules
                  .filter((module) => module.category === "basics")
                  .map((module) => (
                    <Card key={module.id} className="overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden">
                        <img 
                          src={module.image} 
                          alt={module.title} 
                          className="w-full h-full object-cover"
                        />
                        {module.progress > 0 && module.progress < 100 && (
                          <div className="relative -mt-1">
                            <Progress value={module.progress} className="h-1 rounded-none" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant={module.completed ? "default" : "outline"}>Export Basics</Badge>
                          {module.completed && (
                            <Badge className="bg-green-500">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-lg">{module.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-3">{module.description}</p>
                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {module.lessons} lessons
                          <span className="mx-2">•</span>
                          <Play className="h-4 w-4 mr-1" />
                          {module.duration}
                        </div>
                        {module.progress > 0 && module.progress < 100 ? (
                          <Button 
                            className="w-full"
                            onClick={() => handleContinueTraining(module)}
                          >
                            Continue ({module.progress}%)
                          </Button>
                        ) : !module.completed ? (
                          <Button 
                            className="w-full" 
                            variant={module.progress === 0 ? "default" : "outline"}
                            onClick={() => handleStartTraining(module)}
                          >
                            Start Training
                          </Button>
                        ) : (
                          <Button 
                            className="w-full" 
                            variant="outline"
                            onClick={() => handleStartTraining(module)}
                          >
                            Review Again
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="industry">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockTrainingModules
                  .filter((module) => module.category === "industry")
                  .map((module) => (
                    <Card key={module.id} className="overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden">
                        <img 
                          src={module.image} 
                          alt={module.title} 
                          className="w-full h-full object-cover"
                        />
                        {module.progress > 0 && module.progress < 100 && (
                          <div className="relative -mt-1">
                            <Progress value={module.progress} className="h-1 rounded-none" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant={module.completed ? "default" : "outline"}>Industry Specific</Badge>
                          {module.completed && (
                            <Badge className="bg-green-500">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-lg">{module.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-3">{module.description}</p>
                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {module.lessons} lessons
                          <span className="mx-2">•</span>
                          <Play className="h-4 w-4 mr-1" />
                          {module.duration}
                        </div>
                        {module.progress > 0 && module.progress < 100 ? (
                          <Button 
                            className="w-full"
                            onClick={() => handleContinueTraining(module)}
                          >
                            Continue ({module.progress}%)
                          </Button>
                        ) : !module.completed ? (
                          <Button 
                            className="w-full" 
                            variant={module.progress === 0 ? "default" : "outline"}
                            onClick={() => handleStartTraining(module)}
                          >
                            Start Training
                          </Button>
                        ) : (
                          <Button 
                            className="w-full" 
                            variant="outline"
                            onClick={() => handleStartTraining(module)}
                          >
                            Review Again
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="skills">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockTrainingModules
                  .filter((module) => module.category === "skills")
                  .map((module) => (
                    <Card key={module.id} className="overflow-hidden">
                      <div className="aspect-video w-full overflow-hidden">
                        <img 
                          src={module.image} 
                          alt={module.title} 
                          className="w-full h-full object-cover"
                        />
                        {module.progress > 0 && module.progress < 100 && (
                          <div className="relative -mt-1">
                            <Progress value={module.progress} className="h-1 rounded-none" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant={module.completed ? "default" : "outline"}>Advanced Skills</Badge>
                          {module.completed && (
                            <Badge className="bg-green-500">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-semibold text-lg">{module.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-3">{module.description}</p>
                        <div className="flex items-center text-sm text-muted-foreground mb-4">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {module.lessons} lessons
                          <span className="mx-2">•</span>
                          <Play className="h-4 w-4 mr-1" />
                          {module.duration}
                        </div>
                        {module.progress > 0 && module.progress < 100 ? (
                          <Button 
                            className="w-full"
                            onClick={() => handleContinueTraining(module)}
                          >
                            Continue ({module.progress}%)
                          </Button>
                        ) : !module.completed ? (
                          <Button 
                            className="w-full" 
                            variant={module.progress === 0 ? "default" : "outline"}
                            onClick={() => handleStartTraining(module)}
                          >
                            Start Training
                          </Button>
                        ) : (
                          <Button 
                            className="w-full" 
                            variant="outline"
                            onClick={() => handleStartTraining(module)}
                          >
                            Review Again
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>Track your training journey</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Completion</span>
                  <span>25%</span>
                </div>
                <Progress value={25} className="h-2" />
              </div>
              
              <div className="pt-2">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Modules Completed</span>
                    <p className="text-lg font-medium">1 / 6</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground">Certification Progress</span>
                    <p className="text-lg font-medium">Bronze</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
              <CardDescription>Earn specialized certifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Award className="h-8 w-8 text-amber-500 mr-3" />
                    <div>
                      <h4 className="font-medium">Export Basics</h4>
                      <p className="text-xs text-muted-foreground">2/2 modules completed</p>
                    </div>
                  </div>
                  <Badge className="bg-amber-500">Available</Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Award className="h-8 w-8 text-gray-400 mr-3" />
                    <div>
                      <h4 className="font-medium">Furniture Specialist</h4>
                      <p className="text-xs text-muted-foreground">0/1 modules completed</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="flex items-center">
                    <LockIcon className="h-3 w-3 mr-1" />
                    Locked
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Award className="h-8 w-8 text-gray-400 mr-3" />
                    <div>
                      <h4 className="font-medium">Textile Specialist</h4>
                      <p className="text-xs text-muted-foreground">0/1 modules completed</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="flex items-center">
                    <LockIcon className="h-3 w-3 mr-1" />
                    Locked
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View All Certifications</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
