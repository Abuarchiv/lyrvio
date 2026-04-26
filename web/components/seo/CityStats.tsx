import { CheckCircle, AlertCircle } from "lucide-react";
import type { CityData } from "@/lib/cities";

interface CityStatsProps {
  city: CityData;
}

export function CityStats({ city }: CityStatsProps) {
  return (
    <section className="py-20 border-t border-slate-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 text-center">
          Wie Lyrvio in {city.name} funktioniert
        </h2>
        <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
          Lyrvio läuft als Browser-Extension auf deinem Computer und scannt{" "}
          {city.mainPlatforms.join(", ")} alle 30 Sekunden auf neue Inserate — auch nachts und am Wochenende.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Without Lyrvio */}
          <div className="rounded-2xl border border-rose-500/20 bg-rose-500/5 p-6">
            <h3 className="text-lg font-semibold text-rose-300 mb-4 flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Manuelle Suche in {city.name}
            </h3>
            <ul className="space-y-3">
              {[
                `Ø ${city.waitTimeManualMonths} Monate Wartezeit`,
                "Täglich mehrmals Plattformen manuell prüfen",
                `${city.avgBewerber} Konkurrenten pro Wohnung`,
                "Wohnungen weg während du schläfst",
                "Bewerbung schreiben nimmt 20–30 Minuten",
                `${city.apartmentsPerDay} Inserate täglich — du schaffst einen Bruchteil`,
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
                  <span className="text-rose-500 mt-0.5">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* With Lyrvio */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <h3 className="text-lg font-semibold text-emerald-300 mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Mit Lyrvio in {city.name}
            </h3>
            <ul className="space-y-3">
              {[
                `Ø ${city.waitTimeWithLyrvioWeeks} Wochen bis erste Besichtigung`,
                "Bot scannt 24/7 automatisch — ohne dein Zutun",
                `Bewerbung in &lt; 30 Sekunden nach Veröffentlichung`,
                "Wohnungen während des Schlafs gefunden",
                "Bewerbung in 4 Sekunden generiert und gesendet",
                `Alle ${city.mainPlatforms.length} Plattformen gleichzeitig`,
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                  <CheckCircle className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Platform Coverage */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h3 className="text-base font-semibold text-white mb-4">
            Abgedeckte Plattformen in {city.name}
          </h3>
          <div className="flex flex-wrap gap-3">
            {city.mainPlatforms.map((platform) => (
              <div
                key={platform}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-300"
              >
                <div className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                {platform}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
