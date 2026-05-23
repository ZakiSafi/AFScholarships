import { GraduationCap, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navLinks } from '../../data/landing'
import { useAuth } from '../../features/auth/hooks'
import { Button } from '../ui/Button'
import { cn } from '../../lib/cn'

export function PublicNavbar() {
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const linkClass = (href: string) =>
    cn(
      'text-sm font-medium transition-colors',
      pathname === href || (href !== '/' && pathname.startsWith(href))
        ? 'text-[var(--color-primary)]'
        : 'text-[var(--color-muted)] hover:text-[var(--color-primary)]',
    )
  const { isAuthenticated, isAdmin, user, hydrated } = useAuth()
  const showAuth = hydrated && isAuthenticated

  return (
    <header className="nav-solid sticky top-0 z-50 border-b border-[var(--color-border)] shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2.5"
          aria-label="AfScholarships home"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)] via-blue-500 to-[var(--color-secondary)] text-white shadow-soft ring-2 ring-blue-100">
            <GraduationCap className="h-5 w-5" aria-hidden />
          </span>
          <span className="truncate text-lg font-bold tracking-tight text-[var(--color-text)]">
            AfScholarships
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link key={link.href} to={link.href} className={linkClass(link.href)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {showAuth ? (
            <>
              <span className="max-w-[12rem] truncate text-sm text-[var(--color-muted)]">
                {user?.name ?? user?.email}
              </span>
              <Button variant="ghost" size="sm" to="/dashboard">
                Dashboard
              </Button>
              {isAdmin ? (
                <Button variant="ghost" size="sm" to="/admin">
                  Admin
                </Button>
              ) : null}
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" to="/auth/login">
                Sign in
              </Button>
              <Button size="sm" to="/auth/signup">
                Get started
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex rounded-lg p-2 text-[var(--color-text)] lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" aria-hidden />
          ) : (
            <Menu className="h-6 w-6" aria-hidden />
          )}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          'border-t border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-md lg:hidden',
          mobileOpen ? 'block' : 'hidden',
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6"
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-[var(--color-primary-soft)]',
                pathname === link.href
                  ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                  : 'text-[var(--color-text)]',
              )}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2 border-t border-[var(--color-border)] pt-4">
            {showAuth ? (
              <>
                <Button to="/dashboard" className="w-full">
                  Dashboard
                </Button>
                {isAdmin ? (
                  <Button variant="ghost" to="/admin" className="w-full">
                    Admin
                  </Button>
                ) : null}
              </>
            ) : (
              <>
                <Button variant="ghost" to="/auth/login" className="w-full">
                  Sign in
                </Button>
                <Button to="/auth/signup" className="w-full">
                  Get started
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
