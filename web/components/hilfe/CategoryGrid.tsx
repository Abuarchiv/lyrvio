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

const COLOR_MAP = {
  indigo: {
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    icon: "text-indigo-400",
    badge: "bg-indigo-500/10 text-indigo-400",
    hover: "hover:border-indigo-500/40",
  },
  violet: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    icon: "text-violet-400",
    badge: "bg-violet-500/10 text-violet-400",
    hover: "hover:border-violet-500/40",
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    icon: "text-blue-400",
    badge: "bg-blue-500/10 text-blue-400",
    hover: "hover:border-blue-500/40",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    icon: "text-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400",
    hover: "hover:border-emerald-500/40",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    icon: "text-amber-400",
    badge: "bg-amber-500/10 text-amber-400",
    hover: "hover:border-amber-500/40",
  },
  rose: {
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    icon: "text-rose-400",
    badge: "bg-rose-500/10 text-rose-400",
    hover: "hover:border-rose-500/40",
  },
} as const;

export function CategoryGrid({ articlesByCategory }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {CATEGORIES.map((cat) => {
        const Icon = ICONS[cat.icon as keyof typeof ICONS];
        const colors = COLOR_MAP[cat.color];
        const articles = articlesByCategory[cat.id] ?? [];

        return (
          <div
            key={cat.id}
            className={`rounded-2xl border ${colors.border} ${colors.hover} bg-slate-900/50 p-6 transition-colors`}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors.bg}`}>
                <Icon className={`h-5 w-5 ${colors.icon}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-white font-semibold text-sm">{cat.label}</h2>
                <span className={`text-xs px-2 py-0.5 rounded-full ${colors.badge} mt-0.5 inline-block`}>
                  {articles.length} Artikel
                </span>
              </div>
            </div>

            {/* Article List */}
            <ul className="space-y-2">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/hilfe/${article.slug}`}
                    className="flex items-center gap-2 text-slate-400 hover:text-slate-200 transition-colors group text-sm py-1"
                  >
                    <ChevronRight className="h-3.5 w-3.5 flex-shrink-0 text-slate-600 group-hover:text-slate-400 transition-colors" />
                    <span className="leading-snug">{article.title}</span>
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
