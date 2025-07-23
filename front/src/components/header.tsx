import React from 'react';
import { AppBar, Toolbar, Box, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <AppBar position="static" sx={{ width: '100%' }}>
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        <MuiLink component={RouterLink} to="/" underline="none" sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component="img" 
            src="/noBgColor.png" 
            alt="CraftsmanLab" 
            sx={{ 
              height: 40,
              width: 'auto',
              maxWidth: 200
            }} 
          />
        </MuiLink>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <MuiLink component={RouterLink} to="/contact" color="text.primary" underline="none" sx={{ fontWeight: 500, '&:hover': { color: 'primary.main' } }}>
            Contact
          </MuiLink>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
