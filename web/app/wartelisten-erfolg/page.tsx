import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TopTicker } from "@/components/TopTicker";

export default function WartlistenErfolgPage() {
  return (
    <>
      <TopTicker />
      <Nav />
      <main>
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 pb-20 lg:pt-24 lg:pb-28">
            {/* Label */}
            <div className="label mb-10">Warteliste · Bestätigung</div>

            {/* Stamp-style confirmation mark */}
            <div className="mb-10">
              <span className="stamp-rotated" style={{ fontSize: "13px", padding: "6px 14px" }}>
                Eingetragen
              </span>
            </div>

            {/* Headline */}
            <h1 className="manifest mb-8">
              Bist auf der
              <br />
              <em>Warteliste.</em>
            </h1>

            {/* Body */}
            <p className="font-mono text-[15px] sm:text-[16px] leading-[1.7] text-ink max-w-[52ch] mb-10">
              Wir melden uns Anfang Mai 2026 wenn die Beta startet. Du kriegst eine E-Mail an die Adresse die du angegeben hast.
            </p>

            {/* Info strip */}
            <div className="border-2 border-ink bg-paper-warm p-6 max-w-[480px] mb-12">
              <p className="font-mono text-[12px] text-ash leading-[1.8]">
                — 50 Plätze total · Beta startet Mai 2026<br />
                — Du zahlst erst wenn du beitrittst<br />
                — Abmelden jederzeit möglich
              </p>
            </div>

            {/* Back link */}
            <Link href="/" className="btn-secondary">
              ← Zurück zur Startseite
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
