import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar, Toolbar, Box, Button, Link, Stack, Paper, Switch, Tooltip
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const Navbar = ({ toggleTheme, mode }) => {
  return (
    <AppBar
      position="static"
      component={Paper}
      elevation={3}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '3px solid',
        borderColor: 'primary.main',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>

        {/* Logo */}
        <Box sx={{ flex: 1 }}>
          <Link component={RouterLink} to="/" sx={{ display: 'inline-block' }}>
            <img
              src="https://res.cloudinary.com/djydkcx01/image/upload/v1746061572/Mufate_Logo_jnnh7x.png"
              alt="Sacco Logo"
              style={{ height: '115px', objectFit: 'contain' }}
            />
          </Link>
        </Box>

        {/* Links */}
        <Stack direction="row" spacing={3} sx={{ flex: 3, justifyContent: 'center', fontSize: '16px', fontWeight: 500 }}>
          {[
            { to: '/', label: 'Home' },
            { to: '/about', label: 'About Us' },
            { to: '/products', label: 'Products' },
            { to: '/services', label: 'Services' },
            { to: '/resources', label: 'Resources' },
            { to: '/careers', label: 'Careers' },
            { to: '/membership', label: 'Membership' },
            { to: '/faqs', label: 'FAQs' },
            { to: '/news', label: 'News' },
          ].map((item) => (
            <Link
              key={item.to}
              component={RouterLink}
              to={item.to}
              underline="none"
              color="inherit"
              sx={{
                transition: 'color 0.3s',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {item.label}
            </Link>
          ))}
        </Stack>

        {/* Theme Switch + Contact Button */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
          <Tooltip title="Toggle light/dark mode">
            <Switch
              checked={mode === 'dark'}
              onChange={toggleTheme}
              icon={<LightModeIcon sx={{ fontSize: 20 }} />}
              checkedIcon={<DarkModeIcon sx={{ fontSize: 20 }} />}
              color="primary"
            />
          </Tooltip>
          <Button
            component={RouterLink}
            to="/contact"
            variant="contained"
            startIcon={<PhoneIcon />}
            sx={{
              backgroundColor: 'primary.main',
              color: '#fff',
              fontWeight: 'bold',
              px: 3,
              py: 1.2,
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'secondary.main',
                boxShadow: '0 0 10px #76ff03',
              }
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
