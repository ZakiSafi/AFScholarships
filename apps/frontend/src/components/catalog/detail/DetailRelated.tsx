import type { ScholarshipListItem } from '../../../features/scholarships/types'
import { CatalogCard } from '../shared/CatalogCard'
import { SectionHeading } from '../shared/SectionHeading'

type DetailRelatedProps = {
  items: ScholarshipListItem[]
}

export function DetailRelated({ items }: DetailRelatedProps) {
  if (items.length === 0) {
    return null
  }

  return (
    <section className="border-t border-slate-200 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Keep exploring"
          title="Similar programs"
          description="Other scholarships that match this destination, level, or field."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((scholarship) => (
            <CatalogCard key={scholarship.id} scholarship={scholarship} />
          ))}
        </div>
      </div>
    </section>
  )
}
