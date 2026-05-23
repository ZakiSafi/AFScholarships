import { heroBackgroundImage } from '../../data/landing-images'
import { HeroScholarshipCard } from './HeroScholarshipCard'

export function HeroVisual() {
  return (
    <div className="relative min-h-[16rem] sm:min-h-[20rem] lg:min-h-full">
      <img
        src={heroBackgroundImage.src}
        alt={heroBackgroundImage.alt}
        className="absolute inset-0 h-full w-full object-cover object-center saturate-[1.05]"
        loading="eager"
        decoding="async"
      />

      {/* Soft blend into white column — narrow, does not wash out the whole photo */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-28 bg-gradient-to-r from-white to-transparent lg:block xl:w-40"
        aria-hidden
      />

      {/* Bottom scrim only — for card readability */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-2/5 bg-gradient-to-t from-slate-900/55 to-transparent"
        aria-hidden
      />

      {/* Very light blue tint for brand cohesion */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-blue-900/10"
        aria-hidden
      />

      <div className="absolute inset-x-4 bottom-5 z-10 sm:inset-x-8 sm:bottom-8 lg:inset-x-auto lg:-left-14 lg:bottom-12 lg:right-10 lg:max-w-sm xl:-left-20 xl:max-w-md">
        <HeroScholarshipCard />
      </div>
    </div>
  )
}
