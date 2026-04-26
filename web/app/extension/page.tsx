import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TopTicker } from "@/components/TopTicker";

const setupSteps = [
  {
    step: "01",
    title: "Extension installieren",
    badge: "1 Klick",
    description: "Chrome Web Store · Chrome 110+ und Firefox 115+. Ein Klick — keine manuelle Installation, kein Sideloading.",
  },
  {
    step: "02",
    title: "Mit Lyrvio-Account verbinden",
    badge: "10 Sek",
    description: "Magic-Link aus deiner Bestell-E-Mail. Kein Passwort, keine App-Installation.",
  },
  {
    step: "03",
    title: "Profil ausfüllen",
    badge: "5 Min",
    description: "Beruf, Einkommen, Schufa-Score, Suchkriterien. Einmal ausfüllen — Lyrvio nutzt es für jede Bewerbung.",
  },
  {
    step: "04",
    title: "Lyrvio läuft 24/7",
    badge: "Automatisch",
    description: "Sobald passende Inserate online gehen → automatisches Anschreiben. Du bekommst eine Benachrichtigung wenn ein Vermieter antwortet.",
  },
];

const permissions = [
  {
    permission: "Inserate-Seiten lesen",
    reason: "ImmoScout24, Immowelt, Immonet, eBay-Kleinanzeigen, wg-gesucht — nur diese Seiten",
  },
  {
    permission: "Bewerbungen absenden",
    reason: "In deinem Namen über die jeweilige Plattform-Funktion — wie ein realer Klick",
  },
  {
    permission: "Lokaler Speicher",
    reason: "Dein Profil und deine Suchhistorie bleiben lokal auf deinem Gerät",
  },
  {
    permission: "Anschreiben-Generierung",
    reason: "Läuft über Lyrvio-Cloud (Llama 3.3) — danach nur Versand, keine Speicherung",
  },
];

export default function ExtensionPage() {
  return (
    <>
      <TopTicker />
      <Nav />
      <main>
        {/* Header */}
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 pb-16 lg:pt-24 lg:pb-20">
            <div className="flex items-center gap-4 mb-10 flex-wrap">
              <span className="stamp-rotated">Pre-Launch</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                Beta startet Mai 2026
              </span>
            </div>
            <h1 className="manifest mb-6">
              Die Lyrvio-
              <br />
              <em>Extension.</em>
            </h1>
            <p className="font-mono text-[15px] leading-[1.7] text-ink max-w-[56ch]">
              Lyrvio läuft direkt in deinem Browser — keine Server, keine AGB-Verletzung. Die Extension wird derzeit für die Beta-Phase finalisiert. Ab Mai 2026: 1-Klick-Install via Chrome Web Store.
            </p>
          </div>
        </section>

        {/* Pre-Launch Status */}
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16">
            <div className="label mb-8">Browser-Unterstützung</div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-[800px]">
              {/* Chrome */}
              <div className="border-2 border-ink bg-paper-warm p-8">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-display text-[28px] tracking-[-0.025em] text-ink">Chrome</h2>
                  <span className="tag -yellow">Mai 2026</span>
                </div>
                <p className="font-mono text-[12px] text-ash mb-4">Chrome 110+, Edge, Brave, Opera</p>
                <p className="font-mono text-[12px] text-ash">
                  Chrome Web Store · 1-Klick-Install. Finalisierung läuft.
                </p>
              </div>

              {/* Firefox */}
              <div className="border-2 border-ink bg-paper p-8">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-display text-[28px] tracking-[-0.025em] text-ink">Firefox</h2>
                  <span className="tag -outline">Geplant</span>
                </div>
                <p className="font-mono text-[12px] text-ash mb-4">Firefox 115+</p>
                <p className="font-mono text-[12px] text-ash">
                  Firefox Add-on in Entwicklung.{" "}
                  <Link href="/#preise" className="link-underline">Auf Warteliste setzen.</Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Setup Flow (Mai 2026) */}
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16">
            <div className="label mb-2">So wird der Setup ablaufen</div>
            <p className="font-mono text-[12px] text-ash mb-10">Ab Mai 2026 — sobald die Beta startet</p>
            <ol className="space-y-8 max-w-[800px]">
              {setupSteps.map((step, i) => (
                <li key={i} className="grid grid-cols-12 gap-6 pb-8 border-b border-rule-soft last:border-b-0 last:pb-0">
                  <div className="col-span-12 lg:col-span-2">
                    <div className="step-num">{step.step}</div>
                  </div>
                  <div className="col-span-12 lg:col-span-10">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="font-display text-[22px] tracking-[-0.02em] text-ink">
                        {step.title}
                      </h3>
                      <span className="tag -outline">{step.badge}</span>
                    </div>
                    <p className="font-mono text-[14px] leading-[1.75] text-ink">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Permissions */}
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16">
            <div className="label mb-4">Was die Extension darf</div>
            <p className="font-mono text-[12px] text-ash mb-10">Vollständige Liste — keine versteckten Berechtigungen</p>
            <div className="grid sm:grid-cols-2 gap-4 max-w-[800px]">
              {permissions.map((item, i) => (
                <div key={i} className="border-2 border-ink bg-paper-warm p-5">
                  <p className="font-display text-[18px] tracking-[-0.02em] text-ink mb-1">
                    ■ {item.permission}
                  </p>
                  <p className="font-mono text-[12px] text-ash leading-[1.6]">{item.reason}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 border-2 border-ink bg-paper p-5 max-w-[800px]">
              <p className="font-display text-[16px] tracking-[-0.01em] text-ink mb-2">Was die Extension NICHT darf</p>
              <ul className="font-mono text-[12px] text-ash leading-[1.8] space-y-1">
                <li>— Andere Tabs lesen (nur die genannten Wohnungsportale)</li>
                <li>— Passwörter oder Zahlungsdaten lesen</li>
                <li>— Daten an externe Server senden außer Lyrvio-Cloud für Anschreiben-Generierung</li>
                <li>— Aktionen außerhalb der genannten Plattformen ausführen</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="font-display text-[28px] sm:text-[36px] tracking-[-0.02em] text-ink max-w-[28ch] mb-2">
                Beta-Platz sichern — bevor sie voll sind.
              </p>
              <p className="font-mono text-[13px] text-ash">Pre-Launch · Beta startet Mai 2026 · 9€/Monat</p>
            </div>
            <Link href="/checkout/standard" className="btn-primary cursor-stamp">
              Beta-Platz sichern →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
