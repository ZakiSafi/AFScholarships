import { CatalogGridSkeleton } from '../shared/CatalogSkeleton'

export function DetailLoadingState() {
  return (
    <>
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl animate-pulse px-4 py-10 sm:px-6 lg:px-8">
          <div className="h-3 w-40 rounded bg-slate-200" />
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="aspect-[4/3] rounded-2xl bg-slate-200" />
            <div className="space-y-3">
              <div className="h-8 w-3/4 rounded bg-slate-200" />
              <div className="h-4 w-1/2 rounded bg-slate-100" />
              <div className="h-20 rounded bg-slate-50" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CatalogGridSkeleton count={1} />
        </div>
      </div>
    </>
  )
}

export function DetailNotFoundState() {
  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center bg-slate-50 px-4 py-20 text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
        Not found
      </p>
      <h1 className="mt-4 text-2xl font-bold text-slate-900 sm:text-3xl">
        Program unavailable
      </h1>
      <p className="mt-3 max-w-md text-slate-600">
        This listing may have been removed. Browse the catalog for current opportunities.
      </p>
      <a
        href="/scholarships"
        className="mt-8 inline-flex rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-bold text-white shadow-soft hover:bg-[var(--color-primary-dark)]"
      >
        View scholarships
      </a>
    </main>
  )
}
