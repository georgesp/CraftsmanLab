// Espacements centralisés pour les pages
// Réduit l'espace entre le header et le contenu

export const PAGE_SPACING = {
  // Espacement vertical des conteneurs principaux (réduit)
  container: {
    paddingTop: 2, // était 4 dans ContactContainer
    paddingBottom: 4, // reste 4
    marginTop: 3, // était 6 dans PromptsPageContainer
    marginBottom: 4, // reste 4
  },

  // Espacement pour les sections Hero (réduit)
  hero: {
    paddingTop: { xs: 3, md: 4 }, // était { xs: 6, md: 8 }
    paddingBottom: { xs: 3, md: 4 }, // était { xs: 6, md: 8 }
    paddingX: { xs: 2, md: 4 }, // reste identique
    marginTop: 0, // était 1
    marginBottom: 3, // était 4
  },

  // Espacement pour les pages de détail (réduit)
  detail: {
    paddingY: { xs: 3, md: 4 }, // était { xs: 6, md: 8 }
    marginY: 2, // était 4
  },

  // Espacement pour les sections de contenu (réduit)
  content: {
    paddingY: 4, // était 8 dans HomePage
    marginY: 2, // était 4
  },

  // Espacement pour les boîtes d'explication
  explanation: {
    padding: 3, // reste 3
    marginBottom: 3, // était 4
  },

  // Espacement des éléments internes
  internal: {
    small: 1,
    medium: 2,
    large: 3,
    xlarge: 4,
  },
};
