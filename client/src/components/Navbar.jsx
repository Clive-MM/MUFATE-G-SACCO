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
    { to: '/news', label: 'Media' }, // kept for active logic
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
    transition: 'all 0.3s ease',
    '&:hover': {
      color: BRAND_GOLD,
      transform: 'translateY(-3px) scale(1.05)',
    },
  });

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
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          py: { xs: 0.6, md: 1.4 },
          minHeight: { xs: 90, md: 120 },
        }}
      >
        {/* ================= LOGO ================= */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Link
            component={RouterLink}
            to="/"
            underline="none"
            sx={{ display: 'flex', alignItems: 'center', color: 'inherit' }}
          >
            <Box
              component="img"
              src="https://res.cloudinary.com/djydkcx01/image/upload/v1764080163/ChatGPT_Image_Nov_25_2025_05_15_43_PM_kt0vz9.png"
              alt="Golden Generation DT SACCO Logo"
              sx={{ height: isMobile ? 50 : 70 }}
            />
          </Link>
        </Box>

        {/* ================= DESKTOP NAV ================= */}
        {!isMobile ? (
          <Stack direction="row" spacing={3} sx={{ flex: 3, justifyContent: 'center' }}>
            {navLinks.map((item) => {
              const isActive =
                item.to === '/'
                  ? location.pathname === '/'
                  : location.pathname === item.to ||
                    location.pathname.startsWith(item.to);

              if (item.label === 'About Us') {
                return (
                  <Box
                    key="about"
                    sx={{
                      position: 'relative',
                      '&:hover .dropdown-menu-about': { display: 'flex' },
                    }}
                  >
                    <Link underline="none" sx={sharedLinkStyles(isActive)}>About Us</Link>
                    <Box className="dropdown-menu-about" component={motion.div}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      sx={{
                        position: 'absolute',
                        top: '100%',
                        display: 'none',
                        flexDirection: 'column',
                        backgroundColor: BRAND_DARK,
                        borderRadius: 1,
                        minWidth: 200,
                      }}
                    >
                      <Link component={RouterLink} to="/about/who-we-are" sx={dropdownLinkStyle}>Profile</Link>
                      <Link component={RouterLink} to="/about/board-of-directors" sx={dropdownLinkStyle}>Board of Directors</Link>
                      <Link component={RouterLink} to="/about/management" sx={dropdownLinkStyle}>Management</Link>
                    </Box>
                  </Box>
                );
              }

              if (item.label === 'Products') {
                return (
                  <Box
                    key="products"
                    sx={{
                      position: 'relative',
                      '&:hover .dropdown-menu-products': { display: 'flex' },
                    }}
                  >
                    <Link underline="none" sx={sharedLinkStyles(isActive)}>Products</Link>
                    <Box className="dropdown-menu-products" component={motion.div}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      sx={{
                        position: 'absolute',
                        top: '100%',
                        display: 'none',
                        flexDirection: 'column',
                        backgroundColor: BRAND_DARK,
                        borderRadius: 1,
                        minWidth: 200,
                      }}
                    >
                      <Link component={RouterLink} to="/products/fosa" sx={dropdownLinkStyle}>FOSA Loans</Link>
                      <Link component={RouterLink} to="/products/bosa" sx={dropdownLinkStyle}>BOSA Loans</Link>
                      <Link component={RouterLink} to="/products/savings" sx={dropdownLinkStyle}>Savings</Link>
                      <Link component={RouterLink} to="/products/loanCalculator" sx={dropdownLinkStyle}>Loan Calculator</Link>
                    </Box>
                  </Box>
                );
              }

              /* ================= MEDIA (NEW) ================= */
              if (item.label === 'Media') {
                return (
                  <Box
                    key="media"
                    sx={{
                      position: 'relative',
                      '&:hover .dropdown-menu-media': { display: 'flex' },
                    }}
                  >
                    <Link underline="none" sx={sharedLinkStyles(isActive)}>Media</Link>
                    <Box
                      className="dropdown-menu-media"
                      component={motion.div}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      sx={{
                        position: 'absolute',
                        top: '100%',
                        display: 'none',
                        flexDirection: 'column',
                        backgroundColor: BRAND_DARK,
                        borderRadius: 1,
                        minWidth: 200,
                      }}
                    >
                      <Link component={RouterLink} to="/media/gallery" sx={dropdownLinkStyle}>Gallery</Link>
                      <Link component={RouterLink} to="/media/videos" sx={dropdownLinkStyle}>Videos</Link>
                      <Link component={RouterLink} to="/media/blogs" sx={dropdownLinkStyle}>Blogs</Link>
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
          /* ================= MOBILE DRAWER ================= */
          <>
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon sx={{ color: BRAND_GOLD }} />
            </IconButton>

            <Drawer
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              sx={{ '& .MuiDrawer-paper': { width: '80%', p: 2, backgroundColor: BRAND_DARK } }}
            >
              <Stack spacing={2}>
                <Typography sx={{ color: BRAND_GOLD, fontWeight: 'bold' }}>Media</Typography>
                <Stack pl={2}>
                  <Link component={RouterLink} to="/media/gallery" sx={drawerLinkStyle}>Gallery</Link>
                  <Link component={RouterLink} to="/media/videos" sx={drawerLinkStyle}>Videos</Link>
                  <Link component={RouterLink} to="/media/news" sx={drawerLinkStyle}>News</Link>
                </Stack>
              </Stack>
            </Drawer>
          </>
        )}

        {!isMobile && (
          <Button component={RouterLink} to="/contact" startIcon={<PhoneIcon />} sx={{ color: BRAND_GOLD }}>
            Contact Us
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
