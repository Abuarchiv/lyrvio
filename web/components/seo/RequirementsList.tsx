import type { CityData } from "@/lib/cities";

interface RequirementsListProps {
  city: CityData;
}

export function RequirementsList({ city }: RequirementsListProps) {
  return (
    <section className="bg-paper border-t-2 border-ink py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Requirements */}
          <div>
            <span className="label mb-6 block">Vermieter-Anforderungen {city.name}</span>
            <h2 className="font-display text-[28px] sm:text-[36px] leading-[1.15] tracking-[-0.025em] text-ink mb-3">
              Was Vermieter in {city.name}
              <br />
              <em>wirklich verlangen</em>
            </h2>
            <p className="font-mono text-[12px] text-ash mb-8">
              Das fordern die meisten Vermieter von Bewerbern
            </p>

            <ul className="space-y-0 border-t border-rule-soft">
              {city.typicalRequirements.map((req) => (
                <li key={req} className="flex items-start gap-3 py-3 border-b border-rule-soft font-mono text-[13px] text-ink-2">
                  <span className="text-stamp flex-shrink-0 mt-0.5">■</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lyrvio handles it */}
          <div className="akte" style={{ boxShadow: "8px 8px 0 0 var(--ink)" }}>
            <div className="akte-head">
              <span>Lyrvio erledigt das automatisch</span>
              <span className="tag -yellow">4 SEK</span>
            </div>

            <div className="p-6">
              <p className="font-mono text-[13px] leading-[1.75] text-ink-2 mb-6">
                Du legst dein Profil einmal an — mit Gehalt, Beruf, Einzugstermin und deinen Wohnwünschen.
                Lyrvio generiert für jede passende Wohnung in {city.name} ein personalisiertes Bewerbungsschreiben.
              </p>

              <ol className="space-y-3">
                {[
                  "Profil einmal anlegen",
                  "Lyrvio liest Vermieter-Anforderungen aus dem Inserat",
                  "Bewerbung in 4 Sekunden generiert (Claude Haiku)",
                  "Direkt über die Plattform gesendet",
                  "Du wirst bei Antwort sofort benachrichtigt",
                ].map((step, i) => (
                  <li key={step} className="flex items-start gap-3">
                    <span className="font-display text-[22px] leading-none text-stamp flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="font-mono text-[13px] text-ink pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
