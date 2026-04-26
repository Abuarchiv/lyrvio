"use client";

const items = [
  "Pre-Launch · Beta-Plätze ab Mai 2026",
  "DACH · Berlin · München · Hamburg · Köln · Frankfurt",
  "9 €/Monat · monatlich kündbar",
  "14 Tage Geld-zurück · ohne Begründung",
  "Browser-Extension · Chrome + Firefox",
  "DSGVO · DE-Hosting · keine Server-Übergabe",
];

export function TopTicker() {
  return (
    <div className="border-b-2 border-ink bg-stamp text-paper overflow-hidden">
      <div className="flex items-center h-8">
        <span className="px-4 h-full inline-flex items-center bg-ink text-hi font-mono text-[10.5px] font-bold uppercase tracking-[0.22em] whitespace-nowrap">
          ● PRE-LAUNCH · Beta startet Mai 2026
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
