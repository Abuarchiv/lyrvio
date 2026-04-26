"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ShieldCheck, Lock, RotateCcw, FileText } from "lucide-react";
import { step2Schema, type Step2Data } from "@/app/onboarding/schemas";
import { StepProgress } from "@/components/onboarding/StepProgress";
import { StepNavigation } from "@/components/onboarding/StepNavigation";

const LS_KEY = "lyrvio_onboarding";

const TRUST_SIGNALS = [
  { icon: ShieldCheck, text: "DSGVO-konform — deine Daten gehören dir" },
  { icon: RotateCcw, text: "Widerruf jederzeit, 1 Klick im Dashboard" },
  { icon: Lock, text: "Keine Bewerbung ohne dein explizites Profil" },
  { icon: FileText, text: "Vollmacht gilt nur für Plattform-Nachrichten" },
];

export default function Step2Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: (() => {
      if (typeof window !== "undefined") {
        try {
          const saved = JSON.parse(localStorage.getItem(LS_KEY) ?? "{}");
          return saved.step2 ?? { vollmachtAccepted: false, dsgvoAccepted: false };
        } catch {
          return { vollmachtAccepted: false, dsgvoAccepted: false };
        }
      }
      return { vollmachtAccepted: false, dsgvoAccepted: false };
    })(),
  });

  const values = watch();

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) ?? "{}");
      localStorage.setItem(LS_KEY, JSON.stringify({ ...saved, step2: values }));
    } catch {}
  }, [values.vollmachtAccepted, values.dsgvoAccepted]);

  const onSubmit = async (data: Step2Data) => {
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) ?? "{}");
      localStorage.setItem(LS_KEY, JSON.stringify({ ...saved, step2: data }));
    } catch {}
    router.push("/onboarding/3");
  };

  return (
    <div className="space-y-8">
      <StepProgress currentStep={2} />

      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-50">Vollmacht bestätigen</h1>
        <p className="text-sm text-slate-400">
          Damit Lyrvio in deinem Namen Bewerbungen senden kann.
        </p>
      </div>

      {/* Trust signals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TRUST_SIGNALS.map(({ icon: Icon, text }) => (
          <div
            key={text}
            className="flex items-start gap-2.5 rounded-lg border border-slate-700/60 bg-slate-800/40 px-3 py-2.5"
          >
            <Icon className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" aria-hidden="true" />
            <span className="text-xs text-slate-300">{text}</span>
          </div>
        ))}
      </div>

      {/* Vollmacht text */}
      <div
        className="rounded-xl border border-slate-700 bg-slate-900/60 p-4 space-y-3"
        role="document"
        aria-label="Vollmachtstext"
      >
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-slate-400" aria-hidden="true" />
          <h2 className="text-sm font-semibold text-slate-200">
            Elektronische Vollmacht
          </h2>
        </div>
        <div className="text-xs text-slate-400 leading-relaxed space-y-2 max-h-40 overflow-y-auto pr-1">
          <p>
            Hiermit bevollmächtige ich die Lyrvio UG (haftungsbeschränkt), in
            meinem Namen automatisierte Bewerbungsnachrichten an Vermieter und
            Wohnungsanbieter über die Plattformen ImmoScout24, eBay
            Kleinanzeigen, Immowelt und Immonet zu senden.
          </p>
          <p>
            Die Nachrichten basieren ausschließlich auf den von mir hinterlegten
            Profildaten. Es werden keine Daten ohne mein Wissen weitergegeben.
            Jede Bewerbung erfolgt in meinem Namen und unter meiner
            Verantwortung.
          </p>
          <p>
            Diese Vollmacht kann jederzeit ohne Angabe von Gründen im Lyrvio
            Dashboard widerrufen werden. Bei Widerruf werden alle
            Bot-Aktivitäten sofort gestoppt.
          </p>
          <p>
            Die Verarbeitung personenbezogener Daten erfolgt gemäß DSGVO Art. 6
            Abs. 1 lit. b (Vertragserfüllung) sowie Art. 6 Abs. 1 lit. a
            (Einwilligung).
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-label="Vollmacht bestätigen"
      >
        <div className="space-y-4">
          {/* Vollmacht checkbox */}
          <div className="space-y-1">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="mt-0.5 w-4 h-4 rounded border-slate-600 bg-slate-800 text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 focus:ring-offset-slate-900 shrink-0"
                aria-required="true"
                aria-invalid={!!errors.vollmachtAccepted}
                aria-describedby={
                  errors.vollmachtAccepted ? "vollmacht-error" : undefined
                }
                {...register("vollmachtAccepted")}
              />
              <span className="text-sm text-slate-300 group-hover:text-slate-200">
                Ich erteile Lyrvio die oben beschriebene Vollmacht und bestätige,
                dass ich die Bedingungen verstanden habe.
              </span>
            </label>
            {errors.vollmachtAccepted && (
              <p
                id="vollmacht-error"
                role="alert"
                className="text-xs text-red-400 ml-7"
              >
                {errors.vollmachtAccepted.message}
              </p>
            )}
          </div>

          {/* DSGVO checkbox */}
          <div className="space-y-1">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                className="mt-0.5 w-4 h-4 rounded border-slate-600 bg-slate-800 text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 focus:ring-offset-slate-900 shrink-0"
                aria-required="true"
                aria-invalid={!!errors.dsgvoAccepted}
                aria-describedby={
                  errors.dsgvoAccepted ? "dsgvo-error" : undefined
                }
                {...register("dsgvoAccepted")}
              />
              <span className="text-sm text-slate-300 group-hover:text-slate-200">
                Ich akzeptiere die{" "}
                <a
                  href="/legal/datenschutz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:underline"
                >
                  Datenschutzerklärung
                </a>{" "}
                und{" "}
                <a
                  href="/legal/agb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:underline"
                >
                  AGB
                </a>
                .
              </span>
            </label>
            {errors.dsgvoAccepted && (
              <p
                id="dsgvo-error"
                role="alert"
                className="text-xs text-red-400 ml-7"
              >
                {errors.dsgvoAccepted.message}
              </p>
            )}
          </div>

          <StepNavigation
            currentStep={2}
            onBack={() => router.push("/onboarding/1")}
            isSubmitting={isSubmitting}
            nextLabel="Bestätigen & Weiter"
          />
        </div>
      </form>
    </div>
  );
}
