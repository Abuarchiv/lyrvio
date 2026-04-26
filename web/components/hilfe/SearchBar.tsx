"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import Fuse from "fuse.js";

interface SearchItem {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryLabel: string;
  content: string;
}

interface SearchBarProps {
  articles: SearchItem[];
}

export function SearchBar({ articles }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchItem[]>([]);
  const [open, setOpen] = useState(false);

  const fuse = new Fuse(articles, {
    keys: [
      { name: "title", weight: 0.5 },
      { name: "description", weight: 0.3 },
      { name: "content", weight: 0.2 },
    ],
    threshold: 0.4,
    includeScore: true,
    minMatchCharLength: 2,
  });

  const search = useCallback(
    (q: string) => {
      if (q.trim().length < 2) {
        setResults([]);
        return;
      }
      const hits = fuse.search(q.trim()).slice(0, 6);
      setResults(hits.map((h) => h.item));
    },
    [articles]
  );

  useEffect(() => {
    search(query);
    setOpen(query.trim().length >= 2);
  }, [query, search]);

  const clear = () => {
    setQuery("");
    setResults([]);
    setOpen(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Suche im Help-Center…"
          className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-12 pr-12 py-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors text-base"
          onFocus={() => {
            if (query.trim().length >= 2) setOpen(true);
          }}
        />
        {query && (
          <button
            onClick={clear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            aria-label="Suche löschen"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50">
          {results.map((item) => (
            <Link
              key={item.slug}
              href={`/hilfe/${item.slug}`}
              onClick={clear}
              className="flex flex-col gap-0.5 px-4 py-3 hover:bg-slate-800 transition-colors border-b border-slate-800 last:border-0"
            >
              <span className="text-xs text-indigo-400 font-medium">
                {item.categoryLabel}
              </span>
              <span className="text-slate-200 text-sm font-medium">
                {item.title}
              </span>
              <span className="text-slate-500 text-xs line-clamp-1">
                {item.description}
              </span>
            </Link>
          ))}
        </div>
      )}

      {open && results.length === 0 && query.trim().length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-4 z-50">
          <p className="text-slate-500 text-sm text-center">
            Keine Artikel gefunden für „{query}". Probiere andere Suchbegriffe oder{" "}
            <a href="mailto:support@lyrvio.com" className="text-indigo-400 hover:underline">
              schreib uns
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
