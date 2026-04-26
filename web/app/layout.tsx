import type { Metadata } from "next";
import { IBM_Plex_Mono, Fraunces } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lyrvio.vercel.app"),
  title: {
    default: "Lyrvio — Schreibt für dich Wohnungsbewerbungen",
    template: "%s · Lyrvio",
  },
  description:
    "In Berlin werden Wohnungen 4 Minuten nach dem Inserat bereits ausgebucht. Lyrvio läuft 24/7 in deinem Browser und schreibt für dich, wenn du gerade nicht kannst.",
  keywords: [
    "Wohnungssuche",
    "Wohnungssuche automatisieren",
    "ImmoScout24 automatisch bewerben",
    "automatische Bewerbung",
    "Berlin Wohnung",
    "München Wohnung",
    "Lyrvio",
  ],
  openGraph: {
    title: "Lyrvio — Schreibt für dich Wohnungsbewerbungen",
    description:
      "In Berlin werden Wohnungen 4 Minuten nach dem Inserat bereits ausgebucht. Lyrvio läuft 24/7 in deinem Browser.",
    url: "https://lyrvio.vercel.app",
    siteName: "Lyrvio",
    locale: "de_DE",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Lyrvio — Eine Wohnung ist vier Minuten online — dann ist sie weg.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lyrvio — Schreibt für dich Wohnungsbewerbungen",
    description:
      "In Berlin werden Wohnungen 4 Minuten nach dem Inserat ausgebucht. Lyrvio läuft 24/7.",
    images: ["/og-image.svg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${ibmPlexMono.variable} ${fraunces.variable}`}
    >
      <head />
      <body className="min-h-screen bg-paper text-ink antialiased paper-grain">
        {children}
        {/* Cloudflare Web Analytics — DSGVO-konform, kein Cookie-Banner */}
        {/* lazyOnload = nach LCP geladen, blockiert FCP nicht */}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "ed3d170682404aa2a3aa21f928f7f31b"}'
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
