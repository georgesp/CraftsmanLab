# Synthèse : Naming Conventions in React (Sufle.io)

## 1. File Naming
- Utiliser le **kebab-case** (ex : `my-component.tsx`).
- Avantages : lisibilité, évite les conflits sur les systèmes insensibles à la casse.

## 2. Component Naming
- Utiliser le **PascalCase** (ex : `UserProfile`).
- Permet de distinguer les composants des éléments HTML natifs.

## 3. Function & Variable Naming
- Utiliser le **camelCase** (ex : `fetchUserData`).
- S'applique aussi aux propriétés d'objet et aux custom hooks.

## 4. Constants & Enum Naming
- **Constantes et valeurs d'enum** : `UPPER_SNAKE_CASE` (ex : `API_URL`).
- **Nom d'enum** : PascalCase (ex : `Colors`).
- **Valeurs d'enum** : camelCase (ex : `DARK_BLUE = 'darkBlue'`).

## 5. Type & Interface Naming
- Par défaut : **PascalCase** (ex : `UserInfo`).
- Alternative possible : snake_case (ex : `user_info`).

## 6. Prefixes & Context
- **State/Props** : camelCase, descriptif, préfixes `is`, `has`, `should` pour les booléens (ex : `isModalOpen`).
- **Event Handlers** : camelCase, préfixes `handle` ou `on` (ex : `handleInputChange`, `onButtonClick`).
- **Utilitaires & Custom Hooks** : camelCase, préfixes `get`, `set`, `is`, `has`, `should`, `use` (ex : `getFormattedDate`, `useCustomHook`).
- **Higher Order Components (HOC)** : camelCase, préfixe `with` (ex : `withAuth`).
- **Context Providers/Consumers** : PascalCase, préfixes `Provider` ou `Consumer` (ex : `ThemeProvider`).

## 7. Conclusion
- Appliquer ces conventions améliore la lisibilité, la maintenabilité et la collaboration sur les projets React.
- La cohérence est la clé pour des projets évolutifs et compréhensibles.

Source : https://www.sufle.io/blog/naming-conventions-in-react
