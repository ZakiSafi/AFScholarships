export function RouteFallback() {
  return (
    <div
      className="flex min-h-[50vh] flex-col items-center justify-center gap-4 bg-[var(--color-bg)]"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-[var(--color-primary)]" />
      <p className="text-sm font-medium text-slate-500">Loading…</p>
    </div>
  )
}
