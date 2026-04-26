"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/60 bg-[#0a0a0f]/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="relative flex h-8 w-8 items-center justify-center">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
              >
                {/* Stilisierte Lyra */}
                <path
                  d="M16 2 L16 30"
                  stroke="#4f46e5"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M8 6 L8 26"
                  stroke="#4f46e5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.7"
                />
                <path
                  d="M24 6 L24 26"
                  stroke="#4f46e5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.7"
                />
                <path
                  d="M8 6 Q16 2 24 6"
                  stroke="#818cf8"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M8 26 Q16 30 24 26"
                  stroke="#818cf8"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
                <circle cx="16" cy="14" r="2" fill="#818cf8" />
                <circle cx="16" cy="20" r="1.5" fill="#4f46e5" opacity="0.8" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Lyrvio
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <Link href="/#wie-es-funktioniert" className="hover:text-white transition-colors">
              Wie es funktioniert
            </Link>
            <Link href="/#preise" className="hover:text-white transition-colors">
              Preise
            </Link>
            <Link href="/#faq" className="hover:text-white transition-colors">
              FAQ
            </Link>
            <Link href="/extension" className="hover:text-white transition-colors">
              Extension
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/#preise">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                <Star className="h-3.5 w-3.5" />
                Jetzt starten
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-400 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-slate-800 bg-[#0a0a0f] px-4 py-4 space-y-3">
          <Link
            href="/#wie-es-funktioniert"
            className="block text-slate-400 hover:text-white py-2"
            onClick={() => setOpen(false)}
          >
            Wie es funktioniert
          </Link>
          <Link
            href="/#preise"
            className="block text-slate-400 hover:text-white py-2"
            onClick={() => setOpen(false)}
          >
            Preise
          </Link>
          <Link
            href="/#faq"
            className="block text-slate-400 hover:text-white py-2"
            onClick={() => setOpen(false)}
          >
            FAQ
          </Link>
          <Link
            href="/extension"
            className="block text-slate-400 hover:text-white py-2"
            onClick={() => setOpen(false)}
          >
            Extension installieren
          </Link>
          <div className="pt-2 flex gap-3">
            <Link href="/dashboard" className="flex-1">
              <Button variant="outline" size="sm" className="w-full">
                Login
              </Button>
            </Link>
            <Link href="/#preise" className="flex-1">
              <Button size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700">
                Starten
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
