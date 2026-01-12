import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { COLORS, TYPOGRAPHY } from '../../styles';

export const Footer: React.FC = () => {
  const { t } = useTranslation(['common', 'pages']);
  return (
    <Box
      component="footer"
      sx={{
        mt: 0,
        px: 3,
        py: 2,
        backgroundColor: COLORS.darkGreyBg,
        borderTop: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'text.primary',
        fontSize: TYPOGRAPHY.fontSizes.body1,
      }}
    >
      <Typography variant="caption" sx={{ fontSize: TYPOGRAPHY.fontSizes.body2, color: 'text.primary' }}>
        {t('pages:footer.copyright', '© 2025 CraftsmanLab. Tous droits réservés.')}
      </Typography>
    </Box>
  );
};

Footer.displayName = 'Footer';
