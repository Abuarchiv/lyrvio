"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";
import { step1Schema, type Step1Data } from "@/app/onboarding/schemas";
import { StepProgress } from "@/components/onboarding/StepProgress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LS_KEY = "lyrvio_onboarding";

export default function Step1Page() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: (() => {
      if (typeof window !== "undefined") {
        try {
          const saved = JSON.parse(localStorage.getItem(LS_KEY) ?? "{}");
          return { email: saved.step1?.email ?? "" };
        } catch {
          return { email: "" };
        }
      }
      return { email: "" };
    })(),
  });

  const email = watch("email");

  // Auto-save to localStorage
  useEffect(() => {
    if (email) {
      try {
        const saved = JSON.parse(localStorage.getItem(LS_KEY) ?? "{}");
        localStorage.setItem(LS_KEY, JSON.stringify({ ...saved, step1: { email } }));
      } catch {}
    }
  }, [email]);

  // Countdown for "resend" link
  useEffect(() => {
    if (!submitted || countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [submitted, countdown]);

  const onSubmit = async (data: Step1Data) => {
    setServerError(null);
    try {
      const res = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email, callbackUrl: "/onboarding/2" }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Unbekannter Fehler");
      }
      setSubmitted(true);
      setCountdown(60);
    } catch (e) {
      setServerError(
        e instanceof Error ? e.message : "Fehler beim Senden. Bitte erneut versuchen."
      );
    }
  };

  const resend = async () => {
    if (countdown > 0) return;
    setSubmitted(false);
  };

  return (
    <div className="space-y-8">
      <StepProgress currentStep={1} />

      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-slate-50">
          Konto erstellen
        </h1>
        <p className="text-sm text-slate-400">
          Kein Passwort nötig — wir senden dir einen Magic-Link.
        </p>
      </div>

      {!submitted ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-label="E-Mail für Magic-Link eingeben"
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-300"
              >
                E-Mail-Adresse
              </label>
              <Input
                id="email"
                type="email"
                placeholder="deine@email.de"
                autoComplete="email"
                autoFocus
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                {...register("email")}
              />
              {errors.email && (
                <p
                  id="email-error"
                  role="alert"
                  className="text-xs text-red-400 mt-0.5"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            {serverError && (
              <p role="alert" className="text-xs text-red-400 bg-red-950/40 border border-red-800/40 rounded-lg px-3 py-2">
                {serverError}
              </p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 text-base gap-2"
              aria-live="polite"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  Sende Link…
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" aria-hidden="true" />
                  Magic-Link senden
                </>
              )}
            </Button>

            <p className="text-xs text-slate-500 text-center">
              Mit dem Login stimmst du unseren{" "}
              <a href="/legal/agb" className="text-indigo-400 hover:underline">
                AGB
              </a>{" "}
              und der{" "}
              <a href="/legal/datenschutz" className="text-indigo-400 hover:underline">
                Datenschutzerklärung
              </a>{" "}
              zu.
            </p>
          </div>
        </form>
      ) : (
        <div
          className="rounded-xl border border-emerald-700/50 bg-emerald-950/30 p-6 text-center space-y-3"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" aria-hidden="true" />
          <h2 className="font-semibold text-slate-100 text-lg">
            Link gesendet!
          </h2>
          <p className="text-sm text-slate-400">
            Wir haben einen Magic-Link an{" "}
            <span className="text-slate-200 font-medium">{email}</span> gesendet.
            <br />
            Klick auf den Link um fortzufahren.
          </p>
          <p className="text-xs text-slate-500">
            Link kommt in &lt;5 Sekunden. Spam-Ordner prüfen falls nötig.
          </p>
          {countdown > 0 ? (
            <p className="text-xs text-slate-600">
              Erneut senden in {countdown}s
            </p>
          ) : (
            <button
              type="button"
              onClick={resend}
              className="text-xs text-indigo-400 hover:underline"
            >
              Link erneut senden
            </button>
          )}
        </div>
      )}
    </div>
  );
}
