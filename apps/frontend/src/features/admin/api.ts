import { baseApi } from '../../services/baseApi'
import type { ApplicationStatus } from '../applications/types'
import type { PartnerApplication } from '../applications/types'
import type { ScholarshipDetail } from '../scholarships/types'
import type { VerificationStatus } from '../scholarships/types'
import type {
  AdminApplicationQueueItem,
  AdminJobName,
  AdminListScholarshipsParams,
  AdminScholarshipsListResponse,
  AuditLogsResponse,
  BulkArchiveResult,
  BulkVerifyPayload,
  BulkVerifyResult,
  ListingReport,
  ListAuditLogsParams,
  ReportStatus,
  RunJobResult,
} from './types'

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listAdminScholarships: builder.query<
      AdminScholarshipsListResponse,
      AdminListScholarshipsParams
    >({
      query: (params) => ({
        url: '/scholarships/admin/list',
        params: {
          ...params,
          partnerOnly: params.partnerOnly ? 'true' : undefined,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({
                type: 'Scholarships' as const,
                id,
              })),
              { type: 'Scholarships', id: 'ADMIN_LIST' },
            ]
          : [{ type: 'Scholarships', id: 'ADMIN_LIST' }],
    }),
    publishScholarship: builder.mutation<ScholarshipDetail, string>({
      query: (id) => ({
        url: `/scholarships/${id}/publish`,
        method: 'PATCH',
      }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Scholarships', id },
        { type: 'Scholarships', id: 'ADMIN_LIST' },
        { type: 'Scholarships', id: 'LIST' },
      ],
    }),
    archiveScholarship: builder.mutation<ScholarshipDetail, string>({
      query: (id) => ({
        url: `/scholarships/${id}/archive`,
        method: 'PATCH',
      }),
      invalidatesTags: (_r, _e, id) => [
        { type: 'Scholarships', id },
        { type: 'Scholarships', id: 'ADMIN_LIST' },
        { type: 'Scholarships', id: 'LIST' },
      ],
    }),
    verifyScholarship: builder.mutation<
      ScholarshipDetail,
      { id: string; status: VerificationStatus }
    >({
      query: ({ id, status }) => ({
        url: `/scholarships/${id}/verify`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'Scholarships', id },
        { type: 'Scholarships', id: 'ADMIN_LIST' },
        { type: 'Scholarships', id: 'LIST' },
      ],
    }),
    bulkVerifyScholarships: builder.mutation<BulkVerifyResult, BulkVerifyPayload>({
      query: (body) => ({
        url: '/admin/scholarships/bulk-verify',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: [
        { type: 'Scholarships', id: 'ADMIN_LIST' },
        { type: 'Scholarships', id: 'LIST' },
      ],
    }),
    bulkArchiveExpired: builder.mutation<
      BulkArchiveResult,
      { dryRun?: boolean } | void
    >({
      query: (body) => ({
        url: '/admin/scholarships/bulk-archive-expired',
        method: 'PATCH',
        body: body ?? {},
      }),
      invalidatesTags: [
        { type: 'Scholarships', id: 'ADMIN_LIST' },
        { type: 'Scholarships', id: 'LIST' },
      ],
    }),
    flagStaleScholarships: builder.mutation<RunJobResult, void>({
      query: () => ({
        url: '/admin/scholarships/flag-stale',
        method: 'PATCH',
      }),
      invalidatesTags: [
        { type: 'Scholarships', id: 'ADMIN_LIST' },
        { type: 'Scholarships', id: 'LIST' },
      ],
    }),
    listReports: builder.query<ListingReport[], ReportStatus | void>({
      query: (status) => ({
        url: '/admin/reports',
        params: status ? { status } : undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'AdminReports' as const,
                id,
              })),
              { type: 'AdminReports', id: 'LIST' },
            ]
          : [{ type: 'AdminReports', id: 'LIST' }],
    }),
    resolveReport: builder.mutation<
      ListingReport,
      { id: string; status: Exclude<ReportStatus, 'OPEN'> }
    >({
      query: ({ id, status }) => ({
        url: `/admin/reports/${id}/resolve`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'AdminReports', id },
        { type: 'AdminReports', id: 'LIST' },
        { type: 'AdminAudit', id: 'LIST' },
      ],
    }),
    listAdminApplications: builder.query<
      AdminApplicationQueueItem[],
      ApplicationStatus | void
    >({
      query: (status) => ({
        url: '/admin/applications',
        params: status ? { status } : undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Applications' as const,
                id,
              })),
              { type: 'Applications', id: 'ADMIN_LIST' },
            ]
          : [{ type: 'Applications', id: 'ADMIN_LIST' }],
    }),
    updateAdminApplicationStatus: builder.mutation<
      PartnerApplication,
      { id: string; status: ApplicationStatus; note?: string }
    >({
      query: ({ id, status, note }) => ({
        url: `/admin/applications/${id}/status`,
        method: 'PATCH',
        body: { status, note },
      }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'Applications', id },
        { type: 'Applications', id: 'ADMIN_LIST' },
        { type: 'AdminAudit', id: 'LIST' },
      ],
    }),
    listAuditLogs: builder.query<AuditLogsResponse, ListAuditLogsParams>({
      query: (params) => ({
        url: '/admin/audit-logs',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({
                type: 'AdminAudit' as const,
                id,
              })),
              { type: 'AdminAudit', id: 'LIST' },
            ]
          : [{ type: 'AdminAudit', id: 'LIST' }],
    }),
    createScholarship: builder.mutation<ScholarshipDetail, Record<string, unknown>>({
      query: (body) => ({
        url: '/scholarships',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: 'Scholarships', id: 'ADMIN_LIST' },
        { type: 'Scholarships', id: 'LIST' },
      ],
    }),
    updateScholarship: builder.mutation<
      ScholarshipDetail,
      { id: string; body: Record<string, unknown> }
    >({
      query: ({ id, body }) => ({
        url: `/scholarships/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_r, _e, { id }) => [
        { type: 'Scholarships', id },
        { type: 'Scholarships', id: 'ADMIN_LIST' },
        { type: 'Scholarships', id: 'LIST' },
      ],
    }),
    runAdminJob: builder.mutation<RunJobResult, AdminJobName>({
      query: (job) => ({
        url: '/admin/jobs/run',
        method: 'POST',
        body: { job },
      }),
      invalidatesTags: [{ type: 'AdminAudit', id: 'LIST' }],
    }),
  }),
})

export const {
  useListAdminScholarshipsQuery,
  usePublishScholarshipMutation,
  useArchiveScholarshipMutation,
  useVerifyScholarshipMutation,
  useBulkVerifyScholarshipsMutation,
  useBulkArchiveExpiredMutation,
  useFlagStaleScholarshipsMutation,
  useListReportsQuery,
  useResolveReportMutation,
  useListAdminApplicationsQuery,
  useUpdateAdminApplicationStatusMutation,
  useListAuditLogsQuery,
  useRunAdminJobMutation,
  useCreateScholarshipMutation,
  useUpdateScholarshipMutation,
} = adminApi
