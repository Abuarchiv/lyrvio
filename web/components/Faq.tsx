"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Verletzt Lyrvio die AGB der Wohnungsportale?",
    answer:
      "Nein. Der Bot läuft ausschließlich in deinem eigenen Browser mit deinem eigenen Account — wie wenn du selbst auf dem Portal surfst. Es gibt keinen Zugriff auf Portale über unsere Server. Du bevollmächtigst Lyrvio in den AGB, Bewerbungen in deinem Namen zu versenden. Dieses Vollmacht-Modell ist rechtlich abgesichert.",
  },
  {
    question: "Was passiert mit meinen persönlichen Daten?",
    answer:
      "Dein Profil (Name, Gehalt, Schufa etc.) wird lokal in der Browser-Extension gespeichert und verlässt dein Gerät nur wenn du eine Bewerbung sendest — dann direkt an den Vermieter. Lyrvio speichert auf unseren Servern nur: deine Email (Login), Bewerbungs-Statistiken, und ob du aktiv/inaktiv bist. Keine Dokumente, keine sensiblen Daten. DSGVO-konform, Server in Deutschland.",
  },
  {
    question: "Wie personalisiert sind die Bewerbungen?",
    answer:
      "Sehr. Der Bot analysiert den Inserat-Text und extrahiert was dem Vermieter wichtig ist (Haustiere, Kinder, Beruf, Einzugstermin etc.). Dann generiert er ein Anschreiben das auf diese Punkte eingeht und dein Profil optimal präsentiert. Du kannst mehrere Anschreiben-Variationen hinterlegen und das System wählt das passendste.",
  },
  {
    question: "Was wenn ich selbst auch suche — doppelt sich das nicht?",
    answer:
      "Nein, es addiert sich. Lyrvio ist dein 24/7-Assistent. Du kannst weiterhin tagsüber selbst suchen. Der Bot füllt die Lücken: nachts, am Wochenende, wenn du in einem Meeting bist. Viele erfolgreiche Nutzer kombinieren beides.",
  },
  {
    question: "Wann genau wird der Erfolgs-Bonus fällig?",
    answer:
      "Nur wenn du einen Mietvertrag unterzeichnest für eine Wohnung bei der Lyrvio die Bewerbung versendet hat. Du gibst uns Bescheid (mit Nachweis), dann wird die einmalige Zahlung von 299€ ausgelöst. Kein Vertrag = kein Bonus. Ehrlicher Deal.",
  },
  {
    question: "Wie schnell reagiert der Bot auf neue Inserate?",
    answer:
      "Unter 30 Sekunden nach Erscheinen des Inserats. Die Extension prüft alle 30 Sekunden alle konfigurierten Plattformen auf neue Inserate die deinen Kriterien entsprechen. Damit bist du faktisch immer unter den ersten 5 Bewerbern.",
  },
  {
    question: "Kann ich den Bot für mehrere Städte gleichzeitig nutzen?",
    answer:
      "Ja. Du kannst in den Suchkriterien mehrere Städte und Bezirke eintragen. Der Bot läuft dann parallel für alle konfigurierten Gebiete. Kein Aufpreis.",
  },
  {
    question: "Was wenn ich in der Beta schlechte Erfahrungen mache?",
    answer:
      "Schreib uns direkt: support@lyrvio.com. Wir sind ein kleines Team in der Beta-Phase und nehmen jedes Feedback ernst. Wenn der Bot nicht funktioniert wie versprochen erstatten wir den Monat — kein Theater.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-24 bg-slate-950/50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-1.5 text-sm text-slate-400 mb-4">
            <span>Häufige Fragen</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            FAQ
          </h2>
          <p className="text-lg text-slate-400">
            Alles was du wissen solltest bevor du startest.
          </p>
        </div>

        {/* Accordion */}
        <Accordion type="single" collapsible className="space-y-0">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-base font-medium text-slate-200 hover:text-white text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-slate-400 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-500 text-sm">
            Noch Fragen?{" "}
            <a
              href="mailto:support@lyrvio.com"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              support@lyrvio.com
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
