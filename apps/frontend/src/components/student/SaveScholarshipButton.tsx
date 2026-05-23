import { Bookmark } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import {
  useCheckSavedQuery,
  useSaveScholarshipMutation,
  useUnsaveScholarshipMutation,
} from '../../features/saved/api'
import { useAuth } from '../../features/auth/hooks'
import { cn } from '../../lib/cn'

type SaveScholarshipButtonProps = {
  scholarshipId: string
  className?: string
  size?: 'sm' | 'md'
}

export function SaveScholarshipButton({
  scholarshipId,
  className,
  size = 'md',
}: SaveScholarshipButtonProps) {
  const location = useLocation()
  const { isAuthenticated, hydrated } = useAuth()
  const { data, isLoading } = useCheckSavedQuery(scholarshipId, {
    skip: !isAuthenticated,
  })
  const [save, { isLoading: saving }] = useSaveScholarshipMutation()
  const [unsave, { isLoading: unsaving }] = useUnsaveScholarshipMutation()

  const saved = data?.saved ?? false
  const busy = saving || unsaving || isLoading

  const sizeClass =
    size === 'sm' ? 'p-1.5' : 'rounded-lg p-2 ring-1 ring-slate-200'

  if (!hydrated) {
    return null
  }

  if (!isAuthenticated) {
    const returnUrl = encodeURIComponent(location.pathname + location.search)
    return (
      <Link
        to={`/auth/login?returnUrl=${returnUrl}`}
        className={cn(
          'inline-flex items-center justify-center bg-white/95 text-slate-500 shadow-sm backdrop-blur-sm hover:text-[var(--color-primary)]',
          sizeClass,
          className,
        )}
        title="Sign in to save"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <Bookmark className="h-4 w-4" aria-hidden />
      </Link>
    )
  }

  return (
    <button
      type="button"
      disabled={busy}
      title={saved ? 'Remove from saved' : 'Save scholarship'}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (saved) {
          void unsave(scholarshipId)
        } else {
          void save(scholarshipId)
        }
      }}
      className={cn(
        'inline-flex items-center justify-center transition-colors',
        saved
          ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)] ring-blue-200'
          : 'bg-white/95 text-slate-500 hover:text-[var(--color-primary)]',
        sizeClass,
        className,
      )}
    >
      <Bookmark
        className={cn('h-4 w-4', saved && 'fill-current')}
        aria-hidden
      />
    </button>
  )
}
