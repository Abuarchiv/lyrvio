export default function ImpressumPage() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-10 flex-wrap">
        <span className="stamp-rotated">§ TMG</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
          Rechtliche Angaben · Impressum
        </span>
      </div>

      <h1 className="font-display text-[44px] sm:text-[64px] tracking-[-0.035em] text-ink mb-2 leading-[1.05]">
        Impressum
      </h1>
      <p className="font-mono text-[12px] text-ash mb-16">Angaben gemäß § 5 TMG</p>

      <div className="space-y-12">
        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">Anbieter</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink">
            Lyrvio<br />
            (Gesellschaft in Gründung)<br />
            Deutschland
          </p>
        </section>

        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">Kontakt</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink">
            E-Mail:{" "}
            <a href="mailto:hallo@lyrvio.com" className="link-underline">
              hallo@lyrvio.com
            </a>
            <br />
            Support:{" "}
            <a href="mailto:support@lyrvio.com" className="link-underline">
              support@lyrvio.com
            </a>
          </p>
          <p className="font-mono text-[12px] text-ash mt-3">
            Wir antworten in der Regel innerhalb von 24–48 Stunden an Werktagen.
          </p>
        </section>

        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">Umsatzsteuer-ID</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink">
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a UStG:<br />
            <span className="text-ash">Wird nach UG-Gründung ergänzt</span>
          </p>
        </section>

        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">Handelsregister</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink">
            Eintragung im Handelsregister nach UG-Gründung.<br />
            <span className="text-ash">Registernummer und -gericht werden ergänzt.</span>
          </p>
        </section>

        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">Verantwortlich für den Inhalt</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink">
            Gemäß § 55 Abs. 2 RStV:<br />
            Geschäftsführung Lyrvio<br />
            Deutschland
          </p>
        </section>

        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">Streitschlichtung</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink">
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              https://ec.europa.eu/consumers/odr
            </a>
          </p>
          <p className="font-mono text-[14px] leading-[1.75] text-ink mt-4">
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen. Wir empfehlen bei Problemen den direkten
            Kontakt über support@lyrvio.com.
          </p>
        </section>

        <section>
          <div className="label mb-4">Haftungsausschluss</div>

          <h3 className="font-display text-[20px] tracking-[-0.02em] text-ink mb-3">
            Haftung für Inhalte
          </h3>
          <p className="font-mono text-[14px] leading-[1.75] text-ink mb-8">
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
            Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten
            nach den allgemeinen Gesetzen verantwortlich.
          </p>

          <h3 className="font-display text-[20px] tracking-[-0.02em] text-ink mb-3">
            Haftung für Links
          </h3>
          <p className="font-mono text-[14px] leading-[1.75] text-ink mb-8">
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen
            Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
            Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
            Seiten verantwortlich.
          </p>

          <h3 className="font-display text-[20px] tracking-[-0.02em] text-ink mb-3">
            Urheberrecht
          </h3>
          <p className="font-mono text-[14px] leading-[1.75] text-ink">
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
            dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
            Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung
            des jeweiligen Autors bzw. Erstellers.
          </p>
        </section>

        <p className="font-mono text-[11px] text-ash border-t border-rule-soft pt-8">
          Stand: April 2026 · Lyrvio
        </p>
      </div>
    </div>
  );
}
