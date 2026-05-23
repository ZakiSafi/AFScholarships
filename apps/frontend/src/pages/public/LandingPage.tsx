import { CTASection } from '../../components/landing/CTASection'
import { FeaturedScholarshipsSection } from '../../components/landing/FeaturedScholarshipsSection'
import { GuidesSection } from '../../components/landing/GuidesSection'
import { HeroSection } from '../../components/landing/HeroSection'
import { HowItWorksSection } from '../../components/landing/HowItWorksSection'
import { PopularDestinationsSection } from '../../components/landing/PopularDestinationsSection'
import { ScholarshipSearchSection } from '../../components/landing/ScholarshipSearchSection'
import { TrustAndVerificationSection } from '../../components/landing/TrustAndVerificationSection'
import { WhyAfScholarshipsSection } from '../../components/landing/WhyAfScholarshipsSection'
import { Footer } from '../../components/layout/Footer'
import { PublicNavbar } from '../../components/layout/PublicNavbar'

export function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--color-bg)]">
      <PublicNavbar />
      <main>
        <HeroSection />
        <ScholarshipSearchSection />
        <FeaturedScholarshipsSection />
        <HowItWorksSection />
        <WhyAfScholarshipsSection />
        <PopularDestinationsSection />
        <TrustAndVerificationSection />
        <GuidesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
