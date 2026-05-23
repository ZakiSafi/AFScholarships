export type ScholarshipCard = {
  id: string
  title: string
  description: string
  hostCountry: string
  degreeLevel: string
  fundingType: string
  deadline: string
  tags: string[]
  verified: boolean
}

export type GuideCard = {
  id: string
  title: string
  description: string
  readTime: string
  category: string
}

export type HowItWorksStep = {
  step: number
  title: string
  description: string
}

export type TrustPoint = {
  title: string
  description: string
}

export type BenefitItem = {
  title: string
  description: string
}

export type DestinationCard = {
  id: string
  name: string
  description: string
  href: string
}

export type HeroDocument = {
  label: string
  done: boolean
}

export const navLinks = [
  { label: 'Scholarships', href: '/scholarships' },
  { label: 'Countries', href: '/countries' },
  { label: 'Guides', href: '/guides' },
  { label: 'About', href: '/about' },
] as const

export const heroScholarship = {
  title: 'Türkiye Scholarships 2026',
  country: 'Türkiye',
  funding: 'Fully funded',
  degree: 'Bachelor, Master, PhD',
  deadline: 'Feb 20, 2026',
  profileMatch: 86,
}

export const heroCountryChips = ['Germany', 'Türkiye', 'Japan', 'Qatar'] as const

export const heroDocuments: HeroDocument[] = [
  { label: 'Passport', done: true },
  { label: 'Transcript', done: true },
  { label: 'Motivation letter', done: false },
]

export const heroTrustIndicators = [
  'Verified source links',
  'Deadline reminders',
  'Free for students',
] as const

/** @deprecated Use HeroStats component (loads from API) */
export const heroStats = [
  { value: '—', label: 'Scholarships' },
  { value: '—', label: 'Countries' },
  { value: '100%', label: 'Free to use' },
] as const

export const degreeLevelOptions = [
  { value: '', label: 'All degree levels' },
  { value: 'BACHELOR', label: 'Bachelor' },
  { value: 'MASTER', label: 'Master' },
  { value: 'PHD', label: 'PhD' },
  { value: 'SHORT_COURSE', label: 'Short course' },
] as const

export const countryOptions = [
  { value: '', label: 'All countries' },
  { value: 'Turkey', label: 'Türkiye' },
  { value: 'Germany', label: 'Germany' },
  { value: 'Japan', label: 'Japan' },
  { value: 'Qatar', label: 'Qatar' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'United States', label: 'United States' },
  { value: 'Global', label: 'Global' },
] as const

export const fundingTypeOptions = [
  { value: '', label: 'All funding types' },
  { value: 'FULL', label: 'Fully funded' },
  { value: 'PARTIAL', label: 'Partial funding' },
  { value: 'TUITION_ONLY', label: 'Tuition only' },
  { value: 'STIPEND_ONLY', label: 'Stipend' },
] as const

export const quickFilterChips = [
  'Fully funded',
  'Without IELTS',
  'Bachelor',
  'Master',
  'Germany',
  'Türkiye',
  'Deadline this month',
] as const

export const featuredScholarships: ScholarshipCard[] = [
  {
    id: 'daad',
    title: 'DAAD Scholarships in Germany',
    description:
      'Government-funded programs for international graduates pursuing study and research in Germany.',
    hostCountry: 'Germany',
    degreeLevel: 'Master, PhD',
    fundingType: 'Fully funded',
    deadline: 'Oct 15, 2026',
    tags: ['STEM', 'Development'],
    verified: true,
  },
  {
    id: 'turkiye',
    title: 'Türkiye Scholarships',
    description:
      'Comprehensive scholarships covering tuition, accommodation, health insurance, and monthly stipend.',
    hostCountry: 'Türkiye',
    degreeLevel: 'Bachelor, Master, PhD',
    fundingType: 'Fully funded',
    deadline: 'Feb 20, 2026',
    tags: ['Popular', 'All fields'],
    verified: true,
  },
  {
    id: 'erasmus',
    title: 'Erasmus Mundus Joint Masters',
    description:
      'Study in multiple European universities with a joint degree and full mobility grant.',
    hostCountry: 'European Union',
    degreeLevel: 'Master',
    fundingType: 'Full scholarship',
    deadline: 'Jan 10, 2026',
    tags: ['Joint degree', 'EU'],
    verified: true,
  },
  {
    id: 'qatar',
    title: 'Qatar University Scholarships',
    description:
      'Merit-based awards for outstanding international students at Qatar University.',
    hostCountry: 'Qatar',
    degreeLevel: 'Bachelor, Master',
    fundingType: 'Tuition + stipend',
    deadline: 'Apr 1, 2026',
    tags: ['Gulf region'],
    verified: true,
  },
  {
    id: 'mext',
    title: 'MEXT Japan Scholarships',
    description:
      'Japanese government scholarship for undergraduate and research students nationwide.',
    hostCountry: 'Japan',
    degreeLevel: 'Undergraduate, Research',
    fundingType: 'Fully funded',
    deadline: 'May 31, 2026',
    tags: ['Government', 'Asia'],
    verified: true,
  },
  {
    id: 'adb',
    title: 'Asian Development Bank Scholarship',
    description:
      'Postgraduate scholarships in development-related fields at partner universities.',
    hostCountry: 'Multiple',
    degreeLevel: 'Master',
    fundingType: 'Full tuition + living',
    deadline: 'Jul 15, 2026',
    tags: ['Development', 'Economics'],
    verified: true,
  },
]

export const howItWorksSteps: HowItWorksStep[] = [
  {
    step: 1,
    title: 'Discover verified scholarships',
    description:
      'Search and filter opportunities by country, degree, funding, and deadline.',
  },
  {
    step: 2,
    title: 'Check requirements and documents',
    description:
      'Review eligibility, required documents, and official source links in one place.',
  },
  {
    step: 3,
    title: 'Save and set deadline reminders',
    description:
      'Bookmark scholarships and get notified before important deadlines.',
  },
  {
    step: 4,
    title: 'Apply through official sources',
    description:
      'Apply directly on university or government websites with verified information.',
  },
]

export const platformBenefits: BenefitItem[] = [
  {
    title: 'Afghan-first discovery',
    description:
      'Built for Afghan students navigating global opportunities with relevant context.',
  },
  {
    title: 'Verified source links',
    description:
      'Every listing links to official program pages—not unreliable aggregators.',
  },
  {
    title: 'Deadline reminders',
    description:
      'Email reminders for saved scholarships so you never miss a window.',
  },
  {
    title: 'Application guidance',
    description:
      'Step-by-step checklists and tips for stronger applications.',
  },
  {
    title: 'Saved dashboard',
    description:
      'Organize saved opportunities and track progress in one place.',
  },
  {
    title: 'Guides and templates',
    description:
      'Motivation letters, documents, and language requirement resources.',
  },
]

function catalogCountryHref(country: string): string {
  return `/scholarships?country=${encodeURIComponent(country)}`
}

export const popularDestinations: DestinationCard[] = [
  {
    id: 'germany',
    name: 'Germany',
    description: 'Scholarships, universities, and funding options',
    href: catalogCountryHref('Germany'),
  },
  {
    id: 'turkiye',
    name: 'Türkiye',
    description: 'Scholarships, universities, and funding options',
    href: catalogCountryHref('Turkey'),
  },
  {
    id: 'japan',
    name: 'Japan',
    description: 'Scholarships, universities, and funding options',
    href: catalogCountryHref('Japan'),
  },
  {
    id: 'qatar',
    name: 'Qatar',
    description: 'Scholarships, universities, and funding options',
    href: catalogCountryHref('Qatar'),
  },
  {
    id: 'uk',
    name: 'United Kingdom',
    description: 'Scholarships, universities, and funding options',
    href: catalogCountryHref('United Kingdom'),
  },
  {
    id: 'us',
    name: 'United States',
    description: 'Scholarships, universities, and funding options',
    href: catalogCountryHref('United States'),
  },
  {
    id: 'canada',
    name: 'Canada',
    description: 'Scholarships, universities, and funding options',
    href: catalogCountryHref('Canada'),
  },
  {
    id: 'australia',
    name: 'Australia',
    description: 'Scholarships, universities, and funding options',
    href: catalogCountryHref('Australia'),
  },
]

export const trustPoints: TrustPoint[] = [
  {
    title: 'Official source links',
    description:
      'Each scholarship points to the university or government program page—not third-party aggregators.',
  },
  {
    title: 'Last updated dates',
    description:
      'Listings show when details were last checked so you know the information is current.',
  },
  {
    title: 'Report suspicious listings',
    description:
      'Community reports help us remove outdated or misleading opportunities quickly.',
  },
  {
    title: 'Admin verification workflow',
    description:
      'Our moderation team reviews new and updated listings before they go live.',
  },
]

export const guides: GuideCard[] = [
  {
    id: 'motivation-letter',
    title: 'How to write a motivation letter',
    description:
      'Structure, tone, and examples for scholarship motivation letters that stand out.',
    readTime: '8 min read',
    category: 'Application',
  },
  {
    id: 'no-ielts',
    title: 'Scholarships without IELTS',
    description:
      'Programs and pathways for students who need alternatives to English tests.',
    readTime: '6 min read',
    category: 'Eligibility',
  },
  {
    id: 'documents',
    title: 'How to prepare scholarship documents',
    description:
      'Transcripts, recommendations, CVs, and portfolios—what to prepare and when.',
    readTime: '10 min read',
    category: 'Documents',
  },
]

export const footerColumns = {
  platform: [
    { label: 'Scholarships', href: '/scholarships' },
    { label: 'Countries', href: '/countries' },
    { label: 'Guides', href: '/guides' },
    { label: 'About', href: '/about' },
  ],
  account: [
    { label: 'Sign in', href: '/auth/login' },
    { label: 'Create account', href: '/auth/signup' },
    { label: 'Saved scholarships', href: '/scholarships' },
  ],
  resources: [
    { label: 'Motivation letter guide', href: '/guides/motivation-letter' },
    { label: 'Scholarship documents', href: '/guides/documents' },
    { label: 'Without IELTS', href: '/guides/no-ielts' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Contact', href: '/about' },
  ],
} as const
