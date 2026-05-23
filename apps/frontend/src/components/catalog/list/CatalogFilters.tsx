import { Filter, SlidersHorizontal } from 'lucide-react'
import type { FormEvent } from 'react'
import type { ScholarshipFacets } from '../../../features/scholarships/types'
import {
  formatDegreeLevel,
  formatFundingType,
} from '../../../features/scholarships/format'
import type { DegreeLevel, FundingType } from '../../../features/scholarships/types'
import { Button } from '../../ui/Button'
import { cn } from '../../../lib/cn'

export type ScholarshipFilterValues = {
  search: string
  country: string
  degreeLevel: DegreeLevel | ''
  fundingType: FundingType | ''
  partnerOnly: boolean
  sortBy: 'deadline' | 'title' | 'created' | 'featured'
  sortOrder: 'asc' | 'desc'
}
type CatalogFiltersProps = {
  values: ScholarshipFilterValues
  facets?: ScholarshipFacets
  activeCount: number
  onChange: (values: ScholarshipFilterValues) => void
  onSubmit: () => void
  onClear: () => void
  className?: string
}

const fieldClassName =
  'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-medium text-slate-900 shadow-sm transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-blue-100'

export function CatalogFilters({
  values,
  facets,
  activeCount,
  onChange,
  onSubmit,
  onClear,
  className,
}: CatalogFiltersProps) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit()
  }

  const countries = facets?.countries ?? []
  const degreeLevels = facets?.degreeLevels ?? []
  const fundingTypes = facets?.fundingTypes ?? []

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'rounded-2xl bg-white/90 p-5 shadow-card ring-1 ring-slate-200 backdrop-blur-sm sm:p-6',
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
            <SlidersHorizontal className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <p className="text-sm font-bold text-slate-900">Refine results</p>
            <p className="text-xs text-slate-500">
              {activeCount > 0
                ? `${activeCount} active filter${activeCount === 1 ? '' : 's'}`
                : 'All published programs'}
            </p>
          </div>
        </div>
        {activeCount > 0 ? (
          <button
            type="button"
            onClick={onClear}
            className="text-xs font-semibold text-[var(--color-primary)] hover:underline"
          >
            Clear all
          </button>
        ) : null}
      </div>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="catalog-search" className="text-label mb-1.5 block">
            Keywords
          </label>
          <input
            id="catalog-search"
            type="search"
            value={values.search}
            onChange={(e) => onChange({ ...values, search: e.target.value })}
            placeholder="Program, provider, field…"
            className={fieldClassName}
          />
        </div>

        <div>
          <label htmlFor="catalog-country" className="text-label mb-1.5 block">
            Host country
          </label>
          <select
            id="catalog-country"
            value={values.country}
            onChange={(e) => onChange({ ...values, country: e.target.value })}
            className={fieldClassName}
          >
            <option value="">All destinations</option>
            {countries.map((item) => (
              <option key={item.value} value={item.value}>
                {item.value} ({item.count})
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <label htmlFor="catalog-degree" className="text-label mb-1.5 block">
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
              className={fieldClassName}
            >
              <option value="">Any level</option>
              {degreeLevels.map((item) => (
                <option key={item.value} value={item.value}>
                  {formatDegreeLevel(item.value as DegreeLevel)} ({item.count})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="catalog-funding" className="text-label mb-1.5 block">
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
              className={fieldClassName}
            >
              <option value="">Any funding</option>
              {fundingTypes.map((item) => (
                <option key={item.value} value={item.value}>
                  {formatFundingType(item.value as FundingType)} ({item.count})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="catalog-sort" className="text-label mb-1.5 block">
            Sort
          </label>
          <select
            id="catalog-sort"
            value={`${values.sortBy}:${values.sortOrder}`}
            onChange={(e) => {
              const [sortBy, sortOrder] = e.target.value.split(':') as [
                ScholarshipFilterValues['sortBy'],
                ScholarshipFilterValues['sortOrder'],
              ]
              onChange({ ...values, sortBy, sortOrder })
            }}
            className={fieldClassName}
          >
            <option value="deadline:asc">Deadline — soonest first</option>
            <option value="deadline:desc">Deadline — latest first</option>
            <option value="featured:desc">Featured programs</option>
            <option value="title:asc">Title A–Z</option>
            <option value="created:desc">Recently added</option>
          </select>
        </div>

        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 px-3.5 py-3 text-sm text-slate-800">
          <input
            type="checkbox"
            checked={values.partnerOnly}
            onChange={(e) =>
              onChange({ ...values, partnerOnly: e.target.checked })
            }
            className="h-4 w-4 rounded border-slate-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
          />
          <span>
            <span className="font-semibold">In-platform apply</span>
            <span className="mt-0.5 block text-xs text-slate-500">
              Partner programs you can submit on AfScholarships
            </span>
          </span>
        </label>
      </div>

      <Button type="submit" className="mt-6 w-full gap-2">
        <Filter className="h-4 w-4" aria-hidden />
        Apply filters
      </Button>
    </form>
  )
}

