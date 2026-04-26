import Link from "next/link";
import { Check, Zap, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const tiers = [
  {
    name: "Aktiv-Suche",
    price: "79",
    period: "pro Monat",
    description:
      "Der Bot läuft 24/7 für dich. Scannt 5 Plattformen, bewirbt sich auf passende Wohnungen, alarmiert bei Antworten.",
    highlight: false,
    badge: null,
    icon: Zap,
    paymentLink:
      process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_AKTIV || "/checkout?plan=aktiv",
    cta: "Jetzt aktivieren",
    features: [
      "24/7 Bot auf 5 Plattformen",
      "Personalisierte Bewerbungen mit deinem Profil",
      "Push + Email-Benachrichtigung bei Antwort",
      "Dashboard mit Bewerbungs-Pipeline",
      "Chrome + Firefox Extension",
      "Bis zu 50 Bewerbungen/Tag",
      "Suchalgorithmus nach deinen Kriterien",
      "Monatlich kündbar",
    ],
  },
  {
    name: "Aktiv-Suche + Erfolgs-Bonus",
    price: "79",
    period: "pro Monat",
    oneTime: "+ 299€ bei Erfolg",
    description:
      "Wie Aktiv-Suche — aber du zahlst nur dann 299€ extra, wenn Lyrvio dir tatsächlich zu einer Wohnung verhilft.",
    highlight: true,
    badge: "Beliebteste Wahl",
    icon: Trophy,
    paymentLink:
      process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_PREMIUM || "/checkout?plan=premium",
    cta: "Premium starten",
    features: [
      "Alles aus Aktiv-Suche",
      "Priorität-Scanning (schnellste Reaktion)",
      "KI-optimierte Bewerbungstexte",
      "Vermieter-Analyse & Profil-Matching",
      "Persönliche Onboarding-Session",
      "Priority-Support (Antwort in 2h)",
      "299€ Erfolgs-Bonus nur bei Mietvertrag",
      "Volle Transparenz — Nachweis-Protokoll",
    ],
  },
];

export function Pricing() {
  return (
    <section id="preise" className="py-24 bg-slate-950/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-1.5 text-sm text-slate-400 mb-4">
            <span>Transparent & fair</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Ein Preis.{" "}
            <span className="gradient-text">Kein Bullshit.</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            79€/Monat für den Bot. Beim Erfolgsmodell zahlst du 299€ extra —
            aber nur wenn du wirklich eine Wohnung findest.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {tiers.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <div
                key={i}
                className={`relative flex flex-col rounded-2xl border p-8 ${
                  tier.highlight
                    ? "border-indigo-500/50 bg-slate-900 card-glow"
                    : "border-slate-800 bg-slate-900/50"
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-indigo-600 text-white border-0 px-3 py-1 text-xs font-semibold">
                      {tier.badge}
                    </Badge>
                  </div>
                )}

                {/* Icon + Name */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                      tier.highlight
                        ? "bg-indigo-600"
                        : "bg-slate-800"
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${
                        tier.highlight ? "text-white" : "text-indigo-400"
                      }`}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-white">{tier.name}</h3>
                </div>

                {/* Price */}
                <div className="mb-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-white">{tier.price}€</span>
                    <span className="text-slate-400 text-sm">/{tier.period}</span>
                  </div>
                  {tier.oneTime && (
                    <div className="mt-1 text-sm text-emerald-400 font-medium">
                      {tier.oneTime}
                    </div>
                  )}
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  {tier.description}
                </p>

                {/* CTA */}
                <Link href={tier.paymentLink} className="mb-8">
                  <Button
                    size="lg"
                    className={`w-full ${
                      tier.highlight
                        ? "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/30"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </Link>

                {/* Features */}
                <ul className="space-y-3">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm">
                      <Check
                        className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                          tier.highlight ? "text-indigo-400" : "text-slate-500"
                        }`}
                      />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Guarantee */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 text-sm">
            Monatlich kündbar · Keine versteckten Kosten · DSGVO-konform ·
            Zahlung via Stripe
          </p>
        </div>
      </div>
    </section>
  );
}
