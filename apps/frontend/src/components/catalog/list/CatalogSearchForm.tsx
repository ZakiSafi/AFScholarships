import { Search } from 'lucide-react'
import type { FormEvent } from 'react'
import {
  countryOptions,
  degreeLevelOptions,
  fundingTypeOptions,
  quickFilterChips,
} from '../../../data/landing'
import type { ScholarshipFacets } from '../../../features/scholarships/types'
import {
  formatDegreeLevel,
  formatFundingType,
} from '../../../features/scholarships/format'
import type { DegreeLevel, FundingType } from '../../../features/scholarships/types'
import { Button } from '../../ui/Button'
import { cn } from '../../../lib/cn'
import type { ScholarshipFilterValues } from './CatalogFilters'

type CatalogSearchFormProps = {
  values: ScholarshipFilterValues
  facets?: ScholarshipFacets
  onChange: (values: ScholarshipFilterValues) => void
  onSubmit: () => void
  onQuickFilter: (patch: Partial<ScholarshipFilterValues>) => void
}

const selectClassName =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-3 text-base font-medium text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-blue-100'

export function CatalogSearchForm({
  values,
  facets,
  onChange,
  onSubmit,
  onQuickFilter,
}: CatalogSearchFormProps) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit()
  }

  const countries =
    facets?.countries?.length ?
      [{ value: '', label: 'All countries' }, ...facets.countries.map((c) => ({
        value: c.value,
        label: `${c.value} (${c.count})`,
      }))]
    : countryOptions.map((o) => ({ value: o.value, label: o.label }))

  const degrees =
    facets?.degreeLevels?.length ?
      [{ value: '', label: 'All degree levels' }, ...facets.degreeLevels.map((d) => ({
        value: d.value,
        label: `${formatDegreeLevel(d.value as DegreeLevel)} (${d.count})`,
      }))]
    : degreeLevelOptions.map((o) => ({ value: o.value, label: o.label }))

  const funding =
    facets?.fundingTypes?.length ?
      [{ value: '', label: 'All funding types' }, ...facets.fundingTypes.map((f) => ({
        value: f.value,
        label: `${formatFundingType(f.value as FundingType)} (${f.count})`,
      }))]
    : fundingTypeOptions.map((o) => ({ value: o.value, label: o.label }))

  const chipFilters: Record<string, Partial<ScholarshipFilterValues>> = {
    'Fully funded': { fundingType: 'FULL' },
    Bachelor: { degreeLevel: 'BACHELOR' },
    Master: { degreeLevel: 'MASTER' },
    Germany: { country: 'Germany' },
    Türkiye: { country: 'Turkey' },
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-7">
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:items-end"
      >
        <div className="relative sm:col-span-2 lg:col-span-5">
          <label htmlFor="catalog-search" className="sr-only">
            Search scholarships
          </label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <input
            id="catalog-search"
            type="search"
            placeholder="Scholarship, country, or university..."
            value={values.search}
            onChange={(e) => onChange({ ...values, search: e.target.value })}
            className="w-full rounded-lg border border-slate-200 py-3 pl-10 pr-3 text-base focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="lg:col-span-2">
          <label htmlFor="catalog-degree" className="text-label mb-1 block">
            Degree
          </label>
          <select
            id="catalog-degree"
            value={values.degreeLevel}
            onChange={(e) =>
              onChange({
                ...values,
                degreeLevel: e.target.value as DegreeLevel | '',
              })
            }
            className={selectClassName}
          >
            {degrees.map((opt) => (
              <option key={opt.value || 'all'} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-2">
          <label htmlFor="catalog-country" className="text-label mb-1 block">
            Country
          </label>
          <select
            id="catalog-country"
            value={values.country}
            onChange={(e) => onChange({ ...values, country: e.target.value })}
            className={selectClassName}
          >
            {countries.map((opt) => (
              <option key={opt.value || 'all'} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="lg:col-span-2">
          <label htmlFor="catalog-funding" className="text-label mb-1 block">
            Funding
          </label>
          <select
            id="catalog-funding"
            value={values.fundingType}
            onChange={(e) =>
              onChange({
                ...values,
                fundingType: e.target.value as FundingType | '',
              })
            }
            className={selectClassName}
          >
            {funding.map((opt) => (
              <option key={opt.value || 'all'} value={opt.value}>
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
        {quickFilterChips
          .filter((chip) => chip !== 'Without IELTS' && chip !== 'Deadline this month')
          .map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => {
                const patch = chipFilters[chip]
                if (patch) {
                  onQuickFilter({ ...values, ...patch })
                }
              }}
              className={cn(
                'rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                'bg-slate-100 text-[var(--color-muted)] hover:bg-blue-50 hover:text-[var(--color-primary)]',
              )}
            >
              {chip}
            </button>
          ))}
      </div>
    </div>
  )
}
