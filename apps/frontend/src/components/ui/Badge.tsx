import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type BadgeVariant = 'default' | 'verified' | 'accent' | 'muted'

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-emerald-50 text-[var(--color-primary)]',
  verified: 'bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200',
  accent: 'bg-amber-50 text-amber-800',
  muted: 'bg-slate-100 text-[var(--color-muted)]',
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
