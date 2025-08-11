### Couleurs UI

- Utilisez les couleurs définies dans `src/utils/colors.ts` pour garantir la cohérence visuelle.
- Pour les descriptions courtes de prompts, utilisez la couleur `grey800` (`#424242`).
- Ajoutez toute nouvelle couleur dans ce fichier pour centraliser la palette du projet.
# Développement d'un Site de Gestion de Prompts

## Contexte
Créer une application React TypeScript pour proposer et gérer des prompts en fonction de différents besoins utilisateurs.
Tu dois répondre en français.

## Exigences Techniques

### Architecture et Organisation
- **Structure Modulaire** : Organisation feature-first avec barrel exports
- **TypeScript Strict Mode** : Configuration maximale pour la sécurité de type
- **Atomic Design Pattern** : Composants organisés en atomes/molécules/organismes
- **Absolute Imports** : Configuration des chemins absolus via tsconfig paths

### Stack Technique Obligatoire
- **React 18+** : Hooks modernes, Concurrent Features, Suspense
- **TypeScript 5+** : Types stricts, interfaces, enums, utility types
- **Material-UI v5** : Système de design, thème personnalisé, responsive breakpoints
- **Vite** : Build tool avec HMR, optimisations bundle

### Outils de Développement
- **ESLint** : Configuration strict avec règles React/TypeScript
- **Prettier** : Formatage automatique du code avec configuration unified
- **Husky** : Git hooks pour pre-commit et pre-push
- **lint-staged** : Linting des fichiers staged uniquement

### Testing Stack
- **Jest** : Framework de test principal avec coverage reporting
- **React Testing Library** : Tests orientés comportement utilisateur
- **MSW** : Mock Service Worker pour les tests d'API
- **@testing-library/jest-dom** : Matchers personnalisés pour Jest

## Exigences de Tests (Couverture minimum 90%)
1. **Tests Unitaires** :
   - Rendu initial du composant
   - Ajout d'une nouvelle tâche
   - Modification d'une tâche existante
   - Suppression avec confirmation
   - Filtrage par statut
   - Validation des formulaires

2. **Tests d'Intégration** :
   - Flux complet utilisateur
   - Persistance localStorage
   - Gestion des états d'erreur

3. **Tests d'Accessibilité** :
   - Navigation clavier
   - Lecteurs d'écran (ARIA labels)

## Structure Attendue
```
src/
  components/
    ui/                    # Composants atomiques réutilisables
      Button/
        Button.tsx
        Button.test.tsx
        Button.stories.tsx
        index.ts
    layout/               # Composants de mise en page
      Header/
      Sidebar/
      Footer/
    features/            # Composants métier par fonctionnalité
      PromptCatalog/
        components/
        hooks/
        services/
        types/
        index.ts
  hooks/                 # Custom hooks réutilisables
    useLocalStorage.ts
    useApi.ts
    index.ts
  services/             # Logique métier et API calls
    api/
    storage/
    validation/
  types/                # Définitions TypeScript globales
    Prompt.ts
    User.ts
    index.ts
  utils/                # Fonctions utilitaires
    formatters.ts
    constants.ts
  styles/               # Configuration thème et styles
    theme.ts
    globals.css
  __tests__/           # Tests globaux et setup
    setup.ts
    __mocks__/
```

### Configuration Files Required
```
.eslintrc.json        # Configuration ESLint
.prettierrc           # Configuration Prettier
jest.config.js        # Configuration Jest
tsconfig.json         # Configuration TypeScript
vite.config.ts        # Configuration Vite
.husky/               # Git hooks configuration
```

## Critères d'Acceptation Techniques
- [ ] **TypeScript** : Pas d'erreurs, strict mode activé, types explicites
- [ ] **Code Quality** : ESLint 0 warnings, Prettier formaté, pas de console.log
- [ ] **Testing** : Couverture ≥ 90%, tous tests passent, pas de skip/todo
- [ ] **Performance** : Bundle optimisé, lazy loading, memoization appropriée
- [ ] **Accessibilité** : WCAG AA compliance, navigation clavier, ARIA labels
- [ ] **Architecture** : Respect des patterns, séparation des responsabilités
- [ ] **Git** : Commits conventionnels, hooks fonctionnels, pas de code non formaté
- [ ] **Documentation** : JSDoc pour l'API publique, README à jour, types documentés

## Standards de Code Requis

### TypeScript
```typescript
// ✅ Bon : Types explicites et stricts
interface PromptData {
  readonly id: string;
  title: string;
  description: string;
  category: PromptCategory;
  tags: readonly string[];
  createdAt: Date;
}

// ❌ Éviter : any, types implicites
const data: any = {};
```

### React Patterns
```typescript
// ✅ Bon : Composant typé avec memo et displayName
export const PromptCard = React.memo<PromptCardProps>(({ 
  prompt, 
  onEdit,
  onDelete 
}) => {
  // Implementation
});

PromptCard.displayName = 'PromptCard';
```

### Testing Standards
```typescript
// ✅ Tests orientés comportement utilisateur
test('should filter prompts when category is selected', async () => {
  render(<PromptCatalog />);
  
  const categoryFilter = screen.getByRole('combobox', { name: /category/i });
  await userEvent.selectOptions(categoryFilter, 'development');
  
  expect(screen.getByText(/development prompts/i)).toBeInTheDocument();
});
```

## Pourquoi ce Prompt est Efficace

1. **Architecture Driven** : Structure modulaire et évolutive imposée
2. **Standards Industriels** : Outils et patterns reconnus de l'écosystème React/TS
3. **Quality Gates** : Métriques techniques vérifiables automatiquement
4. **Developer Experience** : Configuration optimisée pour la productivité
5. **Maintainability** : Code self-documented et testable par design
6. **Performance** : Optimisations intégrées dès la conception

Ce prompt force l'adoption des meilleures pratiques techniques tout en maintenant une architecture robuste et évolutive.

## Centralisation des couleurs
Toutes les couleurs utilisées dans l'application (boutons, liens, backgrounds, etc.) doivent être référencées dans un fichier unique `src/utils/colors.ts`. Utilisez exclusivement ces constantes dans tout le code pour garantir la cohérence visuelle et faciliter la maintenance du design.

Exemple :
```ts
export const COLORS = {
  primaryBlue: '#0A66C2',
  primaryRed: '#FF5C5C',
  lightRedBg: '#FF5C5C11',
  lightBlueBg: '#0A66C211',
};
```
