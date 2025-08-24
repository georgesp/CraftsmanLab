import React from 'react';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import { CodeBlock } from '../../ui/CodeBlock/CodeBlock';
import type { Keyword } from '../../../utils/constants';

export const meta = {
  slug: 'switch-tuple',
  title: 'Switch + Tuple',
  shortDescription: 'Astuce pragmatique : switch sur un tuple en C# (pattern matching)',
  writtenOn: '2025-08-15',
  keywords: ['C#'] as unknown as Keyword[],
  metadata: {
    searchKeywords: {
      fr: [
        'switch', 'tuple', 'pattern matching', 'correspondance', 'motifs',
        'expressions', 'décomposition', 'destructuring', 'c# 8', 'c# 9',
        'when', 'discard', 'underscore', 'décisionnel'
      ],
      en: [
        'switch', 'tuple', 'pattern matching', 'patterns',
        'expressions', 'decomposition', 'destructuring', 'c# 8', 'c# 9',
        'when', 'discard', 'underscore', 'decision'
      ]
    }
  }
};

const exampleCode = `using System;

class Program
{
  static void Main()
  {
    // Create a tuple (city, country)
    var location = ("Paris", "France");

    // Switch on the tuple using pattern matching
    string description = location switch
    {
      // Case where city is Paris and country is France
      ("Paris", "France") => "European capital",
            
      // Case where city is Paris but another country (e.g. Spain)
      ("Paris", _)       => "Paris, outside France",
            
      // Generic case: any tuple
      _                  => $"Unknown city in {location.Item2}"
    };

    Console.WriteLine(description);   // Prints: European capital
  }
}`;

const SwitchTupleTip: React.FC = () => {
  return (
    <Box>
      <Typography paragraph>
        Petit truc pratique : quand tu as deux valeurs liées (par ex. ville + pays), un switch sur un tuple
        rend le code compact et lisible, pas besoin d'ifs imbriqués.
      </Typography>

      <Typography variant="h3">Exemple</Typography>
      <CodeBlock language="csharp" code={exampleCode} />

      <Typography variant="h3">Ce que j'en retire</Typography>
      <Typography paragraph component="div">
        • Simple et lisible : compare plusieurs éléments en une seule expression, parfait pour des cas de dispatch.
        <br />
  • Moins de code répétitif : on évite les if/else et l'extraction manuelle des champs.
        <br />
        • Flexible : tu peux mélanger tuples, enums ou classes dans les patterns pour couvrir la plupart des cas.
      </Typography>

      <Box mt={4} pt={2} borderTop={theme => `1px solid ${theme.palette.divider}`} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="caption" component="div" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
          
        </Typography>
        <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
          Écrit le {meta.writtenOn}
        </Typography>
      </Box>
    </Box>
  );
};

const mod: TipModule = { default: SwitchTupleTip, meta };
export default SwitchTupleTip;
export { mod };
