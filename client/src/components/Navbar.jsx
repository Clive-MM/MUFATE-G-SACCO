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
  ];

  const drawerLinkStyle = {
    fontSize: '1rem',
    color: BRAND_TEXT_LIGHT,
    textDecoration: 'none',
    '&:hover': { color: BRAND_GOLD, transform: 'translateX(5px)' },
    transition: 'all 0.3s ease',
  };

  const dropdownLinkStyle = {
    px: 2,
    py: 1,
    textDecoration: 'none',
    color: BRAND_TEXT_LIGHT,
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.04)',
      color: BRAND_GOLD,
    },
  };

  const sharedLinkStyles = (active) => ({
    fontWeight: active ? 'bold' : 500,
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
              sx={{ height: isMobile ? 50 : 70 }}
            />
            <Stack sx={{ ml: 1.5 }}>
              <Typography color={BRAND_GOLD} fontWeight={700}>Golden Generation</Typography>
              <Typography color={BRAND_GOLD} fontWeight={700}>DT SACCO</Typography>
              <Typography fontStyle="italic" color={BRAND_TEXT_LIGHT} fontSize="0.8rem">
                Walking With You
              </Typography>
            </Stack>
          </Link>
        </Box>

        {/* DESKTOP NAV */}
        {!isMobile ? (
          <Stack direction="row" spacing={3} alignItems="center">
            {navLinks.map((item) => {
              const active = location.pathname.startsWith(item.to);
              if (item.label === 'About Us' || item.label === 'Products') {
                return null; // already handled elsewhere in your original logic
              }
              return (
                <Link key={item.to} component={RouterLink} to={item.to} sx={sharedLinkStyles(active)}>
                  {item.label}
                </Link>
              );
            })}

            {/* MEDIA DROPDOWN */}
            <Box sx={{ position: 'relative', '&:hover .media-menu': { display: 'flex' } }}>
              <Link underline="none" sx={sharedLinkStyles(location.pathname.startsWith('/media'))}>
                Media
              </Link>

              <Box
                className="media-menu"
                component={motion.div}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                sx={{
                  position: 'absolute',
                  top: '100%',
                  display: 'none',
                  flexDirection: 'column',
                  backgroundColor: BRAND_DARK,
                  minWidth: 200,
                  borderRadius: 1,
                }}
              >
                <Link component={RouterLink} to="/media/gallery" sx={dropdownLinkStyle}>Gallery</Link>
                <Link component={RouterLink} to="/media/videos" sx={dropdownLinkStyle}>Videos</Link>
                <Link component={RouterLink} to="/media/blogs" sx={dropdownLinkStyle}>Blogs</Link>
              </Box>
            </Box>

            <Button component={RouterLink} to="/customer_registration" variant="contained">
              Register Here
            </Button>
          </Stack>
        ) : (
          <>
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon sx={{ color: BRAND_GOLD }} />
            </IconButton>

            {/* MOBILE DRAWER */}
            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              <Stack spacing={2} sx={{ p: 2, backgroundColor: BRAND_DARK }}>
                {navLinks.map((item) => (
                  <Link key={item.to} component={RouterLink} to={item.to} sx={drawerLinkStyle}>
                    {item.label}
                  </Link>
                ))}

                <Typography color={BRAND_GOLD} fontWeight="bold">Media</Typography>
                <Link to="/media/gallery" component={RouterLink} sx={drawerLinkStyle}>Gallery</Link>
                <Link to="/media/videos" component={RouterLink} sx={drawerLinkStyle}>Videos</Link>
                <Link to="/media/blogs" component={RouterLink} sx={drawerLinkStyle}>Blogs</Link>

                <Button component={RouterLink} to="/customer_registration">Register Here</Button>
                <Button component={RouterLink} to="/contact" startIcon={<PhoneIcon />}>
                  Contact Us
                </Button>
              </Stack>
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
