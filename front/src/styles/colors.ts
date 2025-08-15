// Couleurs principales de l'entreprise (bleu du logo)
// PRIMARY_* values merged into COLORS.primary below.

// Central color palette previously located at src/utils/colors.ts
// Kept as a single exported object for backward compatibility with existing imports.
export const COLORS = {
	primaryBlue: '#0A66C2', // Bleu LinkedIn, utilisé pour les liens et boutons
	primaryRed: '#FF5C5C',  // Rouge Malt, utilisé pour les boutons
	lightRedBg: '#FF5C5C11', // Rouge clair pour hover
	lightBlueBg: '#0A66C211', // Bleu clair pour hover
	grey800: '#424242', // Gris foncé pour les descriptions courtes et textes secondaires
	darkGreyBg: '#23272F', // Nouveau gris foncé pour l'utilisation
	titleColor: '#23272F', // Nouveau gris foncé pour l'utilisation
	// Teinte intermédiaire entre `titleColor` et `mediumGrey` utilisée pour hover
	mediumDarkGrey: '#6E7176',
	mediumGrey: '#B9BBBE', // Nouveau gris moyen pour l'utilisation
	dividerLight: '#B9BBBE', // Encore éclaircie (+30%) pour séparateurs discrets
	white: '#FFFFFF', // Blanc pour les textes et éléments sur fond sombre
	defaultBg: '#F7FAFC', // Fond par défaut très clair pour parties non colorées
	// Backwards-compatible nested primary colors (was PRIMARY_BLUE, PRIMARY_BLUE_LIGHT, PRIMARY_BLUE_DARK)
	primary: {
		main: '#1976d2',
		light: '#63a4ff',
		dark: '#115293',
	},
};
