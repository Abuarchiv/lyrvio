"use client";

import Link from "next/link";
import { useState } from "react";

const links = [
  { href: "/protokoll", label: "Protokoll" },
  { href: "/gebuehren", label: "Gebühren" },
  { href: "/belege", label: "Belege" },
  { href: "/akte", label: "Akte" },
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
            className="font-mono text-[13px] font-bold tracking-[0.18em] uppercase text-ink hover:text-stamp transition-colors"
            aria-label="Lyrvio"
          >
            LYRVIO<span className="text-stamp">·</span>001
          </Link>

          <nav className="hidden md:flex items-center gap-10 font-mono text-[12px] uppercase tracking-[0.16em]">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-ink hover:text-stamp transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-5 font-mono text-[12px] uppercase tracking-[0.16em]">
            <Link
              href="/dashboard"
              className="text-ash hover:text-ink transition-colors"
            >
              Dossier
            </Link>
            <Link
              href="/checkout?plan=aktiv"
              className="btn-primary !py-2 !px-4 !text-[11px]"
            >
              Bot beauftragen
            </Link>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden font-mono text-[12px] uppercase tracking-[0.16em] text-ink"
            aria-label="Menü"
          >
            {open ? "Schließen" : "Menü"}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-rule-soft py-4 flex flex-col gap-4 font-mono text-[12px] uppercase tracking-[0.16em]">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-ink"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="text-ash"
            >
              Dossier
            </Link>
            <Link
              href="/checkout?plan=aktiv"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 self-start"
            >
              Bot beauftragen
            </Link>
          </div>
        )}
      </div>

      {/* Akten-Sub-Bar */}
      <div className="border-t border-rule-soft bg-paper-2">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 h-9 flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.18em] text-ash">
          <div className="flex items-center gap-6">
            <span>
              <span className="text-stamp">●</span> 24/7 aktiv
            </span>
            <span className="hidden sm:inline">
              Berlin · München · Hamburg · Köln · Frankfurt
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6">
            <span>Ausgabe Nr. 042</span>
            <span>{today}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
