export default function AgbPage() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-10 flex-wrap">
        <span className="stamp-rotated">§ AGB</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
          Allgemeine Geschäftsbedingungen
        </span>
      </div>

      <h1 className="font-display text-[44px] sm:text-[64px] tracking-[-0.035em] text-ink mb-2 leading-[1.05]">
        Allgemeine Geschäftsbedingungen
      </h1>
      <p className="font-mono text-[12px] text-ash mb-16">Stand: April 2026</p>

      <div className="space-y-12">
        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">§ 1 Anbieter &amp; Geltungsbereich</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink mb-4">
            Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen Lyrvio
            (Betreiber: [UG in Gründung], Deutschland) und Nutzern der Plattform lyrvio.com sowie
            der Lyrvio Browser-Extension.
          </p>
          <p className="font-mono text-[14px] leading-[1.75] text-ink">
            Durch die Registrierung und Nutzung von Lyrvio akzeptiert der Nutzer diese AGB in ihrer
            jeweils gültigen Fassung.
          </p>
        </section>

        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">§ 2 Leistungsbeschreibung</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink mb-4">
            Lyrvio bietet eine Software-as-a-Service-Lösung (Browser-Extension) zur automatisierten
            Unterstützung bei der Wohnungssuche in deutschen Großstädten. Der Dienst umfasst:
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Automatisches Monitoring von Wohnungsinserat-Plattformen (ImmoScout24, Immowelt, eBay Kleinanzeigen, Immonet, Wunderflats)",
              "Automatisiertes Versenden von Bewerbungsschreiben im Namen des Nutzers auf Basis des hinterlegten Profils",
              "Benachrichtigung des Nutzers bei Antworten von Vermietern",
              "Dashboard zur Verwaltung und Nachverfolgung der Bewerbungen",
            ].map((item, i) => (
              <li key={i} className="font-mono text-[14px] leading-[1.75] text-ink flex gap-3">
                <span className="text-stamp mt-1 flex-shrink-0">■</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="border-2 border-ink bg-paper-warm p-6">
            <div className="label mb-3">Wichtig: Vollmacht zur Bewerbung im Namen des Nutzers</div>
            <p className="font-mono text-[13px] leading-[1.75] text-ink mb-3">
              Mit der Aktivierung von Lyrvio erteilt der Nutzer Lyrvio ausdrücklich eine
              <strong> widerrufliche Vollmacht</strong>, in seinem Namen und unter Verwendung seiner
              Nutzerdaten (Name, Kontaktdaten, Bewerbungsunterlagen) Bewerbungen bei Vermietern und
              Wohnungsportalen einzureichen. Diese Vollmacht gilt ausschließlich für den Zweck der
              Wohnungsbewerbung und kann jederzeit durch Deaktivierung von Lyrvio oder Kündigung des
              Abonnements widerrufen werden.
            </p>
            <p className="font-mono text-[13px] leading-[1.75] text-ink">
              Der Nutzer bestätigt, dass er volljährig ist und die Berechtigung hat, im eigenen Namen
              Mietverhältnisse einzugehen. Lyrvio handelt als technischer Bevollmächtigter,
              nicht als Vertragspartei des Mietverhältnisses.
            </p>
          </div>
        </section>

        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">§ 3 Vertragsschluss &amp; Laufzeit</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink mb-4">
            Ein Vertrag kommt mit erfolgreicher Zahlung über Stripe und Aktivierung des Accounts zustande.
            Das Abonnement läuft monatlich und verlängert sich automatisch, sofern es nicht mindestens
            24 Stunden vor Ablauf des jeweiligen Abrechnungszeitraums gekündigt wird.
          </p>
          <p className="font-mono text-[14px] leading-[1.75] text-ink">
            Die Kündigung kann jederzeit über das Dashboard oder per E-Mail an support@lyrvio.com erfolgen.
          </p>
        </section>

        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">§ 4 Preise &amp; Zahlung</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink mb-4">
            Aktuelle Preise sind auf der Preisseite (lyrvio.com/#preise) einsehbar. Alle Preise verstehen
            sich inklusive der gesetzlichen Mehrwertsteuer.
          </p>
          <p className="font-mono text-[14px] leading-[1.75] text-ink">
            <strong>Erfolgsprämie (optional):</strong> Bei Buchung des Tarifs „Standard + Erfolgsprämie"
            ist zusätzlich zur monatlichen Grundgebühr von 9€ eine einmalige Erfolgsprämie von 49€
            fällig, sobald der Nutzer einen Mietvertrag für eine Wohnung unterzeichnet, bei der Lyrvio
            die Bewerbung versendet hat. Wird kein Mietvertrag unterzeichnet, fällt keine Erfolgsprämie
            an. Der Nachweis des Mietvertrags obliegt dem Nutzer; der Nutzer informiert Lyrvio aktiv
            über den Vertragsabschluss.
          </p>
        </section>

        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">§ 5 Nutzerpflichten</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink mb-4">Der Nutzer verpflichtet sich:</p>
          <ul className="space-y-2">
            {[
              "Nur korrekte und vollständige Angaben im Profil zu hinterlegen",
              "Die Extension ausschließlich über einen eigenen Browser-Account zu nutzen",
              "Keine automatisierten Massenanfragen über Lyrvio hinaus durchzuführen",
              "Die AGB der genutzten Wohnungsportale einzuhalten",
              "Lyrvio bei Abschluss eines Mietvertrags zu deaktivieren bzw. Lyrvio zu informieren",
            ].map((item, i) => (
              <li key={i} className="font-mono text-[14px] leading-[1.75] text-ink flex gap-3">
                <span className="text-stamp mt-1 flex-shrink-0">■</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">§ 6 Haftungsbeschränkung</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink mb-4">
            Lyrvio ist ein technischer Hilfsdienst und übernimmt keine Haftung für:
          </p>
          <ul className="space-y-2 mb-4">
            {[
              "Den Erfolg oder Misserfolg einer Wohnungsbewerbung",
              "Ausfälle oder Änderungen der Drittanbieter-Plattformen (ImmoScout24 etc.)",
              "Technische Unterbrechungen des Dienstes durch höhere Gewalt",
              "Schäden, die durch fehlerhafte Nutzerdaten entstehen",
            ].map((item, i) => (
              <li key={i} className="font-mono text-[14px] leading-[1.75] text-ink flex gap-3">
                <span className="text-stamp mt-1 flex-shrink-0">■</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="font-mono text-[14px] leading-[1.75] text-ink">
            Die Haftung für Vorsatz und grobe Fahrlässigkeit bleibt unberührt. Die Haftung für
            einfache Fahrlässigkeit ist auf typische, vorhersehbare Schäden begrenzt und auf die
            Höhe der in den letzten 3 Monaten gezahlten Abonnementgebühren beschränkt.
          </p>
        </section>

        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">§ 7 Widerrufsrecht</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink">
            Verbrauchern steht ein gesetzliches Widerrufsrecht von 14 Tagen ab Vertragsschluss zu.
            Das Widerrufsrecht erlischt vorzeitig, wenn mit der Ausführung des Dienstes (Lyrvio-Aktivierung)
            vor Ablauf der Widerrufsfrist begonnen wird und der Nutzer ausdrücklich zugestimmt hat,
            dass das Widerrufsrecht mit Beginn der Leistungserbringung erlischt.
          </p>
        </section>

        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">§ 8 Datenschutz</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink">
            Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer Datenschutzerklärung
            (lyrvio.com/datenschutz) und den Vorgaben der DSGVO.
          </p>
        </section>

        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">§ 9 Änderung der AGB</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink">
            Lyrvio behält sich das Recht vor, diese AGB mit einer Frist von 30 Tagen zu ändern.
            Nutzer werden per E-Mail informiert. Widerspricht der Nutzer nicht innerhalb von 30 Tagen
            nach Bekanntgabe, gelten die neuen AGB als angenommen.
          </p>
        </section>

        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">§ 10 Anwendbares Recht &amp; Gerichtsstand</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink">
            Es gilt ausschließlich deutsches Recht unter Ausschluss des UN-Kaufrechts.
            Gerichtsstand für alle Streitigkeiten ist — soweit gesetzlich zulässig — der Sitz von Lyrvio.
          </p>
        </section>

        <section>
          <div className="label mb-4">§ 11 Schlussbestimmungen</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink mb-4">
            Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit
            der übrigen Bestimmungen unberührt. Anstelle der unwirksamen Bestimmung gilt die gesetzliche
            Regelung.
          </p>
          <p className="font-mono text-[11px] text-ash border-t border-rule-soft pt-8">
            Kontakt: support@lyrvio.com
          </p>
        </section>
      </div>
    </div>
  );
}
