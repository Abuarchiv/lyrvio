import Link from "next/link";
import { Nav } from "@/components/Nav";
import { TopTicker } from "@/components/TopTicker";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <TopTicker />
      <Nav />
      <main>
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 pb-20 lg:pt-28 lg:pb-28">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Left: Copy */}
              <div className="lg:col-span-7">
                <div className="flex items-center gap-4 mb-10 flex-wrap">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                    Fehler 404
                  </span>
                </div>
                <h1 className="manifest mb-6">
                  Akte nicht<br />
                  <em>gefunden.</em>
                </h1>
                <p className="font-mono text-[15px] leading-[1.7] text-ink max-w-[52ch] mb-12">
                  Diese Seite existiert nicht oder wurde verlegt. Möglicherweise wurde
                  die Akte archiviert, umbenannt oder der Link ist fehlerhaft.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center border-2 border-ink bg-ink text-paper font-mono text-[13px] uppercase tracking-[0.1em] px-8 py-4 hover:bg-paper hover:text-ink transition-colors duration-150"
                  >
                    Zurück zur Startseite
                  </Link>
                  <Link
                    href="/extension"
                    className="inline-flex items-center justify-center border-2 border-ink bg-paper text-ink font-mono text-[13px] uppercase tracking-[0.1em] px-8 py-4 hover:bg-paper-warm transition-colors duration-150"
                  >
                    Zur Hilfe
                  </Link>
                </div>
              </div>

              {/* Right: Stamp */}
              <div className="lg:col-span-5 flex items-center justify-center lg:justify-end pt-8 lg:pt-0">
                <div
                  className="border-4 border-stamp text-stamp font-display text-[28px] lg:text-[36px] tracking-[0.15em] uppercase px-8 py-6 text-center leading-tight select-none"
                  style={{ transform: "rotate(-8deg)", opacity: 0.72 }}
                  aria-hidden="true"
                >
                  Akte<br />geschlossen
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
