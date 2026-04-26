import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { TopTicker } from "@/components/TopTicker";
import { Footer } from "@/components/Footer";
import { plans, validPlanKeys, type PlanKey } from "../_plans";

// §312j BGB-konforme Button-Texte pro Plan
const buttonLabel: Record<PlanKey, string> = {
  standard: "Jetzt zahlungspflichtig abonnieren — 9 €/Monat",
  premium: "Jetzt zahlungspflichtig abonnieren — 19 €/Monat",
  erfolg: "Jetzt zahlungspflichtig abonnieren — 9 €/Monat + 49 € bei Erfolg",
};

export function generateStaticParams() {
  return validPlanKeys.map((plan) => ({ plan }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ plan: string }>;
}) {
  const { plan: planSlug } = await params;
  if (!validPlanKeys.includes(planSlug as PlanKey)) {
    return { title: "Checkout · Lyrvio" };
  }
  const plan = plans[planSlug as PlanKey];
  return {
    title: `${plan.name} bestellen · Lyrvio`,
    description: plan.description,
  };
}

export default async function CheckoutPlanPage({
  params,
}: {
  params: Promise<{ plan: string }>;
}) {
  const { plan: planSlug } = await params;

  if (!validPlanKeys.includes(planSlug as PlanKey)) {
    notFound();
  }

  const planKey = planSlug as PlanKey;
  const plan = plans[planKey];

  return (
    <>
      <TopTicker />
      <Nav />
      <main className="bg-paper min-h-screen">
        <div className="mx-auto max-w-[900px] px-6 lg:px-10 py-16 lg:py-20">
          {/* Akten-Header */}
          <div className="flex items-center gap-4 mb-10 flex-wrap">
            <span className="stamp-rotated">Bestellen</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
              Bestellung Nr. {plan.orderNr} · Stand laufend
            </span>
          </div>

          <h1 className="font-display text-[44px] sm:text-[64px] leading-[0.95] tracking-[-0.035em] text-ink mb-6">
            Lyrvio <em>starten.</em>
          </h1>

          <Link
            href="/gebuehren"
            className="inline-block link-underline font-mono text-[12px] uppercase tracking-[0.18em] mb-12"
          >
            ← Zurück zum Preis
          </Link>

          {/* Akten-Block */}
          <div className="akte">
            <div className="akte-head">
              <span>{plan.name}</span>
              <span className="hidden sm:inline">Stripe · SSL · DSGVO</span>
            </div>

            <div className="akte-row">
              <div className="para">1.</div>
              <div className="desc">
                <strong>{plan.name}</strong>
                <small>{plan.description}</small>
              </div>
              <div className="price">{plan.price}</div>
            </div>

            <div className="px-6 py-5 border-t border-rule-soft">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ash mb-3">
                2 · Leistungsumfang
              </div>
              <ul className="space-y-2 font-mono text-[13px] text-ink">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-stamp font-bold mt-0.5">✓</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Was passiert nach der Bestellung — Onboarding-Box */}
            <div className="px-6 py-5 border-t border-rule-soft">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ash mb-4">
                3 · Was passiert nach der Bestellung?
              </div>
              <ol className="space-y-3 font-mono text-[13px] text-ink">
                <li className="flex items-start gap-3">
                  <span className="text-stamp font-bold mt-0.5 shrink-0">1.</span>
                  <span>Du wirst zu Stripe weitergeleitet <span className="text-ash">(sicher · SSL · DSGVO)</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-stamp font-bold mt-0.5 shrink-0">2.</span>
                  <span>Nach Zahlung: E-Mail mit deinem persönlichen Setup-Link</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-stamp font-bold mt-0.5 shrink-0">3.</span>
                  <div>
                    <span>Setup-Link führt dich durch:</span>
                    <ul className="mt-1.5 space-y-1 text-[12px] text-ash pl-1">
                      <li className="flex items-start gap-2"><span>•</span><span>Browser-Extension (ein kleines Gratis-Programm im Chrome- oder Firefox-Browser) installieren <span className="text-ink">(1 Klick)</span></span></li>
                      <li className="flex items-start gap-2"><span>•</span><span>Profil ausfüllen <span className="text-ink">(5 Min · Beruf, Einkommen, Schufa)</span></span></li>
                      <li className="flex items-start gap-2"><span>•</span><span>Suchkriterien festlegen <span className="text-ink">(Stadt, Bezirke, Budget)</span></span></li>
                    </ul>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-stamp font-bold mt-0.5 shrink-0">4.</span>
                  <span>Lyrvio läuft 24/7 — du wirst per E-Mail benachrichtigt bei Antwort</span>
                </li>
              </ol>
              <p className="mt-4 font-mono text-[12px] text-ash border-t border-rule-soft pt-3">
                Geht alles in 7 Minuten. Du brauchst nichts vorbereiten.{" "}
                <Link href="/onboarding/1" className="link-underline text-ink whitespace-nowrap">
                  Vorab anschauen: So sieht das Onboarding aus →
                </Link>
              </p>
            </div>

            {/* Widerrufsbelehrung — Anlage 1 EGBGB */}
            <div className="px-6 py-5 border-t border-rule-soft">
              <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-ash mb-3">
                4 · Widerrufsbelehrung
              </div>
              <div className="font-mono text-[11.5px] leading-[1.65] text-ash space-y-3 max-w-[70ch]">
                <div>
                  <span className="text-ink font-bold">Widerrufsrecht</span>
                  <p className="mt-1">
                    Du hast das Recht, binnen 14 Tagen ohne Angabe von Gründen
                    diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt 14
                    Tage ab dem Tag des Vertragsabschlusses.
                  </p>
                  <p className="mt-1">
                    Um dein Widerrufsrecht auszuüben, musst du uns (Lyrvio,{" "}
                    <a
                      href="mailto:hallo@lyrvio.com"
                      className="link-underline text-ink"
                    >
                      hallo@lyrvio.com
                    </a>
                    ) mittels einer eindeutigen Erklärung (z.B. ein mit der Post
                    versandter Brief oder E-Mail) über deinen Entschluss, diesen
                    Vertrag zu widerrufen, informieren. Du kannst dafür das
                    beigefügte Muster-Widerrufsformular verwenden, das jedoch
                    nicht vorgeschrieben ist.
                  </p>
                  <p className="mt-1">
                    Zur Wahrung der Widerrufsfrist reicht es aus, dass du die
                    Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf
                    der Widerrufsfrist absendest.
                  </p>
                </div>

                <div>
                  <span className="text-ink font-bold">Folgen des Widerrufs</span>
                  <p className="mt-1">
                    Wenn du diesen Vertrag widerrufst, haben wir dir alle
                    Zahlungen, die wir von dir erhalten haben, unverzüglich und
                    spätestens binnen 14 Tagen ab dem Tag zurückzuzahlen, an dem
                    die Mitteilung über deinen Widerruf bei uns eingegangen ist.
                  </p>
                </div>

                <div>
                  <span className="text-ink font-bold">
                    Vorzeitiges Erlöschen des Widerrufsrechts
                  </span>
                  <p className="mt-1">
                    Das Widerrufsrecht erlischt vorzeitig, wenn wir mit der
                    Ausführung des Dienstes (Lyrvio-Aktivierung) vor Ablauf der
                    Widerrufsfrist begonnen haben und du ausdrücklich zugestimmt
                    hast, dass dein Widerrufsrecht mit Beginn der
                    Leistungserbringung erlischt (§ 356 Abs. 5 BGB).
                  </p>
                </div>

                <div>
                  <span className="text-ink font-bold">
                    Muster-Widerrufsformular
                  </span>
                  <p className="mt-1 text-[10.5px]">
                    (Wenn du den Vertrag widerrufen willst, dann fülle bitte
                    dieses Formular aus und sende es zurück.)
                  </p>
                  <div className="mt-2 border border-rule-soft p-3 text-[10.5px] leading-[1.7] space-y-0.5">
                    <p>— An Lyrvio, hallo@lyrvio.com:</p>
                    <p>
                      — Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*)
                      abgeschlossenen Vertrag über die Erbringung der folgenden
                      Dienstleistung: Lyrvio-Abonnement
                    </p>
                    <p>— Bestellt am: ___ / Erhalten am: ___</p>
                    <p>— Name des Verbrauchers: ___</p>
                    <p>— Anschrift des Verbrauchers: ___</p>
                    <p>— Datum: ___</p>
                    <p>— (*) Unzutreffendes streichen</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="akte-foot">
              <div className="font-mono text-[12px] text-ink">
                <strong>Hiermit bestelle ich Lyrvio</strong>
                <br />
                <span className="text-ash">
                  {plan.suffix}. Bezahlung via Stripe. Monatlich kündbar zum
                  Monatsende.
                </span>
              </div>
              <div className="flex flex-col items-stretch sm:items-end gap-1.5">
                <a href={plan.paymentLink} className="btn-primary cursor-stamp w-full sm:w-auto whitespace-normal sm:whitespace-nowrap text-center">
                  {buttonLabel[planKey]}
                </a>
                <span className="font-mono text-[10.5px] text-ash">
                  Du wirst zur sicheren Zahlung bei Stripe weitergeleitet
                </span>
                <span className="font-mono text-[10px] text-ash max-w-[44ch] text-right leading-[1.5]">
                  Mit Klick bestätige ich, die Widerrufsbelehrung gelesen zu haben, und stimme ausdrücklich zu, dass Lyrvio sofort mit der Leistungserbringung beginnt — mein Widerrufsrecht erlischt damit gemäß § 356 Abs. 5 BGB.
                </span>
              </div>
            </div>
          </div>

          {/* Trust-Strip */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-ash">
            {[
              { tag: "SSL", text: "verschlüsselt · End-to-End" },
              { tag: "DSGVO", text: "konform · DE-Hosting" },
              { tag: "STRIPE", text: "Marktführer · BaFin-reguliert" },
            ].map((it, i) => (
              <div key={i} className="flex items-baseline gap-2 border-l-2 border-stamp pl-3">
                <span className="text-ink font-bold">{it.tag}</span>
                <span>{it.text}</span>
              </div>
            ))}
          </div>

          {/* Legal */}
          <p className="mt-10 pt-6 border-t border-rule-soft font-mono text-[11.5px] leading-[1.6] text-ash max-w-[68ch]">
            Mit der Bestellung akzeptierst du unsere{" "}
            <Link href="/agb" className="link-underline text-ink">
              AGB
            </Link>{" "}
            und{" "}
            <Link href="/datenschutz" className="link-underline text-ink">
              Datenschutzerklärung
            </Link>
            . Du erteilst Lyrvio eine Vollmacht (wie bei einer Aushilfe — du erlaubst Lyrvio in deinem Namen Bewerbungen zu schreiben, jederzeit widerrufbar), in deinem Namen
            Wohnungsbewerbungen zu versenden. Erfolgsprämie 49 € einmalig wird nur bei
            Mietvertrags-Unterschrift fällig (optional).
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
