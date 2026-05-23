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
import { Card } from '../ui/Card'

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
      className="bg-[var(--color-surface)] py-16 lg:py-20"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2
            id="why-heading"
            className="text-2xl font-bold text-[var(--color-text)] sm:text-3xl"
          >
            Why AfScholarships
          </h2>
          <p className="mt-3 text-[var(--color-muted)]">
            Built for Afghan students who need trustworthy scholarship discovery
            without the noise.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {platformBenefits.map((benefit, index) => {
            const Icon = benefitIcons[index] ?? Globe
            return (
              <Card key={benefit.title} hover>
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-[var(--color-primary)]">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-4 font-bold text-[var(--color-text)]">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                  {benefit.description}
                </p>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
