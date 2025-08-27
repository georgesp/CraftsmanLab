// Version simplifiée du moteur de recherche basée sur les métadonnées
// Utilise uniquement les registres avec searchKeywords pour une recherche optimisée

export type SearchKind = 'tip' | 'prompt';

export type SearchHit = {
  kind: SearchKind;
  slug: string;
  title: string;
  shortDescription: string;
};

// Métadonnées fiables via les registres existants
import { tipsList } from '../components/tips/registry';
import { promptsList } from '../components/prompts/registry';
import i18n from '../i18n';

// Fonction pour obtenir la langue actuelle
function getCurrentLanguage(): 'fr' | 'en' {
  // Récupérer la langue depuis localStorage ou navigateur
  const stored = localStorage.getItem('i18nextLng');
  if (stored && (stored === 'fr' || stored === 'en')) return stored;

  // Fallback sur la langue du navigateur
  const browserLang = navigator.language.toLowerCase();
  return browserLang.startsWith('fr') ? 'fr' : 'en';
}

// Helper function to get translated text with fallback - tips
function getTipTranslation(tipSlug: string, key: string, fallback: string): string {
  const translationKey = `${tipSlug}.${key}`;
  const translated = i18n.t(translationKey, { ns: 'tips', defaultValue: '' });
  return translated || fallback;
}

// Helper function to get translated text with fallback - prompts
function getPromptTranslation(promptSlug: string, key: string, fallback: string): string {
  const translationKey = `${promptSlug}.${key}`;
  const translated = i18n.t(translationKey, { ns: 'prompts', defaultValue: '' });
  return translated || fallback;
}

type IndexedItem = {
  kind: SearchKind;
  slug: string;
  title: string;
  shortDescription: string;
  searchKeywords?: {
    fr: string[];
    en: string[];
  };
};

function buildIndex(): IndexedItem[] {
  const items: IndexedItem[] = [];

  // Indexer à partir des registres uniquement (plus simple et plus fiable)
  for (const t of tipsList) {
    if (t.slug === 'more') continue; // exclude placeholder entries
    items.push({
      kind: 'tip',
      slug: t.slug,
      title: getTipTranslation(t.slug, 'title', t.title),
      shortDescription: getTipTranslation(t.slug, 'shortDescription', t.shortDescription),
      searchKeywords: t.metadata?.searchKeywords,
    });
  }

  for (const p of promptsList) {
    if (p.slug === 'more') continue; // exclude placeholder entries
    items.push({
      kind: 'prompt',
      slug: p.slug,
      title: getPromptTranslation(p.slug, 'title', p.title),
      shortDescription: getPromptTranslation(p.slug, 'shortDescription', p.shortDescription),
      searchKeywords: p.metadata?.searchKeywords,
    });
  }

  return items;
}

const INDEX: IndexedItem[] = buildIndex();

export function searchAll(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const currentLang = getCurrentLanguage();

  const matched = INDEX.filter((item) => {
    // 1. Recherche dans le titre (priorité haute)
    if (item.title.toLowerCase().includes(q)) {
      return true;
    }

    // 2. Recherche dans la description courte (priorité moyenne)
    if (item.shortDescription.toLowerCase().includes(q)) {
      return true;
    }

    // 3. Recherche dans les métadonnées searchKeywords (priorité haute)
    if (item.searchKeywords) {
      const keywords = item.searchKeywords[currentLang] || [];
      if (keywords.some((keyword) => keyword.toLowerCase().includes(q))) {
        return true;
      }
    }

    return false;
  });

  // Tri par pertinence : tips d'abord, puis par titre
  matched.sort((a, b) => {
    // Priorité aux tips
    if (a.kind !== b.kind) {
      return a.kind === 'tip' ? -1 : 1;
    }

    // Ensuite, priorité aux correspondances exactes dans le titre
    const aInTitle = a.title.toLowerCase().includes(q);
    const bInTitle = b.title.toLowerCase().includes(q);
    if (aInTitle !== bInTitle) {
      return aInTitle ? -1 : 1;
    }

    // Ensuite, priorité aux correspondances dans les métadonnées
    const aInKeywords =
      a.searchKeywords?.[currentLang]?.some((k) => k.toLowerCase().includes(q)) || false;
    const bInKeywords =
      b.searchKeywords?.[currentLang]?.some((k) => k.toLowerCase().includes(q)) || false;
    if (aInKeywords !== bInKeywords) {
      return aInKeywords ? -1 : 1;
    }

    // Enfin, tri alphabétique par titre
    return a.title.localeCompare(b.title);
  });

  // Mapper vers SearchHit
  return matched.map((item) => ({
    kind: item.kind,
    slug: item.slug,
    title: item.title,
    shortDescription: item.shortDescription,
  }));
}
