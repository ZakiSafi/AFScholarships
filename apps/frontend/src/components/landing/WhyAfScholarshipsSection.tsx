import {
  Bell,
  Bookmark,
  BookOpen,
  Globe,
  ShieldCheck,
  FileText,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { platformBenefits } from '../../data/landing'

const benefitIcons: LucideIcon[] = [
  Globe,
  ShieldCheck,
  Bell,
  FileText,
  Bookmark,
  BookOpen,
]

export function WhyAfScholarshipsSection() {
  return (
    <section
      className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-20 lg:py-24"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <h2
              id="why-heading"
              className="text-2xl font-bold leading-tight text-[var(--color-text)] sm:text-3xl lg:text-4xl"
            >
              Built for students who need clarity, not confusion
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-muted)]">
              Scholarship information is often scattered across dozens of
              websites, outdated, or impossible to verify. AfScholarships brings
              verified opportunities, deadlines, and guidance into one trusted
              place—designed for Afghan students pursuing global education.
            </p>
            <p className="mt-4 text-[var(--color-muted)]">
              Save time, reduce risk, and focus on building applications that
              reflect your potential.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {platformBenefits.map((benefit, index) => {
              const Icon = benefitIcons[index] ?? Globe
              return (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-primary-soft)]/40 p-5 transition-shadow hover:shadow-soft"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-bold text-[var(--color-text)]">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                    {benefit.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
