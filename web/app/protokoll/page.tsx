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

        {/* BEISPIEL-ANSCHREIBEN */}
        <section id="beispiele" className="border-b border-rule-soft bg-paper-2">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20 lg:py-28">
            <div className="flex items-center gap-4 mb-10 flex-wrap">
              <span className="stamp-rotated">Beispiele</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                Drei echte Beispiel-Anschreiben · anonymisiert · KI-generiert
              </span>
            </div>

            <h2 className="font-display text-[36px] sm:text-[52px] tracking-[-0.025em] text-ink mb-4 max-w-[24ch]">
              Drei echte
              <br />
              <em>Beispiel-Anschreiben.</em>
            </h2>
            <p className="font-mono text-[13px] leading-[1.7] text-ash mb-16 max-w-[64ch] border-l-2 border-stamp/40 pl-4">
              Diese Anschreiben wurden von Lyrvio generiert — auf Basis fiktiver
              Profile. Namen und Daten sind erfunden. Die Stilunterschiede zwischen
              den drei Beispielen sind real: Lyrvio passt Ton und Länge an das
              Inserat an.
            </p>

            <div className="space-y-12">

              {/* Beispiel 1 */}
              <article className="border border-rule-soft">
                <div className="grid grid-cols-12">
                  <header className="col-span-12 border-b border-rule-soft px-6 py-4 flex flex-wrap items-center justify-between gap-4 bg-paper">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-stamp font-bold">Beispiel #1</span>
                      <span className="font-mono text-[11px] text-ash">Berlin · 2-Zi · 1.150 € warm · Friedrichshain</span>
                    </div>
                    <div className="label">Profil: A.B.</div>
                  </header>
                  <div className="col-span-12 lg:col-span-9 px-6 py-6">
                    <pre className="font-mono text-[13px] leading-[1.85] text-ink whitespace-pre-wrap break-words">
{`Hallo,

das Inserat passt zu mir: ruhige 2-Zi in Friedrichshain, ca. 60 m² mit
Balkon — genau das was ich seit 3 Wochen suche.

Kurz zu mir: Anna Becker, 28, Marketing-Managerin bei Native Instruments
in Kreuzberg (3.400 € netto, unbefristet). Kein Hund, keine Kinder, keine
Vorstrafen. Schufa-Score 96/100, alle Belege liegen bereit.

Ich kann gerne diese Woche zur Besichtigung kommen — wann passt es Ihnen?

Anna Becker · 0152-XXXXXXXX`}
                    </pre>
                  </div>
                  <aside className="col-span-12 lg:col-span-3 border-t lg:border-t-0 lg:border-l border-rule-soft px-6 py-6 bg-paper">
                    <div className="label mb-3">Anmerkung</div>
                    <p className="font-mono text-[11.5px] leading-[1.6] text-ash">
                      Stilebene: knapp / persönlich
                      <br />Länge: 68 Wörter
                      <br />Generiert in 2,8 Sek.
                    </p>
                  </aside>
                </div>
              </article>

              {/* Beispiel 2 */}
              <article className="border border-rule-soft">
                <div className="grid grid-cols-12">
                  <header className="col-span-12 border-b border-rule-soft px-6 py-4 flex flex-wrap items-center justify-between gap-4 bg-paper">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-stamp font-bold">Beispiel #2</span>
                      <span className="font-mono text-[11px] text-ash">München · 1-Zi · 980 € warm · Schwabing</span>
                    </div>
                    <div className="label">Profil: M.V.</div>
                  </header>
                  <div className="col-span-12 lg:col-span-9 px-6 py-6">
                    <pre className="font-mono text-[13px] leading-[1.85] text-ink whitespace-pre-wrap break-words">
{`Sehr geehrte Damen und Herren,

mit Interesse habe ich Ihr Inserat einer 1-Zimmer-Wohnung in München-
Schwabing (38 m², 980 € warm) gelesen und möchte mich hiermit als Mieter
bewerben.

Mein Name ist Marcus Voss, 34, Diplom-Ingenieur bei BMW (Festanstellung
seit 2021, Bruttogehalt 5.200 €, Nettoeinkommen 3.150 €). Ich bin
Nichtraucher, halte keine Haustiere und beziehe die Wohnung als alleiniger
Mieter.

Anbei alle relevanten Bewerbungsunterlagen:
— Schufa-Bonitätsauskunft (BonitätsCheck, Score 98)
— 3 letzte Gehaltsabrechnungen
— Mietschuldenfreiheitsbescheinigung des bisherigen Vermieters
— Kopie Personalausweis

Für Rückfragen oder eine Besichtigung stehe ich Ihnen jederzeit gern zur
Verfügung.

Mit freundlichen Grüßen
Marcus Voss`}
                    </pre>
                  </div>
                  <aside className="col-span-12 lg:col-span-3 border-t lg:border-t-0 lg:border-l border-rule-soft px-6 py-6 bg-paper">
                    <div className="label mb-3">Anmerkung</div>
                    <p className="font-mono text-[11.5px] leading-[1.6] text-ash">
                      Stilebene: formal / ausführlich
                      <br />Länge: 112 Wörter
                      <br />Generiert in 3,4 Sek.
                    </p>
                  </aside>
                </div>
              </article>

              {/* Beispiel 3 */}
              <article className="border border-rule-soft">
                <div className="grid grid-cols-12">
                  <header className="col-span-12 border-b border-rule-soft px-6 py-4 flex flex-wrap items-center justify-between gap-4 bg-paper">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-stamp font-bold">Beispiel #3</span>
                      <span className="font-mono text-[11px] text-ash">Hamburg · 3-Zi · 1.420 € warm · Eppendorf</span>
                    </div>
                    <div className="label">Profil: L.+T.H.</div>
                  </header>
                  <div className="col-span-12 lg:col-span-9 px-6 py-6">
                    <pre className="font-mono text-[13px] leading-[1.85] text-ink whitespace-pre-wrap break-words">
{`Liebe Vermieterin, lieber Vermieter,

wir haben Ihre wunderschöne 3-Zimmer-Wohnung in Eppendorf entdeckt und
sind direkt verliebt — die Lage am Klosterstern, der Altbau-Charme, der
Garten ist genau das was wir für unsere kleine Familie suchen.

Wer wir sind: Lisa und Tom Hansen, Mitte 30, mit unserem Sohn Leon (4).
Lisa ist Kinderärztin am UKE, Tom ist Software-Entwickler bei Otto. Wir
verdienen zusammen netto 6.800 € — das ist mehr als das 3,5-Fache der
Warmmiete.

Was Sie noch über uns wissen sollten: keine Tiere, keine Raucher, beide
mit Schufa-Score 95+, beide unbefristet angestellt seit über 5 Jahren.
Unsere bisherige Vermieterin in Winterhude (4 Jahre) gibt uns gerne eine
Referenz.

Wir würden uns sehr über die Möglichkeit zur Besichtigung freuen und sind
zeitlich völlig flexibel.

Herzliche Grüße
Lisa & Tom Hansen`}
                    </pre>
                  </div>
                  <aside className="col-span-12 lg:col-span-3 border-t lg:border-t-0 lg:border-l border-rule-soft px-6 py-6 bg-paper">
                    <div className="label mb-3">Anmerkung</div>
                    <p className="font-mono text-[11.5px] leading-[1.6] text-ash">
                      Stilebene: herzlich / Familie
                      <br />Länge: 134 Wörter
                      <br />Generiert in 4,1 Sek.
                    </p>
                  </aside>
                </div>
              </article>

            </div>

            <p className="mt-12 font-mono text-[13px] leading-[1.75] text-ash max-w-[68ch] border-l-2 border-ink/20 pl-4">
              Lyrvio analysiert das Inserat (Wortwahl, Länge, Tonalität) und passt
              jeden Brief an. Bei großen Hausverwaltungen wird formaler geschrieben,
              bei privaten Vermieter-Inseraten persönlicher. Drei Briefe für drei
              Inserate sehen nie gleich aus.
            </p>
          </div>
        </section>

        {/* A/B-VERGLEICH — VARIANZ-BEWEIS */}
        <section id="varianz" className="border-b border-rule-soft bg-paper">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20 lg:py-28">

            {/* Header */}
            <div className="flex items-center gap-4 mb-10 flex-wrap">
              <span className="stamp-rotated">Varianz</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                Eine Wohnung · Drei Anschreiben · Drei Profile
              </span>
            </div>

            <h2 className="font-display text-[36px] sm:text-[52px] tracking-[-0.025em] text-ink mb-4 max-w-[28ch]">
              Drei Anschreiben —
              <br />
              <em>eine Wohnung.</em> Lyrvios Varianz-Beweis.
            </h2>
            <p className="font-mono text-[13px] leading-[1.7] text-ash mb-12 max-w-[64ch] border-l-2 border-stamp/40 pl-4">
              Lyrvio analysiert das Inserat und passt jeden Brief an: Wortwahl, Länge,
              Tonalität. Hier dieselbe Wohnung — drei verschiedene Anschreiben für drei
              verschiedene Profile.
            </p>

            {/* Inserat-Box */}
            <div className="relative mb-14 border-2 border-ink max-w-[680px]">
              {/* Stempel oben */}
              <div className="absolute -top-[13px] left-6">
                <span className="bg-stamp text-paper font-mono text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-[3px]">
                  Inserat #2034 · neu
                </span>
              </div>
              <div className="px-6 pt-8 pb-6">
                <div className="label mb-3">Inserat — Berlin Prenzlauer Berg</div>
                <pre className="font-mono text-[14px] leading-[1.85] text-ink whitespace-pre-wrap">
{`2-Zi · 58 m² · 1.080 € warm · Altbau · 3. OG ohne Aufzug
Online seit 4 Min · 47 Bewerbungen bereits eingegangen`}
                </pre>
              </div>
            </div>

            {/* 3 Varianten — Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-4">

              {/* Variante A */}
              <article className="border border-rule-soft flex flex-col">
                <header className="border-b border-rule-soft px-5 py-3 bg-paper-2">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-stamp font-bold mb-1">
                    Variante A
                  </div>
                  <div className="font-mono text-[11px] text-ink font-medium">
                    Berufseinsteigerin
                  </div>
                  <div className="font-mono text-[10.5px] text-ash mt-[2px]">
                    knapp + freundlich · 67 Wörter
                  </div>
                </header>
                <div className="px-5 py-5 flex-1">
                  <pre className="font-mono text-[12px] leading-[1.85] text-ink whitespace-pre-wrap break-words">
{`Hallo,

das Inserat passt — 2-Zi-Altbau in P-Berg,
58 m². Ich liebe den Bezirk.

Kurz zu mir: Lena Weber, 26, frische
Apothekerin bei DocMorris (Probezeit
bestanden, 2.900€ netto, unbefristet).
Keine Tiere, Nichtraucherin, alles ordentlich.

Schufa 95, Selbstauskunft + Lohnnachweis
liegen bereit. Wann passt eine Besichtigung?

Lena Weber · 0151-XXXXXXX`}
                  </pre>
                </div>
              </article>

              {/* Variante B */}
              <article className="border border-rule-soft flex flex-col">
                <header className="border-b border-rule-soft px-5 py-3 bg-paper-2">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-stamp font-bold mb-1">
                    Variante B
                  </div>
                  <div className="font-mono text-[11px] text-ink font-medium">
                    Senior-Engineer
                  </div>
                  <div className="font-mono text-[10.5px] text-ash mt-[2px]">
                    präzise + nüchtern · 89 Wörter
                  </div>
                </header>
                <div className="px-5 py-5 flex-1">
                  <pre className="font-mono text-[12px] leading-[1.85] text-ink whitespace-pre-wrap break-words">
{`Sehr geehrte Damen und Herren,

ich bewerbe mich auf Ihre 2-Zimmer-Wohnung
in Prenzlauer Berg (58 m², 1.080 € warm).

Zu meiner Person: Christoph Brandt, 38,
Senior Software Engineer bei Zalando
(unbefristet seit 2020, 6.400 € brutto /
3.850 € netto). Schufa-Score 99/100.
Keine Haustiere, Nichtraucher, ledig,
beziehe die Wohnung allein.

Anbei vollständige Bewerbungsmappe (Schufa,
3x Lohnabrechnung, Selbstauskunft,
Mietschuldenfreiheitsbescheinigung). Ich
bin zeitlich flexibel für eine Besichtigung.

Mit freundlichen Grüßen
Christoph Brandt`}
                  </pre>
                </div>
              </article>

              {/* Variante C */}
              <article className="border border-rule-soft flex flex-col">
                <header className="border-b border-rule-soft px-5 py-3 bg-paper-2">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-stamp font-bold mb-1">
                    Variante C
                  </div>
                  <div className="font-mono text-[11px] text-ink font-medium">
                    Paar mit Hund
                  </div>
                  <div className="font-mono text-[10.5px] text-ash mt-[2px]">
                    warm + ehrlich · 102 Wörter
                  </div>
                </header>
                <div className="px-5 py-5 flex-1">
                  <pre className="font-mono text-[12px] leading-[1.85] text-ink whitespace-pre-wrap break-words">
{`Liebe Vermieterin, lieber Vermieter,

wir haben uns sofort in Ihre 2-Zi-Wohnung
in P-Berg verguckt — Altbau, 3. OG, das
ist genau das was wir suchen seit unsere
Vermieterin Eigenbedarf angemeldet hat.

Wir sind Sandra (32, Erzieherin Kita
Winsstraße) und Jonas (34, Webdesigner
selbständig). Zusammen 4.700€ netto.
Ehrlich gesagt: wir haben einen kleinen
Hund (Rocco, 8 Jahre, Mischling, sehr
ruhig — Foto im Anhang). Wir wissen das
ist ein Thema. Falls grundsätzlich okay,
würden wir uns über eine Antwort sehr
freuen.

Schufa 96, beide unbefristet.

Sandra & Jonas`}
                  </pre>
                </div>
              </article>

            </div>

            {/* Erklärender Satz */}
            <p className="mt-10 font-mono text-[13px] leading-[1.75] text-ash max-w-[72ch] border-l-2 border-ink/20 pl-4">
              Drei Anschreiben — drei Längen (67/89/102 Wörter), drei Tonalitäten
              (knapp/präzise/warm), drei Stilebenen (du-Form/Sie-Form/persönlich).
              Lyrvio passt jeden Brief automatisch an dein Profil und das Inserat an —
              keine Vorlage, kein Copy-Paste-Muster.
            </p>

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
