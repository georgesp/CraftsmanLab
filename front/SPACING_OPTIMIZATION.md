# Réduction de l'espace entre Header et Contenu

## Objectif
Réduire l'espacement entre le header et le contenu de toutes les pages pour améliorer l'utilisation de l'espace d'écran et la densité d'information.

## Changements effectués

### 1. Nouveau fichier d'espacement centralisé
**Fichier:** `src/styles/spacing.ts`

Ce fichier contient toutes les constantes d'espacement pour :
- **Conteneurs de pages** : Padding et margin réduits
- **Sections Hero** : Espacement vertical diminué
- **Pages de détail** : Padding/margin plus compacts
- **Sections de contenu** : Espacement optimisé
- **Boîtes d'explication** : Marges ajustées

### 2. Fichiers modifiés

#### Pages
- `src/pages/Home/home-page.tsx` : Padding vertical réduit de 8 à 4
- `src/pages/Contact/contact-page.tsx` : Import du nouvel espacement
- `src/pages/Contact/styles.ts` : Utilise les nouvelles constantes d'espacement
- `src/pages/Prompts/styles.ts` : MarginTop réduit de 6 à 3, marginBottom des explications réduit
- `src/pages/Tips/tip-detail-page.tsx` : Padding/margin réduits
- `src/pages/Prompts/prompt-detail-page.tsx` : Padding/margin réduits

#### Composants
- `src/components/prompts/styles.ts` : DetailContainer avec espacement réduit

#### Utilitaires
- `src/styles/index.ts` : Export du nouveau PAGE_SPACING
- `src/styles/spacing.ts` : Nouveau fichier centralisé (créé)

### 3. Réductions d'espacement

| Élément | Avant | Après | Réduction |
|---------|-------|-------|-----------|
| **ContactContainer padding-top** | 4 | 2 | -50% |
| **PromptsPageContainer margin-top** | 6 | 3 | -50% |
| **HomePage content padding** | 8 | 4 | -50% |
| **Hero section padding** | 6/8 (xs/md) | 3/4 (xs/md) | ~-50% |
| **Hero section margin-top** | 1 | 0 | -100% |
| **Hero section margin-bottom** | 4 | 3 | -25% |
| **Detail pages padding** | 6/8 (xs/md) | 3/4 (xs/md) | ~-50% |
| **Detail pages margin** | 4 | 2 | -50% |
| **Explanation margin-bottom** | 4 | 3 | -25% |

### 4. Structure du fichier PAGE_SPACING

```typescript
export const PAGE_SPACING = {
  container: {
    paddingTop: 2,      // était 4
    paddingBottom: 4,   // reste 4
    marginTop: 3,       // était 6
    marginBottom: 4,    // reste 4
  },
  hero: {
    paddingTop: { xs: 3, md: 4 },    // était { xs: 6, md: 8 }
    paddingBottom: { xs: 3, md: 4 }, // était { xs: 6, md: 8 }
    paddingX: { xs: 2, md: 4 },      // reste identique
    marginTop: 0,                     // était 1
    marginBottom: 3,                  // était 4
  },
  detail: {
    paddingY: { xs: 3, md: 4 },      // était { xs: 6, md: 8 }
    marginY: 2,                       // était 4
  },
  content: {
    paddingY: 4,                      // était 8
    marginY: 2,                       // était 4
  },
  explanation: {
    padding: 3,                       // reste 3
    marginBottom: 3,                  // était 4
  }
};
```

## Avantages
1. **Espace optimisé** : Plus de contenu visible sans scroll
2. **Cohérence** : Espacement uniforme sur toutes les pages
3. **Responsiveness** : Espacement adapté aux tailles d'écran
4. **Maintenance** : Valeurs centralisées et faciles à modifier
5. **Densité d'information** : Meilleure utilisation de l'espace disponible

## Pages concernées
- ✅ **Page d'accueil** : Espacement content réduit
- ✅ **Page Contact** : Hero section et conteneur optimisés
- ✅ **Pages Prompts** : Liste et détail avec espacement réduit
- ✅ **Pages Tips** : Liste et détail avec espacement réduit
- ✅ **Composants** : DetailContainer et styles prompts ajustés

## Utilisation future
```typescript
import { PAGE_SPACING } from '../styles/spacing';

// Utiliser un espacement prédéfini
padding: theme.spacing(PAGE_SPACING.container.paddingTop, 0)

// Utiliser un espacement responsive
sx={{ py: PAGE_SPACING.detail.paddingY }}

// Utiliser les espacements internes
margin: theme.spacing(PAGE_SPACING.internal.medium)
```

## Test
- ✅ Compilation réussie sans erreurs
- ✅ Application fonctionnelle sur http://localhost:5175/
- ✅ Hot reload fonctionnel avec les nouveaux espacements
