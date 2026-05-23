import { CTASection } from '../../components/landing/CTASection'
import { FeaturedScholarshipsSection } from '../../components/landing/FeaturedScholarshipsSection'
import { GuidesSection } from '../../components/landing/GuidesSection'
import { HeroSection } from '../../components/landing/HeroSection'
import { HowItWorksSection } from '../../components/landing/HowItWorksSection'
import { PopularDestinationsSection } from '../../components/landing/PopularDestinationsSection'
import { ScholarshipSearchSection } from '../../components/landing/ScholarshipSearchSection'
import { TrustAndVerificationSection } from '../../components/landing/TrustAndVerificationSection'
import { WhyAfScholarshipsSection } from '../../components/landing/WhyAfScholarshipsSection'
export function LandingPage() {
  return (
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
  )
}
