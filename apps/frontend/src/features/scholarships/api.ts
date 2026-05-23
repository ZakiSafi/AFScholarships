import { baseApi } from '../../services/baseApi'
import type {
  ListScholarshipsParams,
  RelatedScholarshipsResponse,
  ScholarshipDetail,
  ScholarshipFacets,
  ScholarshipsListResponse,
} from './types'

export const scholarshipsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listScholarships: builder.query<
      ScholarshipsListResponse,
      ListScholarshipsParams
    >({
      query: (params) => ({
        url: '/scholarships',
        params: {
          ...params,
          includeFacets: params.includeFacets ? 'true' : undefined,
          partnerOnly: params.partnerOnly ? 'true' : undefined,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ slug }) => ({
                type: 'Scholarships' as const,
                id: slug,
              })),
              { type: 'Scholarships', id: 'LIST' },
            ]
          : [{ type: 'Scholarships', id: 'LIST' }],
    }),
    scholarshipFacets: builder.query<ScholarshipFacets, void>({
      query: () => '/scholarships/facets',
    }),
    scholarshipDetails: builder.query<ScholarshipDetail, string>({
      query: (slug) => `/scholarships/${slug}`,
      providesTags: (_result, _err, slug) => [
        { type: 'ScholarshipDetails', id: slug },
      ],
    }),
    relatedScholarships: builder.query<
      RelatedScholarshipsResponse,
      { slug: string; limit?: number }
    >({
      query: ({ slug, limit = 4 }) => ({
        url: `/scholarships/${slug}/related`,
        params: { limit },
      }),
    }),
  }),
})

export const {
  useListScholarshipsQuery,
  useScholarshipFacetsQuery,
  useScholarshipDetailsQuery,
  useRelatedScholarshipsQuery,
} = scholarshipsApi
