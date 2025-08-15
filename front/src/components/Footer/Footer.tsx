import React from 'react';
import { Box, Typography } from '@mui/material';
import { COLORS } from '../../styles/colors';

export const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{
      mt: 8,
      px: 3,
      py: 2,
      backgroundColor: COLORS.defaultBg,
      borderTop: `1px solid ${COLORS.mediumGrey}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      color: COLORS.titleColor,
      fontSize: '0.85rem'
    }}>
      <Typography variant="caption" sx={{ fontSize: '0.8rem', color: COLORS.titleColor }}>
        © 2025 CraftsmanLab. Tous droits réservés.
      </Typography>
    </Box>
  );
};

Footer.displayName = 'Footer';
