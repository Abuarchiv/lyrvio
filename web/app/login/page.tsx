"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/Nav";
import { TopTicker } from "@/components/TopTicker";
import { Footer } from "@/components/Footer";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.lyrvio.workers.dev";

const loginSchema = z.object({
  email: z.string().min(1, "E-Mail ist Pflicht").email("Bitte gültige E-Mail eingeben"),
  password: z.string().min(1, "Passwort ist Pflicht"),
});
type LoginData = z.infer<typeof loginSchema>;

const resetSchema = z.object({
  email: z.string().min(1, "E-Mail ist Pflicht").email("Bitte gültige E-Mail eingeben"),
});
type ResetData = z.infer<typeof resetSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<"login" | "reset">("login");
  const [resetSent, setResetSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const resetForm = useForm<ResetData>({
    resolver: zodResolver(resetSchema),
  });

  const onLogin = async (data: LoginData) => {
    setServerError(null);
    try {
      const res = await fetch(`${API_URL}/auth/sign-in/email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          callbackURL: "/dashboard",
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err.message ?? err.error ?? "Login fehlgeschlagen";
        if (msg.toLowerCase().includes("verify") || msg.toLowerCase().includes("bestaetigt")) {
          throw new Error("E-Mail noch nicht bestätigt. Bitte prüfe dein Postfach.");
        }
        throw new Error("E-Mail oder Passwort falsch.");
      }

      router.push("/dashboard");
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Login fehlgeschlagen.");
    }
  };

  const onReset = async (data: ResetData) => {
    setServerError(null);
    try {
      const res = await fetch(`${API_URL}/auth/forget-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          redirectTo: `${window.location.origin}/passwort-reset`,
        }),
      });
      if (!res.ok) throw new Error("Fehler beim Senden");
      setResetSent(true);
    } catch {
      setServerError("Fehler beim Senden. Bitte erneut versuchen.");
    }
  };

  return (
    <>
      <TopTicker />
      <Nav />
      <main className="bg-paper min-h-screen flex items-start justify-center px-6 py-16">
        <div className="w-full max-w-[480px]">
          <div className="space-y-1 mb-8">
            <p className="label">Lyrvio</p>
            <h1 className="font-display text-[36px] tracking-[-0.025em] text-ink">
              {mode === "login" ? "Einloggen" : "Passwort vergessen"}
            </h1>
          </div>

          {mode === "login" ? (
            <form onSubmit={handleSubmit(onLogin)} noValidate className="space-y-4">
              <div className="space-y-1.5">
                <label htmlFor="email" className="font-mono text-[13px] font-medium text-ink-2">
                  E-Mail-Adresse
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="deine@email.de"
                  autoComplete="email"
                  autoFocus
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                {errors.email && (
                  <p role="alert" className="font-mono text-[12px] text-stamp">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="password" className="font-mono text-[13px] font-medium text-ink-2">
                  Passwort
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Dein Passwort"
                    autoComplete="current-password"
                    aria-invalid={!!errors.password}
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
                  <p role="alert" className="font-mono text-[12px] text-stamp">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {serverError && (
                <p role="alert" className="font-mono text-[12px] text-stamp border-2 border-stamp/40 bg-stamp/5 px-3 py-2">
                  {serverError}
                </p>
              )}

              <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-base gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Einloggen…
                  </>
                ) : (
                  "Einloggen"
                )}
              </Button>

              <div className="flex justify-between font-mono text-[12px] text-ash pt-1">
                <button
                  type="button"
                  onClick={() => { setMode("reset"); setServerError(null); }}
                  className="hover:text-ink underline"
                >
                  Passwort vergessen?
                </button>
                <Link href="/onboarding/1" className="hover:text-ink underline">
                  Noch kein Konto?
                </Link>
              </div>
            </form>
          ) : (
            <>
              {resetSent ? (
                <div className="border-2 border-sage bg-paper-warm p-6 text-center space-y-3">
                  <p className="font-mono text-[14px] text-ink">E-Mail gesendet.</p>
                  <p className="font-mono text-[12px] text-ash">
                    Prüfe dein Postfach und klick auf den Reset-Link.
                  </p>
                  <button
                    type="button"
                    onClick={() => { setMode("login"); setResetSent(false); }}
                    className="font-mono text-[12px] text-stamp underline"
                  >
                    Zurück zum Login
                  </button>
                </div>
              ) : (
                <form onSubmit={resetForm.handleSubmit(onReset)} noValidate className="space-y-4">
                  <p className="font-mono text-[13px] text-ash">
                    Wir senden dir einen Reset-Link per E-Mail.
                  </p>
                  <div className="space-y-1.5">
                    <label htmlFor="reset-email" className="font-mono text-[13px] font-medium text-ink-2">
                      E-Mail-Adresse
                    </label>
                    <Input
                      id="reset-email"
                      type="email"
                      placeholder="deine@email.de"
                      autoFocus
                      {...resetForm.register("email")}
                    />
                    {resetForm.formState.errors.email && (
                      <p role="alert" className="font-mono text-[12px] text-stamp">
                        {resetForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  {serverError && (
                    <p role="alert" className="font-mono text-[12px] text-stamp border-2 border-stamp/40 bg-stamp/5 px-3 py-2">
                      {serverError}
                    </p>
                  )}

                  <Button
                    type="submit"
                    disabled={resetForm.formState.isSubmitting}
                    className="w-full h-12 text-base gap-2"
                  >
                    {resetForm.formState.isSubmitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Senden…</>
                    ) : (
                      "Reset-Link senden"
                    )}
                  </Button>

                  <button
                    type="button"
                    onClick={() => { setMode("login"); setServerError(null); }}
                    className="font-mono text-[12px] text-ash underline hover:text-ink"
                  >
                    Zurück zum Login
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
