import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORIES } from "@/lib/hilfe";

interface SidebarArticle {
  slug: string;
  title: string;
  category: string;
}

interface ArticleSidebarProps {
  currentSlug: string;
  currentCategory: string;
  articles: SidebarArticle[];
}

export function ArticleSidebar({
  currentSlug,
  currentCategory,
  articles,
}: ArticleSidebarProps) {
  const categoryMeta = CATEGORIES.find((c) => c.id === currentCategory);
  const categoryArticles = articles.filter(
    (a) => a.category === currentCategory
  );

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      {/* Back to Help Center */}
      <Link
        href="/hilfe"
        className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-300 transition-colors mb-6 group"
      >
        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
        Help-Center
      </Link>

      {/* Category Label */}
      {categoryMeta && (
        <div className="mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {categoryMeta.label}
          </span>
        </div>
      )}

      {/* Article List in Category */}
      <nav className="space-y-0.5">
        {categoryArticles.map((article) => {
          const isActive = article.slug === currentSlug;
          return (
            <Link
              key={article.slug}
              href={`/hilfe/${article.slug}`}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                isActive
                  ? "bg-indigo-600/20 text-indigo-300 font-medium"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
              }`}
            >
              {isActive && (
                <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-indigo-400" />
              )}
              <span className={isActive ? "" : "pl-5"}>{article.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Other Categories */}
      <div className="mt-8">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 block mb-3">
          Weitere Kategorien
        </span>
        <nav className="space-y-1">
          {CATEGORIES.filter((c) => c.id !== currentCategory).map((cat) => (
            <Link
              key={cat.id}
              href={`/hilfe#${cat.id}`}
              className="block text-sm text-slate-500 hover:text-slate-300 transition-colors py-1 px-2 rounded-lg hover:bg-slate-800"
            >
              {cat.label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
