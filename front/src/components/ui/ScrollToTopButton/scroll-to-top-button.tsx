import React, { useState, useEffect } from 'react';
import { Fab, Zoom } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { COLORS } from '../../../styles/colors';

export interface ScrollToTopButtonProps {
  /**
   * Nombre de pixels à partir duquel le bouton apparaît (par défaut: 300)
   */
  showAfterPixels?: number;
  /**
   * Position depuis le bas de l'écran en px (par défaut: 20)
   */
  bottom?: number;
  /**
   * Position depuis la droite de l'écran en px (par défaut: 20)
   */
  right?: number;
}

/**
 * Bouton flottant permettant de remonter en haut de la page.
 * Apparaît automatiquement après un certain nombre de pixels de scroll.
 */
export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  showAfterPixels = 300,
  bottom = 20,
  right = 20,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // Gestion du scroll pour afficher/masquer le bouton
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAfterPixels) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showAfterPixels]);

  // Fonction pour remonter en haut de la page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Zoom in={isVisible}>
      <Fab
        onClick={scrollToTop}
        size="medium"
        aria-label="Retour en haut de la page"
        sx={{
          position: 'fixed',
          bottom: `${bottom}px`,
          right: `${right}px`,
          zIndex: 1000,
          backgroundColor: COLORS.scrollToTop.background,
          color: COLORS.scrollToTop.border,
          border: `2px solid ${COLORS.scrollToTop.border}`,
          borderRadius: '12px',
          boxShadow: 2,
          '&:hover': {
            backgroundColor: COLORS.scrollToTop.hover,
            color: COLORS.scrollToTop.background,
            transform: 'scale(1.1)',
            border: `2px solid ${COLORS.scrollToTop.border}`,
          },
          transition: 'all 0.3s ease-in-out',
        }}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  );
};

ScrollToTopButton.displayName = 'ScrollToTopButton';
