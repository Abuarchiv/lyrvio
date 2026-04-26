const steps = [
  {
    n: "01",
    label: "Setup",
    title: "Profil einmal, sauber",
    body:
      "Mappe als PDF, Schufa, Gehalt, drei Anschreiben-Variationen. Alles bleibt lokal in deiner Browser-Extension. Kein Server, keine Cloud, keine Drittparteien.",
    note: "≈ 8 Min.",
  },
  {
    n: "02",
    label: "Beobachten",
    title: "5 Plattformen, alle 30 Sekunden",
    body:
      "ImmoScout24, Immowelt, Immonet, eBay-Kleinanzeigen, Wunderflats. Der Bot scannt im echten Browser, mit deinem Login — wie wenn du selbst auf F5 drückst.",
    note: "läuft im Hintergrund",
  },
  {
    n: "03",
    label: "Schreiben",
    title: "Anschreiben in Sekunden",
    body:
      "Bei einem Treffer liest der Bot die Annonce, erkennt Vermieter-Typ und Anforderungen, und schreibt ein Anschreiben in deinem Stil. Nicht generisch — auf die Wohnung angepasst.",
    note: "ø 3 Sek. Generierung",
  },
  {
    n: "04",
    label: "Antworten",
    title: "Du bist unter den ersten Acht",
    body:
      "Antworten landen in deinem Postfach. Das Dashboard zeigt die Pipeline: gesendet, gelesen, eingeladen, besichtigt. Du machst nur noch das Menschliche: hingehen, reden, Vertrag.",
    note: "ø 28 Sek. ab Inserat",
  },
];

export function HowItWorks() {
  return (
    <section id="wie" className="border-y border-line bg-ink-2">
      <div className="mx-auto max-w-[1280px] px-6 py-24 lg:py-32">
        {/* Section header — editorial, asymmetric */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-3">
            <div className="eyebrow">
              <span className="dot" />
              Vorgehen
            </div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-display text-[40px] sm:text-[56px] lg:text-[64px] leading-[1] tracking-[-0.02em] text-bone">
              Vier Schritte.
              <br />
              <span className="text-bone-2">
                Drei davon erledigt der Bot.
              </span>
            </h2>
          </div>
        </div>

        {/* Steps as editorial table */}
        <ol className="border-t border-line">
          {steps.map((s) => (
            <li
              key={s.n}
              className="border-b border-line py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12"
            >
              <div className="lg:col-span-2 flex items-baseline gap-4">
                <span className="font-display text-[44px] leading-none text-lime">
                  {s.n}
                </span>
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ash">
                  {s.label}
                </span>
              </div>
              <div className="lg:col-span-7">
                <h3 className="font-display text-[26px] sm:text-[30px] leading-[1.1] tracking-[-0.015em] text-bone">
                  {s.title}
                </h3>
                <p className="mt-3 max-w-[58ch] text-[16px] leading-[1.6] text-bone-2">
                  {s.body}
                </p>
              </div>
              <div className="lg:col-span-3 flex lg:justify-end">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-ash">
                  {s.note}
                </span>
              </div>
            </li>
          ))}
        </ol>

        {/* Plattform-Strip */}
        <div className="mt-14 pt-8 border-t border-line">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ash">
              Aktuell beobachtet
            </p>
            <ul className="flex flex-wrap gap-x-8 gap-y-2 font-display text-[18px] sm:text-[22px] tracking-[-0.01em] text-bone">
              <li>ImmoScout24</li>
              <li className="text-dust">·</li>
              <li>Immowelt</li>
              <li className="text-dust">·</li>
              <li>Immonet</li>
              <li className="text-dust">·</li>
              <li>Kleinanzeigen</li>
              <li className="text-dust">·</li>
              <li>Wunderflats</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
