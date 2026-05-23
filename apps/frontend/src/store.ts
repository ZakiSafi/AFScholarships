import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import { baseApi } from './services/baseApi'
import './features/auth/api'
import './features/scholarships/api'
import './features/saved/api'
import './features/reminders/api'
import './features/applications/api'
import './features/profile/api'
import './features/admin/api'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
