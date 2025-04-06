
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, CheckCircle, Clock, GraduationCap, PlayCircle, Star } from "lucide-react";

// Types for our training modules
interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: "beginner" | "intermediate" | "advanced";
  completed: boolean;
  thumbnail: string;
}

export default function TrainingModules() {
  const { user } = useAuth();
  const [activeCategory, setActiveCategory] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");
  
  // Mock training modules data
  const modules: Module[] = [
    {
      id: "1",
      title: "Introduction to Export Marketing",
      description: "Learn the basics of marketing products for international export",
      duration: "45 minutes",
      category: "beginner",
      completed: true,
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "2",
      title: "Product Positioning Strategies",
      description: "How to position products effectively in foreign markets",
      duration: "1 hour",
      category: "beginner",
      completed: false,
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "3",
      title: "Cross-Cultural Communication",
      description: "Effective communication strategies for different cultures",
      duration: "1.5 hours",
      category: "intermediate",
      completed: false,
      thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "4",
      title: "Advanced Market Analysis",
      description: "Deep dive into analyzing export market potential",
      duration: "2 hours",
      category: "advanced",
      completed: false,
      thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "5",
      title: "Digital Marketing for Exporters",
      description: "Leveraging digital channels for export marketing",
      duration: "1 hour",
      category: "intermediate",
      completed: false,
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    },
  ];
  
  // Filter modules based on active category
  const filteredModules = activeCategory === "all" 
    ? modules 
    : modules.filter(module => module.category === activeCategory);

  return (
    <div className="space-y-6">
      <div>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Training</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mt-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Training Modules</h1>
            <p className="text-muted-foreground">
              Improve your export marketing skills with our curated training modules.
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs px-2 py-1">
              <Clock className="h-3 w-3 mr-1" />
              {modules.filter(m => m.completed).length} of {modules.length} completed
            </Badge>
          </div>
        </div>
      </div>
      
      <Tabs defaultValue="all" onValueChange={(value) => setActiveCategory(value as any)}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Modules</TabsTrigger>
          <TabsTrigger value="beginner">Beginner</TabsTrigger>
          <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeCategory} className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredModules.map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="bg-muted/50 rounded-lg p-6 mt-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="p-3 bg-primary/10 rounded-full">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium">Become a Certified Export Marketer</h3>
            <p className="text-sm text-muted-foreground">Complete all modules and take the final assessment to earn your certification.</p>
          </div>
          <Button>View Certification Path</Button>
        </div>
      </div>
    </div>
  );
}

// Module card component
function ModuleCard({ module }: { module: Module }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={module.thumbnail} 
          alt={module.title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        {module.completed && (
          <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
            <CheckCircle className="h-5 w-5" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <Badge className="capitalize">{module.category}</Badge>
        </div>
      </div>
      
      <CardHeader>
        <CardTitle>{module.title}</CardTitle>
        <CardDescription className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          {module.duration}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm">{module.description}</p>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center text-sm text-muted-foreground">
          <BookOpen className="mr-1 h-4 w-4" />
          {module.completed ? "Completed" : "Not started"}
        </div>
        <Button className="flex items-center">
          {module.completed ? (
            <>Review<Star className="ml-1 h-4 w-4" /></>
          ) : (
            <>Start<PlayCircle className="ml-1 h-4 w-4" /></>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
