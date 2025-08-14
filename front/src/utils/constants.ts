// Centralized application constants
// Add global, reusable constants here to keep configuration and references in one place.

export const CONTACT_EMAIL = 'contact@craftsmanlab.fr';

// Keywords type for categorizing tips and prompts
export type Keyword = 'C#' | 'SQL';

// Available keywords list
export const AVAILABLE_KEYWORDS: readonly Keyword[] = ['C#', 'SQL'] as const;
