export function CatalogCardSkeleton() {
  return (
    <div
      className="overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200"
      aria-hidden
    >
      <div className="aspect-[4/3] animate-pulse bg-slate-200" />
      <div className="space-y-3 p-4">
        <div className="h-5 w-4/5 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />
        <div className="h-10 animate-pulse rounded bg-slate-50" />
      </div>
    </div>
  )
}

export function CatalogGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CatalogCardSkeleton key={i} />
      ))}
    </div>
  )
}
