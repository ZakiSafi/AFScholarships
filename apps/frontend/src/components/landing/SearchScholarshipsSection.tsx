import { Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import {
  countryOptions,
  degreeLevelOptions,
  fundingTypeOptions,
} from '../../data/landing'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Input } from '../ui/Input'

export function SearchScholarshipsSection() {
  const [query, setQuery] = useState('')
  const [degreeLevel, setDegreeLevel] = useState('')
  const [country, setCountry] = useState('')
  const [fundingType, setFundingType] = useState('')

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const selectClassName =
    'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-emerald-100'

  return (
    <section
      id="search"
      className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      aria-labelledby="search-heading"
    >
      <div className="text-center">
        <h2
          id="search-heading"
          className="text-2xl font-bold text-[var(--color-text)] sm:text-3xl"
        >
          Search scholarships
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-[var(--color-muted)]">
          Filter by degree, country, and funding type. Full search launches soon.
        </p>
      </div>

      <Card className="mx-auto mt-8 max-w-5xl p-5 sm:p-6 lg:p-8">
        <form
          onSubmit={handleSearch}
          className="grid gap-4 lg:grid-cols-12 lg:items-end"
        >
          <div className="relative lg:col-span-5">
            <label htmlFor="scholarship-search" className="sr-only">
              Search scholarships
            </label>
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-muted)]"
              aria-hidden
            />
            <Input
              id="scholarship-search"
              type="search"
              placeholder="Search by scholarship, country, university..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-11"
            />
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="degree-level" className="mb-1.5 block text-xs font-semibold text-[var(--color-muted)]">
              Degree level
            </label>
            <select
              id="degree-level"
              value={degreeLevel}
              onChange={(e) => setDegreeLevel(e.target.value)}
              className={selectClassName}
            >
              {degreeLevelOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="country" className="mb-1.5 block text-xs font-semibold text-[var(--color-muted)]">
              Country
            </label>
            <select
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={selectClassName}
            >
              {countryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-2">
            <label htmlFor="funding-type" className="mb-1.5 block text-xs font-semibold text-[var(--color-muted)]">
              Funding type
            </label>
            <select
              id="funding-type"
              value={fundingType}
              onChange={(e) => setFundingType(e.target.value)}
              className={selectClassName}
            >
              {fundingTypeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-1">
            <Button type="submit" className="w-full lg:px-4">
              <Search className="h-4 w-4" aria-hidden />
              <span className="lg:sr-only">Search</span>
              <span className="hidden lg:inline">Go</span>
              <span className="lg:hidden">Search</span>
            </Button>
          </div>
        </form>
      </Card>
    </section>
  )
}
