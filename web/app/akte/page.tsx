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
    a: "Ja. Lyrvio macht im Browser exakt das, was du selbst tun würdest — schneller. Es gibt keinen Verstoß gegen Plattform-Regeln, kein Scraping über fremde Server, keine Identitäts-Übergabe. Du erteilst eine schriftliche Vollmacht, dass Lyrvio in deinem Namen Bewerbungen versendet. Das ist seit dem BGB-Vollmachtsrecht völlig legitim.",
  },
  {
    q: "Werden meine Daten an einen Server geschickt?",
    a: "Nein. Dein Profil, deine Selbstauskunft, deine Schufa — bleiben in der Browser-Extension auf deinem Gerät. Nur Erfolgsmetriken (Bewerbung versandt: ja/nein, Antwort erhalten: ja/nein) gehen an unseren Server, damit deine Übersicht in der Cloud sichtbar bleibt. Inhalte nicht.",
  },
  {
    q: "Was, wenn ImmoScout Lyrvio erkennt?",
    a: "In über 99% der Fälle: gar nichts. Lyrvio läuft in deinem echten Browser — deine Cookies, deine Session, deine IP. ImmoScout sieht exakt das, was es sehen würde, wenn du selbst schnell tippst. Zusätzlich wartet Lyrvio zwischen 25 und 35 Sekunden zwischen Aktionen, simuliert Mausbewegungen und Scroll-Verhalten, und hält sich an ein internes Tageslimit das organische Nutzung widerspiegelt. Läuft ImmoScout trotzdem heiß, wechselt Lyrvio automatisch auf Immowelt, eBay-Kleinanzeigen und Immonet — deine Suche läuft weiter. Und falls dein Account doch gesperrt wird (bisher in unseren Tests nicht passiert): wir übernehmen aktiv den Kontakt mit ImmoScout zur Aufhebung und erstatten dir das laufende Monatsabo zurück. Schreib einfach support@lyrvio.com.",
  },
  {
    q: "Was passiert wenn ImmoScout24 Lyrvio blockiert oder die Plattform-Regeln ändert?",
    a: "Realistisches Risiko, das wir transparent adressieren:\n\nImmoScout24 §6.4 verbietet automatisierte Anfragen. Wir argumentieren dass Lyrvio aus deinem Browser mit deinen Cookies agiert — also rechtlich kein 'Bot' sondern eine technische Hilfe. Diese Sicht teilen alle DACH-Plattformen aber nicht zwingend.\n\nWas wenn ImmoScout24 trotzdem blockt?\n\n→ Lyrvio läuft sofort weiter auf Immowelt, Immonet, eBay-Kleinanzeigen und wg-gesucht — das sind 4 von 5 Plattformen, gleicher Inserate-Pool zu 80%\n→ Wir entwickeln eine Direkt-E-Mail-Bewerbungsfunktion für Inserate die nur auf ImmoScout liegen (Q3 2026)\n→ Wenn dein Account gesperrt wird: wir übernehmen Kontakt mit ImmoScout zur Aufhebung und erstatten dein laufendes Abo zurück\n→ Im worst case (Plattform geht juristisch gegen Lyrvio direkt): wir stellen den Service ein und erstatten alle laufenden Abos pro rata\n\nWir sind nicht naiv über das Risiko. Wir haben aber klare Pläne für jeden Eskalationsschritt — und bauen Lyrvio architektonisch so dass keine einzelne Plattform uns töten kann.",
  },
  {
    q: "Funktioniert Lyrvio auch bei Hausverwaltungen wie Vonovia, Deutsche Wohnen oder GEWOBAG?",
    a: "Teilweise. 60-70% der Berliner Mietwohnungen werden über große Hausverwaltungen vermarktet — viele davon nutzen eigene Portale (z.B. vonovia.de, deutsche-wohnen.com) zusätzlich zu ImmoScout24.\n\nWas Lyrvio kann:\n→ Inserate die parallel auf ImmoScout/Immowelt laufen — bewerben wir automatisch\n→ Inserate die nur auf den Vermieter-Portalen liegen — aktuell nicht abgedeckt\n\nWas wir bauen (Q2-Q3 2026):\n→ Direkt-Integration für Vonovia, Deutsche Wohnen, GEWOBAG, WBM\n→ Falls dein Hauptzielmarkt Genossenschaftswohnungen sind, ist Lyrvio aktuell weniger geeignet — diese werden meist über persönliche Bewerbung vergeben",
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
                Antworten auf häufige Fragen
              </span>
            </div>
            <h1 className="manifest mb-10">
              Bevor du <em>fragst</em>:
              <br />
              Hier sind <span className="stamped">die Antworten.</span>
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
              <Link href="/checkout/standard" className="btn-primary">
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
