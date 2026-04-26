import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TopTicker } from "@/components/TopTicker";

const chromeSteps = [
  {
    step: "01",
    title: "Extension herunterladen",
    description: "Klicke auf den Chrome-Extension-Link. Du wirst zum Chrome Web Store weitergeleitet.",
  },
  {
    step: "02",
    title: "Installation bestätigen",
    description: "Klicke auf \"Zu Chrome hinzufügen\" und bestätige die Berechtigungen im Dialog.",
  },
  {
    step: "03",
    title: "Anmelden",
    description: "Öffne die Extension über das Puzzle-Icon in der Chrome-Toolbar und logge dich mit deiner Lyrvio-E-Mail ein.",
  },
  {
    step: "04",
    title: "Aktivieren",
    description: "Gehe zu deinem Lyrvio-Dashboard und klicke auf \"Aktivieren\". Fertig — Lyrvio läuft jetzt im Hintergrund.",
  },
];

const permissions = [
  {
    permission: "Tabs lesen",
    reason: "Um aktive ImmoScout/Immowelt-Tabs zu erkennen",
  },
  {
    permission: "Seiteninhalte lesen",
    reason: "Um neue Inserate auf Wohnungsportalen zu erkennen",
  },
  {
    permission: "Lokaler Speicher",
    reason: "Dein Profil bleibt lokal auf deinem Gerät",
  },
  {
    permission: "Nachrichten senden",
    reason: "Um Bewerbungen über Plattform-Messaging zu versenden",
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
              <span className="stamp-rotated">Erweiterung</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                Setup in 2 Minuten
              </span>
            </div>
            <h1 className="manifest mb-6">
              Extension
              <br />
              <em>installieren.</em>
            </h1>
            <p className="font-mono text-[15px] leading-[1.7] text-ink max-w-[56ch]">
              Lyrvio läuft direkt in deinem Browser — keine Server, keine AGB-Verletzung. Wähle deinen Browser.
            </p>
          </div>
        </section>

        {/* Browser Selection */}
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16">
            <div className="label mb-8">Browser wählen</div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-[800px]">
              {/* Chrome */}
              <div className="border-2 border-ink bg-paper-warm p-8">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-display text-[28px] tracking-[-0.025em] text-ink">Chrome</h2>
                  <span className="tag -yellow">Beta · invite-only</span>
                </div>
                <p className="font-mono text-[12px] text-ash mb-6">Kompatibel: Chrome 88+, Edge, Brave, Opera</p>
                <a
                  href="/checkout?plan=aktiv"
                  className="btn-primary block text-center cursor-stamp"
                >
                  Jetzt loslegen → Extension per Mail
                </a>
                <p className="font-mono text-[11px] text-ash mt-3">
                  Während der Beta wird die Extension als signiertes .crx
                  per Email zugesandt. Chrome-Web-Store-Listung folgt nach
                  ersten 100 Usern.
                </p>
              </div>

              {/* Firefox */}
              <div className="border-2 border-ink bg-paper p-8">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-display text-[28px] tracking-[-0.025em] text-ink">Firefox</h2>
                  <span className="tag -outline">Beta</span>
                </div>
                <p className="font-mono text-[12px] text-ash mb-6">Firefox-Version in Entwicklung.</p>
                <button
                  disabled
                  className="btn-secondary w-full opacity-50 cursor-not-allowed"
                >
                  Firefox Add-on (demnächst)
                </button>
                <p className="font-mono text-[11px] text-ash mt-3">
                  <Link href="/#preise" className="link-underline">Auf Warteliste setzen.</Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Installation Steps Chrome */}
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16">
            <div className="label mb-10">Chrome-Schritt-für-Schritt</div>
            <ol className="space-y-8 max-w-[800px]">
              {chromeSteps.map((step, i) => (
                <li key={i} className="grid grid-cols-12 gap-6 pb-8 border-b border-rule-soft last:border-b-0 last:pb-0">
                  <div className="col-span-12 lg:col-span-2">
                    <div className="step-num">{step.step}</div>
                  </div>
                  <div className="col-span-12 lg:col-span-10">
                    <h3 className="font-display text-[22px] tracking-[-0.02em] text-ink mb-2">
                      {step.title}
                    </h3>
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
            <div className="label mb-10">Welche Berechtigungen braucht die Extension?</div>
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
            <p className="font-mono text-[11px] text-ash mt-6">
              Kein Zugriff auf: Passwörter, Zahlungsdaten, andere Browser-Tabs außer Wohnungsportale.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 flex flex-wrap items-center justify-between gap-6">
            <p className="font-display text-[28px] sm:text-[36px] tracking-[-0.02em] text-ink max-w-[28ch]">
              Extension installiert — jetzt zum Dashboard.
            </p>
            <Link href="/dashboard" className="btn-primary cursor-stamp">
              Zum Dashboard →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
