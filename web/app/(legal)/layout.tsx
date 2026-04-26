import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { TopTicker } from "@/components/TopTicker";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopTicker />
      <Nav />
      <main className="bg-paper min-h-screen">
        <div className="mx-auto max-w-[860px] px-6 lg:px-10 pt-20 pb-24">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
