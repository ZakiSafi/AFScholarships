import { Link } from 'react-router-dom'
import { useListMyApplicationsQuery } from '../../features/applications/api'
import {
  applicationStatusClass,
  formatApplicationStatus,
} from '../../features/applications/format'
import { formatDeadline } from '../../features/scholarships/format'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'

export function ApplicationsListPage() {
  const { data: applications = [], isLoading, isError } = useListMyApplicationsQuery()

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Applications</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          In-platform partner applications you submitted through AfScholarships.
        </p>
      </div>

      {isLoading ? (
        <p className="text-sm text-[var(--color-muted)]">Loading applications…</p>
      ) : null}

      {isError ? (
        <p className="text-sm text-red-600">Could not load applications.</p>
      ) : null}

      {!isLoading && !isError && applications.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="font-semibold text-slate-900">No applications yet</p>
          <p className="mt-2 text-sm text-slate-600">
            Apply to partner programs marked &quot;Apply in-app&quot; on the catalog.
          </p>
          <Button to="/scholarships" className="mt-6">
            Browse scholarships
          </Button>
        </Card>
      ) : null}

      <ul className="space-y-4">
        {applications.map((app) => (
          <li key={app.id}>
            <Link to={`/dashboard/applications/${app.id}`}>
              <Card hover className="block p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-900">{app.scholarship.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{app.scholarship.provider}</p>
                    <p className="mt-2 text-sm text-slate-500">
                      Submitted {formatDeadline(app.createdAt)}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${applicationStatusClass(app.status)}`}
                  >
                    {formatApplicationStatus(app.status)}
                  </span>
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
