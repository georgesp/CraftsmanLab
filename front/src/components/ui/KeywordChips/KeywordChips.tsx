import React from 'react';
import { Box, Chip } from '@mui/material';
import { COLORS } from '../../../styles/colors';
import type { Keyword } from '../../../utils/constants';

type Props = {
  keywords: Keyword[];
  size?: 'small' | 'medium';
  variant?: 'filled' | 'outlined';
};

export const KeywordChips: React.FC<Props> = ({ 
  keywords, 
  size = 'small', 
  variant = 'outlined' 
}) => {
  if (!keywords.length) return null;

  return (
    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: -1.5 }}>
      {keywords.map(keyword => (
    <Chip
          key={keyword}
          label={keyword}
          size={size}
          variant={variant}
          sx={{
            fontSize: '0.75rem',
            height: 'auto',
      color: 'text.primary',
      background: `linear-gradient(180deg, ${COLORS.cardKeywordStart}, ${COLORS.cardKeywordEnd})`,
      border: '0px solid transparent',
      borderRadius: 2,
            '& .MuiChip-label': {
              px: 1,
              py: 0.25,
            },
          }}
        />
      ))}
    </Box>
  );
};

KeywordChips.displayName = 'KeywordChips';
