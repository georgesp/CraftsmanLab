# Système de mots-clés pour Tips et Prompts

## Résumé des modifications

J'ai ajouté un système de mots-clés (`keywords`) pour catégoriser les tips et prompts selon votre demande.

### Nouvelles fonctionnalités

1. **Type `Keyword`** dans `src/utils/constants.ts`
   - Type union: `'C#' | 'SQL'`
   - Liste des mots-clés disponibles : `AVAILABLE_KEYWORDS`

2. **Propriété `keywords`** ajoutée aux types :
   - `PromptMeta` : inclut maintenant `keywords: Keyword[]`
   - `TipMeta` : inclut maintenant `keywords: Keyword[]`

3. **Composant `KeywordChips`** dans `src/components/ui/KeywordChips/`
   - Affiche les mots-clés sous forme de chips Material-UI
   - Configurable (taille, variante)
   - Réutilisable dans toute l'application

4. **Affichage des keywords** intégré dans :
   - `TipCardsGrid` : affiche les keywords en bas de chaque carte avec une barre horizontale de séparation
   - `PromptCardsGrid` : affiche les keywords en bas de chaque carte avec une barre horizontale de séparation
   - Layout flexbox pour maintenir les keywords en bas des cartes
   - Description avec `flexGrow: 1` pour occuper l'espace disponible

### Tous les contenus existants mis à jour

- **Tips** : tous ont maintenant `keywords: ['C#']`
  - Collections C#
  - Collections clé-valeur C#
  - xUnit
  - Dapper
  - NSubstitute

- **Prompts** : tous ont maintenant `keywords: ['C#']`
  - CraftsmanLab front rules
  - .NET Async Best Practices
  - ASP.NET Core Guidances
  - More coming soon...

### Utilisation

Les keywords sont maintenant exposés de la même manière que le `title` :
- Accessibles via `entry.keywords` sur les `TipEntry` et `PromptEntry`
- Affichés en bas des cartes avec une barre horizontale de séparation
- Layout flexbox pour un alignement optimal
- Type-safe avec TypeScript

### Design des cartes

- **Structure flexbox** : `display: 'flex', flexDirection: 'column', height: '100%'`
- **Description extensible** : `flexGrow: 1` pour occuper l'espace disponible
- **Keywords en bas** : toujours visibles en bas de chaque carte
- **Séparation visuelle** : barre horizontale entre la description et les keywords

### Extensibilité

Pour ajouter de nouveaux mots-clés :
1. Modifier le type `Keyword` dans `constants.ts`
2. Mettre à jour `AVAILABLE_KEYWORDS`
3. Assigner les nouveaux keywords aux tips/prompts concernés

Exemple pour ajouter "JavaScript" :
```typescript
export type Keyword = 'C#' | 'SQL' | 'JavaScript';
export const AVAILABLE_KEYWORDS: readonly Keyword[] = ['C#', 'SQL', 'JavaScript'] as const;
```
