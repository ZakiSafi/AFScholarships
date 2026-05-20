import { type FormEvent, useMemo, useState } from 'react'
import { GraduationCap, ShieldCheck } from 'lucide-react'
import { useAppDispatch, useAppSelector } from './hooks'
import { clearToken, setToken } from './features/auth/authSlice'
import { useGetProfileQuery, useLoginMutation } from './services/authApi'

function App() {
  const dispatch = useAppDispatch()
  const token = useAppSelector((state) => state.auth.token)
  const [email, setEmail] = useState('admin@afscholarships.dev')
  const [password, setPassword] = useState('password123')
  const [login, loginState] = useLoginMutation()
  const { data: profile, isFetching } = useGetProfileQuery(undefined, {
    skip: !token,
  })

  const isAuthenticated = useMemo(() => Boolean(token), [token])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const result = await login({ email, password }).unwrap()
      dispatch(setToken(result.access_token))
    } catch {
      dispatch(clearToken())
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl items-center justify-center p-6">
      <section className="w-full rounded-2xl bg-white p-8 shadow-lg">
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-xl bg-indigo-100 p-2 text-indigo-600">
            <GraduationCap />
          </div>
          <div>
            <h1 className="m-0 text-2xl font-semibold text-slate-900">
              AfScholarships Monorepo
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              React + Redux Toolkit + RTK Query connected to Nest JWT API
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none ring-indigo-500 focus:ring-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          <button
            className="inline-flex items-center rounded-lg bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
            type="submit"
            disabled={loginState.isLoading}
          >
            <ShieldCheck className="mr-2 h-4 w-4" />
            {loginState.isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        {loginState.isError && (
          <p className="mt-4 text-sm text-red-600">Login failed. Check credentials.</p>
        )}

        <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <h2 className="m-0 text-sm font-semibold text-slate-700">Auth status</h2>
          {!isAuthenticated && (
            <p className="mt-2 text-sm text-slate-600">No active token.</p>
          )}
          {isAuthenticated && (
            <div className="mt-2 space-y-1 text-sm text-slate-700">
              <p>JWT token is stored in Redux state.</p>
              {isFetching && <p>Loading profile...</p>}
              {profile && (
                <p>
                  Logged in as <strong>{profile.email}</strong>
                </p>
              )}
              <button
                type="button"
                className="mt-2 rounded-md border border-slate-300 px-3 py-1 text-xs hover:bg-slate-100"
                onClick={() => dispatch(clearToken())}
              >
                Clear token
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
