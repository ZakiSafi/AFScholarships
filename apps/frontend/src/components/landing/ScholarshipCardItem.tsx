import { Calendar, CheckCircle2, MapPin } from 'lucide-react'
import type { ScholarshipCard } from '../../data/landing'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

type ScholarshipCardItemProps = {
  scholarship: ScholarshipCard
}

export function ScholarshipCardItem({ scholarship }: ScholarshipCardItemProps) {
  return (
    <Card hover className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-2">
        {scholarship.verified ? (
          <Badge variant="verified">
            <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
            Verified
          </Badge>
        ) : (
          <Badge variant="muted">Unverified</Badge>
        )}
      </div>

      <h3 className="mt-4 text-lg font-bold text-[var(--color-text)]">
        {scholarship.title}
      </h3>

      <ul className="mt-3 space-y-2 text-sm text-[var(--color-muted)]">
        <li className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0 text-[var(--color-primary)]" aria-hidden />
          {scholarship.hostCountry}
        </li>
        <li>{scholarship.degreeLevel}</li>
        <li className="font-medium text-[var(--color-text)]">
          {scholarship.fundingType}
        </li>
        <li className="flex items-center gap-2">
          <Calendar className="h-4 w-4 shrink-0 text-[var(--color-accent)]" aria-hidden />
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

      <div className="mt-auto pt-6">
        <Button variant="outline" to="/scholarships" className="w-full">
          View details
        </Button>
      </div>
    </Card>
  )
}
