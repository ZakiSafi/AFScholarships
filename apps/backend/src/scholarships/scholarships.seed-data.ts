import {
  DegreeLevel,
  FundingType,
  ScholarshipStatus,
  VerificationStatus,
} from '@prisma/client';

type SeedRequirement = {
  orderIndex: number;
  label: string;
  description: string;
  isMandatory?: boolean;
};

type SeedBenefit = {
  orderIndex: number;
  title: string;
  description: string;
};

type SeedFaq = { orderIndex: number; question: string; answer: string };

type SeedSource = { url: string; label: string };

type SeedTag = string;

export type ScholarshipSeed = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  provider: string;
  hostCountry: string;
  degreeLevel: DegreeLevel;
  fundingType: FundingType;
  languageRequirement?: string;
  fieldOfStudy: string[];
  eligibleCountries: string[];
  applicationUrl?: string;
  isPartnerApplication?: boolean;
  isFeatured?: boolean;
  deadlineMonth: number;
  deadlineDay: number;
  requirements: SeedRequirement[];
  benefits: SeedBenefit[];
  faqs: SeedFaq[];
  sources: SeedSource[];
  tags: SeedTag[];
  steps?: Array<{
    orderIndex: number;
    title: string;
    description: string;
  }>;
};

export const SCHOLARSHIP_SEEDS: ScholarshipSeed[] = [
  {
    slug: 'turkiye-burslari',
    title: 'Türkiye Bursları (Turkiye Scholarships)',
    summary:
      'Fully funded undergraduate and graduate programs in Türkiye with tuition, stipend, and accommodation.',
    description:
      'Türkiye Bursları is a government scholarship for international students to study at Turkish universities. Awards typically cover tuition, monthly stipend, accommodation, health insurance, and a one-time flight ticket. Programs are available in Turkish and English across many disciplines.',
    provider: 'Presidency for Turks Abroad and Related Communities (YTB)',
    hostCountry: 'Turkey',
    degreeLevel: DegreeLevel.MASTER,
    fundingType: FundingType.FULL,
    languageRequirement: 'Varies by program (Turkish or English)',
    fieldOfStudy: ['Engineering', 'Medicine', 'Social Sciences', 'Arts'],
    eligibleCountries: ['Afghanistan', 'Pakistan', 'Bangladesh', 'Uzbekistan'],
    applicationUrl: 'https://www.turkiyeburslari.gov.tr/',
    isFeatured: true,
    deadlineMonth: 11,
    deadlineDay: 20,
    requirements: [
      {
        orderIndex: 1,
        label: 'Eligible nationality',
        description: 'Citizens of eligible countries including Afghanistan.',
        isMandatory: true,
      },
      {
        orderIndex: 2,
        label: 'Academic merit',
        description: 'Strong secondary or university transcripts.',
        isMandatory: true,
      },
    ],
    benefits: [
      { orderIndex: 1, title: 'Tuition', description: 'University tuition covered.' },
      {
        orderIndex: 2,
        title: 'Monthly stipend',
        description: 'Living allowance during studies.',
      },
    ],
    faqs: [
      {
        orderIndex: 1,
        question: 'Do I need Turkish language?',
        answer: 'Many programs are in English; others require Turkish preparation year.',
      },
    ],
    sources: [
      {
        url: 'https://www.turkiyeburslari.gov.tr/',
        label: 'Official Türkiye Bursları portal',
      },
    ],
    tags: ['fully-funded', 'government'],
  },
  {
    slug: 'daad-development-masters-germany',
    title: 'DAAD EPOS Development-Related Postgraduate Courses',
    summary:
      'Master’s degrees in development-related fields at German universities with full funding.',
    description:
      'The DAAD EPOS program funds graduates from developing countries to pursue development-related master’s programs in Germany. Benefits include tuition, travel, monthly payments, insurance, and study allowances.',
    provider: 'DAAD (German Academic Exchange Service)',
    hostCountry: 'Germany',
    degreeLevel: DegreeLevel.MASTER,
    fundingType: FundingType.FULL,
    languageRequirement: 'English or German (program-dependent)',
    fieldOfStudy: ['Development', 'Public Policy', 'Economics', 'Engineering'],
    eligibleCountries: ['Afghanistan', 'Nepal', 'Ethiopia', 'Kenya'],
    applicationUrl: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/',
    isFeatured: true,
    deadlineMonth: 9,
    deadlineDay: 30,
    requirements: [
      {
        orderIndex: 1,
        label: 'Professional experience',
        description: 'Typically two years of relevant work experience.',
        isMandatory: true,
      },
      {
        orderIndex: 2,
        label: 'Bachelor’s degree',
        description: 'Completed degree in a related field.',
        isMandatory: true,
      },
    ],
    benefits: [
      { orderIndex: 1, title: 'Monthly stipend', description: '861 EUR per month (rate may vary).' },
      { orderIndex: 2, title: 'Travel allowance', description: 'Unless covered by home country.' },
    ],
    faqs: [
      {
        orderIndex: 1,
        question: 'Can I apply from Afghanistan?',
        answer: 'Yes, if Afghanistan is listed for your chosen EPOS course.',
      },
    ],
    sources: [
      {
        url: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/',
        label: 'DAAD scholarships',
      },
    ],
    tags: ['fully-funded', 'development'],
  },
  {
    slug: 'chevening-scholarships-uk',
    title: 'Chevening Scholarships (UK)',
    summary:
      'UK government scholarships for one-year master’s degrees at British universities.',
    description:
      'Chevening funds outstanding emerging leaders for a one-year master’s at any Chevening-eligible UK university. Covers tuition, monthly stipend, travel, and visa costs.',
    provider: 'UK Foreign, Commonwealth & Development Office',
    hostCountry: 'United Kingdom',
    degreeLevel: DegreeLevel.MASTER,
    fundingType: FundingType.FULL,
    languageRequirement: 'IELTS 6.5 overall (typical university requirement)',
    fieldOfStudy: ['Leadership', 'Public Policy', 'Law', 'Business'],
    eligibleCountries: ['Afghanistan', 'Pakistan', 'India', 'Nigeria'],
    applicationUrl: 'https://www.chevening.org/apply/',
    isFeatured: true,
    deadlineMonth: 10,
    deadlineDay: 7,
    requirements: [
      {
        orderIndex: 1,
        label: 'Work experience',
        description: 'Minimum two years (2,800 hours) of work experience.',
        isMandatory: true,
      },
      {
        orderIndex: 2,
        label: 'Return home',
        description: 'Commitment to return for at least two years after award.',
        isMandatory: true,
      },
    ],
    benefits: [
      { orderIndex: 1, title: 'Full tuition', description: 'University fees paid.' },
      { orderIndex: 2, title: 'Living costs', description: 'Monthly stipend in the UK.' },
    ],
    faqs: [],
    sources: [{ url: 'https://www.chevening.org/', label: 'Chevening official site' }],
    tags: ['fully-funded', 'government'],
  },
  {
    slug: 'fulbright-foreign-student-us',
    title: 'Fulbright Foreign Student Program (USA)',
    summary:
      'Graduate study and research in the United States for international students.',
    description:
      'The Fulbright Foreign Student Program enables graduate students and young professionals to study and conduct research in the U.S. Funding and eligibility are managed by Fulbright commissions or U.S. embassies in each country.',
    provider: 'U.S. Department of State / Fulbright Program',
    hostCountry: 'United States',
    degreeLevel: DegreeLevel.MASTER,
    fundingType: FundingType.FULL,
    languageRequirement: 'TOEFL/IELTS as required by host institution',
    fieldOfStudy: ['All fields', 'STEM', 'Arts', 'Social Sciences'],
    eligibleCountries: ['Afghanistan', 'Pakistan', 'Jordan', 'Morocco'],
    applicationUrl: 'https://foreign.fulbrightonline.org/',
    deadlineMonth: 3,
    deadlineDay: 1,
    requirements: [
      {
        orderIndex: 1,
        label: 'Bachelor’s degree',
        description: 'Completed undergraduate degree before program start.',
        isMandatory: true,
      },
    ],
    benefits: [
      { orderIndex: 1, title: 'Tuition & fees', description: 'Varies by country nomination.' },
      { orderIndex: 2, title: 'Living stipend', description: 'Health insurance often included.' },
    ],
    faqs: [],
    sources: [{ url: 'https://foreign.fulbrightonline.org/', label: 'Fulbright application' }],
    tags: ['fully-funded', 'government'],
  },
  {
    slug: 'mext-japan-undergraduate',
    title: 'MEXT Japanese Government Scholarship',
    summary:
      'Japanese government scholarships for undergraduate and research students.',
    description:
      'MEXT scholarships support international students for undergraduate, master’s, and research programs at Japanese universities. Benefits include tuition, monthly allowance, and travel.',
    provider: 'Ministry of Education, Culture, Sports, Science and Technology (Japan)',
    hostCountry: 'Japan',
    degreeLevel: DegreeLevel.BACHELOR,
    fundingType: FundingType.FULL,
    languageRequirement: 'Japanese language study may be required first',
    fieldOfStudy: ['Engineering', 'Japanese Studies', 'Sciences'],
    eligibleCountries: ['Afghanistan', 'Mongolia', 'Vietnam', 'Thailand'],
    applicationUrl: 'https://www.studyinjapan.go.jp/en/smap-stopj-applications-mext.html',
    deadlineMonth: 5,
    deadlineDay: 31,
    requirements: [
      {
        orderIndex: 1,
        label: 'Age limit',
        description: 'Varies by category; check embassy notice.',
        isMandatory: true,
      },
    ],
    benefits: [
      { orderIndex: 1, title: 'Monthly stipend', description: 'Set by MEXT annually.' },
      { orderIndex: 2, title: 'Tuition exemption', description: 'At designated institutions.' },
    ],
    faqs: [],
    sources: [
      {
        url: 'https://www.studyinjapan.go.jp/',
        label: 'Study in Japan official portal',
      },
    ],
    tags: ['fully-funded', 'government'],
  },
  {
    slug: 'erasmus-mundus-joint-masters',
    title: 'Erasmus Mundus Joint Master Degrees',
    summary:
      'Study in two or more European countries with a joint degree and mobility grant.',
    description:
      'Erasmus Mundus Joint Master Programs (EMJMD) offer integrated study across European universities. Scholarships cover participation costs, travel, and living allowance for top-ranked applicants.',
    provider: 'European Commission',
    hostCountry: 'European Union',
    degreeLevel: DegreeLevel.MASTER,
    fundingType: FundingType.FULL,
    languageRequirement: 'English (most programs)',
    fieldOfStudy: ['STEM', 'Sustainability', 'Data Science', 'Public Health'],
    eligibleCountries: ['Afghanistan', 'All non-EU eligible countries'],
    applicationUrl: 'https://www.eacea.ec.europa.eu/scholarships/emjmd-catalogue_en',
    isFeatured: true,
    deadlineMonth: 1,
    deadlineDay: 15,
    requirements: [
      {
        orderIndex: 1,
        label: 'Bachelor’s degree',
        description: '180 ECTS or equivalent before enrollment.',
        isMandatory: true,
      },
    ],
    benefits: [
      {
        orderIndex: 1,
        title: 'Scholarship',
        description: 'Covers tuition, travel, and installation costs when awarded.',
      },
    ],
    faqs: [],
    sources: [
      {
        url: 'https://www.eacea.ec.europa.eu/scholarships/emjmd-catalogue_en',
        label: 'EMJMD catalogue',
      },
    ],
    tags: ['fully-funded', 'europe'],
  },
  {
    slug: 'qatar-university-scholarships',
    title: 'Qatar University Scholarships for International Students',
    summary:
      'Merit-based awards for bachelor’s and master’s study at Qatar University.',
    description:
      'Qatar University offers competitive scholarships for international students including tuition support and stipends for qualified applicants in select colleges.',
    provider: 'Qatar University',
    hostCountry: 'Qatar',
    degreeLevel: DegreeLevel.BACHELOR,
    fundingType: FundingType.PARTIAL,
    languageRequirement: 'English proficiency for English-medium programs',
    fieldOfStudy: ['Engineering', 'Business', 'Pharmacy'],
    eligibleCountries: ['Afghanistan', 'GCC nationals', 'International'],
    applicationUrl: 'https://www.qu.edu.qa/en-us/students/admission/Pages/default.aspx',
    deadlineMonth: 3,
    deadlineDay: 30,
    requirements: [
      {
        orderIndex: 1,
        label: 'Academic GPA',
        description: 'Minimum GPA varies by college.',
        isMandatory: true,
      },
    ],
    benefits: [
      { orderIndex: 1, title: 'Tuition waiver', description: 'Partial or full for top candidates.' },
    ],
    faqs: [],
    sources: [{ url: 'https://www.qu.edu.qa/', label: 'Qatar University' }],
    tags: ['partial-funding'],
  },
  {
    slug: 'australia-awards-asia',
    title: 'Australia Awards Scholarships',
    summary:
      'Long-term development scholarships for study in Australia from partner countries.',
    description:
      'Australia Awards support individuals from developing countries to undertake full-time study at participating Australian institutions. Focus on fields that contribute to development priorities.',
    provider: 'Australian Department of Foreign Affairs and Trade',
    hostCountry: 'Australia',
    degreeLevel: DegreeLevel.MASTER,
    fundingType: FundingType.FULL,
    languageRequirement: 'IELTS or equivalent',
    fieldOfStudy: ['Health', 'Education', 'Governance', 'Agriculture'],
    eligibleCountries: ['Afghanistan', 'Bangladesh', 'Nepal', 'Pakistan'],
    applicationUrl: 'https://www.dfat.gov.au/people-to-people/australia-awards',
    deadlineMonth: 4,
    deadlineDay: 30,
    requirements: [
      {
        orderIndex: 1,
        label: 'Development focus',
        description: 'Alignment with bilateral development priorities.',
        isMandatory: true,
      },
    ],
    benefits: [
      { orderIndex: 1, title: 'Full award', description: 'Tuition, living costs, travel, OSHC.' },
    ],
    faqs: [],
    sources: [{ url: 'https://www.dfat.gov.au/', label: 'DFAT Australia Awards' }],
    tags: ['fully-funded', 'development'],
  },
  {
    slug: 'vanier-canada-graduate',
    title: 'Vanier Canada Graduate Scholarships',
    summary:
      'Prestigious doctoral scholarships for leadership and research excellence in Canada.',
    description:
      'The Vanier CGS program helps Canadian institutions attract highly qualified doctoral students. Nominees must be nominated by a Canadian university with a Vanier quota.',
    provider: 'Government of Canada',
    hostCountry: 'Canada',
    degreeLevel: DegreeLevel.PHD,
    fundingType: FundingType.FULL,
    languageRequirement: 'Institution requirements',
    fieldOfStudy: ['Health', 'Natural Sciences', 'Engineering', 'Social Sciences'],
    eligibleCountries: ['International', 'Canadian institutions nominate'],
    applicationUrl: 'https://vanier.gc.ca/en/home-accueil.html',
    deadlineMonth: 10,
    deadlineDay: 30,
    requirements: [
      {
        orderIndex: 1,
        label: 'Nomination',
        description: 'Must be nominated by a Canadian university.',
        isMandatory: true,
      },
    ],
    benefits: [
      { orderIndex: 1, title: 'CAD 50,000/year', description: 'For three years of doctoral study.' },
    ],
    faqs: [],
    sources: [{ url: 'https://vanier.gc.ca/', label: 'Vanier Canada' }],
    tags: ['fully-funded', 'phd'],
  },
  {
    slug: 'sweden-si-scholarships',
    title: 'Swedish Institute Scholarships for Global Professionals',
    summary:
      'Master’s scholarships for professionals from eligible countries to study in Sweden.',
    description:
      'The Swedish Institute (SI) scholarships cover tuition and living expenses for master’s programs starting in Sweden. Targeted at applicants with demonstrated work and leadership experience.',
    provider: 'Swedish Institute',
    hostCountry: 'Sweden',
    degreeLevel: DegreeLevel.MASTER,
    fundingType: FundingType.FULL,
    languageRequirement: 'English (program-dependent)',
    fieldOfStudy: ['Sustainability', 'Human Rights', 'Innovation'],
    eligibleCountries: ['Afghanistan', 'Bangladesh', 'Egypt', 'Indonesia'],
    applicationUrl: 'https://si.se/en/apply/scholarships/',
    deadlineMonth: 2,
    deadlineDay: 28,
    requirements: [
      {
        orderIndex: 1,
        label: 'Work experience',
        description: 'Minimum 3,000 hours of employment.',
        isMandatory: true,
      },
    ],
    benefits: [
      { orderIndex: 1, title: 'Tuition & living', description: 'Full coverage for SI scholars.' },
    ],
    faqs: [],
    sources: [{ url: 'https://si.se/', label: 'Swedish Institute' }],
    tags: ['fully-funded'],
  },
  {
    slug: 'netherlands-orange-knowledge',
    title: 'Orange Knowledge Programme (Netherlands)',
    summary:
      'Dutch-funded scholarships for mid-career professionals from OKP countries.',
    description:
      'The Orange Knowledge Programme offers funding for short courses and master’s programs in the Netherlands, focusing on capacity building in eligible countries.',
    provider: 'Nuffic / Dutch Ministry of Foreign Affairs',
    hostCountry: 'Netherlands',
    degreeLevel: DegreeLevel.MASTER,
    fundingType: FundingType.FULL,
    languageRequirement: 'English or Dutch',
    fieldOfStudy: ['Agriculture', 'Water', 'Security', 'Rule of Law'],
    eligibleCountries: ['Afghanistan', 'Bangladesh', 'Ethiopia', 'Kenya'],
    applicationUrl: 'https://www.studyinholland.nl/orange-knowledge-programme',
    deadlineMonth: 6,
    deadlineDay: 15,
    requirements: [
      {
        orderIndex: 1,
        label: 'Employer support',
        description: 'Employer statement often required.',
        isMandatory: true,
      },
    ],
    benefits: [
      { orderIndex: 1, title: 'Full funding', description: 'Fees, subsistence, travel, insurance.' },
    ],
    faqs: [],
    sources: [{ url: 'https://www.studyinholland.nl/', label: 'Study in Holland' }],
    tags: ['fully-funded', 'development'],
  },
  {
    slug: 'korea-gks-global',
    title: 'Global Korea Scholarship (GKS)',
    summary:
      'Korean government scholarship for undergraduate and graduate study in Korea.',
    description:
      'GKS (formerly KGSP) supports international students for degree programs at designated Korean universities with airfare, tuition, settlement allowance, and monthly stipend.',
    provider: 'National Institute for International Education (NIIED)',
    hostCountry: 'South Korea',
    degreeLevel: DegreeLevel.MASTER,
    fundingType: FundingType.FULL,
    languageRequirement: 'Korean or English track',
    fieldOfStudy: ['Engineering', 'Korean Studies', 'Business'],
    eligibleCountries: ['Afghanistan', 'Pakistan', 'Uzbekistan', 'Nepal'],
    applicationUrl: 'https://www.studyinkorea.go.kr/',
    deadlineMonth: 2,
    deadlineDay: 28,
    requirements: [
      {
        orderIndex: 1,
        label: 'Health requirements',
        description: 'Medical check for visa and enrollment.',
        isMandatory: true,
      },
    ],
    benefits: [
      { orderIndex: 1, title: 'Monthly allowance', description: 'Degree-level stipend provided.' },
    ],
    faqs: [],
    sources: [{ url: 'https://www.studyinkorea.go.kr/', label: 'Study in Korea' }],
    tags: ['fully-funded', 'government'],
  },
  {
    slug: 'hungary-stipendium-hungaricum',
    title: 'Stipendium Hungaricum Scholarship',
    summary:
      'Hungarian government scholarship for bachelor’s, master’s, and PhD study.',
    description:
      'Stipendium Hungaricum offers tuition-free study at Hungarian universities with monthly stipend, dormitory place or housing contribution, and medical insurance.',
    provider: 'Tempus Public Foundation / Hungary',
    hostCountry: 'Hungary',
    degreeLevel: DegreeLevel.BACHELOR,
    fundingType: FundingType.FULL,
    languageRequirement: 'English or Hungarian programs available',
    fieldOfStudy: ['Medicine', 'Engineering', 'Arts'],
    eligibleCountries: ['Afghanistan', 'Pakistan', 'Egypt', 'Nigeria'],
    applicationUrl: 'https://stipendiumhungaricum.hu/',
    isFeatured: true,
    deadlineMonth: 1,
    deadlineDay: 15,
    requirements: [
      {
        orderIndex: 1,
        label: 'Online application',
        description: 'Apply via Tempus portal and send documents to embassy.',
        isMandatory: true,
      },
    ],
    benefits: [
      { orderIndex: 1, title: 'Tuition-free', description: 'At partner institutions.' },
      { orderIndex: 2, title: 'Monthly HUF stipend', description: 'Paid for duration of studies.' },
    ],
    faqs: [],
    sources: [{ url: 'https://stipendiumhungaricum.hu/', label: 'Official programme site' }],
    tags: ['fully-funded', 'government'],
  },
  {
    slug: 'france-eiffel-excellence',
    title: 'Eiffel Excellence Scholarship Programme',
    summary:
      'French Ministry scholarship for master’s and PhD applicants to French institutions.',
    description:
      'The Eiffel Programme supports future foreign decision-makers in priority areas. French higher education institutions submit applications on behalf of candidates.',
    provider: 'Campus France / French Ministry for Europe and Foreign Affairs',
    hostCountry: 'France',
    degreeLevel: DegreeLevel.MASTER,
    fundingType: FundingType.FULL,
    languageRequirement: 'French or English programs',
    fieldOfStudy: ['Engineering', 'Law', 'Economics', 'Political Science'],
    eligibleCountries: ['Afghanistan', 'International (via French institution)'],
    applicationUrl: 'https://www.campusfrance.org/en/eiffel-scholarship-program',
    deadlineMonth: 1,
    deadlineDay: 10,
    requirements: [
      {
        orderIndex: 1,
        label: 'Institutional nomination',
        description: 'Apply through a French university that submits the Eiffel dossier.',
        isMandatory: true,
      },
    ],
    benefits: [
      { orderIndex: 1, title: 'Monthly allowance', description: 'EUR 1,181 master / 1,700 PhD (rates vary).' },
    ],
    faqs: [],
    sources: [{ url: 'https://www.campusfrance.org/', label: 'Campus France' }],
    tags: ['fully-funded'],
  },
  {
    slug: 'mastercard-foundation-scholars',
    title: 'Mastercard Foundation Scholars Program',
    summary:
      'Comprehensive scholarships at partner universities for academically talented youth.',
    description:
      'The Mastercard Foundation Scholars Program provides holistic support—tuition, living expenses, leadership training—at partner institutions across Africa and globally.',
    provider: 'Mastercard Foundation',
    hostCountry: 'Multiple',
    degreeLevel: DegreeLevel.BACHELOR,
    fundingType: FundingType.FULL,
    languageRequirement: 'Institution-specific',
    fieldOfStudy: ['All fields at partner universities'],
    eligibleCountries: ['Afghanistan', 'Sub-Saharan Africa', 'Partner criteria'],
    applicationUrl: 'https://mastercardfdn.org/all/scholars/',
    deadlineMonth: 12,
    deadlineDay: 1,
    requirements: [
      {
        orderIndex: 1,
        label: 'Financial need',
        description: 'Demonstrated economic disadvantage.',
        isMandatory: true,
      },
    ],
    benefits: [
      { orderIndex: 1, title: 'Full package', description: 'Tuition, accommodation, mentoring.' },
    ],
    faqs: [],
    sources: [{ url: 'https://mastercardfdn.org/', label: 'Mastercard Foundation' }],
    tags: ['fully-funded'],
  },
  {
    slug: 'commonwealth-shared-uk',
    title: 'Commonwealth Shared Scholarships (UK)',
    summary:
      'UK master’s scholarships for students from lower and middle income Commonwealth countries.',
    description:
      'Funded by the UK FCDO, Shared Scholarships cover tuition and living costs for master’s study on selected courses at participating UK universities.',
    provider: 'Commonwealth Scholarship Commission',
    hostCountry: 'United Kingdom',
    degreeLevel: DegreeLevel.MASTER,
    fundingType: FundingType.FULL,
    languageRequirement: 'IELTS as required by course',
    fieldOfStudy: ['Development', 'Health', 'STEM', 'Education'],
    eligibleCountries: ['Afghanistan', 'Bangladesh', 'Pakistan', 'Nigeria'],
    applicationUrl: 'https://cscuk.fcdo.gov.uk/scholarships/commonwealth-shared-scholarships/',
    deadlineMonth: 3,
    deadlineDay: 15,
    requirements: [
      {
        orderIndex: 1,
        label: 'Unable to afford UK study',
        description: 'Must demonstrate financial need.',
        isMandatory: true,
      },
    ],
    benefits: [
      { orderIndex: 1, title: 'Approved costs', description: 'Tuition, stipend, travel where applicable.' },
    ],
    faqs: [],
    sources: [{ url: 'https://cscuk.fcdo.gov.uk/', label: 'CSC UK' }],
    tags: ['fully-funded', 'commonwealth'],
  },
  {
    slug: 'norwegian-quota-scheme',
    title: 'Norwegian Quota Scheme Scholarships',
    summary:
      'Study opportunities in Norway for students from developing countries in the Quota Scheme.',
    description:
      'The Quota Scheme supports students from partner countries at bachelor’s and master’s level at participating Norwegian institutions, covering living costs and travel for eligible recipients.',
    provider: 'Norwegian Directorate for Higher Education and Skills',
    hostCountry: 'Norway',
    degreeLevel: DegreeLevel.MASTER,
    fundingType: FundingType.FULL,
    languageRequirement: 'English-taught programs available',
    fieldOfStudy: ['Energy', 'Marine Sciences', 'Peace Studies'],
    eligibleCountries: ['Afghanistan', 'Nepal', 'Ethiopia', 'Tanzania'],
    applicationUrl: 'https://www.studyinnorway.no/',
    deadlineMonth: 11,
    deadlineDay: 15,
    requirements: [
      {
        orderIndex: 1,
        label: 'Return clause',
        description: 'Must return home after studies per scheme rules.',
        isMandatory: true,
      },
    ],
    benefits: [
      { orderIndex: 1, title: 'Living grant', description: 'Covers expenses in Norway.' },
    ],
    faqs: [],
    sources: [{ url: 'https://www.studyinnorway.no/', label: 'Study in Norway' }],
    tags: ['fully-funded'],
  },
  {
    slug: 'uae-moe-scholarship',
    title: 'UAE Ministry of Education Scholarships',
    summary:
      'Scholarships for outstanding international students at UAE public universities.',
    description:
      'The UAE offers competitive scholarships for bachelor’s and master’s programs in fields aligned with national priorities, including STEM and health sciences.',
    provider: 'UAE Ministry of Education',
    hostCountry: 'United Arab Emirates',
    degreeLevel: DegreeLevel.BACHELOR,
    fundingType: FundingType.PARTIAL,
    languageRequirement: 'English',
    fieldOfStudy: ['Engineering', 'Medicine', 'Business'],
    eligibleCountries: ['Afghanistan', 'Arab region', 'International'],
    applicationUrl: 'https://www.moe.gov.ae/',
    deadlineMonth: 6,
    deadlineDay: 30,
    requirements: [
      {
        orderIndex: 1,
        label: 'Academic excellence',
        description: 'High GPA and standardized scores where required.',
        isMandatory: true,
      },
    ],
    benefits: [
      { orderIndex: 1, title: 'Tuition support', description: 'Varies by university offer.' },
    ],
    faqs: [],
    sources: [{ url: 'https://www.moe.gov.ae/', label: 'UAE MOE' }],
    tags: ['partial-funding', 'gulf'],
  },
  {
    slug: 'malaysia-international-scholarship',
    title: 'Malaysia International Scholarship (MIS)',
    summary:
      'Malaysian government scholarship for postgraduate study at Malaysian universities.',
    description:
      'MIS invites talented international students to pursue master’s and PhD degrees in Malaysia with tuition and monthly allowances for successful candidates.',
    provider: 'Malaysia Ministry of Higher Education',
    hostCountry: 'Malaysia',
    degreeLevel: DegreeLevel.MASTER,
    fundingType: FundingType.FULL,
    languageRequirement: 'English',
    fieldOfStudy: ['Engineering', 'Islamic Finance', 'Biotechnology'],
    eligibleCountries: ['Afghanistan', 'ASEAN', 'Middle East', 'Africa'],
    applicationUrl: 'https://www.mohe.gov.my/',
    deadlineMonth: 5,
    deadlineDay: 15,
    requirements: [
      {
        orderIndex: 1,
        label: 'Offer letter',
        description: 'Unconditional offer from Malaysian university often required.',
        isMandatory: true,
      },
    ],
    benefits: [
      { orderIndex: 1, title: 'Allowances', description: 'Tuition and living costs covered.' },
    ],
    faqs: [],
    sources: [{ url: 'https://www.mohe.gov.my/', label: 'MOHE Malaysia' }],
    tags: ['fully-funded'],
  },
  {
    slug: 'afscholars-partner-program',
    title: 'AfScholarships Partner Opportunity Program',
    summary:
      'Apply in-platform for partner-managed intake rounds with direct status tracking.',
    description:
      'This partner program lets Afghan students submit a profile and motivation statement through AfScholarships. Our partner network reviews submissions and updates your application timeline in your dashboard.',
    provider: 'AfScholarships Partners',
    hostCountry: 'Global',
    degreeLevel: DegreeLevel.BACHELOR,
    fundingType: FundingType.PARTIAL,
    languageRequirement: 'English recommended',
    fieldOfStudy: ['Computer Science', 'Business', 'Public Health'],
    eligibleCountries: ['Afghanistan'],
    isPartnerApplication: true,
    isFeatured: true,
    deadlineMonth: 8,
    deadlineDay: 15,
    requirements: [
      {
        orderIndex: 1,
        label: 'Afghanistan connection',
        description: 'Open to Afghan students and recent graduates.',
        isMandatory: true,
      },
      {
        orderIndex: 2,
        label: 'Motivation statement',
        description: 'Submitted through the in-platform application form.',
        isMandatory: true,
      },
    ],
    benefits: [
      {
        orderIndex: 1,
        title: 'Guided intake',
        description: 'Structured review with timeline updates in your dashboard.',
      },
    ],
    faqs: [
      {
        orderIndex: 1,
        question: 'Can I track my application?',
        answer: 'Yes—status updates appear under Dashboard → Applications.',
      },
    ],
    sources: [
      {
        url: 'https://afscholarships.dev',
        label: 'AfScholarships platform',
      },
    ],
    tags: ['apply-in-app', 'partner'],
    steps: [
      {
        orderIndex: 1,
        title: 'Complete your profile',
        description: 'Add education history and contact details under Dashboard → Profile.',
      },
      {
        orderIndex: 2,
        title: 'Submit in-platform application',
        description: 'Use the Apply in-platform button on this listing.',
      },
      {
        orderIndex: 3,
        title: 'Track your status',
        description: 'Partner reviewers update your timeline within 2–4 weeks.',
      },
    ],
  },
];

export const SEED_TAG_DEFINITIONS: Record<string, string> = {
  'fully-funded': 'Fully funded',
  'partial-funding': 'Partial funding',
  government: 'Government',
  development: 'Development',
  europe: 'Europe',
  'apply-in-app': 'Apply in-app',
  partner: 'Partner',
  commonwealth: 'Commonwealth',
  gulf: 'Gulf region',
  phd: 'PhD',
};
