import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TopTicker } from "@/components/TopTicker";
import { CategoryGrid } from "@/components/hilfe/CategoryGrid";
import { SearchBar } from "@/components/hilfe/SearchBar";
import { getAllArticles, getSearchIndex } from "@/lib/hilfe";

export const metadata: Metadata = {
  title: "Hilfe",
  description:
    "Antworten auf alle Fragen zu Lyrvio: Extension installieren, Bewerbungen verstehen, Plattformen, Datenschutz und Troubleshooting.",
  openGraph: {
    title: "Lyrvio Help-Center",
    description: "Alle Antworten zu Lyrvio — automatische Wohnungsbewerbung für DACH.",
    url: "https://lyrvio.com/hilfe",
    siteName: "Lyrvio",
    locale: "de_DE",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function HilfePage() {
  const articles = getAllArticles();
  const searchIndex = getSearchIndex();

  const articlesByCategory: Record<string, typeof articles> = {};
  articles.forEach((a) => {
    if (!articlesByCategory[a.category]) articlesByCategory[a.category] = [];
    articlesByCategory[a.category].push(a);
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: articles.slice(0, 10).map((a) => ({
      "@type": "Question",
      name: a.title,
      acceptedAnswer: {
        "@type": "Answer",
        text: a.description,
      },
    })),
  };

  return (
    <>
      <TopTicker />
      <Nav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main>
        {/* Header */}
        <section className="border-b-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 pb-16 lg:pt-24 lg:pb-20">
            <div className="flex items-center gap-4 mb-10 flex-wrap">
              <span className="stamp-rotated">§ HILFE</span>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ash">
                Help-Center · {articles.length} Artikel
              </span>
            </div>
            <h1 className="manifest mb-10">
              Wie können
              <br />
              wir <em>helfen?</em>
            </h1>
            <div className="max-w-[600px]">
              <SearchBar articles={searchIndex} />
            </div>
          </div>
        </section>

        {/* Category Grid */}
        <section className="bg-paper">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20">
            <CategoryGrid articlesByCategory={articlesByCategory} />
          </div>
        </section>

        {/* Contact Banner */}
        <section className="border-t-2 border-ink">
          <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="font-display text-[28px] sm:text-[36px] tracking-[-0.02em] text-ink max-w-[24ch]">
                Keine Antwort gefunden?
              </p>
              <p className="font-mono text-[14px] text-ash mt-2">
                Schreib uns direkt — wir antworten innerhalb von 24 Stunden.
              </p>
            </div>
            <a href="mailto:support@lyrvio.com" className="btn-primary">
              support@lyrvio.com
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
