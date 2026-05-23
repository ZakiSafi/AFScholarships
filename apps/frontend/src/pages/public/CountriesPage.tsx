import { Link } from 'react-router-dom'
import { useScholarshipFacetsQuery } from '../../features/scholarships/api'
import { buildScholarshipSearchParams } from '../../features/scholarships/search-params'
import { getCountryVisual } from '../../lib/country-visual'
import { BrandImage } from '../../components/ui/BrandImage'
import { Button } from '../../components/ui/Button'

const featuredCountryNames = [
  'Turkey',
  'Germany',
  'United Kingdom',
  'United States',
  'Japan',
  'Qatar',
  'Canada',
  'Australia',
]

export function CountriesPage() {
  const { data: facets, isLoading, isError } = useScholarshipFacetsQuery()

  const countries = facets?.countries ?? []
  const total = facets?.total ?? 0

  const ordered = [...countries].sort((a, b) => b.count - a.count)

  const highlighted = featuredCountryNames
    .map((name) => ordered.find((c) => c.value === name))
    .filter(Boolean) as Array<{ value: string; count: number }>

  const rest = ordered.filter(
    (c) => !featuredCountryNames.includes(c.value),
  )

  return (
    <main className="catalog-mesh flex-1">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
          Destinations
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Study destinations
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Browse verified scholarships by host country.{' '}
          {total > 0 ? (
            <span className="font-semibold text-slate-800">
              {total} published programs
            </span>
          ) : null}{' '}
          across {countries.length} countries in our catalog.
        </p>

        {isLoading ? (
          <p className="mt-10 text-sm text-slate-500">Loading destinations…</p>
        ) : null}
        {isError ? (
          <p className="mt-10 text-sm text-red-600">
            Could not load countries. Try the{' '}
            <Link to="/scholarships" className="font-semibold text-[var(--color-primary)]">
              full catalog
            </Link>
            .
          </p>
        ) : null}

        {!isLoading && !isError && countries.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
            <p className="font-semibold text-slate-900">No destinations yet</p>
            <p className="mt-2 text-sm text-slate-600">
              Scholarships will appear here once programs are published.
            </p>
            <Button to="/scholarships" className="mt-6">
              Browse catalog
            </Button>
          </div>
        ) : null}

        {highlighted.length > 0 ? (
          <section className="mt-12">
            <h2 className="text-lg font-bold text-slate-900">Popular destinations</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {highlighted.map((country) => {
                const visual = getCountryVisual(country.value)
                const href = `/scholarships?${buildScholarshipSearchParams({ country: country.value, page: 1, limit: 12 }).toString()}`
                return (
                  <Link
                    key={country.value}
                    to={href}
                    className="group overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-lg"
                  >
                    <BrandImage
                      src={visual.image?.src ?? ''}
                      alt={visual.image?.alt ?? country.value}
                      className="aspect-[4/3] w-full"
                      fallbackGradient={visual.gradient}
                      overlayClassName="bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-slate-900 group-hover:text-[var(--color-primary)]">
                        {country.value}
                      </h3>
                      <p className="mt-1 text-sm text-slate-600">
                        {country.count} program{country.count === 1 ? '' : 's'}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        ) : null}

        {rest.length > 0 ? (
          <section className="mt-14">
            <h2 className="text-lg font-bold text-slate-900">All countries</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((country) => {
                const href = `/scholarships?${buildScholarshipSearchParams({ country: country.value, page: 1, limit: 12 }).toString()}`
                return (
                  <li key={country.value}>
                    <Link
                      to={href}
                      className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition-colors hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
                    >
                      <span>{country.value}</span>
                      <span className="tabular-nums text-slate-500">{country.count}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        ) : null}
      </div>
    </main>
  )
}
