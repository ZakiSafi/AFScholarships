import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'
import { PublicNavbar } from '../../components/layout/PublicNavbar'
import { Footer } from '../../components/layout/Footer'

type PlaceholderPageProps = {
  title: string
  description?: string
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-bg)]">
      <PublicNavbar />
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-[var(--color-text)]">{title}</h1>
        <p className="mt-3 max-w-md text-[var(--color-muted)]">
          {description ?? 'This section is coming soon. Return to the landing page to explore AfScholarships.'}
        </p>
        <Button to="/" className="mt-8">
          Back to home
        </Button>
        <Link
          to="/"
          className="mt-4 text-sm text-[var(--color-muted)] hover:text-[var(--color-primary)]"
        >
          AfScholarships home
        </Link>
      </main>
      <Footer />
    </div>
  )
}
