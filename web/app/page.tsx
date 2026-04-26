import { Nav } from "@/components/Nav";
import { TopTicker } from "@/components/TopTicker";
import { Hero } from "@/components/Hero";
import { SlamCounter } from "@/components/SlamCounter";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <TopTicker />
      <Nav />
      <main>
        <Hero />
        <SlamCounter />
      </main>
      <Footer />
    </>
  );
}
