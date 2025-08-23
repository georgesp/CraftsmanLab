import { useTranslation } from 'react-i18next';
import type { PromptMeta } from '../components/prompts/prompt-types';

export const usePromptSearch = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language as 'fr' | 'en';

  const searchPrompts = (prompts: PromptMeta[], query: string): PromptMeta[] => {
    if (!query.trim()) return prompts;
    
    const searchTerm = query.toLowerCase().trim();
    
    return prompts.filter(prompt => {
      // Recherche dans le titre et la description
      const titleMatch = prompt.title.toLowerCase().includes(searchTerm);
      const descriptionMatch = prompt.shortDescription.toLowerCase().includes(searchTerm);
      
      // Recherche dans les mots-clés de recherche (metadata)
      let keywordsMatch = false;
      if (prompt.metadata?.searchKeywords) {
        const keywords = prompt.metadata.searchKeywords[currentLang] || [];
        keywordsMatch = keywords.some(keyword => 
          keyword.toLowerCase().includes(searchTerm)
        );
      }
      
      // Recherche dans les keywords existants (catégories)
      const categoriesMatch = prompt.keywords.some(keyword => 
        keyword.toLowerCase().includes(searchTerm)
      );
      
      return titleMatch || descriptionMatch || keywordsMatch || categoriesMatch;
    });
  };

  return { searchPrompts, currentLanguage: currentLang };
};
