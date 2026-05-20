type Attribution = {
  source: string
  medium: string
  campaign: string
  referrer: string
  capturedAt: string
}

const STORAGE_KEY = 'afscholarships.analytics.attribution'

export function initAttribution() {
  const existing = getAttribution()
  if (existing) return existing

  const params = new URLSearchParams(window.location.search)
  const attribution: Attribution = {
    source: params.get('utm_source') ?? 'direct',
    medium: params.get('utm_medium') ?? 'none',
    campaign: params.get('utm_campaign') ?? 'unknown',
    referrer: document.referrer || 'none',
    capturedAt: new Date().toISOString(),
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(attribution))
  return attribution
}

export function getAttribution(): Attribution | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null
  return JSON.parse(raw) as Attribution
}
