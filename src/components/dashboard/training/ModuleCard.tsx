
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, Clock, PlayCircle, Star } from "lucide-react";
import { type Module } from "@/pages/dashboard/training/TrainingModules";

interface ModuleCardProps {
  module: Module;
  onView: () => void;
  onStart: () => void;
}

export function ModuleCard({ module, onView, onStart }: ModuleCardProps) {
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
        <Button 
          onClick={module.completed ? onView : onStart} 
          className="flex items-center"
        >
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
