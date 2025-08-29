import React from 'react';
import { Box, Chip } from '@mui/material';
import { COLORS } from '../../../styles/colors';

export type TagChipsFilterProps = {
  tags: string[];
  selected: string[];
  onToggle: (tag: string) => void;
  size?: 'small' | 'medium';
};

export const TagChipsFilter: React.FC<TagChipsFilterProps> = ({
  tags,
  selected,
  onToggle,
  size = 'small',
}) => {
  if (!tags.length) return null;

  // Convert a tag string to PascalCase for display.
  // Preserve '#' (so 'c#11' -> 'C#11') and treat other non-alphanumeric as separators.
  // Examples: 'c-sharp' -> 'CSharp', 'dot net' -> 'DotNet', 'c#11' -> 'C#11'
  // Special display mappings for acronyms / branded terms.
  const SPECIAL_MAPPINGS: Record<string, string> = {
    dotnet: '.NET',
    'f#': 'F#',
    fsharp: 'F#',
    sql: 'SQL',
    tsql: 'T-SQL',
    npm: 'NPM',
    mcp: 'MCP',
    ai: 'AI',
    orm: 'ORM',
    json: 'JSON',
    nuget: 'NuGet',
  };

  const toPascalCase = (s: string) => {
    if (!s) return s;
    // Check explicit special-case mappings first. Normalize by removing separators.
    const normalizedForMap = s.toLowerCase().replace(/[^a-z0-9#]+/g, '');
    if (SPECIAL_MAPPINGS[normalizedForMap]) return SPECIAL_MAPPINGS[normalizedForMap];

    // Allow '#' to remain inside tokens; replace other non-alphanumeric (except #) with space
    // Preserve literal spaces when the original string contains them (e.g. 'dot net' -> 'Dot Net')
    const preserveSpaces = /\s/.test(s);
    const cleaned = s.replace(/[^A-Za-z0-9#]+/g, ' ').trim();
    const parts = cleaned.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return '';
    const transformed = parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase());
    return preserveSpaces ? transformed.join(' ') : transformed.join('');
  };

  return (
    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
      {tags.map((tag) => {
        const isSelected = selected.includes(tag);
        return (
          <Chip
            key={tag}
            label={toPascalCase(tag)}
            aria-label={tag}
            size={size}
            clickable
            onClick={() => onToggle(tag)}
            aria-pressed={isSelected}
            data-selected={isSelected ? 'true' : 'false'}
            sx={{
              fontSize: '0.75rem',
              height: 'auto',
              color: isSelected ? COLORS.white : 'text.primary',
              background: isSelected
                ? `linear-gradient(180deg, ${COLORS.tipsIcon}, ${COLORS.primary.light})`
                : `linear-gradient(180deg, ${COLORS.cardKeywordStart}, ${COLORS.cardKeywordEnd})`,
              border: isSelected ? `1px solid ${COLORS.primary.dark}` : '0px solid transparent',
              borderRadius: 1,
              boxShadow: isSelected ? '0 1px 6px rgba(2,168,233,0.25)' : 'none',
              opacity: 1,
              '& .MuiChip-label': {
                px: 1.5,
                py: 0.5,
              },
            }}
          />
        );
      })}
    </Box>
  );
};

TagChipsFilter.displayName = 'TagChipsFilter';
