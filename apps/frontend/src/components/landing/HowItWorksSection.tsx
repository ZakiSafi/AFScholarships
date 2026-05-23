import { howItWorksSteps } from '../../data/landing'
import { Card } from '../ui/Card'

export function HowItWorksSection() {
  return (
    <section
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      aria-labelledby="how-it-works-heading"
    >
      <div className="text-center">
        <h2
          id="how-it-works-heading"
          className="text-2xl font-bold text-[var(--color-text)] sm:text-3xl"
        >
          How it works
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-[var(--color-muted)]">
          From discovery to application—four simple steps to find and secure
          scholarships.
        </p>
      </div>

      <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {howItWorksSteps.map((item) => (
          <li key={item.step}>
            <Card className="h-full">
              <span
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)] text-lg font-bold text-white"
                aria-hidden
              >
                {item.step}
              </span>
              <h3 className="mt-4 font-bold text-[var(--color-text)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                {item.description}
              </p>
            </Card>
          </li>
        ))}
      </ol>
    </section>
  )
}
