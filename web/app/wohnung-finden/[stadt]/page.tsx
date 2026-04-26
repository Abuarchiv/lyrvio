import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
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
    <div className="flex flex-col min-h-screen bg-[#0a0a0f]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Nav />
      <main className="flex-1">
        <CityHero city={city} />
        <CityStats city={city} />
        <DistrictList city={city} />
        <RequirementsList city={city} />
        <CityFAQ city={city} />

        {/* Bottom CTA */}
        <section className="py-20 border-t border-slate-800">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center">
            <div className="rounded-2xl border border-indigo-500/20 bg-gradient-to-br from-indigo-500/5 to-violet-500/5 p-8 sm:p-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300 mb-6">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Bot aktiv in {city.name}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Bereit für deine {city.name}-Wohnung?
              </h2>
              <p className="text-slate-400 mb-8 max-w-lg mx-auto leading-relaxed">
                Lass Lyrvio für dich suchen. Aktiviere den Bot — er scannt {city.mainPlatforms.join(", ")} rund um die Uhr
                und bewirbt sich auf jede passende Wohnung in {city.name}, bevor die Konkurrenz aufwacht.
              </p>
              <Link href="/checkout">
                <Button
                  size="xl"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30"
                >
                  Jetzt aktiv suchen für 79€/Mo
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <p className="text-xs text-slate-600 mt-4">
                Monatlich kündbar · Keine versteckten Kosten · Direkt nach Zahlung aktiv
              </p>
            </div>

            {/* Sibling city links */}
            <div className="mt-12">
              <p className="text-sm text-slate-500 mb-4">Lyrvio auch in anderen Städten:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {Object.values(cities)
                  .filter((c) => c.slug !== city.slug)
                  .slice(0, 8)
                  .map((c) => (
                    <Link
                      key={c.slug}
                      href={`/wohnung-finden/${c.slug}`}
                      className="inline-flex px-3 py-1.5 rounded-full text-xs text-slate-400 border border-slate-800 hover:border-slate-600 hover:text-slate-200 transition-colors"
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
    </div>
  );
}
