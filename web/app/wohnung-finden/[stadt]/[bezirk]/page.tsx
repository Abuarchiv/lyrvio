import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
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
      price: "79",
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
    <div className="flex flex-col min-h-screen bg-[#0a0a0f]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Nav />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8 flex-wrap">
              <Link href="/" className="hover:text-slate-300 transition-colors">Lyrvio</Link>
              <span>/</span>
              <Link href="/wohnung-finden" className="hover:text-slate-300 transition-colors">Wohnung finden</Link>
              <span>/</span>
              <Link href={`/wohnung-finden/${city.slug}`} className="hover:text-slate-300 transition-colors">{city.name}</Link>
              <span>/</span>
              <span className="text-slate-300">{district.name}</span>
            </nav>

            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300 mb-8">
                <MapPin className="h-3.5 w-3.5" />
                <span>{district.name}, {city.name}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
                <span className="text-white">Wohnung in </span>
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  {district.name}
                </span>
                <span className="text-white"> finden</span>
              </h1>

              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                {district.name} ist einer der beliebtesten Bezirke in {city.name} —
                mit durchschnittlich{" "}
                <span className="text-slate-200 font-medium">{district.avgRentSqm.toFixed(1)} €/m²</span>{" "}
                kalt und bis zu{" "}
                <span className="text-slate-200 font-medium">{city.avgBewerber} Bewerbern</span>{" "}
                pro Wohnung. Lyrvio bewirbt sich in unter 30 Sekunden — bevor die Konkurrenz aufwacht.
              </p>

              {/* District stats */}
              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-10">
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                  <div className="text-xl font-bold text-white">{district.avgRentSqm.toFixed(1)} €</div>
                  <div className="text-xs text-slate-500 mt-1">pro m² kalt</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
                  <div className="text-xl font-bold text-rose-300">{city.avgBewerber}</div>
                  <div className="text-xs text-slate-500 mt-1">Bewerber/Wohnung</div>
                </div>
                <div className="p-4 rounded-xl bg-emerald-900/30 border border-emerald-700/30">
                  <div className="text-xl font-bold text-emerald-300">&lt; 30s</div>
                  <div className="text-xs text-emerald-600 mt-1">Lyrvio-Reaktion</div>
                </div>
              </div>

              <Link href="/checkout">
                <Button
                  size="xl"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/30"
                >
                  Bot für {district.name} aktivieren — 79€/Mo
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Back to city + other districts */}
        <section className="py-16 border-t border-slate-800">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Back to city */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
                <h3 className="font-semibold text-white mb-3">Alle Infos zu {city.name}</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Marktdaten, Bezirksübersicht und Vermieter-Anforderungen für ganz {city.name}.
                </p>
                <Link
                  href={`/wohnung-finden/${city.slug}`}
                  className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  Zur {city.name}-Seite
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Other phase-2 districts */}
              {otherDistricts.length > 0 && (
                <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5">
                  <h3 className="font-semibold text-white mb-3">Andere Bezirke in {city.name}</h3>
                  <div className="space-y-2">
                    {otherDistricts.map((d) => (
                      <Link
                        key={d.slug}
                        href={`/wohnung-finden/${city.slug}/${d.slug}`}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/40 transition-colors group"
                      >
                        <span className="text-sm text-slate-400 group-hover:text-slate-200 flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5" />
                          {d.name}
                        </span>
                        {d.rent && (
                          <span className="text-xs text-slate-500">{d.rent.toFixed(1)} €/m²</span>
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
    </div>
  );
}
