import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Link,
  Stack,
  Paper,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/products', label: 'Products' },
    { to: '/services', label: 'Services' },
    { to: '/resources', label: 'Resources' },
    { to: '/careers', label: 'Careers' },
    { to: '/membership', label: 'Membership' },
    { to: '/faqs', label: 'FAQs' },
    { to: '/news', label: 'News' },
  ];

  const dropdownLinkStyle = {
    px: 2,
    py: 1,
    textDecoration: 'none',
    color: 'text.primary',
    '&:hover': {
      backgroundColor: 'primary.light',
      color: 'primary.main',
    },
  };

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
        {/* Logo with Text */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Link
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            <img
              src="https://res.cloudinary.com/djydkcx01/image/upload/v1746061572/Mufate_Logo_jnnh7x.png"
              alt="MUFATE G SACCO Logo"
              style={{ height: isMobile ? '70px' : '100px', objectFit: 'contain' }}
            />
            <Typography
              variant="caption"
              sx={{
                fontSize: isMobile ? '0.75rem' : '0.95rem',
                fontWeight: 'bold',
                color: '#014421',
                mt: 0.5,
                textAlign: 'center',
                letterSpacing: '1px',
              }}
            >
              MUFATE G SACCO
            </Typography>
          </Link>
        </Box>

        {/* Navigation Links */}
        {!isMobile ? (
          <Stack direction="row" spacing={3} sx={{ flex: 3, justifyContent: 'center', fontSize: '16px', fontWeight: 500 }}>
            {navLinks.map((item) => {
              const isActive = location.pathname === item.to || location.pathname.startsWith(item.to);
              const isDropdown = ['About Us', 'Products'].includes(item.label);

              const sharedLinkStyles = {
                fontWeight: isActive ? 'bold' : 500,
                textShadow: isActive ? '0 0 8px rgba(100, 221, 23, 0.8)' : 'none',
                transform: isActive ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: 'primary.main',
                  transform: 'translateY(-3px) scale(1.1)',
                },
              };

              if (item.label === 'About Us') {
                return (
                  <Box key="about" sx={{ position: 'relative', '&:hover .dropdown-menu': { display: 'flex' } }}>
                    <Link underline="none" color={isActive ? 'primary.main' : 'inherit'} sx={sharedLinkStyles}>
                      About Us
                    </Link>
                    <Box
                      className="dropdown-menu"
                      component={motion.div}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        display: 'none',
                        flexDirection: 'column',
                        backgroundColor: 'background.paper',
                        borderRadius: 1,
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        minWidth: 180,
                        zIndex: 10,
                      }}
                    >
                      <Link component={RouterLink} to="/about/who-we-are" sx={dropdownLinkStyle}>Who We Are</Link>
                      <Link component={RouterLink} to="/about/board-of-directors" sx={dropdownLinkStyle}>Board of Directors</Link>
                      <Link component={RouterLink} to="/about/management" sx={dropdownLinkStyle}>Management</Link>
                    </Box>
                  </Box>
                );
              }

              if (item.label === 'Products') {
                return (
                  <Box key="products" sx={{ position: 'relative', '&:hover .dropdown-menu': { display: 'flex' } }}>
                    <Link underline="none" color={isActive ? 'primary.main' : 'inherit'} sx={sharedLinkStyles}>
                      Products
                    </Link>
                    <Box
                      className="dropdown-menu"
                      component={motion.div}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      sx={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        display: 'none',
                        flexDirection: 'column',
                        backgroundColor: 'background.paper',
                        borderRadius: 1,
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        minWidth: 180,
                        zIndex: 10,
                      }}
                    >
                      <Link component={RouterLink} to="/products/fosa" sx={dropdownLinkStyle}>FOSA LOANS</Link>
                      <Link component={RouterLink} to="/products/bosa" sx={dropdownLinkStyle}>BOSA LOANS</Link>
                      <Link component={RouterLink} to="/products/savings" sx={dropdownLinkStyle}>SAVINGS</Link>
                    </Box>
                  </Box>
                );
              }

              return (
                <Link
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  underline="none"
                  color={isActive ? 'primary.main' : 'inherit'}
                  sx={sharedLinkStyles}
                >
                  {item.label}
                </Link>
              );
            })}
          </Stack>
        ) : (
          <IconButton onClick={() => setDrawerOpen(true)}>
            <MenuIcon sx={{ color: 'primary.main' }} />
          </IconButton>
        )}

        {/* Contact Button */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
          {!isMobile && (
            <Button
              component={RouterLink}
              to="/contact"
              variant="contained"
              startIcon={<PhoneIcon />}
              sx={{
                background: 'linear-gradient(to right, #64dd17, #76ff03)',
                color: '#fff',
                fontWeight: 'bold',
                px: 3,
                py: 1.2,
                borderRadius: '30px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(100, 221, 23, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(to right, #76ff03, #64dd17)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 20px rgba(100, 221, 23, 0.5)',
                },
              }}
            >
              Contact Us
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
