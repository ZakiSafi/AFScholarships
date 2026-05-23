import { baseApi } from '../../services/baseApi'
import type { AccountProfile, UserPreferenceData, UserProfileData } from './types'

export const profileApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAccount: builder.query<AccountProfile, void>({
      query: () => '/profiles/me',
      providesTags: ['Profile'],
    }),
    updateAccountProfile: builder.mutation<
      UserProfileData,
      Record<string, unknown>
    >({
      query: (body) => ({
        url: '/profiles/me',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Profile', 'Auth'],
    }),
    updatePreferences: builder.mutation<UserPreferenceData, Record<string, unknown>>({
      query: (body) => ({
        url: '/profiles/me/preferences',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
})

export const {
  useGetAccountQuery,
  useUpdateAccountProfileMutation,
  useUpdatePreferencesMutation,
} = profileApi
