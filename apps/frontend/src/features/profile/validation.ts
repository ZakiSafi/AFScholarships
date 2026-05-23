import { z } from 'zod'

const degreeLevelEnum = z.enum(['BACHELOR', 'MASTER', 'PHD', 'SHORT_COURSE'])

export const profileFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(120),
  bio: z.string().max(500).optional(),
  city: z.string().max(80).optional(),
  province: z.string().max(80).optional(),
  country: z.string().max(80).optional(),
  educationLevel: z.string().max(80).optional(),
  fieldOfStudy: z.string().max(120).optional(),
  targetDegree: degreeLevelEnum.optional().or(z.literal('')),
  targetCountry: z.string().max(80).optional(),
  linkedinUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
})

export const preferencesFormSchema = z.object({
  locale: z.string().min(2).max(10),
  timezone: z.string().min(1).max(64),
  emailDigestEnabled: z.boolean(),
  marketingOptIn: z.boolean(),
  preferredCountries: z.string().optional(),
  preferredDegreeLevels: z.array(degreeLevelEnum),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>
export type PreferencesFormValues = z.infer<typeof preferencesFormSchema>
