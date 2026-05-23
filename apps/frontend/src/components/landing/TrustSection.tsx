import { Shield } from 'lucide-react'
import { trustPoints } from '../../data/landing'
import { Card } from '../ui/Card'

export function TrustSection() {
  return (
    <section
      className="bg-gradient-to-b from-slate-50 to-[var(--color-bg)] py-16 lg:py-20"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center justify-center rounded-full bg-emerald-100 p-3 text-[var(--color-primary)]">
            <Shield className="h-6 w-6" aria-hidden />
          </span>
          <h2
            id="trust-heading"
            className="mt-4 text-2xl font-bold text-[var(--color-text)] sm:text-3xl"
          >
            Trust and safety
          </h2>
          <p className="mt-3 text-[var(--color-muted)]">
            We prioritize accuracy and transparency so you can apply with peace of
            mind.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {trustPoints.map((point) => (
            <Card key={point.title}>
              <h3 className="font-bold text-[var(--color-text)]">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
                {point.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
