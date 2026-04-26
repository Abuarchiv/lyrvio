"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/protokoll", label: "So funktioniert's" },
  { href: "/gebuehren", label: "Preis" },
  { href: "/belege", label: "Erfolge" },
  { href: "/akte", label: "Fragen" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const today = new Date().toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="relative z-30 border-b-2 border-ink bg-paper">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="flex h-14 items-center justify-between">
          <Link
            href="/"
            prefetch={false}
            className="font-mono text-[14px] font-bold tracking-[0.18em] uppercase text-ink hover:text-stamp transition-colors"
            aria-label="Lyrvio"
          >
            LYRVIO
          </Link>

          <nav className="hidden md:flex items-center gap-8 font-mono text-[12px] uppercase tracking-[0.14em]">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                prefetch={false}
                className="text-ink hover:text-stamp transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-5 font-mono text-[12px] uppercase tracking-[0.14em]">
            <Link
              href="/dashboard"
              prefetch={false}
              className="text-ash hover:text-ink transition-colors"
            >
              Mein Konto
            </Link>
            <Link
              href="/checkout/erfolg"
              className="btn-primary !py-2 !px-4 !text-[11px]"
            >
              Jetzt loslegen
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden font-mono text-[12px] uppercase tracking-[0.14em] text-ink"
            aria-label="Menü"
          >
            {open ? "Schließen" : "Menü"}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-rule-soft py-4 flex flex-col gap-4 font-mono text-[12px] uppercase tracking-[0.14em]">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                prefetch={false}
                onClick={() => setOpen(false)}
                className="text-ink"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              prefetch={false}
              onClick={() => setOpen(false)}
              className="text-ash"
            >
              Mein Konto
            </Link>
            <Link
              href="/checkout/erfolg"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 self-start"
            >
              Jetzt loslegen
            </Link>
          </div>
        )}
      </div>

      {/* Sub-Bar mit Live-Indikator */}
      <div className="border-t border-rule-soft bg-paper-2">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 h-9 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.16em] text-ash">
          <div className="flex items-center gap-6">
            <span>
              <span className="text-stamp">●</span> Aktiv 24/7
            </span>
            <span className="hidden sm:inline">
              Berlin · München · Hamburg · Köln · Frankfurt
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>{today}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
