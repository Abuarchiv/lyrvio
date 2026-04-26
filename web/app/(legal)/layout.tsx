import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f]">
      <Nav />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="prose prose-invert prose-sm max-w-none">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
