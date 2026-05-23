export function TermsPage() {
  return (
    <main className="catalog-mesh flex-1">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900">Terms of Service</h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: May 2026</p>

        <div className="mt-8 space-y-6 text-base leading-relaxed text-slate-700">
          <section>
            <h2 className="text-lg font-bold text-slate-900">Using AfScholarships</h2>
            <p className="mt-2">
              AfScholarships is an information and application platform. We do not guarantee
              admission, funding, or visa approval. Always confirm requirements on official
              program websites before you apply.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-900">Accounts</h2>
            <p className="mt-2">
              You are responsible for keeping your login credentials secure and for the
              accuracy of information you submit in applications and reports.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-900">Listing accuracy</h2>
            <p className="mt-2">
              We strive to keep listings verified and up to date. Community reports and
              admin review help maintain quality, but deadlines and requirements can change
              without notice on official sites.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-900">Limitation of liability</h2>
            <p className="mt-2">
              The platform is provided “as is.” We are not liable for missed deadlines,
              application outcomes, or losses arising from reliance on third-party program
              information.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-900">Contact</h2>
            <p className="mt-2">
              Questions about these terms:{' '}
              <a
                href="mailto:legal@afscholarships.dev"
                className="font-semibold text-[var(--color-primary)] hover:underline"
              >
                legal@afscholarships.dev
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
