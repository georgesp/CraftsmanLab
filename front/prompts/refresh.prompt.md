# Guide de Rafraîchissement des Flux RSS

Ce document décrit la procédure pour mettre à jour les articles des flux RSS du site CraftsmanLab.

## Vue d'ensemble

Le système récupère automatiquement les derniers articles depuis les flux RSS configurés et les stocke dans des fichiers `data.json` pour chaque source. Cette opération doit être effectuée régulièrement pour garder le contenu à jour.

**⚠️ Important : Préservation des Catégories**

Le script de rafraîchissement préserve automatiquement les catégories (`categories`) des articles existants. Cela permet de :
- ✅ Corriger manuellement les catégories mal formatées dans le flux RSS
- ✅ Ajouter des catégories personnalisées
- ✅ Normaliser les catégories entre différentes sources
- ✅ Éviter que les modifications manuelles soient écrasées lors du rafraîchissement

**Comportement du script :**
- Pour les **nouveaux articles** : utilise les catégories du flux RSS
- Pour les **articles existants** (même `guid`) : conserve les catégories du fichier `data.json` existant
- Les autres champs (titre, description, date) sont toujours mis à jour depuis le flux RSS

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

### 4. Tester Localement

Démarrez le serveur de développement pour vérifier les changements :

```bash
npm run dev
```

**Vérifications à effectuer :**
- ✅ La page `/news` affiche les nouveaux articles
- ✅ La section "Dernières actualités" de la page d'accueil est à jour
- ✅ Les filtres par source fonctionnent correctement
- ✅ La date "Dernière mise à jour" est correcte
- ✅ La recherche trouve les nouveaux articles

### 5. Committer les Changements

Si tout fonctionne correctement, committer les fichiers `data.json` mis à jour :

```bash
git add front/src/components/news/*/data.json
git commit -m "chore: mise à jour des flux RSS - $(date +%Y-%m-%d)"
git push
```

## Sources Actuellement Configurées

| Slug | URL du Flux | Max Items | Fréquence Typique |
|------|-------------|-----------|-------------------|
| `microsoft-devblogs` | https://devblogs.microsoft.com/dotnet/feed/ | 20 | Quotidienne |
| `developpez-dotnet` | https://dotnet.developpez.com/index/rss | 15 | Hebdomadaire |
| `jon-skeet-blog` | https://codeblog.jonskeet.uk/feed/ | 15 | Mensuelle |
| `thomas-levesque-blog` | https://thomaslevesque.com/index.xml | 15 | Mensuelle |
| `dotnettips-blog` | https://dotnettips.wordpress.com/feed/ | 15 | Hebdomadaire |

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

## Checklist de Rafraîchissement

- [ ] Exécuter `npm run fetch-rss` dans le dossier `front/`
- [ ] Vérifier que toutes les sources affichent `✅`
- [ ] Vérifier que les fichiers `data.json` sont mis à jour
- [ ] Vérifier que les catégories personnalisées sont préservées
- [ ] Tester localement avec `npm run dev`
- [ ] Vérifier la page `/news`
- [ ] Vérifier la section "Dernières actualités" sur la page d'accueil
- [ ] Tester les filtres par source et par catégorie
- [ ] Tester la recherche d'articles
- [ ] Committer les changements (`data.json`)
- [ ] Pousser sur le repository

## Commandes Rapides

```bash
# Rafraîchir tous les flux RSS
cd front && npm run fetch-rss

# Rafraîchir et tester immédiatement
cd front && npm run fetch-rss && npm run dev

# Rafraîchir, committer et pousser
cd front && npm run fetch-rss && \
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

## Ressources

- **Script de récupération** : `front/scripts/fetch-rss.mjs`
- **Configuration des sources** : `front/src/components/news/*/meta.ts`
- **Registry** : `front/src/components/news/registry.ts`
- **Guide d'ajout de sources** : `prompts/addnews.prompt.md`

---

💡 **Astuce** : Vous pouvez ajouter le rafraîchissement RSS dans votre script `prebuild` pour qu'il s'exécute automatiquement avant chaque build de production.
