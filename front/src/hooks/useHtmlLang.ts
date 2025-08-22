import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Hook to automatically update the HTML lang attribute when language changes
 */
export const useHtmlLang = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
};

export default useHtmlLang;
