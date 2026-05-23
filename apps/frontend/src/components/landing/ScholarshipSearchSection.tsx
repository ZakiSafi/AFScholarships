import { Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  countryOptions,
  degreeLevelOptions,
  fundingTypeOptions,
  quickFilterChips,
} from '../../data/landing'
import { useScholarshipFacetsQuery } from '../../features/scholarships/api'
import { formatDegreeLevel, formatFundingType } from '../../features/scholarships/format'
import { buildScholarshipSearchParams } from '../../features/scholarships/search-params'
import type { DegreeLevel, FundingType } from '../../features/scholarships/types'
import { Button } from '../ui/Button'
import { cn } from '../../lib/cn'

const chipToParams: Record<
  string,
  { fundingType?: FundingType; degreeLevel?: DegreeLevel; country?: string; tag?: string }
> = {
  'Fully funded': { fundingType: 'FULL' },
  'Without IELTS': { tag: 'no-ielts' },
  Bachelor: { degreeLevel: 'BACHELOR' },
  Master: { degreeLevel: 'MASTER' },
  Germany: { country: 'Germany' },
  Türkiye: { country: 'Turkey' },
  'Deadline this month': {},
}

export function ScholarshipSearchSection() {
  const { data: facets } = useScholarshipFacetsQuery()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [degreeLevel, setDegreeLevel] = useState('')
  const [country, setCountry] = useState('')
  const [fundingType, setFundingType] = useState('')
  const [activeChip, setActiveChip] = useState<string | null>(null)

  const goToCatalog = (overrides?: {
    search?: string
    country?: string
    degreeLevel?: DegreeLevel
    fundingType?: FundingType
    tag?: string
  }) => {
    const params = buildScholarshipSearchParams({
      page: 1,
      limit: 12,
      search: overrides?.search ?? (query.trim() || undefined),
      country: overrides?.country ?? (country || undefined),
      degreeLevel:
        overrides?.degreeLevel ??
        (degreeLevel ? (degreeLevel as DegreeLevel) : undefined),
      fundingType:
        overrides?.fundingType ??
        (fundingType ? (fundingType as FundingType) : undefined),
      tag: overrides?.tag,
    })
    navigate(`/scholarships?${params.toString()}`)
  }

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    goToCatalog()
  }

  const toggleChip = (chip: string) => {
    const next = activeChip === chip ? null : chip
    setActiveChip(next)
    if (next) {
      const mapped = chipToParams[next]
      if (mapped) {
        goToCatalog(mapped)
      }
    }
  }

  const selectClassName =
    'w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base font-medium text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-blue-100'

  const countrySelectOptions: Array<{ value: string; label: string }> =
    facets?.countries?.length ?
      [{ value: '', label: 'All countries' }, ...facets.countries.map((c) => ({
        value: c.value,
        label: `${c.value} (${c.count})`,
      }))]
    : [...countryOptions]

  const degreeSelectOptions: Array<{ value: string; label: string }> =
    facets?.degreeLevels?.length ?
      [{ value: '', label: 'All degree levels' }, ...facets.degreeLevels.map((d) => ({
        value: d.value,
        label: formatDegreeLevel(d.value as DegreeLevel),
      }))]
    : [...degreeLevelOptions]

  const fundingSelectOptions: Array<{ value: string; label: string }> =
    facets?.fundingTypes?.length ?
      [{ value: '', label: 'All funding types' }, ...facets.fundingTypes.map((f) => ({
        value: f.value,
        label: formatFundingType(f.value as FundingType),
      }))]
    : [...fundingTypeOptions]

  return (
    <section
      id="search"
      className="bg-slate-50 py-16 sm:py-20"
      aria-labelledby="search-heading"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2
            id="search-heading"
            className="text-2xl font-bold text-[var(--color-text)] sm:text-3xl"
          >
            Search scholarships
          </h2>
          <p className="text-section-desc mx-auto mt-2 max-w-xl">
            Filter by country, degree, and funding from our live catalog.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-7">
          <form
            onSubmit={handleSearch}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:items-end"
          >
            <div className="relative sm:col-span-2 lg:col-span-5">
              <label htmlFor="scholarship-search" className="sr-only">
                Search scholarships
              </label>
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
              <input
                id="scholarship-search"
                type="search"
                placeholder="Scholarship, country, or university..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-3 text-base focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="degree-level" className="text-label mb-1 block">
                Degree
              </label>
              <select
                id="degree-level"
                value={degreeLevel}
                onChange={(e) => setDegreeLevel(e.target.value)}
                className={selectClassName}
              >
                {degreeSelectOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="country" className="text-label mb-1 block">
                Country
              </label>
              <select
                id="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className={selectClassName}
              >
                {countrySelectOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-2">
              <label htmlFor="funding-type" className="text-label mb-1 block">
                Funding
              </label>
              <select
                id="funding-type"
                value={fundingType}
                onChange={(e) => setFundingType(e.target.value)}
                className={selectClassName}
              >
                {fundingSelectOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-1">
              <Button type="submit" className="w-full bg-[var(--color-primary)]">
                Search
              </Button>
            </div>
          </form>

          <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-5">
            {quickFilterChips.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => toggleChip(chip)}
                className={cn(
                  'rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                  activeChip === chip
                    ? 'bg-[var(--color-primary)] text-white'
                    : 'bg-slate-100 text-[var(--color-muted)] hover:bg-blue-50 hover:text-[var(--color-primary)]',
                )}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
