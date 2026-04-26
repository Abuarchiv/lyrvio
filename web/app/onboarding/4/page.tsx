"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step4Schema, type Step4Data } from "@/app/onboarding/schemas";
import { StepProgress } from "@/components/onboarding/StepProgress";
import { StepNavigation } from "@/components/onboarding/StepNavigation";
import { MappeUploader } from "@/components/onboarding/MappeUploader";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";

const LS_KEY = "lyrvio_onboarding";

const SCHUFA_OPTIONS = [
  { value: "sehr_gut", label: "Sehr gut (97–100)", color: "text-sage" },
  { value: "gut", label: "Gut (95–96)", color: "text-sage" },
  { value: "befriedigend", label: "Befriedigend (90–94)", color: "text-ink-2" },
  { value: "ausreichend", label: "Ausreichend (80–89)", color: "text-stamp" },
  { value: "keine", label: "Kein Schufa-Score / Nicht bekannt", color: "text-ash" },
];

const BESCHAEFTIGUNG_OPTIONS = [
  { value: "angestellt", label: "Angestellt (unbefristet)" },
  { value: "beamtet", label: "Beamtet" },
  { value: "selbststaendig", label: "Selbstständig / Freiberuflich" },
  { value: "student", label: "Student/in" },
  { value: "rentner", label: "Rentner/in" },
  { value: "sonstiges", label: "Sonstiges" },
];

function getSaved(): Partial<Step4Data> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? "{}").step4 ?? {};
  } catch {
    return {};
  }
}

export default function Step4Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Step4Data>({
    resolver: zodResolver(step4Schema),
    defaultValues: getSaved(),
  });

  const values = watch();

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) ?? "{}");
      localStorage.setItem(LS_KEY, JSON.stringify({ ...saved, step4: values }));
    } catch {}
  }, [values.nettogehalt, values.schufa, values.beschaeftigungsart, values.mappeUrl]);

  const onSubmit = async (data: Step4Data) => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) ?? "{}");
      localStorage.setItem(LS_KEY, JSON.stringify({ ...saved, step4: data }));
    } catch {}
    router.push("/onboarding/5");
  };

  return (
    <div className="space-y-8">
      <StepProgress currentStep={4} />

      <div className="space-y-1">
        <p className="label">Schritt 4</p>
        <h1 className="font-display text-[32px] tracking-[-0.025em] text-ink">
          Mietsicherheits-Daten
        </h1>
        <p className="font-mono text-[13px] text-ash">
          Stärkt deine Bewerbung — Vermieter sehen diese Infos als Vertrauens­signal.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-label="Mietsicherheits-Daten eingeben"
      >
        <fieldset className="space-y-6">
          <legend className="sr-only">Finanzielle Informationen</legend>

          {/* Nettogehalt */}
          <div className="space-y-1.5">
            <Label htmlFor="nettogehalt">
              Monatliches Nettoeinkommen (€)
            </Label>
            <div className="relative">
              <Input
                id="nettogehalt"
                type="number"
                min="0"
                max="99999"
                placeholder="2500"
                className="pr-8"
                aria-required="true"
                aria-invalid={!!errors.nettogehalt}
                aria-describedby={
                  errors.nettogehalt ? "gehalt-error" : "gehalt-hint"
                }
                {...register("nettogehalt")}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-ash font-mono text-[13px] pointer-events-none">
                €
              </span>
            </div>
            <p id="gehalt-hint" className="font-mono text-[11px] text-ash flex gap-1.5 items-start">
              <Info className="w-3 h-3 mt-0.5 shrink-0" aria-hidden="true" />
              Faustregel: Kaltmiete sollte max. 1/3 des Nettoeinkommens sein.
            </p>
            {errors.nettogehalt && (
              <p id="gehalt-error" role="alert" className="font-mono text-[12px] text-stamp">
                {errors.nettogehalt.message}
              </p>
            )}
          </div>

          {/* Schufa */}
          <div className="space-y-2">
            <Label>Schufa-Score</Label>
            <div className="space-y-2" role="group" aria-label="Schufa-Score auswählen">
              {SCHUFA_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center gap-3 border-2 border-ink bg-paper-warm px-3 py-2.5 cursor-pointer hover:bg-paper-2 transition-colors"
                >
                  <input
                    type="radio"
                    value={opt.value}
                    className="w-4 h-4 accent-stamp border-2 border-ink bg-paper focus:ring-2 focus:ring-stamp focus:ring-offset-1 focus:ring-offset-paper"
                    aria-describedby={errors.schufa ? "schufa-error" : undefined}
                    {...register("schufa")}
                  />
                  <span className={`font-mono text-[13px] font-medium ${opt.color}`}>
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
            {errors.schufa && (
              <p id="schufa-error" role="alert" className="font-mono text-[12px] text-stamp">
                {errors.schufa.message}
              </p>
            )}
          </div>

          {/* Beschäftigungsart */}
          <div className="space-y-1.5">
            <Label htmlFor="beschaeftigungsart">Beschäftigungsart</Label>
            <div className="relative">
              <select
                id="beschaeftigungsart"
                className="flex h-10 w-full appearance-none border-2 border-ink bg-paper px-3 py-2 font-mono text-[14px] text-ink focus:outline-none focus:ring-2 focus:ring-stamp focus:border-stamp"
                aria-required="true"
                aria-invalid={!!errors.beschaeftigungsart}
                aria-describedby={
                  errors.beschaeftigungsart ? "beschaeft-error" : undefined
                }
                {...register("beschaeftigungsart")}
              >
                <option value="">Auswählen…</option>
                {BESCHAEFTIGUNG_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ash">
                ▾
              </span>
            </div>
            {errors.beschaeftigungsart && (
              <p id="beschaeft-error" role="alert" className="font-mono text-[12px] text-stamp">
                {errors.beschaeftigungsart.message}
              </p>
            )}
          </div>

          {/* Mietmappe upload */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Mietmappe hochladen</Label>
              <span className="font-mono text-[10px] text-ash border border-ink/30 px-2 py-0.5">
                Optional
              </span>
            </div>
            <MappeUploader
              onUpload={(url) => setValue("mappeUrl", url)}
            />
          </div>
        </fieldset>

        <StepNavigation
          currentStep={4}
          onBack={() => router.push("/onboarding/3")}
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
}
