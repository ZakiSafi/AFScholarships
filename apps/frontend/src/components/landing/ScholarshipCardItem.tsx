import {
  Bookmark,
  Calendar,
  CheckCircle2,
  MapPin,
} from 'lucide-react'
import type { ScholarshipCard } from '../../data/landing'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

type ScholarshipCardItemProps = {
  scholarship: ScholarshipCard
}

export function ScholarshipCardItem({ scholarship }: ScholarshipCardItemProps) {
  return (
    <Card lift className="flex h-full flex-col overflow-hidden border-blue-100 p-0">
      <div className="border-b border-[var(--color-border)] bg-gradient-to-r from-[var(--color-primary-soft)] via-blue-50 to-[var(--color-secondary-soft)]/40 px-5 py-3.5">
        {scholarship.verified ? (
          <Badge variant="verified">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
            Verified
          </Badge>
        ) : (
          <Badge variant="muted">Unverified</Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold leading-snug text-[var(--color-text)]">
            {scholarship.title}
          </h3>
          <button
            type="button"
            className="shrink-0 rounded-lg border border-[var(--color-border)] p-2 text-[var(--color-muted)] transition-colors hover:border-[var(--color-primary)] hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary)]"
            aria-label={`Save ${scholarship.title}`}
          >
            <Bookmark className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--color-muted)]">
          {scholarship.description}
        </p>

        <ul className="mt-4 space-y-2 text-sm">
          <li className="flex items-center gap-2 text-[var(--color-muted)]">
            <MapPin
              className="h-4 w-4 shrink-0 text-[var(--color-primary)]"
              aria-hidden
            />
            {scholarship.hostCountry}
          </li>
          <li className="text-[var(--color-muted)]">{scholarship.degreeLevel}</li>
          <li className="font-semibold text-[var(--color-primary)]">
            {scholarship.fundingType}
          </li>
          <li className="flex items-center gap-2 font-medium text-amber-700">
            <Calendar className="h-4 w-4 shrink-0" aria-hidden />
            {scholarship.deadline}
          </li>
        </ul>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {scholarship.tags.map((tag) => (
            <Badge key={tag} variant="muted">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-auto pt-5">
          <Button variant="outline" to="/scholarships" className="w-full">
            View details
          </Button>
        </div>
      </div>
    </Card>
  )
}
