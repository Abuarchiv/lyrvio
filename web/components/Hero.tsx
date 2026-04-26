import Link from "next/link";
import { ArrowRight, Zap, Clock, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 hero-gradient">
      {/* Background geometry */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-indigo-600/5 blur-3xl" />
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-violet-600/10 blur-2xl" />
        <div className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-indigo-500/10 blur-2xl" />

        {/* Grid pattern */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300">
            <Zap className="h-3.5 w-3.5 fill-indigo-400 text-indigo-400" />
            <span>Jetzt in Beta — limitierte Plätze</span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
            <span className="text-white">Lass den Bot</span>
            <br />
            <span className="gradient-text">bewerben.</span>
            <br />
            <span className="text-white">Sei der erste.</span>
          </h1>

          <p className="text-xl sm:text-2xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            In Berlin und München laufen{" "}
            <span className="text-slate-200 font-medium">800 Bewerbungen</span>{" "}
            pro Wohnung ein. Vermieter laden die ersten 8 ein. Lyrvio läuft{" "}
            <span className="text-slate-200 font-medium">24/7 in deinem Browser</span>{" "}
            und bewirbt sich sobald ein passendes Inserat live geht.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/#preise">
              <Button
                size="xl"
                className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30 w-full sm:w-auto"
              >
                Bot aktivieren — 79€/Mo
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

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="flex flex-col items-center gap-1 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="flex items-center gap-1.5 text-indigo-400">
                <Clock className="h-4 w-4" />
              </div>
              <div className="text-2xl font-bold text-white">&lt; 30s</div>
              <div className="text-xs text-slate-500 text-center">Reaktionszeit nach Inserat</div>
            </div>
            <div className="flex flex-col items-center gap-1 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-2xl font-bold text-white">5×</div>
              <div className="text-xs text-slate-500 text-center">mehr Besichtigungs-Einladungen</div>
            </div>
            <div className="flex flex-col items-center gap-1 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <div className="flex items-center gap-1.5 text-violet-400">
                <Zap className="h-4 w-4" />
              </div>
              <div className="text-2xl font-bold text-white">5</div>
              <div className="text-xs text-slate-500 text-center">Plattformen gleichzeitig</div>
            </div>
          </div>
        </div>

        {/* UI Preview / Abstract Visual */}
        <div className="mt-20 relative max-w-3xl mx-auto">
          <div className="animate-float rounded-2xl border border-slate-800 bg-slate-900/80 p-6 card-glow">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
              <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
              <div className="ml-2 h-2 w-48 rounded-full bg-slate-700" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <Zap className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-emerald-300">Neues Inserat gefunden</div>
                  <div className="text-xs text-slate-500">Prenzlauer Berg • 62m² • 1.150€ kalt</div>
                </div>
                <div className="ml-auto text-xs text-emerald-400 font-medium">vor 12s</div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                <div className="h-8 w-8 rounded-full bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <ArrowRight className="h-4 w-4 text-indigo-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-indigo-300">Bewerbung gesendet</div>
                  <div className="text-xs text-slate-500">Personalisiert mit deinem Profil</div>
                </div>
                <div className="ml-auto text-xs text-indigo-400 font-medium">vor 8s</div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4 text-slate-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-300">Warte auf Antwort</div>
                  <div className="text-xs text-slate-500">ImmoScout24 • Mitte</div>
                </div>
                <div className="ml-auto">
                  <div className="h-1.5 w-16 rounded-full bg-slate-700 overflow-hidden">
                    <div className="h-full w-2/3 rounded-full bg-indigo-500 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
