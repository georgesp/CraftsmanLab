// Typographie centralisée pour tout le site
// Toutes les tailles de police sont définies ici et réduites par rapport aux valeurs originales

export const TYPOGRAPHY = {
  // Tailles de police réduites (environ -20% par rapport aux originales)
  fontSizes: {
    h1: '2.4rem', // était 3rem
    h2: '2rem', // était 2.5rem
    h3: '1.6rem', // était 2rem
    h4: '1.2rem', // était 1.5rem
    h5: '1rem', // était 1.25rem
    h6: '0.9rem', // était 1.125rem
    body1: '0.85rem', // était 1rem
    body2: '0.75rem', // était 0.875rem
    button: '0.85rem', // était 1rem
    caption: '0.7rem', // était 0.875rem (pour les éléments MuiChip, etc.)
    small: '0.75rem', // pour les petits textes
    tiny: '0.65rem', // pour les très petits textes
    nav: '0.95rem', // pour la navigation et le sélecteur de langue
  },

  // Responsive font sizes - tailles encore plus petites sur mobile
  responsiveFontSizes: {
    h1: { xs: '1.8rem', md: '2.4rem' }, // était { xs: '1.6rem', md: '2.2rem' }
    h2: { xs: '1.5rem', md: '2rem' }, // était { xs: '1.6rem', md: '2.2rem' }
    h3: { xs: '1.3rem', md: '1.6rem' },
    h4: { xs: '1.1rem', md: '1.2rem' },
    body1: { xs: '0.8rem', md: '0.85rem' }, // était { xs: '1rem', md: '1.15rem' }
    body2: { xs: '0.7rem', md: '0.75rem' },
  },

  // Famille de police
  fontFamily: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',

  // Refonte « Atelier adouci » : familles dédiées
  fontFamilies: {
    // Corps
    sans: '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    // Titres / display (extra-bold, tracking négatif)
    display: '"Inter Tight", "Inter", system-ui, sans-serif',
    // Labels, méta, nav, compteurs, code
    mono: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, Consolas, monospace',
  },

  // Échelle « Atelier adouci » (valeurs px du handoff)
  atelier: {
    heroH1: '52px', // Hero accueil — 800 / lh 1.06
    listH1: '38px', // H1 pages liste — 800
    contactH1: '44px',
    h2: '24px', // Section — 700
    h3: '18px', // Carte — 700
    body: '15px',
    meta: '13px', // JetBrains Mono
    metaSmall: '11px',
    tracking: '-0.02em',
    trackingTight: '-0.035em',
    trackingMono: '.08em',
  },

  // Poids des polices
  fontWeights: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
  },

  // Hauteurs de ligne
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },

  // Espacement des lettres
  letterSpacing: {
    tight: '-0.02em',
    normal: '-0.01em',
    wide: '0.01em',
  },
};
