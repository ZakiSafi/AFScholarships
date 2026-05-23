import { Link, useParams } from 'react-router-dom'
import { useGetApplicationQuery } from '../../features/applications/api'
import {
  applicationStatusClass,
  formatApplicationStatus,
} from '../../features/applications/format'
import { formatDeadline } from '../../features/scholarships/format'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'

export function ApplicationDetailPage() {
  const { id = '' } = useParams()
  const { data, isLoading, isError } = useGetApplicationQuery(id, { skip: !id })

  if (isLoading) {
    return <p className="text-sm text-[var(--color-muted)]">Loading application…</p>
  }

  if (isError || !data) {
    return (
      <div className="space-y-4">
        <p className="text-red-600">Application not found.</p>
        <Button to="/dashboard/applications" variant="outline">
          Back to applications
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Link
        to="/dashboard/applications"
        className="text-sm font-semibold text-[var(--color-primary)] hover:underline"
      >
        ← All applications
      </Link>

      <div>
        <span
          className={`inline-block rounded-full px-2.5 py-1 text-xs font-bold ${applicationStatusClass(data.status)}`}
        >
          {formatApplicationStatus(data.status)}
        </span>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">{data.scholarship.title}</h1>
        <p className="mt-1 text-slate-600">{data.scholarship.provider}</p>
        <p className="mt-2 text-sm text-slate-500">
          Deadline {formatDeadline(data.scholarship.deadlineAt)}
        </p>
      </div>

      <Card className="p-6">
        <h2 className="font-bold text-slate-900">Your submission</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <div>
            <dt className="text-label">Name</dt>
            <dd className="font-medium text-slate-800">{data.fullName}</dd>
          </div>
          <div>
            <dt className="text-label">Email</dt>
            <dd className="font-medium text-slate-800">{data.email}</dd>
          </div>
          {data.country ? (
            <div>
              <dt className="text-label">Country</dt>
              <dd className="font-medium text-slate-800">{data.country}</dd>
            </div>
          ) : null}
          <div>
            <dt className="text-label">Statement</dt>
            <dd className="mt-1 whitespace-pre-wrap leading-relaxed text-slate-700">
              {data.statement}
            </dd>
          </div>
        </dl>
      </Card>

      <Card className="p-6">
        <h2 className="font-bold text-slate-900">Status timeline</h2>
        <ol className="mt-4 space-y-4 border-l-2 border-blue-100 pl-6">
          {data.statusLogs.map((log) => (
            <li key={log.id} className="relative">
              <span className="absolute -left-[1.6rem] top-1 h-3 w-3 rounded-full bg-[var(--color-primary)] ring-4 ring-white" />
              <p className="font-semibold text-slate-900">
                {formatApplicationStatus(log.toStatus)}
              </p>
              {log.note ? (
                <p className="mt-1 text-sm text-slate-600">{log.note}</p>
              ) : null}
              <p className="mt-1 text-xs text-slate-400">
                {formatDeadline(log.createdAt)}
              </p>
            </li>
          ))}
        </ol>
      </Card>

      <Button to={`/scholarships/${data.scholarship.slug}`} variant="outline">
        View scholarship
      </Button>
    </div>
  )
}
