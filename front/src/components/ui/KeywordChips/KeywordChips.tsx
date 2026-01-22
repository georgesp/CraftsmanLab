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
  variant = 'outlined',
}) => {
  if (!keywords.length) return null;

  return (
    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
      {keywords.map((keyword) => (
        <Chip
          key={keyword}
          label={keyword}
          size={size}
          variant="outlined"
          sx={{
            height: 20,
            fontSize: '0.65rem',
            borderColor: 'primary.main',
            color: 'primary.main',
          }}
        />
      ))}
    </Box>
  );
};

KeywordChips.displayName = 'KeywordChips';
