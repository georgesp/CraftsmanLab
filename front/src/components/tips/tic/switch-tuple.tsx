import React from 'react';
import type { TipModule } from '..';
import { Box, Typography } from '@mui/material';
import CodeBlock from '../../ui/CodeBlock/CodeBlock';
import type { Keyword } from '../../../utils/constants';

export const meta = {
  slug: 'switch-tuple',
  title: 'Switch + Tuple',
  shortDescription: 'Astuce pragmatique : switch sur un tuple en C# (pattern matching)',
  writtenOn: '2025-08-15',
  keywords: ['C#'] as unknown as Keyword[]
};

const exampleCode = `using System;

class Program
{
    static void Main()
    {
        // On crée un tuple (ville, pays)
        var localisation = ("Paris", "France");

        // switch sur le tuple avec pattern matching
        string description = localisation switch
        {
            // Cas où la ville est Paris et le pays est France
            ("Paris", "France") => "Capitale européenne",
            
            // Cas où la ville est Paris mais un autre pays (ex. Espagne)
            ("Paris", _)       => "Paris, hors France",
            
            // Cas générique : n’importe quel tuple
            _                  => $"Ville inconnue dans {localisation.Item2}"
        };

        Console.WriteLine(description);   // Affiche : Capitale européenne
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
      <CodeBlock code={exampleCode} />

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
          Exemple rapide — à utiliser quand ça simplifie la lecture
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
