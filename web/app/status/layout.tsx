import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Status — Lyrvio",
  description: "Echtzeit-Status aller Lyrvio-Services und Infrastruktur.",
};

export default function StatusLayout({ children }: { children: React.ReactNode }) {
  return children;
}
