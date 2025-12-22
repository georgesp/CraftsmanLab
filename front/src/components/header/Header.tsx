import React, { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Link as MuiLink,
  Box,
  InputBase,
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ClickAwayListener,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { useTranslation } from 'react-i18next';
import { searchAll, type SearchHit } from '@/utils/search-client';
import { COLORS, TYPOGRAPHY } from '../../styles';
import { StyledAppBar, StyledToolbar, NavigationContainer } from './styles';
import { LanguageSelector } from '../ui/LanguageSelector';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const results = useMemo(() => (query.trim() ? searchAll(query) : []), [query]);

  // Reset selection when query changes or panel closes
  useEffect(() => {
    setSelectedIndex(-1);
  }, [query]);

  useEffect(() => {
    if (!open) setSelectedIndex(-1);
  }, [open]);

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

  const handleClickAway = () => {
    setOpen(false);
  };

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
        <MuiLink
          component={RouterLink}
          to="/"
          underline="none"
          sx={{ display: 'flex', alignItems: 'center', mr: 'auto' }}
        >
          <Box
            component="img"
            src="/noBgColorWhite.png"
            alt="CraftsmanLab"
            sx={{
              height: 56,
              width: 'auto',
              objectFit: 'contain',
              display: 'block',
              flexShrink: 0,
            }}
          />
        </MuiLink>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            minWidth: 0,
            maxWidth: 520,
            width: ['100%', '60%', '40%'],
            mr: 3,
            flex: '1 1 auto',
          }}
        >
          <ClickAwayListener onClickAway={handleClickAway}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ position: 'relative', width: '100%' }}
            >
              <Paper
                variant="outlined"
                sx={{
                  p: '2px 8px',
                  display: 'flex',
                  alignItems: 'center',
                  height: 40,
                  borderRadius: 0,
                  backgroundColor: COLORS.darkTheme.inputBackground,
                }}
              >
                <InputBase
                  placeholder={t('search.placeholder')}
                  inputProps={{ 'aria-label': t('search.placeholder') }}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    if (!open) setOpen(true);
                  }}
                  onFocus={handleFocus}
                  onKeyDown={handleKeyDown}
                  sx={{
                    ml: 1,
                    flex: '1 1 auto',
                    minWidth: 0,
                    color: COLORS.darkTheme.inputText,
                    '& input::placeholder': { color: COLORS.darkTheme.inputText, opacity: 0.6 },
                  }}
                />

                <IconButton
                  aria-label={t('search.placeholder')}
                  type="button"
                  onClick={() => handleSubmit()}
                  size="small"
                  sx={{ color: COLORS.darkTheme.inputText, flex: '0 0 auto' }}
                >
                  <SearchIcon fontSize="small" />
                </IconButton>
              </Paper>

              {open && results.length > 0 && (
                <Paper
                  elevation={4}
                  sx={{
                    position: 'absolute',
                    top: '44px',
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    maxHeight: 360,
                    overflowY: 'auto',
                    backgroundColor: COLORS.darkTheme.inputBackground,
                  }}
                >
                  <List dense disablePadding>
                    {results.map((r: SearchHit, idx: number) => (
                      <ListItem key={`${r.kind}-${r.slug}`} disablePadding>
                        <ListItemButton
                          selected={idx === selectedIndex}
                          onClick={() => handleSelect(r.kind, r.slug)}
                        >
                          <ListItemIcon sx={{ minWidth: 44, mr: 1 }}>
                            {r.kind === 'tip' ? (
                              <Box
                                sx={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: 36,
                                  height: 36,
                                  border: `1px solid ${COLORS.searchResultIcon}`,
                                  borderRadius: 1,
                                }}
                              >
                                <TipsAndUpdatesIcon
                                  fontSize="large"
                                  sx={{ color: COLORS.searchResultIcon, fontSize: 20 }}
                                />
                              </Box>
                            ) : (
                              <Box
                                sx={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  width: 36,
                                  height: 36,
                                  border: `1px solid ${COLORS.searchResultIcon}`,
                                  borderRadius: 1,
                                }}
                              >
                                <TextSnippetIcon
                                  fontSize="large"
                                  sx={{ color: COLORS.searchResultIcon, fontSize: 20 }}
                                />
                              </Box>
                            )}
                          </ListItemIcon>

                          <ListItemText
                            primary={r.title}
                            secondary={r.shortDescription}
                            primaryTypographyProps={{
                              noWrap: true,
                              sx: { color: COLORS.darkTheme.inputText },
                            }}
                            secondaryTypographyProps={{
                              noWrap: true,
                              sx: { color: COLORS.darkTheme.inputText },
                            }}
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
                  sx={{
                    position: 'absolute',
                    top: '44px',
                    left: 0,
                    right: 0,
                    zIndex: 10,
                    backgroundColor: COLORS.darkTheme.inputBackground,
                  }}
                >
                  <Box sx={{ p: 1.5, color: COLORS.darkTheme.inputText, fontSize: 14 }}>
                    {t('search.noResults')}
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
            color="inherit"
            underline="none"
            sx={{ fontWeight: TYPOGRAPHY.fontWeights.medium }}
          >
            {t('navigation.tips')}
          </MuiLink>

          <MuiLink
            component={RouterLink}
            to="/prompts"
            color="inherit"
            underline="none"
            sx={{ fontWeight: TYPOGRAPHY.fontWeights.medium }}
          >
            {t('navigation.prompts')}
          </MuiLink>

          <MuiLink
            component={RouterLink}
            to="/news"
            color="inherit"
            underline="none"
            sx={{ fontWeight: TYPOGRAPHY.fontWeights.medium }}
          >
            {t('navigation.news')}
          </MuiLink>

          <MuiLink
            component={RouterLink}
            to="/contact"
            color="inherit"
            underline="none"
            sx={{ fontWeight: TYPOGRAPHY.fontWeights.medium }}
          >
            {t('navigation.contact')}
          </MuiLink>

          <LanguageSelector />
        </NavigationContainer>
      </StyledToolbar>
    </StyledAppBar>
  );
};
