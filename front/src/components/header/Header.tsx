import React, { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Link as MuiLink, Box, InputBase, Paper, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ClickAwayListener, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { searchAll, type SearchHit } from '@/utils/search-client';
import { COLORS } from '../../utils/colors';
import {
  StyledAppBar,
  StyledToolbar,
  NavigationContainer,
} from './styles';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const results = useMemo(() => (query.trim() ? searchAll(query) : []), [query]);

  // Reset selection when query changes or panel closes
  useEffect(() => { setSelectedIndex(-1); }, [query]);
  useEffect(() => { if (!open) setSelectedIndex(-1); }, [open]);
  useEffect(() => {
    // Clamp selection if results list becomes shorter
    if (selectedIndex >= results.length) setSelectedIndex(results.length - 1);
  }, [results.length, selectedIndex]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!results.length) return;
    // Navigue vers l'élément sélectionné (ou le premier si aucun sélectionné)
    const index = selectedIndex >= 0 ? selectedIndex : 0;
    const target = results[index];
    navigate(target.kind === 'tip' ? `/tips/${target.slug}` : `/prompts/${target.slug}`);
    setOpen(false);
  };

  const handleSelect = (kind: 'tip' | 'prompt', slug: string) => {
    navigate(kind === 'tip' ? `/tips/${slug}` : `/prompts/${slug}`);
    setOpen(false);
  };

  const handleFocus = () => setOpen(true);

  const handleClickAway = () => { setOpen(false); };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) setOpen(true);
      setSelectedIndex((prev) => {
        const next = prev + 1;
        return Math.min(next, results.length - 1);
      });
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!open) setOpen(true);
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <StyledAppBar position="static">
      <StyledToolbar sx={{ justifyContent: 'flex-end' }}>
        <MuiLink component={RouterLink} to="/" underline="none" sx={{ display: 'flex', alignItems: 'center', mr: 'auto' }}>
          <Box
            component="img"
            src="/noBgColor.png"
            alt="CraftsmanLab"
            sx={{ height: 56, width: 'auto', objectFit: 'contain', display: 'block', flexShrink: 0 }}
          />
        </MuiLink>
  <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 0, maxWidth: 520, width: '100%', mr: 3 }}>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box component="form" onSubmit={handleSubmit} sx={{ position: 'relative', width: '100%' }}>
              <Paper
                variant="outlined"
                sx={{
                  p: '2px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  height: 40,
                  borderRadius: 1,
                }}
              >
                <InputBase
                  placeholder="Rechercher…"
                  inputProps={{ 'aria-label': 'Rechercher' }}
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); if (!open) setOpen(true); }}
                  onFocus={handleFocus}
                  onKeyDown={handleKeyDown}
                  sx={{ ml: 1, flex: 1 }}
                />
                <IconButton aria-label="Lancer la recherche" type="button" onClick={() => handleSubmit()} size="small">
                  <SearchIcon fontSize="small" />
                </IconButton>
              </Paper>
              {open && results.length > 0 && (
                <Paper
                  elevation={4}
                  sx={{ position: 'absolute', top: '44px', left: 0, right: 0, zIndex: 10, maxHeight: 360, overflowY: 'auto' }}
                >
                  <List dense disablePadding>
                    {results.map((r: SearchHit, idx: number) => (
                      <ListItem key={`${r.kind}-${r.slug}`} disablePadding>
                        <ListItemButton selected={idx === selectedIndex} onClick={() => handleSelect(r.kind, r.slug)}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            {r.kind === 'tip' ? (
                              <TipsAndUpdatesIcon color="primary" fontSize="small" />
                            ) : (
                              <TextSnippetIcon color="action" fontSize="small" />
                            )}
                          </ListItemIcon>
                          <ListItemText
                            primary={r.title}
                            secondary={r.shortDescription}
                            primaryTypographyProps={{ noWrap: true }}
                            secondaryTypographyProps={{ noWrap: true, sx: { color: COLORS.grey800 } }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
              {open && query.trim() && results.length === 0 && (
                <Paper
                  elevation={4}
                  sx={{ position: 'absolute', top: '44px', left: 0, right: 0, zIndex: 10 }}
                >
                  <Box sx={{ p: 1.5, color: COLORS.grey800, fontSize: 14 }}>
                    Aucun résultat
                  </Box>
                </Paper>
              )}
            </Box>
          </ClickAwayListener>
        </Box>
        <NavigationContainer>
          <MuiLink
            component={RouterLink}
            to="/tips"
            color="text.primary"
            underline="none"
            sx={{ fontWeight: 500, fontSize: '1.05rem', '&:hover': { color: 'primary.main' } }}
          >
            Tips / Penses-bêtes
          </MuiLink>
          <MuiLink
            component={RouterLink}
            to="/prompts"
            color="text.primary"
            underline="none"
            sx={{ fontWeight: 500, fontSize: '1.05rem', '&:hover': { color: 'primary.main' } }}
          >
            Prompts
          </MuiLink>
          <MuiLink
            component={RouterLink}
            to="/contact"
            color="text.primary"
            underline="none"
            sx={{ fontWeight: 500, fontSize: '1.05rem', '&:hover': { color: 'primary.main' } }}
          >
            Contact
          </MuiLink>
        </NavigationContainer>
      </StyledToolbar>
    </StyledAppBar>
  );
};