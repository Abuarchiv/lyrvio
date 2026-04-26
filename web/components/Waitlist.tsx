"use client";

import { useState } from "react";
import { WAITLIST_COUNT, WAITLIST_TOTAL, WAITLIST_LAST_UPDATE } from "@/lib/waitlist";

export function Waitlist() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!email || !email.includes("@")) {
      e.preventDefault();
      setError("Bitte eine gültige E-Mail-Adresse eingeben.");
      return;
    }
    setError("");
    // Let the form submit normally to formsubmit.co
    // Browser will redirect to /wartelisten-erfolg
  }

  return (
    <section className="border-t-2 border-ink bg-paper-warm" id="warteliste">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 lg:py-20">
        {/* Label */}
        <div className="label mb-6">Warteliste</div>

        {/* Headline */}
        <h2 className="font-display text-[36px] sm:text-[52px] leading-[0.95] tracking-[-0.03em] text-ink mb-4">
          Beta-Warteliste —
          <br />
          <em>50 Plätze für Mai 2026.</em>
        </h2>

        {/* Subline */}
        <p className="font-mono text-[14px] sm:text-[15px] leading-[1.65] text-ink max-w-[56ch] mb-10">
          Sei unter den ersten die Lyrvio nutzen. Du zahlst erst wenn du beitrittst.
        </p>

        {/* Form */}
        <form
          action="https://formsubmit.co/hallo@lyrvio.com"
          method="POST"
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-[520px]"
        >
          {/* Formsubmit hidden fields */}
          <input type="hidden" name="_subject" value="Lyrvio Wartelisten-Anmeldung" />
          <input type="hidden" name="_captcha" value="false" />
          <input
            type="hidden"
            name="_next"
            value="https://lyrvio.vercel.app/wartelisten-erfolg"
          />
          <input type="hidden" name="_template" value="box" />

          {/* Email input */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="waitlist-email"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-ash"
            >
              E-Mail-Adresse
            </label>
            <input
              id="waitlist-email"
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="deine@email.de"
              className="
                w-full border-2 border-ink bg-paper
                font-mono text-[15px] text-ink
                px-4 py-3
                placeholder:text-ash
                focus:outline-none focus:border-stamp
                transition-colors
              "
            />
            {error && (
              <p className="font-mono text-[12px] text-stamp">{error}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary self-start cursor-stamp"
          >
            Auf Warteliste setzen →
          </button>
        </form>

        {/* Counter + progress + privacy */}
        <div className="mt-8 flex flex-col gap-4 max-w-[520px]">
          {/* Counter block */}
          <div className="border-l-2 border-ink pl-4">
            {WAITLIST_COUNT === 0 ? (
              <p className="font-mono text-[13px] text-ink font-bold">
                Sei der Erste —{" "}
                <span className="font-normal text-ash">
                  {WAITLIST_TOTAL} Beta-Plätze verfügbar · Mai 2026
                </span>
              </p>
            ) : (
              <p className="font-mono text-[13px] text-ink">
                <span className="font-bold">{WAITLIST_COUNT} von {WAITLIST_TOTAL}</span>{" "}
                <span className="text-ash">Beta-Plätzen vergeben · Stand {WAITLIST_LAST_UPDATE}</span>
              </p>
            )}
          </div>

          {/* Progress bar — nur wenn > 0 */}
          {WAITLIST_COUNT > 0 && (
            <div className="w-full h-[3px] bg-paper border border-ink/20">
              <div
                className="h-full bg-ink transition-all"
                style={{ width: `${Math.min((WAITLIST_COUNT / WAITLIST_TOTAL) * 100, 100)}%` }}
              />
            </div>
          )}

          {/* FOMO — nur wenn fast voll */}
          {WAITLIST_COUNT > 40 && (
            <p className="font-mono text-[12px] text-stamp font-bold tracking-[0.05em]">
              Nur noch wenige Plätze frei.
            </p>
          )}

          {/* Update cadence note */}
          <p className="font-mono text-[11px] text-ash leading-[1.6]">
            Wir aktualisieren die Zahl wöchentlich aus den eingegangenen E-Mails.
          </p>

          <p className="font-mono text-[11px] text-ash leading-[1.6]">
            Nur E-Mail. Keine Werbung. Du kannst jederzeit löschen.
          </p>
        </div>
      </div>
    </section>
  );
}
