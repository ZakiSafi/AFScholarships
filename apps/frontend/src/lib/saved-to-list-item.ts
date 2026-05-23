import type { SavedScholarshipEmbed } from '../features/saved/types'
import type { ScholarshipListItem } from '../features/scholarships/types'

export function savedEmbedToListItem(
  s: SavedScholarshipEmbed,
): ScholarshipListItem {
  return {
    ...s,
    description: s.summary,
    fieldOfStudy: [],
    eligibleCountries: [],
    isFeatured: false,
    applicationUrl: null,
    languageRequirement: null,
  }
}
