import React from 'react';
import { Box, Typography } from '@mui/material';
import { IllusBadge } from './IllusBadge';
import type { IllusName } from './rubric';
import { COLORS, TYPOGRAPHY } from '../../styles';

interface SectionTitleBandProps {
  illus: IllusName;
  title: string;
  subtitle?: string;
}

/**
 * Bandeau de titre de page : badge illustré 52px + H1 (Inter Tight 800,
 * 38px, tracking serré) + sous-titre optionnel.
 */
export const SectionTitleBand: React.FC<SectionTitleBandProps> = ({ illus, title, subtitle }) => (
  <Box
    component="section"
    sx={{ px: { xs: 2.5, md: '46px' }, pt: { xs: 4, md: '46px' }, pb: subtitle ? 1.25 : 1 }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <IllusBadge name={illus} size={52} />
      <Box>
        <Typography
          component="h1"
          sx={{
            fontFamily: TYPOGRAPHY.fontFamilies.display,
            fontWeight: 800,
            fontSize: { xs: '30px', md: '38px' },
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            m: 0,
            color: COLORS.atelier.textStrong,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            sx={{
              mt: '6px',
              fontSize: '15.5px',
              color: COLORS.atelier.textBodyAlt,
              maxWidth: 640,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </Box>
    </Box>
  </Box>
);

SectionTitleBand.displayName = 'SectionTitleBand';
