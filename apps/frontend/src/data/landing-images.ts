/**
 * Images in /public/images. Prefer .jpg; .svg used as fallback in BrandImage onError.
 */
export const heroBackgroundImage = {
  src: '/images/hero/campus.jpg',
  alt: 'Diverse students celebrating graduation',
} as const

export const destinationImages: Record<string, { src: string; alt: string }> = {
  germany: {
    src: '/images/destinations/germany.jpg',
    alt: 'Germany — study destination',
  },
  turkiye: {
    src: '/images/destinations/turkiye.jpg',
    alt: 'Türkiye — study destination',
  },
  japan: {
    src: '/images/destinations/japan.jpg',
    alt: 'Japan — study destination',
  },
  qatar: {
    src: '/images/destinations/qatar.jpg',
    alt: 'Qatar — study destination',
  },
  uk: {
    src: '/images/destinations/uk.jpg',
    alt: 'United Kingdom — study destination',
  },
  us: {
    src: '/images/destinations/us.jpg',
    alt: 'United States — study destination',
  },
  canada: {
    src: '/images/destinations/canada.jpg',
    alt: 'Canada — study destination',
  },
  australia: {
    src: '/images/destinations/australia.jpg',
    alt: 'Australia — study destination',
  },
}

export const guideImages: Record<string, { src: string; alt: string }> = {
  'motivation-letter': {
    src: '/images/guides/motivation-letter.svg',
    alt: 'Writing a motivation letter',
  },
  'no-ielts': {
    src: '/images/guides/no-ielts.svg',
    alt: 'Studying in a library',
  },
  documents: {
    src: '/images/guides/documents.svg',
    alt: 'Scholarship documents',
  },
}

export const destinationGradients: Record<string, string> = {
  germany: 'from-slate-700 to-blue-900',
  turkiye: 'from-red-900 to-blue-900',
  japan: 'from-rose-900 to-slate-900',
  qatar: 'from-amber-900 to-slate-900',
  uk: 'from-slate-800 to-indigo-950',
  us: 'from-blue-900 to-slate-900',
  canada: 'from-red-900 to-slate-900',
  australia: 'from-sky-800 to-teal-900',
}

export const guideGradients: Record<string, string> = {
  'motivation-letter': 'from-blue-800 to-slate-900',
  'no-ielts': 'from-teal-800 to-slate-900',
  documents: 'from-amber-800 to-slate-900',
}

export const heroFallbackGradient = 'from-blue-900 to-slate-800'
