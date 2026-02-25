import React, { useState, useMemo } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Box, Button, Link, Stack, IconButton,
  Typography, useTheme, useMediaQuery, Drawer, Collapse, List,
  ListItemButton, ListItemText, Tooltip, ListItemIcon
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { motion, AnimatePresence } from 'framer-motion';
import { tooltipClasses } from '@mui/material/Tooltip';

// Constants moved outside for performance
const BRAND_GOLD = '#EC9B14';
const BRAND_DARK = '#02150F';
const BRAND_TEXT_LIGHT = '#F4F4F4';

// Helper for consistent translucent colors
const getAlphaGold = (alpha) => `rgba(236, 155, 20, ${alpha})`;

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileOpenMenu, setMobileOpenMenu] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();

  // Optimized styles using useMemo
  const sharedLinkStyles = useMemo(() => (isActive) => ({
    fontWeight: 700,
    fontSize: '0.85rem',
    color: isActive ? '#FFF' : BRAND_GOLD,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
    textDecoration: 'none',
    cursor: 'pointer',
    padding: '10px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    transition: 'all 0.3s ease',
    '&:hover': { color: '#FFF', transform: 'translateY(-1px)' },
  }), []);

  const handleContactClick = (e) => {
    setDrawerOpen(false);
    if (location.pathname === '/contact') {
      e.preventDefault();
      const element = document.getElementById('contact-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const firstInput = element.querySelector('input');
        if (firstInput) firstInput.focus();
      }
    } else {
      navigate('/contact');
    }
  };

  const NavDropdown = ({ label, items, isActive, to }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Box 
        onMouseEnter={() => setIsOpen(true)} 
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)} // Accessibility: Keyboard support
        onBlur={() => setIsOpen(false)}
        sx={{ position: 'relative' }}
      >
        <Link 
            component={RouterLink} 
            to={to} 
            underline="none" 
            sx={sharedLinkStyles(isActive)}
            aria-expanded={isOpen}
        >
          {label}
          <ExpandMore sx={{ fontSize: '1.1rem', transition: '0.3s', transform: isOpen ? 'rotate(180deg)' : 'none' }} />
        </Link>
        {/* Invisible bridge to prevent menu closing when moving mouse to dropdown */}
        <Box sx={{ position: 'absolute', top: '100%', left: 0, width: '100%', height: '10px' }} />
        <AnimatePresence>
          {isOpen && (
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: 5 }}
              transition={{ duration: 0.2 }}
              sx={{
                position: 'absolute', top: 'calc(100% + 5px)', left: '-10px', display: 'flex', flexDirection: 'column',
                backgroundColor: 'rgba(2, 21, 15, 0.98)', backdropFilter: 'blur(12px)', borderRadius: '12px',
                boxShadow: '0px 15px 35px rgba(0, 0, 0, 0.6)', minWidth: 220, zIndex: 100, py: 1.5,
                border: `1px solid ${getAlphaGold(0.3)}`,
              }}
            >
              {items.map((item) => (
                <Link key={item.to} component={RouterLink} to={item.to} underline="none"
                  sx={{
                    px: 3, py: 1.2, fontWeight: 600, fontSize: '0.85rem', color: BRAND_TEXT_LIGHT,
                    '&:hover': { backgroundColor: getAlphaGold(0.15), color: BRAND_GOLD, pl: 3.5 }
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </Box>
          )}
        </AnimatePresence>
      </Box>
    );
  };

  return (
    <AppBar 
      position="fixed" 
      elevation={0} 
      sx={{ 
        background: 'rgba(2, 21, 15, 0.96)', 
        borderBottom: `1px solid ${getAlphaGold(0.2)}`, 
        zIndex: theme.zIndex.appBar 
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: { xs: 1, md: 1 }, px: { md: 4 }, minHeight: { xs: 70, md: 100 } }}>
        
        {/* LOGO AREA - Optimized for Mobile Spacing */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link component={RouterLink} to="/" underline="none" sx={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
            <Box component="img" 
              src="https://res.cloudinary.com/djydkcx01/image/upload/v1764080163/ChatGPT_Image_Nov_25_2025_05_15_43_PM_kt0vz9.png"
              alt="Golden Generation Sacco Logo" // Accessibility
              sx={{ height: { xs: 50, sm: 60, md: 75 }, width: 'auto' }} 
            />
            <Stack spacing={0} sx={{ ml: { xs: 1, md: 1.5 } }}>
              <Typography sx={{ fontSize: { xs: '0.75rem', md: '1rem' }, fontWeight: 900, color: BRAND_GOLD, textTransform: 'uppercase', lineHeight: 1.2 }}>
                Golden Generation
              </Typography>
              <Typography sx={{ fontSize: { xs: '0.75rem', md: '0.9rem' }, fontWeight: 900, color: BRAND_GOLD, textTransform: 'uppercase', lineHeight: 1.2 }}>
                DT SACCO
              </Typography>
              {!isMobile && ( // Hide slogan on very small mobile to save space
                 <Typography sx={{ fontSize: '0.9rem', fontWeight: 900, color: '#FFFFFF', textTransform: 'uppercase' }}>
                   Walking With You
                 </Typography>
              )}
            </Stack>
          </Link>
        </Box>

        {/* DESKTOP VIEW */}
        {!isMobile ? (
          <Stack direction="row" spacing={2.5} alignItems="center">
            {navLinks.map((item) => (
              item.items ? (
                <NavDropdown key={item.label} label={item.label} items={item.items} to={item.to} isActive={location.pathname.startsWith(item.to)} />
              ) : (
                <Link key={item.to} component={RouterLink} to={item.to} underline="none" sx={sharedLinkStyles(location.pathname === item.to)}>{item.label}</Link>
              )
            ))}
            <Button 
                component={RouterLink} 
                to="/customer_registration" 
                variant="contained"
                sx={premiumButtonStyle}
            >
                Register
            </Button>
            
            <Tooltip title="Contact Us" arrow sx={tooltipStyles}>
                <IconButton 
                    onClick={handleContactClick} 
                    aria-label="Contact support"
                    component={motion.button}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    sx={{ color: BRAND_GOLD, border: `2px solid ${BRAND_GOLD}`, ml: 2 }}
                >
                    <PhoneIcon fontSize="small" />
                </IconButton>
            </Tooltip>
          </Stack>
        ) : (
          <IconButton 
            onClick={() => setDrawerOpen(true)} 
            sx={{ color: BRAND_GOLD }} 
            aria-label="open navigation menu"
          >
            <MenuIcon fontSize="large" />
          </IconButton>
        )}

        {/* MOBILE DRAWER */}
        <Drawer
          anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}
          sx={{ '& .MuiDrawer-paper': { width: '280px', backgroundColor: BRAND_DARK, color: BRAND_TEXT_LIGHT } }}
        >
          {/* Drawer Header */}
          <Box sx={{ p: 3, borderBottom: `1px solid ${getAlphaGold(0.2)}`, mb: 1 }}>
            <Typography variant="h6" sx={{ color: BRAND_GOLD, fontWeight: 800 }}>MENU</Typography>
          </Box>

          <List sx={{ px: 1 }}>
            {navLinks.map((item) => (
              <React.Fragment key={item.label}>
                {item.items ? (
                  <>
                    <ListItemButton 
                        onClick={() => setMobileOpenMenu(mobileOpenMenu === item.label ? '' : item.label)}
                        sx={{ borderRadius: '8px', mb: 0.5 }}
                    >
                      <ListItemText primary={item.label} primaryTypographyProps={{ sx: { fontWeight: 700 } }} />
                      {mobileOpenMenu === item.label ? <ExpandLess sx={{ color: BRAND_GOLD }} /> : <ExpandMore sx={{ color: BRAND_GOLD }} />}
                    </ListItemButton>
                    <Collapse in={mobileOpenMenu === item.label} timeout="auto">
                      <List disablePadding>
                        {item.items.map((subItem) => (
                          <ListItemButton 
                            key={subItem.to} 
                            component={RouterLink} 
                            to={subItem.to} 
                            onClick={() => setDrawerOpen(false)} 
                            sx={{ pl: 4, py: 1, borderLeft: location.pathname === subItem.to ? `3px solid ${BRAND_GOLD}` : 'none' }}
                          >
                            <ListItemText primary={subItem.label} primaryTypographyProps={{ sx: { color: location.pathname === subItem.to ? BRAND_GOLD : '#BBB', fontWeight: 600 } }} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <ListItemButton 
                    component={RouterLink} 
                    to={item.to} 
                    onClick={() => setDrawerOpen(false)}
                    sx={{ borderRadius: '8px', mb: 0.5, backgroundColor: location.pathname === item.to ? getAlphaGold(0.1) : 'transparent' }}
                  >
                    <ListItemText primary={item.label} primaryTypographyProps={{ sx: { fontWeight: 700, color: location.pathname === item.to ? BRAND_GOLD : '#FFF' } }} />
                  </ListItemButton>
                )}
              </React.Fragment>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};