## Style et phrasologie attendus

- Privilégie un ton personnel, direct, comme si tu t’adressais à un collègue développeur.
- Va à l’essentiel, évite le style encyclopédique ou académique.
- Utilise le tutoiement, les phrases courtes, les rappels pratiques, les “trucs à ne pas oublier”.
- N’hésite pas à donner des exemples concrets, des “à utiliser quand…”, des “à éviter si…”.
- Mets en avant les pièges classiques, les bonnes pratiques, les astuces terrain.
- Tu peux t’inspirer du style des tips existants ou du texte d’intro de la home-page.
- Ne pas mettre de numérotation mais jouer sur la taille de la police

# Ajouter un nouveau tip C#/.NET

Pour ajouter un nouveau tip, crée un fichier `.tsx` dans un sous-dossier de `src/components/tips/` (un dossier par thème ou famille de tips si besoin).
On n'affiche pas de numérotation, mais on doit jouer sur les tailles de police

## Structure minimale d’un module tip

```tsx
import React from 'react';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';

export const meta = {
  slug: 'slug-unique', // kebab-case, utilisé dans l’URL
  title: 'Titre du tip',
  shortDescription: 'Résumé court pour la vignette',
  writtenOn: 'YYYY-MM-DD' // date de rédaction ou de dernière MAJ
};

const NomDuTip: React.FC = () => {
  return (
    <Box>
      <Typography variant="h2" gutterBottom>Titre du tip</Typography>
      <Typography paragraph>
        Ton contenu principal ici, style direct, synthétique, conseils pratiques, exemples, rappels, etc.
      </Typography>
      {/* Ajoute d’autres sections, listes, sous-titres, etc. selon le besoin */}
      <Box mt={4} pt={2} borderTop={theme => `1px solid ${theme.palette.divider}`}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" component="div" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          <a href="URL_DE_LA_SOURCE" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
            Source : documentation .NET
          </a>
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          Écrit le {meta.writtenOn}
        </Typography>
      </Box>
    </Box>
  );
};

const mod: TipModule = { default: NomDuTip, meta };
export default NomDuTip;
export { mod };
```

## Règles de nommage et bonnes pratiques
- Le `slug` doit être unique, en kebab-case, sans espace ni accent.
- Le `title` doit être court et explicite.
- Le `shortDescription` doit donner envie de cliquer, max 120 caractères.
- La date `writtenOn` au format `YYYY-MM-DD`.
- Le composant principal doit être exporté par défaut.
- Ajoute un pied de page en bas du tip :
  - À gauche : la source, en italique, cliquable (lien vers la doc ou la ressource d’origine, style underline, color inherit)
  - À droite : la date, label “Écrit le …”, alignée à droite
- Utilise un ton direct, synthétique, orienté dev (voir les exemples existants).

## Exemple de slug et d’organisation
- `src/components/tips/collection/collection.tsx`
- `src/components/tips/keyValueCollection/key-value-collection.tsx`

## Pour voir le tip
- Il apparaîtra automatiquement dans la page /tips et la home une fois le fichier créé et exporté correctement.
