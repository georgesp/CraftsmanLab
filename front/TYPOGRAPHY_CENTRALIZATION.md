# Centralisation et Réduction de la Typographie

## Objectif
Centraliser toutes les tailles de police du site dans un fichier unique et réduire la taille globale des polices pour améliorer la lisibilité et la cohérence.

## Changements effectués

### 1. Nouveau fichier de typographie centralisé
**Fichier:** `src/styles/typography.ts`

Ce fichier contient :
- **Tailles de police réduites** : Environ -15 à -20% par rapport aux valeurs originales
- **Tailles responsives** : Adaptées pour mobile et desktop
- **Constantes centralisées** : Famille de police, poids, hauteurs de ligne, espacement des lettres

### 2. Fichiers modifiés

#### Theme principal
- `src/theme/theme.ts` : Utilise maintenant les constantes du fichier typographie centralisé

#### Pages
- `src/pages/Contact/contact-page.tsx` : Utilise les tailles responsives centralisées
- `src/pages/Contact/styles.ts` : Police des alertes mise à jour
- `src/pages/Prompts/styles.ts` : Police des boîtes d'explication mise à jour

#### Composants
- `src/components/prompts/styles.ts` : Police du code mise à jour
- `src/components/ui/CodeBlock/CodeBlock.tsx` : Police et famille de police centralisées

#### Utilitaires
- `src/styles/index.ts` : Export centralisé des styles (nouveau fichier)

### 3. Tailles de police avant/après

| Élément | Avant | Après | Réduction |
|---------|-------|-------|-----------|
| H1 | 3rem | 2.4rem | -20% |
| H2 | 2.5rem | 2rem | -20% |
| H3 | 2rem | 1.6rem | -20% |
| H4 | 1.5rem | 1.2rem | -20% |
| H5 | 1.25rem | 1rem | -20% |
| H6 | 1.125rem | 0.9rem | -20% |
| Body1 | 1rem | 0.85rem | -15% |
| Body2 | 0.875rem | 0.75rem | -14% |
| Button | 1rem | 0.85rem | -15% |

### 4. Nouvelles tailles ajoutées
- `caption`: 0.7rem (pour les éléments comme MuiChip)
- `small`: 0.75rem (pour les petits textes)
- `tiny`: 0.65rem (pour les très petits textes)

### 5. Responsive design
Les tailles sont encore plus petites sur mobile pour optimiser l'espace d'écran :
- H1 mobile : 1.8rem (au lieu de 2.4rem sur desktop)
- H2 mobile : 1.5rem (au lieu de 2rem sur desktop)
- Body1 mobile : 0.8rem (au lieu de 0.85rem sur desktop)

## Avantages
1. **Cohérence** : Toutes les polices sont définies au même endroit
2. **Maintenance** : Plus facile de modifier les tailles globalement
3. **Lisibilité** : Tailles plus adaptées pour la lecture sur écran
4. **Performance** : Réduction de la charge visuelle
5. **Responsiveness** : Adaptation automatique aux différentes tailles d'écran

## Utilisation
```typescript
import { TYPOGRAPHY } from '../styles/typography';

// Utiliser une taille prédéfinie
fontSize: TYPOGRAPHY.fontSizes.body1

// Utiliser une taille responsive
sx={{ fontSize: TYPOGRAPHY.responsiveFontSizes.h2 }}

// Utiliser d'autres propriétés
fontFamily: TYPOGRAPHY.fontFamily
fontWeight: TYPOGRAPHY.fontWeights.semiBold
lineHeight: TYPOGRAPHY.lineHeights.relaxed
```
