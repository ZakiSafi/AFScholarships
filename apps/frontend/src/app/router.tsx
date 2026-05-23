import { Route, Routes } from 'react-router-dom'
import { AdminRoute } from './guards/AdminRoute'
import { GuestRoute } from './guards/GuestRoute'
import { ProtectedRoute } from './guards/ProtectedRoute'
import { DashboardLayout } from './layouts/DashboardLayout'
import { PublicLayout } from './layouts/PublicLayout'
import { AuthCallbackPage } from '../pages/auth/AuthCallbackPage'
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage'
import { LoginPage } from '../pages/auth/LoginPage'
import { ResetPasswordPage } from '../pages/auth/ResetPasswordPage'
import { SignupPage } from '../pages/auth/SignupPage'
import { DashboardPlaceholderPage } from '../pages/dashboard/DashboardPlaceholderPage'
import { StudentDashboardPage } from '../pages/dashboard/StudentDashboardPage'
import { LandingPage } from '../pages/public/LandingPage'
import { PlaceholderPage } from '../pages/public/PlaceholderPage'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route element={<GuestRoute />}>
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/signup" element={<SignupPage />} />
        <Route path="/auth/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
      </Route>

      <Route path="/auth/callback" element={<AuthCallbackPage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<StudentDashboardPage />} />
          <Route
            path="/dashboard/saved"
            element={
              <DashboardPlaceholderPage
                title="Saved scholarships"
                description="Your saved listings will appear here in Phase D-Student."
              />
            }
          />
          <Route
            path="/dashboard/applications"
            element={
              <DashboardPlaceholderPage
                title="Applications"
                description="Partner application tracking will be built in Phase D-Student."
              />
            }
          />
          <Route
            path="/dashboard/reminders"
            element={
              <DashboardPlaceholderPage
                title="Reminders"
                description="Deadline reminders will be managed here in Phase D-Student."
              />
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <DashboardPlaceholderPage
                title="Profile & settings"
                description="Profile editing will be wired in Phase D-Student."
              />
            }
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route
            path="/admin"
            element={
              <DashboardPlaceholderPage
                title="Admin console"
                description="Admin moderation UI will be built in Phase D-Admin."
              />
            }
          />
        </Route>
      </Route>

      <Route element={<PublicLayout />}>
        <Route
          path="/scholarships"
          element={
            <PlaceholderPage
              title="Scholarships"
              description="Browse verified scholarship listings. Full search and filters are coming in Phase D-Public."
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
        <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
        <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
      </Route>

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
