import { GraduationCap, Award, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface TrainingCertificationProps {
  completedModules: number;
  totalModules: number;
}

export function TrainingCertification({ completedModules, totalModules }: TrainingCertificationProps) {
  const progress = Math.round((completedModules / totalModules) * 100);
  const isEligible = completedModules === totalModules;
  
  return (
    <div className="bg-muted/50 rounded-lg p-6 mt-8">
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        <div className="p-3 bg-primary/10 rounded-full">
          <GraduationCap className="h-6 w-6 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium">Export Marketing Certification</h3>
            {isEligible && (
              <Badge className="bg-green-500">
                <Check className="h-3 w-3 mr-1" />
                Eligible
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Complete all modules and take the final assessment to earn your certification.
          </p>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{completedModules}/{totalModules} modules</span>
            </div>
            <Progress value={progress} />
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {[...Array(totalModules)].map((_, i) => (
              <div 
                key={i}
                className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                  i < completedModules 
                    ? "bg-primary text-primary-foreground border-primary" 
                    : "bg-background border-input"
                }`}
              >
                {i < completedModules ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="text-xs">{i + 1}</span>
                )}
              </div>
            ))}
            <div className="w-8 h-8 flex items-center justify-center rounded-full border border-input bg-background">
              <Award className="h-4 w-4 text-amber-500" />
            </div>
          </div>
        </div>
        <Button 
          disabled={!isEligible}
          className="whitespace-nowrap"
        >
          {isEligible ? (
            <>Take Final Assessment<ArrowRight className="ml-2 h-4 w-4" /></>
          ) : (
            "Complete All Modules"
          )}
        </Button>
      </div>
    </div>
  );
}
