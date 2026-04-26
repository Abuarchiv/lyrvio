import { FileText, CheckCircle2 } from "lucide-react";
import type { CityData } from "@/lib/cities";

interface RequirementsListProps {
  city: CityData;
}

export function RequirementsList({ city }: RequirementsListProps) {
  return (
    <section className="py-20 border-t border-slate-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Requirements */}
          <div>
            <div className="flex items-start gap-3 mb-6">
              <FileText className="h-6 w-6 text-indigo-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Häufige Vermieter-Anforderungen in {city.name}
                </h2>
                <p className="text-slate-400 text-sm mt-2">
                  Das verlangen die meisten Vermieter von Bewerbern
                </p>
              </div>
            </div>

            <ul className="space-y-3">
              {city.typicalRequirements.map((req) => (
                <li key={req} className="flex items-start gap-3 p-3 rounded-lg bg-slate-900/40 border border-slate-800">
                  <CheckCircle2 className="h-4 w-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lyrvio handles it */}
          <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 p-6">
            <h3 className="text-lg font-semibold text-white mb-3">
              Lyrvio erstellt das Bewerbungspaket automatisch
            </h3>
            <p className="text-slate-400 text-sm mb-5 leading-relaxed">
              Du legst dein Profil einmal an — mit Gehalt, Beruf, Einzugstermin und deinen Wohnwünschen.
              Lyrvio generiert dann für jede passende Wohnung in {city.name} ein personalisiertes Bewerbungsschreiben,
              das genau auf die Anforderungen des Vermieters eingeht.
            </p>

            <div className="space-y-2.5">
              {[
                "Profil einmal anlegen",
                "Bot liest Vermieter-Anforderungen aus dem Inserat",
                "Bewerbung in 4 Sekunden generiert (Claude Haiku)",
                "Direkt über die Plattform gesendet",
                "Du wirst bei Antwort sofort benachrichtigt",
              ].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-xs text-indigo-300 flex items-center justify-center font-medium">
                    {i + 1}
                  </span>
                  <span className="text-sm text-slate-300">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
