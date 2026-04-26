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
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      {/* Minimal header */}
      <header className="border-b border-slate-800/60 px-4 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold gradient-text"
          aria-label="Zurück zur Startseite"
        >
          Lyrvio
        </Link>
        <span className="text-xs text-slate-500">
          Fragen?{" "}
          <a
            href="mailto:support@lyrvio.com"
            className="text-indigo-400 hover:underline"
          >
            support@lyrvio.com
          </a>
        </span>
      </header>

      {/* Content */}
      <main
        id="main-content"
        className="flex-1 flex items-start justify-center px-4 py-8 sm:py-12"
      >
        <div className="w-full max-w-lg">{children}</div>
      </main>

      {/* Footer trust */}
      <footer className="border-t border-slate-800/60 px-4 py-3 text-center">
        <p className="text-xs text-slate-600">
          DSGVO-konform · SSL-verschlüsselt · Widerruf jederzeit ·{" "}
          <a href="/legal/datenschutz" className="hover:text-slate-400">
            Datenschutz
          </a>{" "}
          ·{" "}
          <a href="/legal/agb" className="hover:text-slate-400">
            AGB
          </a>
        </p>
      </footer>
    </div>
  );
}
