"use client";

import { useEffect, useState } from "react";

const items = [
  "Berlin · 14 neue Inserate · letzte 60 Min",
  "München · 8 neue Inserate · letzte 60 Min",
  "Hamburg · 11 neue Inserate · letzte 60 Min",
  "Lyrvio · 1.247 Bewerbungen heute versandt",
  "Köln · 6 neue Inserate · letzte 60 Min",
  "ø Reaktionszeit · 28 Sekunden",
  "Frankfurt · 5 neue Inserate · letzte 60 Min",
  "Erfolgsquote Beta-User · 4,2× Median",
];

export function TopTicker() {
  const [count, setCount] = useState(1247);
  useEffect(() => {
    const i = setInterval(() => setCount((c) => c + 1), 7000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="border-b-2 border-ink bg-stamp text-paper overflow-hidden">
      <div className="flex items-center h-8">
        <span className="px-4 h-full inline-flex items-center bg-ink text-hi font-mono text-[10.5px] font-bold uppercase tracking-[0.22em] whitespace-nowrap">
          ● LIVE · {count.toLocaleString("de-DE")} Bewerbungen heute
        </span>
        <div className="overflow-hidden flex-1 relative">
          <div className="ticker-track ticker-track-fast font-mono text-[11px] uppercase tracking-[0.22em] py-2">
            {[...items, ...items, ...items].map((it, i) => (
              <span key={i} className="inline-flex items-center gap-3">
                <span className="text-paper opacity-70">◆</span>
                <span>{it}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
