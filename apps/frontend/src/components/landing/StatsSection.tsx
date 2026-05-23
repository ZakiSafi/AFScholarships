import { stats } from '../../data/landing'

export function StatsSection() {
  return (
    <section
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      aria-labelledby="stats-heading"
    >
      <h2 id="stats-heading" className="sr-only">
        Platform statistics
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-center shadow-card"
          >
            <p className="text-3xl font-extrabold text-[var(--color-primary)] sm:text-4xl">
              {stat.value}
            </p>
            <p className="mt-2 text-sm font-medium text-[var(--color-muted)]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
