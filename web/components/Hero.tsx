"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BerlinMap } from "./BerlinMap";

type Event = {
  ts: string;
  type: "neu" | "versandt" | "warten";
  text: string;
  meta?: string;
};

const seed: Event[] = [
  { ts: "03:14:02", type: "neu",      text: "2-Zi · Mitte · 62 m² · 1.150 €",       meta: "ImmoScout" },
  { ts: "03:14:14", type: "versandt", text: "#4781 · Anschreiben in 3,2 s",         meta: "Pos. 02" },
  { ts: "03:14:18", type: "neu",      text: "3-Zi · P-Berg · 84 m² · 1.420 €",      meta: "Immowelt" },
  { ts: "03:14:22", type: "versandt", text: "#4782 · Anschreiben in 2,9 s",         meta: "Pos. 01" },
  { ts: "03:14:35", type: "warten",   text: "#4779 · 47 Bewerber registriert",      meta: "ø Antw. 2,3 d" },
  { ts: "03:14:48", type: "neu",      text: "1-Zi · Friedrichshain · 38 m² · 720 €", meta: "eBay-K." },
  { ts: "03:14:52", type: "versandt", text: "#4783 · Anschreiben in 4,1 s",         meta: "Pos. 03" },
];

export function Hero() {
  const [rows, setRows] = useState<Event[]>(seed);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 4500);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    if (tick === 0) return;
    const now = new Date();
    const ts = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const types: Event["type"][] = ["neu", "versandt", "neu", "versandt", "warten"];
    const type = types[tick % types.length] ?? "neu";
    const samples: Record<Event["type"], { text: string; meta: string }[]> = {
      neu: [
        { text: "2-Zi · Schöneberg · 58 m² · 1.080 €", meta: "ImmoScout" },
        { text: "1-Zi · Wedding · 42 m² · 690 €",       meta: "Immowelt" },
        { text: "3-Zi · Neukölln · 78 m² · 1.290 €",    meta: "eBay-K." },
        { text: "WG · Kreuzberg · 18 m² · 540 €",        meta: "wg-gesucht" },
      ],
      versandt: [
        { text: `#${4783 + tick} · Anschreiben in 2,7 s`, meta: "Pos. 01" },
        { text: `#${4783 + tick} · Anschreiben in 3,4 s`, meta: "Pos. 02" },
        { text: `#${4783 + tick} · Anschreiben in 4,1 s`, meta: "Pos. 04" },
      ],
      warten: [
        { text: `#${4780 - tick} · 124 Bewerber registriert`, meta: "ø Antw. 1,8 d" },
        { text: `#${4779 - tick} · Vermieter angesehen`,       meta: "vor 2 h" },
      ],
    };
    const pool = samples[type];
    const pick = pool[tick % pool.length] ?? pool[0]!;
    setRows((r) => [{ ts, type, text: pick.text, meta: pick.meta }, ...r].slice(0, 9));
  }, [tick]);

  return (
    <section className="relative">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-12 pb-16 lg:pt-16 lg:pb-20">
        {/* Akten-Kopfzeile */}
        <div className="mb-10 lg:mb-14 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-7 flex items-center gap-4 flex-wrap">
            <span className="stamp-box">
              <span className="pulse" />
              Akte LYR-2026/042 · Wohnungskrieg
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
              §&nbsp;Manifest
            </span>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:text-right">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
              Berlin · Stand: vor wenigen Sekunden
            </span>
          </div>
        </div>

        {/* MANIFEST-HEADLINE mit Korrektur-Marks */}
        <h1 className="manifest mb-10 reveal">
          Eine Wohnung
          <br />
          ist <em>vier Minuten</em> online.
          <br />
          Du <span className="korr">kämpfst</span>{" "}
          <span className="korr-replace">verlierst.</span>
        </h1>

        {/* Untertitel-Zeile + Berlin-Map */}
        <div className="grid grid-cols-12 gap-6 lg:gap-12 mb-12 reveal reveal-1">
          <div className="col-span-12 lg:col-span-7">
            <p className="font-mono text-[15px] leading-[1.7] text-ink max-w-[58ch]">
              200 bis 800 Bewerbungen pro Inserat. Vermieter laden die ersten
              acht ein. Wer nicht innerhalb von Minuten schreibt, wird nicht
              gelesen. Lyrvio ist kein Helfer. Lyrvio ist die{" "}
              <span className="marker">Waffe</span>, die für dich schießt —
              auch um 03:14&nbsp;Uhr, auch im Meeting, auch wenn du nicht kannst.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href="/checkout?plan=aktiv" className="btn-primary cursor-stamp">
                Bot beauftragen · 79 €/Mo
              </Link>
              <Link href="/protokoll" className="btn-secondary">
                Protokoll lesen →
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-3 flex-wrap">
              <span className="tag -outline">Monatlich kündbar</span>
              <span className="tag -yellow">299 € erst bei Mietvertrag</span>
              <span className="tag -outline">Chrome + Firefox</span>
            </div>

            {/* § Befund - Folge - Eingriff in horizontaler Reihe */}
            <div className="mt-12 grid grid-cols-3 gap-5 border-t-2 border-ink pt-6">
              <Para n="01" titel="Befund" body="487 Bewerbungen im Median pro 2-Zi-Inserat in Berlin-Mitte." />
              <Para n="02" titel="Folge"  body="Wer nach 60 Min schreibt, hat unter 1,6 % Einladungs-Chance." />
              <Para n="03" titel="Eingriff" body="Lyrvio reagiert in 28 s. Nicht der Erste — lange vor dem Achten." />
            </div>
          </div>

          {/* RIGHT — Berlin Live-Map + Marginalia */}
          <aside className="col-span-12 lg:col-span-5 relative">
            {/* Sideways-Label */}
            <span className="vertical-text absolute -left-6 top-0 hidden lg:inline-block">
              Live · Karte · Berlin · {new Date().toLocaleDateString("de-DE")}
            </span>

            <BerlinMap />

            {/* Marginalie unter der Karte */}
            <div className="mt-6 flex items-start gap-4">
              <span className="margin-note max-w-[20ch]">
                rote Pins = Bot bewirbt sich gerade
              </span>
              <span className="margin-note max-w-[18ch]" style={{ transform: "rotate(1.5deg)", color: "var(--ink)" }}>
                gelbe Pins = neues Inserat
              </span>
            </div>
          </aside>
        </div>
      </div>

      {/* LIVE-FEED in eigener Sektion mit deutlichem Bruch */}
      <div className="border-t-2 border-ink bg-paper-2">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16">
          <div className="flex items-baseline justify-between mb-8 flex-wrap gap-4">
            <div>
              <div className="label mb-3">§ Live-Stream</div>
              <h2 className="font-display text-[32px] sm:text-[44px] tracking-[-0.025em] text-ink">
                Was der Bot <em>jetzt</em> tut
              </h2>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
              Beispiel-Stream · keine echten Inserate
            </span>
          </div>

          <div className="feed">
            <div className="feed-header">
              <span>UHR · TYP · INHALT</span>
              <span className="hidden sm:inline">QUELLE / POSITION</span>
            </div>
            {rows.map((r, idx) => (
              <div key={`${r.ts}-${idx}`} className={`feed-row ${idx === 0 ? "fresh" : ""}`}>
                <span className="ts">[{r.ts}]</span>
                <span>
                  <span className={typeClass(r.type)}>{labelFor(r.type)}</span>
                  <span className="meta"> · {r.text}</span>
                  {idx === 0 && <span className="cursor-blink" />}
                </span>
                <span className="right">{r.meta}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Para({ n, titel, body }: { n: string; titel: string; body: string }) {
  return (
    <div>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="font-display text-[28px] text-stamp leading-none">§ {n}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ash">
          {titel}
        </span>
      </div>
      <p className="font-mono text-[12.5px] leading-[1.65] text-ink">{body}</p>
    </div>
  );
}

function pad(n: number) { return n.toString().padStart(2, "0"); }
function typeClass(t: Event["type"]) {
  return t === "neu" ? "ev-new" : t === "versandt" ? "ev-sent" : "ev-wait";
}
function labelFor(t: Event["type"]) {
  return t === "neu" ? "INSERAT" : t === "versandt" ? "VERSANDT" : "WARTEND";
}
