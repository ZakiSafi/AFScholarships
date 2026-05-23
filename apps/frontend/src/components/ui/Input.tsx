import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  className?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] transition-colors focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-emerald-100',
          className,
        )}
        {...props}
      />
    )
  },
)
