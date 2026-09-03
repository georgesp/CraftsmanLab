import { useEffect } from 'react';

/** Hôte canonique du site (sans www). */
const ORIGINE = 'https://craftsmanlab.fr';

/** Valeurs de repli, alignées sur celles de index.html. */
const TITRE_PAR_DEFAUT = 'CraftsmanLab';
const DESCRIPTION_PAR_DEFAUT =
  'CraftsmanLab — Outils et prompts pour améliorer la productivité des développeurs C#.';

export type SeoOptions = {
  /** Titre complet de la page, suffixe du site inclus. */
  title?: string;
  /** Description courte, idéalement 150 à 160 caractères. */
  description?: string;
  /** Chemin canonique (ex. '/tips/dapper'). Par défaut : le chemin courant. */
  path?: string;
};

/** Crée la balise <meta> si absente, puis y écrit le contenu. */
function poserMeta(attribut: 'name' | 'property', cle: string, contenu: string) {
  let balise = document.head.querySelector<HTMLMetaElement>(`meta[${attribut}="${cle}"]`);
  if (!balise) {
    balise = document.createElement('meta');
    balise.setAttribute(attribut, cle);
    document.head.appendChild(balise);
  }
  balise.setAttribute('content', contenu);
}

/** Crée la balise <link rel="canonical"> si absente, puis y écrit l'URL. */
function poserCanonical(url: string) {
  let balise = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!balise) {
    balise = document.createElement('link');
    balise.setAttribute('rel', 'canonical');
    document.head.appendChild(balise);
  }
  balise.setAttribute('href', url);
}

/**
 * Pose les métadonnées SEO de la page courante : <title>, meta description,
 * canonical et Open Graph. Sans cela toutes les routes de la SPA partagent
 * les valeurs uniques de index.html, ce qui les rend indissociables pour
 * les moteurs de recherche.
 *
 * Les valeurs par défaut sont restaurées au démontage.
 */
export function useSeo({ title, description, path }: SeoOptions = {}) {
  useEffect(() => {
    try {
      const titre = title || TITRE_PAR_DEFAUT;
      const desc = description || DESCRIPTION_PAR_DEFAUT;
      const chemin = path ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
      const url = ORIGINE + chemin;

      document.title = titre;
      poserMeta('name', 'description', desc);
      poserCanonical(url);
      poserMeta('property', 'og:title', titre);
      poserMeta('property', 'og:description', desc);
      poserMeta('property', 'og:url', url);

      return () => {
        document.title = TITRE_PAR_DEFAUT;
        poserMeta('name', 'description', DESCRIPTION_PAR_DEFAUT);
        poserCanonical(ORIGINE + '/');
        poserMeta('property', 'og:title', TITRE_PAR_DEFAUT);
        poserMeta('property', 'og:description', DESCRIPTION_PAR_DEFAUT);
        poserMeta('property', 'og:url', ORIGINE + '/');
      };
    } catch {
      // Environnement sans document : on n'interrompt pas le rendu.
      return undefined;
    }
  }, [title, description, path]);
}

export default useSeo;
