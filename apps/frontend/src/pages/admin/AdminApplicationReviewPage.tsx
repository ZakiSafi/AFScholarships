import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetApplicationQuery } from '../../features/applications/api'
import {
  applicationStatusClass,
  formatApplicationStatus,
} from '../../features/applications/format'
import { useUpdateAdminApplicationStatusMutation } from '../../features/admin/api'
import { formatDateTime } from '../../features/admin/format'
import type { ApplicationStatus } from '../../features/applications/types'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Textarea } from '../../components/ui/Textarea'

const statusOptions: ApplicationStatus[] = [
  'SUBMITTED',
  'UNDER_REVIEW',
  'ACCEPTED',
  'REJECTED',
]

export function AdminApplicationReviewPage() {
  const { id = '' } = useParams()
  const { data, isLoading, isError } = useGetApplicationQuery(id, { skip: !id })
  const [updateStatus, { isLoading: updating }] =
    useUpdateAdminApplicationStatusMutation()

  const [nextStatus, setNextStatus] = useState<ApplicationStatus>('UNDER_REVIEW')
  const [note, setNote] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (isLoading) {
    return <p className="text-sm text-[var(--color-muted)]">Loading application…</p>
  }

  if (isError || !data) {
    return (
      <div className="space-y-4">
        <p className="text-red-600">Application not found.</p>
        <Button to="/admin/applications" variant="outline">
          Back to queue
        </Button>
      </div>
    )
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    setMessage(null)
    try {
      await updateStatus({
        id: data.id,
        status: nextStatus,
        note: note.trim() || undefined,
      }).unwrap()
      setMessage(`Status updated to ${formatApplicationStatus(nextStatus)}.`)
      setNote('')
    } catch {
      setError('Could not update application status.')
    }
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        to="/admin/applications"
        className="text-sm font-semibold text-[var(--color-primary)] hover:underline"
      >
        ← Application queue
      </Link>

      <div>
        <span
          className={`inline-block rounded-full px-2.5 py-1 text-xs font-bold ${applicationStatusClass(data.status)}`}
        >
          {formatApplicationStatus(data.status)}
        </span>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">{data.scholarship.title}</h1>
        <p className="mt-1 text-slate-600">{data.scholarship.provider}</p>
      </div>

      <Card className="p-6">
        <h2 className="font-bold text-slate-900">Applicant</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div>
            <dt className="text-label">Name</dt>
            <dd className="font-medium text-slate-800">{data.fullName}</dd>
          </div>
          <div>
            <dt className="text-label">Email</dt>
            <dd className="font-medium text-slate-800">{data.email}</dd>
          </div>
          {data.phone ? (
            <div>
              <dt className="text-label">Phone</dt>
              <dd className="font-medium text-slate-800">{data.phone}</dd>
            </div>
          ) : null}
          {data.country ? (
            <div>
              <dt className="text-label">Country</dt>
              <dd className="font-medium text-slate-800">{data.country}</dd>
            </div>
          ) : null}
          <div>
            <dt className="text-label">Submitted</dt>
            <dd className="font-medium text-slate-800">
              {formatDateTime(data.createdAt)}
            </dd>
          </div>
        </dl>
      </Card>

      <Card className="p-6">
        <h2 className="font-bold text-slate-900">Motivation statement</h2>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
          {data.statement}
        </p>
      </Card>

      <Card className="p-6">
        <h2 className="font-bold text-slate-900">Status timeline</h2>
        <ol className="mt-4 space-y-3 border-l-2 border-blue-100 pl-6">
          {data.statusLogs.map((log) => (
            <li key={log.id} className="relative text-sm">
              <span className="absolute -left-[1.6rem] top-1 h-3 w-3 rounded-full bg-[var(--color-primary)] ring-4 ring-white" />
              <p className="font-semibold text-slate-900">
                {formatApplicationStatus(log.toStatus)}
              </p>
              {log.note ? <p className="text-slate-600">{log.note}</p> : null}
              <p className="text-xs text-slate-400">{formatDateTime(log.createdAt)}</p>
            </li>
          ))}
        </ol>
      </Card>

      <Card className="p-6">
        <h2 className="font-bold text-slate-900">Update status</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label htmlFor="status" className="text-label mb-1 block">
              New status
            </label>
            <select
              id="status"
              value={nextStatus}
              onChange={(e) => setNextStatus(e.target.value as ApplicationStatus)}
              className="w-full rounded-xl border border-[var(--color-border)] bg-white px-3 py-2 text-sm"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {formatApplicationStatus(status)}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="note" className="text-label mb-1 block">
              Note (optional)
            </label>
            <Textarea
              id="note"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Message shown in the applicant timeline…"
            />
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {message ? (
            <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
              {message}
            </p>
          ) : null}
          <Button type="submit" disabled={updating}>
            {updating ? 'Saving…' : 'Save status'}
          </Button>
        </form>
      </Card>

      <Button to={`/scholarships/${data.scholarship.slug}`} variant="outline">
        View scholarship
      </Button>
    </div>
  )
}
