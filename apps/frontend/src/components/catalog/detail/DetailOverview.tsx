import { Calendar, CheckCircle2, ChevronRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { ScholarshipDetail } from '../../../features/scholarships/types'
import {
  formatDeadline,
  formatDegreeLevel,
  formatFundingType,
  isVerified,
} from '../../../features/scholarships/format'
import { getCountryVisual } from '../../../lib/country-visual'
import { DetailStudentActions } from '../../student/DetailStudentActions'
import { Badge } from '../../ui/Badge'
import { BrandImage } from '../../ui/BrandImage'

type DetailOverviewProps = {
  scholarship: ScholarshipDetail
}

export function DetailOverview({ scholarship }: DetailOverviewProps) {
  const visual = getCountryVisual(scholarship.hostCountry)
  const verified = isVerified(scholarship.verificationStatus)

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link to="/" className="font-medium hover:text-[var(--color-primary)]">
                Home
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5 opacity-40" aria-hidden />
            <li>
              <Link
                to="/scholarships"
                className="font-medium hover:text-[var(--color-primary)]"
              >
                Scholarships
              </Link>
            </li>
            <ChevronRight className="h-3.5 w-3.5 opacity-40" aria-hidden />
            <li className="max-w-[200px] truncate font-medium text-slate-800 sm:max-w-xs">
              {scholarship.title}
            </li>
          </ol>
        </nav>

        <div className="mt-8 grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
          <div className="overflow-hidden rounded-2xl ring-1 ring-slate-200">
            <BrandImage
              src={visual.image?.src ?? ''}
              alt={visual.image?.alt ?? scholarship.hostCountry}
              className="aspect-[4/3] w-full lg:max-h-[320px]"
              imageClassName="object-cover"
              fallbackGradient={visual.gradient}
              overlayClassName="bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"
              loading="eager"
            />
          </div>

          <div>
            <div className="flex flex-wrap gap-2">
              {verified ? (
                <Badge variant="verified">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                  Verified
                </Badge>
              ) : (
                <Badge variant="muted">Under review</Badge>
              )}
              {scholarship.isFeatured ? <Badge variant="accent">Featured</Badge> : null}
              {scholarship.isPartnerApplication ? (
                <Badge variant="category">Apply in-app</Badge>
              ) : null}
            </div>

            <h1 className="mt-4 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
              {scholarship.title}
            </h1>
            <p className="mt-2 text-base font-medium text-slate-600">
              {scholarship.provider}
            </p>

            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex items-center gap-2 text-slate-700">
                <MapPin className="h-4 w-4 text-[var(--color-primary)]" aria-hidden />
                <span className="font-semibold">{scholarship.hostCountry}</span>
              </li>
              <li>
                <span className="font-semibold text-slate-800">
                  {formatDegreeLevel(scholarship.degreeLevel)}
                </span>
                <span className="mx-2 text-slate-300">·</span>
                <span className="font-semibold text-[var(--color-primary)]">
                  {formatFundingType(scholarship.fundingType)}
                </span>
              </li>
              <li className="flex items-center gap-2 font-semibold text-amber-800">
                <Calendar className="h-4 w-4" aria-hidden />
                Deadline {formatDeadline(scholarship.deadlineAt)}
              </li>
            </ul>

            <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-600">
              {scholarship.summary}
            </p>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 lg:hidden">
              <DetailStudentActions scholarship={scholarship} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
