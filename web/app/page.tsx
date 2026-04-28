import { Nav } from "@/components/Nav";
import { TopTicker } from "@/components/TopTicker";
import { Hero } from "@/components/Hero";
import { SlamCounter } from "@/components/SlamCounter";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <TopTicker />
      <Nav />
      <main>
        <Hero />
        <SlamCounter />
        <section className="border-t-2 border-ink bg-paper-warm">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 lg:py-20">
            <h2 className="font-display text-[36px] sm:text-[52px] leading-[0.95] tracking-[-0.03em] text-ink mb-6">
              Bereit?
              <br />
              <em>Los geht's.</em>
            </h2>
            <p className="font-mono text-[14px] sm:text-[15px] leading-[1.65] text-ink max-w-[56ch] mb-10">
              Lyrvio läuft sofort — in 7 Minuten eingerichtet. Monatlich kündbar.
            </p>
            <a href="/checkout/erfolg" className="btn-primary cursor-stamp">
              Jetzt starten — 9 €/Monat →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
