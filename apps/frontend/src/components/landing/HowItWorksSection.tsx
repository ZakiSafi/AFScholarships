import {
  Bell,
  ClipboardCheck,
  Compass,
  ExternalLink,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { howItWorksSteps } from '../../data/landing'

const stepIcons: LucideIcon[] = [Compass, ClipboardCheck, Bell, ExternalLink]

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="bg-white py-16 sm:py-20"
      aria-labelledby="how-it-works-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2
          id="how-it-works-heading"
          className="text-center text-2xl font-bold text-[var(--color-text)] sm:text-3xl"
        >
          Four steps to your next application
        </h2>
        <p className="text-section-desc mx-auto mt-3 max-w-lg text-center">
          From discovery to applying on the official program website.
        </p>

        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksSteps.map((item, index) => {
            const Icon = stepIcons[index] ?? Compass
            return (
              <li
                key={item.step}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="mt-4 text-xs font-bold uppercase tracking-wide text-[var(--color-primary)]">
                  Step {item.step}
                </p>
                <h3 className="mt-1 font-bold text-[var(--color-text)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {item.description}
                </p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
