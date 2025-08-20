import React from 'react';
import { Box, Typography } from '@mui/material';
import { COLORS } from '../../styles/colors';

export const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{
      mt: 0,
      px: 3,
      py: 2,
      backgroundColor: COLORS.darkGreyBg,
      borderTop: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      color: 'text.primary',
      fontSize: '0.85rem'
    }}>
  <Typography variant="caption" sx={{ fontSize: '0.8rem', color: 'text.primary' }}>
        © 2025 CraftsmanLab. Tous droits réservés.
      </Typography>
    </Box>
  );
};

Footer.displayName = 'Footer';
