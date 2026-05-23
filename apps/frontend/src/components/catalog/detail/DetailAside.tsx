import { ExternalLink, Shield } from 'lucide-react'
import type { ScholarshipDetail } from '../../../features/scholarships/types'
import { formatDeadline, formatFundingType } from '../../../features/scholarships/format'
import { useAuth } from '../../../features/auth/hooks'
import { DetailStudentActions } from '../../student/DetailStudentActions'
import { Button } from '../../ui/Button'

type DetailAsideProps = {
  scholarship: ScholarshipDetail
}

export function DetailAside({ scholarship }: DetailAsideProps) {
  const { isAuthenticated: loggedIn } = useAuth()

  return (
    <aside className="hidden lg:block lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <p className="text-label">Your next steps</p>

        <div className="mt-4 rounded-xl bg-[var(--color-accent-soft)] px-4 py-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-amber-900/70">
            Deadline
          </p>
          <p className="mt-1 text-lg font-bold text-amber-900">
            {formatDeadline(scholarship.deadlineAt)}
          </p>
        </div>

        <p className="mt-4 text-sm text-slate-600">
          <span className="font-semibold text-[var(--color-primary)]">
            {formatFundingType(scholarship.fundingType)}
          </span>{' '}
          · {scholarship.hostCountry}
        </p>

        {loggedIn ? (
          <DetailStudentActions scholarship={scholarship} className="mt-6" />
        ) : (
          <div className="mt-6 space-y-2.5">
            {scholarship.isPartnerApplication ? (
              <Button className="w-full" to="/auth/signup">
                Sign up to apply
              </Button>
            ) : scholarship.applicationUrl ? (
              <a
                href={scholarship.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-sm font-bold text-white"
              >
                Official application
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
            ) : null}
            <Button variant="outline" className="w-full" to="/auth/login">
              Sign in
            </Button>
          </div>
        )}

        <p className="mt-5 flex gap-2 text-xs leading-relaxed text-slate-500">
          <Shield className="h-4 w-4 shrink-0 text-[var(--color-primary)]" aria-hidden />
          Confirm requirements on the official site before you submit.
        </p>
      </div>
    </aside>
  )
}
