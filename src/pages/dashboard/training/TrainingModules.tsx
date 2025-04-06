
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, CheckCircle, Clock, GraduationCap, PlayCircle, Star, Trophy } from "lucide-react";
import { ModuleCard } from "@/components/dashboard/training/ModuleCard";
import { TrainingCertification } from "@/components/dashboard/training/TrainingCertification";
import { ModuleDetailsDialog } from "@/components/dashboard/training/ModuleDetailsDialog";
import { useToast } from "@/hooks/use-toast";

// Types for our training modules
export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  category: "beginner" | "intermediate" | "advanced";
  completed: boolean;
  thumbnail: string;
  content?: string;
  objectives?: string[];
}

export default function TrainingModules() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeCategory, setActiveCategory] = useState<"all" | "beginner" | "intermediate" | "advanced">("all");
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [isModuleDetailsOpen, setIsModuleDetailsOpen] = useState(false);
  const [modules, setModules] = useState<Module[]>([
    {
      id: "1",
      title: "Introduction to Export Marketing",
      description: "Learn the basics of marketing products for international export",
      duration: "45 minutes",
      category: "beginner",
      completed: true,
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
      content: "This module covers the fundamentals of export marketing, including market research, product positioning, and understanding international trade regulations. You'll learn how to identify potential export markets and develop effective strategies for entering them.",
      objectives: [
        "Understand the basics of export marketing",
        "Identify potential export markets for Egyptian products",
        "Learn about international trade regulations",
        "Develop effective product positioning strategies"
      ]
    },
    {
      id: "2",
      title: "Product Positioning Strategies",
      description: "How to position products effectively in foreign markets",
      duration: "1 hour",
      category: "beginner",
      completed: false,
      thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
      content: "This module explores advanced techniques for positioning Egyptian products in foreign markets. You'll learn how to highlight unique selling points, adapt to cultural preferences, and compete effectively against local and international competitors.",
      objectives: [
        "Develop effective positioning statements for various markets",
        "Understand cultural factors affecting product positioning",
        "Learn to highlight Egyptian craftsmanship as a competitive advantage",
        "Create market-specific value propositions"
      ]
    },
    {
      id: "3",
      title: "Cross-Cultural Communication",
      description: "Effective communication strategies for different cultures",
      duration: "1.5 hours",
      category: "intermediate",
      completed: false,
      thumbnail: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=600&q=80",
      content: "This module focuses on developing effective cross-cultural communication skills essential for export marketers. You'll learn how to adapt your messaging to different cultural contexts and avoid common pitfalls in international business communication.",
      objectives: [
        "Understand high-context vs. low-context communication styles",
        "Learn negotiation tactics for different cultural regions",
        "Develop culturally sensitive marketing materials",
        "Avoid common cross-cultural miscommunication mistakes"
      ]
    },
    {
      id: "4",
      title: "Advanced Market Analysis",
      description: "Deep dive into analyzing export market potential",
      duration: "2 hours",
      category: "advanced",
      completed: false,
      thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=600&q=80",
      content: "This advanced module covers sophisticated market analysis techniques for identifying high-potential export opportunities. You'll learn how to analyze market trends, consumer behavior, and competitive landscapes to make data-driven decisions.",
      objectives: [
        "Conduct comprehensive market research for export opportunities",
        "Analyze competitor positioning in foreign markets",
        "Identify emerging market trends and opportunities",
        "Develop data-driven market entry strategies"
      ]
    },
    {
      id: "5",
      title: "Digital Marketing for Exporters",
      description: "Leveraging digital channels for export marketing",
      duration: "1 hour",
      category: "intermediate",
      completed: false,
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
      content: "This module explores how to use digital marketing channels to promote Egyptian products internationally. You'll learn strategies for social media marketing, content creation, and online advertising that are effective across different international markets.",
      objectives: [
        "Develop an international digital marketing strategy",
        "Optimize product listings for global e-commerce platforms",
        "Create culturally relevant content for different markets",
        "Track and measure digital marketing performance across regions"
      ]
    },
  ]);
  
  // Filter modules based on active category
  const filteredModules = activeCategory === "all" 
    ? modules 
    : modules.filter(module => module.category === activeCategory);

  // Calculate completion statistics
  const completedModules = modules.filter(m => m.completed).length;
  const totalModules = modules.length;
  const completionPercentage = Math.round((completedModules / totalModules) * 100);

  // Handle module actions
  const handleViewModule = (module: Module) => {
    setSelectedModule(module);
    setIsModuleDetailsOpen(true);
  };

  const handleStartModule = (moduleId: string) => {
    handleViewModule(modules.find(m => m.id === moduleId)!);
  };

  const handleCompleteModule = (moduleId: string) => {
    setModules(prevModules => 
      prevModules.map(m => 
        m.id === moduleId ? { ...m, completed: true } : m
      )
    );
    toast({
      title: "Module Completed!",
      description: "Your progress has been updated and saved.",
    });
    setIsModuleDetailsOpen(false);
  };

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
            <div className="bg-muted p-2 rounded-md flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-medium">
                {completedModules} of {totalModules} completed
              </span>
              <Badge variant="secondary" className="text-xs">
                {completionPercentage}%
              </Badge>
            </div>
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
              <ModuleCard 
                key={module.id} 
                module={module} 
                onView={() => handleViewModule(module)}
                onStart={() => handleStartModule(module.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <TrainingCertification 
        completedModules={completedModules} 
        totalModules={totalModules} 
      />

      <ModuleDetailsDialog
        isOpen={isModuleDetailsOpen}
        onClose={() => setIsModuleDetailsOpen(false)}
        module={selectedModule}
        onComplete={selectedModule ? () => handleCompleteModule(selectedModule.id) : undefined}
      />
    </div>
  );
}
