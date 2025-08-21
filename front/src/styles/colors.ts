// Couleurs principales de l'entreprise (bleu du logo)
// PRIMARY_* values merged into COLORS.primary below.

// Central color palette previously located at src/utils/colors.ts
// Kept as a single exported object for backward compatibility with existing imports.
export const COLORS = {
	linkedInBlue: '#0A66C2', // Bleu LinkedIn, utilisé pour les liens et boutons
	linkedInlightBlue: '#0a66c242', // Bleu clair pour hover
	maltRed: '#FF5C5C',  // Rouge Malt, utilisé pour les boutons
	maltlightRed: '#ff5c5c30', // Rouge clair pour hover
	
	codeBlockTextDark: '#2e2e2eff',
	codeBlockTextLight: '#fcfcfcff',

	submitBtnColor: '#6E7176', // Couleur du bouton de soumission, gris moyen
	submitBtnColorHover: '#989898ff', // Couleur du bouton de soumission au survol, gris foncé

	darkGreyBg: '#23272F', // Nouveau gris foncé pour l'utilisation
	
	searchResultIcon: '#B9BBBE', // Couleur des icônes de résultats de recherche, gris clair

	copyBtnColor: '#494949ff', // Couleur du bouton de copie, gris clair
	copyBtnColorHover: '#63a4ff', // Couleur du bouton de copie au survol, gris clair

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
	// Dark mode tokens based on provided image
	cardBgDark: '#2A2F33', // slightly lighter than darkGreyBg for cards
	// Centralized text color for dark theme
	textPrimary: '#E6EEF3',
	// Keywords chip gradient (slightly lighter than card background)
	cardKeywordStart: '#374046',
	cardKeywordEnd: '#2F363A',
	// Search input text color (slightly like cardBgDark)
	searchInputText: '#2A2F33',

	// New token for list item hover backgrounds (slightly lighter than cardBgDark)
	itemListHover: '#374046',


	// Vivid accent color chosen to contrast with dark card backgrounds (#2A2F33).
	// Turquoise/teal works well for both tips and prompts: lively and readable.
	tipsIcon: '#02a8e9', // Couleur vive pour l'icone des tips
	// Orange vif choisi pour les prompts : contraste fort avec les fonds sombres et chaleureux.
	promptsIcon: '#FF8A33', // Couleur vive (orange) pour l'icone des prompts


	// Grouped dark-theme palette for easier maintenance
	// Keep top-level keys for backward compatibility; prefer using `COLORS.darkTheme.*` going forward.
	darkTheme: {
		// page / surfaces
		background: '#23272F',
		pageAlt: '#242424', // used in index.css
		cardBg: '#E6EEF3', // same as textPrimary per recent change

		// text
		textPrimary: '#E6EEF3',
		textOnDark: '#FFFFFF',

		// chips / accents
		keywordStart: '#374046',
		keywordEnd: '#2F363A',


		// Input-specific colors requested:
		// - inputBackground: couleur de la zone de saisie (même que la typographie)
		// - inputText: couleur du texte à l'intérieur de la zone de saisie (même que le fond de la page)
		inputBackground: '#E6EEF3', // same as textPrimary
		inputText: '#23272F', // same as darkGreyBg

		inputContactBorder: '#E6EEF3', // same as darkGreyBg
	},

	// Source code syntax highlighting colors inspired by MSDN
	sourceCode: {
		// Light theme colors - Style MSDN
		light: {
			keyword: '#0000ff',      // Bleu classique MSDN pour les mots-clés (class, public, var, etc.)
			string: '#a31515',       // Rouge foncé pour les chaînes de caractères
			comment: '#008000',      // Vert pour les commentaires
			attribute: '#2b91af',    // Bleu-gris pour les attributs C# [Facet, etc.]
			type: '#2b91af',         // Bleu-gris pour les types (string, int, Person, etc.)
			number: '#800080',       // Violet pour les nombres
			operator: '#000000',     // Noir pour les opérateurs (=, +, etc.)
			text: '#000000',         // Noir pour le texte de base
		},
		// Dark theme colors - Style MSDN sombre
		dark: {
			keyword: '#569cd6',      // Bleu clair MSDN pour les mots-clés
			string: '#ce9178',       // Orange clair pour les chaînes
			comment: '#6a9955',      // Vert pour les commentaires
			attribute: '#4ec9b0',    // Turquoise pour les attributs
			type: '#4ec9b0',         // Turquoise pour les types
			number: '#b5cea8',       // Vert clair pour les nombres
			operator: '#d4d4d4',     // Gris clair pour les opérateurs
			text: '#d4d4d4',         // Gris clair pour le texte de base
		},
	},
};
