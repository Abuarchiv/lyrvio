"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Verletzt das die AGB der Wohnungsportale?",
    a: "Nein. Der Bot läuft in deiner Browser-Extension, mit deinem Account, aus deinem Netzwerk — wie ein zweites Tab, das du selbst offen hättest. Es gibt keinen Server-seitigen Zugriff. In den Lyrvio-AGB bevollmächtigst du den Bot, in deinem Namen Bewerbungen zu versenden. Vollmachts-Modell, anwaltlich abgesichert.",
  },
  {
    q: "Was passiert mit meinen Daten?",
    a: "Profil, Mappe und Schufa bleiben in der Browser-Extension auf deinem Gerät. Sie verlassen es nur, wenn du eine Bewerbung sendest — direkt zum Vermieter, nie über uns. Auf unseren Servern liegen nur: deine E-Mail (Login), Pipeline-Statistiken, ob der Bot aktiv ist. DSGVO-konform, Server in der EU.",
  },
  {
    q: "Wie persönlich werden die Bewerbungen?",
    a: "Der Bot liest die Annonce, erkennt Vermieter-Typ und Anforderungen, baut dein Profil zusammen und schreibt ein Anschreiben in deinem Stil — keine Vorlage. Du hinterlegst drei Anschreiben-Variationen, das System wählt die passendste pro Inserat.",
  },
  {
    q: "Was, wenn ich parallel selbst suche?",
    a: "Es addiert sich. Tagsüber bewirbst du dich, nachts und im Meeting macht der Bot weiter. Beste Resultate haben Beta-Nutzer, die beides kombinieren.",
  },
  {
    q: "Wann genau wird der Erfolgs-Bonus fällig?",
    a: "Nur bei Mietvertrag — und nur, wenn Lyrvio die Bewerbung versandt hat. Du gibst Bescheid, wir verifizieren mit Vertragskopie, dann Stripe-Charge 299 €. Kein Vertrag, kein Bonus.",
  },
  {
    q: "Wie schnell ist „schnell“?",
    a: "Der Bot prüft alle 30 Sekunden alle Plattformen. Nach Erkennung dauert die Anschreiben-Generierung 3 Sekunden, das Versenden weitere 5 bis 20. Im Schnitt: 28 Sekunden ab Live-Schaltung des Inserats.",
  },
  {
    q: "Mehrere Städte gleichzeitig?",
    a: "Ja. Du trägst beliebig viele Städte und Bezirke ein. Kein Aufpreis. Der Bot priorisiert nach deinen Filter-Werten.",
  },
  {
    q: "Was, wenn nichts klappt?",
    a: "Schreib uns: support@lyrvio.com. Wenn der Bot in den ersten 30 Tagen nicht funktioniert wie hier beschrieben, erstatten wir den Monat. Kein Theater.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="bg-ink">
      <div className="mx-auto max-w-[1280px] px-6 py-24 lg:py-32">
        {/* Editorial header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12">
          <div className="lg:col-span-3">
            <div className="eyebrow">
              <span className="dot" />
              Häufige Fragen
            </div>
          </div>
          <div className="lg:col-span-9">
            <h2 className="font-display text-[40px] sm:text-[56px] lg:text-[60px] leading-[1] tracking-[-0.02em] text-bone">
              Was du wissen solltest,
              <br />
              <span className="text-bone-2">bevor du startest.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3" />
          <div className="lg:col-span-9 max-w-[68ch]">
            <Accordion type="single" collapsible className="border-t border-line">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={i}
                  value={`q-${i}`}
                  className="border-b border-line"
                >
                  <AccordionTrigger className="font-display text-[20px] sm:text-[22px] tracking-[-0.01em] text-bone hover:text-lime text-left py-6 [&[data-state=open]]:text-lime">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-[15.5px] leading-[1.65] text-bone-2 pb-6 max-w-[60ch]">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="mt-10 flex items-baseline gap-3 text-[14px]">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ash">
                Noch was offen?
              </span>
              <a
                href="mailto:support@lyrvio.com"
                className="text-bone hover:text-lime underline underline-offset-4 decoration-line transition-colors"
              >
                support@lyrvio.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
