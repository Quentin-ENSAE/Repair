import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export function StepNav({
  step,
  totalSteps,
  onBack,
  onNext,
  nextLabel,
}: {
  step: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
}) {
  return (
    <div className="flex flex-col gap-3 pt-2">
      <p className="text-xs text-muted-foreground text-center">
        Étape {step + 1} / {totalSteps}
      </p>
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          className="rounded-2xl flex-1"
          onClick={onBack}
          disabled={step === 0}
        >
          <ChevronLeft className="size-4" />
          Précédent
        </Button>
        <Button type="button" className="rounded-2xl flex-1" onClick={onNext}>
          {nextLabel ?? (
            <>
              Suivant
              <ChevronRight className="size-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
