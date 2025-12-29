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
import { motion, AnimatePresence } from 'framer-motion';

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
    { to: '/news', label: 'Media' },
  ];

  // Enhanced Button Styling (Reusable)
  const premiumButtonStyle = {
    background: 'linear-gradient(to right, #04522F, #0B8A4A)',
    color: BRAND_GOLD,
    fontWeight: 'bold',
    px: 3,
    py: 1.2,
    borderRadius: '30px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
    border: `1px solid ${BRAND_GOLD}44`,
    '&:hover': {
      background: 'linear-gradient(to right, #0B8A4A, #04522F)',
      transform: 'translateY(-2px) scale(1.02)',
      boxShadow: `0 6px 20px ${BRAND_GOLD}33`,
      letterSpacing: '1.5px',
    },
  };

  const sharedLinkStyles = (isActive) => ({
    fontWeight: isActive ? 'bold' : 500,
    color: BRAND_GOLD,
    textShadow: isActive ? '0 0 8px rgba(236, 155, 20, 0.4)' : 'none',
    textDecoration: 'none',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.3s ease',
    '&::after': {
      content: '""',
      position: 'absolute',
      width: isActive ? '100%' : '0%',
      height: '2px',
      bottom: '-4px',
      left: '0',
      backgroundColor: BRAND_GOLD,
      transition: 'width 0.3s ease',
    },
    '&:hover': {
      color: BRAND_GOLD,
      transform: 'translateY(-2px)',
      '&::after': { width: '100%' }
    },
  });

  const NavDropdown = ({ label, items, isActive }) => (
    <Box sx={{ position: 'relative', '&:hover .dropdown-menu': { display: 'flex' } }}>
      <Link underline="none" sx={sharedLinkStyles(isActive)}>
        {label}
      </Link>
      <Box
        className="dropdown-menu"
        component={motion.div}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{
          position: 'absolute',
          top: '100%',
          left: -20,
          display: 'none',
          flexDirection: 'column',
          backgroundColor: BRAND_DARK,
          borderRadius: '8px',
          boxShadow: '0px 10px 30px rgba(0,0,0,0.5)',
          minWidth: 220,
          zIndex: 10,
          mt: 2,
          py: 1,
          border: `1px solid ${BRAND_GOLD}33`,
          backdropFilter: 'blur(10px)',
        }}
      >
        {items.map((item) => (
          <Link
            key={item.to}
            component={RouterLink}
            to={item.to}
            underline="none"
            sx={{
              px: 3, py: 1.5, color: BRAND_TEXT_LIGHT,
              transition: '0.2s',
              '&:hover': { backgroundColor: 'rgba(236, 155, 20, 0.1)', color: BRAND_GOLD, pl: 4 }
            }}
          >
            {item.label}
          </Link>
        ))}
      </Box>
    </Box>
  );

  return (
    <AppBar position="sticky" component={Paper} elevation={10} sx={{
      backgroundColor: 'rgba(2, 21, 15, 0.95)',
      backdropFilter: 'blur(12px)',
      borderBottom: `3px solid ${BRAND_GOLD}`,
      color: BRAND_TEXT_LIGHT,
      zIndex: theme.zIndex.appBar,
    }}>
      <Toolbar sx={{ justifyContent: 'space-between', py: { xs: 1, md: 2 }, minHeight: { xs: 90, md: 120 } }}>
        
        {/* LOGO SECTION */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Link component={RouterLink} to="/" underline="none" sx={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
            <Box component="img" 
                 src="https://res.cloudinary.com/djydkcx01/image/upload/v1764080163/ChatGPT_Image_Nov_25_2025_05_15_43_PM_kt0vz9.png"
                 alt="Logo" 
                 sx={{ height: isMobile ? 55 : 80, width: 'auto', objectFit: 'contain' }} />
            <Stack spacing={0} sx={{ ml: 2 }}>
              <Typography sx={{ fontSize: { xs: '0.85rem', md: '1.1rem' }, fontWeight: 800, color: BRAND_GOLD, textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1.2 }}>
                Golden Generation
              </Typography>
              <Typography sx={{ fontSize: { xs: '0.75rem', md: '0.95rem' }, fontWeight: 700, color: BRAND_GOLD, textTransform: 'uppercase', letterSpacing: '0.3em', lineHeight: 1.2 }}>
                DT SACCO
              </Typography>
              <Typography sx={{ display: { xs: 'none', sm: 'block' }, fontSize: '0.85rem', fontWeight: 400, fontStyle: 'italic', color: BRAND_TEXT_LIGHT, opacity: 0.9 }}>
                Walking With You
              </Typography>
            </Stack>
          </Link>
        </Box>

        {/* DESKTOP NAV */}
        {!isMobile ? (
          <>
            <Stack direction="row" spacing={4} sx={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
              {navLinks.map((item) => {
                const isActive = location.pathname.startsWith(item.to) && (item.to !== '/' || location.pathname === '/');
                if (item.label === 'About Us') return <NavDropdown key="about" label="About Us" isActive={isActive} items={[{ to: '/about/who-we-are', label: 'Profile' }, { to: '/about/board-of-directors', label: 'Board of Directors' }, { to: '/about/management', label: 'Management' }]} />;
                if (item.label === 'Products') return <NavDropdown key="products" label="Products" isActive={isActive} items={[{ to: '/products/fosa', label: 'FOSA Loans' }, { to: '/products/bosa', label: 'BOSA Loans' }, { to: '/products/savings', label: 'Savings' }, { to: '/products/loanCalculator', label: 'Loan Calculator' }]} />;
                if (item.label === 'Media') return <NavDropdown key="media" label="Media" isActive={isActive} items={[{ to: '/news', label: 'News' }, { to: '/videos', label: 'Videos' }, { to: '/gallery', label: 'Sacco Gallery' }]} />;
                return <Link key={item.to} component={RouterLink} to={item.to} underline="none" sx={sharedLinkStyles(isActive)}>{item.label}</Link>;
              })}
              <Button component={RouterLink} to="/customer_registration" sx={premiumButtonStyle}>Register Here</Button>
            </Stack>
            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Button component={RouterLink} to="/contact" startIcon={<PhoneIcon />} sx={premiumButtonStyle}>Contact Us</Button>
            </Box>
          </>
        ) : (
          <IconButton onClick={() => setDrawerOpen(true)}><MenuIcon sx={{ color: BRAND_GOLD, fontSize: '2rem' }} /></IconButton>
        )}

        {/* MOBILE DRAWER */}
        <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)} sx={{ '& .MuiDrawer-paper': { width: '85%', backgroundColor: BRAND_DARK, color: BRAND_TEXT_LIGHT, p: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, pb: 2, borderBottom: `1px solid ${BRAND_GOLD}33` }}>
             <Box component="img" src="https://res.cloudinary.com/djydkcx01/image/upload/v1764080163/ChatGPT_Image_Nov_25_2025_05_15_43_PM_kt0vz9.png" sx={{ height: 50, mr: 2 }} />
             <Typography sx={{ fontWeight: 700, color: BRAND_GOLD, fontSize: '0.9rem', textTransform: 'uppercase' }}>Golden Generation DT Sacco</Typography>
          </Box>
          <Stack spacing={2.5} divider={<Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }} />}>
            {navLinks.map((item) => {
              const subItems = item.label === 'About Us' ? [{ to: '/about/who-we-are', label: 'Profile' }, { to: '/about/board-of-directors', label: 'Board' }, { to: '/about/management', label: 'Management' }] 
                             : item.label === 'Products' ? [{ to: '/products/fosa', label: 'FOSA' }, { to: '/products/bosa', label: 'BOSA' }, { to: '/products/savings', label: 'Savings' }]
                             : item.label === 'Media' ? [{ to: '/news', label: 'News' }, { to: '/videos', label: 'Videos' }] : null;
              
              return (
                <Box key={item.label}>
                  <Typography sx={{ color: BRAND_GOLD, fontWeight: 'bold', mb: 1.5, fontSize: '0.75rem', letterSpacing: '2px' }}>{item.label.toUpperCase()}</Typography>
                  <Stack pl={2} spacing={2}>
                    {subItems ? subItems.map(sub => (
                      <Link key={sub.to} component={RouterLink} to={sub.to} onClick={() => setDrawerOpen(false)} sx={{ color: BRAND_TEXT_LIGHT, textDecoration: 'none', fontSize: '1.1rem' }}>{sub.label}</Link>
                    )) : <Link component={RouterLink} to={item.to} onClick={() => setDrawerOpen(false)} sx={{ color: BRAND_TEXT_LIGHT, textDecoration: 'none', fontSize: '1.1rem' }}>{item.label}</Link>}
                  </Stack>
                </Box>
              );
            })}
            <Stack spacing={2} pt={2}>
              <Button component={RouterLink} to="/customer_registration" sx={premiumButtonStyle} fullWidth>Register Here</Button>
              <Button component={RouterLink} to="/contact" startIcon={<PhoneIcon />} sx={{ ...premiumButtonStyle, background: 'transparent', border: `2px solid ${BRAND_GOLD}` }} fullWidth>Contact Us</Button>
            </Stack>
          </Stack>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;