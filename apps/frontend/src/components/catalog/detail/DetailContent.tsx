import { Globe, HelpCircle, ListChecks } from 'lucide-react'
import { ExternalLink } from 'lucide-react'
import type { ScholarshipDetail } from '../../../features/scholarships/types'
import { ReportListingForm } from '../../student/ReportListingForm'
import { SectionHeading } from '../shared/SectionHeading'
import { Badge } from '../../ui/Badge'

type DetailContentProps = {
  scholarship: ScholarshipDetail
}

export function DetailContent({ scholarship }: DetailContentProps) {
  return (
    <div className="space-y-14">
      <section>
        <SectionHeading
          eyebrow="Program overview"
          title="What this opportunity offers"
          description="Summary and full description from the verified listing."
        />
        <div className="mt-8 space-y-5 rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-200 sm:p-8">
          <p className="text-lg font-medium leading-relaxed text-slate-800">
            {scholarship.summary}
          </p>
          <p className="whitespace-pre-wrap leading-relaxed text-slate-600">
            {scholarship.description}
          </p>
        </div>
      </section>

      {(scholarship.eligibleCountries.length > 0 ||
        scholarship.fieldOfStudy.length > 0 ||
        scholarship.languageRequirement) && (
        <section>
          <SectionHeading eyebrow="Eligibility" title="Who can apply" />
          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            {scholarship.eligibleCountries.length > 0 ? (
              <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                <dt className="text-label">Eligible nationalities</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-700">
                  {scholarship.eligibleCountries.join(' · ')}
                </dd>
              </div>
            ) : null}
            {scholarship.languageRequirement ? (
              <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                <dt className="text-label">Language</dt>
                <dd className="mt-2 text-sm text-slate-700">
                  {scholarship.languageRequirement}
                </dd>
              </div>
            ) : null}
          </dl>
          {scholarship.fieldOfStudy.length > 0 ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {scholarship.fieldOfStudy.map((field) => (
                <Badge key={field} variant="category">
                  {field}
                </Badge>
              ))}
            </div>
          ) : null}
        </section>
      )}

      {scholarship.benefits.length > 0 ? (
        <section>
          <SectionHeading
            eyebrow="Value"
            title="Benefits & coverage"
            id="benefits"
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {scholarship.benefits.map((benefit) => (
              <li
                key={benefit.id}
                className="rounded-2xl bg-gradient-to-br from-white to-[var(--color-primary-soft)]/40 p-5 ring-1 ring-slate-200"
              >
                <p className="font-bold text-slate-900">{benefit.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {benefit.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {scholarship.requirements.length > 0 ? (
        <section>
          <SectionHeading
            eyebrow="Criteria"
            title="Requirements"
            id="requirements"
          />
          <ul className="mt-8 space-y-3">
            {scholarship.requirements.map((req) => (
              <li
                key={req.id}
                className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-slate-200"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    req.isMandatory
                      ? 'bg-[var(--color-primary-soft)] text-[var(--color-primary)]'
                      : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  <ListChecks className="h-5 w-5" aria-hidden />
                </span>
                <div>
                  <p className="flex items-center gap-2 font-bold text-slate-900">
                    {req.label}
                    {req.isMandatory ? (
                      <span className="text-label text-[10px] text-[var(--color-primary)]">
                        Required
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    {req.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {scholarship.steps.length > 0 ? (
        <section>
          <SectionHeading
            eyebrow="Process"
            title="How to apply"
            id="steps"
          />
          <ol className="relative mt-8 space-y-0 border-l-2 border-blue-100 pl-8">
            {scholarship.steps.map((step, index) => (
              <li key={step.id} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[2.05rem] flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary)] text-xs font-bold text-white ring-4 ring-white">
                  {index + 1}
                </span>
                <div className="rounded-2xl bg-white p-5 ring-1 ring-slate-200">
                  <p className="font-bold text-slate-900">{step.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                  {!step.isRequired ? (
                    <p className="mt-2 text-xs font-semibold text-slate-400">
                      Optional step
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      {scholarship.faqs.length > 0 ? (
        <section>
          <SectionHeading eyebrow="Answers" title="FAQs" id="faqs" />
          <div className="mt-8 divide-y divide-slate-200 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
            {scholarship.faqs.map((faq) => (
              <details key={faq.id} className="group px-5 py-4 sm:px-6">
                <summary className="flex cursor-pointer list-none items-center gap-3 font-bold text-slate-900 marker:content-none">
                  <HelpCircle
                    className="h-5 w-5 shrink-0 text-[var(--color-primary)]"
                    aria-hidden
                  />
                  {faq.question}
                </summary>
                <p className="mt-3 pb-2 pl-8 text-sm leading-relaxed text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <SectionHeading
          eyebrow="Trust"
          title="Something wrong?"
          description="Help us keep listings accurate for everyone."
        />
        <div className="mt-6">
          <ReportListingForm
            scholarshipId={scholarship.id}
            scholarshipTitle={scholarship.title}
          />
        </div>
      </section>

      {scholarship.sources.length > 0 ? (
        <section>
          <SectionHeading
            eyebrow="Trust"
            title="Official sources"
            description="We link directly to program pages our team has reviewed."
          />
          <ul className="mt-8 space-y-3">
            {scholarship.sources.map((source) => (
              <li key={source.id}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 font-semibold text-[var(--color-primary)] ring-1 ring-slate-200 transition hover:bg-[var(--color-primary-soft)]"
                >
                  <Globe className="h-5 w-5 shrink-0" aria-hidden />
                  <span className="min-w-0 flex-1 truncate">{source.label}</span>
                  <ExternalLink className="h-4 w-4 shrink-0 opacity-60" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
