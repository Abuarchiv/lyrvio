"use client";

import { useEffect, useRef, useState } from "react";

export function SlamCounter() {
  const [count, setCount] = useState(247);
  const [flash, setFlash] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const i = setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 3) + 1);
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 600);
      return () => clearTimeout(t);
    }, 3500);
    return () => clearInterval(i);
  }, []);

  return (
    <section className="invert border-y-2 border-ink relative overflow-hidden">
      {/* Diagonal-Streifen Akzent oben/unten */}
      <div className="absolute inset-x-0 top-0 h-1.5 diagonal-yellow opacity-90" />
      <div className="absolute inset-x-0 bottom-0 h-1.5 diagonal-yellow opacity-90" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="col-span-12 lg:col-span-7">
            <div className="label !text-paper-2 mb-6">
              <span style={{ color: "var(--hi)" }}>■</span>
              Während du das hier liest
            </div>
            <h2 className="font-display text-[40px] sm:text-[60px] lg:text-[80px] leading-[0.95] tracking-[-0.035em] text-paper">
              Hat ein Vermieter
              <br />
              gerade <em className="accent">die ersten acht</em>
              <br />
              ausgesucht.
            </h2>
            <p className="mt-8 font-mono text-[14px] leading-[1.7] text-paper-2 max-w-[58ch]">
              In den letzten <span className="accent font-bold">5 Minuten</span>{" "}
              wurden in den vier größten deutschen Städten{" "}
              <span className="accent font-bold">{count} Wohnungs-Inserate</span>{" "}
              veröffentlicht. <span className="text-paper">Alle bis 22:00 Uhr</span>{" "}
              voll. Wer in den nächsten 4 Minuten nicht schreibt, ist raus.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-5 lg:text-right">
            <div className="label !text-paper-2 mb-3 lg:justify-end">
              <span style={{ color: "var(--hi)" }}>■</span>
              Live-Zähler · DACH gesamt
            </div>
            <div
              ref={ref}
              className={`big-num text-paper font-display ${flash ? "counter-flash" : ""}`}
              style={{ color: flash ? "var(--hi)" : "var(--paper)" }}
            >
              {count}
            </div>
            <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-paper-2">
              Inserate · letzte 5 Min · {new Date().toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
