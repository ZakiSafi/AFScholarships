export type DegreeLevel = 'BACHELOR' | 'MASTER' | 'PHD' | 'SHORT_COURSE'

export type FundingType = 'FULL' | 'PARTIAL' | 'TUITION_ONLY' | 'STIPEND_ONLY'

export type VerificationStatus = 'VERIFIED' | 'UNVERIFIED' | 'FLAGGED_STALE'

export type ScholarshipTagLink = {
  tag: {
    slug: string
    name: string
  }
}

export type ScholarshipListItem = {
  id: string
  slug: string
  title: string
  summary: string
  description?: string
  provider: string
  hostCountry: string
  degreeLevel: DegreeLevel
  fundingType: FundingType
  languageRequirement?: string | null
  fieldOfStudy: string[]
  eligibleCountries: string[]
  isPartnerApplication: boolean
  applicationUrl?: string | null
  deadlineAt: string
  verificationStatus: VerificationStatus
  isFeatured: boolean
  tags?: ScholarshipTagLink[]
}

export type ScholarshipStep = {
  id: string
  orderIndex: number
  title: string
  description: string
  isRequired: boolean
}

export type ScholarshipRequirement = {
  id: string
  orderIndex: number
  label: string
  description: string
  isMandatory: boolean
}

export type ScholarshipBenefit = {
  id: string
  orderIndex: number
  title: string
  description: string
}

export type ScholarshipFaq = {
  id: string
  orderIndex: number
  question: string
  answer: string
}

export type ScholarshipSource = {
  id: string
  url: string
  label: string
  lastCheckedAt?: string | null
}

export type ScholarshipDetail = ScholarshipListItem & {
  description: string
  steps: ScholarshipStep[]
  requirements: ScholarshipRequirement[]
  benefits: ScholarshipBenefit[]
  faqs: ScholarshipFaq[]
  sources: ScholarshipSource[]
}

export type FacetCount = { value: string; count: number }

export type ScholarshipFacets = {
  countries: FacetCount[]
  degreeLevels: FacetCount[]
  fundingTypes: FacetCount[]
  verificationStatuses: FacetCount[]
  partnerApplication: { inPlatform: number; external: number }
  fieldsOfStudy: FacetCount[]
  tags: Array<{ slug: string; name: string; count: number }>
  total: number
}

export type ScholarshipsListResponse = {
  items: ScholarshipListItem[]
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  facets?: ScholarshipFacets
}

export type RelatedScholarshipsResponse = {
  items: ScholarshipListItem[]
  total: number
}

export type ListScholarshipsParams = {
  search?: string
  country?: string
  degreeLevel?: DegreeLevel
  fundingType?: FundingType
  eligibleCountry?: string
  fieldOfStudy?: string
  tag?: string
  partnerOnly?: boolean
  verificationStatus?: VerificationStatus
  page?: number
  limit?: number
  sortBy?: 'deadline' | 'title' | 'created' | 'featured'
  sortOrder?: 'asc' | 'desc'
  includeFacets?: boolean
}
