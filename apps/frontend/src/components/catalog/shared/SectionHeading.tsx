type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  id?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-2 text-base leading-relaxed text-slate-600">{description}</p>
      ) : null}
    </div>
  )
}
