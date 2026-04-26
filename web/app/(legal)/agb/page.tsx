export default function AgbPage() {
  return (
    <div className="space-y-8 text-slate-300">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">Allgemeine Geschäftsbedingungen</h1>
        <p className="text-slate-500 text-sm">Stand: April 2026</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">§ 1 Anbieter & Geltungsbereich</h2>
        <p>
          Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen Lyrvio
          (Betreiber: [UG in Gründung], Deutschland) und Nutzern der Plattform lyrvio.com sowie
          der Lyrvio Browser-Extension.
        </p>
        <p>
          Durch die Registrierung und Nutzung von Lyrvio akzeptiert der Nutzer diese AGB in ihrer
          jeweils gültigen Fassung.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">§ 2 Leistungsbeschreibung</h2>
        <p>
          Lyrvio bietet eine Software-as-a-Service-Lösung (Browser-Extension) zur automatisierten
          Unterstützung bei der Wohnungssuche in deutschen Großstädten. Der Dienst umfasst:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-400">
          <li>Automatisches Monitoring von Wohnungsinserat-Plattformen (ImmoScout24, Immowelt, eBay Kleinanzeigen, Immonet, Wunderflats)</li>
          <li>Automatisiertes Versenden von Bewerbungsschreiben im Namen des Nutzers auf Basis des hinterlegten Profils</li>
          <li>Benachrichtigung des Nutzers bei Antworten von Vermietern</li>
          <li>Dashboard zur Verwaltung und Nachverfolgung der Bewerbungen</li>
        </ul>
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-6 mt-4">
          <h3 className="text-base font-bold text-amber-300 mb-2">Wichtig: Vollmacht zur Bewerbung im Namen des Nutzers</h3>
          <p className="text-sm text-slate-400">
            Mit der Aktivierung des Lyrvio-Bots erteilt der Nutzer Lyrvio ausdrücklich eine
            <strong className="text-slate-200"> widerrufliche Vollmacht</strong>, in seinem Namen und unter Verwendung seiner
            Nutzerdaten (Name, Kontaktdaten, Bewerbungsunterlagen) Bewerbungen bei Vermietern und
            Wohnungsportalen einzureichen. Diese Vollmacht gilt ausschließlich für den Zweck der
            Wohnungsbewerbung und kann jederzeit durch Deaktivierung des Bots oder Kündigung des
            Abonnements widerrufen werden.
          </p>
          <p className="text-sm text-slate-400 mt-3">
            Der Nutzer bestätigt, dass er volljährig ist und die Berechtigung hat, im eigenen Namen
            Mietverhältnisse einzugehen. Lyrvio handelt als technischer Bevollmächtigter,
            nicht als Vertragspartei des Mietverhältnisses.
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">§ 3 Vertragsschluss & Laufzeit</h2>
        <p>
          Ein Vertrag kommt mit erfolgreicher Zahlung über Stripe und Aktivierung des Accounts zustande.
          Das Abonnement läuft monatlich und verlängert sich automatisch, sofern es nicht mindestens
          24 Stunden vor Ablauf des jeweiligen Abrechnungszeitraums gekündigt wird.
        </p>
        <p>
          Die Kündigung kann jederzeit über das Dashboard oder per E-Mail an support@lyrvio.com erfolgen.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">§ 4 Preise & Zahlung</h2>
        <p>
          Aktuelle Preise sind auf der Preisseite (lyrvio.com/#preise) einsehbar. Alle Preise verstehen
          sich inklusive der gesetzlichen Mehrwertsteuer.
        </p>
        <p>
          <strong className="text-slate-200">Erfolgs-Bonus:</strong> Bei Buchung des Tarifs „Aktiv-Suche + Erfolgs-Bonus" ist
          zusätzlich zur monatlichen Grundgebühr ein einmaliger Erfolgs-Bonus von 299€ fällig, sobald
          der Nutzer einen Mietvertrag für eine Wohnung unterzeichnet, bei der Lyrvio die Bewerbung
          versendet hat. Der Nachweis des Mietvertrags obliegt dem Nutzer. Der Nutzer informiert Lyrvio
          aktiv über den Vertragsabschluss.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">§ 5 Nutzerpflichten</h2>
        <p>Der Nutzer verpflichtet sich:</p>
        <ul className="list-disc pl-6 space-y-2 text-slate-400">
          <li>Nur korrekte und vollständige Angaben im Profil zu hinterlegen</li>
          <li>Die Extension ausschließlich über einen eigenen Browser-Account zu nutzen</li>
          <li>Keine automatisierten Massenanfragen über Lyrvio hinaus durchzuführen</li>
          <li>Die AGB der genutzten Wohnungsportale einzuhalten</li>
          <li>Den Bot bei Abschluss eines Mietvertrags zu deaktivieren bzw. Lyrvio zu informieren</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">§ 6 Haftungsbeschränkung</h2>
        <p>
          Lyrvio ist ein technischer Hilfsdienst und übernimmt keine Haftung für:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-400">
          <li>Den Erfolg oder Misserfolg einer Wohnungsbewerbung</li>
          <li>Ausfälle oder Änderungen der Drittanbieter-Plattformen (ImmoScout24 etc.)</li>
          <li>Technische Unterbrechungen des Dienstes durch höhere Gewalt</li>
          <li>Schäden, die durch fehlerhafte Nutzerdaten entstehen</li>
        </ul>
        <p>
          Die Haftung für Vorsatz und grobe Fahrlässigkeit bleibt unberührt. Die Haftung für
          einfache Fahrlässigkeit ist auf typische, vorhersehbare Schäden begrenzt und auf die
          Höhe der in den letzten 3 Monaten gezahlten Abonnementgebühren beschränkt.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">§ 7 Widerrufsrecht</h2>
        <p>
          Verbrauchern steht ein gesetzliches Widerrufsrecht von 14 Tagen ab Vertragsschluss zu.
          Das Widerrufsrecht erlischt vorzeitig, wenn mit der Ausführung des Dienstes (Bot-Aktivierung)
          vor Ablauf der Widerrufsfrist begonnen wird und der Nutzer ausdrücklich zugestimmt hat,
          dass das Widerrufsrecht mit Beginn der Leistungserbringung erlischt.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">§ 8 Datenschutz</h2>
        <p>
          Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer Datenschutzerklärung
          (lyrvio.com/datenschutz) und den Vorgaben der DSGVO.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">§ 9 Änderung der AGB</h2>
        <p>
          Lyrvio behält sich das Recht vor, diese AGB mit einer Frist von 30 Tagen zu ändern.
          Nutzer werden per E-Mail informiert. Widerspricht der Nutzer nicht innerhalb von 30 Tagen
          nach Bekanntgabe, gelten die neuen AGB als angenommen.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">§ 10 Anwendbares Recht & Gerichtsstand</h2>
        <p>
          Es gilt ausschließlich deutsches Recht unter Ausschluss des UN-Kaufrechts.
          Gerichtsstand für alle Streitigkeiten ist — soweit gesetzlich zulässig — der Sitz von Lyrvio.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">§ 11 Schlussbestimmungen</h2>
        <p>
          Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit
          der übrigen Bestimmungen unberührt. Anstelle der unwirksamen Bestimmung gilt die gesetzliche
          Regelung.
        </p>
        <p className="text-slate-500 text-sm mt-8">
          Kontakt: support@lyrvio.com
        </p>
      </section>
    </div>
  );
}
