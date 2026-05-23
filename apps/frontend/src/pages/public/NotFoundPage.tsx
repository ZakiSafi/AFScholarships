import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

export function NotFoundPage() {
  return (
    <main className="catalog-mesh flex-1">
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
          404
        </p>
        <h1 className="mt-4 text-3xl font-extrabold text-slate-900">Page not found</h1>
        <p className="mt-4 text-slate-600">
          The page you are looking for does not exist or has moved.
        </p>
        <Button to="/" className="mt-8">
          Back to home
        </Button>
        <p className="mt-4">
          <Link to="/scholarships" className="text-sm font-semibold text-[var(--color-primary)] hover:underline">
            Browse scholarships
          </Link>
        </p>
      </div>
    </main>
  )
}
