import { useEffect } from 'react';

/**
 * Hook pour forcer une balise <link rel="canonical"> vers l'hôte préféré https://craftsmanlab.fr
 * Accepts an optional path (e.g. '/tips/switch-tuple'). If omitted, uses window.location.pathname.
 */
export function useCanonical(path?: string) {
  useEffect(() => {
    try {
      const origine = 'https://craftsmanlab.fr';
      const chemin = path ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
      const url = origine + chemin;

      let balise = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!balise) {
        balise = document.createElement('link');
        balise.setAttribute('rel', 'canonical');
        document.head.appendChild(balise);
      }
      balise.href = url;
    } catch (err) {
      // noop en environnement non-browser ou si head non disponible
      // garder silencieux pour ne pas interrompre l'app
    }
  }, [path]);
}
