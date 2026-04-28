"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Eye, EyeOff } from "lucide-react";
import { step1Schema, type Step1Data } from "@/app/onboarding/schemas";
import { StepProgress } from "@/components/onboarding/StepProgress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.lyrvio.workers.dev";
const LS_KEY = "lyrvio_onboarding";

export default function Step1Page() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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
          return { email: saved.step1?.email ?? "", password: "" };
        } catch {
          return { email: "", password: "" };
        }
      }
      return { email: "", password: "" };
    })(),
  });

  const email = watch("email");

  const onSubmit = async (data: Step1Data) => {
    setServerError(null);
    try {
      const res = await fetch(`${API_URL}/auth/sign-up/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          callbackURL: `${window.location.origin}/onboarding/2`,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err.message ?? err.error ?? "Fehler beim Registrieren";
        if (msg.toLowerCase().includes("exist") || msg.toLowerCase().includes("already")) {
          throw new Error("Diese E-Mail ist bereits registriert. Bitte einloggen.");
        }
        throw new Error(msg);
      }

      // Save email to localStorage for later steps
      try {
        const saved = JSON.parse(localStorage.getItem(LS_KEY) ?? "{}");
        localStorage.setItem(LS_KEY, JSON.stringify({ ...saved, step1: { email: data.email } }));
      } catch {}

      setSubmittedEmail(data.email);
      setSubmitted(true);
    } catch (e) {
      setServerError(
        e instanceof Error ? e.message : "Fehler beim Registrieren. Bitte erneut versuchen."
      );
    }
  };

  return (
    <div className="space-y-8">
      <StepProgress currentStep={1} />

      <div className="space-y-1">
        <p className="label">Schritt 1</p>
        <h1 className="font-display text-[32px] tracking-[-0.025em] text-ink">
          Konto erstellen
        </h1>
        <p className="font-mono text-[13px] text-ash">
          E-Mail und Passwort — alles läuft auf unserer Seite.
        </p>
      </div>

      {!submitted ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-label="Konto erstellen"
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="font-mono text-[13px] font-medium text-ink-2"
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
                  className="font-mono text-[12px] text-stamp mt-0.5"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="font-mono text-[13px] font-medium text-ink-2"
              >
                Passwort
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Mindestens 8 Zeichen"
                  autoComplete="new-password"
                  aria-required="true"
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "password-error" : undefined}
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ash hover:text-ink"
                  aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p
                  id="password-error"
                  role="alert"
                  className="font-mono text-[12px] text-stamp mt-0.5"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            {serverError && (
              <p role="alert" className="font-mono text-[12px] text-stamp border-2 border-stamp/40 bg-stamp/5 px-3 py-2">
                {serverError}{" "}
                {serverError.includes("einloggen") && (
                  <Link href="/login" className="underline">
                    Zum Login →
                  </Link>
                )}
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
                  Konto wird erstellt…
                </>
              ) : (
                "Konto erstellen"
              )}
            </Button>

            <p className="font-mono text-[11px] text-ash text-center">
              Bereits ein Konto?{" "}
              <Link href="/login" className="text-ink underline">
                Einloggen
              </Link>
            </p>

            <p className="font-mono text-[11px] text-ash text-center">
              Mit der Registrierung stimmst du unseren{" "}
              <a href="/legal/agb" className="text-stamp hover:underline">
                AGB
              </a>{" "}
              und der{" "}
              <a href="/legal/datenschutz" className="text-stamp hover:underline">
                Datenschutzerklärung
              </a>{" "}
              zu.
            </p>
          </div>
        </form>
      ) : (
        <div
          className="border-2 border-sage bg-paper-warm p-6 text-center space-y-3"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 className="w-10 h-10 text-sage mx-auto" aria-hidden="true" />
          <h2 className="font-display text-[20px] text-ink">
            Konto erstellt!
          </h2>
          <p className="font-mono text-[13px] text-ash">
            Wir haben eine Bestätigungs-E-Mail an{" "}
            <span className="text-ink font-semibold">{submittedEmail}</span> gesendet.
          </p>
          <p className="font-mono text-[12px] text-ash">
            Klick auf den Link in der E-Mail — danach bist du automatisch eingeloggt.
          </p>
          <p className="font-mono text-[11px] text-dust">
            E-Mail nicht angekommen? Spam-Ordner prüfen.
          </p>
        </div>
      )}
    </div>
  );
}
