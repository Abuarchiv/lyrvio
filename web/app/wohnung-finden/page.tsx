import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { cityList } from "@/lib/cities";

export const metadata: Metadata = {
  title: "Wohnung finden in deutschen Großstädten | Lyrvio",
  description:
    "Lyrvio hilft dir in allen deutschen Großstädten schneller eine Wohnung zu finden. Automatische Bewerbungen auf ImmoScout24, eBay Kleinanzeigen und mehr — in unter 30 Sekunden nach Veröffentlichung.",
  alternates: {
    canonical: "https://lyrvio.com/wohnung-finden",
  },
  openGraph: {
    title: "Wohnung finden in deutschen Großstädten | Lyrvio",
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
    <div className="flex flex-col min-h-screen bg-[#0a0a0f]">
      <Nav />
      <main className="flex-1">
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
            <nav className="flex items-center gap-2 text-sm text-slate-500 mb-8">
              <Link href="/" className="hover:text-slate-300 transition-colors">Lyrvio</Link>
              <span>/</span>
              <span className="text-slate-300">Wohnung finden</span>
            </nav>

            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6">
                <span className="text-white">Wohnung finden in </span>
                <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  deiner Stadt
                </span>
              </h1>
              <p className="text-lg text-slate-400 leading-relaxed">
                Lyrvio ist aktiv in {cityList.length} deutschen Großstädten. Wähle deine Stadt —
                und sieh wie angespannt der Markt dort wirklich ist.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sortedCities.map((city) => {
                const avgRent =
                  city.topDistricts.reduce((s, d) => s + d.avgRentSqm, 0) /
                  city.topDistricts.length;

                return (
                  <Link
                    key={city.slug}
                    href={`/wohnung-finden/${city.slug}`}
                    className="group rounded-xl border border-slate-800 bg-slate-900/40 p-5 hover:border-slate-600 hover:bg-slate-900/70 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <MapPin className="h-4 w-4 text-indigo-400" />
                          <h2 className="font-semibold text-white">{city.name}</h2>
                        </div>
                        <p className="text-xs text-slate-500">{city.state}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-slate-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all mt-0.5" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <div>
                        <div className="text-base font-bold text-white">{city.apartmentsPerDay}</div>
                        <div className="text-xs text-slate-600">Inserate/Tag</div>
                      </div>
                      <div>
                        <div className="text-base font-bold text-rose-300">{city.avgBewerber}</div>
                        <div className="text-xs text-slate-600">Bewerber</div>
                      </div>
                      <div>
                        <div className="text-base font-bold text-slate-300">
                          {avgRent.toFixed(0)} €
                        </div>
                        <div className="text-xs text-slate-600">Ø/m²</div>
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
    </div>
  );
}
