import { useState } from 'react'
import { Link } from 'react-router-dom'
import { trackEvent } from '../../analytics/track'
import { useAuth } from '../../features/auth/hooks'
import { useReportListingMutation } from '../../features/scholarships/api'
import { Button } from '../ui/Button'
import { Textarea } from '../ui/Textarea'

const REASONS = [
  'Deadline has passed',
  'Wrong or outdated information',
  'Broken official link',
  'Not open to Afghan students',
  'Other',
] as const

type ReportListingFormProps = {
  scholarshipId: string
  scholarshipTitle: string
}

export function ReportListingForm({
  scholarshipId,
  scholarshipTitle,
}: ReportListingFormProps) {
  const { isAuthenticated } = useAuth()
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState<string>(REASONS[0])
  const [details, setDetails] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [report, { isLoading }] = useReportListingMutation()

  if (!open) {
    return (
      <Button type="button" variant="outline" size="sm" onClick={() => setOpen(true)}>
        Report listing issue
      </Button>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm">
        <p className="text-slate-700">
          <Link to="/auth/login" className="font-semibold text-[var(--color-primary)] hover:underline">
            Sign in
          </Link>{' '}
          to report inaccurate information about this listing.
        </p>
        <Button type="button" variant="ghost" size="sm" className="mt-2" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    )
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setMessage(null)
    try {
      await report({
        scholarshipId,
        reason,
        details: details.trim() || undefined,
      }).unwrap()
      trackEvent('listing_reported', { scholarshipId, reason })
      setMessage('Thank you—our team will review this listing.')
      setDetails('')
      setOpen(false)
    } catch {
      setError('Could not submit report. Please try again.')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-slate-50 p-4"
    >
      <p className="text-sm font-semibold text-slate-900">Report an issue</p>
      <p className="mt-1 text-xs text-slate-600">{scholarshipTitle}</p>

      <div className="mt-4">
        <label htmlFor="report-reason" className="text-label mb-1 block">
          Reason
        </label>
        <select
          id="report-reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm"
        >
          {REASONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-3">
        <label htmlFor="report-details" className="text-label mb-1 block">
          Details (optional)
        </label>
        <Textarea
          id="report-details"
          rows={3}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          placeholder="What should we check on the official site?"
        />
      </div>

      {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
      {message ? <p className="mt-2 text-xs text-emerald-700">{message}</p> : null}

      <div className="mt-4 flex gap-2">
        <Button type="submit" size="sm" disabled={isLoading}>
          {isLoading ? 'Sending…' : 'Submit report'}
        </Button>
        <Button type="button" variant="ghost" size="sm" onClick={() => setOpen(false)}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
