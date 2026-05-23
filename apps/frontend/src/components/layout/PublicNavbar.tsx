import { Menu, X, GraduationCap } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { navLinks } from '../../data/landing'
import { Button } from '../ui/Button'
import { cn } from '../../lib/cn'

export function PublicNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-surface)]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2.5"
          aria-label="AfScholarships home"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white">
            <GraduationCap className="h-5 w-5" aria-hidden />
          </span>
          <span className="truncate text-lg font-bold text-[var(--color-text)]">
            AfScholarships
          </span>
        </Link>

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm font-medium text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" size="sm" to="/auth/login">
            Sign in
          </Button>
          <Button size="sm" to="/auth/signup">
            Get started
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-lg p-2 text-[var(--color-text)] lg:hidden"
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
          'border-t border-[var(--color-border)] bg-[var(--color-surface)] lg:hidden',
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
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--color-text)] hover:bg-slate-50"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 flex flex-col gap-2 border-t border-[var(--color-border)] pt-4">
            <Button variant="outline" to="/auth/login" className="w-full">
              Sign in
            </Button>
            <Button to="/auth/signup" className="w-full">
              Get started
            </Button>
          </div>
        </nav>
      </div>
    </header>
  )
}
