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
const BRAND_DARK = '#02150F'; // deep green/black like logo background
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
    { to: '/news', label: 'News' },
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
        backgroundColor: 'rgba(2, 21, 15, 0.92)', // BRAND_DARK with alpha
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
        {/* Logo + brand text */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Link
            component={RouterLink}
            to="/"
            underline="none"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            {/* Logo icon */}
            <Box
              component="img"
              src="https://res.cloudinary.com/djydkcx01/image/upload/v1764080163/ChatGPT_Image_Nov_25_2025_05_15_43_PM_kt0vz9.png"
              alt="Golden Generation DT SACCO Logo"
              sx={{
                height: isMobile ? 50 : 70,
                width: 'auto',
                objectFit: 'contain',
              }}
            />

            {/* Brand text – responsive */}
            <Stack spacing={0.1} sx={{ ml: 1.5 }}>
              {/* Line 1 – Golden Generation */}
              <Typography
                sx={{
                  fontSize: { xs: '0.8rem', md: '1rem' },
                  fontWeight: 700,
                  color: BRAND_GOLD,
                  textTransform: 'uppercase',
                  letterSpacing: { xs: '0.12em', md: '0.16em' },
                  lineHeight: 1.1,
                }}
              >
                Golden Generation
              </Typography>

              {/* Line 2 – DT SACCO */}
              <Typography
                sx={{
                  fontSize: { xs: '0.75rem', md: '0.95rem' },
                  fontWeight: 700,
                  color: BRAND_GOLD,
                  textTransform: 'uppercase',
                  letterSpacing: { xs: '0.22em', md: '0.28em' },
                  lineHeight: 1.1,
                }}
              >
                DT SACCO
              </Typography>

              {/* Line 3 – tagline (hidden on very small screens) */}
              <Typography
                sx={{
                  display: { xs: 'none', sm: 'block' },
                  fontSize: { sm: '0.75rem', md: '0.9rem' },
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: BRAND_TEXT_LIGHT,
                  lineHeight: 1.2,
                }}
              >
                Walking With You
              </Typography>
            </Stack>
          </Link>
        </Box>

        {/* Desktop navigation */}
        {!isMobile ? (
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

              if (item.label === 'About Us') {
                return (
                  <Box
                    key="about"
                    sx={{
                      position: 'relative',
                      '&:hover .dropdown-menu-about': { display: 'flex' },
                    }}
                  >
                    <Link underline="none" sx={sharedLinkStyles(isActive)}>
                      About Us
                    </Link>
                    <Box
                      className="dropdown-menu-about"
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
                      }}
                    >
                      <Link
                        component={RouterLink}
                        to="/about/who-we-are"
                        underline="none"
                        sx={dropdownLinkStyle}
                      >
                        Profile
                      </Link>
                      <Link
                        component={RouterLink}
                        to="/about/board-of-directors"
                        underline="none"
                        sx={dropdownLinkStyle}
                      >
                        Board of Directors
                      </Link>
                      <Link
                        component={RouterLink}
                        to="/about/management"
                        underline="none"
                        sx={dropdownLinkStyle}
                      >
                        Management
                      </Link>
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
                    <Link underline="none" sx={sharedLinkStyles(isActive)}>
                      Products
                    </Link>
                    <Box
                      className="dropdown-menu-products"
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
                      }}
                    >
                      <Link
                        component={RouterLink}
                        to="/products/fosa"
                        underline="none"
                        sx={dropdownLinkStyle}
                      >
                        FOSA Loans
                      </Link>
                      <Link
                        component={RouterLink}
                        to="/products/bosa"
                        underline="none"
                        sx={dropdownLinkStyle}
                      >
                        BOSA Loans
                      </Link>
                      <Link
                        component={RouterLink}
                        to="/products/savings"
                        underline="none"
                        sx={dropdownLinkStyle}
                      >
                        Savings
                      </Link>
                      <Link
                        component={RouterLink}
                        to="/products/loanCalculator"
                        underline="none"
                        sx={dropdownLinkStyle}
                      >
                        Loan Calculator
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

            {/* Register button (desktop) */}
            <Button
              component={RouterLink}
              to="/customer_registration"
              variant="contained"
              sx={{
                background: 'linear-gradient(to right, #04522F, #0B8A4A)',
                color: BRAND_GOLD,
                fontWeight: 'bold',
                px: 3,
                py: 1,
                borderRadius: '30px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(to right, #0B8A4A, #04522F)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.6)',
                  letterSpacing: '1.5px',
                },
              }}
            >
              Register Here
            </Button>
          </Stack>
        ) : (
          <>
            {/* Mobile menu icon */}
            <IconButton onClick={() => setDrawerOpen(true)}>
              <MenuIcon sx={{ color: BRAND_GOLD }} />
            </IconButton>

            {/* Mobile drawer */}
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
              {/* Small brand header inside drawer */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 2,
                  pb: 1,
                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <Box
                  component="img"
                  src="https://res.cloudinary.com/djydkcx01/image/upload/v1764069591/GOLDEN_GENERATION_LOGO_vwsugk.png"
                  alt="Golden Generation DT SACCO Logo"
                  sx={{
                    height: 36,
                    width: 'auto',
                    objectFit: 'contain',
                    mr: 1,
                  }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: BRAND_GOLD,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      lineHeight: 1.1,
                    }}
                  >
                    Golden Generation
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: BRAND_GOLD,
                      textTransform: 'uppercase',
                      letterSpacing: '0.2em',
                      lineHeight: 1.1,
                    }}
                  >
                    DT Sacco
                  </Typography>
                </Box>
              </Box>

              <Stack
                spacing={2}
                divider={
                  <Box sx={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }} />
                }
              >
                {navLinks.map((item) => {
                  if (item.label === 'About Us') {
                    return (
                      <Box key="about-us">
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            mb: 1,
                            color: BRAND_GOLD,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                          }}
                        >
                          About Us
                        </Typography>
                        <Stack pl={2} spacing={1}>
                          <Link
                            component={RouterLink}
                            to="/about/who-we-are"
                            onClick={() => setDrawerOpen(false)}
                            underline="none"
                            sx={drawerLinkStyle}
                          >
                            Who We Are
                          </Link>
                          <Link
                            component={RouterLink}
                            to="/about/board-of-directors"
                            onClick={() => setDrawerOpen(false)}
                            underline="none"
                            sx={drawerLinkStyle}
                          >
                            Board of Directors
                          </Link>
                          <Link
                            component={RouterLink}
                            to="/about/management"
                            onClick={() => setDrawerOpen(false)}
                            underline="none"
                            sx={drawerLinkStyle}
                          >
                            Management
                          </Link>
                        </Stack>
                      </Box>
                    );
                  }

                  if (item.label === 'Products') {
                    return (
                      <Box key="products-mobile">
                        <Typography
                          sx={{
                            fontWeight: 'bold',
                            mb: 1,
                            color: BRAND_GOLD,
                            textTransform: 'uppercase',
                            letterSpacing: '0.08em',
                          }}
                        >
                          Products
                        </Typography>
                        <Stack pl={2} spacing={1}>
                          <Link
                            component={RouterLink}
                            to="/products/fosa"
                            onClick={() => setDrawerOpen(false)}
                            underline="none"
                            sx={drawerLinkStyle}
                          >
                            FOSA Loans
                          </Link>
                          <Link
                            component={RouterLink}
                            to="/products/bosa"
                            onClick={() => setDrawerOpen(false)}
                            underline="none"
                            sx={drawerLinkStyle}
                          >
                            BOSA Loans
                          </Link>
                          <Link
                            component={RouterLink}
                            to="/products/savings"
                            onClick={() => setDrawerOpen(false)}
                            underline="none"
                            sx={drawerLinkStyle}
                          >
                            Savings
                          </Link>
                          <Link
                            component={RouterLink}
                            to="/products/loanCalculator"
                            onClick={() => setDrawerOpen(false)}
                            underline="none"
                            sx={drawerLinkStyle}
                          >
                            Loan Calculator
                          </Link>
                        </Stack>
                      </Box>
                    );
                  }

                  return (
                    <Link
                      key={item.to}
                      component={RouterLink}
                      to={item.to}
                      onClick={() => setDrawerOpen(false)}
                      underline="none"
                      sx={drawerLinkStyle}
                    >
                      {item.label}
                    </Link>
                  );
                })}

                {/* Register button (mobile) */}
                <Button
                  component={RouterLink}
                  to="/customer_registration"
                  onClick={() => setDrawerOpen(false)}
                  variant="contained"
                  sx={{
                    mt: 1,
                    background: 'linear-gradient(to right, #04522F, #0B8A4A)',
                    color: BRAND_GOLD,
                    fontWeight: 'bold',
                    px: 2,
                    py: 1,
                    borderRadius: '30px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    '&:hover': {
                      background:
                        'linear-gradient(to right, #0B8A4A, #04522F)',
                      transform: 'scale(1.05)',
                      letterSpacing: '1.4px',
                    },
                  }}
                >
                  Register Here
                </Button>

                {/* Contact button (mobile) */}
                <Button
                  component={RouterLink}
                  to="/contact"
                  onClick={() => setDrawerOpen(false)}
                  startIcon={<PhoneIcon sx={{ color: BRAND_GOLD }} />}
                  variant="contained"
                  sx={{
                    mt: 1,
                    background: 'linear-gradient(to right, #04522F, #0B8A4A)',
                    color: BRAND_GOLD,
                    fontWeight: 'bold',
                    px: 2,
                    py: 1,
                    borderRadius: '30px',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    '&:hover': {
                      background:
                        'linear-gradient(to right, #0B8A4A, #04522F)',
                      transform: 'scale(1.05)',
                      letterSpacing: '1.4px',
                    },
                  }}
                >
                  Contact Us
                </Button>
              </Stack>
            </Drawer>
          </>
        )}

        {/* Desktop contact button */}
        {!isMobile && (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <Button
              component={RouterLink}
              to="/contact"
              variant="contained"
              startIcon={<PhoneIcon sx={{ color: BRAND_GOLD }} />}
              sx={{
                background: 'linear-gradient(to right, #04522F, #0B8A4A)',
                color: BRAND_GOLD,
                fontWeight: 'bold',
                px: 3,
                py: 1.2,
                borderRadius: '30px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                '&:hover': {
                  background:
                    'linear-gradient(to right, #0B8A4A, #04522F)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.6)',
                  letterSpacing: '1.5px',
                },
              }}
            >
              Contact Us
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
