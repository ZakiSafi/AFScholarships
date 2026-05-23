import { Link } from 'react-router-dom'
import {
  useListAdminApplicationsQuery,
  useListReportsQuery,
} from '../../features/admin/api'
import { Card } from '../../components/ui/Card'

export function AdminDashboardPage() {
  const { data: openReports = [] } = useListReportsQuery('OPEN')
  const { data: applications = [] } = useListAdminApplicationsQuery('SUBMITTED')

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Admin overview</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Moderate listings, review applications, and run maintenance jobs.
        </p>
      </div>

      <dl className="grid gap-4 sm:grid-cols-2">
        <Card className="p-5">
          <dt className="text-label">Open reports</dt>
          <dd className="mt-1 text-3xl font-extrabold tabular-nums text-amber-800">
            {openReports.length}
          </dd>
        </Card>
        <Card className="p-5">
          <dt className="text-label">New applications</dt>
          <dd className="mt-1 text-3xl font-extrabold tabular-nums text-[var(--color-primary)]">
            {applications.length}
          </dd>
        </Card>
      </dl>

      <Card className="p-6">
        <h2 className="font-semibold text-[var(--color-text)]">Quick links</h2>
        <ul className="mt-4 grid gap-2 text-sm font-semibold sm:grid-cols-2">
          <li>
            <Link to="/admin/scholarships" className="text-[var(--color-primary)] hover:underline">
              Manage scholarships
            </Link>
          </li>
          <li>
            <Link to="/admin/reports" className="text-[var(--color-primary)] hover:underline">
              Moderation queue
            </Link>
          </li>
          <li>
            <Link
              to="/admin/applications"
              className="text-[var(--color-primary)] hover:underline"
            >
              Application reviews
            </Link>
          </li>
          <li>
            <Link to="/admin/audit-logs" className="text-[var(--color-primary)] hover:underline">
              Audit logs
            </Link>
          </li>
          <li>
            <Link to="/admin/jobs" className="text-[var(--color-primary)] hover:underline">
              Background jobs
            </Link>
          </li>
        </ul>
      </Card>
    </div>
  )
}
