"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step3Schema, type Step3Data } from "@/app/onboarding/schemas";
import { StepProgress } from "@/components/onboarding/StepProgress";
import { StepNavigation } from "@/components/onboarding/StepNavigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LS_KEY = "lyrvio_onboarding";

const BERUFE = [
  "Angestellte/r",
  "Beamte/r",
  "Selbstständige/r",
  "Freelancer/in",
  "Student/in",
  "Rentner/in",
  "Azubi/Praktikant/in",
  "Sonstiges",
];

function getSavedStep3(): Partial<Step3Data> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? "{}").step3 ?? {};
  } catch {
    return {};
  }
}

export default function Step3Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: getSavedStep3(),
  });

  const values = watch();

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) ?? "{}");
      localStorage.setItem(LS_KEY, JSON.stringify({ ...saved, step3: values }));
    } catch {}
  }, [values.vorname, values.nachname, values.telefon, values.geburtsdatum, values.beruf]);

  const onSubmit = async (data: Step3Data) => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) ?? "{}");
      localStorage.setItem(LS_KEY, JSON.stringify({ ...saved, step3: data }));
    } catch {}
    router.push("/onboarding/4");
  };

  return (
    <div className="space-y-8">
      <StepProgress currentStep={3} />

      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-50">Persönliche Daten</h1>
        <p className="text-sm text-slate-400">
          Diese Daten erscheinen in deinen Bewerbungen — genau wie du sie
          eingibst.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-label="Persönliche Daten eingeben"
      >
        <fieldset className="space-y-5">
          <legend className="sr-only">Persönliche Informationen</legend>

          {/* Name row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="vorname">Vorname</Label>
              <Input
                id="vorname"
                placeholder="Max"
                autoComplete="given-name"
                aria-required="true"
                aria-invalid={!!errors.vorname}
                aria-describedby={errors.vorname ? "vorname-error" : undefined}
                {...register("vorname")}
              />
              {errors.vorname && (
                <p id="vorname-error" role="alert" className="text-xs text-red-400">
                  {errors.vorname.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="nachname">Nachname</Label>
              <Input
                id="nachname"
                placeholder="Mustermann"
                autoComplete="family-name"
                aria-required="true"
                aria-invalid={!!errors.nachname}
                aria-describedby={errors.nachname ? "nachname-error" : undefined}
                {...register("nachname")}
              />
              {errors.nachname && (
                <p id="nachname-error" role="alert" className="text-xs text-red-400">
                  {errors.nachname.message}
                </p>
              )}
            </div>
          </div>

          {/* Telefon */}
          <div className="space-y-1.5">
            <Label htmlFor="telefon">Telefonnummer</Label>
            <Input
              id="telefon"
              type="tel"
              placeholder="+49 151 12345678"
              autoComplete="tel"
              aria-required="true"
              aria-invalid={!!errors.telefon}
              aria-describedby={errors.telefon ? "telefon-error" : "telefon-hint"}
              {...register("telefon")}
            />
            <p id="telefon-hint" className="text-xs text-slate-500">
              Vermieter nutzen diese Nummer für Besichtigungs-Termine.
            </p>
            {errors.telefon && (
              <p id="telefon-error" role="alert" className="text-xs text-red-400">
                {errors.telefon.message}
              </p>
            )}
          </div>

          {/* Geburtsdatum */}
          <div className="space-y-1.5">
            <Label htmlFor="geburtsdatum">Geburtsdatum</Label>
            <Input
              id="geburtsdatum"
              type="date"
              autoComplete="bday"
              aria-required="true"
              aria-invalid={!!errors.geburtsdatum}
              aria-describedby={errors.geburtsdatum ? "geb-error" : undefined}
              className="cursor-pointer"
              {...register("geburtsdatum")}
            />
            {errors.geburtsdatum && (
              <p id="geb-error" role="alert" className="text-xs text-red-400">
                {errors.geburtsdatum.message}
              </p>
            )}
          </div>

          {/* Beruf */}
          <div className="space-y-1.5">
            <Label htmlFor="beruf">Beruf / Tätigkeit</Label>
            <div className="relative">
              <select
                id="beruf"
                className="flex h-10 w-full appearance-none rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                aria-required="true"
                aria-invalid={!!errors.beruf}
                aria-describedby={errors.beruf ? "beruf-error" : undefined}
                {...register("beruf")}
              >
                <option value="">Beruf auswählen…</option>
                {BERUFE.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                ▾
              </span>
            </div>
            {errors.beruf && (
              <p id="beruf-error" role="alert" className="text-xs text-red-400">
                {errors.beruf.message}
              </p>
            )}
          </div>
        </fieldset>

        <StepNavigation
          currentStep={3}
          onBack={() => router.push("/onboarding/2")}
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
}
