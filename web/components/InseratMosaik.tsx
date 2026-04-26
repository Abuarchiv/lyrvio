const items = [
  { stadt: "Berlin",   bezirk: "Mitte",        zi: "2-Zi",  m2: "62 m²", miete: "1.150 €", n: "487", state: "neu" },
  { stadt: "Berlin",   bezirk: "P-Berg",       zi: "3-Zi",  m2: "84 m²", miete: "1.420 €", n: "612", state: "weg" },
  { stadt: "München",  bezirk: "Schwabing",    zi: "2-Zi",  m2: "68 m²", miete: "1.840 €", n: "743", state: "neu" },
  { stadt: "Hamburg",  bezirk: "Eimsbüttel",   zi: "1-Zi",  m2: "42 m²", miete: "920 €",   n: "318", state: "weg" },
  { stadt: "Berlin",   bezirk: "Friedrichsh.", zi: "2-Zi",  m2: "55 m²", miete: "1.080 €", n: "529", state: "neu" },
  { stadt: "Köln",     bezirk: "Ehrenfeld",    zi: "3-Zi",  m2: "78 m²", miete: "1.290 €", n: "284", state: "weg" },
  { stadt: "Frankfurt",bezirk: "Bornheim",     zi: "2-Zi",  m2: "60 m²", miete: "1.180 €", n: "356", state: "neu" },
  { stadt: "Berlin",   bezirk: "Neukölln",     zi: "WG",    m2: "18 m²", miete: "540 €",   n: "201", state: "weg" },
  { stadt: "München",  bezirk: "Sendling",     zi: "1-Zi",  m2: "38 m²", miete: "1.060 €", n: "412", state: "neu" },
];

export function InseratMosaik() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
      {items.map((it, i) => (
        <article
          key={i}
          className="inserat relative opacity-80"
          style={{ transform: `rotate(${[(i % 3) - 1] * 0.6}deg)` }}
        >
          {/* DEMO watermark diagonal */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-[13px] font-bold uppercase tracking-[0.3em] text-stamp/20 rotate-[-28deg] select-none"
          >
            DEMO
          </span>

          <span className={`stamp-corner ${it.state === "weg" ? "" : it.state === "neu" ? "-yellow" : "-sage"}`}>
            {it.state === "weg" ? "VOLL" : "NEU"}
          </span>
          <div className="head">
            <span>{it.stadt} · {it.bezirk}</span>
            <span>#{1000 + i}</span>
          </div>
          <div className="title">
            {it.zi} · {it.m2} · {it.miete}
          </div>
          <div className="meta">
            {it.n} Bewerbungen registriert
          </div>
          <div className="border-t border-rule-soft mt-1 pt-2 flex justify-between font-mono text-[10.5px] uppercase tracking-[0.18em] text-ash">
            <span>ca. {1 + (i % 3)} Tg Antwort</span>
            <span className={it.state === "weg" ? "text-stamp font-bold" : "text-sage font-bold"}>
              {it.state === "weg" ? "● raus" : "● aktiv"}
            </span>
          </div>
        </article>
      ))}
    </div>
  );
}
