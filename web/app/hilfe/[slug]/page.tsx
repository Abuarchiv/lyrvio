import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TopTicker } from "@/components/TopTicker";
import { ArticleSidebar } from "@/components/hilfe/ArticleSidebar";
import { getAllArticles, getArticleBySlug } from "@/lib/hilfe";
import { markdownToHtml } from "@/lib/markdown";

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
    <>
      <TopTicker />
      <Nav />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-paper">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 pt-16 pb-24">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-mono text-[12px] text-ash mb-12 flex-wrap">
            <Link href="/hilfe" className="hover:text-ink transition-colors">
              Help-Center
            </Link>
            <span>›</span>
            <Link
              href={`/hilfe#${article.category}`}
              className="hover:text-ink transition-colors"
            >
              {article.categoryLabel}
            </Link>
            <span>›</span>
            <span className="text-ink">{article.title}</span>
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
              <header className="mb-10 pb-10 border-b-2 border-ink">
                <div className="flex items-center gap-4 mb-6 flex-wrap">
                  <span className="stamp-rotated">§ DOK</span>
                  <span className="tag">{article.categoryLabel}</span>
                </div>
                <h1 className="font-display text-[36px] sm:text-[48px] tracking-[-0.03em] text-ink leading-[1.1] mb-4">
                  {article.title}
                </h1>
                <p className="font-mono text-[15px] leading-[1.7] text-ink-2 mb-4">
                  {article.description}
                </p>
                <p className="font-mono text-[11px] text-ash">
                  Zuletzt aktualisiert:{" "}
                  {new Date(article.updated).toLocaleDateString("de-DE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </header>

              {/* Article Content */}
              <div
                className="prose-lyrvio"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />

              {/* Prev / Next Navigation */}
              {(prevArticle || nextArticle) && (
                <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t-2 border-ink">
                  {prevArticle && (
                    <Link
                      href={`/hilfe/${prevArticle.slug}`}
                      className="flex-1 flex flex-col gap-1 p-5 border-2 border-ink hover:bg-paper-warm transition-colors group"
                    >
                      <span className="font-mono text-[11px] text-ash group-hover:text-ink-2">
                        ← Vorheriger Artikel
                      </span>
                      <span className="font-display text-[18px] tracking-[-0.02em] text-ink leading-[1.2]">
                        {prevArticle.title}
                      </span>
                    </Link>
                  )}
                  {nextArticle && (
                    <Link
                      href={`/hilfe/${nextArticle.slug}`}
                      className="flex-1 flex flex-col gap-1 p-5 border-2 border-ink hover:bg-paper-warm transition-colors group text-right"
                    >
                      <span className="font-mono text-[11px] text-ash group-hover:text-ink-2">
                        Nächster Artikel →
                      </span>
                      <span className="font-display text-[18px] tracking-[-0.02em] text-ink leading-[1.2]">
                        {nextArticle.title}
                      </span>
                    </Link>
                  )}
                </div>
              )}

              {/* Contact CTA */}
              <div className="mt-12 p-6 border-2 border-ink bg-paper-warm">
                <p className="font-mono text-[14px] text-ink mb-3">
                  War dieser Artikel hilfreich? Hast du noch Fragen?
                </p>
                <a
                  href="mailto:support@lyrvio.com"
                  className="link-underline font-mono text-[14px]"
                >
                  support@lyrvio.com schreiben →
                </a>
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
