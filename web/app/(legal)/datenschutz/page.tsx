export default function DatenschutzPage() {
  return (
    <div className="space-y-8 text-slate-300">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">Datenschutzerklärung</h1>
        <p className="text-slate-500 text-sm">Stand: April 2026 · DSGVO-konform</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">1. Verantwortlicher</h2>
        <p>
          Verantwortlicher im Sinne der DSGVO ist:<br />
          Lyrvio (in Gründung)<br />
          Deutschland<br />
          E-Mail: datenschutz@lyrvio.com
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">2. Erhobene Daten & Zwecke</h2>

        <h3 className="text-base font-semibold text-slate-200">2.1 Kontodaten (Server)</h3>
        <p>Wir speichern auf unseren Servern ausschließlich:</p>
        <ul className="list-disc pl-6 space-y-1 text-slate-400">
          <li>E-Mail-Adresse (zur Authentifizierung und Kommunikation)</li>
          <li>Abonnement-Status und Zahlungshistorie (via Stripe)</li>
          <li>Anonymisierte Bewerbungsstatistiken (Anzahl gesendeter Bewerbungen, Antwortquoten)</li>
          <li>Bot-Aktivierungsstatus</li>
        </ul>

        <h3 className="text-base font-semibold text-slate-200 mt-4">2.2 Profildaten (lokal in der Extension)</h3>
        <p>
          Folgende Daten werden <strong className="text-slate-200">ausschließlich lokal in deiner Browser-Extension</strong> gespeichert
          und verlassen dein Gerät nur im Rahmen von Bewerbungen an Vermieter:
        </p>
        <ul className="list-disc pl-6 space-y-1 text-slate-400">
          <li>Name, Telefon, Geburtsdatum</li>
          <li>Beruf, Arbeitgeber, Einkommen</li>
          <li>Schufa-Score und hochgeladene Dokumente</li>
          <li>Bewerbungs-Anschreiben</li>
          <li>Suchkriterien (Stadt, Bezirke, Preis, Größe)</li>
        </ul>
        <p className="text-sm bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4 text-indigo-200">
          Diese sensiblen Daten werden niemals an Lyrvio-Server übertragen. Sie bleiben auf deinem Gerät
          und werden nur direkt an Vermieter gesendet, wenn der Bot eine Bewerbung versendet.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">3. Rechtsgrundlagen</h2>
        <ul className="list-disc pl-6 space-y-2 text-slate-400">
          <li><strong className="text-slate-300">Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO):</strong> Verarbeitung zur Erbringung des gebuchten Dienstes</li>
          <li><strong className="text-slate-300">Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO):</strong> Verbesserung des Dienstes durch anonymisierte Nutzungsstatistiken</li>
          <li><strong className="text-slate-300">Einwilligung (Art. 6 Abs. 1 lit. a DSGVO):</strong> Wo ausdrücklich erteilt (z.B. Marketing-E-Mails)</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">4. Weitergabe an Dritte</h2>
        <p>Deine Daten werden nicht an Dritte verkauft. Folgende technische Dienstleister verarbeiten Daten in unserem Auftrag:</p>
        <ul className="list-disc pl-6 space-y-2 text-slate-400">
          <li><strong className="text-slate-300">Stripe Inc. (USA):</strong> Zahlungsabwicklung. Angemessenheitsbeschluss + SCCs vorhanden. Datenschutzrichtlinie: stripe.com/privacy</li>
          <li><strong className="text-slate-300">Resend (USA):</strong> Transaktions-E-Mails (Bestätigungen, Benachrichtigungen)</li>
          <li><strong className="text-slate-300">Cloudflare Inc. (USA):</strong> Hosting, DNS, CDN. Angemessenheitsbeschluss vorhanden.</li>
          <li><strong className="text-slate-300">Plausible Analytics (EU):</strong> Anonymisiertes Webanalytics ohne Cookies</li>
        </ul>
        <p>
          Drittland-Transfers zu US-Anbietern erfolgen auf Basis der EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">5. Cookies & Tracking</h2>
        <p>
          Lyrvio verwendet <strong className="text-slate-200">keine Tracking-Cookies</strong>. Für Web-Analytics nutzen wir
          Plausible Analytics — ein datenschutzfreundliches Tool ohne Cookies und ohne persönliche
          Identifizierung. Es werden keine personenbezogenen Daten für Analytics erhoben.
        </p>
        <p>
          Notwendige Sitzungscookies werden für die Authentifizierung verwendet und nach dem
          Browser-Schließen gelöscht.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">6. Speicherdauer</h2>
        <ul className="list-disc pl-6 space-y-2 text-slate-400">
          <li>Kontodaten: bis zur Kündigung + 30 Tage Löschfrist, danach anonymisiert</li>
          <li>Zahlungsdaten: 10 Jahre gemäß steuerrechtlicher Aufbewahrungspflicht (§ 147 AO)</li>
          <li>Profildaten in Extension: jederzeit durch den Nutzer löschbar</li>
          <li>Server-Logs: 7 Tage, danach automatisch gelöscht</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">7. Deine Rechte</h2>
        <p>Du hast nach DSGVO folgende Rechte:</p>
        <ul className="list-disc pl-6 space-y-2 text-slate-400">
          <li><strong className="text-slate-300">Auskunft (Art. 15 DSGVO):</strong> Welche Daten wir über dich haben</li>
          <li><strong className="text-slate-300">Berichtigung (Art. 16 DSGVO):</strong> Korrektur falscher Daten</li>
          <li><strong className="text-slate-300">Löschung (Art. 17 DSGVO):</strong> Vollständige Datenlöschung</li>
          <li><strong className="text-slate-300">Einschränkung (Art. 18 DSGVO):</strong> Eingeschränkte Verarbeitung</li>
          <li><strong className="text-slate-300">Datenportabilität (Art. 20 DSGVO):</strong> Export deiner Daten</li>
          <li><strong className="text-slate-300">Widerspruch (Art. 21 DSGVO):</strong> Gegen interessenbasierte Verarbeitung</li>
        </ul>
        <p>
          Für alle Anfragen: datenschutz@lyrvio.com. Antwort innerhalb von 30 Tagen.
        </p>
        <p>
          Du hast außerdem das Recht, Beschwerde bei einer Datenschutzbehörde einzulegen. Die zuständige Behörde ist der
          Landesbeauftragte für den Datenschutz und die Informationsfreiheit (je nach Bundesland).
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white">8. Sicherheit</h2>
        <p>
          Alle Übertragungen erfolgen verschlüsselt über HTTPS/TLS 1.3. Passwörter werden gehashed gespeichert
          (bcrypt). Server-Infrastruktur auf Cloudflare mit automatischen Sicherheitsupdates.
        </p>
      </section>

      <p className="text-slate-600 text-sm mt-10">
        Kontakt Datenschutz: datenschutz@lyrvio.com
      </p>
    </div>
  );
}
