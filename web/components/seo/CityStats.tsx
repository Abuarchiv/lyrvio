import type { CityData } from "@/lib/cities";

interface CityStatsProps {
  city: CityData;
}

export function CityStats({ city }: CityStatsProps) {
  return (
    <section className="bg-paper-warm border-t-2 border-ink py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <span className="stamp-rotated">ANALYSE</span>
          <span className="label">Wie Lyrvio in {city.name} funktioniert</span>
        </div>

        <h2 className="font-display text-[32px] sm:text-[44px] leading-[1.1] tracking-[-0.03em] text-ink mb-4">
          Manuell vs. <em className="text-stamp">mit Lyrvio</em>
        </h2>
        <p className="font-mono text-[13px] text-ash mb-14 max-w-[60ch]">
          Lyrvio läuft als Browser-Extension auf deinem Computer und scannt{" "}
          {city.mainPlatforms.join(", ")} alle 30 Sekunden auf neue Inserate — auch nachts und am Wochenende.
        </p>

        <div className="grid md:grid-cols-2 gap-0 border-2 border-ink mb-14" style={{ boxShadow: "8px 8px 0 0 var(--ink)" }}>
          {/* Without Lyrvio */}
          <div className="border-b-2 md:border-b-0 md:border-r-2 border-ink p-8">
            <div className="akte-head mb-6" style={{ margin: "-2rem -2rem 1.5rem -2rem", boxShadow: "none" }}>
              <span>✕ Manuelle Suche in {city.name}</span>
            </div>
            <ul className="space-y-4 mt-8">
              {[
                `Ø ${city.waitTimeManualMonths} Monate Wartezeit`,
                "Täglich mehrmals Plattformen manuell prüfen",
                `${city.avgBewerber} Konkurrenten pro Wohnung`,
                "Wohnungen weg während du schläfst",
                "Bewerbung schreiben nimmt 20–30 Minuten",
                `${city.apartmentsPerDay} Inserate täglich — du schaffst einen Bruchteil`,
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 font-mono text-[13px] text-ink-2">
                  <span className="text-stamp font-bold mt-0.5 flex-shrink-0">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* With Lyrvio */}
          <div className="bg-paper-2 p-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ash mb-6 flex items-center gap-2">
              <span className="tag -sage">LYRVIO</span>
              <span>Mit Lyrvio in {city.name}</span>
            </div>
            <ul className="space-y-4">
              {[
                `Ø ${city.waitTimeWithLyrvioWeeks} Wochen bis erste Besichtigung`,
                "Lyrvio scannt 24/7 automatisch — ohne dein Zutun",
                "Bewerbung in < 30 Sekunden nach Veröffentlichung",
                "Wohnungen während des Schlafs gefunden",
                "Bewerbung in 4 Sekunden generiert und gesendet",
                `Alle ${city.mainPlatforms.length} Plattformen gleichzeitig`,
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 font-mono text-[13px] text-ink">
                  <span className="text-sage font-bold mt-0.5 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Platform Coverage */}
        <div className="border-2 border-ink bg-paper p-6">
          <p className="label mb-4">Abgedeckte Plattformen in {city.name}</p>
          <div className="flex flex-wrap gap-2">
            {city.mainPlatforms.map((platform) => (
              <div
                key={platform}
                className="tag -outline flex items-center gap-2"
              >
                <span className="pulse-dot" style={{ width: 6, height: 6, marginRight: 0 }} />
                {platform}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
