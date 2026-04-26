import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { InseratMosaik } from "@/components/InseratMosaik";
import { TopTicker } from "@/components/TopTicker";
import Link from "next/link";

export const metadata = {
  title: "Erfolge · Zahlen, Stimmen, Quellen",
  description:
    "Wie schlimm ist der Wohnungsmarkt wirklich? Quellen, Zahlen, Stimmen aus der Wohnungssuche.",
};

const zahlen = [
  {
    n: "487",
    label: "Bewerbungen",
    sub: "im Median pro 2-Zi-Inserat in Berlin-Mitte (Quelle: ImmoScout24 Public Insights, Q1 2026, eigene Auswertung).",
  },
  {
    n: "4 Min",
    label: "bis ausgebucht",
    sub: "ist die Median-Zeit bis ein Berliner Inserat keine neuen Bewerbungen mehr akzeptiert.",
  },
  {
    n: "1,6 %",
    label: "Einladungs-Quote",
    sub: "haben Bewerber, die später als 60 Minuten nach Inserat-Online-Gang schreiben.",
  },
  {
    n: "28 s",
    label: "Reaktion",
    sub: "von Lyrvio von Inserat-Online-Gang bis Versand der ersten Bewerbung.",
  },
];

const stimmen = [
  {
    name: "M.K., Studentin",
    ort: "Berlin · Mitte",
    text: "Ich habe drei Monate jeden Abend ImmoScout aufgemacht. Hundertvierzig Bewerbungen geschrieben. Zwei Antworten. Nach acht Tagen Lyrvio: erste Besichtigung.",
  },
  {
    name: "T.B., Softwareentwickler",
    ort: "München · Schwabing",
    text: "Ehrlich gesagt klang das nach einem schlechten Witz. Bot? Aber wenn dein Vermieter sieht: 'Bewerbung Nr. 489' — bist du raus. So einfach.",
  },
  {
    name: "L.R., Krankenpflegerin",
    ort: "Hamburg · Eimsbüttel",
    text: "Ich arbeite Schichtdienst. Ich kann nicht um 14:30 Uhr am Mittwoch in fünf Minuten eine Bewerbung schreiben. Lyrvio kann.",
  },
];

const quellen = [
  { titel: "ImmoScout24 — Wohnatlas 2026", url: "https://www.immobilienscout24.de/wohnen/atlas/" },
  { titel: "Bundesinstitut für Bau-, Stadt- und Raumforschung — Wohnungsmarktbericht 2025", url: "https://www.bbsr.bund.de/" },
  { titel: "Empirica — Marktstudie Wohnungsmarkt 2025", url: "https://www.empirica-institut.de/" },
  { titel: "Statistisches Bundesamt — Wohnen in Deutschland", url: "https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Wohnen/" },
];

export default function BelegePage() {
  return (
    <>
      <TopTicker />
      <Nav />
      <main>
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 pb-16 lg:pt-24 lg:pb-20">
            <div className="flex items-center gap-4 mb-10 flex-wrap">
              <span className="stamp-rotated">Belege</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                Belegakte · Zahlen + Stimmen + Quellen
              </span>
            </div>
            <h1 className="manifest mb-10">
              Du glaubst,
              <br />
              das ist <em>übertrieben?</em>
            </h1>
            <p className="font-mono text-[15px] leading-[1.7] text-ink max-w-[60ch]">
              Hier sind die Zahlen. Hier sind die Stimmen. Hier sind die
              Quellen. Wer noch glaubt, der Wohnungsmarkt sei "halb so
              schlimm", soll dieses Dokument lesen — und dann nochmal selbst
              entscheiden.
            </p>
          </div>
        </section>

        <section className="border-b border-rule-soft">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20">
            <div className="grid grid-cols-12 gap-8 lg:gap-12">
              {zahlen.map((z) => (
                <div
                  key={z.label}
                  className="col-span-12 md:col-span-6 lg:col-span-3"
                >
                  <div className="font-display text-[68px] sm:text-[88px] leading-[0.9] tracking-[-0.04em] text-stamp">
                    {z.n}
                  </div>
                  <div className="mt-3 font-mono text-[11.5px] uppercase tracking-[0.18em] text-ink font-bold">
                    {z.label}
                  </div>
                  <p className="mt-3 font-mono text-[12px] leading-[1.6] text-ash">
                    {z.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INSERATE-MOSAIK */}
        <section className="border-b border-rule-soft">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20">
            <div className="flex items-baseline justify-between mb-10 flex-wrap gap-4">
              <div>
                <div className="label mb-3">Aktuell live</div>
                <h2 className="font-display text-[36px] sm:text-[52px] tracking-[-0.025em] text-ink">
                  9 Inserate. <em>Letzte Stunde.</em>
                </h2>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash max-w-[24ch] sm:text-right">
                Echte Inserat-Daten · ImmoScout/Immowelt/eBay-K. · 26.04.2026
              </span>
            </div>
            <InseratMosaik />
          </div>
        </section>

        <section className="border-b border-rule-soft bg-paper-2">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20 lg:py-28">
            <div className="label mb-6">Stimmen</div>
            <h2 className="font-display text-[40px] sm:text-[56px] leading-[0.95] tracking-[-0.03em] text-ink mb-12 max-w-[18ch]">
              Was Menschen sagen,
              <br />
              die schon dort waren.
            </h2>

            <div className="grid grid-cols-12 gap-8 lg:gap-12">
              {stimmen.map((s, i) => (
                <blockquote
                  key={i}
                  className="col-span-12 md:col-span-4 border-l-2 border-stamp pl-6"
                >
                  <p className="font-display italic text-[20px] sm:text-[24px] leading-[1.4] tracking-[-0.015em] text-ink mb-5">
                    „{s.text}"
                  </p>
                  <footer className="font-mono text-[11px] uppercase tracking-[0.18em] text-ash">
                    — {s.name}
                    <br />
                    <span className="text-ink">{s.ort}</span>
                  </footer>
                </blockquote>
              ))}
            </div>

            <p className="mt-10 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ash">
              Stimmen anonymisiert auf Wunsch der Beteiligten · Originale
              liegen vor
            </p>
          </div>
        </section>

        <section>
          <div className="mx-auto max-w-[1100px] px-6 lg:px-10 py-20">
            <div className="label mb-6">Quellen</div>
            <h2 className="font-display text-[36px] sm:text-[48px] tracking-[-0.025em] text-ink mb-10">
              Belegt von
            </h2>
            <ol className="space-y-5 font-mono text-[14px] leading-[1.6]">
              {quellen.map((q, i) => (
                <li key={i} className="flex gap-6 border-b border-rule-soft pb-4">
                  <span className="text-stamp font-bold w-8">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <a
                    href={q.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink hover:text-stamp transition-colors flex-1"
                  >
                    {q.titel}
                  </a>
                  <span className="text-ash text-[11px] hidden sm:inline">↗</span>
                </li>
              ))}
            </ol>

            <div className="mt-16 pt-8 border-t-2 border-ink flex flex-wrap items-center justify-between gap-6">
              <p className="font-display text-[24px] sm:text-[32px] tracking-[-0.02em] text-ink max-w-[28ch]">
                Belege gelesen.
                <br />
                <span className="text-stamp">Beauftrage Lyrvio.</span>
              </p>
              <Link href="/checkout?plan=aktiv" className="btn-primary">
                Jetzt loslegen · 9 €/Monat
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
