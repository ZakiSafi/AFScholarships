import {
  destinationGradients,
  destinationImages,
} from '../data/landing-images'

const countryToDestinationId: Record<string, string> = {
  Germany: 'germany',
  Turkey: 'turkiye',
  Türkiye: 'turkiye',
  Japan: 'japan',
  Qatar: 'qatar',
  'United Kingdom': 'uk',
  'United States': 'us',
  Canada: 'canada',
  Australia: 'australia',
  Global: 'us',
  'European Union': 'uk',
}

export function getCountryVisual(hostCountry: string) {
  const id =
    countryToDestinationId[hostCountry] ??
    hostCountry.toLowerCase().replace(/\s+/g, '-').slice(0, 24)

  return {
    id,
    image: destinationImages[id],
    gradient: destinationGradients[id] ?? 'from-slate-800 to-blue-950',
  }
}
