import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { popularDestinations } from '../../data/landing'
import {
  destinationGradients,
  destinationImages,
} from '../../data/landing-images'
import { BrandImage } from '../ui/BrandImage'

export function PopularDestinationsSection() {
  return (
    <section
      className="bg-white py-16 sm:py-20"
      aria-labelledby="destinations-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2
            id="destinations-heading"
            className="text-2xl font-bold text-slate-900 sm:text-3xl"
          >
            Where could you study next?
          </h2>
          <p className="mt-2 text-base leading-relaxed text-slate-600">
            Browse verified scholarships in destinations Afghan students choose
            most.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {popularDestinations.map((destination) => {
            const image = destinationImages[destination.id]
            const gradient =
              destinationGradients[destination.id] ?? 'from-blue-800 to-slate-900'

            return (
              <Link
                key={destination.id}
                to={destination.href}
                className="group overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative">
                  <BrandImage
                    src={image?.src ?? ''}
                    alt={image?.alt ?? destination.name}
                    className="aspect-[4/3] w-full"
                    fallbackGradient={gradient}
                    overlayClassName="bg-gradient-to-t from-slate-900/50 via-transparent to-transparent"
                  />
                  <span className="absolute bottom-3 left-3 rounded-md bg-white/95 px-2.5 py-1 text-sm font-bold text-slate-900 shadow-sm">
                    {destination.name}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-sm text-slate-600">
                    {destination.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-[var(--color-primary)]">
                    Explore scholarships
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
