import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AdminRoute } from './guards/AdminRoute'
import { GuestRoute } from './guards/GuestRoute'
import { ProtectedRoute } from './guards/ProtectedRoute'
import { AdminLayout } from './layouts/AdminLayout'
import { DashboardLayout } from './layouts/DashboardLayout'
import { PublicLayout } from './layouts/PublicLayout'
import { RouteFallback } from './RouteFallback'

const CountriesPage = lazy(() =>
  import('../pages/public/CountriesPage').then((m) => ({ default: m.CountriesPage })),
)
const GuidesPage = lazy(() =>
  import('../pages/public/GuidesPage').then((m) => ({ default: m.GuidesPage })),
)
const GuideDetailPage = lazy(() =>
  import('../pages/public/GuideDetailPage').then((m) => ({ default: m.GuideDetailPage })),
)
const AboutPage = lazy(() =>
  import('../pages/public/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const PrivacyPage = lazy(() =>
  import('../pages/public/PrivacyPage').then((m) => ({ default: m.PrivacyPage })),
)
const TermsPage = lazy(() =>
  import('../pages/public/TermsPage').then((m) => ({ default: m.TermsPage })),
)
const NotFoundPage = lazy(() =>
  import('../pages/public/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)

const LandingPage = lazy(() =>
  import('../pages/public/LandingPage').then((m) => ({ default: m.LandingPage })),
)
const ScholarshipsListPage = lazy(() =>
  import('../pages/public/scholarships/ScholarshipsListPage').then((m) => ({
    default: m.ScholarshipsListPage,
  })),
)
const ScholarshipDetailPage = lazy(() =>
  import('../pages/public/scholarships/ScholarshipDetailPage').then((m) => ({
    default: m.ScholarshipDetailPage,
  })),
)
const LoginPage = lazy(() =>
  import('../pages/auth/LoginPage').then((m) => ({ default: m.LoginPage })),
)
const SignupPage = lazy(() =>
  import('../pages/auth/SignupPage').then((m) => ({ default: m.SignupPage })),
)
const ForgotPasswordPage = lazy(() =>
  import('../pages/auth/ForgotPasswordPage').then((m) => ({
    default: m.ForgotPasswordPage,
  })),
)
const ResetPasswordPage = lazy(() =>
  import('../pages/auth/ResetPasswordPage').then((m) => ({
    default: m.ResetPasswordPage,
  })),
)
const AuthCallbackPage = lazy(() =>
  import('../pages/auth/AuthCallbackPage').then((m) => ({
    default: m.AuthCallbackPage,
  })),
)
const StudentDashboardPage = lazy(() =>
  import('../pages/dashboard/StudentDashboardPage').then((m) => ({
    default: m.StudentDashboardPage,
  })),
)
const SavedScholarshipsPage = lazy(() =>
  import('../pages/dashboard/SavedScholarshipsPage').then((m) => ({
    default: m.SavedScholarshipsPage,
  })),
)
const ApplicationsListPage = lazy(() =>
  import('../pages/dashboard/ApplicationsListPage').then((m) => ({
    default: m.ApplicationsListPage,
  })),
)
const ApplicationDetailPage = lazy(() =>
  import('../pages/dashboard/ApplicationDetailPage').then((m) => ({
    default: m.ApplicationDetailPage,
  })),
)
const PartnerApplyPage = lazy(() =>
  import('../pages/dashboard/PartnerApplyPage').then((m) => ({
    default: m.PartnerApplyPage,
  })),
)
const RemindersPage = lazy(() =>
  import('../pages/dashboard/RemindersPage').then((m) => ({
    default: m.RemindersPage,
  })),
)
const ProfilePage = lazy(() =>
  import('../pages/dashboard/ProfilePage').then((m) => ({
    default: m.ProfilePage,
  })),
)
const AdminDashboardPage = lazy(() =>
  import('../pages/admin/AdminDashboardPage').then((m) => ({
    default: m.AdminDashboardPage,
  })),
)
const AdminScholarshipsPage = lazy(() =>
  import('../pages/admin/AdminScholarshipsPage').then((m) => ({
    default: m.AdminScholarshipsPage,
  })),
)
const AdminReportsPage = lazy(() =>
  import('../pages/admin/AdminReportsPage').then((m) => ({
    default: m.AdminReportsPage,
  })),
)
const AdminApplicationsPage = lazy(() =>
  import('../pages/admin/AdminApplicationsPage').then((m) => ({
    default: m.AdminApplicationsPage,
  })),
)
const AdminApplicationReviewPage = lazy(() =>
  import('../pages/admin/AdminApplicationReviewPage').then((m) => ({
    default: m.AdminApplicationReviewPage,
  })),
)
const AdminAuditLogsPage = lazy(() =>
  import('../pages/admin/AdminAuditLogsPage').then((m) => ({
    default: m.AdminAuditLogsPage,
  })),
)
const AdminJobsPage = lazy(() =>
  import('../pages/admin/AdminJobsPage').then((m) => ({
    default: m.AdminJobsPage,
  })),
)
const AdminScholarshipEditorPage = lazy(() =>
  import('../pages/admin/AdminScholarshipEditorPage').then((m) => ({
    default: m.AdminScholarshipEditorPage,
  })),
)

function Lazy({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<RouteFallback />}>{children}</Suspense>
}

export function AppRouter() {
  return (
    <Routes>
      <Route element={<GuestRoute />}>
        <Route
          path="/auth/login"
          element={
            <Lazy>
              <LoginPage />
            </Lazy>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <Lazy>
              <SignupPage />
            </Lazy>
          }
        />
        <Route
          path="/auth/forgot-password"
          element={
            <Lazy>
              <ForgotPasswordPage />
            </Lazy>
          }
        />
        <Route
          path="/auth/reset-password"
          element={
            <Lazy>
              <ResetPasswordPage />
            </Lazy>
          }
        />
      </Route>

      <Route
        path="/auth/callback"
        element={
          <Lazy>
            <AuthCallbackPage />
          </Lazy>
        }
      />

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route
            path="/dashboard"
            element={
              <Lazy>
                <StudentDashboardPage />
              </Lazy>
            }
          />
          <Route
            path="/dashboard/saved"
            element={
              <Lazy>
                <SavedScholarshipsPage />
              </Lazy>
            }
          />
          <Route
            path="/dashboard/applications"
            element={
              <Lazy>
                <ApplicationsListPage />
              </Lazy>
            }
          />
          <Route
            path="/dashboard/applications/:id"
            element={
              <Lazy>
                <ApplicationDetailPage />
              </Lazy>
            }
          />
          <Route
            path="/dashboard/apply/:slug"
            element={
              <Lazy>
                <PartnerApplyPage />
              </Lazy>
            }
          />
          <Route
            path="/dashboard/reminders"
            element={
              <Lazy>
                <RemindersPage />
              </Lazy>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <Lazy>
                <ProfilePage />
              </Lazy>
            }
          />
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route
              path="/admin"
              element={
                <Lazy>
                  <AdminDashboardPage />
                </Lazy>
              }
            />
            <Route
              path="/admin/scholarships"
              element={
                <Lazy>
                  <AdminScholarshipsPage />
                </Lazy>
              }
            />
            <Route
              path="/admin/scholarships/new"
              element={
                <Lazy>
                  <AdminScholarshipEditorPage />
                </Lazy>
              }
            />
            <Route
              path="/admin/scholarships/:id/edit"
              element={
                <Lazy>
                  <AdminScholarshipEditorPage />
                </Lazy>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <Lazy>
                  <AdminReportsPage />
                </Lazy>
              }
            />
            <Route
              path="/admin/applications"
              element={
                <Lazy>
                  <AdminApplicationsPage />
                </Lazy>
              }
            />
            <Route
              path="/admin/applications/:id"
              element={
                <Lazy>
                  <AdminApplicationReviewPage />
                </Lazy>
              }
            />
            <Route
              path="/admin/audit-logs"
              element={
                <Lazy>
                  <AdminAuditLogsPage />
                </Lazy>
              }
            />
            <Route
              path="/admin/jobs"
              element={
                <Lazy>
                  <AdminJobsPage />
                </Lazy>
              }
            />
          </Route>
        </Route>
      </Route>

      <Route element={<PublicLayout />}>
        <Route
          path="/"
          element={
            <Lazy>
              <LandingPage />
            </Lazy>
          }
        />
        <Route
          path="/scholarships"
          element={
            <Lazy>
              <ScholarshipsListPage />
            </Lazy>
          }
        />
        <Route
          path="/scholarships/:slug"
          element={
            <Lazy>
              <ScholarshipDetailPage />
            </Lazy>
          }
        />
        <Route
          path="/countries"
          element={
            <Lazy>
              <CountriesPage />
            </Lazy>
          }
        />
        <Route
          path="/guides"
          element={
            <Lazy>
              <GuidesPage />
            </Lazy>
          }
        />
        <Route
          path="/guides/:slug"
          element={
            <Lazy>
              <GuideDetailPage />
            </Lazy>
          }
        />
        <Route
          path="/about"
          element={
            <Lazy>
              <AboutPage />
            </Lazy>
          }
        />
        <Route
          path="/privacy"
          element={
            <Lazy>
              <PrivacyPage />
            </Lazy>
          }
        />
        <Route
          path="/terms"
          element={
            <Lazy>
              <TermsPage />
            </Lazy>
          }
        />
        <Route
          path="*"
          element={
            <Lazy>
              <NotFoundPage />
            </Lazy>
          }
        />
      </Route>
    </Routes>
  )
}
