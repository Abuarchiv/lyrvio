import Link from "next/link";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative hero-wash">
      <span className="scan-line" aria-hidden />
      <div className="mx-auto max-w-[1280px] px-6 pt-14 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT — Editorial Headline */}
          <div className="lg:col-span-7">
            <div className="eyebrow mb-6">
              <span className="dot" />
              Wohnungsmarkt · Berlin / München · 2026
            </div>

            <h1 className="font-display text-[44px] sm:text-[60px] lg:text-[84px] leading-[0.96] tracking-[-0.025em] text-bone">
              Eine Wohnung in Berlin
              <br />
              ist <em className="not-italic"><span className="lime-underline">4&nbsp;Minuten</span></em> online.
              <br />
              <span className="text-bone-2">Du schreibst in der 5.</span>
            </h1>

            <p className="mt-10 max-w-[58ch] text-[18px] sm:text-[19px] leading-[1.55] text-bone-2">
              Bei jedem Inserat melden sich 200 bis 800 Leute. Vermieter laden
              acht ein — die ersten acht. Lyrvio ist der Browser-Bot, der für
              dich schreibt, sobald die Anzeige live geht. Auch um 03:14 Uhr.
              Auch im Meeting. Auch wenn du gerade nicht kannst.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-5">
              <Link href="/#preise" className="btn-lime">
                Bot aktivieren · 79&nbsp;€/Monat
              </Link>
              <Link
                href="/#wie"
                className="inline-flex items-center gap-2 text-[15px] text-bone-2 hover:text-lime transition-colors"
              >
                Wie er funktioniert
                <ArrowDown className="h-4 w-4" />
              </Link>
            </div>

            <p className="mt-10 max-w-[60ch] font-mono text-[11px] uppercase tracking-[0.16em] text-dust">
              Quelle: ImmoScout24 Public Insights · Q1&nbsp;2026 · Median über
              Berlin-Mitte, Friedrichshain, Prenzlauer&nbsp;Berg
            </p>
          </div>

          {/* RIGHT — Live Activity */}
          <aside className="lg:col-span-5 lg:mt-2">
            <LiveActivity />
          </aside>
        </div>
      </div>
    </section>
  );
}

function LiveActivity() {
  return (
    <div className="card editorial-shadow overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
        <div className="flex items-center gap-2.5">
          <span className="ticker-dot" />
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-bone-2">
            Live · Bot-Aktivität
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-[0.14em] text-dust">
          BERLIN
        </span>
      </div>

      {/* Stream */}
      <div className="divide-y divide-line">
        <ActivityRow
          when="vor 12 Sek."
          tag="Inserat erkannt"
          tagTone="lime"
          title="2-Zi · Prenzlauer Berg · 62 m² · 1.150 €"
          line="Helle Altbauwohnung, 2. OG, Balkon nach Hof. Selbstauskunft + Schufa erwünscht."
        />
        <ActivityRow
          when="vor 8 Sek."
          tag="Bewerbung versandt"
          tagTone="amber"
          title="Anschreiben generiert in 3,2 Sek."
          line="Persönliche Vorstellung · Beruf · Einzugsdatum · Ihre Anforderungen abgehakt."
        />
        <ActivityRow
          when="vor 4 Sek."
          tag="Wartet auf Antwort"
          tagTone="bone"
          title="ImmoScout24 · Mitte"
          line="Bewerbungs-ID #4781 · Position: 2 von vermutl. 600+"
          progress
        />
      </div>

      {/* Footer */}
      <div className="border-t border-line bg-ink-3 px-5 py-3 flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.14em] text-ash">
          Heute: <span className="text-bone-2">47 Bewerbungen versandt</span>
        </span>
        <span className="font-mono text-[10px] tracking-[0.14em] text-ash">
          ⌀ Reaktion: <span className="text-lime">28 s</span>
        </span>
      </div>
    </div>
  );
}

type Tone = "lime" | "amber" | "bone";

function ActivityRow({
  when,
  tag,
  tagTone,
  title,
  line,
  progress,
}: {
  when: string;
  tag: string;
  tagTone: Tone;
  title: string;
  line: string;
  progress?: boolean;
}) {
  const toneClass: Record<Tone, string> = {
    lime: "text-lime",
    amber: "text-amber",
    bone: "text-bone-2",
  };
  return (
    <div className="ticker-row px-5 py-4">
      <div className="flex items-center justify-between mb-1.5">
        <span
          className={`font-mono text-[10px] uppercase tracking-[0.18em] ${toneClass[tagTone]}`}
        >
          {tag}
        </span>
        <span className="font-mono text-[10px] tracking-[0.14em] text-dust">
          {when}
        </span>
      </div>
      <div className="text-[14px] text-bone leading-snug">{title}</div>
      <div className="mt-0.5 text-[12.5px] text-ash leading-snug">{line}</div>
      {progress && (
        <div className="mt-3 h-[2px] bg-line overflow-hidden">
          <div className="h-full w-2/3 bg-lime" />
        </div>
      )}
    </div>
  );
}
