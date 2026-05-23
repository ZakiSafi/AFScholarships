import { ExternalLink } from 'lucide-react'
import type { ScholarshipDetail } from '../../features/scholarships/types'
import { trackEvent } from '../../analytics/track'
import { useAuth } from '../../features/auth/hooks'
import { SaveScholarshipButton } from './SaveScholarshipButton'
import { ReminderForm } from './ReminderForm'
import { Button } from '../ui/Button'

type DetailStudentActionsProps = {
  scholarship: ScholarshipDetail
  className?: string
}

export function DetailStudentActions({
  scholarship,
  className,
}: DetailStudentActionsProps) {
  const { isAuthenticated } = useAuth()

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-2">
        <SaveScholarshipButton scholarshipId={scholarship.id} size="md" />
        {!isAuthenticated ? (
          <span className="text-xs text-slate-500">Sign in to save & remind</span>
        ) : null}
      </div>

      <div className="mt-4 space-y-2.5">
        {scholarship.isPartnerApplication ? (
          <Button
            className="w-full"
            to={
              isAuthenticated
                ? `/dashboard/apply/${scholarship.slug}`
                : `/auth/signup`
            }
          >
            {isAuthenticated ? 'Apply in-platform' : 'Sign up to apply'}
          </Button>
        ) : scholarship.applicationUrl ? (
          <a
            href={scholarship.applicationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackEvent('external_apply_clicked', {
                scholarshipId: scholarship.id,
                provider: scholarship.provider,
              })
            }
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-bold text-white"
          >
            Official application
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        ) : null}

        {isAuthenticated ? (
          <ReminderForm
            scholarshipId={scholarship.id}
            deadlineAt={scholarship.deadlineAt}
          />
        ) : (
          <Button variant="outline" className="w-full" to="/auth/login">
            Sign in for reminders
          </Button>
        )}

        {isAuthenticated ? (
          <Button variant="ghost" className="w-full" to="/dashboard/saved">
            View saved programs
          </Button>
        ) : null}
      </div>
    </div>
  )
}
