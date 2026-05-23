import { CatalogResults } from '../../../components/catalog/list/CatalogResults'
import { CatalogSearchForm } from '../../../components/catalog/list/CatalogSearchForm'
import { useCatalogSearch } from '../../../features/scholarships/hooks/useCatalogSearch'

export function ScholarshipsListPage() {
  const {
    filters,
    setFilters,
    applyFilters,
    setPage,
    clearFilters,
    data,
    isLoading,
    isError,
    isFetching,
  } = useCatalogSearch()

  const total = data?.facets?.total ?? data?.total

  return (
    <>
      <section
        className="border-b border-slate-200 bg-slate-50 py-12 sm:py-14"
        aria-labelledby="catalog-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                Browse
              </p>
              <h1
                id="catalog-heading"
                className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl"
              >
                Scholarships
              </h1>
              <p className="text-section-desc mt-2 max-w-xl">
                Verified programs with official links and clear deadlines—the same
                catalog as on our home page.
              </p>
            </div>
            {!isLoading && total !== undefined ? (
              <p className="text-sm font-semibold text-slate-600">
                <span className="text-2xl font-extrabold tabular-nums text-[var(--color-primary)]">
                  {total}
                </span>{' '}
                open programs
              </p>
            ) : null}
          </div>

          <div className="mt-8">
            <CatalogSearchForm
              values={filters}
              facets={data?.facets}
              onChange={setFilters}
              onSubmit={() => applyFilters(filters, 1)}
              onQuickFilter={(patch) => {
                const next = { ...filters, ...patch }
                setFilters(next)
                applyFilters(next, 1)
              }}
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section aria-live="polite" aria-busy={isFetching}>
            <CatalogResults
              items={data?.items ?? []}
              total={data?.total ?? 0}
              page={data?.page ?? 1}
              totalPages={data?.totalPages ?? 1}
              isLoading={isLoading}
              isFetching={isFetching}
              isError={isError}
              onPageChange={setPage}
              onClearFilters={clearFilters}
            />
          </section>
        </div>
      </section>
    </>
  )
}
