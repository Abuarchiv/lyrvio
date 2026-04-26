"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

type District = {
  id: string;
  label: string;
  x: number; // percent
  y: number; // percent
};

type CityData = {
  name: string;
  districts: District[];
};

const CITY_DATA: Record<string, CityData> = {
  berlin: {
    name: "Berlin",
    districts: [
      { id: "mitte", label: "Mitte", x: 50, y: 42 },
      { id: "prenzlauer_berg", label: "Prenzlauer Berg", x: 55, y: 32 },
      { id: "friedrichshain", label: "Friedrichshain", x: 62, y: 42 },
      { id: "kreuzberg", label: "Kreuzberg", x: 55, y: 52 },
      { id: "neukoelln", label: "Neukölln", x: 55, y: 64 },
      { id: "tempelhof", label: "Tempelhof", x: 48, y: 68 },
      { id: "schoeneberg", label: "Schöneberg", x: 42, y: 58 },
      { id: "charlottenburg", label: "Charlottenburg", x: 30, y: 42 },
      { id: "pankow", label: "Pankow", x: 52, y: 22 },
      { id: "lichtenberg", label: "Lichtenberg", x: 70, y: 38 },
      { id: "spandau", label: "Spandau", x: 18, y: 38 },
      { id: "treptow", label: "Treptow", x: 66, y: 60 },
    ],
  },
  muenchen: {
    name: "München",
    districts: [
      { id: "maxvorstadt", label: "Maxvorstadt", x: 46, y: 36 },
      { id: "schwabing", label: "Schwabing", x: 50, y: 25 },
      { id: "bogenhausen", label: "Bogenhausen", x: 65, y: 32 },
      { id: "haidhausen", label: "Haidhausen", x: 60, y: 50 },
      { id: "giesing", label: "Giesing", x: 58, y: 65 },
      { id: "neuhausen", label: "Neuhausen", x: 36, y: 40 },
      { id: "sendling", label: "Sendling", x: 44, y: 60 },
      { id: "pasing", label: "Pasing", x: 22, y: 50 },
      { id: "laim", label: "Laim", x: 30, y: 55 },
      { id: "milbertshofen", label: "Milbertshofen", x: 48, y: 18 },
    ],
  },
  hamburg: {
    name: "Hamburg",
    districts: [
      { id: "altona", label: "Altona", x: 30, y: 50 },
      { id: "eimsbüttel", label: "Eimsbüttel", x: 38, y: 38 },
      { id: "hamburg_nord", label: "Hamburg-Nord", x: 50, y: 30 },
      { id: "wandsbek", label: "Wandsbek", x: 66, y: 36 },
      { id: "bergedorf", label: "Bergedorf", x: 78, y: 62 },
      { id: "harburg", label: "Harburg", x: 46, y: 72 },
      { id: "hamburg_mitte", label: "Hamburg-Mitte", x: 48, y: 50 },
    ],
  },
  koeln: {
    name: "Köln",
    districts: [
      { id: "innenstadt", label: "Innenstadt", x: 50, y: 44 },
      { id: "ehrenfeld", label: "Ehrenfeld", x: 36, y: 38 },
      { id: "nippes", label: "Nippes", x: 48, y: 30 },
      { id: "lindenthal", label: "Lindenthal", x: 34, y: 52 },
      { id: "rodenkirchen", label: "Rodenkirchen", x: 44, y: 68 },
      { id: "kalk", label: "Kalk", x: 62, y: 50 },
      { id: "muelheim", label: "Mülheim", x: 66, y: 36 },
      { id: "chorweiler", label: "Chorweiler", x: 48, y: 18 },
    ],
  },
  frankfurt: {
    name: "Frankfurt",
    districts: [
      { id: "innenstadt", label: "Innenstadt", x: 50, y: 48 },
      { id: "sachsenhausen", label: "Sachsenhausen", x: 52, y: 62 },
      { id: "bockenheim", label: "Bockenheim", x: 38, y: 44 },
      { id: "nordend", label: "Nordend", x: 52, y: 34 },
      { id: "bornheim", label: "Bornheim", x: 62, y: 40 },
      { id: "westend", label: "Westend", x: 44, y: 40 },
      { id: "gallus", label: "Gallus", x: 36, y: 58 },
      { id: "fechenheim", label: "Fechenheim", x: 70, y: 50 },
    ],
  },
};

interface DistrictMapProps {
  city: string;
  selected: string[];
  onChange: (districts: string[]) => void;
}

export function DistrictMap({ city, selected, onChange }: DistrictMapProps) {
  const cityData = CITY_DATA[city];
  const [hovered, setHovered] = useState<string | null>(null);

  if (!cityData) {
    return (
      <div className="rounded-xl border border-slate-700 bg-slate-800/50 p-6 text-center text-slate-400 text-sm">
        Bezirk-Karte für diese Stadt noch nicht verfügbar.
        <p className="mt-1 text-xs text-slate-500">
          Bitte Bezirke manuell eingeben.
        </p>
      </div>
    );
  }

  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  const selectAll = () => onChange(cityData.districts.map((d) => d.id));
  const clearAll = () => onChange([]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-400">
          {selected.length === 0
            ? "Bezirke anklicken"
            : `${selected.length} Bezirk${selected.length !== 1 ? "e" : ""} ausgewählt`}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={selectAll}
            className="text-xs text-indigo-400 hover:text-indigo-300 underline"
            aria-label="Alle Bezirke auswählen"
          >
            Alle
          </button>
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-slate-500 hover:text-slate-400 underline"
            aria-label="Auswahl leeren"
          >
            Leeren
          </button>
        </div>
      </div>

      {/* Map canvas */}
      <div
        className="relative w-full aspect-[4/3] rounded-xl border border-slate-700 bg-slate-900 overflow-hidden"
        role="group"
        aria-label={`Bezirkskarte ${cityData.name}`}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800/30 to-slate-900 pointer-events-none" />

        {cityData.districts.map((d) => {
          const isSelected = selected.includes(d.id);
          const isHov = hovered === d.id;
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => toggle(d.id)}
              onMouseEnter={() => setHovered(d.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ left: `${d.x}%`, top: `${d.y}%` }}
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-150",
                "flex flex-col items-center gap-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 focus:ring-offset-slate-900 rounded"
              )}
              aria-pressed={isSelected}
              aria-label={`Bezirk ${d.label} ${isSelected ? "abwählen" : "auswählen"}`}
            >
              {/* Dot */}
              <div
                className={cn(
                  "rounded-full border-2 transition-all duration-150",
                  isSelected
                    ? "w-4 h-4 bg-indigo-500 border-indigo-400 shadow-lg shadow-indigo-500/40"
                    : isHov
                    ? "w-3.5 h-3.5 bg-slate-600 border-slate-400"
                    : "w-3 h-3 bg-slate-700 border-slate-600"
                )}
              />
              {/* Label */}
              <span
                className={cn(
                  "text-[9px] font-medium whitespace-nowrap leading-none transition-colors",
                  isSelected
                    ? "text-indigo-300"
                    : isHov
                    ? "text-slate-300"
                    : "text-slate-500"
                )}
              >
                {d.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected chips */}
      {selected.length > 0 && (
        <div
          className="flex flex-wrap gap-1.5"
          aria-label="Ausgewählte Bezirke"
        >
          {selected.map((id) => {
            const d = cityData.districts.find((x) => x.id === id);
            if (!d) return null;
            return (
              <span
                key={id}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs"
              >
                {d.label}
                <button
                  type="button"
                  onClick={() => toggle(id)}
                  className="hover:text-white"
                  aria-label={`${d.label} entfernen`}
                >
                  <X className="w-3 h-3" aria-hidden="true" />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
