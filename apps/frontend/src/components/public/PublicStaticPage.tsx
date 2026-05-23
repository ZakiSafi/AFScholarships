import { ArrowLeft } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'

type PublicStaticPageProps = {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
}

export function PublicStaticPage({
  eyebrow = 'AfScholarships',
  title,
  description,
  children,
}: PublicStaticPageProps) {
  return (
    <main className="catalog-mesh flex-1">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24 lg:py-28">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-slate-600">
            {description}
          </p>
        ) : null}
        {children}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button to="/scholarships" size="lg">
            Explore scholarships
          </Button>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-[var(--color-primary)]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to home
          </Link>
        </div>
      </div>
    </main>
  )
}
