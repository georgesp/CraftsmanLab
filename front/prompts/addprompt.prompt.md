```prompt
# Ajout d’un nouveau Prompt — Fiche de collecte

Ce document recense les informations nécessaires pour créer un nouveau "prompt" dans l’application. Remplissez-le puis je créerai le module React correspondant.

---

## 1) Métadonnées (obligatoires)
- title: Titre affiché dans la liste et la page détail
- slug: Identifiant URL en kebab-case (unique) — ex: `my-new-prompt`
- shortDescription: Une phrase courte (≤ 140 caractères)

## 2) Contenu (obligatoire)
- description: 1–3 phrases pour expliquer le but du prompt (affiché au-dessus du contenu, dans un encadré avec `borderRadius: 1`, bordure grise, fond clair)
- promptText: Le contenu complet du prompt au format Markdown (affiché dans un bloc avec `borderRadius: 1`, bordure grise, fond clair, et bouton copier)

## 3) Structure des fichiers (meta.ts + traductions)
Nous séparons la meta du composant et colocalisons les traductions dans le dossier du prompt.

- Créez ces fichiers dans `src/components/prompts/<slug>/`:
  - `meta.ts` (exporte `const meta: PromptMeta`)
  - `<slug>.tsx` (le composant, qui `import { meta } from './meta'`)
  - `fr.json`
  - `en.json`

Structure attendue (la clé racine doit être le slug du prompt):

```json
{
  "<slug>": {
    "title": "Titre FR/EN",
    "shortDescription": "Résumé FR/EN",
    "description": "Description FR/EN",
    "content": {
      "introduction": "Texte d’introduction FR/EN",
      "copyButton": "Copier le prompt / Copy prompt",
      "copySuccess": "Prompt copié / Prompt copied",
      "writtenOn": "Écrit le / Written on",
      "sources": "Sources: …"
    }
  }
}
```

Raccordement manifest (central):
- Ouvrez `src/components/content-manifest.ts`
- Ajoutez:
  - `import { meta as myPromptMeta } from './prompts/<slug>/meta'`
  - Dans `promptsEntries`: `{ ...myPromptMeta, load: () => import('./prompts/<slug>/<slug>') }`
  - `import myPromptFr from './prompts/<slug>/fr.json'` et `import myPromptEn from './prompts/<slug>/en.json'`
  - Dans `promptsTranslationsFr/En`: ajoutez `...myPromptFr` et `...myPromptEn`

## 4) Attribution (optionnel)
- sourceUrl: Lien(s) vers une source d’inspiration/référence
- author: Auteur ou organisation (si pertinente)

## 5) Emplacement, nommage et i18n dans le module

## 4bis) Convention d’affichage du pied de page
- Le pied de page de chaque prompt doit afficher :
  - La source (ex : « Sources: Tiré de la page de David Fowler ») alignée à gauche, en italique
  - La date d’écriture (ex : « Écrit le 10/08/2025 ») alignée à droite, en italique
- Les deux éléments sont sur la même ligne, chacun de leur côté, et en style italique
- Voir un exemple dans le module `async-guidances.tsx`
-
- La description peut être affichée comme texte seul suivi d'une barre horizontale (`borderTop: 1px solid`, `borderColor: 'grey.300'`, `marginBottom: 3`).
- Le bloc promptText doit être affiché dans un composant similaire (ex : CodeBlock ou Paper) avec : `border: 1px solid`, `borderColor: 'grey.300'`, `borderRadius: 1`.
- Le bouton copier doit être positionné en haut à droite du bloc promptText, avec un style cohérent (`borderRadius: 1`, fond blanc semi-transparent, hover bleu, etc.).
- Dossier: `src/components/prompts/<slug>/`
- Fichier: `<slug>.tsx`
- Le module exporte:
  - `export const promptText = "...markdown..."`
  - `export default` un composant React qui utilise `useTranslation('prompts')` et affiche:
    - la description via `t('<slug>.description')` ou `t('<slug>.content.introduction')`
    - le bouton copier `t('<slug>.content.copyButton')`
    - le toast de succès `t('<slug>.content.copySuccess')`
    - le pied de page: `t('<slug>.content.sources')` et `t('<slug>.content.writtenOn')`
- L’enregistrement passe désormais par `content-manifest.ts` (plus d’`import.meta.glob`).

## 6) Conventions
- slug en kebab-case et unique
- Pas de dépendances externes non nécessaires
- Contenu Markdown clair et structuré
- Pas de `console.log` dans le module final
- Pas de texte en dur dans le TSX (utiliser les clés de traduction)

## 7) Checklist de livraison (mise à jour)
- [ ] slug unique (pas déjà présent dans la liste des prompts)
- [ ] Dossier prêt: `src/components/prompts/<slug>/{ meta.ts, <slug>.tsx, fr.json, en.json }`
- [ ] Enregistré dans `src/components/content-manifest.ts` (metas + translations + loader)
- [ ] Le composant utilise `useTranslation('prompts')` et les clés `<slug>.*`
- [ ] Build OK (`npm run build`)
- [ ] Le nouveau prompt apparaît dans la liste (/prompts)
- [ ] La page détail rend le contenu et le bouton "copier" fonctionne

---

## 8) Modèle à remplir

- title: 
- slug: 
- shortDescription: 

- description:
  > 

- promptText (Markdown):
```md
# Titre interne (facultatif)

...Votre contenu de prompt ici...
```

- sourceUrl (optionnel): 
- author (optionnel): 
```
