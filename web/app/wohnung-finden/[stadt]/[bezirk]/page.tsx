import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TopTicker } from "@/components/TopTicker";
import { cities, cityBySlug } from "@/lib/cities";

interface PageProps {
  params: Promise<{ stadt: string; bezirk: string }>;
}

// Slug normalization helper
function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss");
}

export async function generateStaticParams() {
  const params: { stadt: string; bezirk: string }[] = [];
  for (const city of Object.values(cities)) {
    for (const bezirkName of city.phase2Districts) {
      params.push({ stadt: city.slug, bezirk: toSlug(bezirkName) });
    }
  }
  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { stadt, bezirk } = await params;
  const city = cityBySlug(stadt);
  if (!city) return {};

  const district = city.topDistricts.find((d) => toSlug(d.name) === bezirk);
  if (!district) return {};

  return {
    title: `Wohnung in ${city.name} ${district.name} finden | Lyrvio`,
    description: `Wohnungssuche in ${district.name}, ${city.name}. Ø ${district.avgRentSqm.toFixed(1)} €/m² kalt. ${city.avgBewerber} Bewerber pro Wohnung. Lyrvio reagiert in unter 30 Sekunden.`,
    alternates: {
      canonical: `https://lyrvio.com/wohnung-finden/${city.slug}/${bezirk}`,
    },
    openGraph: {
      title: `Wohnung ${district.name}, ${city.name} | Lyrvio`,
      description: `Automatische Wohnungsbewerbungen in ${district.name}. Ø ${district.avgRentSqm.toFixed(1)} €/m².`,
      url: `https://lyrvio.com/wohnung-finden/${city.slug}/${bezirk}`,
      siteName: "Lyrvio",
      locale: "de_DE",
      type: "website",
    },
  };
}

export default async function BezirkPage({ params }: PageProps) {
  const { stadt, bezirk } = await params;
  const city = cityBySlug(stadt);
  if (!city) notFound();

  const district = city.topDistricts.find((d) => toSlug(d.name) === bezirk);
  if (!district) notFound();

  // Only show phase2 districts
  if (!city.phase2Districts.includes(district.name)) notFound();

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Lyrvio",
    description: `Automatische Wohnungsbewerbungen in ${district.name}, ${city.name}.`,
    url: "https://lyrvio.com",
    areaServed: {
      "@type": "Place",
      name: `${district.name}, ${city.name}`,
      addressLocality: city.name,
      addressRegion: city.state,
      addressCountry: "DE",
    },
    offers: {
      "@type": "Offer",
      price: "9",
      priceCurrency: "EUR",
    },
  };

  const otherDistricts = city.phase2Districts
    .filter((d) => d !== district.name)
    .map((d) => ({
      name: d,
      slug: toSlug(d),
      rent: city.topDistricts.find((td) => td.name === d)?.avgRentSqm,
    }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <TopTicker />
      <Nav />
      <main>
        {/* Hero */}
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 pb-16 lg:pt-24 lg:pb-20">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 font-mono text-[12px] text-ash mb-10 flex-wrap">
              <Link href="/" className="hover:text-ink transition-colors">Lyrvio</Link>
              <span>›</span>
              <Link href="/wohnung-finden" className="hover:text-ink transition-colors">Wohnung finden</Link>
              <span>›</span>
              <Link href={`/wohnung-finden/${city.slug}`} className="hover:text-ink transition-colors">{city.name}</Link>
              <span>›</span>
              <span className="text-ink">{district.name}</span>
            </nav>

            <div className="flex items-center gap-4 mb-8 flex-wrap">
              <span className="stamp-rotated">§ BEZ</span>
              <span className="tag">{district.name} · {city.name}</span>
            </div>

            <h1 className="manifest mb-6">
              Wohnung in
              <br />
              <em>{district.name}</em> finden.
            </h1>

            <p className="font-mono text-[15px] leading-[1.7] text-ink max-w-[56ch] mb-10">
              {district.name} ist einer der beliebtesten Bezirke in {city.name} —
              mit durchschnittlich{" "}
              <span className="marker px-1">{district.avgRentSqm.toFixed(1)} €/m²</span>{" "}
              kalt und bis zu{" "}
              <strong>{city.avgBewerber} Bewerbern</strong>{" "}
              pro Wohnung. Lyrvio bewirbt sich in unter 30 Sekunden — bevor die Konkurrenz aufwacht.
            </p>

            {/* District stats */}
            <div className="grid grid-cols-3 gap-px border border-ink bg-ink max-w-[480px] mb-10">
              <div className="bg-paper p-5 text-center">
                <div className="font-mono text-[22px] font-bold text-ink">{district.avgRentSqm.toFixed(1)} €</div>
                <div className="font-mono text-[10px] text-ash mt-1">pro m² kalt</div>
              </div>
              <div className="bg-paper p-5 text-center">
                <div className="font-mono text-[22px] font-bold text-stamp">{city.avgBewerber}</div>
                <div className="font-mono text-[10px] text-ash mt-1">Bewerber/Wohnung</div>
              </div>
              <div className="bg-paper-warm p-5 text-center">
                <div className="font-mono text-[22px] font-bold text-sage">&lt; 30s</div>
                <div className="font-mono text-[10px] text-ash mt-1">Lyrvio-Reaktion</div>
              </div>
            </div>

            <Link href="/checkout" className="btn-primary cursor-stamp inline-block">
              Bot für {district.name} aktivieren — 9€/Mo
            </Link>
          </div>
        </section>

        {/* Back to city + other districts */}
        <section className="bg-paper">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Back to city */}
              <div className="border-2 border-ink bg-paper-warm p-6">
                <h3 className="font-display text-[22px] tracking-[-0.02em] text-ink mb-3">
                  Alle Infos zu {city.name}
                </h3>
                <p className="font-mono text-[13px] text-ash mb-4 leading-[1.6]">
                  Marktdaten, Bezirksübersicht und Vermieter-Anforderungen für ganz {city.name}.
                </p>
                <Link
                  href={`/wohnung-finden/${city.slug}`}
                  className="link-underline font-mono text-[13px]"
                >
                  Zur {city.name}-Seite →
                </Link>
              </div>

              {/* Other phase-2 districts */}
              {otherDistricts.length > 0 && (
                <div className="border-2 border-ink bg-paper-warm p-6">
                  <h3 className="font-display text-[22px] tracking-[-0.02em] text-ink mb-4">
                    Andere Bezirke in {city.name}
                  </h3>
                  <div className="space-y-1">
                    {otherDistricts.map((d) => (
                      <Link
                        key={d.slug}
                        href={`/wohnung-finden/${city.slug}/${d.slug}`}
                        className="flex items-center justify-between py-2 border-b border-rule-soft last:border-b-0 hover:text-stamp transition-colors group"
                      >
                        <span className="font-mono text-[13px] text-ink group-hover:text-stamp">
                          ■ {d.name}
                        </span>
                        {d.rent && (
                          <span className="font-mono text-[12px] text-ash">{d.rent.toFixed(1)} €/m²</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
