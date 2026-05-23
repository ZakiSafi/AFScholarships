import { Button } from '../ui/Button'

export function CTASection() {
  return (
    <section
      className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24"
      aria-labelledby="cta-heading"
    >
      <div className="cta-gradient rounded-2xl px-6 py-14 text-center shadow-elevated sm:px-12 sm:py-16">
        <h2
          id="cta-heading"
          className="text-2xl font-extrabold text-white sm:text-3xl"
        >
          Ready to find your next opportunity?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base font-medium text-blue-50">
          Explore verified scholarships and build your application plan with
          confidence.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button variant="white" size="lg" to="/scholarships">
            Explore Scholarships
          </Button>
          <Button
            size="lg"
            to="/auth/signup"
            className="bg-[var(--color-accent)] font-bold text-slate-900 hover:bg-amber-400"
          >
            Create Free Account
          </Button>
        </div>
      </div>
    </section>
  )
}
