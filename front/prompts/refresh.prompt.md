# Guide de Rafraîchissement des Flux RSS

Ce document décrit la procédure pour mettre à jour les articles des flux RSS du site CraftsmanLab.

## Vue d'ensemble

Le système récupère automatiquement les derniers articles depuis les flux RSS configurés et les stocke dans des fichiers `data.json` pour chaque source. Cette opération doit être effectuée régulièrement pour garder le contenu à jour.

**⚠️ Important : Préservation des Catégories et des Articles**

Le script de rafraîchissement préserve automatiquement :
- ✅ Les **catégories** (`categories`) des articles existants
- ✅ Les **anciens articles** qui ne sont plus dans le flux RSS (mode accumulation)

**Comportement du script :**
- Pour les **nouveaux articles** : utilise les catégories du flux RSS, ou génère des catégories intelligentes si le flux RSS n'en fournit pas
- Pour les **articles existants** (même `guid`) : conserve les catégories du fichier `data.json` existant ET les autres champs sont mis à jour depuis le flux RSS
- Pour les **articles avec catégories vides** : génère automatiquement des catégories pertinentes basées sur le titre et le contenu de l'article
- **Mode accumulation** : Les articles sont **ajoutés** au fichier `data.json` existant, jamais supprimés. Le script fusionne les nouveaux articles du flux RSS avec tous les anciens articles déjà présents
- **Tri par date** : Tous les articles (nouveaux + anciens) sont triés par date de publication, du plus récent au plus ancien
- **Paramètre maxItems** : Limite uniquement le nombre de nouveaux articles récupérés depuis le flux RSS lors de chaque rafraîchissement, mais ne limite pas le nombre total d'articles dans `data.json`

**Avantages du mode accumulation :**
- 📚 Constitution d'une **archive complète** des articles au fil du temps
- 🔍 Les anciens articles restent **recherchables** et accessibles
- 📊 Meilleure **couverture historique** des technologies et actualités
- 🎯 Aucune perte d'information même si un article disparaît du flux RSS

## Quand rafraîchir les flux ?

- **Quotidiennement** : Pour les sources très actives (Microsoft DevBlogs, Developpez.com)
- **Hebdomadairement** : Pour les blogs personnels moins fréquents
- **Avant un déploiement** : Pour s'assurer d'avoir le contenu le plus récent
- **Après l'ajout d'une nouvelle source** : Pour initialiser les données

## Procédure de Rafraîchissement

### 1. Exécuter le Script de Récupération

```bash
cd front
npm run fetch-rss
```

Le script va :
- ✅ Se connecter à chaque flux RSS configuré
- ✅ Récupérer les derniers articles (selon `maxItems` défini dans chaque source)
- ✅ Générer/mettre à jour les fichiers `data.json` dans chaque dossier de source
- ✅ Afficher un résumé avec le nombre d'articles par source

### 2. Vérifier la Sortie du Script

Le script affiche des informations détaillées :

```
🔄 Fetching all RSS feeds...
🔄 Fetching RSS feed: microsoft-devblogs...
🔄 Fetching RSS feed: developpez-dotnet...
🔄 Fetching RSS feed: jon-skeet-blog...
🔄 Fetching RSS feed: thomas-levesque-blog...
🔄 Fetching RSS feed: dotnettips-blog...
✅ microsoft-devblogs: 10 articles written
✅ developpez-dotnet: 15 articles written
✅ jon-skeet-blog: 10 articles written
✅ thomas-levesque-blog: 15 articles written
✅ dotnettips-blog: 10 articles written
✅ All RSS feeds fetched successfully!
📁 Output directory: .../front/src/components/news
📅 Last updated: 2025-12-23T15:09:48.243Z
```

**Points à vérifier :**
- ✅ Toutes les sources affichent un statut `✅` (succès)
- ✅ Le nombre d'articles semble cohérent
- ⚠️ Si une source échoue, vérifier l'URL du flux dans `meta.ts`

### 3. Vérifier les Fichiers Générés

Les fichiers `data.json` doivent être mis à jour dans :
```
front/src/components/news/
├── microsoft-devblogs/data.json
├── developpez-dotnet/data.json
├── jon-skeet-blog/data.json
├── thomas-levesque-blog/data.json
└── dotnettips-blog/data.json
```

**Structure attendue du data.json :**
```json
{
  "items": [
    {
      "title": "Titre de l'article",
      "link": "https://...",
      "pubDate": "2025-12-23T10:00:00.000Z",
      "description": "Description ou extrait...",
      "content": "Contenu complet de l'article",
      "categories": ["C#", ".NET"]
    }
  ],
  "lastUpdated": "2025-12-23T15:09:48.243Z"
}
```

### 4. Ajouter les Catégories Manquantes (si nécessaire)

⚠️ **Important** : Certains flux RSS ne fournissent pas de catégories pour leurs articles. Dans ce cas, il faut générer automatiquement des catégories pertinentes.

Pour ajouter des catégories aux articles qui n'en ont pas :

```bash
cd front
node scripts/add-missing-categories.mjs
```

Le script va :
- ✅ Analyser tous les fichiers `data.json` de toutes les sources
- ✅ Identifier les articles avec des catégories vides (`categories: []`)
- ✅ Générer automatiquement des catégories pertinentes basées sur le **titre** et le **contenu** de l'article
- ✅ Détecter les technologies, frameworks, langages, outils mentionnés (C#, .NET, ASP.NET Core, Azure, etc.)
- ✅ Sauvegarder les fichiers avec les catégories ajoutées

**Exemple de sortie :**
```
🔄 Ajout de catégories manquantes...

✓ microsoft-devblogs: Tous les articles ont déjà des catégories
✓ developpez-dotnet: Tous les articles ont déjà des catégories
✅ thomas-levesque-blog: 71 articles mis à jour avec des catégories

✅ Terminé ! 71 articles au total ont été mis à jour avec des catégories.
```

**Quand utiliser ce script :**
- 📌 Après avoir ajouté une nouvelle source RSS qui ne fournit pas de catégories
- 📌 Après avoir rafraîchi des flux RSS qui ont des articles sans catégories
- 📌 Lorsqu'un article a des catégories vides ou non pertinentes

**Note :** Les catégories générées automatiquement sont intelligentes et basées sur des mots-clés techniques détectés dans le contenu. Vous pouvez ensuite les modifier manuellement si nécessaire, et elles seront préservées lors des prochains rafraîchissements.

### 5. Tester Localement

Démarrez le serveur de développement pour vérifier les changements :

```bash
npm run dev
```

**Vérifications à effectuer :**
- ✅ La page `/news` affiche les nouveaux articles
- ✅ La section "Dernières actualités" de la page d'accueil est à jour
- ✅ Les filtres par source fonctionnent correctement
- ✅ Les filtres par catégorie affichent tous les articles correctement
- ✅ La date "Dernière mise à jour" est correcte
- ✅ La recherche trouve les nouveaux articles

### 5. Committer les Changements

Si tout fonctionne correctement, committer les fichiers `data.json` mis à jour :

```bash
git add front/src/components/news/*/data.json
git add front/scripts/add-missing-categories.mjs  # Si vous avez modifié le script
git commit -m "chore: mise à jour des flux RSS avec catégories - $(date +%Y-%m-%d)"
git push
```

## Sources Actuellement Configurées

| Slug | URL du Flux | Max Items | Fréquence Typique | Note |
|------|-------------|-----------|-------------------|------|
| `microsoft-devblogs` | https://devblogs.microsoft.com/dotnet/feed/ | 100 | Quotidienne | Mode accumulation |
| `developpez-dotnet` | https://dotnet.developpez.com/index/rss | 100 | Hebdomadaire | Mode accumulation |
| `jon-skeet-blog` | https://codeblog.jonskeet.uk/feed/ | 100 | Mensuelle | Mode accumulation |
| `thomas-levesque-blog` | https://thomaslevesque.com/index.xml | 100 | Mensuelle | Mode accumulation |
| `dotnettips-blog` | https://dotnettips.wordpress.com/feed/ | 100 | Hebdomadaire | Mode accumulation |
| `jetbrains-dotnet-blog` | https://blog.jetbrains.com/dotnet/feed/ | 100 | Hebdomadaire | Mode accumulation |
| `anthony-giretti-blog` | https://anthonygiretti.com/feed/ | 100 | Mensuelle | Mode accumulation |

**Note sur maxItems** : Cette valeur limite le nombre de **nouveaux** articles récupérés depuis le flux RSS à chaque rafraîchissement. Le nombre total d'articles dans `data.json` peut être plus élevé car tous les anciens articles sont conservés (mode accumulation).

## Automatisation (CI/CD)

### GitHub Actions

Pour automatiser le rafraîchissement quotidien, vous pouvez créer une GitHub Action :

```yaml
# .github/workflows/refresh-rss.yml
name: Refresh RSS Feeds

on:
  schedule:
    - cron: '0 6 * * *'  # Tous les jours à 6h UTC
  workflow_dispatch:  # Permet le déclenchement manuel

jobs:
  refresh:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: |
          cd front
          npm ci
          
      - name: Fetch RSS feeds
        run: |
          cd front
          npm run fetch-rss
          
      - name: Commit changes
        run: |
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git config --local user.name "github-actions[bot]"
          git add front/src/components/news/*/data.json
          git diff --staged --quiet || git commit -m "chore: mise à jour automatique des flux RSS"
          
      - name: Push changes
        uses: ad-m/github-push-action@master
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          branch: ${{ github.ref }}
```

## Dépannage

### Erreur : "Failed to fetch RSS feed"

**Causes possibles :**
- Le flux RSS est temporairement indisponible
- L'URL du flux a changé
- Problème de connexion réseau

**Solutions :**
1. Vérifier l'URL dans le navigateur
2. Attendre quelques minutes et réessayer
3. Mettre à jour l'URL dans `meta.ts` si elle a changé

### Erreur : "data.json does not exist"

**Cause :** Le script n'a pas encore été exécuté pour cette source

**Solution :**
```bash
npm run fetch-rss
```

### Aucun nouvel article récupéré

**Causes possibles :**
- Le flux n'a pas publié de nouveaux articles
- Le `maxItems` limite le nombre d'articles
- Le flux utilise un format non standard

**Solutions :**
1. Vérifier manuellement le flux RSS dans le navigateur
2. Augmenter `maxItems` dans `meta.ts` si nécessaire
3. Vérifier les logs du script pour plus de détails

### Modifier manuellement les catégories

Si vous souhaitez corriger ou personnaliser les catégories d'un article :

1. **Ouvrir le fichier `data.json`** de la source concernée :
   ```
   front/src/components/news/[slug]/data.json
   ```

2. **Trouver l'article** par son `guid` ou `title`

3. **Modifier le champ `categories`** :
   ```json
   {
     "title": "Titre de l'article",
     "categories": ["C#", ".NET", "Performance"]
   }
   ```

4. **Sauvegarder le fichier**

5. **Rafraîchir les flux RSS** :
   ```bash
   npm run fetch-rss
   ```
   
   ✅ Les catégories modifiées seront **préservées** lors du prochain rafraîchissement

**💡 Astuce :** Cette fonctionnalité est particulièrement utile pour :
- Normaliser les catégories entre différentes sources
- Corriger les catégories mal formatées (ex: "c#" → "C#")
- Ajouter des catégories personnalisées pour améliorer les filtres
- Supprimer des catégories non pertinentes

**💡 Astuce alternative :** Plutôt que de modifier manuellement chaque article, vous pouvez aussi utiliser le script `add-missing-categories.mjs` qui génère automatiquement des catégories pertinentes pour tous les articles vides en une seule commande.

## Checklist de Rafraîchissement

- [ ] Exécuter `npm run fetch-rss` dans le dossier `front/`
- [ ] Vérifier que toutes les sources affichent `✅`
- [ ] Vérifier que les fichiers `data.json` sont mis à jour
- [ ] **Exécuter `node scripts/add-missing-categories.mjs` pour ajouter les catégories manquantes**
- [ ] Vérifier que les catégories personnalisées sont préservées
- [ ] Tester localement avec `npm run dev`
- [ ] Vérifier la page `/news`
- [ ] Vérifier la section "Dernières actualités" sur la page d'accueil
- [ ] Tester les filtres par source et par catégorie
- [ ] Tester la recherche d'articles
- [ ] **Vérifier le thème "Autres" pour identifier de nouvelles catégories fréquentes**
- [ ] **Si nécessaire, mettre à jour `categoryThemes` dans `news-page.tsx`**
- [ ] Committer les changements (`data.json` et éventuellement `news-page.tsx`)
- [ ] Pousser sur le repository

## Commandes Rapides

```bash
# Rafraîchir tous les flux RSS
cd front && npm run fetch-rss

# Rafraîchir et ajouter les catégories manquantes
cd front && npm run fetch-rss && node scripts/add-missing-categories.mjs

# Rafraîchir, ajouter catégories et tester immédiatement
cd front && npm run fetch-rss && node scripts/add-missing-categories.mjs && npm run dev

# Rafraîchir, ajouter catégories, committer et pousser
cd front && npm run fetch-rss && node scripts/add-missing-categories.mjs && \
git add src/components/news/*/data.json && \
git commit -m "chore: mise à jour RSS avec catégories" && \
git push
```
git add src/components/news/*/data.json && \
git commit -m "chore: mise à jour RSS" && \
git push
```

## Bonnes Pratiques

1. **Fréquence de mise à jour** : Adapter selon l'activité de chaque source
2. **Avant déploiement** : Toujours rafraîchir pour avoir le contenu le plus récent
3. **Monitoring** : Surveiller les échecs de récupération
4. **Backup** : Garder un historique des `data.json` via Git
5. **Performance** : Le script utilise `Promise.all()` pour récupérer tous les flux en parallèle
6. **Catégories personnalisées** : Profitez de la préservation des catégories pour normaliser et améliorer les filtres
7. **Nouveaux mots clés** : Lorsque de nouveaux mots clés (technologies, frameworks, outils) apparaissent dans les flux RSS, il faut les ajouter dans la définition des catégories dans le fichier `front/src/pages/News/news-page.tsx` (objet `categoryThemes`) pour qu'ils soient correctement groupés par thème dans l'interface utilisateur

## Technique : Préservation des Catégories

Le script `fetch-rss.mjs` implémente un mécanisme de préservation des catégories :

```javascript
// 1. Charge le fichier data.json existant
const existingData = await loadExistingData(slug);

// 2. Crée une Map des articles existants par guid
const existingItemsMap = new Map();
existingData?.items?.forEach(item => {
  existingItemsMap.set(item.guid, item);
});

// 3. Pour chaque nouvel article, vérifie s'il existe déjà
const items = feed.items.map(item => {
  const guid = item.guid || item.link;
  const existingItem = existingItemsMap.get(guid);
  
  return {
    // ... autres champs mis à jour depuis le flux RSS
    // Préserve les catégories existantes si l'article existe déjà
    categories: existingItem?.categories || item.categories || [],
  };
});
```

**Identifiant utilisé :** Le champ `guid` (ou `link` en fallback) sert d'identifiant unique pour matcher les articles existants.

## Mise à Jour des Catégories dans l'Interface

### Contexte
Lorsque de nouveaux mots clés (technologies, frameworks, outils, plateformes) apparaissent dans les flux RSS, ils doivent être ajoutés dans le fichier `front/src/pages/News/news-page.tsx` pour être correctement regroupés par thème dans l'interface utilisateur.

### Où modifier
Le fichier à modifier est : [front/src/pages/News/news-page.tsx](../src/pages/News/news-page.tsx)

L'objet `categoryThemes` (lignes 16-28) définit le regroupement des catégories par thème :

```typescript
const categoryThemes: Record<string, string[]> = {
  'Sources': [], // Les sources seront ajoutées dynamiquement
  'Langages': ['.NET', 'C#', 'F#', 'Swift', 'TypeScript', 'JavaScript', 'Python', 'Java', 'Kotlin', 'Rust', 'Go'],
  'Frameworks': ['.NET MAUI', 'ASP.NET', 'Blazor', 'React', 'Angular', 'Vue', 'Entity Framework', 'ML.NET'],
  'Plateformes': ['Azure', 'Azure DevOPs', 'GitHub', 'AWS', 'Google Cloud', 'Kubernetes', 'Docker'],
  'Mobile': ['iOS', 'Android', 'Mobile', 'Xamarin', 'Widgets'],
  'Testing': ['Testing', 'Unit Testing', 'Integration Testing', 'Test Automation'],
  'DevOps': ['CI/CD', 'DevOps', 'Deployment', 'Monitoring'],
  'Outils': ['Visual Studio', 'VS Code', 'Xcode', 'Rider', 'Git'],
  'Architecture': ['Microservices', 'Design Patterns', 'Architecture', 'Cloud Native'],
  'Autres': []
};
```

### Quand mettre à jour

Après avoir rafraîchi les flux RSS, vérifiez si de nouvelles catégories apparaissent fréquemment :

1. **Lancez le site en mode développement** :
   ```bash
   npm run dev
   ```

2. **Accédez à la page News** : `/news`

3. **Vérifiez le thème "Autres"** : Si des catégories importantes apparaissent dans le thème "Autres", elles devraient probablement être ajoutées à un thème spécifique

4. **Ajoutez les nouveaux mots clés** dans `categoryThemes` dans le thème approprié

### Exemple de mise à jour

Si vous remarquez que ".NET 10" ou "IA" apparaissent fréquemment dans "Autres" :

```typescript
const categoryThemes: Record<string, string[]> = {
  'Sources': [],
  'Langages': ['.NET', '.NET 10', 'C#', 'F#', 'Swift', 'TypeScript', 'JavaScript', 'Python', 'Java', 'Kotlin', 'Rust', 'Go'],
  'Frameworks': ['.NET MAUI', 'ASP.NET', 'Blazor', 'React', 'Angular', 'Vue', 'Entity Framework', 'ML.NET'],
  'Plateformes': ['Azure', 'Azure DevOPs', 'GitHub', 'AWS', 'Google Cloud', 'Kubernetes', 'Docker'],
  'IA & ML': ['IA', 'AI', 'Copilot', 'GitHub Copilot', 'GPT', 'Machine Learning', 'ML.NET'], // Nouveau thème
  'Mobile': ['iOS', 'Android', 'Mobile', 'Xamarin', 'Widgets'],
  'Testing': ['Testing', 'Unit Testing', 'Integration Testing', 'Test Automation'],
  'DevOps': ['CI/CD', 'DevOps', 'Deployment', 'Monitoring'],
  'Outils': ['Visual Studio', 'VS Code', 'Xcode', 'Rider', 'Git'],
  'Architecture': ['Microservices', 'Design Patterns', 'Architecture', 'Cloud Native'],
  'Autres': []
};
```

### Fonctionnement du Matching

Le système fait un matching bidirectionnel (insensible à la casse) :
- Si une catégorie **contient** un mot clé → match
- Si un mot clé **contient** une catégorie → match

Par exemple :
- `.NET 10` matchera avec `.NET` dans le thème "Langages"
- `ASP.NET Core` matchera avec `ASP.NET` dans le thème "Frameworks"
- `Visual Studio 2022` matchera avec `Visual Studio` dans le thème "Outils"

### Checklist de Mise à Jour des Catégories

Après avoir rafraîchi les flux RSS :

- [ ] Tester localement avec `npm run dev`
- [ ] Consulter la page `/news`
- [ ] Vérifier le thème "Autres"
- [ ] Identifier les catégories fréquentes mal placées
- [ ] Ajouter les nouveaux mots clés dans `categoryThemes`
- [ ] Créer de nouveaux thèmes si nécessaire
- [ ] Re-tester l'interface pour vérifier le groupement
- [ ] Committer les modifications de `news-page.tsx`

## Génération Intelligente de Catégories

Lorsqu'un article n'a pas de catégories (tableau vide ou non fourni par le flux RSS), le script peut générer automatiquement des catégories pertinentes en analysant :
- Le **titre** de l'article
- Le **contentSnippet** (extrait du contenu)

### Comment ajouter la génération automatique de catégories

Si vous souhaitez enrichir automatiquement les catégories vides, modifiez le script `fetch-rss.mjs` :

```javascript
// Fonction pour collecter toutes les catégories existantes dans tous les articles
function getAllExistingCategories(allData) {
  const categories = new Set();
  allData.forEach(data => {
    data.items?.forEach(item => {
      item.categories?.forEach(cat => categories.add(cat));
    });
  });
  return Array.from(categories);
}

// Fonction pour trouver une catégorie existante proche
function findSimilarCategory(newCategory, existingCategories) {
  const newLower = newCategory.toLowerCase();
  
  // Recherche exacte (insensible à la casse)
  const exactMatch = existingCategories.find(cat => 
    cat.toLowerCase() === newLower
  );
  if (exactMatch) return exactMatch;
  
  // Recherche de similarité
  for (const existing of existingCategories) {
    const existingLower = existing.toLowerCase();
    // Si l'une contient l'autre
    if (newLower.includes(existingLower) || existingLower.includes(newLower)) {
      return existing;
    }
    // Variantes courantes
    if ((newLower === 'ai' && existingLower === 'ia') || 
        (newLower === 'ia' && existingLower === 'ai')) {
      return existing;
    }
  }
  
  return newCategory; // Pas de match, retourner la nouvelle
}

// Fonction pour générer des catégories basées sur le contenu
function generateCategories(title, contentSnippet, existingCategories) {
  const text = `${title} ${contentSnippet || ''}`.toLowerCase();
  const rawCategories = [];
  
  // Détection des technologies
  if (text.match(/\bc#\b|csharp|c-sharp/i)) rawCategories.push('C#');
  if (text.match(/\.net\s*\d+/i)) {
    const match = text.match(/\.net\s*(\d+)/i);
    if (match) rawCategories.push(`.NET ${match[1]}`);
  }
  if (text.match(/\baspnet|asp\.net/i)) rawCategories.push('ASP.NET Core');
  if (text.match(/\bblazor\b/i)) rawCategories.push('Blazor');
  if (text.match(/\bvisual studio\s*(\d+)?/i)) {
    const match = text.match(/visual studio\s*(\d+)/i);
    rawCategories.push(match ? `Visual Studio ${match[1]}` : 'Visual Studio');
  }
  if (text.match(/\bentity framework|ef core/i)) rawCategories.push('Entity Framework Core');
  if (text.match(/\bazure\b/i)) rawCategories.push('Azure');
  if (text.match(/\bia\b|intelligence artificielle|copilot|gpt/i)) rawCategories.push('IA');
  if (text.match(/\bperformance\b/i)) rawCategories.push('Performance');
  if (text.match(/\bsecurity|sécurité/i)) rawCategories.push('Security');
  if (text.match(/\btesting|tests|unit test/i)) rawCategories.push('Testing');
  
  // Réutiliser les catégories existantes quand c'est possible
  return rawCategories.map(cat => findSimilarCategory(cat, existingCategories));
}

// Au début du script, charger toutes les catégories existantes
const allExistingData = [];
for (const source of RSS_SOURCES) {
  const data = await loadExistingData(source.slug);
  if (data) allExistingData.push(data);
}
const existingCategories = getAllExistingCategories(allExistingData);

// Dans la boucle de traitement des articles
const items = feed.items.map(item => {
  const guid = item.guid || item.link;
  const existingItem = existingItemsMap.get(guid);
  
  // Si l'article existe, on garde ses catégories
  let categories = existingItem?.categories;
  
  // Si pas de catégories existantes, essayer le flux RSS
  if (!categories || categories.length === 0) {
    categories = item.categories || [];
  }
  
  // Si toujours vide, générer automatiquement en réutilisant les catégories existantes
  if (categories.length === 0) {
    categories = generateCategories(item.title, item.contentSnippet, existingCategories);
  }
  
  return {
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    contentSnippet: item.contentSnippet,
    creator: item.creator || '',
    categories: categories,
    guid: guid,
  };
});
```

### Règles de Génération Suggérées

Voici quelques patterns courants à détecter :

| Pattern | Catégories Suggérées |
|---------|---------------------|
| `C# 14`, `C# 10` | `C#`, `C# 14`, `.NET 10` |
| `.NET 10`, `.NET 6` | `.NET 10` ou `.NET 6` |
| `ASP.NET Core` | `ASP.NET Core` |
| `Entity Framework Core` | `Entity Framework Core` |
| `Visual Studio 2022` | `Visual Studio 2022`, `IDE` |
| `Azure`, `Cosmos DB` | `Azure`, `Cosmos DB`, `Database` |
| `IA`, `Copilot`, `GPT` | `IA`, `Copilot` |
| `Performance`, `JIT`, `NativeAOT` | `Performance`, `Runtime` |
| `GitHub Actions` | `CI/CD`, `DevOps` |
| `JSON`, `Serialization` | `JSON`, `Serialization` |

### Bonnes Pratiques pour la Génération

1. **Être conservateur** : Il vaut mieux ne pas ajouter de catégorie que d'en ajouter une incorrecte
2. **Normaliser** : Toujours utiliser la même casse (ex: "C#", pas "c#" ou "csharp")
3. **Limiter le nombre** : 3-5 catégories max par article pour garder la pertinence
4. **Vérifier manuellement** : Après la première génération, vérifier et ajuster si nécessaire
5. **Les catégories manuelles priment** : Une fois ajustées manuellement, elles sont préservées
6. **Réutiliser les catégories existantes** : Avant de créer une nouvelle catégorie, vérifier si une similaire existe déjà (ex: "IA" vs "AI", "Visual Studio 2022" vs "Visual Studio")
7. **Maintenir la cohérence** : Utiliser les mêmes noms de catégories à travers toutes les sources pour faciliter le filtrage

## Ressources

- **Script de récupération** : `front/scripts/fetch-rss.mjs`
- **Configuration des sources** : `front/src/components/news/*/meta.ts`
- **Registry** : `front/src/components/news/registry.ts`
- **Guide d'ajout de sources** : `prompts/addnews.prompt.md`

---

💡 **Astuce** : Vous pouvez ajouter le rafraîchissement RSS dans votre script `prebuild` pour qu'il s'exécute automatiquement avant chaque build de production.
