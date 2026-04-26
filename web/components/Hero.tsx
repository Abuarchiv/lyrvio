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
  { ts: "03:14:35", type: "warten",   text: "#4779 · 47 Bewerber registriert",      meta: "ca. 2,3 d Antwort" },
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
        { text: `#${4780 - tick} · 124 Bewerber registriert`, meta: "ca. 1,8 d Antwort" },
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
        {/* Sub-Header — kurz, kein Akten-Jargon */}
        <div className="mb-10 lg:mb-12 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-7 flex items-center gap-4 flex-wrap">
            <span className="stamp-box">
              <span className="pulse" />
              Wohnungssuche 2026 · DACH-Großstädte
            </span>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:text-right">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ash">
              Berlin · Live · vor wenigen Sekunden
            </span>
          </div>
        </div>

        {/* MANIFEST-HEADLINE — klare Trennung zwischen Streichung und Ersatz */}
        <h1 className="manifest mb-10 reveal">
          Eine Wohnung
          <br />
          ist <em>vier Minuten</em> online —
          <br />
          dann ist sie <span className="korr-replace">weg.</span>
        </h1>

        {/* Plain-Sprech: Was Lyrvio konkret macht */}
        <div className="grid grid-cols-12 gap-6 lg:gap-12 mb-10 reveal reveal-1">
          <div className="col-span-12 lg:col-span-7">
            <p className="font-mono text-[16px] sm:text-[17px] leading-[1.6] text-ink max-w-[58ch]">
              <strong className="text-stamp">Lyrvio ist eine Browser-Erweiterung (ein kleines Gratis-Programm im Chrome- oder Firefox-Browser).</strong>{" "}
              Sie sucht rund um die Uhr auf ImmoScout24, Immowelt, Immonet
              und eBay-Kleinanzeigen. Sobald eine passende Wohnung online
              geht, schreibt Lyrvio in deinem Namen — <span className="marker">in 28 Sekunden, persönlich, mit deinem Profil.</span>{" "}
              Du landest auf Platz 2 statt auf Platz 487.
            </p>
          </div>
        </div>

        {/* Sub-Sektion mit CTA + Map */}
        <div className="grid grid-cols-12 gap-6 lg:gap-12 mb-12 reveal reveal-2">
          <div className="col-span-12 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-4">
              <Link href="/checkout?plan=aktiv" className="btn-primary cursor-stamp">
                Jetzt loslegen · 9 €/Monat
              </Link>
              <Link href="/protokoll" className="btn-secondary">
                So funktioniert's →
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-3 flex-wrap">
              <span className="tag -outline">Monatlich kündbar</span>
              <span className="tag -yellow">14 Tage Geld-zurück</span>
              <span className="tag -outline">Chrome + Firefox</span>
              <span className="tag -outline">DSGVO · DE-Hosting</span>
            </div>

            {/* Klare Plain-Sprech-Trio */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-5 border-t-2 border-ink pt-7">
              <Para n="01" titel="Das Problem"   body="487 Bewerbungen kommen im Schnitt pro 2-Zimmer-Wohnung in Berlin-Mitte rein." />
              <Para n="02" titel="Die Folge"     body="Wer nach einer Stunde schreibt, hat weniger als 1,6 % Chance auf eine Einladung." />
              <Para n="03" titel="Was Lyrvio macht" body="Schreibt in 28 Sekunden — nicht der Erste, aber lange vor dem Achten." />
            </div>
          </div>

          {/* RIGHT — Berlin Live-Map + Notiz */}
          <aside className="col-span-12 lg:col-span-5 relative">
            {/* Sideways-Label */}
            <span className="vertical-text absolute -left-6 top-0 hidden lg:inline-block">
              Berlin · live · {new Date().toLocaleDateString("de-DE")}
            </span>

            <BerlinMap />

            {/* Notiz unter der Karte */}
            <div className="mt-6 flex items-start gap-4">
              <span className="margin-note max-w-[22ch]">
                rote Pins: Lyrvio bewirbt sich gerade
              </span>
              <span className="margin-note max-w-[18ch]" style={{ transform: "rotate(1.5deg)", color: "var(--ink)" }}>
                gelbe Pins: neue Inserate
              </span>
            </div>
          </aside>
        </div>
      </div>

      {/* SO GEHT'S — 3 klare Schritte in Plain-Sprech */}
      <div className="border-t-2 border-ink bg-paper">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 lg:py-20">
          <div className="grid grid-cols-12 gap-8 mb-10">
            <div className="col-span-12 lg:col-span-5">
              <div className="label mb-3">Einrichtung</div>
              <h2 className="font-display text-[36px] sm:text-[52px] leading-[0.95] tracking-[-0.03em] text-ink">
                In 7&nbsp;Minuten
                <br />
                <em>einsatzbereit.</em>
              </h2>
            </div>
            <div className="col-span-12 lg:col-span-7 flex items-end">
              <p className="font-mono text-[14px] sm:text-[15px] leading-[1.6] text-ink max-w-[58ch]">
                Du musst nichts technisches können. Drei Schritte, sieben
                Minuten, dann läuft Lyrvio.{" "}
                <span className="marker">Du machst nichts mehr — Lyrvio schreibt.</span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <Step
              num="01"
              dauer="2 Min"
              titel="Erweiterung installieren"
              body="Ein Klick im Chrome- oder Firefox-Store. Lyrvio läuft in deinem eigenen Browser, nicht auf irgendwelchen Servern."
            />
            <Step
              num="02"
              dauer="5 Min"
              titel="Profil anlegen"
              body="Beruf, Einkommen, Schufa eintragen. Du unterschreibst digital, dass Lyrvio in deinem Namen schreiben darf — jederzeit widerrufbar."
            />
            <Step
              num="03"
              dauer="läuft 24/7"
              titel="Lyrvio sucht für dich"
              body="ImmoScout, Immowelt, Immonet, eBay-Kleinanzeigen. Bei einem Treffer: persönliches Anschreiben, sofort versendet, du bekommst Bescheid."
            />
          </div>
        </div>
      </div>

      {/* LIVE-FEED in eigener Sektion mit deutlichem Bruch */}
      <div className="border-t-2 border-ink bg-paper-2">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16">
          <div className="flex items-baseline justify-between mb-8 flex-wrap gap-4">
            <div>
              <div className="label mb-3">Live</div>
              <h2 className="font-display text-[32px] sm:text-[44px] tracking-[-0.025em] text-ink">
                Was Lyrvio <em>gerade</em> macht
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
      <div className="flex items-baseline gap-2 mb-2 flex-wrap">
        <span className="font-display text-[28px] text-stamp leading-none">{n}.</span>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink font-bold">
          {titel}
        </span>
      </div>
      <p className="font-mono text-[12.5px] leading-[1.65] text-ink">{body}</p>
    </div>
  );
}

function Step({
  num,
  dauer,
  titel,
  body,
}: {
  num: string;
  dauer: string;
  titel: string;
  body: string;
}) {
  return (
    <article className="border-2 border-ink bg-paper-warm p-6 lg:p-7 relative">
      <div className="flex items-baseline justify-between mb-4">
        <span className="step-num">{num}</span>
        <span className="tag -outline">{dauer}</span>
      </div>
      <h3 className="font-display text-[22px] sm:text-[26px] leading-[1.15] tracking-[-0.02em] text-ink mb-3">
        {titel}
      </h3>
      <p className="font-mono text-[13px] leading-[1.65] text-ink">{body}</p>
    </article>
  );
}

function pad(n: number) { return n.toString().padStart(2, "0"); }
function typeClass(t: Event["type"]) {
  return t === "neu" ? "ev-new" : t === "versandt" ? "ev-sent" : "ev-wait";
}
function labelFor(t: Event["type"]) {
  return t === "neu" ? "INSERAT" : t === "versandt" ? "VERSANDT" : "WARTEND";
}
