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
    { label: 'About Us' },
    { label: 'Products' },
    { to: '/services', label: 'Services' },
    { to: '/resources', label: 'Resources' },
    { to: '/careers', label: 'Careers' },
    { to: '/membership', label: 'Membership' },
    { to: '/faqs', label: 'FAQs' },
    { label: 'Media' },
  ];

  const drawerLinkStyle = {
    fontSize: '1rem',
    color: BRAND_TEXT_LIGHT,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      color: BRAND_GOLD,
      transform: 'translateX(5px)',
    },
  };

  const dropdownLinkStyle = {
    px: 2,
    py: 1,
    textDecoration: 'none',
    color: BRAND_TEXT_LIGHT,
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.05)',
      color: BRAND_GOLD,
    },
  };

  const sharedLinkStyles = (isActive) => ({
    fontWeight: isActive ? 'bold' : 500,
    color: BRAND_GOLD,
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-3px) scale(1.05)',
    },
  });

  return (
    <AppBar
      position="sticky"
      component={Paper}
      elevation={6}
      sx={{
        backgroundColor: 'rgba(2,21,15,0.92)',
        backdropFilter: 'blur(10px)',
        borderBottom: `2px solid ${BRAND_GOLD}`,
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 90, md: 120 } }}>

        {/* LOGO */}
        <Box sx={{ flex: 1 }}>
          <Link component={RouterLink} to="/" underline="none" sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src="https://res.cloudinary.com/djydkcx01/image/upload/v1764080163/ChatGPT_Image_Nov_25_2025_05_15_43_PM_kt0vz9.png"
              alt="Logo"
              sx={{ height: isMobile ? 50 : 70 }}
            />
          </Link>
        </Box>

        {/* DESKTOP MENU */}
        {!isMobile ? (
          <Stack direction="row" spacing={3} sx={{ flex: 3, justifyContent: 'center' }}>
            {navLinks.map((item) => {
              const isActive = item.to && location.pathname.startsWith(item.to);

              /* ABOUT US */
              if (item.label === 'About Us') {
                return (
                  <Box key="about" sx={{ position: 'relative', '&:hover .about-dd': { display: 'flex' } }}>
                    <Link sx={sharedLinkStyles(isActive)}>About Us</Link>
                    <Box className="about-dd" sx={dropdownBaseStyle}>
                      <Link component={RouterLink} to="/about/who-we-are" sx={dropdownLinkStyle}>Profile</Link>
                      <Link component={RouterLink} to="/about/board-of-directors" sx={dropdownLinkStyle}>Board</Link>
                      <Link component={RouterLink} to="/about/management" sx={dropdownLinkStyle}>Management</Link>
                    </Box>
                  </Box>
                );
              }

              /* PRODUCTS */
              if (item.label === 'Products') {
                return (
                  <Box key="products" sx={{ position: 'relative', '&:hover .products-dd': { display: 'flex' } }}>
                    <Link sx={sharedLinkStyles(isActive)}>Products</Link>
                    <Box className="products-dd" sx={dropdownBaseStyle}>
                      <Link component={RouterLink} to="/products/fosa" sx={dropdownLinkStyle}>FOSA Loans</Link>
                      <Link component={RouterLink} to="/products/bosa" sx={dropdownLinkStyle}>BOSA Loans</Link>
                      <Link component={RouterLink} to="/products/savings" sx={dropdownLinkStyle}>Savings</Link>
                      <Link component={RouterLink} to="/products/loanCalculator" sx={dropdownLinkStyle}>Loan Calculator</Link>
                    </Box>
                  </Box>
                );
              }

              /* MEDIA (NEW) */
              if (item.label === 'Media') {
                return (
                  <Box key="media" sx={{ position: 'relative', '&:hover .media-dd': { display: 'flex' } }}>
                    <Link sx={sharedLinkStyles(isActive)}>Media</Link>
                    <Box className="media-dd" sx={dropdownBaseStyle}>
                      <Link component={RouterLink} to="/media/gallery" sx={dropdownLinkStyle}>Gallery</Link>
                      <Link component={RouterLink} to="/media/videos" sx={dropdownLinkStyle}>Videos</Link>
                      <Link component={RouterLink} to="/media/news" sx={dropdownLinkStyle}>News</Link>
                    </Box>
                  </Box>
                );
              }

              return (
                <Link key={item.to} component={RouterLink} to={item.to} sx={sharedLinkStyles(isActive)}>
                  {item.label}
                </Link>
              );
            })}
          </Stack>
        ) : (
          <>
            {/* MOBILE MENU */}
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon sx={{ color: BRAND_GOLD }} />
            </IconButton>

            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <Stack spacing={2} p={2}>

                {/* MEDIA – MOBILE */}
                <Typography sx={{ color: BRAND_GOLD, fontWeight: 'bold' }}>Media</Typography>
                <Stack pl={2}>
                  <Link to="/media/gallery" component={RouterLink} sx={drawerLinkStyle}>Gallery</Link>
                  <Link to="/media/videos" component={RouterLink} sx={drawerLinkStyle}>Videos</Link>
                  <Link to="/media/news" component={RouterLink} sx={drawerLinkStyle}>News</Link>
                </Stack>

              </Stack>
            </Drawer>
          </>
        )}

      </Toolbar>
    </AppBar>
  );
};

const dropdownBaseStyle = {
  position: 'absolute',
  top: '100%',
  left: 0,
  display: 'none',
  flexDirection: 'column',
  backgroundColor: BRAND_DARK,
  borderRadius: 1,
  minWidth: 200,
  zIndex: 10,
};

export default Navbar;
