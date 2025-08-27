import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

// Export d'un container minimal pour éviter les imports inutilisés ailleurs
export const PromptsContainer = styled(Box)(() => ({
  width: '100%',
}));

// Note: ce fichier contient un export léger. Si vous préférez le supprimer,
// vérifiez les exclusions dans les utilitaires qui peuvent référencer ce chemin.
