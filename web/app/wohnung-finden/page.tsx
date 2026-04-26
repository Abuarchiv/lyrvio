import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TopTicker } from "@/components/TopTicker";
import { cityList } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Wohnung finden in deutschen Großstädten",
  description:
    "Lyrvio hilft dir in allen deutschen Großstädten schneller eine Wohnung zu finden. Automatische Bewerbungen auf ImmoScout24, eBay Kleinanzeigen und mehr — in unter 30 Sekunden nach Veröffentlichung.",
  alternates: {
    canonical: "https://lyrvio.com/wohnung-finden",
  },
  openGraph: {
    title: "Wohnung finden in deutschen Großstädten",
    description:
      "Automatische Wohnungsbewerbungen in Berlin, München, Hamburg und 12 weiteren Städten.",
    url: "https://lyrvio.com/wohnung-finden",
    siteName: "Lyrvio",
    locale: "de_DE",
    type: "website",
  },
};

export default function WohnungFindenPage() {
  const sortedCities = cityList.sort((a, b) => b.population - a.population);

  return (
    <>
      <TopTicker />
      <Nav />
      <main>
        {/* Header */}
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 pb-16 lg:pt-24 lg:pb-20">
            <nav className="flex items-center gap-2 font-mono text-[12px] text-ash mb-10 flex-wrap">
              <Link href="/" className="hover:text-ink transition-colors">Lyrvio</Link>
              <span>›</span>
              <span className="text-ink">Wohnung finden</span>
            </nav>

            <div className="flex items-center gap-4 mb-8 flex-wrap">
              <span className="stamp-rotated">§ STÄDTE</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                {cityList.length} Städte · DACH
              </span>
            </div>

            <h1 className="manifest mb-6">
              Wohnung finden
              <br />
              in <em>deiner Stadt.</em>
            </h1>
            <p className="font-mono text-[15px] leading-[1.7] text-ink max-w-[56ch]">
              Lyrvio ist aktiv in {cityList.length} deutschen Großstädten. Wähle deine Stadt —
              und sieh wie angespannt der Markt dort wirklich ist.
            </p>
          </div>
        </section>

        {/* City Grid */}
        <section className="bg-paper">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px border border-ink bg-ink">
              {sortedCities.map((city) => {
                const avgRent =
                  city.topDistricts.reduce((s, d) => s + d.avgRentSqm, 0) /
                  city.topDistricts.length;

                return (
                  <Link
                    key={city.slug}
                    href={`/wohnung-finden/${city.slug}`}
                    className="group bg-paper hover:bg-paper-warm p-6 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="font-display text-[22px] tracking-[-0.02em] text-ink group-hover:text-stamp transition-colors">
                          {city.name}
                        </h2>
                        <p className="font-mono text-[11px] text-ash mt-0.5">{city.state}</p>
                      </div>
                      <span className="font-mono text-[16px] text-ash group-hover:text-ink transition-colors">→</span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 border-t border-rule-soft pt-4">
                      <div>
                        <div className="font-mono text-[16px] font-bold text-ink">{city.apartmentsPerDay}</div>
                        <div className="font-mono text-[10px] text-ash">Inserate/Tag</div>
                      </div>
                      <div>
                        <div className="font-mono text-[16px] font-bold text-stamp">{city.avgBewerber}</div>
                        <div className="font-mono text-[10px] text-ash">Bewerber</div>
                      </div>
                      <div>
                        <div className="font-mono text-[16px] font-bold text-ink">
                          {avgRent.toFixed(0)} €
                        </div>
                        <div className="font-mono text-[10px] text-ash">Ø/m²</div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
