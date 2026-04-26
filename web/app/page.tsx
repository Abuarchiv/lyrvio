import { Nav } from "@/components/Nav";
import { TopTicker } from "@/components/TopTicker";
import { Hero } from "@/components/Hero";
import { SlamCounter } from "@/components/SlamCounter";
import { Founder } from "@/components/Founder";
import { Waitlist } from "@/components/Waitlist";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <TopTicker />
      <Nav />
      <main>
        <Hero />
        <SlamCounter />
        <Founder />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
