import { Link } from 'react-router-dom'
import { useListMyApplicationsQuery } from '../../features/applications/api'
import { useListRemindersQuery } from '../../features/reminders/api'
import { useListSavedQuery } from '../../features/saved/api'
import { useAuth } from '../../features/auth/hooks'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'

export function StudentDashboardPage() {
  const { user } = useAuth()
  const { data: saved = [] } = useListSavedQuery()
  const { data: applications = [] } = useListMyApplicationsQuery()
  const { data: reminders = [] } = useListRemindersQuery()

  const pendingReminders = reminders.filter((r) => r.status === 'PENDING').length

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">
          Welcome{user?.name ? `, ${user.name}` : ''}
        </h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Track saved programs, applications, and deadline reminders in one place.
        </p>
      </div>

      <dl className="grid gap-4 sm:grid-cols-3">
        <Card className="p-5">
          <dt className="text-label">Saved</dt>
          <dd className="mt-1 text-3xl font-extrabold tabular-nums text-[var(--color-primary)]">
            {saved.length}
          </dd>
        </Card>
        <Card className="p-5">
          <dt className="text-label">Applications</dt>
          <dd className="mt-1 text-3xl font-extrabold tabular-nums text-[var(--color-primary)]">
            {applications.length}
          </dd>
        </Card>
        <Card className="p-5">
          <dt className="text-label">Reminders</dt>
          <dd className="mt-1 text-3xl font-extrabold tabular-nums text-[var(--color-primary)]">
            {pendingReminders}
          </dd>
        </Card>
      </dl>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-semibold text-[var(--color-text)]">Browse scholarships</h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Discover verified programs and save the ones you want to pursue.
          </p>
          <Button to="/scholarships" className="mt-4" size="sm">
            Explore catalog
          </Button>
        </Card>
        <Card className="p-6">
          <h2 className="font-semibold text-[var(--color-text)]">Complete your profile</h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            A stronger profile helps you apply faster to partner programs.
          </p>
          <Button to="/dashboard/profile" variant="outline" className="mt-4" size="sm">
            Edit profile
          </Button>
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="font-semibold text-[var(--color-text)]">Quick links</h2>
        <ul className="mt-4 flex flex-wrap gap-3 text-sm font-semibold">
          <li>
            <Link to="/dashboard/saved" className="text-[var(--color-primary)] hover:underline">
              Saved scholarships
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/applications"
              className="text-[var(--color-primary)] hover:underline"
            >
              My applications
            </Link>
          </li>
          <li>
            <Link
              to="/dashboard/reminders"
              className="text-[var(--color-primary)] hover:underline"
            >
              Reminders
            </Link>
          </li>
        </ul>
      </Card>
    </div>
  )
}
