```prompt

# Guide — Ajouter une nouvelle source RSS dans la section News

Ce document décrit les étapes et règles pour ajouter une nouvelle source de flux RSS à CraftsmanLab (frontend React + TypeScript).

## Objectifs rapides
- Fournir un guide complet pour intégrer une nouvelle source RSS
- Assurer la cohérence avec l'architecture existante (registry pattern)
- Garantir le support multilingue (FR/EN) pour les métadonnées de la source
- Configurer correctement l'indexation pour la recherche

## Architecture des sources RSS

Chaque source RSS est organisée dans son propre sous-dossier avec la structure suivante :

```
src/components/news/
├── registry.ts                    # Registry centralisé de toutes les sources
├── index.ts                       # Exports principaux
└── [source-slug]/
    ├── meta.ts                    # Métadonnées de la source (slug, feedUrl, icon, etc.)
    ├── fr.json                    # Traductions françaises (title, description)
    ├── en.json                    # Traductions anglaises (title, description)
    └── data.json                  # Données RSS générées au build (ignoré par git)
```

## Règles de nommage et bonnes pratiques

- **Le `slug`** doit être unique, en kebab-case, sans espace ni accent (ex: `azure-updates`, `github-blog`)
- **Le `feedUrl`** doit pointer vers un flux RSS/Atom valide et accessible publiquement
- **Les `searchKeywords`** doivent inclure :
  - Le nom de la source et ses variantes
  - Les technologies/domaines couverts
  - Les termes en français ET en anglais
  - Les acronymes et abréviations courantes
- **L'icône** (optionnel) doit être placée dans `/public/` et référencée par son chemin relatif
- **La couleur** (optionnel) doit être au format hexadécimal (ex: `#0078D4`)
- **maxItems** définit le nombre maximum d'articles à récupérer (recommandé: 10-20)

## Étapes pour ajouter une nouvelle source RSS

### 1. Créer le dossier de la source

Créez un nouveau dossier avec le slug de votre source :

```bash
mkdir -p src/components/news/<source-slug>
```

Exemple :
```bash
mkdir -p src/components/news/azure-updates
```

### 2. Créer le fichier `meta.ts`

Ce fichier contient les métadonnées techniques de la source RSS.

```typescript
// src/components/news/<source-slug>/meta.ts
import type { RssSourceMeta } from '../microsoft-devblogs/meta';

export const <sourceName>Meta: RssSourceMeta = {
  slug: 'source-slug',
  feedUrl: 'https://example.com/feed.xml',
  icon: '/source-icon.png',           // Optionnel
  color: '#0078D4',                   // Optionnel
  maxItems: 15,                       // Nombre d'articles à récupérer
  searchKeywords: [                   // Pour l'indexation de la recherche
    'mot-clé-1',
    'mot-clé-2',
    'keyword-1',
    'keyword-2',
    // ...
  ],
};
```

**Exemple complet (Azure Updates) :**

```typescript
// src/components/news/azure-updates/meta.ts
import type { RssSourceMeta } from '../microsoft-devblogs/meta';

export const azureUpdatesMeta: RssSourceMeta = {
  slug: 'azure-updates',
  feedUrl: 'https://azurecomcdn.azureedge.net/en-us/updates/feed/',
  icon: '/azure-icon.png',
  color: '#0089D6',
  maxItems: 15,
  searchKeywords: [
    'azure',
    'microsoft',
    'cloud',
    'actualités',
    'news',
    'updates',
    'mises à jour',
    'services',
    'annonces',
    'announcements',
  ],
};
```

### 3. Créer les fichiers de traduction

Les traductions permettent d'afficher le nom et la description de la source dans les deux langues.

**fr.json** (traductions françaises) :

```json
{
  "title": "Nom de la source",
  "description": "Description courte de la source en français.",
  "website": "https://example.com"
}
```

**en.json** (traductions anglaises) :

```json
{
  "title": "Source Name",
  "description": "Short description of the source in English.",
  "website": "https://example.com"
}
```

**Exemple complet (Azure Updates) :**

```json
// src/components/news/azure-updates/fr.json
{
  "title": "Azure Updates",
  "description": "Les dernières mises à jour des services Azure.",
  "website": "https://azure.microsoft.com/updates/"
}
```

```json
// src/components/news/azure-updates/en.json
{
  "title": "Azure Updates",
  "description": "The latest updates on Azure services.",
  "website": "https://azure.microsoft.com/updates/"
}
```

### 4. Enregistrer la source dans le registry

Le registry centralisé (`registry.ts`) regroupe toutes les sources RSS.

Éditez `src/components/news/registry.ts` :

1. **Importez les métadonnées et traductions** :

```typescript
import { microsoftDevBlogsMeta } from './microsoft-devblogs/meta';
import microsoftDevBlogsFr from './microsoft-devblogs/fr.json';
import microsoftDevBlogsEn from './microsoft-devblogs/en.json';
import microsoftDevBlogsData from './microsoft-devblogs/data.json';

// Ajoutez vos imports ici
import { azureUpdatesMeta } from './azure-updates/meta';
import azureUpdatesFr from './azure-updates/fr.json';
import azureUpdatesEn from './azure-updates/en.json';
import azureUpdatesData from './azure-updates/data.json';
```

2. **Ajoutez votre source dans le tableau `rssSources`** :

```typescript
export const rssSources: RssSource[] = [
  {
    meta: microsoftDevBlogsMeta,
    translations: {
      fr: microsoftDevBlogsFr,
      en: microsoftDevBlogsEn,
    },
    data: microsoftDevBlogsData as RssFeedData,
  },
  // Ajoutez votre nouvelle source ici
  {
    meta: azureUpdatesMeta,
    translations: {
      fr: azureUpdatesFr,
      en: azureUpdatesEn,
    },
    data: azureUpdatesData as RssFeedData,
  },
];
```

### 5. Mettre à jour le script de fetch RSS

**IMPORTANT** : Le script `scripts/fetch-rss.mjs` contient une liste hardcodée des sources RSS à récupérer.

Éditez `scripts/fetch-rss.mjs` et ajoutez votre source dans le tableau `RSS_SOURCES` :

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
  // Add more RSS sources here as needed
];
```

**Attention** : Les valeurs `slug`, `feedUrl` et `maxItems` doivent correspondre exactement à celles définies dans `meta.ts`.

### 6. Tester le fetch RSS

Exécutez le script pour générer les données RSS :

```bash
npm run fetch-rss
```

Le script va :
- Récupérer les articles depuis l'URL du flux RSS
- Créer le fichier `data.json` dans le dossier de votre source
- Afficher un résumé du nombre d'articles récupérés

**Vérifications :**
- Le fichier `src/components/news/<source-slug>/data.json` a été créé
- Il contient bien les articles du flux RSS
- Aucune erreur n'apparaît dans la console

### 7. Tester l'affichage

Lancez le serveur de développement :

```bash
npm start
```

**Vérifications :**
1. **Page News** (`/news`) : les articles de la nouvelle source apparaissent dans la liste
2. **Page d'accueil** (`/`) : les derniers articles (des 3 sources combinées) s'affichent
3. **Recherche** : tapez un mot-clé de votre source dans la barre de recherche
   - Les articles doivent apparaître dans les résultats avec l'icône journal 📰
   - Le clic sur un résultat doit ouvrir l'article dans un nouvel onglet
4. **Changement de langue** : vérifiez que les traductions FR/EN fonctionnent
5. **Badge de source** : vérifiez que le Chip affiche correctement le nom de la source

## Gestion des erreurs

Si le flux RSS est temporairement indisponible, le système :
- Continue de fonctionner avec les autres sources
- Affiche un message d'erreur en haut de la page News
- Conserve les données précédemment récupérées (si disponibles)

Pour gérer les erreurs spécifiques à votre source :
- Vérifiez que l'URL du flux est correcte et accessible
- Testez le flux avec un validateur RSS en ligne
- Assurez-vous que le flux respecte les standards RSS 2.0 ou Atom

## Intégration dans le build de production

Le script `fetch-rss` est automatiquement exécuté avant chaque build via `prebuild` dans `package.json` :

```json
{
  "scripts": {
    "prebuild": "npm run generate-sitemap && npm run fetch-rss",
    "build": "vite build",
    "fetch-rss": "node scripts/fetch-rss.mjs"
  }
}
```

Lors du déploiement sur Azure Static Web Apps, GitHub Actions exécute automatiquement :
1. `npm run prebuild` (génère `data.json` pour chaque source)
2. `npm run build` (compile le site avec les données RSS)
3. Déploie les fichiers statiques

## Fichiers à ne PAS committer

Le fichier `data.json` est généré automatiquement et ne doit PAS être commis dans Git.

Vérifiez que `.gitignore` contient :

```gitignore
src/components/news/*/data.json
```

**À committer :**
- `meta.ts`
- `fr.json`
- `en.json`

**À NE PAS committer :**
- `data.json` (généré automatiquement)

## Template complet pour une nouvelle source

### meta.ts
```typescript
import type { RssSourceMeta } from '../microsoft-devblogs/meta';

export const newSourceMeta: RssSourceMeta = {
  slug: 'new-source',
  feedUrl: 'https://example.com/feed.xml',
  icon: '/new-source-icon.png',
  color: '#FF6600',
  maxItems: 15,
  searchKeywords: [
    'source-name',
    'nom-source',
    'technology',
    'technologie',
    'keyword1',
    'mot-clé-1',
  ],
};
```

### fr.json
```json
{
  "title": "Nouvelle Source",
  "description": "Description de la nouvelle source en français.",
  "website": "https://example.com"
}
```

### en.json
```json
{
  "title": "New Source",
  "description": "Description of the new source in English.",
  "website": "https://example.com"
}
```

## Checklist finale

Avant de considérer l'ajout comme terminé :

- [ ] Le dossier `src/components/news/<slug>` existe
- [ ] `meta.ts` est créé avec tous les champs requis (slug, feedUrl, maxItems, searchKeywords)
- [ ] `fr.json` et `en.json` sont créés avec les traductions
- [ ] La source est enregistrée dans `registry.ts` (imports + ajout au tableau)
- [ ] La source est ajoutée dans `scripts/fetch-rss.mjs` (tableau `RSS_SOURCES`)
- [ ] `npm run fetch-rss` fonctionne sans erreur
- [ ] `data.json` est généré avec les articles
- [ ] Les articles apparaissent sur `/news`
- [ ] Les articles apparaissent dans la recherche
- [ ] Les articles apparaissent sur la page d'accueil (top 3)
- [ ] Les traductions FR/EN fonctionnent
- [ ] Les icônes et couleurs s'affichent correctement
- [ ] `data.json` est dans `.gitignore`

## Bonnes pratiques

1. **Choix de maxItems** : 
   - 10-20 articles pour un blog général
   - 5-10 pour des annonces officielles moins fréquentes

2. **Choix des searchKeywords** :
   - Pensez aux termes que les utilisateurs taperont
   - Incluez les acronymes (ex: "aspnet", "asp.net")
   - Mélangez FR et EN dans le même tableau

3. **Icône** :
   - Format PNG ou SVG
   - Taille recommandée : 32x32px à 64x64px
   - Placez-la dans `/public/`

4. **Couleur** :
   - Utilisez la couleur officielle de la marque/source
   - Évitez les couleurs trop claires (faible contraste)

5. **Description** :
   - Courte et descriptive (1-2 phrases max)
   - Doit donner envie de cliquer

## Exemple complet : GitHub Engineering Blog

Voici un exemple complet d'ajout du blog GitHub :

**1. Créer le dossier :**
```bash
mkdir -p src/components/news/github-blog
```

**2. meta.ts :**
```typescript
import type { RssSourceMeta } from '../microsoft-devblogs/meta';

export const githubBlogMeta: RssSourceMeta = {
  slug: 'github-blog',
  feedUrl: 'https://github.blog/engineering/feed/',
  icon: '/github-icon.png',
  color: '#24292e',
  maxItems: 15,
  searchKeywords: [
    'github',
    'git',
    'engineering',
    'ingénierie',
    'développement',
    'development',
    'devops',
    'ci/cd',
    'actions',
  ],
};
```

**3. fr.json :**
```json
{
  "title": "GitHub Engineering",
  "description": "Articles techniques de l'équipe d'ingénierie GitHub.",
  "website": "https://github.blog/engineering/"
}
```

**4. en.json :**
```json
{
  "title": "GitHub Engineering",
  "description": "Technical articles from the GitHub engineering team.",
  "website": "https://github.blog/engineering/"
}
```

**5. Mise à jour du registry :**
```typescript
import { githubBlogMeta } from './github-blog/meta';
import githubBlogFr from './github-blog/fr.json';
import githubBlogEn from './github-blog/en.json';
import githubBlogData from './github-blog/data.json';

export const rssSources: RssSource[] = [
  // ... autres sources
  {
    meta: githubBlogMeta,
    translations: {
      fr: githubBlogFr,
      en: githubBlogEn,
    },
    data: githubBlogData as RssFeedData,
  },
];
```

**6. Mise à jour du script fetch-rss.mjs :**
```javascript
const RSS_SOURCES = [
  {
    slug: 'microsoft-devblogs',
    feedUrl: 'https://devblogs.microsoft.com/dotnet/feed/',
    maxItems: 20,
  },
  {
    slug: 'github-blog',
    feedUrl: 'https://github.blog/engineering/feed/',
    maxItems: 15,
  },
  // Add more RSS sources here as needed
];
```

**7. Test :**
```bash
npm run fetch-rss
npm start
```

✅ C'est terminé ! Votre nouvelle source RSS est intégrée.

```
