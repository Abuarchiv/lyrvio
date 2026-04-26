import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ArticleSidebar } from "@/components/hilfe/ArticleSidebar";
import { getAllArticles, getArticleBySlug } from "@/lib/hilfe";
import { markdownToHtml } from "@/lib/markdown";
import { Calendar, ChevronRight } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: `${article.title} — Lyrvio Help-Center`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://lyrvio.com/hilfe/${article.slug}`,
      siteName: "Lyrvio",
      locale: "de_DE",
      type: "article",
      publishedTime: article.updated,
    },
    robots: { index: true, follow: true },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = getAllArticles();
  const categoryArticles = allArticles.filter(
    (a) => a.category === article.category
  );
  const currentIndex = categoryArticles.findIndex((a) => a.slug === article.slug);
  const prevArticle = categoryArticles[currentIndex - 1] ?? null;
  const nextArticle = categoryArticles[currentIndex + 1] ?? null;

  const htmlContent = markdownToHtml(article.content);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: article.title,
        acceptedAnswer: {
          "@type": "Answer",
          text: article.description,
        },
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f]">
      <Nav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-1 pt-24 pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-8">
            <Link href="/hilfe" className="hover:text-slate-300 transition-colors">
              Help-Center
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link
              href={`/hilfe#${article.category}`}
              className="hover:text-slate-300 transition-colors"
            >
              {article.categoryLabel}
            </Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-slate-400">{article.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Sidebar */}
            <ArticleSidebar
              currentSlug={article.slug}
              currentCategory={article.category}
              articles={allArticles}
            />

            {/* Main Content */}
            <article className="flex-1 min-w-0">
              {/* Article Header */}
              <header className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full">
                    {article.categoryLabel}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
                  {article.title}
                </h1>
                <p className="text-slate-400 text-lg leading-relaxed mb-4">
                  {article.description}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>
                    Zuletzt aktualisiert:{" "}
                    {new Date(article.updated).toLocaleDateString("de-DE", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </header>

              {/* Article Content */}
              <div
                className="prose-lyrvio"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />

              {/* Prev / Next Navigation */}
              {(prevArticle || nextArticle) && (
                <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-slate-800">
                  {prevArticle && (
                    <Link
                      href={`/hilfe/${prevArticle.slug}`}
                      className="flex-1 flex flex-col gap-1 p-4 rounded-xl border border-slate-800 hover:border-slate-700 hover:bg-slate-900/50 transition-colors group"
                    >
                      <span className="text-xs text-slate-600 group-hover:text-slate-500">
                        ← Vorheriger Artikel
                      </span>
                      <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">
                        {prevArticle.title}
                      </span>
                    </Link>
                  )}
                  {nextArticle && (
                    <Link
                      href={`/hilfe/${nextArticle.slug}`}
                      className="flex-1 flex flex-col gap-1 p-4 rounded-xl border border-slate-800 hover:border-slate-700 hover:bg-slate-900/50 transition-colors group text-right"
                    >
                      <span className="text-xs text-slate-600 group-hover:text-slate-500">
                        Nächster Artikel →
                      </span>
                      <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">
                        {nextArticle.title}
                      </span>
                    </Link>
                  )}
                </div>
              )}

              {/* Contact CTA */}
              <div className="mt-12 p-6 rounded-xl bg-slate-900/50 border border-slate-800 text-center">
                <p className="text-slate-400 text-sm mb-3">
                  War dieser Artikel hilfreich? Hast du noch Fragen?
                </p>
                <a
                  href="mailto:support@lyrvio.com"
                  className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors"
                >
                  support@lyrvio.com schreiben →
                </a>
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
