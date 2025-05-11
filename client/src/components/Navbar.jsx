import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Box, Button, Link, Stack } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#f8f6f2', boxShadow: 'none', color: 'black' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo */}
        <Box sx={{ flex: 1 }}>
          <img
            src="https://res.cloudinary.com/djydkcx01/image/upload/v1746061572/Mufate_Logo_jnnh7x.png"
            alt="Sacco Logo"
            style={{ height: '145px', objectFit: 'contain' }}
          />
        </Box>

        {/* Center Nav Links */}
        <Stack direction="row" spacing={2} sx={{ flex: 2, justifyContent: 'center' }}>
          <Link component={RouterLink} to="/" underline="none" color="inherit">Home</Link>
          <Link component={RouterLink} to="/about" underline="none" color="inherit">About Us</Link>
          <Link component={RouterLink} to="/products" underline="none" color="inherit">Products</Link>
          <Link component={RouterLink} to="/services" underline="none" color="inherit">Services</Link>
          <Link component={RouterLink} to="/resources" underline="none" color="inherit">Resources</Link>
          <Link component={RouterLink} to="/careers" underline="none" color="inherit">Careers</Link>
          <Link component={RouterLink} to="/membership" underline="none" color="inherit">Membership</Link>
          <Link component={RouterLink} to="/faqs" underline="none" color="inherit">FAQs</Link>
          <Link component={RouterLink} to="/news" underline="none" color="inherit">News</Link>
        </Stack>

        {/* Contact Button */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            component={RouterLink}
            to="/contact"
            variant="contained"
            sx={{
              backgroundColor: '#ccc',
              color: 'black',
              '&:hover': {
                backgroundColor: '#bbb',
              }
            }}
          >
            Contact us
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
