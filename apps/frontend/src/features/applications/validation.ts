import { z } from 'zod'

export const partnerApplicationSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.string().email('Enter a valid email'),
  phone: z.string().optional(),
  country: z.string().optional(),
  educationLevel: z.string().optional(),
  statement: z
    .string()
    .min(100, 'Statement should be at least 100 characters')
    .max(3000, 'Statement must be under 3000 characters'),
})

export type PartnerApplicationFormValues = z.infer<
  typeof partnerApplicationSchema
>
