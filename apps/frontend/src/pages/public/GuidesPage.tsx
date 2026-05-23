import { Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { guideArticles } from '../../data/guides-content'
import { guideGradients, guideImages } from '../../data/landing-images'
import { Badge } from '../../components/ui/Badge'
import { BrandImage } from '../../components/ui/BrandImage'

export function GuidesPage() {
  return (
    <main className="catalog-mesh flex-1">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
          Resources
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
          Application guides
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Practical guides for Afghan students applying to international scholarships—written
          for real deadlines and document requirements.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {guideArticles.map((guide) => {
            const image = guideImages[guide.slug]
            const gradient = guideGradients[guide.slug] ?? 'from-blue-800 to-slate-900'

            return (
              <article
                key={guide.slug}
                className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card"
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
                  <h2 className="mt-4 text-lg font-bold leading-snug text-slate-900">
                    <Link
                      to={`/guides/${guide.slug}`}
                      className="hover:text-[var(--color-primary)]"
                    >
                      {guide.title}
                    </Link>
                  </h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                    {guide.description}
                  </p>
                  <p className="mt-4 flex items-center gap-1.5 text-sm text-slate-500">
                    <Clock className="h-4 w-4" aria-hidden />
                    {guide.readTime}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </main>
  )
}
