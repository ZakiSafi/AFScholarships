import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  hover?: boolean
}

export function Card({ children, className, hover = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-card',
        hover && 'transition-shadow hover:shadow-soft',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
