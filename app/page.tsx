import HeroSection from "@/components/hero-section"
import AboutMe from "@/components/about-me"
import TrustBar from "@/components/trust-bar"
import ValueProposition from "@/components/value-proposition"
import FeaturesShowcase from "@/components/features-showcase"
import PortfolioGallery from "@/components/portfolio-gallery"
import AftercareSection from "@/components/aftercare-section"
import ProcessTimeline from "@/components/process-timeline"

import HomeCTA from "@/components/home-cta"
import LuxuryFooter from "@/components/luxury-footer"
import ScrollProgress from "@/components/scroll-progress"
import Widget from "@/components/Widget"



export default function Home() {
  return (
    <main className="relative bg-black text-white overflow-x-hidden">
      <ScrollProgress />
      <HeroSection />
      <section id="about">
        <AboutMe />
      </section>
      <TrustBar />
      <ValueProposition />
      {/* <FeaturesShowcase /> */}
      <section id="portfolio">
        <PortfolioGallery />
      </section>
      <AftercareSection />
      {/* <section id="process">
        <ProcessTimeline />
      </section> */}

      <HomeCTA />
      <LuxuryFooter />
      {/* <Widget /> */}
    </main>
  )
}
