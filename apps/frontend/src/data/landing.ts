export type ScholarshipCard = {
  id: string
  title: string
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
}

export type HowItWorksStep = {
  step: number
  title: string
  description: string
}

export type StatItem = {
  value: string
  label: string
}

export type TrustPoint = {
  title: string
  description: string
}

export type BenefitItem = {
  title: string
  description: string
}

export const navLinks = [
  { label: 'Scholarships', href: '/scholarships' },
  { label: 'Countries', href: '/countries' },
  { label: 'Guides', href: '/guides' },
  { label: 'About', href: '/about' },
] as const

export const heroPreviewScholarship = {
  title: 'Fully Funded Master Scholarship',
  hostCountry: 'Germany',
  deadline: 'March 15, 2026',
  verified: true,
}

export const degreeLevelOptions = [
  { value: '', label: 'All degree levels' },
  { value: 'bachelor', label: 'Bachelor' },
  { value: 'master', label: 'Master' },
  { value: 'phd', label: 'PhD' },
  { value: 'research', label: 'Research' },
] as const

export const countryOptions = [
  { value: '', label: 'All countries' },
  { value: 'germany', label: 'Germany' },
  { value: 'turkey', label: 'Türkiye' },
  { value: 'japan', label: 'Japan' },
  { value: 'qatar', label: 'Qatar' },
  { value: 'eu', label: 'European Union' },
] as const

export const fundingTypeOptions = [
  { value: '', label: 'All funding types' },
  { value: 'fully-funded', label: 'Fully funded' },
  { value: 'partial', label: 'Partial funding' },
  { value: 'tuition', label: 'Tuition only' },
  { value: 'stipend', label: 'Stipend' },
] as const

export const featuredScholarships: ScholarshipCard[] = [
  {
    id: 'daad',
    title: 'DAAD Scholarships in Germany',
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
    title: 'Discover scholarships',
    description:
      'Browse verified listings filtered by country, degree level, and funding type.',
  },
  {
    step: 2,
    title: 'Check eligibility',
    description:
      'Review requirements, deadlines, and official source links before you apply.',
  },
  {
    step: 3,
    title: 'Save and set reminders',
    description:
      'Bookmark opportunities and get deadline reminders so nothing slips through.',
  },
  {
    step: 4,
    title: 'Apply through official source',
    description:
      'Apply on the university or program website with confidence in verified details.',
  },
]

export const platformBenefits: BenefitItem[] = [
  {
    title: 'Afghan-first scholarship discovery',
    description:
      'Curated for Afghan students seeking global opportunities with relevant guidance.',
  },
  {
    title: 'Verified official sources',
    description:
      'Every listing links to official program pages reviewed by our team.',
  },
  {
    title: 'Deadline reminders',
    description:
      'Never miss an application window with email reminders for saved scholarships.',
  },
  {
    title: 'Simple application guidance',
    description:
      'Clear steps and checklists to help you prepare stronger applications.',
  },
  {
    title: 'Saved scholarship dashboard',
    description:
      'Organize saved opportunities and track your application progress in one place.',
  },
  {
    title: 'Guides and templates',
    description:
      'Practical guides for motivation letters, documents, and language requirements.',
  },
]

export const stats: StatItem[] = [
  { value: '500+', label: 'Scholarships planned' },
  { value: '50+', label: 'Countries' },
  { value: '100%', label: 'Free at launch' },
  { value: 'Verified', label: 'Source links' },
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
  },
  {
    id: 'no-ielts',
    title: 'Scholarships without IELTS',
    description:
      'Programs and pathways for students who need alternatives to English tests.',
    readTime: '6 min read',
  },
  {
    id: 'documents',
    title: 'How to prepare scholarship documents',
    description:
      'Transcripts, recommendations, CVs, and portfolios—what to prepare and when.',
    readTime: '10 min read',
  },
]

export const footerColumns = {
  platform: [
    { label: 'Scholarships', href: '/scholarships' },
    { label: 'Countries', href: '/countries' },
    { label: 'Guides', href: '/guides' },
  ],
  account: [
    { label: 'Sign in', href: '/auth/login' },
    { label: 'Create account', href: '/auth/signup' },
  ],
  legal: [
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
} as const
