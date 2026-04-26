import Link from "next/link";
import { MapPin, TrendingUp } from "lucide-react";
import type { CityData } from "@/lib/cities";

interface DistrictListProps {
  city: CityData;
}

export function DistrictList({ city }: DistrictListProps) {
  const maxRent = Math.max(...city.topDistricts.map((d) => d.avgRentSqm));
  const minRent = Math.min(...city.topDistricts.map((d) => d.avgRentSqm));

  return (
    <section className="py-20 border-t border-slate-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-start gap-3 mb-4">
          <MapPin className="h-6 w-6 text-indigo-400 flex-shrink-0 mt-1" />
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Beliebteste Bezirke in {city.name}
            </h2>
            <p className="text-slate-400 mt-2">
              Durchschnittliche Nettokaltmiete pro m² (Angebotsmieten 2026, Schätzwerte auf Basis verfügbarer Marktdaten)
            </p>
          </div>
        </div>

        <div className="mt-8 grid sm:grid-cols-2 gap-4">
          {city.topDistricts.map((district, index) => {
            const percentage = ((district.avgRentSqm - minRent) / (maxRent - minRent)) * 100;
            const isExpensive = district.avgRentSqm >= (maxRent + minRent) / 2;

            return (
              <div
                key={district.name}
                className="rounded-xl border border-slate-800 bg-slate-900/40 p-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-600 font-mono w-5">{index + 1}</span>
                    <span className="font-medium text-white">{district.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp
                      className={`h-3.5 w-3.5 ${isExpensive ? "text-rose-400" : "text-emerald-400"}`}
                    />
                    <span className={`text-sm font-semibold ${isExpensive ? "text-rose-300" : "text-emerald-300"}`}>
                      {district.avgRentSqm.toFixed(1)} €/m²
                    </span>
                  </div>
                </div>
                {/* Bar */}
                <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${isExpensive ? "bg-rose-500/60" : "bg-emerald-500/60"}`}
                    style={{ width: `${Math.max(20, percentage)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Phase-2 district links if available */}
        {city.phase2Districts.length > 0 && (
          <div className="mt-8 p-4 rounded-xl border border-indigo-500/20 bg-indigo-500/5">
            <p className="text-sm text-slate-400 mb-3">
              Detailierte Infos zu Top-Bezirken in {city.name}:
            </p>
            <div className="flex flex-wrap gap-2">
              {city.phase2Districts.map((bezirk) => (
                <Link
                  key={bezirk}
                  href={`/wohnung-finden/${city.slug}/${bezirk.toLowerCase().replace(/\s+/g, "-").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-sm text-indigo-300 hover:bg-indigo-500/20 transition-colors"
                >
                  <MapPin className="h-3 w-3" />
                  {bezirk}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
