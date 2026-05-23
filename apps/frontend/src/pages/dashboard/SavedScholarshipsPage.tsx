import { Link } from 'react-router-dom'
import { CatalogCard } from '../../components/catalog/shared/CatalogCard'
import { Button } from '../../components/ui/Button'
import { useListSavedQuery } from '../../features/saved/api'
import { savedEmbedToListItem } from '../../lib/saved-to-list-item'

export function SavedScholarshipsPage() {
  const { data: items = [], isLoading, isError } = useListSavedQuery()

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Saved scholarships</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Programs you bookmarked for later. Remove saves from the catalog or detail page.
        </p>
      </div>

      {isLoading ? (
        <p className="text-sm text-[var(--color-muted)]">Loading saved programs…</p>
      ) : null}

      {isError ? (
        <p className="text-sm text-red-600">Could not load saved scholarships.</p>
      ) : null}

      {!isLoading && !isError && items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="font-semibold text-slate-900">No saved scholarships yet</p>
          <p className="mt-2 text-sm text-slate-600">
            Use the bookmark icon on any program to save it here.
          </p>
          <Button to="/scholarships" className="mt-6">
            Browse scholarships
          </Button>
        </div>
      ) : null}

      {items.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <CatalogCard
              key={item.id}
              scholarship={savedEmbedToListItem(item.scholarship)}
            />
          ))}
        </div>
      ) : null}

      <p className="text-sm text-[var(--color-muted)]">
        <Link to="/scholarships" className="text-[var(--color-primary)] hover:underline">
          Find more scholarships
        </Link>
      </p>
    </div>
  )
}
