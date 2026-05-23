import type { TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  className?: string
}

export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        'w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-[var(--color-text)] focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-blue-100',
        className,
      )}
      {...props}
    />
  )
}
