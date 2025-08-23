import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { TipEntry } from '../components/tips/registry';

export function useTipSearch() {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language as 'fr' | 'en';

  const searchTips = useMemo(() => {
    return (tips: TipEntry[], query: string): TipEntry[] => {
      if (!query.trim()) return tips;

      const searchTerm = query.toLowerCase().trim();
      
      return tips.filter(tip => {
        // Recherche dans le titre
        if (tip.title.toLowerCase().includes(searchTerm)) {
          return true;
        }
        
        // Recherche dans la description courte
        if (tip.shortDescription.toLowerCase().includes(searchTerm)) {
          return true;
        }
        
        // Recherche dans les keywords (constantes)
        if (tip.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchTerm)
        )) {
          return true;
        }
        
        // Recherche dans les métadonnées si elles existent
        if (tip.metadata?.searchKeywords) {
          const keywords = tip.metadata.searchKeywords[currentLanguage] || [];
          if (keywords.some(keyword => 
            keyword.toLowerCase().includes(searchTerm)
          )) {
            return true;
          }
        }
        
        return false;
      });
    };
  }, [currentLanguage]);

  return { searchTips, currentLanguage };
}
