/**
 * Non-auth API endpoints (scholarships, saved, etc.).
 * Will move to feature modules in later Phase D slices.
 */
import { baseApi } from './baseApi'

type Scholarship = {
  id: string
  slug: string
  title: string
  summary: string
  description: string
  provider: string
  hostCountry: string
  degreeLevel: string
  fundingType: string
  languageRequirement?: string
  fieldOfStudy: string[]
  eligibleCountries: string[]
  isPartnerApplication: boolean
  applicationUrl?: string
  deadlineAt: string
  verificationStatus: 'VERIFIED' | 'UNVERIFIED' | 'FLAGGED_STALE'
  isFeatured: boolean
  status?: string
}

type ScholarshipsResponse = {
  items: Scholarship[]
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage?: boolean
  hasPreviousPage?: boolean
}

type ScholarshipDetails = Scholarship & {
  steps: Array<{
    id: string
    orderIndex: number
    title: string
    description: string
    isRequired: boolean
  }>
  requirements?: unknown[]
  benefits?: unknown[]
  faqs?: unknown[]
  sources?: unknown[]
}

type ListScholarshipsQuery = {
  search?: string
  country?: string
  degreeLevel?: string
  fundingType?: string
  eligibleCountry?: string
  partnerOnly?: boolean
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: string
  includeFacets?: boolean
}

export const catalogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listScholarships: builder.query<ScholarshipsResponse, ListScholarshipsQuery>({
      query: (params) => ({
        url: '/scholarships',
        params,
      }),
      providesTags: ['Scholarships'],
    }),
    scholarshipDetails: builder.query<ScholarshipDetails, string>({
      query: (slug) => `/scholarships/${slug}`,
      providesTags: (_result, _err, slug) => [
        { type: 'ScholarshipDetails', id: slug },
      ],
    }),
  }),
})

export const { useListScholarshipsQuery, useScholarshipDetailsQuery } = catalogApi
