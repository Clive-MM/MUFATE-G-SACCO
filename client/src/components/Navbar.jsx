import React, { useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar, Toolbar, Box, Button, Link, Stack, IconButton,
  Typography, useTheme, useMediaQuery, Drawer,
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
  const navigate = useNavigate();

  const handleContactClick = (e) => {
    setDrawerOpen(false);
    if (location.pathname === '/contact') {
      const element = document.getElementById('contact-section');
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      navigate('/contact');
    }
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About Us' },
    { to: '/products', label: 'Products' },
    { to: '/services', label: 'Services' },
    { to: '/membership', label: 'Membership' },
    { to: '/media', label: 'Media' },
    { to: '/careers', label: 'Careers' },
  ];

  const premiumButtonStyle = {
    background: `linear-gradient(90deg, #04522F, #0B8A4A)`,
    color: BRAND_GOLD,
    fontWeight: 800,
    px: 3, py: 1,
    borderRadius: '12px',
    textTransform: 'uppercase',
    fontSize: '0.75rem',
    border: `1px solid ${BRAND_GOLD}44`,
    transition: '0.3s all ease',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: `0 8px 20px rgba(0,0,0,0.4)`,
      borderColor: BRAND_GOLD
    },
  };

  const sharedLinkStyles = (isActive) => ({
    fontWeight: 700,
    fontSize: '0.85rem',
    color: isActive ? BRAND_GOLD : BRAND_TEXT_LIGHT,
    textTransform: 'uppercase',
    letterSpacing: '1px',
    textDecoration: 'none',
    transition: '0.3s all ease',
    '&:hover': { color: BRAND_GOLD, transform: 'translateY(-2px)' },
  });

  const NavDropdown = ({ label, items, isActive }) => (
    <Box sx={{ position: 'relative', '&:hover .dropdown-menu': { display: 'flex' } }}>
      <Link underline="none" sx={sharedLinkStyles(isActive)}>{label}</Link>
      <Box
        className="dropdown-menu"
        sx={{
          position: 'absolute', top: '100%', left: '-20px', display: 'none', flexDirection: 'column',
          backgroundColor: 'rgba(2, 21, 15, 0.95)', backdropFilter: 'blur(10px)',
          borderRadius: '12px', minWidth: 180, zIndex: 100, py: 2, mt: 1,
          border: `1px solid ${BRAND_GOLD}33`, boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}
      >
        {items.map((item) => (
          <Link key={item.to} component={RouterLink} to={item.to} underline="none"
            sx={{ 
              px: 3, py: 1.2, color: BRAND_TEXT_LIGHT, fontSize: '0.8rem', fontWeight: 600,
              '&:hover': { backgroundColor: 'rgba(236, 155, 20, 0.1)', color: BRAND_GOLD } 
            }}>
            {item.label}
          </Link>
        ))}
      </Box>
    </Box>
  );

  return (
    <AppBar position="sticky" elevation={0} sx={{
      backgroundColor: 'transparent',
      backdropFilter: 'blur(12px)',
      borderBottom: `1px solid rgba(255,255,255,0.05)`,
      zIndex: theme.zIndex.appBar,
    }}>
      <Toolbar sx={{ justifyContent: 'space-between', py: 1, minHeight: { xs: 80, md: 100 } }}>
        
        {/* LOGO */}
        <Box sx={{ flex: 1 }}>
          <Link component={RouterLink} to="/" underline="none" sx={{ display: 'flex', alignItems: 'center' }}>
            <Box component="img" src="https://res.cloudinary.com/djydkcx01/image/upload/v1764080163/ChatGPT_Image_Nov_25_2025_05_15_43_PM_kt0vz9.png"
                 sx={{ height: { xs: 45, md: 65 }, width: 'auto' }} />
            <Box sx={{ ml: 1.5 }}>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 900, color: BRAND_GOLD, lineHeight: 1, letterSpacing: '1px' }}>GOLDEN GENERATION</Typography>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: BRAND_GOLD, letterSpacing: '2.5px' }}>DT SACCO</Typography>
            </Box>
          </Link>
        </Box>

        {/* DESKTOP MENU */}
        {!isMobile ? (
          <Stack direction="row" spacing={4} sx={{ flex: 2, justifyContent: 'center' }}>
            {navLinks.map((item) => {
              const isActive = location.pathname.startsWith(item.to);
              if (item.label === 'About Us') return <NavDropdown key="about" label="About Us" isActive={isActive} items={[{ to: '/about/who-we-are', label: 'Our Profile' }, { to: '/about/board-of-directors', label: 'The Board' }, { to: '/about/management', label: 'Management' }]} />;
              if (item.label === 'Products') return <NavDropdown key="products" label="Products" isActive={isActive} items={[{ to: '/products/fosa', label: 'FOSA Accounts' }, { to: '/products/bosa', label: 'BOSA Savings' }, { to: '/products/savings', label: 'Investment Plans' }]} />;
              if (item.label === 'Media') return <NavDropdown key="media" label="Media" isActive={isActive} items={[{ to: '/media/news', label: 'Latest News' }, { to: '/media/insights', label: 'Golden Insights' }, { to: '/media/gallery', label: 'Photo Gallery' }]} />;
              return <Link key={item.to} component={RouterLink} to={item.to} underline="none" sx={sharedLinkStyles(isActive)}>{item.label}</Link>;
            })}
          </Stack>
        ) : null}

        {/* ACTIONS */}
        <Stack direction="row" spacing={2} sx={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
          {!isMobile && <Button component={RouterLink} to="/customer_registration" sx={premiumButtonStyle}>Register</Button>}
          <Button onClick={handleContactClick} sx={{ ...premiumButtonStyle, background: BRAND_GOLD, color: BRAND_DARK }}>Contact</Button>
          {isMobile && <IconButton onClick={() => setDrawerOpen(true)}><MenuIcon sx={{ color: BRAND_GOLD }} /></IconButton>}
        </Stack>

        {/* MOBILE DRAWER */}
        <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} sx={{ '& .MuiDrawer-paper': { width: 280, backgroundColor: BRAND_DARK } }}>
          <Box sx={{ p: 3 }}>
             <Typography sx={{ color: BRAND_GOLD, fontWeight: 900, mb: 4 }}>MENU</Typography>
             <Stack spacing={3}>
               {navLinks.map(link => (
                 <Link key={link.to} component={RouterLink} to={link.to} onClick={() => setDrawerOpen(false)} sx={{ color: '#FFF', textDecoration: 'none', fontWeight: 600 }}>{link.label}</Link>
               ))}
               <Button component={RouterLink} to="/customer_registration" fullWidth sx={premiumButtonStyle}>Register Here</Button>
             </Stack>
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;