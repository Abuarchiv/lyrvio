"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/85 backdrop-blur-xl">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="font-display text-[26px] leading-none tracking-[-0.02em] text-bone hover:text-lime transition-colors"
            aria-label="Lyrvio · Startseite"
          >
            Lyrvio<span className="text-lime">.</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[14px] text-bone-2">
            <Link href="/#wie" className="hover:text-bone transition-colors">
              Wie es läuft
            </Link>
            <Link href="/#preise" className="hover:text-bone transition-colors">
              Preis
            </Link>
            <Link href="/wohnung-finden/berlin" className="hover:text-bone transition-colors">
              Städte
            </Link>
            <Link href="/hilfe" className="hover:text-bone transition-colors">
              Hilfe
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-[14px] text-ash hover:text-bone transition-colors"
            >
              Login
            </Link>
            <Link href="/#preise" className="btn-lime !py-2 !px-4 !text-[13px]">
              Bot aktivieren
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-bone-2 hover:text-bone"
            onClick={() => setOpen(!open)}
            aria-label="Menü"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-line bg-ink px-6 py-6 space-y-4">
          {[
            { href: "/#wie", label: "Wie es läuft" },
            { href: "/#preise", label: "Preis" },
            { href: "/wohnung-finden/berlin", label: "Städte" },
            { href: "/hilfe", label: "Hilfe" },
            { href: "/dashboard", label: "Login" },
          ].map((it) => (
            <Link
              key={it.href}
              href={it.href}
              onClick={() => setOpen(false)}
              className="block text-bone-2 hover:text-bone py-1"
            >
              {it.label}
            </Link>
          ))}
          <Link href="/#preise" onClick={() => setOpen(false)} className="btn-lime w-full">
            Bot aktivieren
          </Link>
        </div>
      )}
    </header>
  );
}
