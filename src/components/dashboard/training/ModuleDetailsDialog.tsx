
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Clock, CheckCircle, BookOpen } from "lucide-react";
import { type Module } from "@/pages/dashboard/training/TrainingModules";

interface ModuleDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  module: Module | null;
  onComplete?: () => void;
}

export function ModuleDetailsDialog({ 
  isOpen, 
  onClose,
  module,
  onComplete
}: ModuleDetailsDialogProps) {
  if (!module) return null;

  const categoryColors = {
    beginner: "bg-blue-500",
    intermediate: "bg-purple-500",
    advanced: "bg-red-500"
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <Badge className={categoryColors[module.category]}>
              {module.category}
            </Badge>
            {module.completed && (
              <Badge className="bg-green-500 flex items-center gap-1">
                <CheckCircle className="h-3 w-3" />
                Completed
              </Badge>
            )}
          </div>
          <DialogTitle className="text-2xl mt-2">{module.title}</DialogTitle>
          <DialogDescription className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            {module.duration}
            <span className="mx-1">•</span>
            <BookOpen className="h-4 w-4" />
            {module.completed ? "Already completed" : "Not started yet"}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-md bg-gray-100 mb-6">
            <img
              src={module.thumbnail}
              alt={module.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-muted-foreground">{module.content}</p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-2">Learning Objectives</h3>
              <ul className="list-disc pl-5 space-y-1">
                {module.objectives?.map((objective, index) => (
                  <li key={index} className="text-muted-foreground">{objective}</li>
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold text-lg mb-2">What You'll Learn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="flex items-start gap-2">
                  <div className="mt-1 bg-primary/10 p-1 rounded-full">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Export Market Strategies</p>
                    <p className="text-sm text-muted-foreground">Identify and enter new markets effectively</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 bg-primary/10 p-1 rounded-full">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Product Positioning</p>
                    <p className="text-sm text-muted-foreground">Position Egyptian products for international success</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 bg-primary/10 p-1 rounded-full">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Cultural Adaptations</p>
                    <p className="text-sm text-muted-foreground">Adapt marketing for different cultural contexts</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="mt-1 bg-primary/10 p-1 rounded-full">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Digital Marketing Tools</p>
                    <p className="text-sm text-muted-foreground">Utilize online channels for international reach</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {!module.completed && onComplete && (
            <Button onClick={onComplete}>
              Mark as Completed
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
