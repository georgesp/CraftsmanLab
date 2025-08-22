# Internationalisation (i18n) - CraftsmanLab

## Vue d'ensemble

Le site CraftsmanLab supporte maintenant deux langues : **Français** (par défaut) et **Anglais**.

## Technologies utilisées

- **react-i18next** : Librairie d'internationalisation pour React
- **i18next** : Framework d'internationalisation JavaScript
- **i18next-browser-languagedetector** : Détection automatique de la langue du navigateur

## Structure des fichiers

```
src/
├── i18n/
│   └── index.ts                    # Configuration i18next
├── locales/
│   ├── fr/
│   │   ├── common.json             # Traductions communes (navigation, boutons, etc.)
│   │   └── pages.json              # Traductions spécifiques aux pages
│   └── en/
│       ├── common.json             # Traductions communes en anglais
│       └── pages.json              # Traductions des pages en anglais
├── components/
│   └── ui/
│       └── LanguageSelector/       # Composant sélecteur de langue
└── hooks/
    └── useHtmlLang.ts              # Hook pour mettre à jour l'attribut lang du HTML
```

## Configuration

### Namespaces utilisés

- **common** : Navigation, boutons, éléments d'interface communs
- **pages** : Contenu spécifique aux pages (accueil, contact, prompts)

### Langue par défaut

Le français est configuré comme langue de fallback dans `src/i18n/index.ts`.

### Détection de langue

L'ordre de détection de la langue est :
1. localStorage (mémorisation du choix utilisateur)
2. navigator (langue du navigateur)
3. htmlTag (attribut lang du HTML)

## Utilisation dans les composants

### Import et utilisation de base

```tsx
import { useTranslation } from 'react-i18next';

const MyComponent: React.FC = () => {
  const { t } = useTranslation('common'); // ou 'pages'
  
  return <Typography>{t('navigation.home')}</Typography>;
};
```

### Traductions avec namespace spécifique

```tsx
const { t } = useTranslation('pages');
return <Typography>{t('contact.title')}</Typography>;
```

### Traductions avec HTML intégré

Pour les textes contenant du HTML (comme des balises `<br />`):

```tsx
<span dangerouslySetInnerHTML={{ __html: t('contact.subtitle') }} />
```

## Sélecteur de langue

Le composant `LanguageSelector` est intégré dans le header et permet de :
- Afficher la langue actuelle avec son drapeau
- Changer de langue via un menu déroulant
- Mémoriser le choix dans localStorage

## Portée actuelle

### ✅ Traduit
- Navigation (header, liens)
- Interface utilisateur (boutons, messages de chargement, messages de copie)
- Page d'accueil (sections principales)
- Page Contact (formulaire et contenu)
- Page Prompts (titre et description principale)
- Page Tips (titre et description)
- Recherche (placeholder et "aucun résultat")

### ❌ Non traduit (volontairement exclu)
- Contenu des tips individuels
- Contenu des prompts individuels
- Descriptions détaillées dans la page Prompts

## Ajout de nouvelles traductions

### 1. Ajouter la clé dans les fichiers JSON

**fr/common.json** ou **fr/pages.json** :
```json
{
  "newSection": {
    "title": "Nouveau titre",
    "description": "Description en français"
  }
}
```

**en/common.json** ou **en/pages.json** :
```json
{
  "newSection": {
    "title": "New title",
    "description": "Description in English"
  }
}
```

### 2. Utiliser dans le composant

```tsx
const { t } = useTranslation('common'); // ou 'pages'
return <Typography>{t('newSection.title')}</Typography>;
```

## Notes importantes

- Les traductions sont chargées de manière synchrone au démarrage
- Le changement de langue est instantané (pas de rechargement de page)
- L'attribut `lang` du HTML est automatiquement mis à jour
- Les préférences de langue sont sauvegardées dans localStorage

## Extension future

Pour ajouter d'autres langues :
1. Créer un dossier `src/locales/[code-langue]/`
2. Ajouter les fichiers `common.json` et `pages.json` traduits
3. Mettre à jour le tableau `languages` dans `LanguageSelector.tsx`
4. Ajouter les resources dans `src/i18n/index.ts`
