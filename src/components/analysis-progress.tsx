import { CheckCircle, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalysisStep {
  id: string;
  label: string;
  description: string;
  status: 'pending' | 'running' | 'completed';
  duration?: number;
}

interface AnalysisProgressProps {
  steps: AnalysisStep[];
  className?: string;
}

export function AnalysisProgress({ steps, className }: AnalysisProgressProps) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center gap-4 p-4 rounded-lg border bg-card">
            <div className="flex-shrink-0">
              {step.status === 'completed' && (
                <CheckCircle className="w-6 h-6 text-success" />
              )}
              {step.status === 'running' && (
                <Loader2 className="w-6 h-6 text-primary animate-spin" />
              )}
              {step.status === 'pending' && (
                <Circle className="w-6 h-6 text-muted-foreground" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className={cn(
                  "font-medium text-sm",
                  step.status === 'completed' ? "text-success" :
                  step.status === 'running' ? "text-primary" :
                  "text-muted-foreground"
                )}>
                  {step.label}
                </h4>
                {step.duration && step.status === 'completed' && (
                  <span className="text-xs text-muted-foreground">
                    ({step.duration}ms)
                  </span>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {step.description}
              </p>
            </div>

            {step.status === 'running' && (
              <div className="flex-shrink-0">
                <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-primary animate-scan relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse-glow" />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}