"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepProgressProps {
  currentStep: number;
  totalSteps?: number;
  labels?: string[];
}

const DEFAULT_LABELS = [
  "Konto",
  "Vollmacht",
  "Daten",
  "Sicherheit",
  "Suche",
  "Extension",
];

export function StepProgress({
  currentStep,
  totalSteps = 6,
  labels = DEFAULT_LABELS,
}: StepProgressProps) {
  return (
    <div
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`Schritt ${currentStep} von ${totalSteps}`}
      className="w-full"
    >
      {/* Mobile: compact pill */}
      <div className="flex items-center justify-between mb-2 sm:hidden">
        <span className="font-mono text-[12px] text-ash">
          Schritt{" "}
          <span className="text-ink font-semibold">{currentStep}</span>{" "}
          von {totalSteps}
        </span>
        <span className="font-mono text-[12px] text-ash">
          {labels[currentStep - 1]}
        </span>
      </div>
      <div className="h-1.5 w-full bg-paper-2 border border-ink/20 sm:hidden">
        <div
          className="h-full bg-stamp transition-all duration-500"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {/* Desktop: step dots */}
      <nav aria-label="Onboarding Fortschritt" className="hidden sm:block">
        <ol className="flex items-center w-full">
          {Array.from({ length: totalSteps }, (_, i) => {
            const step = i + 1;
            const done = step < currentStep;
            const active = step === currentStep;
            return (
              <li
                key={step}
                className={cn("flex items-center", i < totalSteps - 1 ? "flex-1" : "")}
              >
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-8 h-8 flex items-center justify-center font-mono text-xs font-bold border-2 transition-all duration-300",
                      done
                        ? "bg-stamp border-stamp text-paper"
                        : active
                        ? "bg-paper border-ink text-ink ring-2 ring-ink/20"
                        : "bg-paper border-ash/40 text-ash"
                    )}
                    aria-current={active ? "step" : undefined}
                  >
                    {done ? (
                      <Check className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      step
                    )}
                  </div>
                  <span
                    className={cn(
                      "mt-1 font-mono text-[10px] whitespace-nowrap",
                      active ? "text-ink font-semibold" : done ? "text-ash" : "text-ash/60"
                    )}
                  >
                    {labels[i]}
                  </span>
                </div>
                {i < totalSteps - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-2 transition-all duration-500",
                      done ? "bg-stamp" : "bg-ink/15"
                    )}
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
