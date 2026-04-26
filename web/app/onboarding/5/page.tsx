"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step5Schema, type Step5Data } from "@/app/onboarding/schemas";
import { StepProgress } from "@/components/onboarding/StepProgress";
import { StepNavigation } from "@/components/onboarding/StepNavigation";
import { DistrictMap } from "@/components/onboarding/DistrictMap";
import { Label } from "@/components/ui/label";

const LS_KEY = "lyrvio_onboarding";

const CITIES = [
  { value: "berlin", label: "Berlin" },
  { value: "muenchen", label: "München" },
  { value: "hamburg", label: "Hamburg" },
  { value: "koeln", label: "Köln" },
  { value: "frankfurt", label: "Frankfurt" },
];

function getSaved(): Partial<Step5Data> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? "{}").step5 ?? {};
  } catch {
    return {};
  }
}

export default function Step5Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Step5Data>({
    resolver: zodResolver(step5Schema),
    defaultValues: {
      stadt: "berlin",
      bezirke: [],
      groesseMin: 40,
      groesseMax: 80,
      preisMax: 1200,
      zimmerMin: 1,
      kinderfrei: false,
      haustier: false,
      wgGeeignet: false,
      ...getSaved(),
    },
  });

  const values = watch();
  const city = watch("stadt");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) ?? "{}");
      localStorage.setItem(LS_KEY, JSON.stringify({ ...saved, step5: values }));
    } catch {}
  }, [
    values.stadt,
    values.bezirke,
    values.groesseMin,
    values.groesseMax,
    values.preisMax,
    values.zimmerMin,
    values.kinderfrei,
    values.haustier,
    values.wgGeeignet,
  ]);

  const onSubmit = async (data: Step5Data) => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) ?? "{}");
      localStorage.setItem(LS_KEY, JSON.stringify({ ...saved, step5: data }));
    } catch {}
    router.push("/onboarding/6");
  };

  return (
    <div className="space-y-8">
      <StepProgress currentStep={5} />

      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-50">Such-Kriterien</h1>
        <p className="text-sm text-slate-400">
          Der Bot bewirbt sich nur auf Wohnungen die exakt passen.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-label="Such-Kriterien festlegen"
      >
        <fieldset className="space-y-6">
          <legend className="sr-only">Wohnungssuch-Kriterien</legend>

          {/* Stadt */}
          <div className="space-y-1.5">
            <Label htmlFor="stadt">Stadt</Label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {CITIES.map((c) => (
                <label
                  key={c.value}
                  className={`flex items-center justify-center rounded-lg border px-3 py-2.5 cursor-pointer text-sm font-medium transition-all ${
                    city === c.value
                      ? "border-indigo-500 bg-indigo-500/20 text-indigo-300"
                      : "border-slate-700 bg-slate-800/40 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  <input
                    type="radio"
                    value={c.value}
                    className="sr-only"
                    {...register("stadt")}
                  />
                  {c.label}
                </label>
              ))}
            </div>
            {errors.stadt && (
              <p role="alert" className="text-xs text-red-400">
                {errors.stadt.message}
              </p>
            )}
          </div>

          {/* Bezirke — Visual Map */}
          <div className="space-y-1.5">
            <Label>Bezirke</Label>
            <Controller
              name="bezirke"
              control={control}
              render={({ field }) => (
                <DistrictMap
                  city={city}
                  selected={field.value ?? []}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.bezirke && (
              <p role="alert" className="text-xs text-red-400">
                {errors.bezirke.message}
              </p>
            )}
          </div>

          {/* Größe range */}
          <div className="space-y-2">
            <Label>
              Wohnungsgröße:{" "}
              <span className="text-slate-300 font-normal">
                {values.groesseMin}–{values.groesseMax} m²
              </span>
            </Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <span className="text-xs text-slate-500">Minimum</span>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="5"
                  className="w-full accent-indigo-500"
                  aria-label="Mindestgröße in Quadratmeter"
                  {...register("groesseMin", { valueAsNumber: true })}
                />
                <span className="text-xs text-slate-400">{values.groesseMin} m²</span>
              </div>
              <div className="space-y-1">
                <span className="text-xs text-slate-500">Maximum</span>
                <input
                  type="range"
                  min="10"
                  max="300"
                  step="5"
                  className="w-full accent-indigo-500"
                  aria-label="Maximalgröße in Quadratmeter"
                  {...register("groesseMax", { valueAsNumber: true })}
                />
                <span className="text-xs text-slate-400">{values.groesseMax} m²</span>
              </div>
            </div>
          </div>

          {/* Preis */}
          <div className="space-y-2">
            <Label>
              Max. Kaltmiete:{" "}
              <span className="text-slate-300 font-normal">
                {values.preisMax.toLocaleString("de-DE")} €
              </span>
            </Label>
            <input
              type="range"
              min="300"
              max="5000"
              step="50"
              className="w-full accent-indigo-500"
              aria-label="Maximale Kaltmiete in Euro"
              {...register("preisMax", { valueAsNumber: true })}
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>300 €</span>
              <span>5.000 €</span>
            </div>
          </div>

          {/* Zimmer */}
          <div className="space-y-2">
            <Label>Mindestanzahl Zimmer</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <label
                  key={n}
                  className={`flex items-center justify-center w-10 h-10 rounded-lg border cursor-pointer text-sm font-semibold transition-all ${
                    values.zimmerMin === n
                      ? "border-indigo-500 bg-indigo-500/20 text-indigo-300"
                      : "border-slate-700 bg-slate-800/40 text-slate-400 hover:border-slate-600"
                  }`}
                >
                  <input
                    type="radio"
                    value={n}
                    className="sr-only"
                    {...register("zimmerMin", { valueAsNumber: true })}
                  />
                  {n === 5 ? "5+" : n}
                </label>
              ))}
            </div>
          </div>

          {/* Präferenzen checkboxes */}
          <div className="space-y-2">
            <Label>Weitere Präferenzen</Label>
            <div className="space-y-2.5">
              {[
                {
                  name: "kinderfrei" as const,
                  label: "Kinderfreies Haus bevorzugt",
                  hint: "Ruhigere Nachbarschaft",
                },
                {
                  name: "haustier" as const,
                  label: "Haustier vorhanden",
                  hint: "Bot filtert haustierfreundliche Inserate",
                },
                {
                  name: "wgGeeignet" as const,
                  label: "WG-geeignet",
                  hint: "Mehrere Zimmer, separate Eingänge ok",
                },
              ].map(({ name, label, hint }) => (
                <label
                  key={name}
                  className="flex items-start gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    className="mt-0.5 w-4 h-4 rounded border-slate-600 bg-slate-800 text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 focus:ring-offset-slate-900 shrink-0"
                    {...register(name)}
                  />
                  <span>
                    <span className="text-sm text-slate-300 group-hover:text-slate-200 block">
                      {label}
                    </span>
                    <span className="text-xs text-slate-500">{hint}</span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        </fieldset>

        <StepNavigation
          currentStep={5}
          onBack={() => router.push("/onboarding/4")}
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
}
