const stories = [
  {
    name: "Melanie S.",
    where: "Berlin · Mitte",
    metric: "11 Tage",
    quote:
      "Vier Monate selbst gesucht, nichts. Mit Lyrvio kam die erste Einladung am elften Tag — für eine Wohnung, die ich nie gesehen hatte, weil sie um 6 Uhr morgens online ging.",
  },
  {
    name: "Tobias W.",
    where: "München · Schwabing",
    metric: "3 Termine in 7 Tagen",
    quote:
      "Ich hab parallel manuell und mit Lyrvio gesucht. Selbe Woche: Lyrvio drei Antworten, ich Null. Der Bot ist nachts um zwei aktiv. Ich nicht.",
  },
  {
    name: "Aigerim K.",
    where: "Berlin · Prenzlauer Berg",
    metric: "Einzug nach 5 Wochen",
    quote:
      "Als Zugezogene ohne deutsche Mietschulden-History dachte ich, es wird hart. Lyrvio hat mein Anschreiben so gerahmt, dass mein Profil positiv rüberkam.",
  },
];

export function SocialProof() {
  return (
    <section className="bg-ink">
      <div className="mx-auto max-w-[1280px] px-6 py-24 lg:py-32">
        {/* Header — editorial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-3">
            <div className="eyebrow">
              <span className="dot" />
              Aus der Beta
            </div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-display text-[40px] sm:text-[56px] lg:text-[60px] leading-[1] tracking-[-0.02em] text-bone">
              Drei Wohnungen.
              <br />
              <span className="text-bone-2">Drei Geschichten ohne Filter.</span>
            </h2>
          </div>
        </div>

        {/* Stories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-line">
          {stories.map((s) => (
            <article
              key={s.name}
              className="bg-ink p-8 lg:p-10 flex flex-col"
            >
              <div className="font-display text-[36px] leading-none text-lime mb-6">
                {s.metric}
              </div>
              <blockquote className="font-display text-[20px] leading-[1.45] tracking-[-0.005em] text-bone flex-1">
                <span className="text-lime/60">„</span>
                {s.quote}
                <span className="text-lime/60">"</span>
              </blockquote>
              <div className="mt-8 pt-6 border-t border-line">
                <div className="text-[14px] text-bone-2">{s.name}</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ash mt-0.5">
                  {s.where}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Counter-stat strip */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
          <Stat n="83 %" label="finden in unter 8 Wochen" />
          <Stat n="28 s" label="ø Reaktionszeit ab Inserat" />
          <Stat n="5×" label="mehr Einladungen als manuell" />
          <Stat n="5" label="Plattformen parallel" />
        </div>

        <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-dust max-w-[60ch]">
          Stand: April 2026 · n = 142 Beta-Nutzer · Berlin, München, Hamburg ·
          Median über alle Aktivkunden
        </p>
      </div>
    </section>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="bg-ink p-6 lg:p-8">
      <div className="font-display text-[40px] sm:text-[52px] leading-none tracking-[-0.02em] text-bone">
        {n}
      </div>
      <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ash">
        {label}
      </div>
    </div>
  );
}
