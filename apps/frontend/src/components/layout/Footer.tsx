import { GraduationCap, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { footerColumns } from '../../data/landing'

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-6">
          <div className="sm:col-span-2 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
                <GraduationCap className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-lg font-bold text-[var(--color-text)]">
                AfScholarships
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-muted)]">
              Afghan-first, global-ready scholarship discovery. Verified listings,
              deadline reminders, and application guidance—free at launch.
            </p>
            <a
              href="mailto:support@afscholarships.com"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[var(--color-primary)] hover:underline"
            >
              <Mail className="h-4 w-4" aria-hidden />
              support@afscholarships.com
            </a>
          </div>

          <FooterColumn title="Platform" links={footerColumns.platform} />
          <FooterColumn title="Account" links={footerColumns.account} />
          <FooterColumn title="Resources" links={footerColumns.resources} />
          <FooterColumn title="Legal" links={footerColumns.legal} />
        </div>

        <p className="mt-12 border-t border-[var(--color-border)] pt-8 text-center text-sm text-[var(--color-muted)]">
          © {new Date().getFullYear()} AfScholarships. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: readonly { label: string; href: string }[]
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-[var(--color-text)]">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {links.map((item) => (
          <li key={item.label}>
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
  )
}
