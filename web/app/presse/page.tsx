import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TopTicker } from "@/components/TopTicker";
import Link from "next/link";

export const metadata = {
  title: "Presse-Material & Founder-Story · Lyrvio",
  description:
    "Press Kit, Factsheet, Founder-Bio und Pressekontakt für Lyrvio — KI-Software für automatische Wohnungsbewerbungen im DACH-Raum.",
};

const QUICK_FACTS = [
  { label: "Gegründet", value: "2026" },
  { label: "Standort", value: "Berlin (Remote-first)" },
  { label: "Kategorie", value: "PropTech / Consumer SaaS" },
  { label: "Zielmarkt", value: "DACH" },
  { label: "Gründer", value: "Abu" },
  { label: "Pricing", value: "9 €/Mo + 49 € Erfolgs-Bonus" },
];

const LOGO_VARIANTS = [
  {
    name: "Icon (A)",
    description: "App-Icon, Favicon, Social-Media-Profilbilder",
    file: "logo-a.svg",
    dimensions: "60 × 60",
  },
  {
    name: "Wortmarke (B)",
    description: "E-Mail-Footer, Dokumente, Pressematerial",
    file: "logo-b.svg",
    dimensions: "200 × 60",
  },
  {
    name: "Kombination (C)",
    description: "Website-Header, OG-Images, Marketing — empfohlen",
    file: "logo-c.svg",
    dimensions: "200 × 60",
  },
];

const PRESS_RESOURCES = [
  {
    title: "Factsheet",
    description: "Einseiter: Was ist Lyrvio, Markt, Pricing, Stack.",
    href: "/presse/factsheet",
  },
  {
    title: "Pressemitteilung Launch",
    description: "Offizielle Pressemitteilung zum Launch — AP-Style, mit Quotes.",
    href: "/presse/press-release-launch",
  },
  {
    title: "Founder-Bio",
    description: "50 / 150 / 400 Wörter — für Twitter-Bio, Konferenz-Slot, Pressemitteilung.",
    href: "/presse/founder-bio",
  },
  {
    title: "Logo-Pack (ZIP)",
    description: "SVG + PNG, alle Varianten, Dark/Light, mit Anleitung.",
    href: "/brand/lyrvio-logos.zip",
  },
];

export default function PressePage() {
  return (
    <>
      <TopTicker />
      <Nav />
      <main>
        {/* Hero */}
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 pb-16 lg:pt-24 lg:pb-20">
            <div className="flex items-center gap-4 mb-10 flex-wrap">
              <span className="stamp-rotated">§ PRESS</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                Press Kit · Lyrvio
              </span>
            </div>
            <h1 className="manifest mb-6">
              Lyrvio
              <br />
              für die <em>Presse.</em>
            </h1>
            <p className="font-mono text-[15px] leading-[1.7] text-ink max-w-[56ch]">
              Logos, Factsheet, Founder-Bio, Pressemitteilungen und Kontakt. Alles was ihr braucht.
            </p>
          </div>
        </section>

        {/* Quick Facts */}
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16">
            <div className="label mb-8">Schnell-Fakten</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px border border-ink bg-ink">
              {QUICK_FACTS.map((fact) => (
                <div key={fact.label} className="bg-paper p-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-ash mb-2">
                    {fact.label}
                  </p>
                  <p className="font-display text-[20px] tracking-[-0.02em] text-ink">{fact.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Stats */}
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16">
            <div className="label mb-8">Live-Daten</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px border border-ink bg-ink">
              {[
                { label: "MRR", value: "—" },
                { label: "Aktive Nutzer", value: "—" },
                { label: "Bewerbungen gesendet", value: "—" },
                { label: "Wohnungen gefunden", value: "—" },
              ].map((stat) => (
                <div key={stat.label} className="bg-paper p-6 text-center">
                  <p className="font-mono text-[32px] text-stamp font-bold">{stat.value}</p>
                  <p className="font-mono text-[11px] text-ash mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
            <p className="font-mono text-[11px] text-ash mt-4">
              Live-Daten werden nach Beta-Ende freigeschaltet.
            </p>
          </div>
        </section>

        {/* Resources */}
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16">
            <div className="label mb-8">Ressourcen</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PRESS_RESOURCES.map((resource) => (
                <Link
                  key={resource.title}
                  href={resource.href}
                  className="border-2 border-ink bg-paper-warm hover:bg-paper p-6 flex flex-col gap-2 transition-colors group"
                >
                  <p className="font-display text-[22px] tracking-[-0.02em] text-ink group-hover:text-stamp transition-colors">
                    {resource.title}
                  </p>
                  <p className="font-mono text-[13px] text-ash leading-[1.6]">{resource.description}</p>
                  <span className="font-mono text-[12px] text-ink mt-auto">Herunterladen / Öffnen →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Logos */}
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16">
            <div className="label mb-2">Logos</div>
            <p className="font-mono text-[13px] text-ash mb-8">
              Alle Varianten im ZIP-Archiv. SVG + PNG, Dark + Light.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {LOGO_VARIANTS.map((variant) => (
                <div key={variant.name} className="border-2 border-ink bg-paper-warm p-5 flex flex-col gap-3">
                  <div className="h-16 border border-rule-soft bg-paper flex items-center justify-center">
                    <span className="font-mono text-[12px] text-ash">{variant.file}</span>
                  </div>
                  <div>
                    <p className="font-display text-[18px] tracking-[-0.02em] text-ink">{variant.name}</p>
                    <p className="font-mono text-[12px] text-ash mt-0.5">{variant.description}</p>
                    <p className="font-mono text-[12px] text-stamp mt-1">{variant.dimensions}px</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="/brand/lyrvio-logos.zip"
              className="btn-primary inline-block"
              download
            >
              Logo-Pack herunterladen (ZIP)
            </a>
          </div>
        </section>

        {/* Founder */}
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16">
            <div className="label mb-8">Gründer</div>
            <div className="border-2 border-ink bg-paper-warm p-8 max-w-[800px]">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 border-2 border-ink flex items-center justify-center flex-shrink-0 bg-paper">
                  <span className="font-display text-[20px] text-stamp">A</span>
                </div>
                <div>
                  <p className="font-display text-[22px] tracking-[-0.02em] text-ink">Abu</p>
                  <p className="font-mono text-[12px] text-ash">Gründer &amp; Operator, Lyrvio</p>
                </div>
              </div>

              <div className="space-y-1 mb-6">
                <div className="label">Kurz (50 Wörter)</div>
                <p className="font-mono text-[14px] leading-[1.75] text-ink">
                  Abu gründete Lyrvio nach eigener Frustration mit der Berliner Wohnungssuche. Er baut das
                  gesamte Unternehmen als Solo-Founder mit KI-Subagenten statt Team — Produkt, Code,
                  Marketing, Betrieb. Der Ansatz: nicht skalieren mit Menschen, sondern mit Architektur.
                </p>
              </div>

              <div className="space-y-1 pt-6 border-t border-rule-soft">
                <div className="label">Mittel (150 Wörter)</div>
                <p className="font-mono text-[14px] leading-[1.75] text-ink">
                  Abu ist Solo-Founder und Architekt von Lyrvio, dem ersten kommerziellen KI-Tool das sich
                  automatisch auf Wohnungsinserate bewirbt. Er entwickelt das Produkt vollständig allein —
                  Produktentwicklung, Engineering, Marketing und Betrieb — unterstützt durch eine selbst
                  gebaute KI-Subagenten-Architektur. Die Idee entstand aus direkter Erfahrung: wer in Berlin
                  eine Wohnung sucht, verliert nicht wegen mangelnder Qualität, sondern wegen Latenz. Abu
                  betreibt Lyrvio bewusst ohne Funding, ohne Team, ohne Overhead.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/presse/founder-bio"
                  className="link-underline font-mono text-[13px]"
                >
                  Vollständige Bio (400 Wörter) →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Press Releases */}
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16">
            <div className="label mb-8">Pressemitteilungen</div>
            <div className="border-2 border-ink bg-paper-warm p-8 max-w-[600px]">
              <p className="font-mono text-[14px] text-ash mb-4">Noch keine archivierten Pressemitteilungen.</p>
              <Link
                href="/presse/press-release-launch"
                className="link-underline font-mono text-[14px]"
              >
                Launch-Pressemitteilung lesen →
              </Link>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section>
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16">
            <div className="label mb-6">Pressekontakt</div>
            <p className="font-mono text-[14px] text-ink mb-6 max-w-[48ch]">
              Für Interview-Anfragen, Demo-Zugang, Bildmaterial und weitere Informationen:
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <a
                href="mailto:press@lyrvio.com"
                className="btn-primary cursor-stamp"
              >
                press@lyrvio.com
              </a>
              <span className="font-mono text-[13px] text-ash">Antwortzeit: unter 24 Stunden</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
