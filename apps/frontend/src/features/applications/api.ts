import { baseApi } from '../../services/baseApi'
import type {
  CreatePartnerApplicationPayload,
  PartnerApplication,
} from './types'

export const applicationsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listMyApplications: builder.query<PartnerApplication[], void>({
      query: () => '/applications/me',
      providesTags: (result) =>
        result
          ? [
              ...result.map((a) => ({
                type: 'Applications' as const,
                id: a.id,
              })),
              { type: 'Applications', id: 'LIST' },
            ]
          : [{ type: 'Applications', id: 'LIST' }],
    }),
    getApplication: builder.query<PartnerApplication, string>({
      query: (id) => `/applications/${id}`,
      providesTags: (_r, _e, id) => [{ type: 'Applications', id }],
    }),
    submitPartnerApplication: builder.mutation<
      PartnerApplication,
      { scholarshipId: string; body: CreatePartnerApplicationPayload }
    >({
      query: ({ scholarshipId, body }) => ({
        url: `/applications/partner/${scholarshipId}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: 'Applications', id: 'LIST' },
        { type: 'ScholarshipDetails', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useListMyApplicationsQuery,
  useGetApplicationQuery,
  useSubmitPartnerApplicationMutation,
} = applicationsApi
