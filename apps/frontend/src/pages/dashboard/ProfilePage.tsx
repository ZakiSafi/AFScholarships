import { useEffect, useState } from 'react'
import {
  useGetAccountQuery,
  useUpdateAccountProfileMutation,
  useUpdatePreferencesMutation,
} from '../../features/profile/api'
import {
  preferencesFormSchema,
  profileFormSchema,
  type PreferencesFormValues,
  type ProfileFormValues,
} from '../../features/profile/validation'
import type { DegreeLevel } from '../../features/scholarships/types'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Textarea } from '../../components/ui/Textarea'
import { Card } from '../../components/ui/Card'

const degreeOptions: { value: DegreeLevel | ''; label: string }[] = [
  { value: '', label: 'Not specified' },
  { value: 'BACHELOR', label: 'Bachelor' },
  { value: 'MASTER', label: 'Master' },
  { value: 'PHD', label: 'PhD' },
  { value: 'SHORT_COURSE', label: 'Short course' },
]

export function ProfilePage() {
  const { data: account, isLoading } = useGetAccountQuery()
  const [updateProfile, { isLoading: savingProfile }] = useUpdateAccountProfileMutation()
  const [updatePreferences, { isLoading: savingPrefs }] =
    useUpdatePreferencesMutation()

  const [profile, setProfile] = useState<ProfileFormValues>({
    name: '',
    bio: '',
    city: '',
    province: '',
    country: '',
    educationLevel: '',
    fieldOfStudy: '',
    targetDegree: '',
    targetCountry: '',
    linkedinUrl: '',
  })
  const [prefs, setPrefs] = useState<PreferencesFormValues>({
    locale: 'en',
    timezone: 'UTC',
    emailDigestEnabled: true,
    marketingOptIn: false,
    preferredCountries: '',
    preferredDegreeLevels: [],
  })
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!account) return
    setProfile({
      name: account.name ?? '',
      bio: account.profile?.bio ?? '',
      city: account.profile?.city ?? '',
      province: account.profile?.province ?? '',
      country: account.profile?.country ?? '',
      educationLevel: account.profile?.educationLevel ?? '',
      fieldOfStudy: account.profile?.fieldOfStudy ?? '',
      targetDegree: account.profile?.targetDegree ?? '',
      targetCountry: account.profile?.targetCountry ?? '',
      linkedinUrl: account.profile?.linkedinUrl ?? '',
    })
    setPrefs({
      locale: account.preference?.locale ?? 'en',
      timezone: account.preference?.timezone ?? 'UTC',
      emailDigestEnabled: account.preference?.emailDigestEnabled ?? true,
      marketingOptIn: account.preference?.marketingOptIn ?? false,
      preferredCountries: (account.preference?.preferredCountries ?? []).join(', '),
      preferredDegreeLevels: account.preference?.preferredDegreeLevels ?? [],
    })
  }, [account])

  const saveProfile = async (event: React.FormEvent) => {
    event.preventDefault()
    setMessage(null)
    const parsed = profileFormSchema.safeParse(profile)
    if (!parsed.success) {
      setMessage('Please fix profile field errors.')
      return
    }
    const { name, targetDegree, linkedinUrl, ...rest } = parsed.data
    await updateProfile({
      name,
      ...rest,
      targetDegree: targetDegree || undefined,
      linkedinUrl: linkedinUrl || undefined,
    })
    setMessage('Profile saved.')
  }

  const savePreferences = async (event: React.FormEvent) => {
    event.preventDefault()
    setMessage(null)
    const parsed = preferencesFormSchema.safeParse(prefs)
    if (!parsed.success) {
      setMessage('Please fix preference field errors.')
      return
    }
    const countries = parsed.data.preferredCountries
      ? parsed.data.preferredCountries
          .split(',')
          .map((c) => c.trim())
          .filter(Boolean)
      : []
    await updatePreferences({
      locale: parsed.data.locale,
      timezone: parsed.data.timezone,
      emailDigestEnabled: parsed.data.emailDigestEnabled,
      marketingOptIn: parsed.data.marketingOptIn,
      preferredCountries: countries,
      preferredDegreeLevels: parsed.data.preferredDegreeLevels,
    })
    setMessage('Preferences saved.')
  }

  const toggleDegree = (level: DegreeLevel) => {
    setPrefs((p) => ({
      ...p,
      preferredDegreeLevels: p.preferredDegreeLevels.includes(level)
        ? p.preferredDegreeLevels.filter((d) => d !== level)
        : [...p.preferredDegreeLevels, level],
    }))
  }

  if (isLoading) {
    return <p className="text-sm text-[var(--color-muted)]">Loading profile…</p>
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-text)]">Profile & settings</h1>
        <p className="mt-2 text-[var(--color-muted)]">
          Used to pre-fill applications and personalize email reminders.
        </p>
        {account?.email ? (
          <p className="mt-1 text-sm text-slate-500">Account: {account.email}</p>
        ) : null}
      </div>

      {message ? (
        <p className="rounded-lg bg-[var(--color-primary-soft)] px-3 py-2 text-sm text-[var(--color-primary)]">
          {message}
        </p>
      ) : null}

      <Card className="p-6">
        <h2 className="font-bold text-slate-900">Personal profile</h2>
        <form onSubmit={saveProfile} className="mt-6 space-y-4">
          <div>
            <label htmlFor="name" className="text-label mb-1 block">
              Display name
            </label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
            />
          </div>
          <div>
            <label htmlFor="bio" className="text-label mb-1 block">
              Bio
            </label>
            <Textarea
              id="bio"
              rows={3}
              value={profile.bio}
              onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="city" className="text-label mb-1 block">
                City
              </label>
              <Input
                id="city"
                value={profile.city}
                onChange={(e) => setProfile((p) => ({ ...p, city: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="country-profile" className="text-label mb-1 block">
                Country
              </label>
              <Input
                id="country-profile"
                value={profile.country}
                onChange={(e) => setProfile((p) => ({ ...p, country: e.target.value }))}
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="fieldOfStudy" className="text-label mb-1 block">
                Field of study
              </label>
              <Input
                id="fieldOfStudy"
                value={profile.fieldOfStudy}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, fieldOfStudy: e.target.value }))
                }
              />
            </div>
            <div>
              <label htmlFor="targetDegree" className="text-label mb-1 block">
                Target degree
              </label>
              <select
                id="targetDegree"
                value={profile.targetDegree}
                onChange={(e) =>
                  setProfile((p) => ({
                    ...p,
                    targetDegree: e.target.value as DegreeLevel | '',
                  }))
                }
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm"
              >
                {degreeOptions.map((o) => (
                  <option key={o.value || 'none'} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="linkedinUrl" className="text-label mb-1 block">
              LinkedIn URL
            </label>
            <Input
              id="linkedinUrl"
              value={profile.linkedinUrl}
              onChange={(e) =>
                setProfile((p) => ({ ...p, linkedinUrl: e.target.value }))
              }
            />
          </div>
          <Button type="submit" disabled={savingProfile}>
            {savingProfile ? 'Saving…' : 'Save profile'}
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="font-bold text-slate-900">Preferences</h2>
        <form onSubmit={savePreferences} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="locale" className="text-label mb-1 block">
                Locale
              </label>
              <Input
                id="locale"
                value={prefs.locale}
                onChange={(e) => setPrefs((p) => ({ ...p, locale: e.target.value }))}
              />
            </div>
            <div>
              <label htmlFor="timezone" className="text-label mb-1 block">
                Timezone
              </label>
              <Input
                id="timezone"
                value={prefs.timezone}
                onChange={(e) => setPrefs((p) => ({ ...p, timezone: e.target.value }))}
              />
            </div>
          </div>
          <div>
            <label htmlFor="preferredCountries" className="text-label mb-1 block">
              Preferred countries (comma-separated)
            </label>
            <Input
              id="preferredCountries"
              value={prefs.preferredCountries}
              onChange={(e) =>
                setPrefs((p) => ({ ...p, preferredCountries: e.target.value }))
              }
            />
          </div>
          <fieldset>
            <legend className="text-label mb-2">Preferred degree levels</legend>
            <div className="flex flex-wrap gap-2">
              {degreeOptions
                .filter((o) => o.value)
                .map((o) => (
                  <label
                    key={o.value}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={prefs.preferredDegreeLevels.includes(
                        o.value as DegreeLevel,
                      )}
                      onChange={() => toggleDegree(o.value as DegreeLevel)}
                    />
                    {o.label}
                  </label>
                ))}
            </div>
          </fieldset>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={prefs.emailDigestEnabled}
              onChange={(e) =>
                setPrefs((p) => ({ ...p, emailDigestEnabled: e.target.checked }))
              }
            />
            Weekly email digest
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={prefs.marketingOptIn}
              onChange={(e) =>
                setPrefs((p) => ({ ...p, marketingOptIn: e.target.checked }))
              }
            />
            Product updates and tips
          </label>
          <Button type="submit" disabled={savingPrefs}>
            {savingPrefs ? 'Saving…' : 'Save preferences'}
          </Button>
        </form>
      </Card>
    </div>
  )
}
