import { baseApi } from '../../services/baseApi'
import type { SavedCheckResponse, SavedItem } from './types'

export const savedApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    listSaved: builder.query<SavedItem[], void>({
      query: () => '/saved-items',
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({
                type: 'SavedItems' as const,
                id: item.scholarshipId,
              })),
              { type: 'SavedItems', id: 'LIST' },
            ]
          : [{ type: 'SavedItems', id: 'LIST' }],
    }),
    checkSaved: builder.query<SavedCheckResponse, string>({
      query: (scholarshipId) => `/saved-items/check/${scholarshipId}`,
      providesTags: (_r, _e, scholarshipId) => [
        { type: 'SavedItems', id: scholarshipId },
      ],
    }),
    saveScholarship: builder.mutation<SavedItem, string>({
      query: (scholarshipId) => ({
        url: `/saved-items/${scholarshipId}`,
        method: 'POST',
      }),
      invalidatesTags: (_r, _e, scholarshipId) => [
        { type: 'SavedItems', id: scholarshipId },
        { type: 'SavedItems', id: 'LIST' },
      ],
    }),
    unsaveScholarship: builder.mutation<{ success: boolean }, string>({
      query: (scholarshipId) => ({
        url: `/saved-items/${scholarshipId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_r, _e, scholarshipId) => [
        { type: 'SavedItems', id: scholarshipId },
        { type: 'SavedItems', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useListSavedQuery,
  useCheckSavedQuery,
  useSaveScholarshipMutation,
  useUnsaveScholarshipMutation,
} = savedApi
