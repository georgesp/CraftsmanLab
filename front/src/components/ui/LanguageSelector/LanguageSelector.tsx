import React, { useState } from 'react';
import { Button, Menu, MenuItem, Box } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
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
        endIcon={<ExpandMore fontSize="small" />}
        sx={{
          color: COLORS.atelier.tips,
          textTransform: 'none',
          fontFamily: TYPOGRAPHY.fontFamilies.mono,
          fontWeight: TYPOGRAPHY.fontWeights.semiBold,
          fontSize: '12px',
          lineHeight: 1,
          minWidth: 0,
          px: 1.25,
          py: 0.5,
          borderRadius: 999,
          border: `1px solid ${COLORS.atelier.tipsBorder}`,
          backgroundColor: COLORS.atelier.tipsBg,
          '&:hover': {
            backgroundColor: COLORS.atelier.tipsBg,
            borderColor: COLORS.atelier.tips,
          },
        }}
      >
        {currentLanguage.code.toUpperCase()}
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
