import React from 'react';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';

export const meta = {
  slug: 'collection',
  title: 'Collections C#',
  shortDescription: 'Différentes collections en C# (IEnumerable, ICollection, IList, IReadOnlyCollection, etc..)',
  writtenOn: '2025-08-11'
};

const CollectionTip: React.FC = () => {
  return (
    <Box>
      <Typography paragraph>
        Tu hésites entre IEnumerable, ICollection ou IList ? Voici le minimum à retenir pour ne pas te planter dans tes signatures ou tes retours d’API.
      </Typography>
      <Typography variant="h5" gutterBottom>IEnumerable&lt;T&gt;</Typography>
      <Typography paragraph>
        C’est la base : tu peux juste <b>lire</b> la séquence, rien d’autre. Pas d’index, pas d’ajout, pas de suppression. Idéal pour exposer un résultat LINQ ou un simple foreach.
      </Typography>
      <Typography variant="h5" gutterBottom>ICollection&lt;T&gt;</Typography>
      <Typography paragraph>
        Tu veux pouvoir <b>ajouter</b>, <b>supprimer</b>, <b>compter</b> ? Prends ICollection. C’est la version “modif” de IEnumerable, mais sans accès par index.
      </Typography>
      <Typography variant="h5" gutterBottom>IReadOnlyCollection&lt;T&gt;</Typography>
      <Typography paragraph>
        Comme ICollection mais <b>en lecture seule</b> : tu exposes Count, mais tu ne laisses pas modifier. Pratique pour retourner une vue sans copie.
      </Typography>
      <Typography variant="h5" gutterBottom>IList&lt;T&gt;</Typography>
      <Typography paragraph>
        Là tu as l’<b>indexation</b> (accès par position) + tout ce qu’offre ICollection. À utiliser si tu veux que l’appelant puisse insérer/supprimer à un index précis.
      </Typography>
      <Typography variant="h5" gutterBottom>IReadOnlyList&lt;T&gt;</Typography>
      <Typography paragraph>
        Pareil que IList mais <b>en lecture seule</b>. Idéal pour exposer un tableau ou une liste interne sans donner la main sur la modif.
      </Typography>
      <Typography variant="h5" gutterBottom>ISet&lt;T&gt;</Typography>
      <Typography paragraph>
        Pour garantir l’<b>unicité</b> des éléments (pas de doublons). Pratique pour les ensembles logiques, les tags, etc.
      </Typography>
      <Typography variant="h5" gutterBottom>En résumé, retiens :</Typography>
      <ul>
        <li><code>IEnumerable&lt;T&gt;</code> : tu veux juste itérer, rien d’autre.</li>
        <li><code>IReadOnlyCollection&lt;T&gt;</code> : tu veux exposer Count mais pas la modif.</li>
        <li><code>IReadOnlyList&lt;T&gt;</code> : tu veux exposer un tableau/liste sans modif, avec index.</li>
        <li><code>ICollection&lt;T&gt;</code> : tu veux accepter une collection modifiable.</li>
        <li><code>IList&lt;T&gt;</code> : tu veux l’indexation ET la modif.</li>
        <li><code>ISet&lt;T&gt;</code> : tu veux garantir l’unicité.</li>
      </ul>
      <Typography variant="h5" gutterBottom>Tips pratiques</Typography>
      <ul>
        <li>Expose toujours le <b>contrat le plus restreint</b> possible (principe du moindre privilège).</li>
        <li>En sortie, préfère IReadOnlyCollection ou IReadOnlyList.</li>
        <li>En entrée, accepte la mutabilité seulement si c’est utile.</li>
        <li>N’expose jamais List&lt;T&gt; directement : préfère IReadOnlyList ou IEnumerable.</li>
      </ul>
      <Box mt={4} pt={2} borderTop={theme => `1px solid ${theme.palette.divider}`}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" component="div" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          <a href="https://learn.microsoft.com/fr-fr/dotnet/api/system.collections" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
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

const mod: TipModule = { default: CollectionTip, meta };
export default CollectionTip;
export { mod };
