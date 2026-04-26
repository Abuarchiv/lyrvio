import Link from "next/link";

const tiers = [
  {
    id: "aktiv",
    name: "Aktiv-Suche",
    price: "79",
    suffix: "/Mo",
    body:
      "Der Bot läuft 24/7 in deinem Browser. 5 Plattformen, ø 28 Sek. Reaktion, persönliche Anschreiben. Monatlich kündbar — keine Mindestlaufzeit.",
    inc: [
      "5 Plattformen parallel",
      "Anschreiben pro Inserat individuell",
      "Push + E-Mail bei Antwort",
      "Pipeline-Dashboard",
      "Chrome + Firefox",
    ],
    cta: "Aktivieren",
    href: "/checkout?plan=aktiv",
    accent: false,
  },
  {
    id: "erfolg",
    name: "Aktiv + Erfolgs-Bonus",
    price: "79",
    suffix: "/Mo",
    extra: "+ 299 € einmal — nur bei Mietvertrag",
    body:
      "Wie Aktiv. Plus: 299 € bezahlst du einmalig, wenn du eine Wohnung unterschrieben hast — bei der Lyrvio die Bewerbung versandt hat. Sonst nichts.",
    inc: [
      "Alles aus Aktiv-Suche",
      "Priorisiertes Scanning (kürzere Polling-Zyklen)",
      "Vermieter-Profil-Matching",
      "Persönliches Onboarding",
      "Priority-Support · Antwort < 2 h",
    ],
    cta: "Premium starten",
    href: "/checkout?plan=erfolg",
    accent: true,
  },
];

export function Pricing() {
  return (
    <section id="preise" className="border-y border-line bg-ink-2">
      <div className="mx-auto max-w-[1280px] px-6 py-24 lg:py-32">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-3">
            <div className="eyebrow">
              <span className="dot" />
              Preis
            </div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-display text-[40px] sm:text-[56px] lg:text-[64px] leading-[1] tracking-[-0.02em] text-bone">
              Ein Preis. Ehrlich.
              <br />
              <span className="text-bone-2">
                Oder nur, wenn es klappt.
              </span>
            </h2>
          </div>
        </div>

        {/* Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-line border border-line">
          {tiers.map((t) => (
            <div
              key={t.id}
              className={`bg-ink p-8 lg:p-10 flex flex-col ${
                t.accent ? "lime-shadow" : ""
              }`}
            >
              <div className="flex items-baseline justify-between mb-8">
                <h3 className="font-display text-[26px] tracking-[-0.015em] text-bone">
                  {t.name}
                </h3>
                {t.accent && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-lime">
                    Empfohlen
                  </span>
                )}
              </div>

              <div className="mb-2">
                <span className="font-display text-[64px] sm:text-[80px] leading-none tracking-[-0.025em] text-bone">
                  {t.price}&nbsp;€
                </span>
                <span className="font-mono text-[14px] tracking-[0.12em] text-ash ml-2">
                  {t.suffix}
                </span>
              </div>
              {t.extra && (
                <div className="font-mono text-[12px] uppercase tracking-[0.14em] text-amber mb-4">
                  {t.extra}
                </div>
              )}

              <p className="text-[15px] leading-[1.6] text-bone-2 mt-4 max-w-[44ch]">
                {t.body}
              </p>

              <ul className="mt-8 space-y-3 text-[14px] text-bone-2">
                {t.inc.map((line, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-[8px] inline-block w-3 h-px bg-lime flex-shrink-0" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 pt-8 border-t border-line">
                <Link
                  href={t.href}
                  className={t.accent ? "btn-lime w-full" : "btn-ghost w-full"}
                >
                  {t.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Foot-note */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dust">
              Kleingedrucktes
            </span>
          </div>
          <div className="lg:col-span-9 max-w-[60ch] text-[13px] leading-[1.6] text-ash">
            Monatlich kündbar. Keine Setup-Gebühr. Keine versteckten Kosten.
            Stripe-gesichert. Kein Erfolg → kein Bonus. Wir verkaufen kein
            Versprechen, wir verkaufen Geschwindigkeit.
          </div>
        </div>
      </div>
    </section>
  );
}
