import React from 'react';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';

export const meta = {
  slug: 'key-value-collection',
  title: 'Collections clé-valeur C#',
  shortDescription: 'Différentes structures clé-valeur (IDictionary, IReadOnlyDictionary, etc..)',
  writtenOn: '2025-08-11'
};

const KeyValueCollectionTip: React.FC = () => {
  return (
    <Box>
      <Typography paragraph>
        Dico, map, table de hachage… tu veux associer des clés à des valeurs ? Voici ce qu’il faut retenir pour ne pas te mélanger les pinceaux.
      </Typography>
      <Typography variant="h5" gutterBottom>IDictionary&lt;TKey, TValue&gt;</Typography>
      <Typography paragraph>
        C’est le “vrai” dictionnaire : tu peux <b>ajouter</b>, <b>supprimer</b>, <b>modifier</b> des paires clé/valeur. Utilise-le si tu veux vraiment manipuler la structure.
      </Typography>
      <Typography variant="h5" gutterBottom>IReadOnlyDictionary&lt;TKey, TValue&gt;</Typography>
      <Typography paragraph>
        Même idée, mais <b>en lecture seule</b> : tu exposes Count, Keys, Values, TryGetValue, mais tu ne laisses pas modifier. Parfait pour retourner une vue sans copie.
      </Typography>
      <Typography variant="h5" gutterBottom>ConcurrentDictionary&lt;TKey, TValue&gt;</Typography>
      <Typography paragraph>
        Pour les cas où tu as plusieurs threads qui écrivent/consultent en même temps. Prends ça plutôt que de bricoler des locks sur un Dictionary.
      </Typography>
      <Typography variant="h5" gutterBottom>ImmutableDictionary&lt;TKey, TValue&gt;</Typography>
      <Typography paragraph>
        Tu veux du thread-safe ET de l’immutabilité ? C’est la solution. Pratique pour les configs, les snapshots, ou si tu veux garantir qu’aucun code ne modifie la map.
      </Typography>
      <Typography variant="h5" gutterBottom>En résumé, retiens :</Typography>
      <ul>
        <li><code>IReadOnlyDictionary&lt;TKey,TValue&gt;</code> : à exposer par défaut si tu veux juste donner accès à la data.</li>
        <li><code>IDictionary&lt;TKey,TValue&gt;</code> : si tu veux que l’appelant puisse modifier.</li>
        <li><code>ConcurrentDictionary&lt;TKey,TValue&gt;</code> : pour la concurrence multi-thread.</li>
        <li><code>ImmutableDictionary&lt;TKey,TValue&gt;</code> : pour la sécurité et l’immutabilité.</li>
      </ul>
      <Typography variant="h5" gutterBottom>Tips pratiques</Typography>
      <ul>
        <li>Expose toujours IReadOnlyDictionary en sortie si tu n’as pas besoin de la modif.</li>
        <li>Utilise TryGetValue, évite de catcher KeyNotFoundException.</li>
        <li>Si tu veux juste tester l’existence d’une clé, HashSet&lt;TKey&gt; suffit.</li>
        <li>En DI, injecte IReadOnlyDictionary si tu veux garantir la lecture seule.</li>
      </ul>
      <Box mt={4} pt={2} borderTop={theme => `1px solid ${theme.palette.divider}`}
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" component="div" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          <a href="https://learn.microsoft.com/fr-fr/dotnet/api/system.collections.generic.idictionary-2" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
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

const mod: TipModule = { default: KeyValueCollectionTip, meta };
export default KeyValueCollectionTip;
export { mod };
