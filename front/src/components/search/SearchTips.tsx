import React, { useState } from 'react';
import { 
  TextField, 
  List, 
  ListItem, 
  ListItemText, 
  Typography, 
  Box,
  Chip,
  Stack
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useTipSearch } from '../../hooks/useTipSearch';
import { tipsList } from '../tips/registry';
import type { TipEntry } from '../tips/registry';

interface SearchTipsProps {
  onTipSelect?: (tip: TipEntry) => void;
}

export const SearchTips: React.FC<SearchTipsProps> = ({ onTipSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchTips } = useTipSearch();
  const { t } = useTranslation('common');

  const filteredTips = searchTips(tipsList, searchQuery);

  const handleTipClick = (tip: TipEntry) => {
    onTipSelect?.(tip);
  };

  return (
    <Box>
      <TextField
        fullWidth
        variant="outlined"
        label={t('search.placeholder', 'Rechercher des tips...')}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
      />
      
      {searchQuery && (
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {filteredTips.length} tip(s) trouvé(s)
        </Typography>
      )}

      <List>
        {filteredTips.map((tip) => (
          <ListItem 
            key={tip.slug}
            component="div"
            onClick={() => handleTipClick(tip)}
            sx={{ 
              border: 1, 
              borderColor: 'divider', 
              borderRadius: 1, 
              mb: 1,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'action.hover'
              }
            }}
          >
            <ListItemText
              primary={tip.title}
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {tip.shortDescription}
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    {tip.keywords.map((keyword, index) => (
                      <Chip 
                        key={index}
                        label={keyword}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                </Box>
              }
            />
          </ListItem>
        ))}
      </List>

      {searchQuery && filteredTips.length === 0 && (
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Aucun tip trouvé pour "{searchQuery}"
        </Typography>
      )}
    </Box>
  );
};
