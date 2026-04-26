import Link from "next/link";
import {
  Rocket,
  FileText,
  Globe,
  CreditCard,
  Shield,
  Wrench,
  ChevronRight,
} from "lucide-react";
import { CATEGORIES } from "@/lib/hilfe";

interface Article {
  slug: string;
  title: string;
  category: string;
}

interface CategoryGridProps {
  articlesByCategory: Record<string, Article[]>;
}

const ICONS = {
  Rocket,
  FileText,
  Globe,
  CreditCard,
  Shield,
  Wrench,
} as const;

export function CategoryGrid({ articlesByCategory }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {CATEGORIES.map((cat) => {
        const Icon = ICONS[cat.icon as keyof typeof ICONS];
        const articles = articlesByCategory[cat.id] ?? [];

        return (
          <div
            key={cat.id}
            className="border-2 border-ink bg-paper-warm p-6 hover:bg-paper transition-colors"
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center border-2 border-ink bg-paper">
                <Icon className="h-5 w-5 text-ink" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-display text-[16px] tracking-[-0.01em] text-ink">
                  {cat.label}
                </h2>
                <span className="font-mono text-[11px] text-ash">
                  {articles.length} Artikel
                </span>
              </div>
            </div>

            {/* Article List */}
            <ul className="space-y-1">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/hilfe/${article.slug}`}
                    className="flex items-center gap-2 text-ink-2 hover:text-ink hover:bg-paper transition-colors group text-sm py-1 px-2 -mx-2"
                  >
                    <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-ash group-hover:text-stamp transition-colors" />
                    <span className="font-mono text-[13px] leading-snug">
                      {article.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
