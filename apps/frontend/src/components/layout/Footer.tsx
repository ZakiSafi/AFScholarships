import { Link } from 'react-router-dom'
import { GraduationCap, Mail } from 'lucide-react'
import { footerColumns } from '../../data/landing'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-primary)] text-white">
                <GraduationCap className="h-4 w-4" aria-hidden />
              </span>
              <span className="font-bold text-[var(--color-text)]">
                AfScholarships
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-[var(--color-muted)]">
              Afghan-first, global-ready scholarship discovery for students who
              deserve trusted opportunities.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text)]">
              Platform
            </h3>
            <ul className="mt-4 space-y-2">
              {footerColumns.platform.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text)]">
              Account
            </h3>
            <ul className="mt-4 space-y-2">
              {footerColumns.account.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text)]">
              Legal
            </h3>
            <ul className="mt-4 space-y-2">
              {footerColumns.legal.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--color-text)]">
              Contact
            </h3>
            <a
              href="mailto:support@afscholarships.com"
              className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-primary)]"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden />
              support@afscholarships.com
            </a>
          </div>
        </div>

        <p className="mt-10 border-t border-[var(--color-border)] pt-8 text-center text-sm text-[var(--color-muted)]">
          © {new Date().getFullYear()} AfScholarships. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
