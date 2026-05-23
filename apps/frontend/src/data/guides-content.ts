export type GuideArticle = {
  slug: string
  title: string
  description: string
  readTime: string
  category: string
  sections: Array<{ heading: string; body: string }>
}

export const guideArticles: GuideArticle[] = [
  {
    slug: 'motivation-letter',
    title: 'How to write a motivation letter',
    description:
      'Structure, tone, and examples for scholarship motivation letters that stand out.',
    readTime: '8 min read',
    category: 'Application',
    sections: [
      {
        heading: 'Start with a clear purpose',
        body: 'Open with who you are, your field of study, and the specific program you are applying for. Avoid generic openings like “I have always dreamed of studying abroad.” Instead, name the opportunity and your concrete goal.',
      },
      {
        heading: 'Connect your story to the program',
        body: 'Explain how your academic background, work, or community experience prepares you for this scholarship. Use one or two specific examples—not a full biography.',
      },
      {
        heading: 'Show impact and return',
        body: 'Many scholarships value how you will contribute after graduation. If relevant, describe how you plan to support your community or field in Afghanistan or abroad.',
      },
      {
        heading: 'Keep it concise and proofread',
        body: 'Most motivation letters are 500–800 words. Use short paragraphs, active voice, and ask someone you trust to review grammar and clarity before you submit.',
      },
    ],
  },
  {
    slug: 'no-ielts',
    title: 'Scholarships without IELTS',
    description:
      'Programs and pathways for students who need alternatives to English tests.',
    readTime: '6 min read',
    category: 'Eligibility',
    sections: [
      {
        heading: 'Check the official requirement',
        body: 'Some governments and universities waive English tests if your previous degree was taught in English, or if you complete an internal language assessment. Always confirm on the official program page—not social media reposts.',
      },
      {
        heading: 'Use filters on AfScholarships',
        body: 'Search the catalog and read each listing’s language requirement. Partner programs on our platform may state “English recommended” rather than a fixed IELTS score at screening.',
      },
      {
        heading: 'Prepare alternatives',
        body: 'If a waiver is not available, consider Duolingo English Test, university-specific tests, or a preparatory language year (common in Türkiye, Germany, and Korea).',
      },
    ],
  },
  {
    slug: 'documents',
    title: 'How to prepare scholarship documents',
    description:
      'Transcripts, recommendations, CVs, and portfolios—what to prepare and when.',
    readTime: '10 min read',
    category: 'Documents',
    sections: [
      {
        heading: 'Core document checklist',
        body: 'Most applications require: national ID or passport, academic transcripts (often translated), CV, motivation letter, and two recommendation letters. STEM programs may ask for portfolios or research proposals.',
      },
      {
        heading: 'Translations and legalization',
        body: 'Embassies and universities may require certified translations or apostille stamps. Start early—this step often takes weeks in Afghanistan.',
      },
      {
        heading: 'Organize before deadlines',
        body: 'Save PDFs in a single folder named by program. Use AfScholarships reminders on listings you save so you submit before the official deadline, not the day it closes.',
      },
    ],
  },
]

export function getGuideBySlug(slug: string): GuideArticle | undefined {
  return guideArticles.find((g) => g.slug === slug)
}
