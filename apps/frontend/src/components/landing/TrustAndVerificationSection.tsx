import { Calendar, Link2, Shield, ShieldAlert, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { trustPoints } from '../../data/landing'

const trustIcons: LucideIcon[] = [Link2, Calendar, ShieldAlert, Users]

export function TrustAndVerificationSection() {
  return (
    <section
      className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Shield className="mx-auto h-10 w-10 text-[var(--color-primary)]" aria-hidden />
          <h2
            id="trust-heading"
            className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl"
          >
            Trust comes first
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Every listing is checked so you apply with confidence—not guesswork.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {trustPoints.map((point, i) => {
            const Icon = trustIcons[i] ?? Shield
            return (
              <li
                key={point.title}
                className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <h3 className="font-bold text-slate-900">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {point.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
