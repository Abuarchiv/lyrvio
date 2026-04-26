import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TopTicker } from "@/components/TopTicker";
import { CityHero } from "@/components/seo/CityHero";
import { CityStats } from "@/components/seo/CityStats";
import { DistrictList } from "@/components/seo/DistrictList";
import { RequirementsList } from "@/components/seo/RequirementsList";
import { CityFAQ } from "@/components/seo/CityFAQ";
import { cities, cityBySlug } from "@/lib/cities";

interface PageProps {
  params: Promise<{ stadt: string }>;
}

export async function generateStaticParams() {
  return Object.keys(cities).map((slug) => ({ stadt: slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { stadt } = await params;
  const city = cityBySlug(stadt);
  if (!city) return {};

  const avgRent = city.topDistricts.reduce((s, d) => s + d.avgRentSqm, 0) / city.topDistricts.length;

  return {
    title: `Wohnung in ${city.name} finden — schneller als alle anderen | Lyrvio`,
    description: `${city.apartmentsPerDay} neue Inserate täglich, ${city.avgBewerber} Bewerber pro Wohnung. Ø Wartezeit manuell: ${city.waitTimeManualMonths} Monate. Mit Lyrvio: ${city.waitTimeWithLyrvioWeeks} Wochen. Jetzt Bot aktivieren.`,
    keywords: city.keywords,
    alternates: {
      canonical: `https://lyrvio.com/wohnung-finden/${city.slug}`,
    },
    openGraph: {
      title: `Wohnung in ${city.name} finden | Lyrvio`,
      description: `${city.avgBewerber} Konkurrenten pro Wohnung in ${city.name}. Lyrvio bewirbt sich in unter 30 Sekunden. Ø ${avgRent.toFixed(1)} €/m² kalt.`,
      url: `https://lyrvio.com/wohnung-finden/${city.slug}`,
      siteName: "Lyrvio",
      locale: "de_DE",
      type: "website",
    },
  };
}

export default async function StadtPage({ params }: PageProps) {
  const { stadt } = await params;
  const city = cityBySlug(stadt);
  if (!city) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: city.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Lyrvio",
    applicationCategory: "LifestyleApplication",
    description: `Automatische Wohnungsbewerbungen in ${city.name}. Lyrvio scannt ImmoScout24, eBay Kleinanzeigen und weitere Plattformen 24/7 und bewirbt sich sofort auf passende Wohnungen.`,
    url: "https://lyrvio.com",
    offers: {
      "@type": "Offer",
      price: "79",
      priceCurrency: "EUR",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "79",
        priceCurrency: "EUR",
        unitText: "Monat",
      },
    },
    areaServed: {
      "@type": "City",
      name: city.name,
      addressRegion: city.state,
      addressCountry: "DE",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <TopTicker />
      <Nav />
      <main>
        <CityHero city={city} />
        <CityStats city={city} />
        <DistrictList city={city} />
        <RequirementsList city={city} />
        <CityFAQ city={city} />

        {/* Bottom CTA */}
        <section className="border-t-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20">
            <div className="border-2 border-ink bg-paper-warm p-8 sm:p-12 max-w-[700px]">
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <span className="stamp-rotated">§ BOT</span>
                <span className="tag -sage">Bot aktiv in {city.name}</span>
              </div>
              <h2 className="font-display text-[32px] sm:text-[42px] tracking-[-0.03em] text-ink leading-[1.1] mb-4">
                Bereit für deine {city.name}-Wohnung?
              </h2>
              <p className="font-mono text-[14px] leading-[1.75] text-ink mb-8 max-w-[48ch]">
                Lass Lyrvio für dich suchen. Aktiviere den Bot — er scannt {city.mainPlatforms.join(", ")} rund um die Uhr
                und bewirbt sich auf jede passende Wohnung in {city.name}, bevor die Konkurrenz aufwacht.
              </p>
              <Link href="/checkout" className="btn-primary cursor-stamp inline-block">
                Jetzt aktiv suchen für 9€/Mo
              </Link>
              <p className="font-mono text-[11px] text-ash mt-4">
                Monatlich kündbar · Keine versteckten Kosten · Direkt nach Zahlung aktiv
              </p>
            </div>

            {/* Sibling city links */}
            <div className="mt-12">
              <p className="font-mono text-[12px] text-ash mb-4">Lyrvio auch in anderen Städten:</p>
              <div className="flex flex-wrap gap-2">
                {Object.values(cities)
                  .filter((c) => c.slug !== city.slug)
                  .slice(0, 8)
                  .map((c) => (
                    <Link
                      key={c.slug}
                      href={`/wohnung-finden/${c.slug}`}
                      className="tag -outline hover:border-ink hover:text-ink transition-colors"
                    >
                      {c.name}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
