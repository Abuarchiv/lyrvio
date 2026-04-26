import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Pricing } from "@/components/Pricing";
import { SocialProof } from "@/components/SocialProof";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { IssueHeader } from "@/components/IssueHeader";

export default function HomePage() {
  return (
    <>
      <IssueHeader />
      <Nav />
      <main>
        <Hero />
        <HowItWorks />
        <SocialProof />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
