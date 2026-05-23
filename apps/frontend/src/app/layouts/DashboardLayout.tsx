import { Link, Outlet } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { useAuth } from '../../features/auth/hooks'

const navItems = [
  { to: '/dashboard', label: 'Overview' },
  { to: '/dashboard/saved', label: 'Saved' },
  { to: '/dashboard/applications', label: 'Applications' },
  { to: '/dashboard/reminders', label: 'Reminders' },
  { to: '/dashboard/profile', label: 'Profile' },
]

export function DashboardLayout() {
  const { user, logout, isAdmin } = useAuth()

  return (
    <div className="flex min-h-screen bg-[var(--color-bg)]">
      <aside className="hidden w-64 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:block">
        <Link to="/" className="text-lg font-bold text-[var(--color-primary)]">
          AfScholarships
        </Link>
        <p className="mt-1 text-xs text-[var(--color-muted)]">Student dashboard</p>

        <nav className="mt-8 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-muted)] hover:bg-[var(--color-primary-soft)] hover:text-[var(--color-primary)]"
            >
              {item.label}
            </Link>
          ))}
          {isAdmin ? (
            <Link
              to="/admin"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50"
            >
              Admin console
            </Link>
          ) : null}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 lg:px-8">
          <div>
            <p className="text-sm text-[var(--color-muted)]">Signed in as</p>
            <p className="font-semibold text-[var(--color-text)]">
              {user?.name ?? user?.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button to="/scholarships" variant="outline" size="sm">
              Browse scholarships
            </Button>
            <Button variant="ghost" size="sm" onClick={() => void logout()}>
              Sign out
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
