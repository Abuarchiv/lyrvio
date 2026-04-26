/**
 * Magazin-Style Editorial-Strip oben auf der Seite.
 * Statt Marketing-Banner: Datum, Issue-Nr, Live-Indikator.
 */
export function IssueHeader() {
  const today = new Date().toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="border-b border-line bg-ink-2/40">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex h-9 items-center justify-between text-[11px] tracking-[0.18em] uppercase text-ash font-mono">
          <div className="flex items-center gap-4">
            <span className="text-bone-2">Lyrvio</span>
            <span className="text-dust hidden sm:inline">No. 001</span>
            <span className="text-dust hidden md:inline">·</span>
            <span className="text-dust hidden md:inline">{today}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="ticker-dot" />
            <span className="text-bone-2">Bot aktiv · 5 Plattformen</span>
          </div>
        </div>
      </div>
    </div>
  );
}
