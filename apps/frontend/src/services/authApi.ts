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
  }),
})

export const { useLoginMutation, useGetProfileQuery } = authApi
