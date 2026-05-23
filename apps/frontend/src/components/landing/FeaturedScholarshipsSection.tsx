import { useListScholarshipsQuery } from '../../features/scholarships/api'
import { CatalogCard } from '../catalog/shared/CatalogCard'
import { Button } from '../ui/Button'

export function FeaturedScholarshipsSection() {
  const { data, isLoading, isError } = useListScholarshipsQuery({
    sortBy: 'featured',
    limit: 6,
  })

  return (
    <section
      className="bg-white py-16 sm:py-20"
      aria-labelledby="featured-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="featured-heading"
              className="text-2xl font-bold text-[var(--color-text)] sm:text-3xl"
            >
              Featured scholarships
            </h2>
            <p className="text-section-desc mt-2 max-w-xl">
              Verified programs students are applying to right now.
            </p>
          </div>
          <Button variant="outline" to="/scholarships">
            View all
          </Button>
        </div>

        {isLoading ? (
          <p className="mt-10 text-sm text-[var(--color-muted)]">
            Loading featured scholarships…
          </p>
        ) : null}

        {isError ? (
          <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-amber-800">
            <span>Featured listings are temporarily unavailable.</span>
            <Button variant="outline" size="sm" to="/scholarships">
              Browse catalog
            </Button>
          </div>
        ) : null}

        {data && data.items.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((scholarship) => (
              <CatalogCard key={scholarship.id} scholarship={scholarship} />
            ))}
          </div>
        ) : null}

        {!isLoading && !isError && data?.items.length === 0 ? (
          <p className="mt-10 text-sm text-[var(--color-muted)]">
            No published scholarships yet. Check back soon or browse the full catalog.
          </p>
        ) : null}
      </div>
    </section>
  )
}
