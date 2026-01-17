import React, { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Box, Button, Link, Stack, Paper, IconButton,
  Typography, useTheme, useMediaQuery, Drawer, Collapse, List, ListItemButton, ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { motion } from 'framer-motion';

const BRAND_GOLD = '#EC9B14';
const BRAND_DARK = '#02150F';
const BRAND_TEXT_LIGHT = '#F4F4F4';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileOpenMenu, setMobileOpenMenu] = useState(''); // Tracks which sub-menu is open on mobile
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
    fontWeight: 'bold',
    px: 3, py: 1,
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
  };

  const sharedLinkStyles = (isActive) => ({
    fontWeight: isActive ? 'bold' : 500,
    color: BRAND_GOLD,
    textShadow: isActive ? '0 0 5px rgba(236, 155, 20, 0.6)' : 'none',
    transform: isActive ? 'scale(1.03)' : 'scale(1)',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': { color: BRAND_GOLD, transform: 'translateY(-3px) scale(1.05)' },
  });

  const NavDropdown = ({ label, items, isActive }) => (
    <Box sx={{ position: 'relative', '&:hover .dropdown-menu': { display: 'flex' } }}>
      <Link underline="none" sx={sharedLinkStyles(isActive)}>{label}</Link>
      <Box
        className="dropdown-menu"
        component={motion.div}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{
          position: 'absolute', top: '100%', left: 0, display: 'none', flexDirection: 'column',
          backgroundColor: BRAND_DARK, borderRadius: 1, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
          minWidth: 200, zIndex: 10, py: 1, border: `1px solid ${BRAND_GOLD}33`
        }}
      >
        {items.map((item) => (
          <Link key={item.to} component={RouterLink} to={item.to} underline="none"
            sx={{ px: 2, py: 1, textDecoration: 'none', color: BRAND_TEXT_LIGHT, '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.04)', color: BRAND_GOLD } }}>
            {item.label}
          </Link>
        ))}
      </Box>
    </Box>
  );

  return (
    <AppBar 
      position="fixed" // Changed to fixed to allow Hero to sit underneath
      elevation={0}    // Removed heavy shadow for better transparency look
      sx={{
        backgroundColor: 'rgba(2, 21, 15, 0.75)', // Transparent background
        backdropFilter: 'blur(10px)',
        backgroundImage: 'none', // Removes MUI's default Paper overlay
        borderBottom: '2px solid', 
        borderColor: BRAND_GOLD, 
        color: BRAND_TEXT_LIGHT,
        zIndex: theme.zIndex.appBar,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: { xs: 0.6, md: 1.4 }, minHeight: { xs: 90, md: 120 } }}>
        
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          <Link component={RouterLink} to="/" underline="none" sx={{ display: 'flex', alignItems: 'center', color: 'inherit' }}>
            <Box component="img" src="https://res.cloudinary.com/djydkcx01/image/upload/v1764080163/ChatGPT_Image_Nov_25_2025_05_15_43_PM_kt0vz9.png"
                 sx={{ height: isMobile ? 50 : 75, width: 'auto', objectFit: 'contain' }} />
            <Stack spacing={0.1} sx={{ ml: 1.5 }}>
              <Typography sx={{ fontSize: { xs: '0.8rem', md: '1.05rem' }, fontWeight: 700, color: BRAND_GOLD, textTransform: 'uppercase', letterSpacing: '0.16em', lineHeight: 1.1 }}>
                Golden Generation
              </Typography>
              <Typography sx={{ fontSize: { xs: '0.75rem', md: '0.95rem' }, fontWeight: 700, color: BRAND_GOLD, textTransform: 'uppercase', letterSpacing: '0.28em', lineHeight: 1.1 }}>
                DT SACCO
              </Typography>
              <Typography sx={{ display: { xs: 'none', sm: 'block' }, fontSize: { sm: '0.75rem', md: '0.9rem' }, fontWeight: 400, fontStyle: 'italic', color: BRAND_TEXT_LIGHT, lineHeight: 1.2 }}>
                Walking With You
              </Typography>
            </Stack>
          </Link>
        </Box>

        {!isMobile ? (
          <>
            <Stack direction="row" spacing={3} sx={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
              {navLinks.map((item) => {
                const isActive = location.pathname.startsWith(item.to) && (item.to !== '/' || location.pathname === '/');
                if (item.items) {
                    return <NavDropdown key={item.label} label={item.label} isActive={isActive} items={item.items} />;
                }
                return <Link key={item.to} component={RouterLink} to={item.to} underline="none" sx={sharedLinkStyles(isActive)}>{item.label}</Link>;
              })}
              <Button component={RouterLink} to="/customer_registration" sx={premiumButtonStyle}>Register Here</Button>
            </Stack>

            <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={handleContactClick} startIcon={<PhoneIcon />} sx={premiumButtonStyle}>Contact Us</Button>
            </Box>
          </>
        ) : (
          <IconButton onClick={() => setDrawerOpen(true)}><MenuIcon sx={{ color: BRAND_GOLD }} /></IconButton>
        )}

        <Drawer 
            anchor="left" 
            open={drawerOpen} 
            onClose={() => setDrawerOpen(false)} 
            sx={{ '& .MuiDrawer-paper': { width: '80%', padding: 2, backgroundColor: BRAND_DARK, color: BRAND_TEXT_LIGHT } }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, pb: 1, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
             <Box component="img" src="https://res.cloudinary.com/djydkcx01/image/upload/v1764080163/ChatGPT_Image_Nov_25_2025_05_15_43_PM_kt0vz9.png" sx={{ height: 40, mr: 1 }} />
             <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: BRAND_GOLD }}>GOLDEN GENERATION DT SACCO</Typography>
          </Box>
          
          <List sx={{ width: '100%', mb: 2 }}>
            {navLinks.map((item) => (
              <React.Fragment key={item.label}>
                {item.items ? (
                  <>
                    <ListItemButton onClick={() => handleMobileMenuToggle(item.label)} sx={{ py: 1, px: 0 }}>
                      <ListItemText primary={item.label} primaryTypographyProps={{ sx: { color: BRAND_TEXT_LIGHT, fontWeight: 500 } }} />
                      {mobileOpenMenu === item.label ? <ExpandLess sx={{ color: BRAND_GOLD }} /> : <ExpandMore sx={{ color: BRAND_GOLD }} />}
                    </ListItemButton>
                    <Collapse in={mobileOpenMenu === item.label} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {item.items.map((subItem) => (
                          <ListItemButton 
                            key={subItem.to} 
                            component={RouterLink} 
                            to={subItem.to} 
                            onClick={() => setDrawerOpen(false)}
                            sx={{ pl: 4, py: 1 }}
                          >
                            <ListItemText primary={subItem.label} primaryTypographyProps={{ sx: { color: BRAND_GOLD, fontSize: '0.9rem' } }} />
                          </ListItemButton>
                        ))}
                      </List>
                    </Collapse>
                  </>
                ) : (
                  <ListItemButton component={RouterLink} to={item.to} onClick={() => setDrawerOpen(false)} sx={{ py: 1, px: 0 }}>
                    <ListItemText primary={item.label} primaryTypographyProps={{ sx: { color: BRAND_TEXT_LIGHT, fontWeight: 500 } }} />
                  </ListItemButton>
                )                }
              </React.Fragment>
            ))}
          </List>

          <Stack spacing={2}>
            <Button component={RouterLink} to="/customer_registration" sx={premiumButtonStyle} fullWidth onClick={() => setDrawerOpen(false)}>Register Here</Button>
            <Button onClick={handleContactClick} startIcon={<PhoneIcon />} sx={premiumButtonStyle} fullWidth>Contact Us</Button>
          </Stack>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;