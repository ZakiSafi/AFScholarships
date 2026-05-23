import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type BadgeVariant = 'default' | 'verified' | 'accent' | 'muted' | 'category'

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]',
  verified:
    'bg-[var(--color-primary-soft)] text-[var(--color-primary-dark)] ring-1 ring-[var(--color-border)]',
  accent: 'bg-[var(--color-accent-soft)] text-amber-800',
  muted: 'bg-[var(--color-surface-soft)] text-[var(--color-muted)]',
  category: 'bg-[var(--color-secondary-soft)] text-sky-800',
}

type BadgeProps = {
  children: ReactNode
  variant?: BadgeVariant
  className?: string
}

export function Badge({
  children,
  variant = 'default',
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
