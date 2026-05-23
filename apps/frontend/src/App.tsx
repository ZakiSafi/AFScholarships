import {
  Bookmark,
  Check,
  ChevronDown,
  GraduationCap,
  Play,
  Search,
  Sparkles,
} from 'lucide-react'

const navLinks = [
  'Scholarships',
  'How it works',
  'Success stories',
  'Partners',
  'FAQ',
]

const finderScholarships = [
  {
    title: 'Turkiye Burslari Scholarship',
    meta: 'Turkey · Bachelor, Master',
    fund: 'Fully funded',
    deadline: 'Dec 20',
    badge: 'Popular',
    badgeClass: 'bg-amber-100 text-amber-800',
  },
  {
    title: 'DAAD Development Program',
    meta: 'Germany · Master',
    fund: 'Full stipend',
    deadline: 'Nov 15',
    badge: 'Verified',
    badgeClass: 'bg-emerald-100 text-emerald-800',
  },
]

function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#fafbff]">
      {/* Ambient gradients */}
      <div className="pointer-events-none absolute -left-32 top-0 h-[520px] w-[520px] rounded-full bg-indigo-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-32 h-[480px] w-[480px] rounded-full bg-violet-200/35 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-blue-100/50 blur-3xl" />

      {/* Nav */}
      <header className="relative z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 lg:px-8">
          <a href="#top" className="flex min-w-0 items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-glow">
              <GraduationCap className="h-6 w-6" strokeWidth={1.75} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-lg font-bold text-slate-900">
                AfScholarships
              </span>
              <span className="block truncate text-xs font-medium text-slate-500">
                Afghan-first, global-ready
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm font-medium text-slate-600 transition hover:text-indigo-600"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            <div className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-600 sm:flex">
              <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-white">
                EN
              </span>
              <span className="px-1.5 py-0.5">DA</span>
              <span className="px-1.5 py-0.5">PS</span>
            </div>
            <button
              type="button"
              className="hidden text-sm font-semibold text-slate-700 sm:block"
            >
              Log in
            </button>
            <button
              type="button"
              className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:brightness-110 sm:px-5"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main id="top" className="relative z-10 mx-auto max-w-6xl px-5 pb-16 lg:px-8 lg:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-10">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-white/80 px-4 py-2 text-sm font-medium text-indigo-700 shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4 text-violet-500" />
              Verified scholarship guidance for Afghan students
            </div>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem]">
              Find verified scholarships faster.
            </h1>

            <p className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600">
              Discover global scholarships, understand eligibility, track
              deadlines, prepare documents, and apply with clear step-by-step
              guidance.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:brightness-110"
              >
                Explore Scholarships
                <span aria-hidden>→</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300"
              >
                <Play className="h-4 w-4 fill-slate-700 text-slate-700" />
                Watch Demo
              </button>
            </div>

            <ul className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {['Verified Sources', 'Updated Deadlines', 'Free to Use'].map(
                (item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm font-medium text-slate-600"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Scholarship Finder widget */}
          <div className="relative lg:pl-4">
            <div className="rounded-3xl border border-white/60 bg-white/90 p-6 shadow-widget backdrop-blur-sm sm:p-7">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Scholarship Finder
                  </h2>
                  <p className="mt-0.5 text-sm text-slate-500">
                    Personalized opportunity search
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>

              <label className="mt-5 flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3.5">
                <Search className="h-5 w-5 shrink-0 text-slate-400" />
                <input
                  readOnly
                  value="fully funded computer science"
                  className="w-full bg-transparent text-sm text-slate-700 outline-none"
                  aria-label="Search scholarships"
                />
              </label>

              <div className="mt-3 flex flex-wrap gap-2">
                {['Country', 'Degree', 'Funding', 'Deadline'].map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600"
                  >
                    {filter}
                    <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                  </button>
                ))}
              </div>

              <div className="mt-5 space-y-3">
                {finderScholarships.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4 transition hover:border-indigo-100 hover:bg-white"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${item.badgeClass}`}
                      >
                        {item.badge}
                      </span>
                      <button
                        type="button"
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-indigo-600"
                        aria-label="Save scholarship"
                      >
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                    <h3 className="mt-2 font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">{item.meta}</p>
                    <p className="text-sm text-slate-500">{item.fund}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-semibold text-rose-600">
                        Deadline {item.deadline}
                      </span>
                      <button
                        type="button"
                        className="rounded-lg bg-gradient-to-r from-indigo-500 to-violet-600 px-4 py-1.5 text-xs font-semibold text-white"
                      >
                        Apply
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-14 grid gap-4 rounded-2xl border border-slate-100 bg-white/70 p-6 shadow-card backdrop-blur sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-slate-100 sm:p-8">
          {[
            ['25,000+', 'Students supported'],
            ['1,200+', 'Active opportunities'],
            ['98%', 'Listings verified'],
          ].map(([value, label]) => (
            <div key={label} className="text-center sm:px-4">
              <p className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                {value}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500">{label}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer strip */}
      <footer className="relative z-10 border-t border-slate-200/80 bg-white/50 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} AfScholarships · Scholarship discovery for
        Afghan students
      </footer>
    </div>
  )
}

export default App
