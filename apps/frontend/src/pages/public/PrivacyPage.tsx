export function PrivacyPage() {
  return (
    <main className="catalog-mesh flex-1">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-extrabold text-slate-900">Privacy Policy</h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: May 2026</p>

        <div className="mt-8 space-y-6 text-base leading-relaxed text-slate-700">
          <section>
            <h2 className="text-lg font-bold text-slate-900">What we collect</h2>
            <p className="mt-2">
              When you create an account we store your email, name, and profile information
              you choose to provide. We record saved scholarships, reminders, applications,
              and listing reports linked to your account.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-900">How we use data</h2>
            <p className="mt-2">
              We use your information to operate the platform: authentication, application
              processing, deadline reminder emails, and moderation. We may use aggregated,
              anonymous analytics to improve the product.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-900">Cookies and analytics</h2>
            <p className="mt-2">
              We may use privacy-conscious analytics (configured via environment variables)
              to understand how features are used. You can control marketing cookies through
              your browser settings.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-900">Data retention</h2>
            <p className="mt-2">
              We retain account data while your account is active. You may request deletion
              by contacting support@afscholarships.dev.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-900">Contact</h2>
            <p className="mt-2">
              For privacy questions:{' '}
              <a
                href="mailto:privacy@afscholarships.dev"
                className="font-semibold text-[var(--color-primary)] hover:underline"
              >
                privacy@afscholarships.dev
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}
