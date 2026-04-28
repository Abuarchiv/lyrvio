"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

const resetSchema = z
  .object({
    password: z.string().min(8, "Mindestens 8 Zeichen").max(128),
    confirm: z.string().min(1, "Bitte Passwort bestätigen"),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwörter stimmen nicht überein",
    path: ["confirm"],
  });
type ResetData = z.infer<typeof resetSchema>;

function ResetForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  const [showPw, setShowPw] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetData>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data: ResetData) => {
    setServerError(null);
    if (!token) {
      setServerError("Ungültiger Reset-Link. Bitte neu anfordern.");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword: data.password, token }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message ?? "Reset fehlgeschlagen");
      }
      setDone(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (e) {
      setServerError(e instanceof Error ? e.message : "Fehler beim Reset.");
    }
  };

  if (!token) {
    return (
      <p className="font-mono text-[13px] text-stamp">
        Ungültiger Link.{" "}
        <Link href="/login" className="underline">
          Zurück zum Login
        </Link>
      </p>
    );
  }

  return done ? (
    <div className="border-2 border-sage bg-paper-warm p-6 text-center space-y-2">
      <p className="font-mono text-[14px] text-ink">Passwort geändert.</p>
      <p className="font-mono text-[12px] text-ash">Du wirst weitergeleitet…</p>
    </div>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="space-y-1.5">
        <label htmlFor="password" className="font-mono text-[13px] font-medium text-ink-2">
          Neues Passwort
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPw ? "text" : "password"}
            placeholder="Mindestens 8 Zeichen"
            autoComplete="new-password"
            autoFocus
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPw((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-ash hover:text-ink"
          >
            {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        {errors.password && (
          <p role="alert" className="font-mono text-[12px] text-stamp">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label htmlFor="confirm" className="font-mono text-[13px] font-medium text-ink-2">
          Passwort wiederholen
        </label>
        <Input
          id="confirm"
          type={showPw ? "text" : "password"}
          placeholder="Passwort wiederholen"
          autoComplete="new-password"
          {...register("confirm")}
        />
        {errors.confirm && (
          <p role="alert" className="font-mono text-[12px] text-stamp">{errors.confirm.message}</p>
        )}
      </div>

      {serverError && (
        <p role="alert" className="font-mono text-[12px] text-stamp border-2 border-stamp/40 bg-stamp/5 px-3 py-2">
          {serverError}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full h-12 text-base gap-2">
        {isSubmitting ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Speichern…</>
        ) : (
          "Passwort speichern"
        )}
      </Button>
    </form>
  );
}

export default function PasswortResetPage() {
  return (
    <>
      <TopTicker />
      <Nav />
      <main className="bg-paper min-h-screen flex items-start justify-center px-6 py-16">
        <div className="w-full max-w-[480px]">
          <div className="space-y-1 mb-8">
            <p className="label">Lyrvio</p>
            <h1 className="font-display text-[36px] tracking-[-0.025em] text-ink">
              Neues Passwort
            </h1>
          </div>
          <Suspense fallback={<p className="font-mono text-[13px] text-ash">Lädt…</p>}>
            <ResetForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
