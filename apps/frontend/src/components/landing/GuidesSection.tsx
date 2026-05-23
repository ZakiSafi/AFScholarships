import { ArrowRight, Clock } from 'lucide-react'
import { guides } from '../../data/landing'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

export function GuidesSection() {
  return (
    <section
      className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
      aria-labelledby="guides-heading"
    >
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2
            id="guides-heading"
            className="text-2xl font-bold text-[var(--color-text)] sm:text-3xl"
          >
            Application guides
          </h2>
          <p className="mt-2 max-w-2xl text-[var(--color-muted)]">
            Practical resources to strengthen your scholarship applications.
          </p>
        </div>
        <Button variant="outline" to="/guides">
          All guides
        </Button>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {guides.map((guide) => (
          <Card key={guide.id} hover className="flex flex-col">
            <p className="flex items-center gap-1.5 text-xs font-medium text-[var(--color-muted)]">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {guide.readTime}
            </p>
            <h3 className="mt-3 text-lg font-bold text-[var(--color-text)]">
              {guide.title}
            </h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-muted)]">
              {guide.description}
            </p>
            <Button
              variant="ghost"
              to="/guides"
              className="mt-4 justify-start px-0 hover:bg-transparent"
            >
              Read guide
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </Card>
        ))}
      </div>
    </section>
  )
}
