export type GrowthExperiment = {
  id: string
  name: string
  hypothesis: string
  primaryMetric: string
  window: string
}

export const growthExperiments: GrowthExperiment[] = [
  {
    id: 'seo-topic-clusters',
    name: 'SEO topic clusters for scholarship intent keywords',
    hypothesis:
      'Weekly landing pages for high-intent scholarship queries will increase organic signups by at least 20% in 30 days.',
    primaryMetric: 'Organic signup conversion rate',
    window: 'Weeks 1-4',
  },
  {
    id: 'deadline-alert-social',
    name: 'Deadline alert social campaign',
    hypothesis:
      'Short-form deadline posts on Facebook/Instagram/Telegram will increase returning weekly users by at least 15%.',
    primaryMetric: 'Weekly returning users',
    window: 'Weeks 3-8',
  },
  {
    id: 'campus-ngo-partnerships',
    name: 'Campus and NGO partnership onboarding',
    hypothesis:
      'Partnership referral traffic will deliver higher activation than general social traffic.',
    primaryMetric: 'Activation rate (save at least 1 scholarship)',
    window: 'Weeks 5-12',
  },
]
