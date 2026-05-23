import { ArrowRight, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { guideArticles } from '../../data/guides-content'
import { guideGradients, guideImages } from '../../data/landing-images'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { BrandImage } from '../ui/BrandImage'

export function GuidesSection() {
  return (
    <section
      className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8"
      aria-labelledby="guides-heading"
    >
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-[var(--color-primary)]">
            Student resources
          </p>
          <h2
            id="guides-heading"
            className="mt-2 text-2xl font-bold text-[var(--color-text)] sm:text-3xl"
          >
            Guides to strengthen your application
          </h2>
          <p className="text-section-desc mt-3 max-w-2xl">
            Step-by-step help for motivation letters, documents, and eligibility—written
            for real scholarship journeys.
          </p>
        </div>
        <Button variant="outline" to="/guides">
          All guides
        </Button>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {guideArticles.map((guide) => {
          const image = guideImages[guide.slug]
          const gradient =
            guideGradients[guide.slug] ?? 'from-blue-800 to-slate-900'

          return (
            <article
              key={guide.slug}
              className="card-hover-lift flex flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-card"
            >
              <Link to={`/guides/${guide.slug}`} className="block">
                <BrandImage
                  src={image?.src ?? ''}
                  alt={image?.alt ?? guide.title}
                  className="aspect-[16/9] w-full"
                  fallbackGradient={gradient}
                  overlayClassName="bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <Badge variant="category">{guide.category}</Badge>
                <h3 className="mt-4 text-lg font-bold leading-snug text-[var(--color-text)]">
                  <Link
                    to={`/guides/${guide.slug}`}
                    className="hover:text-[var(--color-primary)]"
                  >
                    {guide.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-sm font-normal leading-relaxed text-[var(--color-muted)]">
                  {guide.description}
                </p>
                <p className="mt-4 flex items-center gap-1.5 text-sm font-medium text-[var(--color-subtle)]">
                  <Clock className="h-4 w-4" aria-hidden />
                  {guide.readTime}
                </p>
                <Button
                  variant="ghost"
                  to={`/guides/${guide.slug}`}
                  className="mt-3 justify-start px-0 font-bold text-[var(--color-primary)] hover:bg-transparent"
                >
                  Read guide
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
