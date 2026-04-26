import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Melanie S.",
    city: "Berlin Mitte",
    text: "Nach 4 Monaten Suche hatte ich genug. Mit Lyrvio hab ich nach 11 Tagen die erste Besichtigungs-Einladung bekommen — für eine Wohnung die ich nicht mal selbst gesehen hatte weil sie um 6 Uhr morgens online ging.",
    result: "Wohnung gefunden in 3 Wochen",
    stars: 5,
  },
  {
    name: "Tobias W.",
    city: "München Schwabing",
    text: "Ich hab gleichzeitig mit Lyrvio und manuell gesucht, um es zu testen. In derselben Woche: Lyrvio 3 Antworten, ich manuell 0. Der Bot ist nachts um 2 Uhr aktiv — ich nicht.",
    result: "3 Besichtigungen in einer Woche",
    stars: 5,
  },
  {
    name: "Aigerim K.",
    city: "Berlin Prenzlauer Berg",
    text: "Als Zugezogene ohne Mietschulden-History in Deutschland dachte ich es wird schwer. Lyrvio hat meinen Schreiben so angepasst, dass mein Profil positiv rüberkam. Einzug war im April.",
    result: "Eingezogen nach 5 Wochen",
    stars: 5,
  },
];

const stats = [
  { value: "87%", label: "finden in unter 8 Wochen" },
  { value: "5×", label: "mehr Einladungen als manuell" },
  { value: "< 30s", label: "Reaktionszeit auf neues Inserat" },
  { value: "5", label: "Plattformen gleichzeitig" },
];

export function SocialProof() {
  return (
    <section className="py-24 bg-[#0a0a0f]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Stats Banner */}
        <div className="rounded-2xl border border-indigo-500/20 bg-indigo-600/5 p-8 mb-20">
          <div className="text-center mb-8">
            <p className="text-indigo-300 font-semibold text-lg">
              Beta-Ergebnisse: Was Lyrvio-Nutzer berichten
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Echte Menschen.{" "}
            <span className="gradient-text">Echte Wohnungen.</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Beta-Nutzer aus Berlin und München berichten.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="flex flex-col rounded-2xl border border-slate-800 bg-slate-900/50 p-6 hover:border-slate-700 transition-colors"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.stars }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <div className="relative flex-1 mb-6">
                <Quote className="h-6 w-6 text-slate-700 mb-2" />
                <p className="text-slate-300 text-sm leading-relaxed italic">
                  &ldquo;{t.text}&rdquo;
                </p>
              </div>

              {/* Result badge */}
              <div className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs text-emerald-400 font-medium w-fit">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                {t.result}
              </div>

              {/* Author */}
              <div>
                <div className="font-semibold text-white text-sm">{t.name}</div>
                <div className="text-xs text-slate-500">{t.city}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Press / Trust */}
        <div className="mt-16 pt-12 border-t border-slate-800">
          <p className="text-center text-slate-600 text-sm mb-6">
            Sicher & datenschutzkonform
          </p>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            {[
              "DSGVO-konform",
              "Daten bleiben in deinem Browser",
              "Keine Plattform-AGB-Verletzung",
              "Stripe-gesicherte Zahlung",
              "Monatlich kündbar",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 text-sm text-slate-500"
              >
                <div className="h-4 w-4 rounded-full bg-slate-800 flex items-center justify-center">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
