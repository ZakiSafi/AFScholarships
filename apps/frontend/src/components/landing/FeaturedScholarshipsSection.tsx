import { featuredScholarships } from '../../data/landing'
import { Button } from '../ui/Button'
import { ScholarshipCardItem } from './ScholarshipCardItem'

export function FeaturedScholarshipsSection() {
  return (
    <section
      className="bg-[var(--color-surface)] py-16 lg:py-20"
      aria-labelledby="featured-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2
              id="featured-heading"
              className="text-2xl font-bold text-[var(--color-text)] sm:text-3xl"
            >
              Featured scholarships
            </h2>
            <p className="mt-2 max-w-2xl text-[var(--color-muted)]">
              Hand-picked opportunities from official government and university
              programs worldwide.
            </p>
          </div>
          <Button variant="outline" to="/scholarships">
            View all
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredScholarships.map((scholarship) => (
            <ScholarshipCardItem key={scholarship.id} scholarship={scholarship} />
          ))}
        </div>
      </div>
    </section>
  )
}
