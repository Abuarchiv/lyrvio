"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { CityData } from "@/lib/cities";

interface CityFAQProps {
  city: CityData;
}

export function CityFAQ({ city }: CityFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 border-t border-slate-800">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 text-center">
          Häufige Fragen zur Wohnungssuche in {city.name}
        </h2>
        <p className="text-slate-400 text-center mb-10">
          Alles was du über den Wohnungsmarkt in {city.name} wissen musst
        </p>

        <div className="space-y-3">
          {city.faq.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-800 bg-slate-900/40 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-5 py-4 flex items-start justify-between gap-4 hover:bg-slate-800/30 transition-colors"
                aria-expanded={openIndex === index}
              >
                <span className="font-medium text-white text-sm leading-relaxed">{item.question}</span>
                <ChevronDown
                  className={`h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-5 pb-4 border-t border-slate-800">
                  <p className="text-slate-400 text-sm leading-relaxed pt-4">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
