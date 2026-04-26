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
    <section className="bg-paper border-t-2 border-ink py-20">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <span className="stamp-rotated">§ FAQ</span>
          <span className="label">Wohnungsmarkt {city.name}</span>
        </div>

        <h2 className="font-display text-[32px] sm:text-[44px] leading-[1.1] tracking-[-0.03em] text-ink mb-4">
          Häufige Fragen zur Wohnungssuche
          <br />
          <em>in {city.name}</em>
        </h2>
        <p className="font-mono text-[13px] text-ash mb-12 max-w-[52ch]">
          Alles was du über den Wohnungsmarkt in {city.name} wissen musst
        </p>

        <ol className="space-y-0 border-t-2 border-ink">
          {city.faq.map((item, index) => (
            <li
              key={index}
              className="border-b border-rule-soft"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left px-0 py-6 flex items-start justify-between gap-6 hover:bg-paper-warm transition-colors group"
                aria-expanded={openIndex === index}
              >
                <div className="flex items-start gap-4">
                  <span className="font-display text-[28px] leading-none text-stamp mt-1 select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-[18px] sm:text-[22px] leading-[1.25] tracking-[-0.02em] text-ink pt-1">
                    {item.question}
                  </span>
                </div>
                <ChevronDown
                  className={`h-5 w-5 text-ash flex-shrink-0 mt-2 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="pb-6 pl-14">
                  <p className="font-mono text-[13.5px] leading-[1.8] text-ink-2 max-w-[64ch]">
                    {item.answer}
                  </p>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
