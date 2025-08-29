````prompt
<!--
Dev tip léger « à la switch + tuple ». Ne pas dupliquer les règles: appliquer celles de
`front/prompts/addtips.prompt.md` (conventions UI, i18n, manifest, CodeBlock en anglais)
et s’y référer explicitement.
-->

Référence obligatoire
- Lis et applique strictement `front/prompts/addtips.prompt.md` pour:
  - la séparation meta.ts + TSX + fr/en JSON,
  - l’usage de TipContent, la hiérarchie des titres, les règles CodeBlock,
  - l’enregistrement dans `src/components/content-manifest.ts`.

But
- Produire un tip concis et pragmatique sur une fonctionnalité ciblée (ex: « switch expression + tuple pattern »).

Entrées
- slug (kebab-case, unique)
- titleFR/titleEN (titre court pour la carte)
- summaryFR/summaryEN (≤ 120 caractères)
- writtenOn (YYYY-MM-DD)
- keywords (optionnel: ["C#", "TypeScript", …])
- overviewFR/overviewEN (2–4 phrases de présentation)
- useCases: 1 à 3 cas d’usage, chacun avec { id, titleFR/EN, descriptionFR/EN, language: "csharp"|"typescript", code }
- sources: au moins 1 URL fiable

Sections minimales à rendre dans le composant
1) Présentation de la fonctionnalité (overview)
2) Cas d’utilisation avec example(s) de code
3) Résumé avec avantages / inconvénients
4) Bonnes pratiques (optionnel, court)

Livrables (sans re-décrire les règles déjà dans addtips)
- Dossier `src/components/tips/<slug>/` contenant:
  - meta.ts (title/shortDescription vides; rely on i18n)
  - <slug>.tsx (TipContent + sections ci-dessus; pas de texte FR en dur)
  - fr.json / en.json (clés: title, shortDescription, content.overview, content.useCases.*, content.summary, content.goodPractices, footer)
- Ajouts dans `content-manifest.ts` (imports meta + loader TSX + translations FR/EN), conformément à addtips.

Mini-templates (condensés)

meta.ts
```ts
import type { TipMeta } from '..';
export const meta: TipMeta = {
  slug: '<slug>',
  title: '',
  shortDescription: '',
  writtenOn: '<YYYY-MM-DD>',
  keywords: [/* 'C#' as const */],
  // Liste unique FR/EN (mots‑clés techniques, concepts, cas d'usage)
  metadata: { searchKeywords: [] },
};
```

<slug>.tsx (squelette)
```tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import TipContent from '../TipContent';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import { meta } from './meta';

const DevTip: React.FC = () => {
  const { t } = useTranslation('tips');
  return (
    <TipContent>
      <Typography variant="h3">{t('<slug>.content.mainTitle')}</Typography>
      <Typography paragraph>{t('<slug>.content.overview')}</Typography>

      <Typography variant="h4">{t('<slug>.content.useCases.title')}</Typography>
      <Typography variant="h5">{t('<slug>.content.useCases.case1.title')}</Typography>
      <Typography paragraph>{t('<slug>.content.useCases.case1.description')}</Typography>
      <CodeBlock language="csharp" code={`// Example in English\n// ...` } />

      <Typography variant="h4">{t('<slug>.content.summary.title')}</Typography>
      <Typography paragraph>{t('<slug>.content.summary.text')}</Typography>
      <Typography variant="h5">{t('<slug>.content.summary.prosTitle')}</Typography>
      <ul><li>{t('<slug>.content.summary.pros.0')}</li></ul>
      <Typography variant="h5">{t('<slug>.content.summary.consTitle')}</Typography>
      <ul><li>{t('<slug>.content.summary.cons.0')}</li></ul>

      <Typography variant="h4">{t('<slug>.content.goodPractices.title')}</Typography>
      <ul><li>{t('<slug>.content.goodPractices.items.0')}</li></ul>

      <Box mt={4} pt={2} borderTop={theme => `1px solid ${theme.palette.divider}`} sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          <a href={t('<slug>.content.footer.sourceUrl')} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
            {t('<slug>.content.footer.sourceLabel')}
          </a>
        </Typography>
        <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
          {t('<slug>.content.footer.writtenOn', { date: meta.writtenOn })}
        </Typography>
      </Box>
    </TipContent>
  );
};

const mod: TipModule = { default: DevTip, meta };
export default DevTip;
export { mod };
```

fr.json (extrait minimal)
```json
{
  "<slug>": {
    "title": "<Titre FR>",
    "shortDescription": "<Résumé FR>",
    "content": {
      "mainTitle": "<Titre principal FR>",
      "overview": "<Présentation FR>",
      "useCases": {
        "title": "Cas d’usage",
        "case1": { "title": "<Cas 1 FR>", "description": "<Desc FR>" }
      },
      "summary": {
        "title": "Résumé",
        "text": "<Quand l’utiliser FR>",
        "prosTitle": "Avantages",
        "consTitle": "Inconvénients",
        "pros": ["<+1 FR>"],
        "cons": ["<-1 FR>"]
      },
      "goodPractices": { "title": "Bonnes pratiques", "items": ["<Conseil FR>"] },
      "footer": { "sourceLabel": "Sources", "sourceUrl": "<URL>", "writtenOn": "Écrit le {{date}}" }
    }
  }
}
```

en.json (extrait minimal)
```json
{
  "<slug>": {
    "title": "<Title EN>",
    "shortDescription": "<Summary EN>",
    "content": {
      "mainTitle": "<Main title EN>",
      "overview": "<Overview EN>",
      "useCases": {
        "title": "Use cases",
        "case1": { "title": "<Case 1 EN>", "description": "<Desc EN>" }
      },
      "summary": {
        "title": "Summary",
        "text": "<When to use EN>",
        "prosTitle": "Pros",
        "consTitle": "Cons",
        "pros": ["<+1 EN>"],
        "cons": ["<-1 EN>"]
      },
      "goodPractices": { "title": "Best practices", "items": ["<Tip EN>"] },
      "footer": { "sourceLabel": "Sources", "sourceUrl": "<URL>", "writtenOn": "Written on {{date}}" }
    }
  }
}
```

Checklist rapide
- Applique les règles d’`addtips.prompt.md` sans les recopier ici.
- Présentation courte, 1–3 cas d’usage avec code en anglais, résumé + pros/cons, bonnes pratiques optionnelles.
- Meta vide pour title/shortDescription, rely on i18n; manifest mis à jour.
````
