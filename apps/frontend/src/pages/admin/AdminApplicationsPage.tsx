import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useListAdminApplicationsQuery } from '../../features/admin/api'
import {
  applicationStatusClass,
  formatApplicationStatus,
} from '../../features/applications/format'
import { formatDateTime } from '../../features/admin/format'
import type { ApplicationStatus } from '../../features/applications/types'
import { Card } from '../../components/ui/Card'

export function AdminApplicationsPage() {
  const [statusFilter, setStatusFilter] = useState<ApplicationStatus | ''>('')
  const { data: applications = [], isLoading, isError } =
    useListAdminApplicationsQuery(statusFilter || undefined)

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Applications</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Review in-platform partner scholarship submissions.
        </p>
      </div>

      <Card className="p-4">
        <label htmlFor="app-status" className="text-label mb-1 block">
          Filter by status
        </label>
        <select
          id="app-status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ApplicationStatus | '')}
          className="rounded-xl border border-[var(--color-border)] bg-white px-3 py-2 text-sm"
        >
          <option value="">All</option>
          <option value="SUBMITTED">Submitted</option>
          <option value="UNDER_REVIEW">Under review</option>
          <option value="ACCEPTED">Accepted</option>
          <option value="REJECTED">Rejected</option>
        </select>
      </Card>

      {isLoading ? (
        <p className="text-sm text-[var(--color-muted)]">Loading applications…</p>
      ) : null}
      {isError ? (
        <p className="text-sm text-red-600">Could not load applications.</p>
      ) : null}

      {!isLoading && !isError && applications.length === 0 ? (
        <Card className="p-10 text-center">
          <p className="font-semibold text-slate-900">No applications match</p>
        </Card>
      ) : null}

      <ul className="space-y-3">
        {applications.map((app) => (
          <li key={app.id}>
            <Link
              to={`/admin/applications/${app.id}`}
              className="block rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-[var(--color-primary)] hover:shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${applicationStatusClass(app.status)}`}
                  >
                    {formatApplicationStatus(app.status)}
                  </span>
                  <h2 className="mt-2 font-bold text-slate-900">{app.scholarship.title}</h2>
                  <p className="text-sm text-slate-600">
                    {app.fullName} · {app.email}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    Submitted {formatDateTime(app.createdAt)}
                  </p>
                </div>
                <span className="text-sm font-semibold text-[var(--color-primary)]">
                  Review →
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
