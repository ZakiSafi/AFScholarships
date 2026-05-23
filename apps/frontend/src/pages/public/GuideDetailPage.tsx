import { Link, useParams } from 'react-router-dom'
import { getGuideBySlug } from '../../data/guides-content'
import { Button } from '../../components/ui/Button'

export function GuideDetailPage() {
  const { slug = '' } = useParams()
  const guide = getGuideBySlug(slug)

  if (!guide) {
    return (
      <main className="catalog-mesh flex-1">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Guide not found</h1>
          <Button to="/guides" className="mt-6">
            All guides
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="catalog-mesh flex-1">
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:py-16">
        <Link
          to="/guides"
          className="text-sm font-semibold text-[var(--color-primary)] hover:underline"
        >
          ← All guides
        </Link>
        <p className="mt-6 text-xs font-bold uppercase tracking-wide text-[var(--color-primary)]">
          {guide.category} · {guide.readTime}
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900">{guide.title}</h1>
        <p className="mt-4 text-lg text-slate-600">{guide.description}</p>

        <div className="prose prose-slate mt-10 max-w-none space-y-8">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-bold text-slate-900">{section.heading}</h2>
              <p className="mt-3 leading-relaxed text-slate-700">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-[var(--color-primary-soft)] p-6">
          <p className="font-semibold text-slate-900">Ready to find programs?</p>
          <p className="mt-2 text-sm text-slate-600">
            Browse verified scholarships and save the ones that match your goals.
          </p>
          <Button to="/scholarships" className="mt-4">
            Explore scholarships
          </Button>
        </div>
      </article>
    </main>
  )
}
