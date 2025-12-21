import React, { useState } from 'react';
import { Button, Menu, MenuItem, Box } from '@mui/material';
import { Language as LanguageIcon, ExpandMore } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { COLORS, TYPOGRAPHY } from '../../../styles';

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
];

export const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    handleClose();
  };

  const currentLanguage =
    languages.find((lang) => lang.code === (i18n.resolvedLanguage || i18n.language)) ||
    languages[0];

  return (
    <Box>
      <Button
        onClick={handleClick}
        startIcon={<LanguageIcon fontSize="small" />}
        endIcon={<ExpandMore fontSize="small" />}
        sx={{
          color: 'inherit',
          textTransform: 'none',
          fontWeight: TYPOGRAPHY.fontWeights.medium,
          fontSize: TYPOGRAPHY.fontSizes.nav,
          '&:hover': {
            backgroundColor: COLORS.overlay.light10,
          },
        }}
      >
        {currentLanguage.flag} {currentLanguage.code.toUpperCase()}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {languages.map((language) => (
          <MenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language.code)}
            selected={language.code === (i18n.resolvedLanguage || i18n.language)}
            sx={{ fontSize: TYPOGRAPHY.fontSizes.nav }}
          >
            {language.flag} {language.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

LanguageSelector.displayName = 'LanguageSelector';
