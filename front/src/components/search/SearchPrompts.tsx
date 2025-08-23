import React, { useState, useMemo } from 'react';
import { TextField, List, ListItem, ListItemText, Typography, Box } from '@mui/material';
import { usePromptSearch } from '../../hooks/usePromptSearch';
import type { PromptMeta } from '../prompts/prompt-types';

interface SearchPromptsProps {
  prompts: PromptMeta[];
  onSelectPrompt?: (prompt: PromptMeta) => void;
}

export const SearchPrompts: React.FC<SearchPromptsProps> = ({ 
  prompts, 
  onSelectPrompt 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchPrompts } = usePromptSearch();

  const filteredPrompts = useMemo(() => {
    return searchPrompts(prompts, searchQuery);
  }, [prompts, searchQuery, searchPrompts]);

  return (
    <Box>
      <TextField
        fullWidth
        placeholder="Rechercher dans les prompts..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        variant="outlined"
        size="small"
        sx={{ mb: 2 }}
      />
      
      {searchQuery && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {filteredPrompts.length} résultat(s) trouvé(s)
        </Typography>
      )}
      
      <List>
        {filteredPrompts.map((prompt) => (
          <ListItem 
            key={prompt.slug}
            sx={{ cursor: 'pointer' }}
            onClick={() => onSelectPrompt?.(prompt)}
          >
            <ListItemText
              primary={prompt.title}
              secondary={prompt.shortDescription}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
