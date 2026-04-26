import Link from "next/link";
import { ArrowRight, Zap, Clock, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CityData } from "@/lib/cities";

interface CityHeroProps {
  city: CityData;
}

export function CityHero({ city }: CityHeroProps) {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-indigo-600/5 blur-3xl" />
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-violet-600/8 blur-2xl" />
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-city" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-city)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-300 transition-colors">Lyrvio</Link>
          <span>/</span>
          <Link href="/wohnung-finden" className="hover:text-slate-300 transition-colors">Wohnung finden</Link>
          <span>/</span>
          <span className="text-slate-300">{city.name}</span>
        </nav>

        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300">
            <Zap className="h-3.5 w-3.5 fill-indigo-400 text-indigo-400" />
            <span>{city.apartmentsPerDay} neue Inserate täglich in {city.name}</span>
          </div>
        </div>

        {/* H1 */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-6">
            <span className="text-white">Wohnungssuche in {city.name}:</span>
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Sei der erste der antwortet
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            In {city.name} bewerben sich bis zu{" "}
            <span className="text-slate-200 font-semibold">{city.avgBewerber} Personen</span>{" "}
            auf eine einzige Wohnung. Vermieter laden die ersten{" "}
            <span className="text-slate-200 font-semibold">5–8 Interessenten</span> ein — der Rest wartet.
            Lyrvio bewirbt sich in{" "}
            <span className="text-slate-200 font-semibold">unter 30 Sekunden</span> nach Veröffentlichung.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/checkout">
              <Button
                size="xl"
                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30 w-full sm:w-auto"
              >
                Jetzt aktiv suchen — 79€/Mo
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/#wie-es-funktioniert">
              <Button
                size="xl"
                variant="outline"
                className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white w-full sm:w-auto"
              >
                Wie funktioniert das?
              </Button>
            </Link>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-1.5 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="text-indigo-400"><Zap className="h-4 w-4" /></div>
            <div className="text-2xl font-bold text-white">{city.apartmentsPerDay}</div>
            <div className="text-xs text-slate-500 text-center">neue Inserate/Tag</div>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="text-rose-400"><Users className="h-4 w-4" /></div>
            <div className="text-2xl font-bold text-white">{city.avgBewerber}</div>
            <div className="text-xs text-slate-500 text-center">Bewerber/Wohnung</div>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <div className="text-amber-400"><Clock className="h-4 w-4" /></div>
            <div className="text-2xl font-bold text-white">{city.waitTimeManualMonths} Mo</div>
            <div className="text-xs text-slate-500 text-center">Wartezeit manuell</div>
          </div>
          <div className="flex flex-col items-center gap-1.5 p-4 rounded-xl bg-emerald-900/30 border border-emerald-700/30">
            <div className="text-emerald-400"><TrendingUp className="h-4 w-4" /></div>
            <div className="text-2xl font-bold text-emerald-300">{city.waitTimeWithLyrvioWeeks} Wo</div>
            <div className="text-xs text-emerald-600 text-center">mit Lyrvio</div>
          </div>
        </div>
      </div>
    </section>
  );
}
