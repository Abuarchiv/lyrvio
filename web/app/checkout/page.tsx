"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Nav } from "@/components/Nav";
import { TopTicker } from "@/components/TopTicker";
import { Footer } from "@/components/Footer";

const plans = {
  aktiv: {
    name: "Lyrvio Standard",
    price: "9,00 €",
    suffix: "pro Monat",
    description: "24/7-Suche auf 5 Plattformen, vollautomatisches Bewerben, monatlich kündbar.",
    paymentLink:
      process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_AKTIV ||
      "https://buy.stripe.com/placeholder",
    features: [
      "24/7 Suche auf 5 Plattformen",
      "Persönliche Anschreiben automatisch",
      "Push + E-Mail bei Antwort",
      "Übersicht aller Bewerbungen",
      "Monatlich kündbar",
    ],
  },
  premium: {
    name: "Lyrvio Premium",
    price: "19,00 €",
    suffix: "pro Monat",
    description: "Alles aus Standard plus vorrangiger Hilfe und doppeltem Aktualisierungs-Takt.",
    paymentLink:
      process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_PREMIUM ||
      "https://buy.stripe.com/placeholder",
    features: [
      "Alles aus Standard",
      "Suche alle 12 Sekunden (statt 30)",
      "Vermieter, die zu deinem Profil passen",
      "Persönliches Onboarding",
      "Vorrangige Hilfe · Antwort < 2 h",
    ],
  },
  erfolg: {
    name: "Lyrvio Standard + Erfolgsprämie",
    price: "9,00 €",
    suffix: "pro Monat · 49 € einmal bei Mietvertrag",
    description: "9 € im Monat wie beim Standard. Wenn du dank Lyrvio einen Mietvertrag bekommst: einmalig 49 € extra. Sonst nur die 9 €.",
    paymentLink:
      process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_AKTIV ||
      "https://buy.stripe.com/placeholder",
    features: [
      "Alles aus Standard",
      "+ 49 € einmalig nur bei Mietvertrag",
      "Wenn keine Wohnung: keine Prämie",
    ],
  },
};

export default function CheckoutPage() {
  const [planKey, setPlanKey] = useState<keyof typeof plans>("aktiv");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("plan");
    if (raw && raw in plans) {
      setPlanKey(raw as keyof typeof plans);
    }
  }, []);

  const plan = plans[planKey];

  return (
    <>
      <TopTicker />
      <Nav />
      <main className="bg-paper min-h-screen">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10 py-16 lg:py-20">
          {/* Akten-Header */}
          <div className="flex items-center gap-4 mb-10 flex-wrap">
            <span className="stamp-rotated">Bestellen</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
              Bestellung Nr. 2026-{planKey === "aktiv" ? "001" : "002"} · Stand laufend
            </span>
          </div>

          <h1 className="font-display text-[44px] sm:text-[64px] leading-[0.95] tracking-[-0.035em] text-ink mb-6">
            Lyrvio <em>starten.</em>
          </h1>

          <Link
            href="/gebuehren"
            className="inline-block link-underline font-mono text-[12px] uppercase tracking-[0.18em] mb-12"
          >
            ← Zurück zum Preis
          </Link>

          {/* Akten-Block */}
          <div className="akte">
            <div className="akte-head">
              <span>{plan.name}</span>
              <span className="hidden sm:inline">Stripe · SSL · DSGVO</span>
            </div>

            <div className="akte-row">
              <div className="para">1.</div>
              <div className="desc">
                <strong>{plan.name}</strong>
                <small>{plan.description}</small>
              </div>
              <div className="price">{plan.price}</div>
            </div>

            <div className="px-6 py-5 border-t border-rule-soft">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ash mb-3">
                2 · Leistungsumfang
              </div>
              <ul className="space-y-2 font-mono text-[13px] text-ink">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-stamp font-bold mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Was passiert nach der Bestellung — Onboarding-Box */}
            <div className="px-6 py-5 border-t border-rule-soft">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ash mb-4">
                3 · Was passiert nach der Bestellung?
              </div>
              <ol className="space-y-3 font-mono text-[13px] text-ink">
                <li className="flex items-start gap-3">
                  <span className="text-stamp font-bold mt-0.5 shrink-0">1.</span>
                  <span>Du wirst zu Stripe weitergeleitet <span className="text-ash">(sicher · SSL · DSGVO)</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-stamp font-bold mt-0.5 shrink-0">2.</span>
                  <span>Nach Zahlung: E-Mail mit deinem persönlichen Setup-Link</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-stamp font-bold mt-0.5 shrink-0">3.</span>
                  <div>
                    <span>Setup-Link führt dich durch:</span>
                    <ul className="mt-1.5 space-y-1 text-[12px] text-ash pl-1">
                      <li className="flex items-start gap-2"><span>•</span><span>Browser-Extension (ein kleines Gratis-Programm im Chrome- oder Firefox-Browser) installieren <span className="text-ink">(1 Klick)</span></span></li>
                      <li className="flex items-start gap-2"><span>•</span><span>Profil ausfüllen <span className="text-ink">(5 Min · Beruf, Einkommen, Schufa)</span></span></li>
                      <li className="flex items-start gap-2"><span>•</span><span>Suchkriterien festlegen <span className="text-ink">(Stadt, Bezirke, Budget)</span></span></li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-stamp font-bold mt-0.5 shrink-0">4.</span>
                  <span>Lyrvio läuft 24/7 — du wirst per E-Mail benachrichtigt bei Antwort</span>
                </li>
              </ol>
              <p className="mt-4 font-mono text-[12px] text-ash border-t border-rule-soft pt-3">
                Geht alles in 7 Minuten. Du brauchst nichts vorbereiten.{" "}
                <Link href="/onboarding/1" className="link-underline text-ink whitespace-nowrap">
                  Vorab anschauen: So sieht das Onboarding aus →
                </Link>
              </p>
            </div>

            <div className="akte-foot">
              <div className="font-mono text-[12px] text-ink">
                <strong>Hiermit bestelle ich Lyrvio</strong>
                <br />
                <span className="text-ash">
                  {plan.suffix}. Bezahlung via Stripe. Monatlich kündbar zum
                  Monatsende.
                </span>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <a href={plan.paymentLink} className="btn-primary cursor-stamp whitespace-nowrap">
                  → Weiter zu Stripe
                </a>
                <span className="font-mono text-[10.5px] text-ash">
                  Du wirst zur sicheren Zahlung bei Stripe weitergeleitet
                </span>
              </div>
            </div>
          </div>

          {/* Trust-Strip */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ash">
            {[
              { tag: "SSL", text: "verschlüsselt · End-to-End" },
              { tag: "DSGVO", text: "konform · DE-Hosting" },
              { tag: "STRIPE", text: "Marktführer · BaFin-reguliert" },
            ].map((it, i) => (
              <div key={i} className="flex items-baseline gap-2 border-l-2 border-stamp pl-3">
                <span className="text-ink font-bold">{it.tag}</span>
                <span>{it.text}</span>
              </div>
            ))}
          </div>

          {/* Legal */}
          <p className="mt-10 pt-6 border-t border-rule-soft font-mono text-[11.5px] leading-[1.6] text-ash max-w-[68ch]">
            Mit der Bestellung akzeptierst du unsere{" "}
            <Link href="/agb" className="link-underline text-ink">
              AGB
            </Link>{" "}
            und{" "}
            <Link href="/datenschutz" className="link-underline text-ink">
              Datenschutzerklärung
            </Link>
            . Du erteilst Lyrvio eine Vollmacht (wie bei einer Aushilfe — du erlaubst Lyrvio in deinem Namen Bewerbungen zu schreiben, jederzeit widerrufbar), in deinem Namen
            Wohnungsbewerbungen zu versenden. Erfolgsprämie 49 € einmalig wird nur bei
            Mietvertrags-Unterschrift fällig (optional).
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
