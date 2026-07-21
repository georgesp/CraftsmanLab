import React from 'react';
import { Box } from '@mui/material';
import { COLORS } from '../../styles';

interface AtelierContainerProps {
  children: React.ReactNode;
}

/**
 * Conteneur de page « Atelier adouci » :
 * - fond « desk » gris autour de la page (pleine largeur) ;
 * - page centrée max 1240px, fond clair + grille technique de lignes fines
 *   (maille 46px), légère ombre latérale.
 */
export const AtelierContainer: React.FC<AtelierContainerProps> = ({ children }) => (
  <Box sx={{ backgroundColor: COLORS.atelier.deskBg, flex: 1, width: '100%' }}>
    <Box
      sx={{
        maxWidth: 1240,
        mx: 'auto',
        minHeight: '100%',
        backgroundColor: COLORS.atelier.pageBg,
        color: COLORS.atelier.textStrong,
        backgroundImage: `linear-gradient(${COLORS.atelier.pageGridLine} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.atelier.pageGridLine} 1px, transparent 1px)`,
        backgroundSize: '46px 46px',
        boxShadow: '0 0 80px -30px rgba(17,21,29,.35)',
      }}
    >
      {children}
    </Box>
  </Box>
);

AtelierContainer.displayName = 'AtelierContainer';
