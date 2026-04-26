"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, Check, Shield, CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const plans = {
  aktiv: {
    name: "Aktiv-Suche",
    price: "79€/Monat",
    description: "24/7-Bot auf 5 Plattformen",
    paymentLink:
      process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_AKTIV ||
      "https://buy.stripe.com/placeholder",
    features: [
      "24/7 Bot auf 5 Plattformen",
      "Personalisierte Bewerbungen",
      "Push + Email Benachrichtigungen",
      "Dashboard + Pipeline",
      "Monatlich kündbar",
    ],
  },
  premium: {
    name: "Aktiv-Suche + Erfolgs-Bonus",
    price: "79€/Monat + 299€ bei Mietvertrag",
    description: "Alles aus Aktiv-Suche + Erfolgs-Bonus",
    paymentLink:
      process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_PREMIUM ||
      "https://buy.stripe.com/placeholder",
    features: [
      "Alles aus Aktiv-Suche",
      "Priorität-Scanning",
      "KI-optimierte Bewerbungstexte",
      "Priority-Support",
      "299€ nur bei Mietvertrag-Erfolg",
    ],
  },
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planKey = (searchParams.get("plan") as keyof typeof plans) || "aktiv";
  const plan = plans[planKey] || plans.aktiv;

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6">
      {/* Back */}
      <Link
        href="/#preise"
        className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Zurück zu den Preisen
      </Link>

      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs text-indigo-300 mb-4">
            <div className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
            Sicherer Checkout via Stripe
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{plan.name}</h1>
          <p className="text-slate-400">{plan.description}</p>
        </div>

        {/* Price Summary */}
        <div className="rounded-xl border border-slate-800 bg-slate-800/50 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-300 font-medium">{plan.name}</span>
            <span className="text-white font-bold">{plan.price}</span>
          </div>
          <div className="border-t border-slate-700 pt-4">
            <ul className="space-y-2">
              {plan.features.map((f, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-slate-400">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <a href={plan.paymentLink} className="block mb-6">
          <Button
            size="xl"
            className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 text-white"
          >
            <CreditCard className="h-5 w-5" />
            Jetzt mit Stripe bezahlen
          </Button>
        </a>

        {/* Trust */}
        <div className="flex flex-wrap gap-4 justify-center">
          {[
            { icon: Lock, text: "SSL-verschlüsselt" },
            { icon: Shield, text: "Stripe-gesichert" },
            { icon: Check, text: "Monatlich kündbar" },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-center gap-1.5 text-xs text-slate-500">
                <Icon className="h-3.5 w-3.5" />
                {item.text}
              </div>
            );
          })}
        </div>
      </div>

      {/* Legal Note */}
      <p className="mt-6 text-center text-xs text-slate-600">
        Mit dem Kauf akzeptierst du unsere{" "}
        <Link href="/agb" className="text-slate-500 hover:text-slate-400 underline">
          AGB
        </Link>{" "}
        und{" "}
        <Link href="/datenschutz" className="text-slate-500 hover:text-slate-400 underline">
          Datenschutzerklärung
        </Link>
        . Du erteilst Lyrvio eine Vollmacht, in deinem Namen Wohnungsbewerbungen zu versenden.
      </p>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f]">
      <Nav />
      <main className="flex-1 pt-24 pb-16">
        <Suspense
          fallback={
            <div className="mx-auto max-w-2xl px-4 py-16 text-center text-slate-500">
              Lade...
            </div>
          }
        >
          <CheckoutContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
