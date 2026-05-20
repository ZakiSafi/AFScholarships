import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from '../store'

type LoginPayload = {
  email: string
  password: string
}

type LoginResponse = {
  access_token: string
}

type ProfileResponse = {
  userId: string
  email: string
  role: 'USER' | 'ADMIN'
}

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
}

type ScholarshipsResponse = {
  items: Scholarship[]
  page: number
  limit: number
  total: number
  totalPages: number
}

type ScholarshipDetails = Scholarship & {
  steps: Array<{
    id: string
    orderIndex: number
    title: string
    description: string
    isRequired: boolean
  }>
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
}

type SavedScholarshipResponse = {
  userId: string
  scholarshipId: string
  createdAt: string
  scholarship: Scholarship
}

type PartnerApplicationPayload = {
  fullName: string
  email: string
  country?: string
  educationLevel?: string
  statement: string
  docsUrls?: string[]
}

type ReminderPayload = {
  reminderAt: string
}

type ReportPayload = {
  reason: string
  details?: string
}

type AdminReport = {
  id: string
  reason: string
  details?: string
  status: 'OPEN' | 'RESOLVED' | 'DISMISSED'
  scholarship: Scholarship
  createdAt: string
}

type PartnerApplication = {
  id: string
  fullName: string
  email: string
  status: 'SUBMITTED' | 'UNDER_REVIEW' | 'ACCEPTED' | 'REJECTED'
  createdAt: string
  scholarship: Scholarship
}

type UserReminder = {
  id: string
  reminderAt: string
  status: 'PENDING' | 'SENT' | 'FAILED'
  scholarship: Scholarship
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL ?? 'http://localhost:3001'}`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
      }),
    }),
    getProfile: builder.query<ProfileResponse, void>({
      query: () => '/auth/profile',
    }),
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
    saveScholarship: builder.mutation<
      unknown,
      {
        scholarshipId: string
      }
    >({
      query: ({ scholarshipId }) => ({
        url: `/saved-items/${scholarshipId}`,
        method: 'POST',
      }),
      invalidatesTags: ['SavedItems'],
    }),
    removeSavedScholarship: builder.mutation<
      unknown,
      {
        scholarshipId: string
      }
    >({
      query: ({ scholarshipId }) => ({
        url: `/saved-items/${scholarshipId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['SavedItems'],
    }),
    listSavedScholarships: builder.query<SavedScholarshipResponse[], void>({
      query: () => '/saved-items',
      providesTags: ['SavedItems'],
    }),
    applyToPartnerScholarship: builder.mutation<
      unknown,
      { scholarshipId: string; payload: PartnerApplicationPayload }
    >({
      query: ({ scholarshipId, payload }) => ({
        url: `/applications/partner/${scholarshipId}`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Applications'],
    }),
    myApplications: builder.query<PartnerApplication[], void>({
      query: () => '/applications/me',
      providesTags: ['Applications'],
    }),
    createReminder: builder.mutation<
      unknown,
      { scholarshipId: string; payload: ReminderPayload }
    >({
      query: ({ scholarshipId, payload }) => ({
        url: `/reminders/scholarship/${scholarshipId}`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Reminders'],
    }),
    myReminders: builder.query<UserReminder[], void>({
      query: () => '/reminders/me',
      providesTags: ['Reminders'],
    }),
    reportListing: builder.mutation<
      unknown,
      { scholarshipId: string; payload: ReportPayload }
    >({
      query: ({ scholarshipId, payload }) => ({
        url: `/scholarships/${scholarshipId}/report`,
        method: 'POST',
        body: payload,
      }),
    }),
    adminReports: builder.query<AdminReport[], void>({
      query: () => '/admin/reports',
      providesTags: ['AdminReports'],
    }),
    verifyScholarship: builder.mutation<
      unknown,
      { scholarshipId: string; status: 'VERIFIED' | 'UNVERIFIED' | 'FLAGGED_STALE' }
    >({
      query: ({ scholarshipId, status }) => ({
        url: `/scholarships/${scholarshipId}/verify`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['Scholarships', 'AdminReports'],
    }),
    resolveReport: builder.mutation<
      unknown,
      { reportId: string; status: 'RESOLVED' | 'DISMISSED' }
    >({
      query: ({ reportId, status }) => ({
        url: `/admin/reports/${reportId}/resolve`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: ['AdminReports'],
    }),
  }),
  tagTypes: [
    'Scholarships',
    'ScholarshipDetails',
    'SavedItems',
    'Applications',
    'Reminders',
    'AdminReports',
  ],
})

export const {
  useLoginMutation,
  useGetProfileQuery,
  useListScholarshipsQuery,
  useScholarshipDetailsQuery,
  useSaveScholarshipMutation,
  useRemoveSavedScholarshipMutation,
  useListSavedScholarshipsQuery,
  useApplyToPartnerScholarshipMutation,
  useMyApplicationsQuery,
  useCreateReminderMutation,
  useMyRemindersQuery,
  useReportListingMutation,
  useAdminReportsQuery,
  useVerifyScholarshipMutation,
  useResolveReportMutation,
} = authApi
