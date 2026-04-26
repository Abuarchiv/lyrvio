import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TopTicker } from "@/components/TopTicker";
import Link from "next/link";

export const metadata = {
  title: "Preis · Was Lyrvio kostet",
  description:
    "Eine Gebühr monatlich. Eine einmalige Erfolgsprämie. Sonst nichts. Keine Setup-Kosten, kein Mindestlauf, keine versteckten Posten.",
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
                Gebührenordnung · Stand 26.04.2026
              </span>
            </div>
            <h1 className="manifest mb-10">
              Eine Gebühr.
              <br />
              <em>Eine Prämie.</em>
              <br />
              <span className="stamped">Sonst nichts.</span>
            </h1>
            <p className="font-mono text-[15px] leading-[1.7] text-ink max-w-[60ch]">
              Lyrvio kostet 79 € pro Monat, monatlich kündbar. Wenn am Ende
              ein Mietvertrag steht, fällt einmalig eine Erfolgsprämie von
              299 € an. Vorher nicht. Keine Provision an den Vermieter, keine
              Maklergebühr, keine Setup-Kosten.
            </p>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-[1100px] px-6 lg:px-10 py-20 lg:py-28">
            <div className="akte">
              <div className="akte-head">
                <span>LYRVIO · Preisliste 2026</span>
                <span className="hidden sm:inline">Stand 2026</span>
              </div>

              <div className="akte-row">
                <div className="para">1.</div>
                <div className="desc">
                  <strong>Aktivsuche, monatlich</strong>
                  <small>
                    Lyrvio läuft 24/7 in deinem Browser · 5 Plattformen · ø 28 s
                    Reaktion · persönliche Anschreiben · Push + Mail bei
                    Antwort · Pipeline-Übersicht · Chrome + Firefox
                  </small>
                </div>
                <div className="price">79,00 €</div>
              </div>

              <div className="akte-row">
                <div className="para">2.</div>
                <div className="desc">
                  <strong>Erfolgsprämie, einmalig</strong>
                  <small>
                    Fällig am Tag der Mietvertrags-Unterschrift, wenn die
                    Wohnung über eine Lyrvio-Bewerbung zustande kam. Kein
                    Vertrag → keine Prämie.
                  </small>
                </div>
                <div className="price">299,00 €</div>
              </div>

              <div className="akte-row">
                <div className="para">3.</div>
                <div className="desc">
                  <strong>Setup, Onboarding, Updates</strong>
                  <small>
                    Profilanlage, Vollmacht, Extension-Installation,
                    technische Updates während der Vertragslaufzeit.
                  </small>
                </div>
                <div className="price">0,00 €</div>
              </div>

              <div className="akte-row">
                <div className="para">4.</div>
                <div className="desc">
                  <strong>Mindestlaufzeit</strong>
                  <small>
                    Keine. Der Vertrag ist zum Monatsende kündbar — formlos
                    per E-Mail an hallo@lyrvio.com.
                  </small>
                </div>
                <div className="price">—</div>
              </div>

              <div className="akte-foot">
                <div>
                  Gesamt erst bei Mietvertrag.
                  <br />
                  <span className="text-ash">
                    Hiermit bestelle ich Lyrvio mit der automatisierten
                    Wohnungssuche zu vorgenannten Konditionen.
                  </span>
                </div>
                <div className="text-right">
                  <span className="signature-line" />
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ash">
                    Unterschrift / Datum
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Link href="/checkout?plan=aktiv" className="btn-primary cursor-stamp">
                Aktivsuche beauftragen
              </Link>
              <Link href="/checkout?plan=erfolg" className="btn-secondary cursor-stamp">
                Mit Erfolgsprämie
              </Link>
            </div>

            <div className="mt-16 grid grid-cols-12 gap-6 font-mono text-[12.5px] leading-[1.65] text-ash">
              <div className="col-span-12 md:col-span-6">
                <div className="label mb-3">Was ist nicht im Preis?</div>
                <p className="text-ink">
                  Maklergebühren des Vermieters (Lyrvio bewirbt sich nur bei
                  provisionsfreien Inseraten). Schufa-Auskunft, falls
                  verlangt. Reisekosten zu Besichtigungen.
                </p>
              </div>
              <div className="col-span-12 md:col-span-6">
                <div className="label mb-3">Was passiert bei Kündigung?</div>
                <p className="text-ink">
                  Lyrvio stoppt zum Monatsende. Dein Profil bleibt 30 Tage
                  gespeichert für eine mögliche Reaktivierung. Auf Wunsch
                  sofortige Löschung — nachweisbar per E-Mail-Bestätigung.
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
