export default function WiderrufPage() {
  return (
    <div>
      <div className="flex items-center gap-4 mb-10 flex-wrap">
        <span className="stamp-rotated">§ BGB</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
          Widerrufsbelehrung · §355 BGB
        </span>
      </div>

      <h1 className="font-display text-[44px] sm:text-[64px] tracking-[-0.035em] text-ink mb-2 leading-[1.05]">
        Widerrufsbelehrung
      </h1>
      <p className="font-mono text-[12px] text-ash mb-16">Stand: 26. April 2026</p>

      <div className="space-y-12">
        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">Widerrufsrecht</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink mb-4">
            Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
          </p>
          <p className="font-mono text-[14px] leading-[1.75] text-ink mb-4">
            Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsschlusses.
          </p>
          <p className="font-mono text-[14px] leading-[1.75] text-ink">
            Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Lyrvio, Karlsruhe, Deutschland,
            E-Mail: hallo@lyrvio.com) mittels einer eindeutigen Erklärung (z. B. eine per Post
            versandte oder per E-Mail übermittelte Mitteilung) über Ihren Entschluss, diesen
            Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular
            verwenden, das jedoch nicht vorgeschrieben ist.
          </p>
        </section>

        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">Wahrung der Widerrufsfrist</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink">
            Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung
            des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
          </p>
        </section>

        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">Widerrufsfolgen (§357 BGB)</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink mb-4">
            Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen
            erhalten haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen,
            an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
          </p>
          <p className="font-mono text-[14px] leading-[1.75] text-ink">
            Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen
            Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes
            vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
          </p>
        </section>

        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">Vorzeitiges Erlöschen des Widerrufsrechts (§356 Abs. 5 BGB)</div>
          <div className="border-2 border-ink bg-paper-warm p-6">
            <div className="label mb-3">Wichtiger Hinweis für digitale Dienstleistungen</div>
            <p className="font-mono text-[13px] leading-[1.75] text-ink mb-3">
              Bei einem Vertrag über die Erbringung von Dienstleistungen erlischt das Widerrufsrecht
              vorzeitig, wenn:
            </p>
            <ul className="space-y-2 mb-4">
              {[
                "Lyrvio die Dienstleistung vollständig erbracht hat und",
                "mit der Ausführung erst begonnen wurde, nachdem Sie dazu Ihre ausdrückliche Zustimmung gegeben haben und gleichzeitig Ihre Kenntnis davon bestätigt haben, dass Sie Ihr Widerrufsrecht mit vollständiger Vertragserfüllung durch uns verlieren.",
              ].map((item, i) => (
                <li key={i} className="font-mono text-[13px] leading-[1.75] text-ink flex gap-3">
                  <span className="text-stamp mt-1 flex-shrink-0">■</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="font-mono text-[13px] leading-[1.75] text-ink">
              Im Checkout bestätigen Sie durch das Setzen des entsprechenden Häkchens ausdrücklich,
              dass Sie mit der sofortigen Ausführung der Dienstleistung einverstanden sind und dass
              Sie wissen, dass Ihr Widerrufsrecht mit vollständiger Vertragserfüllung erlischt
              (§ 356 Abs. 5 BGB). Sofern Lyrvio die Dienstleistung noch nicht vollständig erbracht
              hat, besteht das Widerrufsrecht anteilig fort.
            </p>
          </div>
        </section>

        <section className="pb-10 border-b border-rule-soft">
          <div className="label mb-4">Muster-Widerrufsformular</div>
          <p className="font-mono text-[13px] leading-[1.75] text-ash mb-6">
            (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus
            und senden Sie es per E-Mail an hallo@lyrvio.com zurück.)
          </p>
          <div className="border-2 border-ink p-6 font-mono text-[13px] leading-[1.9] text-ink">
            <p className="mb-4">An:<br />
            Lyrvio<br />
            76131 Karlsruhe<br />
            Deutschland<br />
            E-Mail: hallo@lyrvio.com</p>

            <p className="mb-4">
              Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über
              die Erbringung der folgenden Dienstleistung:
            </p>

            <p className="mb-2">Bestellt am (*): ___________________________</p>
            <p className="mb-2">Name des/der Verbraucher(s): ___________________________</p>
            <p className="mb-2">Anschrift des/der Verbraucher(s): ___________________________</p>
            <p className="mb-2">E-Mail-Adresse des Accounts: ___________________________</p>
            <p className="mb-6">Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier): ___________________________</p>

            <p className="mb-2">Datum: ___________________________</p>

            <p className="mt-6 text-ash text-[11px]">(*) Unzutreffendes streichen.</p>
          </div>
        </section>

        <section>
          <div className="label mb-4">Kontakt für Widerruf</div>
          <p className="font-mono text-[14px] leading-[1.75] text-ink">
            Widerruf per E-Mail: hallo@lyrvio.com — wir bestätigen den Eingang umgehend
            und bearbeiten Ihren Widerruf innerhalb von 14 Tagen.
          </p>
          <p className="font-mono text-[11px] text-ash border-t border-rule-soft pt-8 mt-8">
            Lyrvio · 76131 Karlsruhe · Deutschland · hallo@lyrvio.com
          </p>
        </section>
      </div>
    </div>
  );
}
