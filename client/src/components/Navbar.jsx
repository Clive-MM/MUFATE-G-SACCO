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
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import { motion } from 'framer-motion';

const BRAND_GOLD = '#EC9B14';
const BRAND_DARK = '#02150F'; 
const BRAND_TEXT_LIGHT = '#F4F4F4';

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
    { to: '/news', label: 'Media' }, // This acts as the parent for News, Videos, Gallery
  ];

  const drawerLinkStyle = {
    fontSize: '1rem',
    color: BRAND_TEXT_LIGHT,
    textDecoration: 'none',
    '&:hover': {
      color: BRAND_GOLD,
      transform: 'translateX(5px)',
    },
    transition: 'all 0.3s ease',
  };

  const dropdownLinkStyle = {
    px: 2,
    py: 1,
    textDecoration: 'none',
    color: BRAND_TEXT_LIGHT,
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.04)',
      color: BRAND_GOLD,
    },
  };

  const sharedLinkStyles = (isActive) => ({
    fontWeight: isActive ? 'bold' : 500,
    color: BRAND_GOLD,
    textShadow: isActive ? '0 0 5px rgba(236, 155, 20, 0.6)' : 'none',
    transform: isActive ? 'scale(1.03)' : 'scale(1)',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: BRAND_GOLD,
      transform: 'translateY(-3px) scale(1.05)',
    },
  });

  // Reusable Dropdown Component for Desktop
  const NavDropdown = ({ label, items, isActive }) => (
    <Box
      sx={{
        position: 'relative',
        '&:hover .dropdown-menu': { display: 'flex' },
      }}
    >
      <Link underline="none" sx={sharedLinkStyles(isActive)}>
        {label}
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
          backgroundColor: BRAND_DARK,
          borderRadius: 1,
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
          minWidth: 200,
          zIndex: 10,
          pt: 1, pb: 1,
          border: `1px solid ${BRAND_GOLD}33`
        }}
      >
        {items.map((item) => (
          <Link
            key={item.to}
            component={RouterLink}
            to={item.to}
            underline="none"
            sx={dropdownLinkStyle}
          >
            {item.label}
          </Link>
        ))}
      </Box>
    </Box>
  );

  return (
    <AppBar
      position="sticky"
      component={Paper}
      elevation={6}
      sx={{
        backgroundColor: 'rgba(2, 21, 15, 0.92)',
        backdropFilter: 'blur(10px)',
        borderBottom: '2px solid',
        borderColor: BRAND_GOLD,
        color: BRAND_TEXT_LIGHT,
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: { xs: 0.6, md: 1.4 }, minHeight: { xs: 90, md: 120 } }}>
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Link component={RouterLink} to="/" underline="none" sx={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
            <Box
              component="img"
              src="https://res.cloudinary.com/djydkcx01/image/upload/v1764080163/ChatGPT_Image_Nov_25_2025_05_15_43_PM_kt0vz9.png"
              alt="Logo"
              sx={{ height: isMobile ? 50 : 70, width: 'auto', objectFit: 'contain' }}
            />
            <Stack spacing={0.1} sx={{ ml: 1.5 }}>
              <Typography sx={{ fontSize: { xs: '0.8rem', md: '1rem' }, fontWeight: 700, color: BRAND_GOLD, textTransform: 'uppercase', letterSpacing: '0.16em', lineHeight: 1.1 }}>
                Golden Generation
              </Typography>
              <Typography sx={{ fontSize: { xs: '0.75rem', md: '0.95rem' }, fontWeight: 700, color: BRAND_GOLD, textTransform: 'uppercase', letterSpacing: '0.28em', lineHeight: 1.1 }}>
                DT SACCO
              </Typography>
            </Stack>
          </Link>
        </Box>

        {!isMobile ? (
          <Stack direction="row" spacing={3} sx={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
            {navLinks.map((item) => {
              const isActive = location.pathname.startsWith(item.to) && (item.to !== '/' || location.pathname === '/');

              if (item.label === 'About Us') {
                return <NavDropdown key="about" label="About Us" isActive={isActive} items={[
                  { to: '/about/who-we-are', label: 'Profile' },
                  { to: '/about/board-of-directors', label: 'Board of Directors' },
                  { to: '/about/management', label: 'Management' },
                ]} />;
              }

              if (item.label === 'Products') {
                return <NavDropdown key="products" label="Products" isActive={isActive} items={[
                  { to: '/products/fosa', label: 'FOSA Loans' },
                  { to: '/products/bosa', label: 'BOSA Loans' },
                  { to: '/products/savings', label: 'Savings' },
                  { to: '/products/loanCalculator', label: 'Loan Calculator' },
                ]} />;
              }

              // --- ADDED MEDIA DROPDOWN HERE ---
              if (item.label === 'Media') {
                return <NavDropdown key="media" label="Media" isActive={isActive} items={[
                  { to: '/news', label: 'News' },
                  { to: '/videos', label: 'Videos' },
                  { to: '/gallery', label: 'Sacco Gallery' },
                ]} />;
              }

              return (
                <Link key={item.to} component={RouterLink} to={item.to} underline="none" sx={sharedLinkStyles(isActive)}>
                  {item.label}
                </Link>
              );
            })}
            <Button component={RouterLink} to="/customer_registration" variant="contained" sx={{ background: 'linear-gradient(to right, #04522F, #0B8A4A)', color: BRAND_GOLD, borderRadius: '30px', fontWeight: 'bold', px: 3 }}>
              Register Here
            </Button>
          </Stack>
        ) : (
          <>
            <IconButton onClick={() => setDrawerOpen(true)}><MenuIcon sx={{ color: BRAND_GOLD }} /></IconButton>
            <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)} sx={{ '& .MuiDrawer-paper': { width: '80%', padding: 2, backgroundColor: BRAND_DARK, color: BRAND_TEXT_LIGHT } }}>
              <Stack spacing={2}>
                {navLinks.map((item) => {
                  // Nested logic for Mobile
                  const dropdownItems = 
                    item.label === 'About Us' ? [
                      { to: '/about/who-we-are', label: 'Who We Are' },
                      { to: '/about/board-of-directors', label: 'Board of Directors' },
                      { to: '/about/management', label: 'Management' }
                    ] : item.label === 'Products' ? [
                      { to: '/products/fosa', label: 'FOSA Loans' },
                      { to: '/products/bosa', label: 'BOSA Loans' },
                      { to: '/products/savings', label: 'Savings' },
                      { to: '/products/loanCalculator', label: 'Loan Calculator' }
                    ] : item.label === 'Media' ? [
                      { to: '/news', label: 'News' },
                      { to: '/videos', label: 'Videos' },
                      { to: '/gallery', label: 'Sacco Gallery' }
                    ] : null;

                  if (dropdownItems) {
                    return (
                      <Box key={item.label}>
                        <Typography sx={{ fontWeight: 'bold', mb: 1, color: BRAND_GOLD, textTransform: 'uppercase' }}>{item.label}</Typography>
                        <Stack pl={2} spacing={1}>
                          {dropdownItems.map(sub => (
                            <Link key={sub.to} component={RouterLink} to={sub.to} onClick={() => setDrawerOpen(false)} underline="none" sx={drawerLinkStyle}>
                              {sub.label}
                            </Link>
                          ))}
                        </Stack>
                      </Box>
                    );
                  }

                  return (
                    <Link key={item.to} component={RouterLink} to={item.to} onClick={() => setDrawerOpen(false)} underline="none" sx={drawerLinkStyle}>
                      {item.label}
                    </Link>
                  );
                })}
              </Stack>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;