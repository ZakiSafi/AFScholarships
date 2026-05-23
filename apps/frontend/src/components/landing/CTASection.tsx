import { Button } from '../ui/Button'

export function CTASection() {
  return (
    <section
      className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20"
      aria-labelledby="cta-heading"
    >
      <div className="rounded-3xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] px-6 py-12 text-center shadow-soft sm:px-12 sm:py-16">
        <h2
          id="cta-heading"
          className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl"
        >
          Start your scholarship journey with confidence
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-emerald-100">
          Join thousands of Afghan students discovering verified global
          opportunities—free at launch.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="outline"
            size="lg"
            to="/scholarships"
            className="border-white/30 bg-white text-[var(--color-primary)] hover:bg-emerald-50"
          >
            Explore Scholarships
          </Button>
          <Button
            size="lg"
            to="/auth/signup"
            className="bg-[var(--color-accent)] text-slate-900 hover:bg-amber-400"
          >
            Create Free Account
          </Button>
        </div>
      </div>
    </section>
  )
}
