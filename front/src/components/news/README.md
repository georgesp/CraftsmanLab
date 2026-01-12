# News RSS Sources

Ce dossier contient les configurations des différentes sources de flux RSS affichées sur la page News.

## Structure

Chaque source RSS est organisée dans son propre sous-dossier avec la structure suivante :

```
components/news/
├── registry.ts                    # Registry centralisé de toutes les sources
├── index.ts                       # Exports principaux
└── [source-slug]/
    ├── meta.ts                    # Métadonnées de la source
    ├── fr.json                    # Traductions françaises
    └── en.json                    # Traductions anglaises
```

## Ajouter une nouvelle source RSS

### 1. Créer le dossier de la source

Créez un nouveau dossier avec le slug de votre source (ex: `azure-updates`) :

```bash
mkdir -p src/components/news/azure-updates
```

### 2. Créer le fichier `meta.ts`

```typescript
// src/components/news/azure-updates/meta.ts
import type { RssSourceMeta } from '../registry';

export const azureUpdatesMeta: RssSourceMeta = {
  slug: 'azure-updates',
  feedUrl: 'https://azurecomcdn.azureedge.net/en-us/updates/feed/',
  icon: '/azure-icon.png',
  color: '#0089D6',
  maxItems: 15,
};
```

### 3. Créer les fichiers de traduction

**fr.json** :
```json
{
  "title": "Azure Updates",
  "description": "Les dernières mises à jour des services Azure.",
  "website": "https://azure.microsoft.com/updates/"
}
```

**en.json** :
```json
{
  "title": "Azure Updates",
  "description": "The latest updates on Azure services.",
  "website": "https://azure.microsoft.com/updates/"
}
```

### 4. Enregistrer dans le registry

Éditez `registry.ts` pour ajouter votre source :

```typescript
import { microsoftDevBlogsMeta } from './microsoft-devblogs/meta';
import { azureUpdatesMeta } from './azure-updates/meta'; // Ajoutez cette ligne

export const rssSources: RssSource[] = [
  {
    meta: microsoftDevBlogsMeta,
    translations: {
      fr: require('./microsoft-devblogs/fr.json'),
      en: require('./microsoft-devblogs/en.json'),
    },
  },
  // Ajoutez votre nouvelle source ici
  {
    meta: azureUpdatesMeta,
    translations: {
      fr: require('./azure-updates/fr.json'),
      en: require('./azure-updates/en.json'),
    },
  },
];
```

### 5. Mettre à jour le script de build

Éditez `scripts/fetch-rss.mjs` pour ajouter votre source dans le tableau `RSS_SOURCES` :

```javascript
const RSS_SOURCES = [
  {
    slug: 'microsoft-devblogs',
    feedUrl: 'https://devblogs.microsoft.com/dotnet/feed/',
    maxItems: 20,
  },
  {
    slug: 'azure-updates',
    feedUrl: 'https://azurecomcdn.azureedge.net/en-us/updates/feed/',
    maxItems: 15,
  },
];
```

### 6. Tester

```bash
npm run fetch-rss
npm run dev
```

Naviguez vers `/news` pour voir vos articles !

## Format des métadonnées

```typescript
interface RssSourceMeta {
  slug: string;          // Identifiant unique (kebab-case)
  feedUrl: string;       // URL du flux RSS/Atom
  icon?: string;         // Chemin vers l'icône (optionnel)
  color?: string;        // Couleur de la source (hex, optionnel)
  maxItems?: number;     // Nombre max d'articles à récupérer (défaut: 10)
}
```

## Format des traductions

```json
{
  "title": "Titre de la source",
  "description": "Description courte de la source",
  "website": "URL du site web (optionnel)"
}
```

## Build et déploiement

Les flux RSS sont récupérés automatiquement lors du build :
- `npm run fetch-rss` : Récupère manuellement tous les flux
- `npm run build` : Lance `prebuild` qui exécute `fetch-rss` automatiquement

Les fichiers JSON générés sont stockés dans `public/rss-feeds/[slug].json`.

## Sources actuelles

- **microsoft-devblogs** : Microsoft DevBlogs .NET
  - URL : https://devblogs.microsoft.com/dotnet/feed/
  - Articles : 20 max

## Notes

- Les flux sont mis à jour uniquement au moment du build
- Pour un contenu frais en production, planifiez des rebuilds réguliers (GitHub Actions cron job)
- Le format RSS 2.0 et Atom sont supportés par `rss-parser`
- Les articles de toutes les sources sont mélangés et triés par date sur la page News
