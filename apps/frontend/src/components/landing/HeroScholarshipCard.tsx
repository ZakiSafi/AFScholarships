import { Bookmark, Calendar, CheckCircle2, MapPin } from 'lucide-react'
import { heroScholarship } from '../../data/landing'
import { Badge } from '../ui/Badge'

/** Compact scholarship preview — not a fake browser window */
export function HeroScholarshipCard() {
  return (
    <div className="rounded-2xl border border-white/20 bg-white p-5 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.35)] sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <Badge variant="verified" className="px-3 py-1">
          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
          Verified listing
        </Badge>
        <button
          type="button"
          className="rounded-lg bg-[var(--color-primary-soft)] p-2 text-[var(--color-primary)]"
          aria-label="Save scholarship"
        >
          <Bookmark className="h-4 w-4" aria-hidden />
        </button>
      </div>

      <h2 className="mt-4 text-xl font-bold leading-snug text-[var(--color-text)] sm:text-2xl">
        {heroScholarship.title}
      </h2>

      <dl className="mt-4 space-y-2.5 text-sm">
        <div className="flex items-center gap-2 font-medium text-[var(--color-text)]">
          <MapPin className="h-4 w-4 shrink-0 text-[var(--color-primary)]" aria-hidden />
          {heroScholarship.country} · {heroScholarship.degree}
        </div>
        <div className="font-semibold text-[var(--color-primary)]">
          {heroScholarship.funding}
        </div>
      </dl>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-[var(--color-accent-soft)] px-4 py-3">
        <span className="flex items-center gap-2 text-sm font-semibold text-amber-950">
          <Calendar className="h-4 w-4" aria-hidden />
          Deadline
        </span>
        <span className="text-sm font-bold text-amber-900">
          {heroScholarship.deadline}
        </span>
      </div>

      <div className="mt-4">
        <div className="flex justify-between text-xs font-semibold text-[var(--color-muted)]">
          <span>Your profile match</span>
          <span className="text-[var(--color-primary)]">
            {heroScholarship.profileMatch}%
          </span>
        </div>
        <div className="mt-2 h-2 rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-[var(--color-primary)]"
            style={{ width: `${heroScholarship.profileMatch}%` }}
          />
        </div>
      </div>
    </div>
  )
}
