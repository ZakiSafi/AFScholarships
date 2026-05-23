import { ArrowRight, Calendar, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ScholarshipListItem } from '../../../features/scholarships/types'
import {
  formatDeadline,
  formatDegreeLevel,
  formatFundingType,
  isVerified,
} from '../../../features/scholarships/format'
import { getCountryVisual } from '../../../lib/country-visual'
import { SaveScholarshipButton } from '../../student/SaveScholarshipButton'
import { BrandImage } from '../../ui/BrandImage'

type CatalogCardProps = {
  scholarship: ScholarshipListItem
}

export function CatalogCard({ scholarship }: CatalogCardProps) {
  const href = `/scholarships/${scholarship.slug}`
  const visual = getCountryVisual(scholarship.hostCountry)
  const verified = isVerified(scholarship.verificationStatus)

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute right-3 top-3 z-10">
        <SaveScholarshipButton scholarshipId={scholarship.id} size="sm" />
      </div>

      <Link to={href} className="flex flex-1 flex-col">
        <div className="relative">
          <BrandImage
            src={visual.image?.src ?? ''}
            alt={visual.image?.alt ?? `${scholarship.hostCountry} scholarship`}
            className="aspect-[4/3] w-full"
            fallbackGradient={visual.gradient}
            overlayClassName="bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"
          />
          {verified ? (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-md bg-white/95 px-2 py-1 text-xs font-bold text-[var(--color-primary)] shadow-sm">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
              Verified
            </span>
          ) : null}
          <span className="absolute bottom-3 left-3 rounded-md bg-white/95 px-2.5 py-1 text-sm font-bold text-slate-900 shadow-sm">
            {scholarship.hostCountry}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="font-bold leading-snug text-slate-900 transition-colors group-hover:text-[var(--color-primary)]">
            {scholarship.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-slate-500">{scholarship.provider}</p>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
            {scholarship.summary}
          </p>
          <p className="mt-3 text-sm text-slate-600">
            <span className="font-semibold text-[var(--color-primary)]">
              {formatFundingType(scholarship.fundingType)}
            </span>
            <span className="mx-1.5 text-slate-300" aria-hidden>
              ·
            </span>
            {formatDegreeLevel(scholarship.degreeLevel)}
          </p>
          <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-amber-800">
            <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
            <time dateTime={scholarship.deadlineAt}>
              {formatDeadline(scholarship.deadlineAt)}
            </time>
          </p>
          <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-bold text-[var(--color-primary)]">
            View program
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </div>
      </Link>
    </article>
  )
}
