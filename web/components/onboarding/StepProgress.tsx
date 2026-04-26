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
        <span className="text-xs text-slate-400">
          Schritt{" "}
          <span className="text-slate-200 font-semibold">{currentStep}</span>{" "}
          von {totalSteps}
        </span>
        <span className="text-xs text-slate-400">
          {labels[currentStep - 1]}
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-800 sm:hidden">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all duration-500"
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
                      "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300",
                      done
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : active
                        ? "bg-transparent border-indigo-500 text-indigo-400 ring-2 ring-indigo-500/30"
                        : "bg-transparent border-slate-700 text-slate-600"
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
                      "mt-1 text-[10px] font-medium whitespace-nowrap",
                      active ? "text-indigo-400" : done ? "text-slate-400" : "text-slate-600"
                    )}
                  >
                    {labels[i]}
                  </span>
                </div>
                {i < totalSteps - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-2 rounded-full transition-all duration-500",
                      done ? "bg-indigo-600" : "bg-slate-800"
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
