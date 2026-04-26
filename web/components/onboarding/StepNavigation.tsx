"use client";

import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StepNavigationProps {
  currentStep: number;
  totalSteps?: number;
  onBack?: () => void;
  onNext?: () => void;
  isSubmitting?: boolean;
  nextLabel?: string;
  backLabel?: string;
  nextDisabled?: boolean;
  className?: string;
}

export function StepNavigation({
  currentStep,
  totalSteps = 6,
  onBack,
  onNext,
  isSubmitting = false,
  nextLabel,
  backLabel = "Zurück",
  nextDisabled = false,
  className,
}: StepNavigationProps) {
  const isFirst = currentStep === 1;
  const isLast = currentStep === totalSteps;
  const defaultNextLabel = isLast ? "Abschließen" : "Weiter";

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 mt-8",
        className
      )}
    >
      <Button
        type="button"
        variant="ghost"
        onClick={onBack}
        disabled={isFirst || isSubmitting}
        className="gap-2"
        aria-label="Zurück zum vorherigen Schritt"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        {backLabel}
      </Button>

      <Button
        type="submit"
        disabled={nextDisabled || isSubmitting}
        className="gap-2 min-w-[120px]"
        aria-label={
          isSubmitting
            ? "Wird verarbeitet..."
            : nextLabel ?? defaultNextLabel
        }
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
            Bitte warten…
          </>
        ) : (
          <>
            {nextLabel ?? defaultNextLabel}
            {!isLast && (
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            )}
          </>
        )}
      </Button>
    </div>
  );
}
