import { Bookmark, Calendar, CheckCircle2, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useListScholarshipsQuery } from '../../features/scholarships/api'
import { formatDeadline, formatDegreeLevel, formatFundingType } from '../../features/scholarships/format'
import { Badge } from '../ui/Badge'

/** Featured scholarship preview from live catalog */
export function HeroScholarshipCard() {
  const { data, isLoading } = useListScholarshipsQuery({
    sortBy: 'featured',
    limit: 1,
  })

  const scholarship = data?.items[0]

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-white/20 bg-white p-6 shadow-lg">
        <p className="text-sm text-slate-500">Loading featured program…</p>
      </div>
    )
  }

  if (!scholarship) {
    return (
      <div className="rounded-2xl border border-white/20 bg-white p-6 shadow-lg">
        <p className="text-sm font-semibold text-slate-700">Browse verified programs</p>
        <Link
          to="/scholarships"
          className="mt-2 inline-block text-sm font-bold text-[var(--color-primary)] hover:underline"
        >
          Open catalog →
        </Link>
      </div>
    )
  }

  return (
    <Link
      to={`/scholarships/${scholarship.slug}`}
      className="block rounded-2xl border border-white/20 bg-white p-5 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.35)] transition-transform hover:-translate-y-0.5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <Badge variant="verified" className="px-3 py-1">
          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
          Verified listing
        </Badge>
        <span
          className="rounded-lg bg-[var(--color-primary-soft)] p-2 text-[var(--color-primary)]"
          aria-hidden
        >
          <Bookmark className="h-4 w-4" />
        </span>
      </div>

      <h2 className="mt-4 text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
        {scholarship.title}
      </h2>

      <dl className="mt-4 space-y-2.5 text-sm">
        <div className="flex items-center gap-2 font-medium text-slate-800">
          <MapPin className="h-4 w-4 shrink-0 text-[var(--color-primary)]" aria-hidden />
          {scholarship.hostCountry} · {formatDegreeLevel(scholarship.degreeLevel)}
        </div>
        <div className="font-semibold text-[var(--color-primary)]">
          {formatFundingType(scholarship.fundingType)}
        </div>
      </dl>

      <div className="mt-4 flex items-center justify-between rounded-xl bg-amber-50 px-4 py-3">
        <span className="flex items-center gap-2 text-sm font-semibold text-amber-950">
          <Calendar className="h-4 w-4" aria-hidden />
          Deadline
        </span>
        <time
          className="text-sm font-bold text-amber-900"
          dateTime={scholarship.deadlineAt}
        >
          {formatDeadline(scholarship.deadlineAt)}
        </time>
      </div>
    </Link>
  )
}
