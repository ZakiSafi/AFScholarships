import { Link, NavLink, Outlet } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { useAuth } from '../../features/auth/hooks'
import { cn } from '../../lib/cn'

const navItems = [
  { to: '/admin', label: 'Overview' },
  { to: '/admin/scholarships', label: 'Scholarships' },
  { to: '/admin/reports', label: 'Reports' },
  { to: '/admin/applications', label: 'Applications' },
  { to: '/admin/audit-logs', label: 'Audit logs' },
  { to: '/admin/jobs', label: 'Jobs' },
]

export function AdminLayout() {
  const { user, logout } = useAuth()

  return (
    <div className="flex min-h-screen bg-[var(--color-bg)]">
      <aside className="hidden w-64 shrink-0 border-r border-[var(--color-border)] bg-[var(--color-surface)] p-6 lg:block">
        <Link to="/" className="text-lg font-bold text-[var(--color-primary)]">
          AfScholarships
        </Link>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-amber-700">
          Admin console
        </p>

        <nav className="mt-8 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              className={({ isActive }: { isActive: boolean }) =>
                cn(
                  'block rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-amber-50 text-amber-900'
                    : 'text-[var(--color-muted)] hover:bg-amber-50/60 hover:text-amber-900',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 border-t border-[var(--color-border)] pt-6">
          <Button to="/dashboard" variant="outline" size="sm" className="w-full">
            Student dashboard
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 lg:px-8">
          <div>
            <p className="text-sm text-[var(--color-muted)]">Administrator</p>
            <p className="font-semibold text-[var(--color-text)]">
              {user?.name ?? user?.email}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button to="/scholarships" variant="outline" size="sm">
              Public site
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
