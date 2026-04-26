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
  { value: "sehr_gut", label: "Sehr gut (97–100)", color: "text-emerald-400" },
  { value: "gut", label: "Gut (95–96)", color: "text-green-400" },
  { value: "befriedigend", label: "Befriedigend (90–94)", color: "text-yellow-400" },
  { value: "ausreichend", label: "Ausreichend (80–89)", color: "text-orange-400" },
  { value: "keine", label: "Kein Schufa-Score / Nicht bekannt", color: "text-slate-400" },
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
        <h1 className="text-2xl font-bold text-slate-50">
          Mietsicherheits-Daten
        </h1>
        <p className="text-sm text-slate-400">
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
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
                €
              </span>
            </div>
            <p id="gehalt-hint" className="text-xs text-slate-500 flex gap-1.5 items-start">
              <Info className="w-3 h-3 mt-0.5 shrink-0" aria-hidden="true" />
              Faustregel: Kaltmiete sollte max. 1/3 des Nettoeinkommens sein.
            </p>
            {errors.nettogehalt && (
              <p id="gehalt-error" role="alert" className="text-xs text-red-400">
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
                  className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-800/40 px-3 py-2.5 cursor-pointer hover:border-slate-600 hover:bg-slate-800 transition-colors"
                >
                  <input
                    type="radio"
                    value={opt.value}
                    className="w-4 h-4 text-indigo-600 border-slate-600 bg-slate-800 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 focus:ring-offset-slate-900"
                    aria-describedby={errors.schufa ? "schufa-error" : undefined}
                    {...register("schufa")}
                  />
                  <span className={`text-sm font-medium ${opt.color}`}>
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
            {errors.schufa && (
              <p id="schufa-error" role="alert" className="text-xs text-red-400">
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
                className="flex h-10 w-full appearance-none rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
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
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                ▾
              </span>
            </div>
            {errors.beschaeftigungsart && (
              <p id="beschaeft-error" role="alert" className="text-xs text-red-400">
                {errors.beschaeftigungsart.message}
              </p>
            )}
          </div>

          {/* Mietmappe upload */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Mietmappe hochladen</Label>
              <span className="text-xs text-slate-500 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded-full">
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
