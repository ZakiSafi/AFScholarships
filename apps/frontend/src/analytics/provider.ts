import type { AnalyticsEventName } from './track'

export type AnalyticsProviderName = 'none' | 'console' | 'ga4' | 'posthog'

type ProviderEvent = {
  name: AnalyticsEventName
  payload?: Record<string, unknown>
  timestamp: string
}

type PostHogClient = {
  init: (key: string, options: Record<string, unknown>) => void
  capture: (event: string, properties?: Record<string, unknown>) => void
  identify: (distinctId: string, properties?: Record<string, unknown>) => void
  reset: () => void
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

let activeProvider: AnalyticsProviderName = 'none'
let initialized = false
let posthog: PostHogClient | null = null

function readProvider(): AnalyticsProviderName {
  const value = import.meta.env.VITE_ANALYTICS_PROVIDER?.toLowerCase()
  if (value === 'ga4' || value === 'posthog' || value === 'console' || value === 'none') {
    return value
  }
  return import.meta.env.DEV ? 'console' : 'none'
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`)
    if (existing) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.async = true
    script.src = src
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load ${src}`))
    document.head.appendChild(script)
  })
}

async function loadPosthogClient(): Promise<PostHogClient> {
  const mod = await import('posthog-js')
  return mod.default as PostHogClient
}

async function initGa4(): Promise<void> {
  const measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID
  if (!measurementId) {
    console.warn('[analytics] VITE_GA4_MEASUREMENT_ID is not set; GA4 disabled.')
    activeProvider = 'console'
    return
  }

  window.dataLayer = window.dataLayer ?? []
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args)
  }
  window.gtag('js', new Date())
  window.gtag('config', measurementId, { send_page_view: true })

  await loadScript(
    `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`,
  )
}

async function initPosthog(): Promise<void> {
  const apiKey = import.meta.env.VITE_POSTHOG_KEY
  const host = import.meta.env.VITE_POSTHOG_HOST ?? 'https://us.i.posthog.com'
  if (!apiKey) {
    console.warn('[analytics] VITE_POSTHOG_KEY is not set; PostHog disabled.')
    activeProvider = 'console'
    return
  }

  posthog = await loadPosthogClient()
  posthog.init(apiKey, {
    api_host: host,
    capture_pageview: true,
    persistence: 'localStorage',
  })
}

export async function initAnalyticsProvider(): Promise<void> {
  if (initialized || typeof window === 'undefined') {
    return
  }
  initialized = true
  activeProvider = readProvider()

  try {
    if (activeProvider === 'ga4') {
      await initGa4()
    } else if (activeProvider === 'posthog') {
      await initPosthog()
    }
  } catch (error) {
    console.warn('[analytics] Provider init failed:', error)
    activeProvider = 'console'
    posthog = null
  }
}

export function getAnalyticsProvider(): AnalyticsProviderName {
  return activeProvider
}

export function identifyAnalyticsUser(
  userId: string,
  traits?: Record<string, unknown>,
): void {
  if (activeProvider === 'posthog' && posthog) {
    posthog.identify(userId, traits)
  }
  if (activeProvider === 'ga4' && window.gtag) {
    window.gtag('set', 'user_properties', { user_id: userId, ...traits })
  }
}

export function resetAnalyticsUser(): void {
  if (activeProvider === 'posthog' && posthog) {
    posthog.reset()
  }
}

export function sendToAnalyticsProvider(event: ProviderEvent): void {
  const { name, payload, timestamp } = event

  switch (activeProvider) {
    case 'ga4':
      window.gtag?.('event', name, { ...payload, event_time: timestamp })
      break
    case 'posthog':
      posthog?.capture(name, { ...payload, event_time: timestamp })
      break
    case 'console':
      if (import.meta.env.DEV) {
        console.debug('[analytics]', name, payload)
      }
      break
    case 'none':
    default:
      break
  }
}
