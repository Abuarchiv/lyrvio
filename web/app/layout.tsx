import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lyrvio — Der Wohnungs-Bot für schnelle Bewerbungen",
  description:
    "In Berlin und München laufen 800 Bewerbungen pro Wohnung ein. Lyrvio läuft 24/7 in deinem Browser und sendet Bewerbungen sobald passende Wohnungen online gehen. Sei der Erste.",
  keywords: [
    "Wohnungssuche",
    "Berlin Wohnung",
    "München Wohnung",
    "automatische Bewerbung",
    "Wohnungs-Bot",
    "Lyrvio",
  ],
  openGraph: {
    title: "Lyrvio — Sei der Erste. Immer.",
    description:
      "24/7-Bot sendet Wohnungsbewerbungen sobald neue Inserate live gehen. 5× mehr Besichtigungs-Einladungen.",
    url: "https://lyrvio.pages.dev",
    siteName: "Lyrvio",
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lyrvio — Wohnungs-Bot",
    description: "24/7 automatische Wohnungsbewerbungen. Sei der Erste.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${inter.className} h-full`}>
      <head>
        {/* Analytics: Cloudflare Web Analytics (kostenlos, DSGVO-konform, kein Cookie-Banner)
            Aktivierung via Cloudflare Dashboard → Web Analytics → Add Site → lyrvio.pages.dev
            Kein Script-Tag nötig wenn über Cloudflare Pages deployed (automatisch injiziert).
            Für Custom-Events: Cloudflare Analytics Engine (kostenlos 100K Events/Tag) nutzen. */}
      </head>
      <body className="min-h-full flex flex-col bg-[#0a0a0f] text-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}
