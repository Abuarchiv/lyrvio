import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TopTicker } from "@/components/TopTicker";
import Link from "next/link";

export const metadata = {
  title: "Häufige Fragen",
  description:
    "Was Lyrvio ist, was es nicht ist. Wie Lyrvio in deinem Browser arbeitet, ohne deine Daten zu verkaufen.",
};

const fragen = [
  {
    q: "Ist das überhaupt erlaubt?",
    a: "Ja. Lyrvio macht im Browser exakt das, was du selbst tun würdest — schneller. Es gibt keine Plattform-API-Verletzung, kein Scraping über fremde Server, keine Identitäts-Übergabe. Du erteilst eine schriftliche Vollmacht, dass Lyrvio in deinem Namen Bewerbungen versendet. Das ist seit dem BGB-Vollmachtsrecht völlig legitim.",
  },
  {
    q: "Werden meine Daten an einen Server geschickt?",
    a: "Nein. Dein Profil, deine Selbstauskunft, deine Schufa — bleiben in der Browser-Extension auf deinem Gerät. Nur Erfolgsmetriken (Bewerbung versandt: ja/nein, Antwort erhalten: ja/nein) gehen an unseren Server, damit dein Dossier in der Cloud sichtbar bleibt. Inhalte nicht.",
  },
  {
    q: "Was, wenn ImmoScout Lyrvio erkennt?",
    a: "Lyrvio agiert wie ein realer User: dein Browser, deine Cookies, deine Klicks, dein Tempo (mit minimaler menschlicher Verzögerung). Es gibt keinen technischen Marker, der das von einem schnellen, organisierten Menschen unterscheidet. Sollte eine Plattform sich beschweren: dein Account, deine Aktion — du bist der Vertragspartner.",
  },
  {
    q: "Wieso 28 Sekunden Reaktion und nicht eine Sekunde?",
    a: "Weil eine Sekunde unrealistisch wäre und auffallen würde. Lyrvio simuliert ein menschliches Tempo: Inserat sehen, lesen, Anschreiben formulieren, absenden. 28 Sekunden ist schnell genug für Position 2-5 in der Bewerber-Schlange — und nicht so schnell, dass es nach Lyrvio riecht.",
  },
  {
    q: "Was kostet der Erfolgsbonus konkret?",
    a: "49 € einmalig, fällig am Tag der Mietvertrags-Unterzeichnung — wenn die Wohnung über eine Lyrvio-Bewerbung zustande kam. Falls du die Wohnung selbst gefunden hast: keine Prämie. Falls Lyrvio bewirbt aber nichts klappt: keine Prämie. Nur bei Erfolg, klar dokumentiert.",
  },
  {
    q: "Welche Plattformen werden überwacht?",
    a: "ImmoScout24, Immowelt, Immonet, eBay-Kleinanzeigen und wg-gesucht. Wunderflats und HousingAnywhere sind in Vorbereitung. Wer eigene Quellen einbringen will (Facebook-Gruppen, lokale Boards): auf Anfrage individuell.",
  },
  {
    q: "Funktioniert das auch bei Genossenschaften / städtischen Bauten?",
    a: "Eingeschränkt. Genossenschaften (z. B. WBM, Howoge, GEWOBAG) haben oft eigene Portale mit Wartelisten. Lyrvio kann Inserate dort lesen, aber Bewerbungen müssen häufig per Brief oder spezifischem Formular eingereicht werden. Für klassische Vermieter-Inserate: voll automatisiert.",
  },
  {
    q: "Was passiert, wenn ich kündige?",
    a: "Lyrvio stoppt zum Monatsende. Dein Profil bleibt 30 Tage gespeichert für eine eventuelle Reaktivierung. Auf Wunsch sofortige Löschung — du erhältst eine schriftliche Bestätigung per E-Mail mit Lösch-Protokoll.",
  },
  {
    q: "Warum sollte ein Vermieter eine Bewerbung von Lyrvio lesen?",
    a: "Er liest sie nicht als 'Bewerbung von Lyrvio'. Er liest sie als persönliches Anschreiben, das die Anforderungen aus seinem Inserat aufgreift. Genau wie du sie geschrieben hättest — nur 280-mal so schnell. Vermieter merken nicht Lyrvio. Sie merken nur, dass deine Bewerbung in der Top 3 statt Position 487 ankommt.",
  },
  {
    q: "Kann ich das selbst auch machen?",
    a: "Theoretisch: ja. Du müsstest fünf Plattformen alle 30 Sekunden 24/7 überwachen, in unter einer Minute ein personalisiertes Anschreiben verfassen, und das parallel für 8-12 Inserate täglich. Faktisch: nein. Niemand kann das. Genau deshalb gibt es Lyrvio.",
  },
];

export default function AktePage() {
  return (
    <>
      <TopTicker />
      <Nav />
      <main>
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 pb-16 lg:pt-24 lg:pb-20">
            <div className="flex items-center gap-4 mb-10 flex-wrap">
              <span className="stamp-rotated">Häufige Fragen</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                Akte · Antworten auf häufige Fragen
              </span>
            </div>
            <h1 className="manifest mb-10">
              Bevor du <em>fragst</em>:
              <br />
              Hier ist <span className="stamped">die Akte.</span>
            </h1>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-[1100px] px-6 lg:px-10 py-20">
            <ol className="space-y-12">
              {fragen.map((f, i) => (
                <li key={i} className="grid grid-cols-12 gap-6 lg:gap-10 pb-10 border-b border-rule-soft last:border-b-0">
                  <div className="col-span-12 lg:col-span-2">
                    <div className="step-num">{String(i + 1).padStart(2, "0")}</div>
                  </div>
                  <div className="col-span-12 lg:col-span-10">
                    <h2 className="font-display text-[26px] sm:text-[32px] leading-[1.15] tracking-[-0.02em] text-ink mb-4">
                      {f.q}
                    </h2>
                    <p className="font-mono text-[14px] leading-[1.75] text-ink max-w-[68ch]">
                      {f.a}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-20 pt-10 border-t-2 border-ink flex flex-wrap items-center justify-between gap-6">
              <div>
                <p className="font-display text-[28px] sm:text-[36px] tracking-[-0.02em] text-ink max-w-[24ch]">
                  Frage nicht beantwortet?
                </p>
                <a
                  href="mailto:hallo@lyrvio.com"
                  className="link-underline font-mono text-[14px] mt-3 inline-block"
                >
                  hallo@lyrvio.com
                </a>
              </div>
              <Link href="/checkout?plan=aktiv" className="btn-primary">
                Jetzt loslegen
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
