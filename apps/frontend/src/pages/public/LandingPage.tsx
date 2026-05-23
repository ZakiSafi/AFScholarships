import { CTASection } from '../../components/landing/CTASection'
import { FeaturedScholarshipsSection } from '../../components/landing/FeaturedScholarshipsSection'
import { GuidesSection } from '../../components/landing/GuidesSection'
import { HeroSection } from '../../components/landing/HeroSection'
import { HowItWorksSection } from '../../components/landing/HowItWorksSection'
import { SearchScholarshipsSection } from '../../components/landing/SearchScholarshipsSection'
import { StatsSection } from '../../components/landing/StatsSection'
import { TrustSection } from '../../components/landing/TrustSection'
import { WhyAfScholarshipsSection } from '../../components/landing/WhyAfScholarshipsSection'
import { Footer } from '../../components/layout/Footer'
import { PublicNavbar } from '../../components/layout/PublicNavbar'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <PublicNavbar />
      <main>
        <HeroSection />
        <SearchScholarshipsSection />
        <FeaturedScholarshipsSection />
        <HowItWorksSection />
        <WhyAfScholarshipsSection />
        <StatsSection />
        <TrustSection />
        <GuidesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
