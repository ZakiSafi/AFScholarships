import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { useAuth } from '../../features/auth/hooks'

export function StudentDashboardPage() {
  const { user } = useAuth()

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">
          Welcome{user?.name ? `, ${user.name}` : ''}
        </h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Your student dashboard is ready. Scholarship list, saved items, and
          applications will be wired in the next phase.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="p-6">
          <h2 className="font-semibold text-[var(--color-text)]">Browse scholarships</h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Search verified opportunities with filters and deadlines.
          </p>
          <Button to="/scholarships" className="mt-4" size="sm">
            Explore
          </Button>
        </Card>
        <Card className="p-6">
          <h2 className="font-semibold text-[var(--color-text)]">Saved & reminders</h2>
          <p className="mt-2 text-sm text-[var(--color-muted)]">
            Save listings and get email reminders before deadlines.
          </p>
          <Button to="/dashboard/saved" variant="outline" className="mt-4" size="sm">
            Coming in D-Student
          </Button>
        </Card>
      </div>

      <Card className="p-6">
        <p className="text-sm text-[var(--color-muted)]">
          Phase <strong>D-Foundation</strong> complete: auth, token refresh, and
          protected routes.{' '}
          <Link to="/" className="text-[var(--color-primary)] hover:underline">
            Back to home
          </Link>
        </p>
      </Card>
    </div>
  )
}
