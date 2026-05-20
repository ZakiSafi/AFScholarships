import { getAttribution } from './attribution'

export type AnalyticsEventName =
  | 'login_success'
  | 'scholarship_filter_applied'
  | 'scholarship_opened'
  | 'scholarship_saved'
  | 'scholarship_unsaved'
  | 'external_apply_clicked'
  | 'partner_application_submitted'
  | 'reminder_created'
  | 'listing_reported'
  | 'admin_report_resolved'

type AnalyticsEvent = {
  name: AnalyticsEventName
  payload?: Record<string, unknown>
  timestamp: string
}

const STORAGE_KEY = 'afscholarships.analytics.queue'

export function trackEvent(
  name: AnalyticsEventName,
  payload?: Record<string, unknown>,
) {
  const event: AnalyticsEvent = {
    name,
    payload: {
      ...payload,
      attribution: getAttribution(),
    },
    timestamp: new Date().toISOString(),
  }

  const existing = localStorage.getItem(STORAGE_KEY)
  const queue: AnalyticsEvent[] = existing ? JSON.parse(existing) : []
  queue.push(event)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(queue.slice(-200)))
}
