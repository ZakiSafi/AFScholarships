import type { DegreeLevel } from '../scholarships/types'
import type { UserRole } from '../auth/types'

export type UserProfileData = {
  userId: string
  avatarUrl: string | null
  bio: string | null
  city: string | null
  province: string | null
  country: string | null
  educationLevel: string | null
  fieldOfStudy: string | null
  targetDegree: DegreeLevel | null
  targetCountry: string | null
  interests: string[]
  linkedinUrl: string | null
}

export type UserPreferenceData = {
  userId: string
  locale: string
  timezone: string
  emailDigestEnabled: boolean
  marketingOptIn: boolean
  preferredCountries: string[]
  preferredDegreeLevels: DegreeLevel[]
}

export type AccountProfile = {
  id: string
  email: string
  name: string | null
  role: UserRole
  emailVerifiedAt: string | null
  createdAt: string
  profile: UserProfileData | null
  preference: UserPreferenceData | null
}
