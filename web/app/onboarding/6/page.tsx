"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Globe,
  CheckCircle2,
  Puzzle,
} from "lucide-react";
import { step6Schema, type Step6Data } from "@/app/onboarding/schemas";
import { StepProgress } from "@/components/onboarding/StepProgress";
import { StepNavigation } from "@/components/onboarding/StepNavigation";
import { Button } from "@/components/ui/button";

const LS_KEY = "lyrvio_onboarding";

type Browser = "chrome" | "firefox" | "edge" | "unknown";

function detectBrowser(): Browser {
  if (typeof window === "undefined") return "unknown";
  const ua = navigator.userAgent;
  if (ua.includes("Edg/")) return "edge";
  if (ua.includes("Firefox/")) return "firefox";
  if (ua.includes("Chrome/")) return "chrome";
  return "unknown";
}

const CHROME_STEPS = [
  {
    n: 1,
    title: "Im Chrome Web Store öffnen",
    desc: 'Klicke auf "Extension installieren" — der Web Store öffnet sich.',
  },
  {
    n: 2,
    title: "\"Zu Chrome hinzufügen\" klicken",
    desc: "Bestätige den Dialog mit \"Erweiterung hinzufügen\".",
  },
  {
    n: 3,
    title: "Extension anpinnen",
    desc: "Klicke oben rechts auf das Puzzle-Symbol (⊕) und pinne Lyrvio ans Toolbar.",
  },
  {
    n: 4,
    title: "Einloggen",
    desc: "Klicke das Lyrvio-Symbol in der Toolbar und melde dich mit deiner E-Mail an.",
  },
];

const FIREFOX_STEPS = [
  {
    n: 1,
    title: "Firefox Add-on Seite öffnen",
    desc: 'Klicke auf "Extension installieren" — der Firefox Add-on Store öffnet sich.',
  },
  {
    n: 2,
    title: "\"Zu Firefox hinzufügen\" klicken",
    desc: "Erlaube die Berechtigungen wenn Firefox fragt.",
  },
  {
    n: 3,
    title: "Extension aktivieren",
    desc: "Klicke oben rechts auf das Puzzle-Stück und aktiviere Lyrvio.",
  },
  {
    n: 4,
    title: "Einloggen",
    desc: "Klicke das Lyrvio-Symbol und melde dich mit deiner E-Mail an.",
  },
];

export default function Step6Page() {
  const router = useRouter();
  const [browser, setBrowser] = useState<Browser>("unknown");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Step6Data>({
    resolver: zodResolver(step6Schema),
    defaultValues: { extensionInstalled: false },
  });

  const extensionInstalled = watch("extensionInstalled");

  useEffect(() => {
    setBrowser(detectBrowser());
  }, []);

  // Poll for extension presence
  useEffect(() => {
    if (extensionInstalled) return;
    const id = setInterval(() => {
      // Check for extension-injected global flag
      if ((window as any).__LYRVIO_EXTENSION__) {
        setValue("extensionInstalled", true);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [extensionInstalled, setValue]);

  const steps = browser === "firefox" ? FIREFOX_STEPS : CHROME_STEPS;

  const BrowserIcon = Globe;

  const onSubmit = async (data: Step6Data) => {
    // Final submit — merge all localStorage data and POST to API
    try {
      const saved = JSON.parse(localStorage.getItem(LS_KEY) ?? "{}");
      const res = await fetch("/api/onboarding/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saved),
      });
      if (!res.ok) throw new Error("Profil konnte nicht gespeichert werden");
      localStorage.removeItem(LS_KEY);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <StepProgress currentStep={6} />

      <div className="space-y-1">
        <p className="label">Schritt 6</p>
        <h1 className="font-display text-[32px] tracking-[-0.025em] text-ink">
          Browser-Extension installieren
        </h1>
        <p className="font-mono text-[13px] text-ash">
          Letzter Schritt — die Extension ist das Herzstück von Lyrvio.
        </p>
      </div>

      {/* Browser detection banner */}
      <div className="flex items-center gap-2.5 border-2 border-ink bg-paper-warm px-4 py-3">
        <BrowserIcon className="w-5 h-5 text-ash shrink-0" aria-hidden="true" />
        <p className="font-mono text-[13px] text-ink-2">
          {browser === "unknown"
            ? "Browser erkannt — Anleitung unten"
            : `${browser === "firefox" ? "Firefox" : browser === "edge" ? "Edge" : "Chrome"} erkannt — passende Anleitung unten`}
        </p>
      </div>

      {/* Install CTA */}
      {!extensionInstalled ? (
        <div className="border-2 border-ink bg-paper-warm p-5 space-y-4">
          <div className="flex items-start gap-3">
            <Puzzle className="w-6 h-6 text-stamp shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="font-mono text-[14px] font-semibold text-ink">
                Lyrvio Extension — Beta
              </p>
              <p className="font-mono text-[12px] text-ash mt-0.5">
                Kostenlos · ~200 KB · Keine Daten ohne dein Wissen
              </p>
            </div>
          </div>

          {/* Beta notice — replaces dead store link */}
          <div className="border-2 border-ink/40 bg-paper px-4 py-4 space-y-2">
            <p className="font-mono text-[13px] font-semibold text-ink">
              Beta-User erhalten die Extension per E-Mail.
            </p>
            <p className="font-mono text-[12px] text-ash leading-[1.65]">
              Die Extension befindet sich in der finalen Testphase (Release: Mai 2026).
              Du wirst benachrichtigt, sobald sie für dich freigeschaltet ist.
            </p>
          </div>

          <Button
            type="button"
            size="lg"
            className="w-full gap-2"
            onClick={() => router.push("/")}
            aria-label="Verstanden — zurück zur Startseite"
          >
            Verstanden
          </Button>
          <p className="font-mono text-[11px] text-ash text-center">
            Sobald die Beta startet, bekommst du eine E-Mail mit dem Installations-Link.
          </p>
        </div>
      ) : (
        <div
          className="border-2 border-sage bg-paper-warm p-5 flex items-center gap-3"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 className="w-6 h-6 text-sage shrink-0" aria-hidden="true" />
          <div>
            <p className="font-mono text-[14px] font-semibold text-sage">
              Extension erkannt!
            </p>
            <p className="font-mono text-[12px] text-ash">
              Lyrvio ist aktiv und bereit Bewerbungen zu senden.
            </p>
          </div>
        </div>
      )}

      {/* Step-by-step guide */}
      <div className="space-y-3">
        <h2 className="font-mono text-[13px] font-semibold text-ink-2">
          Schritt-für-Schritt Anleitung
        </h2>
        <ol className="space-y-3">
          {steps.map((step) => (
            <li
              key={step.n}
              className="flex gap-3 border-2 border-ink/30 bg-paper-warm px-3 py-3"
            >
              <span
                className="w-6 h-6 bg-stamp/10 border border-stamp/40 text-stamp font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5"
                aria-hidden="true"
              >
                {step.n}
              </span>
              <div>
                <p className="font-mono text-[13px] font-medium text-ink">{step.title}</p>
                <p className="font-mono text-[12px] text-ash mt-0.5">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        aria-label="Onboarding abschließen"
      >
        {/* Hidden checkbox, controlled programmatically */}
        <input
          type="checkbox"
          className="sr-only"
          aria-hidden="true"
          {...register("extensionInstalled")}
        />

        {errors.extensionInstalled && (
          <p role="alert" className="font-mono text-[12px] text-stamp mb-2">
            {errors.extensionInstalled.message}
          </p>
        )}

        {!extensionInstalled && (
          <label className="flex items-start gap-3 mb-4 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 border-2 border-ink bg-paper accent-stamp focus:ring-2 focus:ring-stamp focus:ring-offset-1 focus:ring-offset-paper shrink-0"
              onChange={(e) =>
                setValue("extensionInstalled", e.target.checked)
              }
            />
            <span className="font-mono text-[13px] text-ash">
              Ich habe die Extension installiert und bin eingeloggt.
            </span>
          </label>
        )}

        <StepNavigation
          currentStep={6}
          onBack={() => router.push("/onboarding/5")}
          isSubmitting={isSubmitting}
          nextLabel="Lyrvio aktivieren"
          nextDisabled={!extensionInstalled}
        />
      </form>
    </div>
  );
}
