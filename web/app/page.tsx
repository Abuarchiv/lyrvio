import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { SocialProof } from "@/components/SocialProof";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0f]">
      <Nav />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <SocialProof />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}
