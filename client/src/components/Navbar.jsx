import React, { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Box, Button, Link, Stack, IconButton,
  Typography, useTheme, useMediaQuery, Drawer, Collapse, List,
  ListItemButton, ListItemText, Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { motion, AnimatePresence } from 'framer-motion';
import { tooltipClasses } from '@mui/material/Tooltip';
const BRAND_GOLD = '#EC9B14';
const BRAND_DARK = '#02150F';
const BRAND_TEXT_LIGHT = '#F4F4F4';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileOpenMenu, setMobileOpenMenu] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleMobileMenuToggle = (label) => {
    setMobileOpenMenu(mobileOpenMenu === label ? '' : label);
  };

  // Add this constant for custom tooltip styling
  const tooltipStyles = {
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: BRAND_DARK,
      color: BRAND_GOLD,
      border: `1px solid ${BRAND_GOLD}`,
      fontSize: '0.75rem',
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '1px',
      padding: '8px 12px',
      boxShadow: '0px 4px 15px rgba(236, 155, 20, 0.4)',
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: BRAND_DARK,
      '&:before': {
        border: `1px solid ${BRAND_GOLD}`,
      },
    },
  };

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
        { to: '/products/savings', label: 'Savings' }
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

  const sharedLinkStyles = (isActive) => ({
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
    '&:hover': {
      color: '#FFF',
      transform: 'translateY(-1px)',
    },
  });

  const NavDropdown = ({ label, items, isActive }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Box
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        sx={{ position: 'relative' }}
      >
        <Link underline="none" sx={sharedLinkStyles(isActive)}>
          {label}
          <ExpandMore sx={{ fontSize: '1.1rem', transition: '0.3s', transform: isOpen ? 'rotate(180deg)' : 'none' }} />
        </Link>

        <Box sx={{ position: 'absolute', top: '100%', left: 0, width: '100%', height: '15px' }} />

        <AnimatePresence>
          {isOpen && (
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              sx={{
                position: 'absolute',
                top: 'calc(100% + 5px)',
                left: '-10px',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'rgba(2, 21, 15, 0.98)',
                backdropFilter: 'blur(12px)',
                borderRadius: '12px',
                boxShadow: '0px 15px 35px rgba(0, 0, 0, 0.6)',
                minWidth: 220,
                zIndex: 100,
                py: 1.5,
                border: `1px solid rgba(236, 155, 20, 0.3)`,
              }}
            >
              {items.map((item) => (
                <Link
                  key={item.to}
                  component={RouterLink}
                  to={item.to}
                  underline="none"
                  sx={{
                    px: 3, py: 1.2, fontWeight: 600, fontSize: '0.85rem', color: BRAND_TEXT_LIGHT,
                    transition: '0.2s',
                    '&:hover': { backgroundColor: 'rgba(236, 155, 20, 0.15)', color: BRAND_GOLD, pl: 3.5 }
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
        // Less transparent background
        background: 'rgba(2, 21, 15, 0.96)',
        backgroundImage: 'none',
        // Golden generation shadow brand color
        boxShadow: `0 4px 20px rgba(236, 155, 20, 0.15)`,
        borderBottom: `1px solid rgba(236, 155, 20, 0.2)`,
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: { xs: 0.6, md: 1 }, px: { md: 4 }, minHeight: { xs: 80, md: 100 } }}>

        {/* LOGO AREA */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Link component={RouterLink} to="/" underline="none" sx={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
            <Box component="img" src="https://res.cloudinary.com/djydkcx01/image/upload/v1764080163/ChatGPT_Image_Nov_25_2025_05_15_43_PM_kt0vz9.png"
              sx={{ height: isMobile ? 55 : 75, width: 'auto', filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))' }} />
            <Stack spacing={0} sx={{ ml: 1.5 }}>
              <Typography sx={{ fontSize: { xs: '0.8rem', md: '1rem' }, fontWeight: 900, color: BRAND_GOLD, textTransform: 'uppercase', letterSpacing: '0.1em', lineHeight: 1.1 }}>
                Golden Generation
              </Typography>
              <Typography sx={{ fontSize: { xs: '0.8rem', md: '0.9rem' }, fontWeight: 900, color: BRAND_GOLD, textTransform: 'uppercase', letterSpacing: '0.2em', lineHeight: 1.1 }}>
                DT SACCO
              </Typography>
              <Typography sx={{ display: { xs: 'none', sm: 'block' }, fontSize: { sm: '0.7rem', md: '0.8rem' }, fontWeight: 600, fontStyle: 'italic', color: '#FFF', opacity: 0.9 }}>
                Walking With You
              </Typography>
            </Stack>
          </Link>
        </Box>

        {!isMobile ? (
          // Added ml: 4 to push links slightly to the right
          <Stack direction="row" spacing={2.5} alignItems="center" sx={{ ml: 4 }}>
            {navLinks.map((item) => (
              item.items ? (
                <NavDropdown key={item.label} label={item.label} items={item.items} isActive={location.pathname.startsWith(item.to)} />
              ) : (
                <Link key={item.to} component={RouterLink} to={item.to} underline="none" sx={sharedLinkStyles(location.pathname === item.to)}>
                  {item.label}
                </Link>
              )
            ))}
            <Button component={RouterLink} to="/customer_registration" sx={premiumButtonStyle}>Register</Button>

            {/* Contact Icon with Hover Tooltip */}
            <Tooltip
              title="Contact Us"
              arrow
              placement="bottom"
              sx={tooltipStyles} // Applies the golden theme to the popup
            >
              <IconButton
                onClick={handleContactClick}
                sx={{
                  color: BRAND_GOLD,
                  border: `2px solid ${BRAND_GOLD}`,
                  ml: 2,
                  position: 'relative',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  backgroundColor: 'rgba(236, 155, 20, 0.05)',
                  // Subtle pulse effect
                  boxShadow: '0 0 0 0 rgba(236, 155, 20, 0.4)',

                  '&:hover': {
                    backgroundColor: BRAND_GOLD,
                    color: BRAND_DARK,
                    transform: 'scale(1.1) rotate(15deg)',
                    boxShadow: `0 0 20px 5px rgba(236, 155, 20, 0.3)`, // Golden Glow
                  },
                  '&:active': {
                    transform: 'scale(0.95)',
                  }
                }}
              >
                <PhoneIcon sx={{ fontSize: '1.3rem' }} />
              </IconButton>
            </Tooltip>
          </Stack>
        ) : (
          <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: BRAND_GOLD }}><MenuIcon fontSize="large" /></IconButton>
        )}

        {/* MOBILE DRAWER (Layout preserved) */}
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          sx={{ '& .MuiDrawer-paper': { width: '85%', backgroundColor: BRAND_DARK, color: BRAND_TEXT_LIGHT } }}
        >
          <Box sx={{ p: 3, borderBottom: `1px solid rgba(236, 155, 20, 0.2)`, mb: 2 }}>
            <Typography sx={{ color: BRAND_GOLD, fontWeight: 800, textTransform: 'uppercase' }}>Golden Generation DT Sacco</Typography>
          </Box>
          <List sx={{ px: 2 }}>
            {navLinks.map((item) => (
              <React.Fragment key={item.label}>
                {item.items ? (
                  <>
                    <ListItemButton onClick={() => handleMobileMenuToggle(item.label)}>
                      <ListItemText primary={item.label} primaryTypographyProps={{ sx: { fontWeight: 700, color: '#FFF' } }} />
                      {mobileOpenMenu === item.label ? <ExpandLess sx={{ color: BRAND_GOLD }} /> : <ExpandMore sx={{ color: BRAND_GOLD }} />}
                    </ListItemButton>
                    <Collapse in={mobileOpenMenu === item.label} timeout="auto">
                      <List disablePadding>
                        {item.items.map((subItem) => (
                          <ListItemButton key={subItem.to} component={RouterLink} to={subItem.to} onClick={() => setDrawerOpen(false)} sx={{ pl: 4 }}>
                            <ListItemText primary={subItem.label} primaryTypographyProps={{ sx: { color: BRAND_GOLD, fontWeight: 600 } }} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <ListItemButton component={RouterLink} to={item.to} onClick={() => setDrawerOpen(false)}>
                    <ListItemText primary={item.label} primaryTypographyProps={{ sx: { fontWeight: 700, color: '#FFF' } }} />
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