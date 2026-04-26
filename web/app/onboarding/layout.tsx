import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lyrvio – Onboarding",
  description: "Richte deinen Wohnungs-Bot in 5 Minuten ein.",
  robots: { index: false, follow: false },
};

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-paper text-ink">
      {/* Minimal-Header im Akten-Stil */}
      <header className="border-b-2 border-ink px-6 py-3 flex items-center justify-between bg-paper">
        <Link
          href="/"
          className="font-mono text-[13px] font-bold tracking-[0.18em] uppercase text-ink hover:text-stamp transition-colors"
          aria-label="Zurück zur Startseite"
        >
          LYRVIO<span className="text-stamp">·</span>001
        </Link>
        <span className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ash">
          Fragen?{" "}
          <a
            href="mailto:akte@lyrvio.com"
            className="link-underline text-ink"
          >
            akte@lyrvio.com
          </a>
        </span>
      </header>

      <main
        id="main-content"
        className="flex-1 flex items-start justify-center px-6 py-12 sm:py-16"
      >
        <div className="w-full max-w-[640px]">{children}</div>
      </main>

      <footer className="border-t border-rule-soft px-6 py-3 text-center bg-paper-2">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ash">
          DSGVO-konform · SSL-verschlüsselt · Widerruf jederzeit ·{" "}
          <a href="/datenschutz" className="link-underline text-ink">
            Datenschutz
          </a>{" "}
          ·{" "}
          <a href="/agb" className="link-underline text-ink">
            AGB
          </a>
        </p>
      </footer>
    </div>
  );
}
