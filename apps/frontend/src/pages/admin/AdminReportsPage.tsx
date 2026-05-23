import { useState } from 'react'
import { trackEvent } from '../../analytics/track'
import {
  useListReportsQuery,
  useResolveReportMutation,
} from '../../features/admin/api'
import {
  formatDateTime,
  formatReportStatus,
  formatVerificationStatus,
  reportStatusClass,
  verificationStatusClass,
} from '../../features/admin/format'
import type { ReportStatus } from '../../features/admin/types'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'

export function AdminReportsPage() {
  const [statusFilter, setStatusFilter] = useState<ReportStatus | ''>('OPEN')
  const { data: reports = [], isLoading, isError } = useListReportsQuery(
    statusFilter || undefined,
  )
  const [resolveReport, { isLoading: resolving }] = useResolveReportMutation()
  const [actionError, setActionError] = useState<string | null>(null)

  const handleResolve = async (
    id: string,
    status: 'RESOLVED' | 'DISMISSED',
  ) => {
    setActionError(null)
    try {
      await resolveReport({ id, status }).unwrap()
      trackEvent('admin_report_resolved', { reportId: id, status })
    } catch {
      setActionError('Could not update report.')
    }
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Listing reports</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Review student reports about outdated or incorrect scholarship data.
        </p>
      </div>

      <Card className="p-4">
        <label htmlFor="report-status" className="text-label mb-1 block">
          Filter by status
        </label>
        <select
          id="report-status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as ReportStatus | '')}
          className="rounded-xl border border-[var(--color-border)] bg-white px-3 py-2 text-sm"
        >
          <option value="">All</option>
          <option value="OPEN">Open</option>
          <option value="RESOLVED">Resolved</option>
          <option value="DISMISSED">Dismissed</option>
        </select>
      </Card>

      {actionError ? (
        <p className="text-sm text-red-600">{actionError}</p>
      ) : null}

      {isLoading ? (
        <p className="text-sm text-[var(--color-muted)]">Loading reports…</p>
      ) : null}
      {isError ? (
        <p className="text-sm text-red-600">Could not load reports.</p>
      ) : null}

      {!isLoading && !isError && reports.length === 0 ? (
        <Card className="p-10 text-center">
          <p className="font-semibold text-slate-900">No reports in this queue</p>
        </Card>
      ) : null}

      <ul className="space-y-4">
        {reports.map((report) => (
          <li key={report.id}>
            <Card className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span
                    className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${reportStatusClass(report.status)}`}
                  >
                    {formatReportStatus(report.status)}
                  </span>
                  <h2 className="mt-2 font-bold text-slate-900">
                    {report.scholarship.title}
                  </h2>
                  <p className="text-sm text-slate-500">{report.scholarship.provider}</p>
                  <p className="mt-2 text-sm">
                    <span className="font-semibold text-slate-700">Reason:</span>{' '}
                    {report.reason}
                  </p>
                  {report.details ? (
                    <p className="mt-1 text-sm text-slate-600">{report.details}</p>
                  ) : null}
                  <p className="mt-2 text-xs text-slate-400">
                    Reported {formatDateTime(report.createdAt)}
                    {report.user
                      ? ` · ${report.user.name ?? report.user.email}`
                      : ' · Anonymous'}
                  </p>
                  <p className="mt-2">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-xs font-bold ${verificationStatusClass(report.scholarship.verificationStatus)}`}
                    >
                      Listing:{' '}
                      {formatVerificationStatus(report.scholarship.verificationStatus)}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    to={`/scholarships/${report.scholarship.slug}`}
                    variant="outline"
                    size="sm"
                  >
                    View listing
                  </Button>
                  <Button
                    to="/admin/scholarships"
                    variant="ghost"
                    size="sm"
                  >
                    Manage scholarships
                  </Button>
                </div>
              </div>

              {report.status === 'OPEN' ? (
                <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4">
                  <Button
                    size="sm"
                    disabled={resolving}
                    onClick={() => void handleResolve(report.id, 'RESOLVED')}
                  >
                    Mark resolved
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={resolving}
                    onClick={() => void handleResolve(report.id, 'DISMISSED')}
                  >
                    Dismiss
                  </Button>
                </div>
              ) : null}
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
