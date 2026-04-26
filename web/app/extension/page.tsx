import Link from "next/link";
import { Globe, Download, Check, ArrowRight, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const chromeSteps = [
  {
    step: "1",
    title: "Extension herunterladen",
    description: "Klicke auf den Chrome-Extension-Link. Du wirst zum Chrome Web Store weitergeleitet.",
  },
  {
    step: "2",
    title: "Installation bestätigen",
    description: "Klicke auf \"Zu Chrome hinzufügen\" und bestätige die Berechtigungen im Dialog.",
  },
  {
    step: "3",
    title: "Anmelden",
    description: "Öffne die Extension über das Puzzle-Icon in der Chrome-Toolbar und logge dich mit deiner Lyrvio-E-Mail ein.",
  },
  {
    step: "4",
    title: "Bot aktivieren",
    description: "Gehe zu deinem Lyrvio-Dashboard und klicke auf \"Bot aktivieren\". Fertig — der Bot läuft jetzt im Hintergrund.",
  },
];

const firefoxSteps = [
  {
    step: "1",
    title: "Add-on installieren",
    description: "Klicke auf den Firefox Add-on-Link. Du wirst zu addons.mozilla.org weitergeleitet.",
  },
  {
    step: "2",
    title: "Berechtigungen erlauben",
    description: "Klicke auf \"Zu Firefox hinzufügen\" und bestätige die notwendigen Berechtigungen.",
  },
  {
    step: "3",
    title: "Anmelden & aktivieren",
    description: "Öffne die Extension über die Add-on-Leiste, melde dich an und aktiviere den Bot im Dashboard.",
  },
];

export default function ExtensionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f]">
      <Nav />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300 mb-4">
              <Zap className="h-3.5 w-3.5 fill-indigo-400 text-indigo-400" />
              Setup in 2 Minuten
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Extension installieren
            </h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              Der Bot läuft direkt in deinem Browser — keine Server, keine AGB-Verletzung. Wähle deinen Browser.
            </p>
          </div>

          {/* Browser Selection */}
          <div className="grid sm:grid-cols-2 gap-6 mb-16">
            {/* Chrome */}
            <div className="rounded-2xl border border-indigo-500/40 bg-slate-900 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-indigo-600/20 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Chrome</h2>
                  <p className="text-sm text-slate-500">Empfohlen</p>
                </div>
              </div>
              <a
                href="https://chrome.google.com/webstore/detail/lyrvio/placeholder"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  size="lg"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/20 mb-4"
                >
                  <Download className="h-5 w-5" />
                  Chrome Extension installieren
                </Button>
              </a>
              <p className="text-xs text-slate-600 text-center">
                Kompatibel: Chrome 88+, Edge, Brave, Opera
              </p>
            </div>

            {/* Firefox */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-2xl bg-slate-800 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none">
                    <circle cx="12" cy="12" r="10" className="fill-orange-500" opacity="0.8" />
                    <circle cx="12" cy="12" r="6" className="fill-amber-400" opacity="0.6" />
                    <circle cx="12" cy="12" r="3" className="fill-orange-300" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Firefox</h2>
                  <p className="text-sm text-slate-500">Bald verfügbar (Beta)</p>
                </div>
              </div>
              <Button
                size="lg"
                variant="outline"
                className="w-full border-slate-700 text-slate-400"
                disabled
              >
                <Download className="h-5 w-5" />
                Firefox Add-on (demnächst)
              </Button>
              <p className="text-xs text-slate-600 text-center mt-4">
                Firefox-Version in Entwicklung. <Link href="/#preise" className="text-indigo-400 hover:text-indigo-300">Auf Warteliste setzen.</Link>
              </p>
            </div>
          </div>

          {/* Installation Steps Chrome */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
              <Globe className="h-6 w-6 text-indigo-400" />
              Chrome-Schritt-für-Schritt
            </h2>
            <div className="space-y-4">
              {chromeSteps.map((step, i) => (
                <div
                  key={i}
                  className="flex gap-5 p-5 rounded-xl border border-slate-800 bg-slate-900/50"
                >
                  <div className="h-10 w-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-indigo-400 font-bold text-sm">{step.step}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">{step.title}</h3>
                    <p className="text-sm text-slate-400">{step.description}</p>
                  </div>
                  {i < chromeSteps.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-slate-700 ml-auto mt-3 flex-shrink-0" />
                  )}
                  {i === chromeSteps.length - 1 && (
                    <Check className="h-4 w-4 text-emerald-400 ml-auto mt-3 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Permissions Explanation */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Shield className="h-5 w-5 text-indigo-400" />
              <h2 className="text-xl font-bold text-white">Welche Berechtigungen braucht die Extension?</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  permission: "Tabs lesen",
                  reason: "Um aktive ImmoScout/Immowelt-Tabs zu erkennen",
                  sensitive: false,
                },
                {
                  permission: "Seiteninhalte lesen",
                  reason: "Um neue Inserate auf Wohnungsportalen zu erkennen",
                  sensitive: false,
                },
                {
                  permission: "Lokaler Speicher",
                  reason: "Dein Profil bleibt lokal auf deinem Gerät",
                  sensitive: false,
                },
                {
                  permission: "Nachrichten senden",
                  reason: "Um Bewerbungen über Plattform-Messaging zu versenden",
                  sensitive: false,
                },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-medium text-slate-200">{item.permission}</span>
                  </div>
                  <p className="text-xs text-slate-500 pl-6">{item.reason}</p>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-600">
              Kein Zugriff auf: Passwörter, Zahlungsdaten, andere Browser-Tabs außer Wohnungsportale.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/dashboard">
              <Button size="xl" className="bg-indigo-600 hover:bg-indigo-700">
                Extension installiert — zum Dashboard
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
