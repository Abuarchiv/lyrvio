import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TopTicker } from "@/components/TopTicker";
import Link from "next/link";

export const metadata = {
  title: "Widerruf & Geld-zurück-Garantie · Lyrvio",
  description:
    "7 Tage Geld zurück ohne Wenn und Aber. Widerrufsbelehrung nach §312g BGB. Lyrvio — automatische Wohnungsbewerbungen.",
};

export default function WiderrufPage() {
  return (
    <>
      <TopTicker />
      <Nav />
      <main>
        {/* HERO — Garantie zuerst, Juristik danach */}
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 pb-16 lg:pt-24 lg:pb-20">
            <div className="flex items-center gap-4 mb-10 flex-wrap">
              <span className="stamp-rotated">Garantie 2026</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                Stand 26.04.2026
              </span>
            </div>

            <h1 className="manifest mb-10">
              7 Tage.
              <br />
              <span className="stamped">Geld zurück.</span>
            </h1>

            {/* Garantie-Badge — prominent */}
            <div className="inline-flex items-center gap-3 border-2 border-stamp px-5 py-3 mb-8">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-stamp animate-pulse" />
              <span className="font-mono text-[13px] font-bold text-stamp tracking-tight uppercase">
                7 Tage Geld zurück · Kein Formular · Kein Grund nötig
              </span>
            </div>

            <p className="font-mono text-[15px] leading-[1.7] text-ink max-w-[58ch]">
              Du kaufst Lyrvio. Du testest. Irgendetwas passt nicht —
              <strong className="text-stamp"> schreib uns eine kurze E-Mail innerhalb von 7 Tagen.</strong>{" "}
              Volles Geld zurück. Keine Begründung. Keine Diskussion.
              Rückzahlung innerhalb von 5 Werktagen.
            </p>
          </div>
        </section>

        {/* DETAILS */}
        <section className="border-b border-rule-soft">
          <div className="mx-auto max-w-[860px] px-6 lg:px-10 py-16 lg:py-20 space-y-14">

            <article>
              <h2 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ash mb-4">
                So geht&apos;s
              </h2>
              <div className="border-l-2 border-stamp pl-6 space-y-3 font-mono text-[14px] leading-[1.75] text-ink">
                <p>
                  <strong>1.</strong> E-Mail an{" "}
                  <a
                    href="mailto:hallo@lyrvio.com?subject=Geld%20zur%C3%BCck"
                    className="text-stamp hover:underline"
                  >
                    hallo@lyrvio.com
                  </a>{" "}
                  mit Betreff „Geld zurück"
                </p>
                <p>
                  <strong>2.</strong> Wir bestätigen innerhalb von 24 Stunden
                  (Mo–Fr)
                </p>
                <p>
                  <strong>3.</strong> Rückzahlung innerhalb von 5 Werktagen auf
                  dein Zahlungsmittel — automatisch über Stripe
                </p>
              </div>
            </article>

            <article>
              <h2 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ash mb-4">
                Gilt für
              </h2>
              <div className="font-mono text-[14px] leading-[1.75] text-ink space-y-2">
                <p>→ Lyrvio Standard (9 €/Monat)</p>
                <p>→ Lyrvio Premium (19 €/Monat)</p>
                <p className="text-ash">
                  Nicht rückerstattbar: Erfolgs-Bonus (49 € einmalig) — da nur
                  bei nachgewiesenem Mietvertrag fällig.
                </p>
              </div>
            </article>

            {/* GESETZLICHE WIDERRUFSBELEHRUNG */}
            <article className="border border-rule-soft p-6 space-y-5">
              <h2 className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ash mb-4">
                Gesetzliche Widerrufsbelehrung (§312g BGB)
              </h2>

              <div className="font-mono text-[13px] leading-[1.75] text-ink-2 space-y-4">
                <div>
                  <p className="font-bold text-ink mb-2">Widerrufsrecht</p>
                  <p>
                    Sie haben das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen
                    Vertrag zu widerrufen. Die Widerrufsfrist beträgt 14 Tage ab dem Tag
                    des Vertragsabschlusses.
                  </p>
                </div>

                <div>
                  <p>
                    Um Ihr Widerrufsrecht auszuüben, müssen Sie uns — Lyrvio,
                    Abubakar Abdi, Berlin, Deutschland,{" "}
                    <a
                      href="mailto:hallo@lyrvio.com"
                      className="text-stamp hover:underline"
                    >
                      hallo@lyrvio.com
                    </a>{" "}
                    — mittels einer eindeutigen Erklärung (z.B. E-Mail oder Brief)
                    über Ihren Entschluss informieren, diesen Vertrag zu widerrufen.
                  </p>
                </div>

                <div>
                  <p className="font-bold text-ink mb-2">Folgen des Widerrufs</p>
                  <p>
                    Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle
                    Zahlungen, die wir von Ihnen erhalten haben, unverzüglich und
                    spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem
                    die Mitteilung über Ihren Widerruf bei uns eingegangen ist. Für
                    diese Rückzahlung verwenden wir dasselbe Zahlungsmittel wie bei der
                    ursprünglichen Transaktion.
                  </p>
                </div>

                <div>
                  <p className="font-bold text-ink mb-2">Hinweis bei sofortigem Dienstbeginn</p>
                  <p>
                    Haben Sie verlangt, dass die Dienstleistungen während der
                    Widerrufsfrist beginnen sollen, zahlen Sie einen angemessenen
                    Betrag für die bis zum Widerruf bereits erbrachten Leistungen.
                    Unsere freiwillige 7-Tage-Garantie ergänzt das gesetzliche Recht
                    — sie ersetzt es nicht.
                  </p>
                </div>

                <div className="border-t border-rule-soft pt-4">
                  <p className="font-bold text-ink mb-2">Muster-Widerrufsformular (nicht vorgeschrieben)</p>
                  <div className="border border-rule-soft p-4 text-[12px] leading-[1.8] text-ash space-y-2">
                    <p>An: Lyrvio, Abubakar Abdi, hallo@lyrvio.com</p>
                    <p className="mt-2">
                      Hiermit widerrufe ich den von mir abgeschlossenen Vertrag
                      über die Nutzung von Lyrvio.
                    </p>
                    <p className="mt-2">
                      Bestellt am: _______________<br />
                      Name: _______________<br />
                      E-Mail des Accounts: _______________<br />
                      Datum: _______________
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* CTA */}
            <article>
              <Link
                href="mailto:hallo@lyrvio.com?subject=Geld%20zur%C3%BCck"
                className="btn-primary"
              >
                Geld zurückfordern →
              </Link>
              <p className="mt-4 font-mono text-[12px] text-ash">
                Oder einfach antworten auf jede E-Mail die wir dir geschickt haben.
              </p>
            </article>

          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
