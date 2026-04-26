import { UserPlus, Chrome, BellRing } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Profil anlegen",
    description:
      "Du gibst dein Profil einmalig ein: Gehalt, Schufa-Score, Mappe-PDF, persönliches Anschreiben. Lyrvio speichert alles sicher in deinem Browser.",
    details: [
      "Name, Einkommen, Beruf",
      "Schufa-Score hochladen",
      "Bewerbungs-Mappe als PDF",
      "Persönliches Anschreiben",
    ],
  },
  {
    number: "02",
    icon: Chrome,
    title: "Extension installieren & Bot aktivieren",
    description:
      "Du installierst die Lyrvio Browser-Extension. Der Bot läuft dann 24/7 in deinem eigenen Browser-Account — keine Server, keine AGB-Verletzung.",
    details: [
      "Chrome oder Firefox Extension",
      "Scannt ImmoScout24, Immowelt, eBay-KA",
      "Reagiert in unter 30 Sekunden",
      "Läuft im Hintergrund",
    ],
  },
  {
    number: "03",
    icon: BellRing,
    title: "Einladungen empfangen",
    description:
      "Der Bot bewirbt sich auf passende Wohnungen mit deinem personalisierten Anschreiben. Du wirst sofort benachrichtigt wenn ein Vermieter antwortet.",
    details: [
      "Push-Benachrichtigung in Sekunden",
      "Email-Alert bei Antwort",
      "Dashboard mit allen Bewerbungen",
      "Besichtigungs-Tracking",
    ],
  },
];

export function HowItWorks() {
  return (
    <section id="wie-es-funktioniert" className="py-24 bg-[#0a0a0f]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-1.5 text-sm text-slate-400 mb-4">
            <span>Einfach wie bestellen</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            In 3 Schritten zur{" "}
            <span className="gradient-text">Wohnungsbesichtigung</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Setup dauert 10 Minuten. Danach läuft der Bot selbstständig — auch
            wenn du schläfst.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting lines (desktop) */}
          <div className="hidden md:block absolute top-12 left-1/3 right-1/3 h-px bg-gradient-to-r from-indigo-500/50 to-indigo-500/50" />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative">
                <div className="flex flex-col h-full rounded-2xl border border-slate-800 bg-slate-900/50 p-8 hover:border-indigo-500/40 transition-colors duration-300">
                  {/* Number + Icon */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <div className="h-12 w-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-indigo-400" />
                      </div>
                      <div className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
                        {i + 1}
                      </div>
                    </div>
                    <div className="text-4xl font-bold text-slate-800">
                      {step.number}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Detail list */}
                  <ul className="space-y-2 mt-auto">
                    {step.details.map((detail, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-slate-500">
                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Platform logos */}
        <div className="mt-16 text-center">
          <p className="text-sm text-slate-600 mb-6">Scannt automatisch alle großen Plattformen</p>
          <div className="flex flex-wrap justify-center gap-4 items-center">
            {[
              "ImmoScout24",
              "Immowelt",
              "eBay Kleinanzeigen",
              "Immonet",
              "Wunderflats",
            ].map((platform) => (
              <div
                key={platform}
                className="px-4 py-2 rounded-lg border border-slate-800 bg-slate-900 text-slate-500 text-sm font-medium"
              >
                {platform}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
