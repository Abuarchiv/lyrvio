import Link from "next/link";
import { MapPin } from "lucide-react";
import type { CityData } from "@/lib/cities";

interface DistrictListProps {
  city: CityData;
}

export function DistrictList({ city }: DistrictListProps) {
  const maxRent = Math.max(...city.topDistricts.map((d) => d.avgRentSqm));
  const minRent = Math.min(...city.topDistricts.map((d) => d.avgRentSqm));

  return (
    <section className="bg-paper-warm border-t-2 border-ink py-20">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <span className="stamp-rotated">BEZIRKE</span>
          <span className="label">{city.name} — Mietpreise 2026</span>
        </div>

        <h2 className="font-display text-[32px] sm:text-[44px] leading-[1.1] tracking-[-0.03em] text-ink mb-3">
          Beliebteste Bezirke
          <br />
          <em>in {city.name}</em>
        </h2>
        <p className="font-mono text-[12px] text-ash mb-12 max-w-[58ch]">
          Durchschnittliche Nettokaltmiete pro m² (Angebotsmieten 2026, Schätzwerte auf Basis verfügbarer Marktdaten)
        </p>

        <div className="border-2 border-ink bg-paper" style={{ boxShadow: "8px 8px 0 0 var(--ink)" }}>
          <div className="akte-head">
            <span>Mietpreis-Übersicht</span>
            <span className="text-dust font-mono text-[11px]">€/m² Nettokalt</span>
          </div>

          <div className="grid sm:grid-cols-2">
            {city.topDistricts.map((district, index) => {
              const percentage = ((district.avgRentSqm - minRent) / (maxRent - minRent)) * 100;
              const isExpensive = district.avgRentSqm >= (maxRent + minRent) / 2;

              return (
                <div
                  key={district.name}
                  className="akte-row border-r-0 border-b border-rule-soft last:border-b-0"
                  style={{ gridTemplateColumns: "2rem 1fr auto" }}
                >
                  <span className="font-mono text-[11px] text-ash">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <span className="font-display text-[17px] leading-none text-ink">{district.name}</span>
                    {/* Bar */}
                    <div className="h-[3px] w-full mt-2 bg-paper-3 overflow-hidden">
                      <div
                        className={isExpensive ? "h-full bg-stamp" : "h-full bg-sage"}
                        style={{ width: `${Math.max(15, percentage)}%` }}
                      />
                    </div>
                  </div>
                  <span className={`font-mono text-[13px] font-bold ${isExpensive ? "text-stamp" : "text-sage"}`}>
                    {district.avgRentSqm.toFixed(1)} €/m²
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Phase-2 district links if available */}
        {city.phase2Districts.length > 0 && (
          <div className="mt-10 border-2 border-ink bg-paper p-6">
            <p className="label mb-4">Detailierte Infos zu Top-Bezirken in {city.name}</p>
            <div className="flex flex-wrap gap-2">
              {city.phase2Districts.map((bezirk) => (
                <Link
                  key={bezirk}
                  href={`/wohnung-finden/${city.slug}/${bezirk.toLowerCase().replace(/\s+/g, "-").replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")}`}
                  className="tag -outline flex items-center gap-1.5 hover:bg-ink hover:text-paper transition-colors"
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
