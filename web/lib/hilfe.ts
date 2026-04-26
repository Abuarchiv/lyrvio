import fs from "fs";
import path from "path";
import matter from "gray-matter";

const hilfeDir = path.join(process.cwd(), "content/hilfe");

export interface HilfeArticle {
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  order: number;
  description: string;
  updated: string;
  content: string;
}

export const CATEGORIES = [
  {
    id: "erste-schritte",
    label: "Erste Schritte",
    icon: "Rocket",
    color: "indigo",
  },
  {
    id: "bewerbungen-verstehen",
    label: "Bewerbungen verstehen",
    icon: "FileText",
    color: "violet",
  },
  {
    id: "plattformen",
    label: "Plattformen",
    icon: "Globe",
    color: "blue",
  },
  {
    id: "account-bezahlung",
    label: "Account & Bezahlung",
    icon: "CreditCard",
    color: "emerald",
  },
  {
    id: "datenschutz-sicherheit",
    label: "Datenschutz & Sicherheit",
    icon: "Shield",
    color: "amber",
  },
  {
    id: "troubleshooting",
    label: "Troubleshooting",
    icon: "Wrench",
    color: "rose",
  },
] as const;

export function getAllArticles(): HilfeArticle[] {
  const files = fs.readdirSync(hilfeDir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((filename) => {
      const filepath = path.join(hilfeDir, filename);
      const raw = fs.readFileSync(filepath, "utf-8");
      const { data, content } = matter(raw);
      return {
        slug: data.slug as string,
        title: data.title as string,
        category: data.category as string,
        categoryLabel: data.categoryLabel as string,
        order: (data.order as number) ?? 99,
        description: data.description as string,
        updated: data.updated as string,
        content,
      };
    })
    .sort((a, b) => {
      const catOrder = CATEGORIES.findIndex((c) => c.id === a.category);
      const catOrderB = CATEGORIES.findIndex((c) => c.id === b.category);
      if (catOrder !== catOrderB) return catOrder - catOrderB;
      return a.order - b.order;
    });
}

export function getArticleBySlug(slug: string): HilfeArticle | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string): HilfeArticle[] {
  return getAllArticles().filter((a) => a.category === category);
}

export function getSearchIndex(): Array<{
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  content: string;
}> {
  return getAllArticles().map(({ content, ...rest }) => ({
    ...rest,
    content: content.replace(/#+\s/g, "").replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1"),
  }));
}
