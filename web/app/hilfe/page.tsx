import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CategoryGrid } from "@/components/hilfe/CategoryGrid";
import { SearchBar } from "@/components/hilfe/SearchBar";
import { getAllArticles, getSearchIndex } from "@/lib/hilfe";
import { MessageCircle, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Help-Center — Lyrvio",
  description:
    "Antworten auf alle Fragen zu Lyrvio: Extension installieren, Bewerbungen verstehen, Plattformen, Datenschutz und Troubleshooting.",
  openGraph: {
    title: "Lyrvio Help-Center",
    description: "Alle Antworten zu Lyrvio — Wohnungs-Bot für DACH.",
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
    <div className="flex flex-col min-h-screen bg-[#0a0a0f]">
      <Nav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1 pt-24 pb-20">
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-sm text-indigo-300 mb-6">
            <BookOpen className="h-3.5 w-3.5" />
            Help-Center
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            Wie können wir helfen?
          </h1>
          <p className="text-slate-400 text-lg mb-10">
            {articles.length} Artikel zu allen Themen rund um Lyrvio.
          </p>

          {/* Search */}
          <SearchBar articles={searchIndex} />
        </section>

        {/* Category Grid */}
        <section className="mx-auto max-w-6xl px-4 sm:px-6 mb-20">
          <CategoryGrid articlesByCategory={articlesByCategory} />
        </section>

        {/* Contact Banner */}
        <section className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500/10">
                <MessageCircle className="h-6 w-6 text-indigo-400" />
              </div>
            </div>
            <h2 className="text-white font-semibold text-lg mb-2">
              Keine Antwort gefunden?
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              Schreib uns direkt — wir antworten innerhalb von 24 Stunden.
            </p>
            <a
              href="mailto:support@lyrvio.com"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-3 rounded-xl transition-colors text-sm"
            >
              support@lyrvio.com
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
