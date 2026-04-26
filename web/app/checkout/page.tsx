"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
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
    description: "Alles aus Standard plus Priority-Support und doppelte Polling-Frequenz.",
    paymentLink:
      process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_PREMIUM ||
      "https://buy.stripe.com/placeholder",
    features: [
      "Alles aus Standard",
      "12 Sekunden Polling (statt 30 s)",
      "Vermieter-Profil-Matching",
      "Persönliches Onboarding",
      "Priority-Support · Antwort < 2 h",
    ],
  },
  erfolg: {
    name: "Lyrvio Standard + Erfolgsprämie",
    price: "9,00 €",
    suffix: "pro Monat · 49 € einmal bei Mietvertrag",
    description: "Standard-Tarif. Du zahlst zusätzlich 49 € nur wenn ein Mietvertrag unterschrieben wird.",
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

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planKey = (searchParams.get("plan") as keyof typeof plans) || "aktiv";
  const plan = plans[planKey] || plans.aktiv;

  return (
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

        <div className="akte-foot">
          <div className="font-mono text-[12px] text-ink">
            <strong>Hiermit bestelle ich Lyrvio</strong>
            <br />
            <span className="text-ash">
              {plan.suffix}. Bezahlung via Stripe. Monatlich kündbar zum
              Monatsende.
            </span>
          </div>
          <a href={plan.paymentLink} className="btn-primary cursor-stamp whitespace-nowrap">
            Bestellung absenden →
          </a>
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
        . Du erteilst Lyrvio eine Vollmacht, in deinem Namen
        Wohnungsbewerbungen zu versenden — diese Vollmacht ist jederzeit
        widerruflich. Erfolgsprämie 299 € einmalig wird nur bei
        Mietvertrags-Unterschrift fällig.
      </p>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <>
      <TopTicker />
      <Nav />
      <main className="bg-paper min-h-screen">
        <Suspense
          fallback={
            <div className="mx-auto max-w-2xl px-6 py-20 text-center font-mono text-[12px] text-ash">
              Lade…
            </div>
          }
        >
          <CheckoutContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
