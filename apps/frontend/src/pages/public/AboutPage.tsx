import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/Button'

export function AboutPage() {
  return (
    <main className="catalog-mesh flex-1">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
          Our mission
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          About AfScholarships
        </h1>
        <div className="mt-8 space-y-6 text-base leading-relaxed text-slate-700">
          <p>
            AfScholarships helps Afghan students discover verified global scholarship
            opportunities with clear deadlines, official application links, and tools to
            save programs and set reminders.
          </p>
          <p>
            We focus on trust: every listing links to an official source, shows verification
            status, and can be reported by the community if something looks outdated or
            incorrect. Our moderation team reviews reports and keeps the catalog accurate.
          </p>
          <p>
            For partner programs, you can apply directly on the platform and track your
            application status in your dashboard—no guessing which email thread has an update.
          </p>
        </div>

        <h2 className="mt-12 text-xl font-bold text-slate-900">What you can do</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700">
          <li>Search and filter scholarships by country, degree, and funding type</li>
          <li>Save listings and receive deadline reminders by email</li>
          <li>Submit in-platform applications for partner opportunities</li>
          <li>Report listings that need correction</li>
        </ul>

        <div className="mt-12 flex flex-wrap gap-3">
          <Button to="/scholarships">Browse scholarships</Button>
          <Button to="/auth/signup" variant="outline">
            Create free account
          </Button>
        </div>

        <p className="mt-10 text-sm text-slate-500">
          Questions? Email{' '}
          <a
            href="mailto:support@afscholarships.dev"
            className="font-semibold text-[var(--color-primary)] hover:underline"
          >
            support@afscholarships.dev
          </a>
          . See also our{' '}
          <Link to="/privacy" className="font-semibold text-[var(--color-primary)] hover:underline">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link to="/terms" className="font-semibold text-[var(--color-primary)] hover:underline">
            Terms of Service
          </Link>
          .
        </p>
      </div>
    </main>
  )
}
