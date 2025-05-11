import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Link,
  Stack,
  Paper
} from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';

const Navbar = () => {
  return (
    <AppBar
      position="static"
      component={Paper}
      elevation={3}
      sx={{
        backgroundColor: '#f8f6f2',
        borderBottom: '3px solid #64dd17',
        color: '#222',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>

       
        <Box sx={{ flex: 1 }}>
  <Link
    component={RouterLink}
    to="/"
    sx={{ display: 'inline-block', borderRadius: '10px', overflow: 'hidden' }}
  >
    <img
      src="https://res.cloudinary.com/djydkcx01/image/upload/v1746061572/Mufate_Logo_jnnh7x.png"
      alt="Sacco Logo"
      style={{ height: '115px', objectFit: 'contain' }}
    />
  </Link>
</Box>


        
        <Stack
          direction="row"
          spacing={3}
          sx={{
            flex: 3,
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: 500,
          }}
        >
          {[
            { to: '/', label: 'Home' },
            { to: '/about', label: 'About Us' },
            { to: '/products', label: 'Products' },
            { to: '/services', label: 'Services' },
            { to: '/resources', label: 'Resources' },
            { to: '/careers', label: 'Careers' },
            { to: '/membership', label: 'Membership' },
            { to: '/faqs', label: 'FAQs' },
            { to: '/news', label: 'News' },
          ].map((item) => (
            <Link
              key={item.to}
              component={RouterLink}
              to={item.to}
              underline="none"
              color="inherit"
              sx={{
                transition: 'color 0.3s',
                '&:hover': {
                  color: '#64dd17',
                },
              }}
            >
              {item.label}
            </Link>
          ))}
        </Stack>

       
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            component={RouterLink}
            to="/contact"
            variant="contained"
            startIcon={<PhoneIcon />}
            sx={{
              backgroundColor: '#64dd17',
              color: '#fff',
              fontWeight: 'bold',
              px: 3,
              py: 1.2,
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: '#76ff03',
                boxShadow: '0 0 10px #76ff03',
              }
            }}
          >
            Contact Us
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
