import { useScholarshipFacetsQuery } from '../../features/scholarships/api'

export function HeroStats() {
  const { data: facets, isLoading } = useScholarshipFacetsQuery()

  const scholarshipCount = facets?.total ?? 0
  const countryCount = facets?.countries?.length ?? 0

  const stats = [
    {
      value: isLoading ? '…' : scholarshipCount > 0 ? String(scholarshipCount) : '0',
      label: 'Scholarships',
    },
    {
      value: isLoading ? '…' : countryCount > 0 ? String(countryCount) : '0',
      label: 'Countries',
    },
    { value: '100%', label: 'Free to use' },
  ]

  return (
    <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8">
      {stats.map((stat) => (
        <div key={stat.label}>
          <dt className="text-2xl font-extrabold tabular-nums text-[var(--color-primary)] sm:text-3xl">
            {stat.value}
          </dt>
          <dd className="mt-1 text-sm font-semibold text-slate-800">{stat.label}</dd>
        </div>
      ))}
    </dl>
  )
}
