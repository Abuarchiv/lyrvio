"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Globe,
  Download,
  CheckCircle2,
  ExternalLink,
  Loader2,
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
  const [isInstalling, setIsInstalling] = useState(false);

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

  const storeUrl =
    browser === "firefox"
      ? "https://addons.mozilla.org/de/firefox/addon/lyrvio/"
      : "https://chromewebstore.google.com/detail/lyrvio/PLACEHOLDER_ID";

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

  const handleInstallClick = () => {
    setIsInstalling(true);
    window.open(storeUrl, "_blank", "noopener,noreferrer");
    // Give user time to install, then check automatically
    setTimeout(() => setIsInstalling(false), 5000);
  };

  return (
    <div className="space-y-8">
      <StepProgress currentStep={6} />

      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-50">
          Browser-Extension installieren
        </h1>
        <p className="text-sm text-slate-400">
          Letzter Schritt — die Extension ist der eigentliche Bot.
        </p>
      </div>

      {/* Browser detection banner */}
      <div className="flex items-center gap-2.5 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-3">
        <BrowserIcon className="w-5 h-5 text-slate-400 shrink-0" aria-hidden="true" />
        <p className="text-sm text-slate-300">
          {browser === "unknown"
            ? "Browser erkannt — Anleitung unten"
            : `${browser === "firefox" ? "Firefox" : browser === "edge" ? "Edge" : "Chrome"} erkannt — passende Anleitung unten`}
        </p>
      </div>

      {/* Install CTA */}
      {!extensionInstalled ? (
        <div className="rounded-xl border border-indigo-600/40 bg-indigo-950/30 p-5 space-y-4">
          <div className="flex items-start gap-3">
            <Puzzle className="w-6 h-6 text-indigo-400 shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold text-slate-200">
                Lyrvio Extension
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Kostenlos · ~200 KB · Keine Daten ohne dein Wissen
              </p>
            </div>
          </div>
          <Button
            type="button"
            size="lg"
            className="w-full gap-2"
            onClick={handleInstallClick}
            aria-label="Extension im Browser-Store installieren"
          >
            {isInstalling ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                Store wird geöffnet…
              </>
            ) : (
              <>
                <Download className="w-4 h-4" aria-hidden="true" />
                Extension installieren
                <ExternalLink className="w-3 h-3 opacity-60" aria-hidden="true" />
              </>
            )}
          </Button>
          <p className="text-xs text-slate-500 text-center">
            Nach der Installation wird hier automatisch ein Häkchen gesetzt.
          </p>
        </div>
      ) : (
        <div
          className="rounded-xl border border-emerald-700/50 bg-emerald-950/30 p-5 flex items-center gap-3"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-emerald-300">
              Extension erkannt!
            </p>
            <p className="text-xs text-slate-400">
              Lyrvio ist aktiv und bereit Bewerbungen zu senden.
            </p>
          </div>
        </div>
      )}

      {/* Step-by-step guide */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-300">
          Schritt-für-Schritt Anleitung
        </h2>
        <ol className="space-y-3">
          {steps.map((step) => (
            <li
              key={step.n}
              className="flex gap-3 rounded-lg border border-slate-700/60 bg-slate-800/30 px-3 py-3"
            >
              <span
                className="w-6 h-6 rounded-full bg-indigo-600/20 border border-indigo-600/40 text-indigo-400 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5"
                aria-hidden="true"
              >
                {step.n}
              </span>
              <div>
                <p className="text-sm font-medium text-slate-200">{step.title}</p>
                <p className="text-xs text-slate-400 mt-0.5">{step.desc}</p>
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
          <p role="alert" className="text-xs text-red-400 mb-2">
            {errors.extensionInstalled.message}
          </p>
        )}

        {!extensionInstalled && (
          <label className="flex items-start gap-3 mb-4 cursor-pointer">
            <input
              type="checkbox"
              className="mt-0.5 w-4 h-4 rounded border-slate-600 bg-slate-800 text-indigo-600 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 focus:ring-offset-slate-900 shrink-0"
              onChange={(e) =>
                setValue("extensionInstalled", e.target.checked)
              }
            />
            <span className="text-sm text-slate-400">
              Ich habe die Extension installiert und bin eingeloggt.
            </span>
          </label>
        )}

        <StepNavigation
          currentStep={6}
          onBack={() => router.push("/onboarding/5")}
          isSubmitting={isSubmitting}
          nextLabel="Bot aktivieren"
          nextDisabled={!extensionInstalled}
        />
      </form>
    </div>
  );
}
