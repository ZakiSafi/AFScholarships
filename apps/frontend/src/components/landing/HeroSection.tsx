import { Bell, Bookmark, CheckCircle2, MapPin, Calendar } from 'lucide-react'
import { heroPreviewScholarship } from '../../data/landing'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'

export function HeroSection() {
  return (
    <section className="hero-gradient relative overflow-hidden">
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-blue-200/25 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <Badge variant="accent" className="mb-6">
            Free at launch · Verified listings
          </Badge>

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-[var(--color-text)] sm:text-5xl lg:text-[3.25rem]">
            Find verified scholarships made easier for Afghan students
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--color-muted)]">
            Discover global scholarships, track deadlines, save opportunities,
            and prepare your application with confidence.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" to="/scholarships">
              Explore Scholarships
            </Button>
            <Button variant="outline" size="lg" to="/guides">
              View Guides
            </Button>
          </div>
        </div>

        <div className="lg:pl-4">
          <Card className="relative overflow-hidden p-0 shadow-soft">
            <div className="border-b border-[var(--color-border)] bg-gradient-to-r from-emerald-50 to-blue-50 px-6 py-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">
                Featured opportunity
              </p>
            </div>

            <div className="p-6 sm:p-7">
              <div className="flex items-start justify-between gap-3">
                <Badge variant="verified">
                  <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                  Verified
                </Badge>
                <div className="flex gap-2">
                  <span
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-slate-50 px-3 py-1.5 text-xs font-medium text-[var(--color-muted)]"
                    aria-hidden
                  >
                    <Bookmark className="h-3.5 w-3.5 text-[var(--color-primary)]" />
                    Saved
                  </span>
                  <span
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--color-border)] bg-slate-50 px-3 py-1.5 text-xs font-medium text-[var(--color-muted)]"
                    aria-hidden
                  >
                    <Bell className="h-3.5 w-3.5 text-[var(--color-accent)]" />
                    Reminder on
                  </span>
                </div>
              </div>

              <h2 className="mt-4 text-xl font-bold text-[var(--color-text)]">
                {heroPreviewScholarship.title}
              </h2>

              <ul className="mt-4 space-y-2.5">
                <li className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                  <MapPin
                    className="h-4 w-4 shrink-0 text-[var(--color-primary)]"
                    aria-hidden
                  />
                  <span>
                    Host country:{' '}
                    <strong className="font-medium text-[var(--color-text)]">
                      {heroPreviewScholarship.hostCountry}
                    </strong>
                  </span>
                </li>
                <li className="flex items-center gap-2 text-sm text-[var(--color-muted)]">
                  <Calendar
                    className="h-4 w-4 shrink-0 text-[var(--color-accent)]"
                    aria-hidden
                  />
                  <span>
                    Deadline:{' '}
                    <strong className="font-medium text-[var(--color-text)]">
                      {heroPreviewScholarship.deadline}
                    </strong>
                  </span>
                </li>
              </ul>

              <div className="mt-6 flex gap-2">
                <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
                  Fully funded
                </span>
                <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-800">
                  Master
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
