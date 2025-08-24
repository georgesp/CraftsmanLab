## Style et phrasologiexport const meta = {
  slug: 'slug-unique', // kebab## Règles de nommage et bonnes pratiques
- Le `slug` doit être unique, en kebab-case, sans espace ni accent.
- Le `title` doit être court et explicite.
- Le `shortDescription` doit donner envie de cliquer, max 120 caractères.
- La date `writtenOn` au format `YYYY-MM-DD`.
- Les `keywords` doivent correspondre aux technologies utilisées (C#, TypeScript, etc.).
- Les `metadata.searchKeywords` doivent inclure :
  - **Le nom de l'outil/bibliothèque** principal (ex: "dapper", "automapper", "polly")
  - **Les concepts clés** abordés dans le tip
  - **Les cas d'usage** et problèmes résolus
  - **Les mots-clés techniques** en français et anglais
  - **Les termes alternatifs** que les utilisateurs pourraient chercher
- Le composant principal doit être exporté par défaut.
## Guide — ajouter un nouveau tip

Ce document rassemble les règles et le template à utiliser pour ajouter un tip dans CraftmanLab (frontend React + TypeScript).

Objectifs rapides
- Fournir un exemple réutilisable et cohérent pour chaque tip.
- Assurer une indexation correcte via `meta.metadata.searchKeywords` (FR/EN).
- Garantir que les exemples de code sont clairs et utilisables.

Règles importantes (résumé)
- Le `slug` doit être unique, en kebab-case, sans espace ni accent.
- Le `title` doit être court et explicite.
- Le `shortDescription` (vignette) : max 120 caractères.
- `writtenOn` : format `YYYY-MM-DD`.
- Les `keywords` doivent lister les technologies (ex : `['C#' as const]`).
- `metadata.searchKeywords` doit contenir mots FR et EN pertinents (outil, concepts, cas d'usage).
- Le composant principal doit être exporté par défaut.

Règles style & contenu
- Ton : tutoiement, direct, concret. Fait comme si tu donnais un conseil à un collègue dev.
- Va à l'essentiel : phrases courtes, listes, exemples pratiques.
- Pas d'encyclopédisme ni d'explications longues — renvoie à la doc si nécessaire.

Règles spécifiques sur les exemples de code (IMPORTANT)
- Tout contenu placé dans des `CodeBlock` destinés à être affichés au lecteur doit être en ANGLAIS.
- Les commentaires `//` à l'intérieur des blocs de code doivent être placés sur la ligne précédente et non en fin de ligne.
  - Exemple correct :

```csharp
// Target IOException
.Handle<IOException>()
.WaitAndRetry(3, attempt => TimeSpan.FromSeconds(Math.Pow(2, attempt)));
```

- Evite les commentaires de ligne en français à l'intérieur des `CodeBlock`.
- Les identifiants et noms de classes peuvent rester en français si nécessaire, mais privilégie l'anglais pour la lisibilité des exemples partagés.

Template minimal d’un module tip

```tsx
import React from 'react';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';

export const meta = {
  slug: 'slug-unique', // kebab-case, used in the URL
  title: 'Tip title',
  shortDescription: 'Short summary used in card (max 120 chars)',
  writtenOn: 'YYYY-MM-DD',
  keywords: ['C#' as const],
  metadata: {
    searchKeywords: {
      fr: ['outil', 'concept-principal'],
      en: ['tool', 'main-concept']
    }
  }
};

const MyTip: React.FC = () => {
  return (
    <Box>
      <Typography variant="h2" gutterBottom>Tip title</Typography>
      <Typography paragraph>
        Short intro: be direct and concise. Show examples and quick wins.
      </Typography>

      <Typography variant="h3">Example</Typography>
      <CodeBlock language="csharp" code={`// Example comment in English\nvar x = 1;`} />

      <Box mt={4} pt={2} borderTop={theme => `1px solid ${theme.palette.divider}`} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" component="div" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          <a href="https://example.com" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
            Source : documentation
          </a>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          Écrit le {meta.writtenOn}
        </Typography>
      </Box>
    </Box>
  );
};

const mod: TipModule = { default: MyTip, meta };
export default MyTip;
export { mod };
```

Checklist rapide avant PR
- Meta complet (slug, title, shortDescription, writtenOn, keywords, metadata.searchKeywords FR+EN).
- CodeBlock : content in English, comments on the previous line.
- Export default present.
- Footer (source link + date) present.

Exemples d'organisation
- `src/components/tips/collection/collection.tsx`
- `src/components/tips/dapper/dapper.tsx`

FAQ rapide
- Q : Dois-je traduire le texte UI (titres, paragraphes) ?
  - R : Non obligatoire. Priorité : exemples de code en anglais et commentaires dans les CodeBlock. Si tu veux rendre un tip bilingue, on pourra ajouter une version en `/locales` plus tard.

- Q : Puis-je utiliser des noms de classes en français dans les exemples ?
  - R : Oui, mais évite les mélanges incohérents. Préfère des identifiants en anglais pour les exemples partagés publiquement.

Si tu veux, je peux :
- vérifier automatiquement un tip existant et corriger les CodeBlock selon ces règles, ou
- préparer un script/checklist à lancer en local pour valider ces règles avant PR.
