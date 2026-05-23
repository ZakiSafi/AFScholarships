import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initAttribution } from './analytics/attribution'
import { initAnalyticsProvider } from './analytics/provider'
import { AppProviders } from './app/providers'
import { AppRouter } from './app/router'
import './styles/globals.css'

initAttribution()
void initAnalyticsProvider()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders>
      <AppRouter />
    </AppProviders>
  </StrictMode>,
)
