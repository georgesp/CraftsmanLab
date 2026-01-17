// Couleurs principales de l'entreprise (bleu du logo)
// PRIMARY_* values merged into COLORS.primary below.

// Central color palette previously located at src/utils/colors.ts
// Kept as a single exported object for backward compatibility with existing imports.
export const COLORS = {
  linkedInBlue: '#0A66C2', // Bleu LinkedIn, utilisé pour les liens et boutons
  linkedInlightBlue: '#0a66c242', // Bleu clair pour hover
  maltRed: '#FF5C5C', // Rouge Malt, utilisé pour les boutons
  maltlightRed: '#ff5c5c30', // Rouge clair pour hover

  codeBlockTextDark: '#2e2e2eff',
  codeBlockTextLight: '#F2F4F7', // Même couleur que les cards pour cohérence

  submitBtnColor: '#E9ECEF', // Couleur du bouton de soumission, gris très clair
  submitBtnColorHover: '#CED4DA', // Couleur du bouton de soumission au survol, gris moyen clair

  darkGreyBg: '#FAFBFC', // Fond principal clair (ancien gris foncé remplacé)

  searchResultIcon: '#6B7280', // Couleur des icônes de résultats de recherche, gris moyen

  copyBtnColor: '#E9ECEF', // Couleur du bouton de copie, gris très clair
  copyBtnColorHover: '#1976d2', // Couleur du bouton de copie au survol, bleu primaire

  white: '#FFFFFF', // Blanc pour les textes et éléments sur fond sombre
  defaultBg: '#F7FAFC', // Fond par défaut très clair pour parties non colorées
  // Backwards-compatible nested primary colors (was PRIMARY_BLUE, PRIMARY_BLUE_LIGHT, PRIMARY_BLUE_DARK)
  primary: {
    main: '#1976d2',
    light: '#63a4ff',
    dark: '#115293',
  },
  // Add subtle UI tokens for the new visual refresh
  // Add subtle UI tokens for the new visual refresh
  // Light mode tokens
  cardBgDark: '#F2F4F7', // Fond de carte gris très léger
  cardBorder: '#E8EBF0', // Bordure de carte (un peu plus foncé que cardBgDark)
  cardBorderWidth: '1px', // Épaisseur de bordure des cards
  // Centralized text color for light theme
  textPrimary: '#1A1D1F',
  // Keywords chip gradient (tons clairs)
  cardKeywordStart: '#E8EBF0',
  cardKeywordEnd: '#F0F2F5',
  // Search input text color
  searchInputText: '#1A1D1F',

  // New token for list item hover backgrounds (fond clair au survol)
  itemListHover: '#F0F2F5',

  // Filter & Category UI colors
  categoryInputBg: '#E8EBF0', // Fond du champ de recherche des catégories
  categoryInputBgHover: '#DDE1E6', // Fond hover du champ de recherche
  categoryChipBorder: '#D1D5DB', // Bordure des chips de catégories non sélectionnés
  categoryChipHover: '#E8EBF0', // Fond hover des chips de catégories
  categorySelectedBg: 'rgba(25, 118, 210, 0.08)', // Fond de la zone des catégories sélectionnées
  categorySelectedBorder: 'rgba(25, 118, 210, 0.2)', // Bordure de la zone des catégories sélectionnées
  expandButtonHover: '#E8EBF0', // Fond hover du bouton expand/collapse
  iconOverlay: 'rgba(255, 255, 255, 0.1)', // Overlay semi-transparent pour icônes
  iconButtonHover: 'rgba(255, 255, 255, 0.2)', // Fond hover des boutons d'icône

  // Vivid accent color chosen to contrast with light card backgrounds.
  // Turquoise/teal works well for both tips and prompts: lively and readable.
  tipsIcon: '#02a8e9', // Couleur vive pour l'icone des tips
  // Orange foncé choisi pour les prompts : contraste suffisant avec les fonds clairs.
  promptsIcon: '#E67300', // Couleur vive (orange foncé) pour l'icone des prompts - ratio 3.5:1
  newsIcon: '#4caf50', // Couleur verte pour l'icône des news

  // Grouped light-theme palette for easier maintenance
  // Keep top-level keys for backward compatibility; prefer using `COLORS.darkTheme.*` going forward.
  darkTheme: {
    // page / surfaces
    background: '#FAFBFC',
    pageAlt: '#F8F9FA', // used in index.css
    cardBg: '#F0F2F5', // Gris clair pour les cartes

    // text
    textPrimary: '#1A1D1F',
    textOnDark: '#1A1D1F',

    // chips / accents
    keywordStart: '#E8EBF0',
    keywordEnd: '#F0F2F5',

    // Input-specific colors requested:
    // - inputBackground: couleur de la zone de saisie
    // - inputText: couleur du texte à l'intérieur de la zone de saisie
    inputBackground: '#FFFFFF', // Blanc pour les inputs
    inputText: '#1A1D1F', // Texte foncé

    inputContactBorder: '#D1D5DB', // Bordure grise claire
  },

  // Source code syntax highlighting colors inspired by MSDN
  sourceCode: {
    // Light theme colors - Style MSDN
    light: {
      keyword: '#0000ff', // Bleu classique MSDN pour les mots-clés (class, public, var, etc.)
      string: '#a31515', // Rouge foncé pour les chaînes de caractères
      comment: '#008000', // Vert pour les commentaires
      attribute: '#2b91af', // Bleu-gris pour les attributs C# [Facet, etc.]
      type: '#2b91af', // Bleu-gris pour les types (string, int, Person, etc.)
      number: '#800080', // Violet pour les nombres
      operator: '#000000', // Noir pour les opérateurs (=, +, etc.)
      text: '#000000', // Noir pour le texte de base
    },
    // Dark theme colors - Style MSDN sombre
    dark: {
      keyword: '#569cd6', // Bleu clair MSDN pour les mots-clés
      string: '#ce9178', // Orange clair pour les chaînes
      comment: '#6a9955', // Vert pour les commentaires
      attribute: '#4ec9b0', // Turquoise pour les attributs
      type: '#4ec9b0', // Turquoise pour les types
      number: '#b5cea8', // Vert clair pour les nombres
      operator: '#d4d4d4', // Gris clair pour les opérateurs
      text: '#d4d4d4', // Gris clair pour le texte de base
    },
  },

  // Couleurs pour le bouton ScrollToTop
  scrollToTop: {
    background: '#FFFFFF', // Fond blanc
    hover: '#1976d2', // Bleu primaire pour un accent vibrant au hover
    border: '#D1D5DB', // Bordure grise claire
  },

  // Palette secondaire (Turquoise Telerik) déplacée depuis theme.ts
  secondary: {
    main: '#40e0d0',
    light: '#70f0e0',
    dark: '#2aa0a0',
    contrastText: '#000000',
    contrastTextAlt: '#ffffff',
  },

  // Palette de gris Material-UI déplacée depuis theme.ts
  grey: {
    50: '#f7fafc',
    100: '#edf2f7',
    200: '#e2e8f0',
    300: '#cbd5e0',
    400: '#a0aec0',
    500: '#718096',
    600: '#4a5568',
    700: '#2d3748',
    800: '#1a202c',
    900: '#171923',
  },

  // Couleur de texte secondaire (utilisée dans theme.ts)
  textSecondary: '#6B7280',

  // Fond de la description box sur la page d'accueil
  homeDescriptionBg: '#F0F4FF',

  // Overlays avec transparence
  overlay: {
    light10: 'rgba(255, 255, 255, 0.1)', // Fond hover léger
    lightSemi: 'rgba(255, 255, 255, 0.9)', // Fond bouton copie (presque opaque)
    textLightSemi: 'rgba(255, 255, 255, 0.87)', // Texte avec légère transparence
  },

  // Couleurs des liens (index.css)
  link: {
    default: '#1976d2',
    hover: '#115293',
  },

  // Couleurs pour les tableaux
  table: {
    border: '#ddd', // Bordure grise claire
  },
};
