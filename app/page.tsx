import HeroSection from "@/components/hero-section"
import AboutMe from "@/components/about-me"
import TrustBar from "@/components/trust-bar"
import ValueProposition from "@/components/value-proposition"
import FeaturesShowcase from "@/components/features-showcase"
import PortfolioGallery from "@/components/portfolio-gallery"
import AwardsSection from "@/components/awards-section"
import ProcessTimeline from "@/components/process-timeline"
import FAQSection from "@/components/faq-section"
import BookingWrapper from "@/components/booking-wrapper"
import LuxuryFooter from "@/components/luxury-footer"
import ScrollProgress from "@/components/scroll-progress"
import Widget from "@/components/Widget"



export default function Home() {
  return (
    <main className="relative bg-black text-white overflow-x-hidden pt-20">
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
      <AwardsSection />
      {/* <section id="process">
        <ProcessTimeline />
      </section> */}
      <section id="faq">
        <FAQSection />
      </section>
      <BookingWrapper />
      <LuxuryFooter />
      <Widget />
    </main>
  )
}
