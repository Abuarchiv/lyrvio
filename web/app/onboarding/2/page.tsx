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
        <p className="label">Schritt 2</p>
        <h1 className="font-display text-[32px] tracking-[-0.025em] text-ink">Vollmacht bestätigen</h1>
        <p className="font-mono text-[13px] text-ash">
          Damit Lyrvio in deinem Namen Bewerbungen senden kann.
        </p>
      </div>

      {/* Trust signals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TRUST_SIGNALS.map(({ icon: Icon, text }) => (
          <div
            key={text}
            className="flex items-start gap-2.5 border-2 border-ink bg-paper-warm px-3 py-2.5"
          >
            <Icon className="w-4 h-4 text-stamp mt-0.5 shrink-0" aria-hidden="true" />
            <span className="font-mono text-[12px] text-ink-2">{text}</span>
          </div>
        ))}
      </div>

      {/* Vollmacht text */}
      <div
        className="border-2 border-ink bg-paper-warm p-4 space-y-3"
        role="document"
        aria-label="Vollmachtstext"
      >
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-ash" aria-hidden="true" />
          <h2 className="font-mono text-[13px] font-semibold text-ink">
            Elektronische Vollmacht
          </h2>
        </div>
        <div className="font-mono text-[12px] text-ash leading-relaxed space-y-2 max-h-40 overflow-y-auto pr-1">
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
            Lyrvio-Aktivitäten sofort gestoppt.
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
                className="mt-0.5 w-4 h-4 border-2 border-ink bg-paper accent-stamp focus:ring-2 focus:ring-stamp focus:ring-offset-1 focus:ring-offset-paper shrink-0"
                aria-required="true"
                aria-invalid={!!errors.vollmachtAccepted}
                aria-describedby={
                  errors.vollmachtAccepted ? "vollmacht-error" : undefined
                }
                {...register("vollmachtAccepted")}
              />
              <span className="font-mono text-[13px] text-ink-2 group-hover:text-ink">
                Ich erteile Lyrvio die oben beschriebene Vollmacht und bestätige,
                dass ich die Bedingungen verstanden habe.
              </span>
            </label>
            {errors.vollmachtAccepted && (
              <p
                id="vollmacht-error"
                role="alert"
                className="font-mono text-[12px] text-stamp ml-7"
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
                className="mt-0.5 w-4 h-4 border-2 border-ink bg-paper accent-stamp focus:ring-2 focus:ring-stamp focus:ring-offset-1 focus:ring-offset-paper shrink-0"
                aria-required="true"
                aria-invalid={!!errors.dsgvoAccepted}
                aria-describedby={
                  errors.dsgvoAccepted ? "dsgvo-error" : undefined
                }
                {...register("dsgvoAccepted")}
              />
              <span className="font-mono text-[13px] text-ink-2 group-hover:text-ink">
                Ich akzeptiere die{" "}
                <a
                  href="/legal/datenschutz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stamp hover:underline"
                >
                  Datenschutzerklärung
                </a>{" "}
                und{" "}
                <a
                  href="/legal/agb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-stamp hover:underline"
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
                className="font-mono text-[12px] text-stamp ml-7"
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
