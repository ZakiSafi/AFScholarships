import { useState } from 'react'
import { cn } from '../../lib/cn'

type BrandImageProps = {
  src: string
  alt: string
  className?: string
  imageClassName?: string
  overlayClassName?: string
  fallbackGradient?: string
  loading?: 'lazy' | 'eager'
}

export function BrandImage({
  src,
  alt,
  className,
  imageClassName,
  overlayClassName = 'bg-gradient-to-t from-slate-900/65 via-slate-900/10 to-transparent',
  fallbackGradient = 'from-blue-800 via-blue-700 to-slate-700',
  loading = 'lazy',
}: BrandImageProps) {
  const [failed, setFailed] = useState(false)

  return (
    <div className={cn('relative overflow-hidden bg-slate-200', className)}>
      {failed ? (
        <div
          className={cn('absolute inset-0 bg-gradient-to-br', fallbackGradient)}
          aria-hidden
        />
      ) : (
        <img
          src={src}
          alt={alt}
          loading={loading}
          decoding="async"
          onError={() => setFailed(true)}
          className={cn('h-full w-full object-cover', imageClassName)}
        />
      )}
      <div
        className={cn('pointer-events-none absolute inset-0', overlayClassName)}
        aria-hidden
      />
    </div>
  )
}
