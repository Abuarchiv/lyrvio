export default function ImpressumPage() {
  return (
    <div className="space-y-8 text-slate-300">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-white mb-2">Impressum</h1>
        <p className="text-slate-500 text-sm">Angaben gemäß § 5 TMG</p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">Anbieter</h2>
        <p>
          Lyrvio<br />
          (Gesellschaft in Gründung)<br />
          Deutschland
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">Kontakt</h2>
        <p>
          E-Mail:{" "}
          <a href="mailto:hallo@lyrvio.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            hallo@lyrvio.com
          </a>
          <br />
          Support:{" "}
          <a href="mailto:support@lyrvio.com" className="text-indigo-400 hover:text-indigo-300 transition-colors">
            support@lyrvio.com
          </a>
        </p>
        <p className="text-slate-500 text-sm">
          Wir antworten in der Regel innerhalb von 24–48 Stunden an Werktagen.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">Umsatzsteuer-ID</h2>
        <p className="text-slate-400">
          Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG:<br />
          <span className="text-slate-500">Wird nach UG-Gründung ergänzt</span>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">Handelsregister</h2>
        <p className="text-slate-400">
          Eintragung im Handelsregister nach UG-Gründung.<br />
          <span className="text-slate-500">Registernummer und -gericht werden ergänzt.</span>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">Verantwortlich für den Inhalt</h2>
        <p>
          Gemäß § 55 Abs. 2 RStV:<br />
          Geschäftsführung Lyrvio<br />
          Deutschland
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">Streitschlichtung</h2>
        <p>
          Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
          <a
            href="https://ec.europa.eu/consumers/odr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            https://ec.europa.eu/consumers/odr
          </a>
        </p>
        <p>
          Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
          Verbraucherschlichtungsstelle teilzunehmen. Wir empfehlen bei Problemen den direkten
          Kontakt über support@lyrvio.com.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-bold text-white">Haftungsausschluss</h2>

        <h3 className="text-base font-semibold text-slate-200">Haftung für Inhalte</h3>
        <p className="text-slate-400">
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
          Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
          Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
          nach den allgemeinen Gesetzen verantwortlich.
        </p>

        <h3 className="text-base font-semibold text-slate-200">Haftung für Links</h3>
        <p className="text-slate-400">
          Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen
          Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
          Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
          Seiten verantwortlich.
        </p>

        <h3 className="text-base font-semibold text-slate-200">Urheberrecht</h3>
        <p className="text-slate-400">
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
          dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
          Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung
          des jeweiligen Autors bzw. Erstellers.
        </p>
      </section>

      <p className="text-slate-600 text-sm mt-10">
        Stand: April 2026 · Lyrvio
      </p>
    </div>
  );
}
