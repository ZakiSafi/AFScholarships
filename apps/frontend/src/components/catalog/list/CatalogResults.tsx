import { CatalogCard } from '../shared/CatalogCard'
import { CatalogGridSkeleton } from '../shared/CatalogSkeleton'
import type { ScholarshipListItem } from '../../../features/scholarships/types'
import { Button } from '../../ui/Button'

type CatalogResultsProps = {
  items: ScholarshipListItem[]
  total: number
  page: number
  totalPages: number
  isLoading: boolean
  isFetching: boolean
  isError: boolean
  onPageChange: (page: number) => void
  onClearFilters: () => void
}

export function CatalogResults({
  items,
  total,
  page,
  totalPages,
  isLoading,
  isFetching,
  isError,
  onPageChange,
  onClearFilters,
}: CatalogResultsProps) {
  if (isLoading) {
    return <CatalogGridSkeleton count={6} />
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-card">
        <p className="text-lg font-bold text-slate-900">Could not load scholarships</p>
        <p className="mt-2 text-sm text-slate-600">
          Confirm the API is running, then refresh.
        </p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center">
        <p className="text-xl font-bold text-slate-900">No scholarships match</p>
        <p className="mx-auto mt-2 max-w-sm text-sm text-slate-600">
          Try adjusting your search or filters.
        </p>
        <Button variant="outline" className="mt-6" onClick={onClearFilters}>
          Clear filters
        </Button>
      </div>
    )
  }

  return (
    <>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
        <p className="text-sm text-slate-600">
          <span className="font-bold tabular-nums text-slate-900">{total}</span>{' '}
          programs found
          {totalPages > 1 ? (
            <>
              {' '}
              · page{' '}
              <span className="font-semibold tabular-nums">{page}</span> of{' '}
              <span className="font-semibold tabular-nums">{totalPages}</span>
            </>
          ) : null}
        </p>
        {isFetching ? (
          <span className="text-sm font-medium text-[var(--color-primary)]">
            Updating…
          </span>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((scholarship) => (
          <CatalogCard key={scholarship.id} scholarship={scholarship} />
        ))}
      </div>

      {totalPages > 1 ? (
        <nav
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row"
          aria-label="Pagination"
        >
          <p className="text-sm text-slate-500">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => onPageChange(page + 1)}
            >
              Next
            </Button>
          </div>
        </nav>
      ) : null}
    </>
  )
}
