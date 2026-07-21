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
        py: 2.5,
        backgroundColor: COLORS.atelier.surface,
        borderTop: `1px solid ${COLORS.atelier.borderDefault}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        component="span"
        sx={{
          fontFamily: TYPOGRAPHY.fontFamilies.mono,
          fontSize: '12px',
          letterSpacing: '.03em',
          color: COLORS.atelier.textMuted,
        }}
      >
        {t('pages:footer.copyright', '© 2026 CraftsmanLab — Tous droits réservés.')}
      </Typography>
    </Box>
  );
};

Footer.displayName = 'Footer';
