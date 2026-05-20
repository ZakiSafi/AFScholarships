import { type FormEvent, useEffect, useMemo, useState } from 'react'
import {
  BellRing,
  Bookmark,
  BriefcaseBusiness,
  CalendarClock,
  ExternalLink,
  Filter,
  GraduationCap,
  LayoutGrid,
  Search,
  ShieldCheck,
  ShieldQuestion,
  Sparkles,
  UserRound,
} from 'lucide-react'
import { growthExperiments } from './analytics/experiments'
import { trackEvent } from './analytics/track'
import { useAppDispatch, useAppSelector } from './hooks'
import { clearToken, setProfile, setToken } from './features/auth/authSlice'
import {
  useAdminReportsQuery,
  useApplyToPartnerScholarshipMutation,
  useCreateReminderMutation,
  useGetProfileQuery,
  useListSavedScholarshipsQuery,
  useListScholarshipsQuery,
  useLoginMutation,
  useMyApplicationsQuery,
  useMyRemindersQuery,
  useRemoveSavedScholarshipMutation,
  useReportListingMutation,
  useResolveReportMutation,
  useSaveScholarshipMutation,
  useScholarshipDetailsQuery,
  useVerifyScholarshipMutation,
} from './services/authApi'

type Page = 'discover' | 'saved' | 'applications' | 'reminders' | 'profile' | 'admin'

const pageLabels: Record<Page, string> = {
  discover: 'Discover',
  saved: 'Saved',
  applications: 'Applications',
  reminders: 'Reminders',
  profile: 'Profile',
  admin: 'Admin',
}

const pageIcons: Record<Page, typeof LayoutGrid> = {
  discover: LayoutGrid,
  saved: Bookmark,
  applications: BriefcaseBusiness,
  reminders: BellRing,
  profile: UserRound,
  admin: ShieldQuestion,
}

function App() {
  const dispatch = useAppDispatch()
  const { token, profile } = useAppSelector((state) => state.auth)
  const [email, setEmail] = useState('admin@afscholarships.dev')
  const [password, setPassword] = useState('password123')
  const [page, setPage] = useState<Page>('discover')
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null)
  const [filters, setFilters] = useState({
    search: '',
    country: '',
    degreeLevel: '',
    fundingType: '',
    partnerOnly: false,
  })
  const [reportReason, setReportReason] = useState('Outdated details')
  const [reminderAt, setReminderAt] = useState('')
  const [applicationStatement, setApplicationStatement] = useState('')

  const [login, loginState] = useLoginMutation()
  const [saveScholarship] = useSaveScholarshipMutation()
  const [removeSavedScholarship] = useRemoveSavedScholarshipMutation()
  const [createReminder] = useCreateReminderMutation()
  const [reportListing] = useReportListingMutation()
  const [applyToPartnerScholarship] = useApplyToPartnerScholarshipMutation()
  const [verifyScholarship] = useVerifyScholarshipMutation()
  const [resolveReport] = useResolveReportMutation()

  const { data: me, isFetching: isProfileFetching } = useGetProfileQuery(undefined, {
    skip: !token,
  })
  const scholarshipsQuery = useListScholarshipsQuery({
    search: filters.search || undefined,
    country: filters.country || undefined,
    degreeLevel: filters.degreeLevel || undefined,
    fundingType: filters.fundingType || undefined,
    partnerOnly: filters.partnerOnly || undefined,
    limit: 12,
  })
  const detailsQuery = useScholarshipDetailsQuery(selectedSlug ?? '', {
    skip: !selectedSlug,
  })
  const savedQuery = useListSavedScholarshipsQuery(undefined, { skip: !token })
  const applicationsQuery = useMyApplicationsQuery(undefined, { skip: !token })
  const remindersQuery = useMyRemindersQuery(undefined, { skip: !token })
  const adminReportsQuery = useAdminReportsQuery(undefined, {
    skip: profile?.role !== 'ADMIN',
  })

  const isAuthenticated = useMemo(() => Boolean(token), [token])
  const activeScholarship = detailsQuery.data
  const savedIds = useMemo(
    () => new Set((savedQuery.data ?? []).map((item) => item.scholarshipId)),
    [savedQuery.data],
  )

  useEffect(() => {
    if (me) {
      dispatch(setProfile(me))
    }
  }, [dispatch, me])

  useEffect(() => {
    trackEvent('scholarship_filter_applied', filters)
  }, [filters])

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      const result = await login({ email, password }).unwrap()
      dispatch(setToken(result.access_token))
      trackEvent('login_success')
    } catch {
      dispatch(clearToken())
    }
  }

  const onOpenScholarship = (slug: string) => {
    setSelectedSlug(slug)
    const scholarship = scholarshipsQuery.data?.items.find((item) => item.slug === slug)
    if (scholarship) {
      trackEvent('scholarship_opened', {
        slug: scholarship.slug,
        hostCountry: scholarship.hostCountry,
        degreeLevel: scholarship.degreeLevel,
        fundingType: scholarship.fundingType,
      })
    }
  }

  const onSaveToggle = async (scholarshipId: string) => {
    if (!token) return
    if (savedIds.has(scholarshipId)) {
      await removeSavedScholarship({ scholarshipId }).unwrap()
      trackEvent('scholarship_unsaved', { scholarshipId })
      return
    }
    await saveScholarship({ scholarshipId }).unwrap()
    trackEvent('scholarship_saved', { scholarshipId })
  }

  const onCreateReminder = async () => {
    if (!activeScholarship || !reminderAt || !token) return
    const payload = { reminderAt: new Date(reminderAt).toISOString() }
    await createReminder({ scholarshipId: activeScholarship.id, payload }).unwrap()
    trackEvent('reminder_created', {
      scholarshipId: activeScholarship.id,
      reminderAt: payload.reminderAt,
    })
    setReminderAt('')
  }

  const onReportListing = async () => {
    if (!activeScholarship || !token) return
    await reportListing({
      scholarshipId: activeScholarship.id,
      payload: { reason: reportReason },
    }).unwrap()
    trackEvent('listing_reported', {
      scholarshipId: activeScholarship.id,
      reason: reportReason,
    })
  }

  const onPartnerApply = async () => {
    if (!activeScholarship || !activeScholarship.isPartnerApplication || !token) return
    await applyToPartnerScholarship({
      scholarshipId: activeScholarship.id,
      payload: {
        fullName: profile?.email ?? email,
        email: profile?.email ?? email,
        statement: applicationStatement,
      },
    }).unwrap()
    trackEvent('partner_application_submitted', {
      scholarshipId: activeScholarship.id,
    })
    setApplicationStatement('')
  }

  const onExternalApply = (scholarshipId: string, provider: string) => {
    trackEvent('external_apply_clicked', { scholarshipId, provider })
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl p-4 md:p-6">
      <header className="mb-5 rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-700 to-blue-700 p-5 text-white shadow-lg">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="mb-1 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
              Afghan-first opportunity platform
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">AfScholarships</h1>
            <p className="mt-1 text-sm text-indigo-100">
              Discover scholarships, track deadlines, and apply through verified partner
              flows.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-white/20 px-3 py-2 text-xs">
              <p className="font-semibold">{scholarshipsQuery.data?.total ?? 0}</p>
              <p className="text-indigo-100">Listings</p>
            </div>
            <div className="rounded-xl bg-white/20 px-3 py-2 text-xs">
              <p className="font-semibold">{savedQuery.data?.length ?? 0}</p>
              <p className="text-indigo-100">Saved</p>
            </div>
            <div className="rounded-xl bg-white/20 px-3 py-2 text-xs">
              <p className="font-semibold">{remindersQuery.data?.length ?? 0}</p>
              <p className="text-indigo-100">Reminders</p>
            </div>
          </div>
        </div>
      </header>

      <section className="grid gap-5 lg:grid-cols-[250px_1fr]">
        <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <div className="rounded-lg bg-indigo-100 p-2 text-indigo-700">
              <GraduationCap className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Navigation</p>
              <p className="text-xs text-slate-500">MVP workspace</p>
            </div>
          </div>

          <div className="space-y-1.5">
            {(Object.keys(pageLabels) as Page[])
              .filter((item) => item !== 'admin' || profile?.role === 'ADMIN')
              .map((item) => {
                const Icon = pageIcons[item]
                return (
                  <button
                    type="button"
                    key={item}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm ${
                      page === item
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                    onClick={() => setPage(item)}
                  >
                    <Icon className="h-4 w-4" />
                    {pageLabels[item]}
                  </button>
                )
              })}
          </div>

          <section className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
            <p className="font-semibold text-slate-800">Authentication</p>
            {!isAuthenticated ? (
              <form onSubmit={onSubmit} className="mt-3 space-y-2">
                <input
                  className="w-full rounded border border-slate-300 px-2 py-1.5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
                <input
                  className="w-full rounded border border-slate-300 px-2 py-1.5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
                <button
                  className="inline-flex items-center rounded bg-indigo-600 px-3 py-1.5 text-white"
                  type="submit"
                  disabled={loginState.isLoading}
                >
                  <ShieldCheck className="mr-1 h-3 w-3" />
                  {loginState.isLoading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>
            ) : (
              <div className="mt-2 space-y-2">
                {isProfileFetching && <p>Loading profile...</p>}
                {profile && (
                  <p>
                    Signed in as <strong>{profile.email}</strong> ({profile.role})
                  </p>
                )}
                <button
                  className="rounded border border-slate-300 px-2 py-1"
                  onClick={() => dispatch(clearToken())}
                >
                  Sign out
                </button>
              </div>
            )}
            {loginState.isError && (
              <p className="mt-2 text-red-600">Login failed. Check credentials.</p>
            )}
          </section>
        </aside>

        <section className="space-y-4">
          {page === 'discover' && (
            <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <Search className="h-4 w-4 text-slate-500" />
                  <h2 className="text-lg font-semibold text-slate-900">Discover scholarships</h2>
                </div>

                <div className="mb-4 grid gap-2 md:grid-cols-2">
                  <label className="relative">
                    <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      value={filters.search}
                      onChange={(e) => setFilters((p) => ({ ...p, search: e.target.value }))}
                      className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm"
                      placeholder="Search title, provider, summary"
                    />
                  </label>
                  <input
                    value={filters.country}
                    onChange={(e) => setFilters((p) => ({ ...p, country: e.target.value }))}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                    placeholder="Host country"
                  />
                  <select
                    value={filters.degreeLevel}
                    onChange={(e) => setFilters((p) => ({ ...p, degreeLevel: e.target.value }))}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  >
                    <option value="">Any degree level</option>
                    <option value="BACHELOR">Bachelor</option>
                    <option value="MASTER">Master</option>
                    <option value="PHD">PhD</option>
                    <option value="SHORT_COURSE">Short course</option>
                  </select>
                  <select
                    value={filters.fundingType}
                    onChange={(e) => setFilters((p) => ({ ...p, fundingType: e.target.value }))}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
                  >
                    <option value="">Any funding type</option>
                    <option value="FULL">Full funded</option>
                    <option value="PARTIAL">Partial funded</option>
                    <option value="TUITION_ONLY">Tuition only</option>
                    <option value="STIPEND_ONLY">Stipend only</option>
                  </select>
                </div>

                <label className="mb-4 inline-flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-2 text-xs text-slate-700">
                  <Filter className="h-3.5 w-3.5" />
                  <input
                    type="checkbox"
                    checked={filters.partnerOnly}
                    onChange={(e) =>
                      setFilters((p) => ({ ...p, partnerOnly: e.target.checked }))
                    }
                  />
                  Partner opportunities only
                </label>

                {scholarshipsQuery.isFetching && (
                  <p className="text-sm text-slate-500">Loading scholarships...</p>
                )}

                {!scholarshipsQuery.data?.items.length && !scholarshipsQuery.isFetching && (
                  <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center">
                    <p className="text-sm text-slate-600">No scholarships match this filter.</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Try clearing filters or searching different keywords.
                    </p>
                  </div>
                )}

                <div className="space-y-3">
                  {scholarshipsQuery.data?.items.map((item) => (
                    <article
                      key={item.id}
                      className={`rounded-xl border p-4 transition ${
                        selectedSlug === item.slug
                          ? 'border-indigo-400 bg-indigo-50'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <button
                        className="w-full text-left"
                        onClick={() => onOpenScholarship(item.slug)}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                            <p className="mt-1 text-sm text-slate-600">{item.summary}</p>
                          </div>
                          {item.isFeatured && (
                            <span className="rounded-full bg-amber-100 px-2 py-1 text-[10px] font-medium text-amber-700">
                              Featured
                            </span>
                          )}
                        </div>
                      </button>

                      <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1">
                          {item.hostCountry}
                        </span>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1">
                          {item.degreeLevel}
                        </span>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1">
                          {item.fundingType}
                        </span>
                        <span className="rounded-full bg-slate-100 px-2.5 py-1">
                          Deadline {new Date(item.deadlineAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {token && (
                          <button
                            className="inline-flex items-center rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs"
                            onClick={() => onSaveToggle(item.id)}
                          >
                            <Bookmark className="mr-1 h-3 w-3" />
                            {savedIds.has(item.id) ? 'Saved' : 'Save'}
                          </button>
                        )}
                        {item.applicationUrl && (
                          <a
                            className="inline-flex items-center rounded-lg border border-indigo-300 px-2.5 py-1.5 text-xs text-indigo-700"
                            target="_blank"
                            rel="noreferrer"
                            href={item.applicationUrl}
                            onClick={() => onExternalApply(item.id, item.provider)}
                          >
                            Official apply <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                {!activeScholarship && (
                  <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center">
                    <Sparkles className="mx-auto mb-2 h-5 w-5 text-indigo-500" />
                    <p className="text-sm text-slate-600">
                      Pick a scholarship card to view full details and apply process.
                    </p>
                  </div>
                )}

                {activeScholarship && (
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{activeScholarship.title}</h2>
                    <p className="mt-2 text-sm text-slate-600">{activeScholarship.description}</p>

                    <div className="mt-4 grid gap-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-700">
                      <p>
                        <strong>Provider:</strong> {activeScholarship.provider}
                      </p>
                      <p>
                        <strong>Eligible countries:</strong>{' '}
                        {activeScholarship.eligibleCountries.join(', ') || 'Not specified'}
                      </p>
                      <p>
                        <strong>Verification:</strong> {activeScholarship.verificationStatus}
                      </p>
                    </div>

                    <div className="mt-4">
                      <h3 className="text-sm font-semibold text-slate-900">Application process</h3>
                      <ol className="mt-2 space-y-2">
                        {activeScholarship.steps.map((step) => (
                          <li
                            key={step.id}
                            className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700"
                          >
                            <p className="font-medium text-slate-900">
                              Step {step.orderIndex}: {step.title}
                            </p>
                            <p className="text-xs">{step.description}</p>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {token && (
                      <div className="mt-4 space-y-2 border-t border-slate-200 pt-4">
                        <div className="flex items-center gap-2">
                          <CalendarClock className="h-4 w-4 text-slate-500" />
                          <input
                            type="datetime-local"
                            className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-xs"
                            value={reminderAt}
                            onChange={(e) => setReminderAt(e.target.value)}
                          />
                          <button
                            className="whitespace-nowrap rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs"
                            onClick={onCreateReminder}
                          >
                            Remind me
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            className="w-full rounded-lg border border-slate-300 px-2 py-1.5 text-xs"
                            value={reportReason}
                            onChange={(e) => setReportReason(e.target.value)}
                            placeholder="Report inaccurate info"
                          />
                          <button
                            className="rounded-lg border border-rose-300 px-2.5 py-1.5 text-xs text-rose-700"
                            onClick={onReportListing}
                          >
                            Report
                          </button>
                        </div>
                      </div>
                    )}

                    {token && activeScholarship.isPartnerApplication && (
                      <div className="mt-4 rounded-xl border border-indigo-200 bg-indigo-50 p-3">
                        <p className="text-sm font-semibold text-indigo-900">Partner application</p>
                        <textarea
                          className="mt-2 w-full rounded-lg border border-indigo-200 px-2 py-1.5 text-sm"
                          value={applicationStatement}
                          onChange={(e) => setApplicationStatement(e.target.value)}
                          placeholder="Write your motivation statement"
                          rows={4}
                        />
                        <button
                          className="mt-2 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm text-white"
                          onClick={onPartnerApply}
                        >
                          Submit application
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </section>
            </div>
          )}

          {page === 'saved' && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">Saved scholarships</h2>
              {!token && <p className="text-sm text-slate-600">Sign in to view saved items.</p>}
              <div className="grid gap-2 md:grid-cols-2">
                {savedQuery.data?.map((item) => (
                  <div key={item.scholarshipId} className="rounded-lg border border-slate-200 p-3">
                    <p className="font-medium text-slate-900">{item.scholarship.title}</p>
                    <p className="text-sm text-slate-600">{item.scholarship.summary}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {page === 'applications' && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">My applications</h2>
              {!token && <p className="text-sm text-slate-600">Sign in to track applications.</p>}
              <div className="grid gap-2 md:grid-cols-2">
                {applicationsQuery.data?.map((item) => (
                  <div key={item.id} className="rounded-lg border border-slate-200 p-3">
                    <p className="font-medium text-slate-900">{item.scholarship.title}</p>
                    <p className="text-sm text-slate-600">Status: {item.status}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {page === 'reminders' && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">My reminders</h2>
              {!token && <p className="text-sm text-slate-600">Sign in to manage reminders.</p>}
              <div className="grid gap-2 md:grid-cols-2">
                {remindersQuery.data?.map((item) => (
                  <div key={item.id} className="rounded-lg border border-slate-200 p-3">
                    <p className="font-medium text-slate-900">{item.scholarship.title}</p>
                    <p className="text-sm text-slate-600">
                      Reminder: {new Date(item.reminderAt).toLocaleString()} ({item.status})
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {page === 'profile' && (
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-lg font-semibold text-slate-900">My profile</h2>
              {!token && <p className="text-sm text-slate-600">Sign in to view your profile.</p>}
              {token && (
                <div className="space-y-3 text-sm">
                  <div className="rounded-xl bg-slate-50 p-3">
                    <p>
                      <strong>Email:</strong> {profile?.email ?? 'Unknown'}
                    </p>
                    <p>
                      <strong>Role:</strong> {profile?.role ?? 'Unknown'}
                    </p>
                  </div>
                  <p className="rounded-xl border border-dashed border-slate-300 p-3 text-slate-600">
                    Next enhancement: user education profile, preferred countries, target
                    degree, and personalized recommendations.
                  </p>
                </div>
              )}
            </section>
          )}

          {page === 'admin' && profile?.role === 'ADMIN' && (
            <div className="grid gap-4 xl:grid-cols-2">
              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <ShieldQuestion className="h-5 w-5" /> Moderation queue
                </h2>
                <div className="space-y-2">
                  {adminReportsQuery.data?.map((report) => (
                    <div key={report.id} className="rounded-lg border border-slate-200 p-3">
                      <p className="font-medium text-slate-900">{report.scholarship.title}</p>
                      <p className="text-sm text-slate-600">{report.reason}</p>
                      <div className="mt-2 flex gap-2">
                        <button
                          className="rounded border border-emerald-300 px-2 py-1 text-xs text-emerald-700"
                          onClick={async () => {
                            await resolveReport({
                              reportId: report.id,
                              status: 'RESOLVED',
                            }).unwrap()
                            trackEvent('admin_report_resolved', {
                              reportId: report.id,
                              status: 'RESOLVED',
                            })
                          }}
                        >
                          Resolve
                        </button>
                        <button
                          className="rounded border border-amber-300 px-2 py-1 text-xs text-amber-700"
                          onClick={async () => {
                            await resolveReport({
                              reportId: report.id,
                              status: 'DISMISSED',
                            }).unwrap()
                            trackEvent('admin_report_resolved', {
                              reportId: report.id,
                              status: 'DISMISSED',
                            })
                          }}
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h2 className="mb-4 text-lg font-semibold text-slate-900">Verification controls</h2>
                <div className="space-y-2">
                  {scholarshipsQuery.data?.items.map((item) => (
                    <div key={item.id} className="rounded-lg border border-slate-200 p-3">
                      <p className="font-medium text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-600">
                        Current status: {item.verificationStatus}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(['VERIFIED', 'UNVERIFIED', 'FLAGGED_STALE'] as const).map((status) => (
                          <button
                            key={status}
                            className="rounded border border-slate-300 px-2 py-1 text-xs"
                            onClick={() =>
                              verifyScholarship({
                                scholarshipId: item.id,
                                status,
                              })
                            }
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-slate-900">Growth experiments</h2>
            <div className="grid gap-2 md:grid-cols-3">
              {growthExperiments.map((experiment) => (
                <article key={experiment.id} className="rounded-lg border border-slate-200 p-3">
                  <h3 className="text-sm font-semibold text-slate-900">{experiment.name}</h3>
                  <p className="mt-1 text-xs text-slate-600">{experiment.hypothesis}</p>
                  <p className="mt-2 text-xs text-slate-500">Metric: {experiment.primaryMetric}</p>
                </article>
              ))}
            </div>
          </section>
        </section>
      </section>
    </main>
  )
}

export default App
