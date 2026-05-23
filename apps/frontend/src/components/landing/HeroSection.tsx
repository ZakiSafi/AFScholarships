import { ArrowRight } from 'lucide-react'
import { Button } from '../ui/Button'
import { HeroStats } from './HeroStats'
import { HeroVisual } from './HeroVisual'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white" aria-labelledby="hero-heading">
      <div className="lg:grid lg:min-h-[min(92vh,880px)] lg:grid-cols-2">
        {/* Photo first on mobile for immediate emotional hook */}
        <div className="order-1 lg:order-2">
          <HeroVisual />
        </div>

        <div className="order-2 flex flex-col justify-center px-5 py-12 sm:px-8 sm:py-14 lg:order-1 lg:px-12 lg:py-16 xl:px-16">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
            Afghan-first · Verified · Free
          </p>

          <h1
            id="hero-heading"
            className="mt-5 text-[2rem] font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl xl:text-[3.25rem]"
          >
            Scholarships you can trust.
            <span className="mt-1 block text-[var(--color-primary)]">
              Deadlines you won’t miss.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-600">
            Verified global opportunities, official links, and reminders—built for
            Afghan students who deserve clarity, not confusion.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              to="/scholarships"
              className="bg-[var(--color-primary)] shadow-md hover:bg-[var(--color-primary-dark)]"
            >
              Find scholarships
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button
              variant="outline"
              size="lg"
              to="/#how-it-works"
              className="border-slate-300 text-slate-700"
            >
              How it works
            </Button>
          </div>

          <HeroStats />
        </div>
      </div>
    </section>
  )
}
