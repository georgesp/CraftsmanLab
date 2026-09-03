import React from 'react';
import { Box, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { COLORS } from '../../styles';

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  'aria-label'?: string;
}

/**
 * Boîte de recherche « Atelier adouci » : blanche, rayon 12, hauteur 44,
 * icône search + placeholder. Utilisée dans les sidebars de liste.
 */
export const SearchField: React.FC<SearchFieldProps> = ({
  value,
  onChange,
  placeholder = 'rechercher…',
  'aria-label': ariaLabel,
}) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      background: COLORS.atelier.surface,
      border: `1px solid ${COLORS.atelier.borderDefault}`,
      borderRadius: '12px',
      px: '14px',
      height: 44,
      transition: 'border-color .15s ease, box-shadow .15s ease',
      '&:focus-within': {
        borderColor: COLORS.atelier.tips,
        boxShadow: '0 0 0 3px rgba(25,118,210,.12)',
      },
    }}
  >
    <SearchIcon sx={{ fontSize: 18, color: COLORS.atelier.textMuted, mr: 1 }} />
    <InputBase
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      inputProps={{ 'aria-label': ariaLabel ?? placeholder }}
      sx={{
        flex: 1,
        fontSize: '13.5px',
        color: COLORS.atelier.textStrong,
        '& input::placeholder': { color: COLORS.atelier.textMuted, opacity: 1 },
      }}
    />
  </Box>
);

SearchField.displayName = 'SearchField';
