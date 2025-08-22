import React from 'react';
import { Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { COLORS } from '../../../styles/colors';

export interface ViewAllTipsButtonProps {
  /** Texte affiché sur le bouton */
  label?: string;
  /** URL de destination */
  to: string;
  /** Espacement au dessus du bouton */
  marginTop?: number;
}

/**
 * Bouton permettant d'accéder à une page complète.
 * Conçu pour être utilisé dans les sidebars ou listes tronquées.
 */
export const ViewAllTipsButton: React.FC<ViewAllTipsButtonProps> = ({
  label,
  to,
  marginTop = 2
}) => {
  const { t } = useTranslation('common');
  
  return (
    <Box sx={{ mt: marginTop }}>
      <Button
        component={RouterLink}
        to={to}
        variant="outlined"
        fullWidth
        sx={{
          textTransform: 'none',
          fontWeight: 'normal',
          height: '30px',
          borderColor: COLORS.itemListHover,
          color: COLORS.darkTheme.textPrimary,
          backgroundColor: COLORS.itemListHover,
          '&:hover': {
            borderColor: COLORS.itemListHover,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: COLORS.darkTheme.textOnDark
          }
        }}
      >
        {label || t('buttons.seeAll')}
      </Button>
    </Box>
  );
};

ViewAllTipsButton.displayName = 'ViewAllTipsButton';
