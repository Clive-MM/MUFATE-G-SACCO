// 🔴 ONLY ADDITIONS ARE MARKED WITH COMMENTS
// Everything else is unchanged

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
    { to: '/news', label: 'Media' }, // kept for active detection
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

        {/* ================= DESKTOP NAV ================= */}
        {!isMobile && (
          <Stack
            direction="row"
            spacing={3}
            sx={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}
          >
            {navLinks.map((item) => {
              const isActive =
                item.to === '/'
                  ? location.pathname === '/'
                  : location.pathname === item.to ||
                    location.pathname.startsWith(item.to);

              /* ================= MEDIA DROPDOWN (NEW) ================= */
              if (item.label === 'Media') {
                return (
                  <Box
                    key="media"
                    sx={{
                      position: 'relative',
                      '&:hover .dropdown-menu-media': { display: 'flex' },
                    }}
                  >
                    <Link underline="none" sx={sharedLinkStyles(isActive)}>
                      Media
                    </Link>

                    <Box
                      className="dropdown-menu-media"
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
                        boxShadow: '0px 4px 8px rgba(0,0,0,0.4)',
                        minWidth: 200,
                        zIndex: 10,
                      }}
                    >
                      <Link component={RouterLink} to="/media/gallery" sx={dropdownLinkStyle}>
                        Gallery
                      </Link>
                      <Link component={RouterLink} to="/media/videos" sx={dropdownLinkStyle}>
                        Videos
                      </Link>
                      <Link component={RouterLink} to="/media/news" sx={dropdownLinkStyle}>
                        News
                      </Link>
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
                  sx={sharedLinkStyles(isActive)}
                >
                  {item.label}
                </Link>
              );
            })}
          </Stack>
        )}

        {/* ================= MOBILE DRAWER ================= */}
        {isMobile && (
          <>
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon sx={{ color: BRAND_GOLD }} />
            </IconButton>

            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              sx={{
                '& .MuiDrawer-paper': {
                  width: '80%',
                  padding: 2,
                  backgroundColor: BRAND_DARK,
                  color: BRAND_TEXT_LIGHT,
                },
              }}
            >
              <Stack spacing={2}>

                {/* ========= MEDIA (MOBILE) ========= */}
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      mb: 1,
                      color: BRAND_GOLD,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                    }}
                  >
                    Media
                  </Typography>

                  <Stack pl={2} spacing={1}>
                    <Link component={RouterLink} to="/media/gallery" sx={drawerLinkStyle}>
                      Gallery
                    </Link>
                    <Link component={RouterLink} to="/media/videos" sx={drawerLinkStyle}>
                      Videos
                    </Link>
                    <Link component={RouterLink} to="/media/news" sx={drawerLinkStyle}>
                      News
                    </Link>
                  </Stack>
                </Box>

              </Stack>
            </Drawer>
          </>
        )}

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
