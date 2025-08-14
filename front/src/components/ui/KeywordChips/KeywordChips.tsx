import React from 'react';
import { Box, Chip } from '@mui/material';
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
