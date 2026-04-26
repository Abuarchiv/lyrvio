import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lyrvio.pages.dev"),
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
    url: "https://lyrvio.pages.dev",
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
      className={`${geist.variable} ${geistMono.variable} ${fraunces.variable}`}
    >
      <head>
        {/* Cloudflare Web Analytics — DSGVO-konform, kein Cookie-Banner */}
        <script
          defer
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "ed3d170682404aa2a3aa21f928f7f31b"}'
        />
      </head>
      <body className="min-h-screen bg-paper text-ink antialiased paper-grain">
        {children}
      </body>
    </html>
  );
}
