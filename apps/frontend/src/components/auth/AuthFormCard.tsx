import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { Card } from '../ui/Card'

type AuthFormCardProps = {
  title: string
  subtitle?: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthFormCard({ title, subtitle, children, footer }: AuthFormCardProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            to="/"
            className="text-lg font-bold text-[var(--color-primary)]"
          >
            AfScholarships
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-primary)]"
          >
            Back to home
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md p-8 shadow-card">
          <h1 className="text-2xl font-bold text-[var(--color-text)]">{title}</h1>
          {subtitle ? (
            <p className="mt-2 text-sm text-[var(--color-muted)]">{subtitle}</p>
          ) : null}
          <div className="mt-8">{children}</div>
          {footer ? <div className="mt-6 border-t border-[var(--color-border)] pt-6">{footer}</div> : null}
        </Card>
      </main>
    </div>
  )
}
