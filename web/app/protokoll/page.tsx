import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SlamCounter } from "@/components/SlamCounter";
import { TopTicker } from "@/components/TopTicker";
import Link from "next/link";

export const metadata = {
  title: "Protokoll · So funktioniert Lyrvio",
  description:
    "Das exakte Verfahren: Wie Lyrvio in 28 Sekunden auf jedes neue Inserat reagiert und für dich schreibt.",
};

const steps = [
  {
    n: "01",
    titel: "Bestellen",
    inhalt:
      "Du installierst die Browser-Extension (ein kleines Gratis-Programm im Chrome- oder Firefox-Browser), legst dein Profil an und unterzeichnest die Vollmacht. Dauer: vier Minuten. Ab diesem Punkt agiert Lyrvio in deinem Namen — niemals von einem fremden Server, immer aus deinem eigenen Browser.",
    note: "Daten verlassen dein Gerät nicht. Keine Cloud-Profile, keine Konto-Übergabe.",
  },
  {
    n: "02",
    titel: "Überwachung",
    inhalt:
      "Lyrvio schaut nach ImmoScout24, Immowelt, Immonet, eBay-Kleinanzeigen und wg-gesucht alle 30 Sekunden. Jedes neue Inserat wird automatisch ausgefiltert wenn du dich bereits beworben hast — und gegen deine Filter-Kriterien (Stadt, Zimmerzahl, Miete, Größe) geprüft.",
    note: "Aktualisierungs-Takt im Premium-Tarif: alle 12 Sekunden.",
  },
  {
    n: "03",
    titel: "Lyrvio liest die Inserate",
    inhalt:
      "Aus jedem passenden Inserat liest Lyrvio die Anforderungen des Vermieters: Selbstauskunft erwünscht? Schufa? Beruf? Familienstand? Einzugsdatum? Diese Punkte fließen in dein Anschreiben ein.",
    note: "Sprach-KI auf europäischen Servern — im Abo enthalten.",
  },
  {
    n: "04",
    titel: "Generierung",
    inhalt:
      "In durchschnittlich 3,2 Sekunden generiert Lyrvio ein persönliches Anschreiben aus deinem Profil. Kein generischer Standardtext, keine Vorlage. Jeder Brief greift die genannten Punkte des Vermieters auf.",
    note: "Du kannst pro Stadt einen anderen Stil hinterlegen.",
  },
  {
    n: "05",
    titel: "Versand",
    inhalt:
      "Lyrvio sendet die Bewerbung über das Plattform-Messaging — wie ein realer Klick, mit deinen Cookies, deinem Browser, deiner Identität. Kein Verstoß gegen Plattform-Regeln, keine Bot-Erkennung.",
    note: "Durchschnitt: zwischen Inserat-Online-Gang und Versand 28 Sekunden.",
  },
  {
    n: "06",
    titel: "Bewerbungs-Übersicht",
    inhalt:
      "Im Dossier siehst du jede Bewerbung: Inserat, Anschreiben, Status. Kommt eine Antwort, schickt Lyrvio dir Push + E-Mail. Du übernimmst dann persönlich.",
    note: "Antworten beantwortest du selbst — Lyrvio mischt sich nicht in Gespräche.",
  },
];

export default function ProtokollPage() {
  return (
    <>
      <TopTicker />
      <Nav />
      <main>
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 pb-20 lg:pt-24 lg:pb-28">
            <div className="flex items-center gap-4 mb-10">
              <span className="stamp-rotated">Verfahren</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                Protokoll · Verfahren in sechs Schritten
              </span>
            </div>

            <h1 className="manifest mb-10">
              Wie Lyrvio
              <br />
              für dich <em>arbeitet.</em>
            </h1>

            <p className="font-mono text-[15px] leading-[1.7] text-ink max-w-[64ch]">
              Lyrvio ist nicht ein "intelligenter Assistent". Lyrvio ist ein
              Verfahren mit sechs definierten Schritten. Jeder Schritt ist
              messbar, jeder Schritt ist transparent. Wer wissen will, was
              Lyrvio in deinem Namen tut — kann es nachlesen.
            </p>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20 lg:py-28">
            <div className="grid grid-cols-12 gap-8 lg:gap-12">
              {steps.map((s) => (
                <article
                  key={s.n}
                  className="col-span-12 lg:col-span-12 grid grid-cols-12 gap-6 lg:gap-10 pb-12 border-b border-rule-soft last:border-b-0 last:pb-0"
                >
                  <div className="col-span-12 lg:col-span-2">
                    <div className="step-num">{s.n}</div>
                  </div>
                  <div className="col-span-12 lg:col-span-7">
                    <h2 className="font-display text-[28px] sm:text-[36px] tracking-[-0.025em] text-ink mb-4">
                      {s.titel}
                    </h2>
                    <p className="font-mono text-[14px] leading-[1.75] text-ink max-w-[58ch]">
                      {s.inhalt}
                    </p>
                  </div>
                  <aside className="col-span-12 lg:col-span-3 lg:pl-6 lg:border-l lg:border-rule-soft">
                    <div className="label mb-2">Anmerkung</div>
                    <p className="font-mono text-[12.5px] leading-[1.6] text-ash">
                      {s.note}
                    </p>
                  </aside>
                </article>
              ))}
            </div>

          </div>
        </section>

        <SlamCounter />

        <section>
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20 flex flex-wrap items-center justify-between gap-6">
            <p className="font-display text-[28px] sm:text-[44px] tracking-[-0.02em] text-ink max-w-[24ch]">
              Wenn du das Verfahren willst —
              <br />
              <span className="text-stamp">beauftrage Lyrvio.</span>
            </p>
            <Link href="/checkout/standard" className="btn-primary cursor-stamp">
              Jetzt loslegen · 9 €/Monat
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
