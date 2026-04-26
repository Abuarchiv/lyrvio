import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import Link from "next/link";

export const metadata = {
  title: "Presse | Lyrvio",
  description:
    "Press Kit, Factsheet, Founder-Bio und Pressekontakt für Lyrvio — KI-Bot für automatische Wohnungsbewerbungen im DACH-Raum.",
};

const QUICK_FACTS = [
  { label: "Gegründet", value: "2026" },
  { label: "Standort", value: "Berlin (Remote-first)" },
  { label: "Kategorie", value: "PropTech / Consumer SaaS" },
  { label: "Zielmarkt", value: "DACH" },
  { label: "Gründer", value: "Abu" },
  { label: "Pricing", value: "79 €/Mo + 299 € Erfolgs-Bonus" },
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
    external: false,
  },
  {
    title: "Pressemitteilung Launch",
    description: "Offizielle Pressemitteilung zum Launch — AP-Style, mit Quotes.",
    href: "/presse/press-release-launch",
    external: false,
  },
  {
    title: "Founder-Bio",
    description: "50 / 150 / 400 Wörter — für Twitter-Bio, Konferenz-Slot, Pressemitteilung.",
    href: "/presse/founder-bio",
    external: false,
  },
  {
    title: "Logo-Pack (ZIP)",
    description: "SVG + PNG, alle Varianten, Dark/Light, mit Anleitung.",
    href: "/brand/lyrvio-logos.zip",
    external: false,
  },
];

function QuickFactsGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {QUICK_FACTS.map((fact) => (
        <div
          key={fact.label}
          className="rounded-xl border border-[#1e1e3a] bg-[#12122a] p-4"
        >
          <p className="text-xs font-medium text-[#64748b] uppercase tracking-wider mb-1">
            {fact.label}
          </p>
          <p className="text-sm font-semibold text-white">{fact.value}</p>
        </div>
      ))}
    </div>
  );
}

function LogoSection() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Logos</h2>
        <p className="text-sm text-[#64748b]">
          Alle Varianten im ZIP-Archiv. SVG + PNG, Dark + Light.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {LOGO_VARIANTS.map((variant) => (
          <div
            key={variant.name}
            className="rounded-xl border border-[#1e1e3a] bg-[#12122a] p-5 flex flex-col gap-3"
          >
            {/* Logo preview placeholder */}
            <div className="h-16 rounded-lg bg-[#0a0a1f] border border-[#1e1e3a] flex items-center justify-center">
              <span className="text-xs text-[#4F46E5] font-mono">{variant.file}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-white">{variant.name}</p>
              <p className="text-xs text-[#64748b] mt-0.5">{variant.description}</p>
              <p className="text-xs text-[#4F46E5] mt-1 font-mono">{variant.dimensions}px</p>
            </div>
          </div>
        ))}
      </div>
      <a
        href="/brand/lyrvio-logos.zip"
        className="inline-flex items-center gap-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold px-5 py-3 transition-colors"
        download
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        Logo-Pack herunterladen (ZIP)
      </a>
    </section>
  );
}

function FounderBioSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-white">Gründer</h2>
      <div className="rounded-xl border border-[#1e1e3a] bg-[#12122a] p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-[#4F46E5]/20 border border-[#4F46E5]/30 flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-bold text-[#4F46E5]">A</span>
          </div>
          <div>
            <p className="text-base font-semibold text-white">Abu</p>
            <p className="text-xs text-[#64748b]">Gründer & Operator, Lyrvio</p>
          </div>
        </div>

        {/* Short Bio */}
        <div className="space-y-1">
          <p className="text-xs font-medium text-[#64748b] uppercase tracking-wider">Kurz (50 Wörter)</p>
          <p className="text-sm text-[#e2e8f0] leading-relaxed">
            Abu gründete Lyrvio nach eigener Frustration mit der Berliner Wohnungssuche. Er baut das
            gesamte Unternehmen als Solo-Founder mit KI-Subagenten statt Team — Produkt, Code,
            Marketing, Betrieb. Der Ansatz: nicht skalieren mit Menschen, sondern mit Architektur.
          </p>
        </div>

        {/* Medium Bio */}
        <div className="space-y-1 pt-2 border-t border-[#1e1e3a]">
          <p className="text-xs font-medium text-[#64748b] uppercase tracking-wider">Mittel (150 Wörter)</p>
          <p className="text-sm text-[#e2e8f0] leading-relaxed">
            Abu ist Solo-Founder und Architekt von Lyrvio, dem ersten kommerziellen KI-Bot der sich
            automatisch auf Wohnungsinserate bewirbt. Er entwickelt das Produkt vollständig allein —
            Produktentwicklung, Engineering, Marketing und Betrieb — unterstützt durch eine selbst
            gebaute KI-Subagenten-Architektur. Die Idee entstand aus direkter Erfahrung: wer in Berlin
            eine Wohnung sucht, verliert nicht wegen mangelnder Qualität, sondern wegen Latenz. Abu
            betreibt Lyrvio bewusst ohne Funding, ohne Team, ohne Overhead.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/presse/founder-bio"
            className="text-xs text-[#4F46E5] hover:text-[#6366F1] transition-colors"
          >
            Vollständige Bio (400 Wörter) →
          </Link>
        </div>
      </div>
    </section>
  );
}

function PressReleasesSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-white">Pressemitteilungen</h2>
      <div className="rounded-xl border border-[#1e1e3a] bg-[#12122a] p-6">
        <div className="flex flex-col items-center text-center py-6 gap-3">
          <div className="w-10 h-10 rounded-full bg-[#1e1e3a] flex items-center justify-center">
            <svg className="w-5 h-5 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-sm text-[#64748b]">Noch keine archivierten Pressemitteilungen.</p>
          <Link
            href="/presse/press-release-launch"
            className="text-sm text-[#4F46E5] hover:text-[#6366F1] transition-colors font-medium"
          >
            Launch-Pressemitteilung lesen →
          </Link>
        </div>
      </div>
    </section>
  );
}

function StatsBox() {
  // Placeholder — wird live wenn Stripe + Turso-Integration steht
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-white">Live-Daten</h2>
      <div className="rounded-xl border border-[#1e1e3a] bg-[#12122a] p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "MRR", value: "—" },
            { label: "Aktive Nutzer", value: "—" },
            { label: "Bewerbungen gesendet", value: "—" },
            { label: "Wohnungen gefunden", value: "—" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-[#4F46E5] font-mono">{stat.value}</p>
              <p className="text-xs text-[#64748b] mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-[#64748b] text-center mt-4">
          Live-Daten werden nach Beta-Ende freigeschaltet.
        </p>
      </div>
    </section>
  );
}

function ResourcesSection() {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-white">Ressourcen</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PRESS_RESOURCES.map((resource) => (
          <Link
            key={resource.title}
            href={resource.href}
            className="rounded-xl border border-[#1e1e3a] bg-[#12122a] hover:border-[#4F46E5]/40 hover:bg-[#12122a]/80 p-5 flex flex-col gap-2 transition-colors group"
          >
            <p className="text-sm font-semibold text-white group-hover:text-[#6366F1] transition-colors">
              {resource.title}
            </p>
            <p className="text-xs text-[#64748b] leading-relaxed">{resource.description}</p>
            <span className="text-xs text-[#4F46E5] mt-auto">Herunterladen / Öffnen →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function PressContactSection() {
  return (
    <section className="rounded-xl border border-[#4F46E5]/30 bg-[#4F46E5]/5 p-6 space-y-3">
      <h2 className="text-lg font-bold text-white">Pressekontakt</h2>
      <p className="text-sm text-[#e2e8f0]">
        Für Interview-Anfragen, Demo-Zugang, Bildmaterial und weitere Informationen:
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href="mailto:press@lyrvio.com"
          className="inline-flex items-center gap-2 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-semibold px-5 py-3 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          press@lyrvio.com
        </a>
        <div className="flex items-center gap-2 text-sm text-[#64748b]">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Antwortzeit: unter 24 Stunden
        </div>
      </div>
    </section>
  );
}

export default function PressePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f]">
      <Nav />
      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-4xl mx-auto px-4 pt-16 pb-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#4F46E5]/30 bg-[#4F46E5]/10 px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
              <span className="text-xs font-medium text-[#6366F1]">Press Kit</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Lyrvio für die Presse
            </h1>
            <p className="text-lg text-[#94a3b8] max-w-2xl leading-relaxed">
              Logos, Factsheet, Founder-Bio, Pressemitteilungen und Kontakt. Alles was ihr braucht.
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 pb-20 space-y-12">
          {/* Quick Facts */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">Schnell-Fakten</h2>
            <QuickFactsGrid />
          </section>

          {/* Stats Box */}
          <StatsBox />

          {/* Resources */}
          <ResourcesSection />

          {/* Logos */}
          <LogoSection />

          {/* Founder */}
          <FounderBioSection />

          {/* Press Releases */}
          <PressReleasesSection />

          {/* Contact */}
          <PressContactSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
