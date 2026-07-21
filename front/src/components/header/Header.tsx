import React, { useEffect, useMemo, useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
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
import NewspaperIcon from '@mui/icons-material/Newspaper';
import { useTranslation } from 'react-i18next';
import { searchAll, type SearchHit } from '@/utils/search-client';
import { COLORS, TYPOGRAPHY } from '../../styles';
import { StyledAppBar, StyledToolbar, NavigationContainer } from './styles';
import { LanguageSelector } from '../ui/LanguageSelector';

// Couleur active de la nav par rubrique (« Atelier adouci »)
const ACTIVE_COLOR: Record<string, string> = {
  '/': COLORS.atelier.tips,
  '/tips': COLORS.atelier.tips,
  '/prompts': COLORS.atelier.prompts,
  '/news': COLORS.atelier.news,
  '/contact': COLORS.atelier.tips,
};

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // Style appliqué au lien actif : couleur de rubrique + gras
  const navSx = (path: string) => {
    const active = location.pathname === path;
    return {
      fontWeight: active
        ? TYPOGRAPHY.fontWeights.bold
        : TYPOGRAPHY.fontWeights.medium,
      color: active ? ACTIVE_COLOR[path] : undefined,
    };
  };
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
    
    if (target.kind === 'news') {
      // For news articles, open the external link in a new tab
      if (target.link) {
        window.open(target.link, '_blank', 'noopener,noreferrer');
      }
    } else {
      navigate(target.kind === 'tip' ? `/tips/${target.slug}` : `/prompts/${target.slug}`);
    }
    setOpen(false);
  };

  const handleSelect = (kind: 'tip' | 'prompt' | 'news', slug: string, link?: string) => {
    if (kind === 'news') {
      // For news articles, open the external link in a new tab
      if (link) {
        window.open(link, '_blank', 'noopener,noreferrer');
      }
    } else {
      navigate(kind === 'tip' ? `/tips/${slug}` : `/prompts/${slug}`);
    }
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
          sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 'auto' }}
        >
          <Box
            component="img"
            src="/symbol.svg"
            alt=""
            aria-hidden
            sx={{ height: 24, width: 24, display: 'block', flexShrink: 0 }}
          />
          <Box
            component="span"
            sx={{
              fontFamily: TYPOGRAPHY.fontFamilies.display,
              fontWeight: TYPOGRAPHY.fontWeights.bold,
              fontSize: '19px',
              letterSpacing: '-0.02em',
              color: COLORS.atelier.textStrong,
            }}
          >
            CraftsmanLab
          </Box>
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
                  borderRadius: '10px',
                  border: `1px solid ${COLORS.atelier.borderDefault}`,
                  backgroundColor: '#FBFCFD',
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
                          onClick={() => handleSelect(r.kind, r.slug, r.link)}
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
                            ) : r.kind === 'prompt' ? (
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
                                <NewspaperIcon
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
            to="/"
            color="inherit"
            underline="none"
            sx={navSx('/')}
          >
            {t('navigation.home')}
          </MuiLink>

          <MuiLink
            component={RouterLink}
            to="/tips"
            color="inherit"
            underline="none"
            sx={navSx('/tips')}
          >
            {t('navigation.tips')}
          </MuiLink>

          <MuiLink
            component={RouterLink}
            to="/prompts"
            color="inherit"
            underline="none"
            sx={navSx('/prompts')}
          >
            {t('navigation.prompts')}
          </MuiLink>

          <MuiLink
            component={RouterLink}
            to="/news"
            color="inherit"
            underline="none"
            sx={navSx('/news')}
          >
            {t('navigation.news')}
          </MuiLink>

          <MuiLink
            component={RouterLink}
            to="/contact"
            color="inherit"
            underline="none"
            sx={navSx('/contact')}
          >
            {t('navigation.contact')}
          </MuiLink>

          <LanguageSelector />
        </NavigationContainer>
      </StyledToolbar>
    </StyledAppBar>
  );
};
