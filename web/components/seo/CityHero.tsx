import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CityData } from "@/lib/cities";

interface CityHeroProps {
  city: CityData;
}

export function CityHero({ city }: CityHeroProps) {
  return (
    <section className="bg-paper border-b-2 border-ink pt-28 pb-16">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ash mb-10">
          <Link href="/" className="hover:text-ink transition-colors">Lyrvio</Link>
          <span>/</span>
          <Link href="/wohnung-finden" className="hover:text-ink transition-colors">Wohnung finden</Link>
          <span>/</span>
          <span className="text-ink">{city.name}</span>
        </nav>

        {/* Stamp + Eyebrow */}
        <div className="flex items-center gap-4 mb-10 flex-wrap">
          <span className="stamp-rotated">24/7 BOT</span>
          <span className="label">{city.apartmentsPerDay} neue Inserate täglich in {city.name}</span>
        </div>

        {/* H1 */}
        <h1 className="manifest mb-8">
          Wohnungssuche<br />
          in {city.name}:<br />
          <em className="stamped">Sei der erste.</em>
        </h1>

        <p className="font-mono text-[15px] leading-[1.75] text-ink-2 max-w-[60ch] mb-10">
          In {city.name} bewerben sich bis zu{" "}
          <span className="marker">{city.avgBewerber} Personen</span>{" "}
          auf eine einzige Wohnung. Vermieter laden die ersten 5–8 Interessenten ein — der Rest wartet.
          Lyrvio bewirbt sich in{" "}
          <span className="marker">unter 30 Sekunden</span> nach Veröffentlichung.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link href="/checkout" className="btn-primary">
            Jetzt aktiv suchen — 9€/Mo
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/#wie-es-funktioniert" className="btn-secondary">
            Wie funktioniert das?
          </Link>
        </div>

        {/* Key Stats — Akte-Style */}
        <div className="akte max-w-2xl">
          <div className="akte-head">
            <span>Stadt-Akte: {city.name}</span>
            <span className="text-dust font-mono text-[11px]">Marktdaten 2026</span>
          </div>
          <div className="akte-row" style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr" }}>
            <div>
              <div className="font-display text-[32px] leading-none tracking-[-0.03em] text-ink">{city.apartmentsPerDay}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ash mt-1">Inserate/Tag</div>
            </div>
            <div>
              <div className="font-display text-[32px] leading-none tracking-[-0.03em] text-stamp">{city.avgBewerber}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ash mt-1">Bewerber/Whg</div>
            </div>
            <div>
              <div className="font-display text-[32px] leading-none tracking-[-0.03em] text-ink">{city.waitTimeManualMonths} Mo</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ash mt-1">Wartezeit manuell</div>
            </div>
            <div>
              <div className="font-display text-[32px] leading-none tracking-[-0.03em] text-sage">{city.waitTimeWithLyrvioWeeks} Wo</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.14em] text-ash mt-1">mit Lyrvio</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
