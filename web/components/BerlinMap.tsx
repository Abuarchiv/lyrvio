"use client";

import { useEffect, useState } from "react";

type Pin = {
  x: number;
  y: number;
  bezirk: string;
  type: "neu" | "ver";
};

const pins: Pin[] = [
  { x: 48, y: 38, bezirk: "Mitte",          type: "neu" },
  { x: 56, y: 36, bezirk: "P-Berg",         type: "ver" },
  { x: 38, y: 46, bezirk: "Charlottenb.",   type: "neu" },
  { x: 60, y: 50, bezirk: "Friedrichsh.",   type: "ver" },
  { x: 52, y: 60, bezirk: "Neukölln",       type: "neu" },
  { x: 42, y: 32, bezirk: "Wedding",        type: "ver" },
  { x: 65, y: 42, bezirk: "Lichtenberg",    type: "neu" },
  { x: 36, y: 58, bezirk: "Schöneberg",     type: "ver" },
  { x: 50, y: 25, bezirk: "Pankow",         type: "neu" },
];

export function BerlinMap() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setTick((t) => t + 1), 1700);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="relative border-2 border-ink bg-paper-warm overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
      {/* Akten-Header */}
      <div className="absolute top-0 inset-x-0 z-10 flex justify-between items-center px-3 py-2 border-b border-rule-soft bg-paper">
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
          ■ Berlin · Inserate-Karte
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-stamp">
          live · {String(tick % 60).padStart(2, "0")}″
        </span>
      </div>

      {/* Stilisierte Berlin-Form (vereinfacht) */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        {/* Grid */}
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1a1815" strokeWidth="0.15" opacity="0.18" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill="url(#grid)" />

        {/* Berlin-Umriss (vereinfacht) */}
        <path
          d="M 25 30 L 35 22 L 48 18 L 58 20 L 68 24 L 75 32 L 78 42 L 76 52 L 72 62 L 65 70 L 55 75 L 45 76 L 35 72 L 28 65 L 23 55 L 22 45 L 23 36 Z"
          fill="rgba(26, 24, 21, 0.04)"
          stroke="#1a1815"
          strokeWidth="0.6"
        />

        {/* Spree-Linie */}
        <path
          d="M 22 45 Q 38 52 48 50 T 78 42"
          fill="none"
          stroke="#1a1815"
          strokeWidth="0.8"
          strokeDasharray="1.5 1.5"
          opacity="0.4"
        />
      </svg>

      {/* Pins */}
      {pins.map((p, i) => {
        const isActive = (tick + i) % 3 === 0;
        return (
          <div
            key={i}
            className={`pin ${p.type === "neu" ? "-yellow" : ""}`}
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              animationDelay: `${(i % 5) * 0.3}s`,
              opacity: isActive ? 1 : 0.65,
            }}
          >
            <span
              className="absolute font-mono text-[9px] font-bold uppercase tracking-[0.12em] whitespace-nowrap"
              style={{
                left: 14,
                top: -2,
                color: p.type === "neu" ? "var(--ink)" : "var(--stamp)",
                background: p.type === "neu" ? "var(--hi)" : "var(--paper)",
                padding: "1px 5px",
                border: p.type === "ver" ? "1px solid var(--stamp)" : "none",
              }}
            >
              {p.bezirk}
            </span>
          </div>
        );
      })}

      {/* Legende */}
      <div className="absolute bottom-0 inset-x-0 z-10 flex justify-between items-center px-3 py-2 border-t border-rule-soft bg-paper font-mono text-[10px] uppercase tracking-[0.18em]">
        <span className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 bg-hi border border-ink" />
          Inserat neu
        </span>
        <span className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 bg-stamp border border-ink rounded-full" />
          Lyrvio bewirbt
        </span>
      </div>
    </div>
  );
}
