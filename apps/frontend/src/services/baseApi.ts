import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import {
  clearCredentials,
  setCredentials,
} from '../features/auth/authSlice'
import type { AuthTokensResponse } from '../features/auth/types'
import { getStoredRefreshToken } from '../lib/auth-storage'
import type { RootState } from '../store'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'

const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
})

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    const refreshToken =
      (api.getState() as RootState).auth.refreshToken ?? getStoredRefreshToken()

    if (refreshToken) {
      const refreshResult = await rawBaseQuery(
        {
          url: '/auth/refresh',
          method: 'POST',
          body: { refreshToken },
        },
        api,
        extraOptions,
      )

      if (refreshResult.data) {
        api.dispatch(setCredentials(refreshResult.data as AuthTokensResponse))
        result = await rawBaseQuery(args, api, extraOptions)
      } else {
        api.dispatch(clearCredentials())
      }
    } else {
      api.dispatch(clearCredentials())
    }
  }

  return result
}

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    'Auth',
    'Scholarships',
    'ScholarshipDetails',
    'SavedItems',
    'Applications',
    'Reminders',
    'AdminReports',
    'AdminAudit',
    'Profile',
  ],
  endpoints: () => ({}),
})
