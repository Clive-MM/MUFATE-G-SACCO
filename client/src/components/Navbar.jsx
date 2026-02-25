import React, { useState, useMemo, useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Box, Button, Link, Stack, IconButton,
  Typography, useTheme, useMediaQuery, Drawer, Collapse, List,
  ListItemButton, ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { motion, AnimatePresence } from 'framer-motion';


// --- CONSTANTS (Moved outside to prevent re-creation on every render) ---
const BRAND_GOLD = '#EC9B14';
const BRAND_DARK = '#02150F';
const BRAND_TEXT_LIGHT = '#F4F4F4';
const getAlphaGold = (alpha) => `rgba(236, 155, 20, ${alpha})`;

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileOpenMenu, setMobileOpenMenu] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();

  // Handle Scroll effect for performance & UX
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- OPTIMIZED STYLES ---
  const navLinks = [
    { to: '/', label: 'Home' },
    {
      label: 'About Us',
      to: '/about',
      items: [
        { to: '/about/who-we-are', label: 'Profile' },
        { to: '/about/board-of-directors', label: 'Board' },
        { to: '/about/management', label: 'Management' }
      ]
    },
    {
      label: 'Products',
      to: '/products',
      items: [
        { to: '/products/fosa', label: 'FOSA' },
        { to: '/products/bosa', label: 'BOSA' },
        { to: '/products/savings', label: 'Savings' },
        { to: '/products/loanCalculator', label: 'Loan Calculator' }
      ]
    },
    { to: '/services', label: 'Services' },
    { to: '/resources', label: 'Resources' },
    { to: '/careers', label: 'Careers' },
    { to: '/membership', label: 'Membership' },
    { to: '/faqs', label: 'FAQs' },
    {
      label: 'Media',
      to: '/media',
      items: [
        { to: '/media/blogs', label: 'News' },
        { to: '/media/gallery', label: 'Gallery' },
        { to: '/media/videos', label: 'Golden Insights' }
      ]
    },
  ];

  const premiumButtonStyle = {
    background: 'linear-gradient(to right, #04522F, #0B8A4A)',
    color: BRAND_GOLD,
    fontWeight: 800,
    px: 3, py: 1,
    borderRadius: '30px',
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    '&:hover': {
      background: 'linear-gradient(to right, #0B8A4A, #04522F)',
      transform: 'scale(1.05)',
    },
  };

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

  // --- HANDLERS ---
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

  const NavDropdown = ({ label, items, isActive }) => {
    const [isOpen, setIsOpen] = useState(false);
    const isChildActive = items.some(item => item.to === location.pathname);

    return (
      <Box 
        onMouseEnter={() => setIsOpen(true)} 
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        sx={{ position: 'relative' }}
      >
        <Link underline="none" sx={sharedLinkStyles(isActive || isChildActive)}>
          {label}
          <ExpandMore sx={{ fontSize: '1.1rem', transition: '0.3s', transform: isOpen ? 'rotate(180deg)' : 'none' }} />
        </Link>
        {/* Invisible Bridge to stabilize hover interaction */}
        <Box sx={{ position: 'absolute', top: '100%', left: 0, width: '100%', height: '15px' }} />
        <AnimatePresence>
          {isOpen && (
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
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
                    px: 3, py: 1.2, fontWeight: 600, fontSize: '0.85rem', color: location.pathname === item.to ? BRAND_GOLD : BRAND_TEXT_LIGHT,
                    backgroundColor: location.pathname === item.to ? getAlphaGold(0.1) : 'transparent',
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
      elevation={isScrolled ? 4 : 0} 
      sx={{ 
        background: isScrolled ? 'rgba(2, 21, 15, 0.98)' : 'rgba(2, 21, 15, 0.92)', 
        borderBottom: `1px solid ${getAlphaGold(0.2)}`, 
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: theme.zIndex.appBar 
      }}
    >
      <Toolbar 
        sx={{ 
          justifyContent: 'space-between', 
          transition: 'all 0.4s ease',
          py: isScrolled ? 0.2 : { xs: 0.6, md: 1 }, 
          px: { md: 4 }, 
          minHeight: isScrolled ? { xs: 70, md: 80 } : { xs: 80, md: 100 } 
        }}
      >

        {/* LOGO AREA */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link component={RouterLink} to="/" underline="none" sx={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
            <Box component="img" src="https://res.cloudinary.com/djydkcx01/image/upload/v1764080163/ChatGPT_Image_Nov_25_2025_05_15_43_PM_kt0vz9.png"
              sx={{ height: isMobile ? 55 : (isScrolled ? 65 : 75), transition: '0.4s ease', width: 'auto' }} />
            <Stack spacing={0} sx={{ ml: 1.5 }}>
              <Typography sx={{ fontSize: { xs: '0.75rem', md: '1rem' }, fontWeight: 900, color: BRAND_GOLD, textTransform: 'uppercase', lineHeight: 1.1 }}>Golden Generation</Typography>
              <Typography sx={{ fontSize: { xs: '0.75rem', md: '0.9rem' }, fontWeight: 900, color: BRAND_GOLD, textTransform: 'uppercase', lineHeight: 1.1 }}>DT SACCO</Typography>
              <Typography sx={{ display: { xs: 'none', sm: 'block' }, fontSize: { xs: '0.6rem', md: '0.85rem' }, fontWeight: 900, color: '#FFFFFF', textTransform: 'uppercase' }}>Walking With You</Typography>
            </Stack>
          </Link>
        </Box>

        {/* DESKTOP VIEW */}
        {!isMobile ? (
          <Stack direction="row" spacing={2.5} alignItems="center">
            {navLinks.map((item) => (
              item.items ? (
                <NavDropdown key={item.label} label={item.label} items={item.items} isActive={location.pathname.startsWith(item.to)} />
              ) : (
                <Link key={item.to} component={RouterLink} to={item.to} underline="none" sx={sharedLinkStyles(location.pathname === item.to)}>{item.label}</Link>
              )
            ))}
            <Button component={RouterLink} to="/customer_registration" sx={premiumButtonStyle}>Register</Button>

            <IconButton
              onClick={handleContactClick}
              aria-label="Contact support"
              component={motion.button}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              sx={{
                color: BRAND_GOLD,
                border: `2px solid ${BRAND_GOLD}`,
                ml: 1.5,
                '&:hover': { backgroundColor: getAlphaGold(0.1) }
              }}
            >
              <PhoneIcon fontSize="small" />
            </IconButton>
          </Stack>
        ) : (
          <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: BRAND_GOLD }} aria-label="open menu">
            <MenuIcon fontSize="large" />
          </IconButton>
        )}

        {/* MOBILE DRAWER */}
        <Drawer
          anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}
          sx={{ '& .MuiDrawer-paper': { width: '280px', backgroundColor: BRAND_DARK, color: BRAND_TEXT_LIGHT } }}
        >
          <Box sx={{ p: 3, borderBottom: `1px solid ${getAlphaGold(0.2)}`, mb: 2 }}>
            <Typography sx={{ color: BRAND_GOLD, fontWeight: 800, textTransform: 'uppercase' }}>Golden Generation</Typography>
          </Box>
          <List sx={{ px: 1.5 }}>
            {navLinks.map((item) => (
              <React.Fragment key={item.label}>
                {item.items ? (
                  <>
                    <ListItemButton 
                      onClick={() => setMobileOpenMenu(mobileOpenMenu === item.label ? '' : item.label)}
                      sx={{ borderRadius: '8px', mb: 0.5 }}
                    >
                      <ListItemText primary={item.label} primaryTypographyProps={{ sx: { fontWeight: 700, color: location.pathname.startsWith(item.to) ? BRAND_GOLD : '#FFF' } }} />
                      {mobileOpenMenu === item.label ? <ExpandLess sx={{ color: BRAND_GOLD }} /> : <ExpandMore sx={{ color: BRAND_GOLD }} />}
                    </ListItemButton>
                    <Collapse in={mobileOpenMenu === item.label} timeout="auto">
                      <List disablePadding>
                        {item.items.map((subItem) => (
                          <ListItemButton 
                            key={subItem.to} component={RouterLink} to={subItem.to} 
                            onClick={() => setDrawerOpen(false)} 
                            sx={{ 
                                pl: 4, 
                                mb: 0.5,
                                borderLeft: location.pathname === subItem.to ? `4px solid ${BRAND_GOLD}` : '4px solid transparent',
                                backgroundColor: location.pathname === subItem.to ? getAlphaGold(0.05) : 'transparent'
                            }}
                          >
                            <ListItemText primary={subItem.label} primaryTypographyProps={{ sx: { color: location.pathname === subItem.to ? BRAND_GOLD : '#BBB', fontWeight: 600 } }} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <ListItemButton 
                    component={RouterLink} to={item.to} 
                    onClick={() => setDrawerOpen(false)}
                    sx={{ 
                        borderRadius: '8px', 
                        mb: 0.5,
                        backgroundColor: location.pathname === item.to ? getAlphaGold(0.1) : 'transparent',
                        borderLeft: location.pathname === item.to ? `4px solid ${BRAND_GOLD}` : '4px solid transparent'
                    }}
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

export default Navbar;