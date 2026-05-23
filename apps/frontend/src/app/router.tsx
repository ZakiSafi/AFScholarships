import { Route, Routes } from 'react-router-dom'
import { LandingPage } from '../pages/public/LandingPage'
import { PlaceholderPage } from '../pages/public/PlaceholderPage'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/scholarships"
        element={
          <PlaceholderPage
            title="Scholarships"
            description="Browse verified scholarship listings. Full search and filters are coming soon."
          />
        }
      />
      <Route
        path="/countries"
        element={
          <PlaceholderPage
            title="Countries"
            description="Explore scholarships by host country. This directory is coming soon."
          />
        }
      />
      <Route
        path="/guides"
        element={
          <PlaceholderPage
            title="Guides"
            description="Application guides and templates will be available here soon."
          />
        }
      />
      <Route
        path="/about"
        element={
          <PlaceholderPage
            title="About AfScholarships"
            description="Learn more about our mission to help Afghan students access global scholarships."
          />
        }
      />
      <Route
        path="/auth/login"
        element={
          <PlaceholderPage
            title="Sign in"
            description="Account sign-in will be available when authentication launches."
          />
        }
      />
      <Route
        path="/auth/signup"
        element={
          <PlaceholderPage
            title="Create account"
            description="Create a free account to save scholarships and set deadline reminders."
          />
        }
      />
      <Route
        path="/privacy"
        element={<PlaceholderPage title="Privacy Policy" />}
      />
      <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
      <Route
        path="*"
        element={
          <PlaceholderPage
            title="Page not found"
            description="The page you are looking for does not exist."
          />
        }
      />
    </Routes>
  )
}
