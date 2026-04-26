import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TopTicker } from "@/components/TopTicker";
import Link from "next/link";

export const metadata = {
  title: "Preis · Was Lyrvio kostet",
  description:
    "9 € pro Monat für vollautomatisches Bewerben. Premium 19 €. Erfolgsprämie 49 € einmal — nur bei Mietvertrag.",
};

export default function GebuehrenPage() {
  return (
    <>
      <TopTicker />
      <Nav />
      <main>
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 pb-16 lg:pt-24 lg:pb-20">
            <div className="flex items-center gap-4 mb-10 flex-wrap">
              <span className="stamp-rotated">Preis 2026</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                Stand 26.04.2026 · DACH-Großstädte
              </span>
            </div>
            <h1 className="manifest mb-10">
              Ab <em>9 €</em> im Monat.
              <br />
              <span className="stamped">Sonst nichts.</span>
            </h1>
            <p className="font-mono text-[15px] leading-[1.7] text-ink max-w-[60ch]">
              Lyrvio Standard kostet 9 € pro Monat — vollautomatisches
              Bewerben in deinem Browser, monatlich kündbar. Wer mehr Tempo
              will: Premium für 19 €. Wer nur bei Erfolg zahlen will:
              49 € Erfolgsprämie zusätzlich, nur bei unterschriebenem
              Mietvertrag. Keine Setup-Kosten, keine Mindestlaufzeit, keine
              versteckte Posten.
            </p>
          </div>
        </section>

        {/* TIER-VERGLEICH */}
        <section className="border-b border-rule-soft">
          <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-20 lg:py-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* STANDARD */}
              <article className="border-2 border-ink bg-paper-warm p-8 relative">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ash font-bold">
                    Standard · meistens richtig
                  </span>
                </div>
                <h2 className="font-display text-[44px] leading-none tracking-[-0.03em] text-ink mb-2">
                  9 €
                </h2>
                <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-ash mb-6">
                  pro Monat · monatlich kündbar
                </p>
                <ul className="space-y-2.5 font-mono text-[13px] text-ink mb-8">
                  <li className="flex gap-3"><span className="text-stamp font-bold">✓</span> 24/7 Suche auf 5 Plattformen</li>
                  <li className="flex gap-3"><span className="text-stamp font-bold">✓</span> Persönliche Anschreiben automatisch</li>
                  <li className="flex gap-3"><span className="text-stamp font-bold">✓</span> Push + E-Mail bei Antwort</li>
                  <li className="flex gap-3"><span className="text-stamp font-bold">✓</span> Übersicht aller Bewerbungen</li>
                  <li className="flex gap-3"><span className="text-stamp font-bold">✓</span> 30 Sekunden Polling-Frequenz</li>
                </ul>
                <Link href="/checkout?plan=aktiv" className="btn-primary cursor-stamp w-full justify-center">
                  Standard wählen · 9 €
                </Link>
              </article>

              {/* PREMIUM */}
              <article className="border-2 border-ink bg-ink text-paper p-8 relative">
                <div className="absolute -top-3 right-6">
                  <span className="bg-hi text-ink font-mono text-[10px] font-bold px-2 py-1 uppercase tracking-[0.18em]">
                    schneller
                  </span>
                </div>
                <div className="flex items-baseline justify-between mb-4">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-paper-2 font-bold">
                    Premium · für Eilige
                  </span>
                </div>
                <h2 className="font-display text-[44px] leading-none tracking-[-0.03em] text-paper mb-2">
                  19 €
                </h2>
                <p className="font-mono text-[12px] uppercase tracking-[0.16em] text-paper-2 mb-6">
                  pro Monat · monatlich kündbar
                </p>
                <ul className="space-y-2.5 font-mono text-[13px] text-paper mb-8">
                  <li className="flex gap-3"><span className="text-hi font-bold">✓</span> Alles aus Standard</li>
                  <li className="flex gap-3"><span className="text-hi font-bold">✓</span> 12 Sekunden Polling (statt 30 s)</li>
                  <li className="flex gap-3"><span className="text-hi font-bold">✓</span> Vermieter-Profil-Matching</li>
                  <li className="flex gap-3"><span className="text-hi font-bold">✓</span> Persönliches Onboarding</li>
                  <li className="flex gap-3"><span className="text-hi font-bold">✓</span> Priority-Support · Antwort &lt; 2 h</li>
                </ul>
                <Link href="/checkout?plan=premium" className="block w-full text-center bg-paper text-ink border-2 border-paper px-5 py-3 font-mono font-semibold text-[13px] uppercase tracking-[0.06em] hover:bg-stamp hover:text-paper hover:border-stamp transition-all">
                  Premium wählen · 19 €
                </Link>
              </article>
            </div>

            {/* OPTION: Erfolgsprämie */}
            <div className="mt-10 border-2 border-ink bg-paper p-6 grid grid-cols-12 gap-4 items-center">
              <div className="col-span-12 md:col-span-9">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ash mb-2">
                  Optional · zahle nur bei Erfolg
                </div>
                <p className="font-display text-[22px] sm:text-[26px] tracking-[-0.02em] text-ink leading-[1.25]">
                  + <span className="text-stamp">49 €</span> Erfolgsprämie nur
                  wenn du eine Wohnung kriegst.
                </p>
                <p className="font-mono text-[12px] text-ash mt-2 max-w-[58ch]">
                  Du buchst Standard oder Premium. Wenn am Ende ein
                  Mietvertrag unterschrieben ist, fällt zusätzlich 49 €
                  einmalig an. Kein Vertrag → keine Prämie.
                </p>
              </div>
              <div className="col-span-12 md:col-span-3 md:text-right">
                <a
                  href={process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK_ERFOLG || "https://buy.stripe.com/eVqcMY2RyaQn3pp92Aes007"}
                  className="btn-secondary inline-block"
                >
                  Mehr →
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* DETAILS */}
        <section>
          <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-16">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-4">
                <div className="label mb-3">Was ist nicht im Preis?</div>
                <p className="font-mono text-[13px] leading-[1.7] text-ink">
                  Maklergebühren des Vermieters (Lyrvio bewirbt sich nur bei
                  provisionsfreien Inseraten). Schufa-Auskunft, falls
                  verlangt. Reisekosten zu Besichtigungen.
                </p>
              </div>
              <div className="col-span-12 md:col-span-4">
                <div className="label mb-3">Was passiert bei Kündigung?</div>
                <p className="font-mono text-[13px] leading-[1.7] text-ink">
                  Lyrvio stoppt zum Monatsende. Dein Profil bleibt 30 Tage
                  gespeichert für eine mögliche Reaktivierung. Auf Wunsch
                  sofortige Löschung — nachweisbar per E-Mail-Bestätigung.
                </p>
              </div>
              <div className="col-span-12 md:col-span-4">
                <div className="label mb-3">Geld-zurück-Garantie</div>
                <p className="font-mono text-[13px] leading-[1.7] text-ink">
                  14 Tage. Kein Grund nötig. Schreib eine Mail an
                  hallo@lyrvio.com — du bekommst dein Geld innerhalb von 3
                  Werktagen zurück.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
