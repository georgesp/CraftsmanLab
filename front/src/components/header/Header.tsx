import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink, Box } from '@mui/material';
import {
  StyledAppBar,
  StyledToolbar,
  NavigationContainer,
} from './styles';

export const Header: React.FC = () => {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <MuiLink component={RouterLink} to="/" underline="none" sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src="/noBgColor.png"
            alt="CraftsmanLab"
            sx={{ height: 56, width: 'auto', objectFit: 'contain', display: 'block', flexShrink: 0 }}
          />
        </MuiLink>
        <NavigationContainer>
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
            to="/tips"
            color="text.primary"
            underline="none"
            sx={{ fontWeight: 500, fontSize: '1.05rem', '&:hover': { color: 'primary.main' } }}
          >
            Tips
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