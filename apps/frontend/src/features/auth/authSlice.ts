import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type UserProfile = {
  userId: string
  email: string
  role: 'USER' | 'ADMIN'
}

type AuthState = {
  token: string | null
  profile: UserProfile | null
}

const initialState: AuthState = {
  token: null,
  profile: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload
    },
    clearToken: (state) => {
      state.token = null
      state.profile = null
    },
  },
})

export const { setToken, setProfile, clearToken } = authSlice.actions
export default authSlice.reducer
