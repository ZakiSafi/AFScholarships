import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  hover?: boolean
  lift?: boolean
  gradient?: boolean
}

export function Card({
  children,
  className,
  hover = false,
  lift = false,
  gradient = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-card',
        gradient &&
          'bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-primary-soft)]',
        hover && 'transition-shadow duration-300 hover:shadow-elevated',
        lift && 'card-hover-lift',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
