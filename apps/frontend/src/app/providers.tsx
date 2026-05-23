import { useEffect, type ReactNode } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { hydrateFromStorage } from '../features/auth/authSlice'
import { useAppDispatch } from '../hooks'
import { store } from '../store'
function AuthHydrator({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(hydrateFromStorage())
  }, [dispatch])

  return children
}

type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthHydrator>{children}</AuthHydrator>
      </BrowserRouter>
    </Provider>
  )
}
