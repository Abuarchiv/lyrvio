export function Founder() {
  return (
    <div id="founder" className="border-t-2 border-ink bg-paper-warm">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 lg:py-20">
        <div className="label mb-8">Gründer</div>

        <div className="grid grid-cols-12 gap-8 lg:gap-16">
          {/* LEFT — Avatar + Stempel */}
          <div className="col-span-12 lg:col-span-3 flex flex-col items-start gap-6">
            {/* SVG Initial-Avatar */}
            <div className="relative">
              <svg
                width="120"
                height="120"
                viewBox="0 0 120 120"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Abubakar Abdi — Founder Avatar"
              >
                <rect
                  x="2"
                  y="2"
                  width="116"
                  height="116"
                  fill="#f3efe6"
                  stroke="#0c0a08"
                  strokeWidth="2.5"
                />
                {/* Diagonal-Linien als Akten-Textur */}
                <line x1="0" y1="20" x2="20" y2="0" stroke="rgba(26,24,21,0.07)" strokeWidth="1" />
                <line x1="0" y1="40" x2="40" y2="0" stroke="rgba(26,24,21,0.07)" strokeWidth="1" />
                <line x1="0" y1="60" x2="60" y2="0" stroke="rgba(26,24,21,0.07)" strokeWidth="1" />
                <line x1="0" y1="80" x2="80" y2="0" stroke="rgba(26,24,21,0.07)" strokeWidth="1" />
                <line x1="0" y1="100" x2="100" y2="0" stroke="rgba(26,24,21,0.07)" strokeWidth="1" />
                <line x1="0" y1="120" x2="120" y2="0" stroke="rgba(26,24,21,0.07)" strokeWidth="1" />
                <line x1="20" y1="120" x2="120" y2="20" stroke="rgba(26,24,21,0.07)" strokeWidth="1" />
                <line x1="40" y1="120" x2="120" y2="40" stroke="rgba(26,24,21,0.07)" strokeWidth="1" />
                <line x1="60" y1="120" x2="120" y2="60" stroke="rgba(26,24,21,0.07)" strokeWidth="1" />
                <line x1="80" y1="120" x2="120" y2="80" stroke="rgba(26,24,21,0.07)" strokeWidth="1" />
                <line x1="100" y1="120" x2="120" y2="100" stroke="rgba(26,24,21,0.07)" strokeWidth="1" />
                {/* Initials "AA" */}
                <text
                  x="60"
                  y="72"
                  textAnchor="middle"
                  fontFamily="Georgia, 'Times New Roman', serif"
                  fontSize="40"
                  fontWeight="700"
                  fill="#c8201c"
                  letterSpacing="-2"
                >
                  AA
                </text>
              </svg>
              {/* Kleiner Stempel-Überkleber */}
              <span
                className="absolute -bottom-3 -right-3 font-mono text-[9px] font-bold uppercase tracking-[0.15em] border-2 border-stamp text-stamp bg-paper px-2 py-1"
                style={{ transform: "rotate(-3deg)" }}
              >
                Solo-Founder
              </span>
            </div>

            {/* Stempel-Block */}
            <div
              className="border-2 border-ink px-4 py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ash leading-[1.8] bg-paper"
              style={{ transform: "rotate(-1deg)" }}
            >
              <div>Karlsruhe · 76131</div>
              <div>Wirtschaftsinformatik</div>
              <div className="text-stamp font-bold">April 2026</div>
            </div>
          </div>

          {/* RIGHT — Story */}
          <div className="col-span-12 lg:col-span-9">
            <h2
              className="font-display text-[32px] sm:text-[44px] leading-[1.0] tracking-[-0.03em] text-ink mb-8"
              style={{ fontStyle: "italic" }}
            >
              Wer hinter Lyrvio steht
            </h2>

            <div className="font-mono text-[15px] leading-[1.75] text-ink max-w-[66ch] space-y-5">
              <p>
                Mein Name ist Abubakar Abdi. Ich studiere Wirtschaftsinformatik
                in Karlsruhe und habe Lyrvio gebaut, weil ich es selbst
                brauchte.
              </p>
              <p>
                Letzten Sommer habe ich versucht, ein WG-Zimmer in Berlin zu
                finden — für ein Praktikum bei einem Tech-Startup. Sechs
                Wochen, 87 Bewerbungen, drei Besichtigungen. Eine davon hat
                geklappt — weil ich um 6:43 Uhr morgens das Inserat gesehen
                und in 4 Minuten geantwortet hatte.
              </p>
              <p>
                <span className="marker">Das war zufällig. Es darf nicht zufällig sein.</span>
              </p>
              <p>
                Lyrvio ist die Lösung, die ich damals gebraucht hätte: Ein
                kleines Programm, das 24/7 für dich schaut, schreibt und
                schickt — während du arbeitest, schläfst, lebst. Du wirst
                nicht der Erste sein. Aber du wirst auch nicht der Achte sein.
              </p>
              <p>
                Ich baue Lyrvio aktuell allein, mit AI-Tools, die das möglich
                machen. Ich antworte selbst auf jede Email an{" "}
                <a
                  href="mailto:hallo@lyrvio.com"
                  className="link-underline text-ink"
                >
                  hallo@lyrvio.com
                </a>{" "}
                — meistens innerhalb von 4 Stunden.
              </p>
            </div>

            {/* Signatur */}
            <div className="mt-10 flex items-end gap-6 flex-wrap">
              <div>
                <span className="block font-display text-[28px] sm:text-[34px] leading-none tracking-[-0.02em] text-ink" style={{ fontStyle: "italic" }}>
                  — Abubakar
                </span>
                <a
                  href="mailto:hallo@lyrvio.com"
                  className="mt-2 block font-mono text-[12px] uppercase tracking-[0.18em] text-ash hover:text-stamp transition-colors"
                >
                  hallo@lyrvio.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
