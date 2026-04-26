export default function DatenschutzPage() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-10 flex-wrap">
        <span className="stamp-rotated">§ DSGVO</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
          Datenschutz · DSGVO-konform
        </span>
      </div>

      <h1 className="font-display text-[44px] sm:text-[64px] tracking-[-0.035em] text-ink mb-2 leading-[1.05]">
        Datenschutzerklärung
      </h1>
      <p className="font-mono text-[12px] text-ash mb-16">Stand: April 2026 · DSGVO-konform</p>

      <div className="space-y-12">
        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">1. Verantwortlicher</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink">
            Verantwortlicher im Sinne der DSGVO ist:<br />
            Lyrvio (in Gründung)<br />
            Deutschland<br />
            E-Mail: datenschutz@lyrvio.com
          </p>
        </section>

        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-6">2. Erhobene Daten &amp; Zwecke</div>

          <h3 className="font-display text-[22px] tracking-[-0.02em] text-ink mb-3">
            2.1 Kontodaten (Server)
          </h3>
          <p className="font-mono text-[14px] leading-[1.75] text-ink mb-3">
            Wir speichern auf unseren Servern ausschließlich:
          </p>
          <ul className="space-y-2 mb-8">
            {[
              "E-Mail-Adresse (zur Authentifizierung und Kommunikation)",
              "Abonnement-Status und Zahlungshistorie (via Stripe)",
              "Anonymisierte Bewerbungsstatistiken (Anzahl gesendeter Bewerbungen, Antwortquoten)",
              "Bot-Aktivierungsstatus",
            ].map((item, i) => (
              <li key={i} className="font-mono text-[14px] leading-[1.75] text-ink flex gap-3">
                <span className="text-stamp mt-1 flex-shrink-0">■</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="font-display text-[22px] tracking-[-0.02em] text-ink mb-3">
            2.2 Profildaten (lokal in der Extension)
          </h3>
          <p className="font-mono text-[14px] leading-[1.75] text-ink mb-3">
            Folgende Daten werden <strong>ausschließlich lokal in deiner Browser-Extension</strong> gespeichert
            und verlassen dein Gerät nur im Rahmen von Bewerbungen an Vermieter:
          </p>
          <ul className="space-y-2 mb-6">
            {[
              "Name, Telefon, Geburtsdatum",
              "Beruf, Arbeitgeber, Einkommen",
              "Schufa-Score und hochgeladene Dokumente",
              "Bewerbungs-Anschreiben",
              "Suchkriterien (Stadt, Bezirke, Preis, Größe)",
            ].map((item, i) => (
              <li key={i} className="font-mono text-[14px] leading-[1.75] text-ink flex gap-3">
                <span className="text-stamp mt-1 flex-shrink-0">■</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="border-2 border-ink bg-paper-warm p-5">
            <p className="font-mono text-[13px] leading-[1.75] text-ink">
              Diese sensiblen Daten werden niemals an Lyrvio-Server übertragen. Sie bleiben auf deinem Gerät
              und werden nur direkt an Vermieter gesendet, wenn der Bot eine Bewerbung versendet.
            </p>
          </div>
        </section>

        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">3. Rechtsgrundlagen</div>
          <ul className="space-y-3">
            {[
              { title: "Vertragserfüllung (Art. 6 Abs. 1 lit. b DSGVO):", desc: "Verarbeitung zur Erbringung des gebuchten Dienstes" },
              { title: "Berechtigtes Interesse (Art. 6 Abs. 1 lit. f DSGVO):", desc: "Verbesserung des Dienstes durch anonymisierte Nutzungsstatistiken" },
              { title: "Einwilligung (Art. 6 Abs. 1 lit. a DSGVO):", desc: "Wo ausdrücklich erteilt (z.B. Marketing-E-Mails)" },
            ].map((item, i) => (
              <li key={i} className="font-mono text-[14px] leading-[1.75] text-ink flex gap-3">
                <span className="text-stamp mt-1 flex-shrink-0">■</span>
                <span><strong>{item.title}</strong> {item.desc}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">4. Weitergabe an Dritte</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink mb-4">
            Deine Daten werden nicht an Dritte verkauft. Folgende technische Dienstleister verarbeiten Daten in unserem Auftrag:
          </p>
          <ul className="space-y-3 mb-4">
            {[
              { title: "Stripe Inc. (USA):", desc: "Zahlungsabwicklung. Angemessenheitsbeschluss + SCCs vorhanden. Datenschutzrichtlinie: stripe.com/privacy" },
              { title: "Resend (USA):", desc: "Transaktions-E-Mails (Bestätigungen, Benachrichtigungen)" },
              { title: "Cloudflare Inc. (USA):", desc: "Hosting, DNS, CDN. Angemessenheitsbeschluss vorhanden." },
              { title: "Plausible Analytics (EU):", desc: "Anonymisiertes Webanalytics ohne Cookies" },
            ].map((item, i) => (
              <li key={i} className="font-mono text-[14px] leading-[1.75] text-ink flex gap-3">
                <span className="text-stamp mt-1 flex-shrink-0">■</span>
                <span><strong>{item.title}</strong> {item.desc}</span>
              </li>
            ))}
          </ul>
          <p className="font-mono text-[14px] leading-[1.75] text-ink">
            Drittland-Transfers zu US-Anbietern erfolgen auf Basis der EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO).
          </p>
        </section>

        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">5. Cookies &amp; Tracking</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink mb-4">
            Lyrvio verwendet <strong>keine Tracking-Cookies</strong>. Für Web-Analytics nutzen wir
            Plausible Analytics — ein datenschutzfreundliches Tool ohne Cookies und ohne persönliche
            Identifizierung. Es werden keine personenbezogenen Daten für Analytics erhoben.
          </p>
          <p className="font-mono text-[14px] leading-[1.75] text-ink">
            Notwendige Sitzungscookies werden für die Authentifizierung verwendet und nach dem
            Browser-Schließen gelöscht.
          </p>
        </section>

        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">6. Speicherdauer</div>
          <ul className="space-y-2">
            {[
              "Kontodaten: bis zur Kündigung + 30 Tage Löschfrist, danach anonymisiert",
              "Zahlungsdaten: 10 Jahre gemäß steuerrechtlicher Aufbewahrungspflicht (§ 147 AO)",
              "Profildaten in Extension: jederzeit durch den Nutzer löschbar",
              "Server-Logs: 7 Tage, danach automatisch gelöscht",
            ].map((item, i) => (
              <li key={i} className="font-mono text-[14px] leading-[1.75] text-ink flex gap-3">
                <span className="text-stamp mt-1 flex-shrink-0">■</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">7. Deine Rechte</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink mb-4">Du hast nach DSGVO folgende Rechte:</p>
          <ul className="space-y-3 mb-6">
            {[
              { title: "Auskunft (Art. 15 DSGVO):", desc: "Welche Daten wir über dich haben" },
              { title: "Berichtigung (Art. 16 DSGVO):", desc: "Korrektur falscher Daten" },
              { title: "Löschung (Art. 17 DSGVO):", desc: "Vollständige Datenlöschung" },
              { title: "Einschränkung (Art. 18 DSGVO):", desc: "Eingeschränkte Verarbeitung" },
              { title: "Datenportabilität (Art. 20 DSGVO):", desc: "Export deiner Daten" },
              { title: "Widerspruch (Art. 21 DSGVO):", desc: "Gegen interessenbasierte Verarbeitung" },
            ].map((item, i) => (
              <li key={i} className="font-mono text-[14px] leading-[1.75] text-ink flex gap-3">
                <span className="text-stamp mt-1 flex-shrink-0">■</span>
                <span><strong>{item.title}</strong> {item.desc}</span>
              </li>
            ))}
          </ul>
          <p className="font-mono text-[14px] leading-[1.75] text-ink mb-4">
            Für alle Anfragen: datenschutz@lyrvio.com. Antwort innerhalb von 30 Tagen.
          </p>
          <p className="font-mono text-[14px] leading-[1.75] text-ink">
            Du hast außerdem das Recht, Beschwerde bei einer Datenschutzbehörde einzulegen. Die zuständige Behörde ist der
            Landesbeauftragte für den Datenschutz und die Informationsfreiheit (je nach Bundesland).
          </p>
        </section>

        <section>
          <div className="label mb-4">8. Sicherheit</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink mb-8">
            Alle Übertragungen erfolgen verschlüsselt über HTTPS/TLS 1.3. Passwörter werden gehashed gespeichert
            (bcrypt). Server-Infrastruktur auf Cloudflare mit automatischen Sicherheitsupdates.
          </p>
          <p className="font-mono text-[11px] text-ash border-t border-rule-soft pt-8">
            Kontakt Datenschutz: datenschutz@lyrvio.com
          </p>
        </section>
      </div>
    </div>
  );
}
