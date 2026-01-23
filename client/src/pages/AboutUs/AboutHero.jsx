import React from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';

const AboutHero = () => {
  const HERO_IMAGE = "https://res.cloudinary.com/djydkcx01/image/upload/v1752730090/IMG_9698_nwftoq.jpg";

  return (
    <Box 
      sx={{ 
        width: '100%', 
        height: { xs: '80vh', md: '85vh' }, 
        minHeight: '600px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#02150F',
      }}
    >
      {/* 1. Background Image - Focused on faces for professional impact */}
      <Box 
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: 'cover',
          // Anchors to the top/center to ensure faces are the hero
          backgroundPosition: 'center 15%', 
          zIndex: 1,
        }} 
      />

      {/* 2. Professional Gradient Overlay (The "Kimisitu" Secret) */}
      <Box 
        sx={{
          position: 'absolute',
          inset: 0,
          background: {
            xs: 'rgba(2, 21, 15, 0.6)', // Darker on mobile for text readability
            md: 'linear-gradient(to right, #02150F 15%, rgba(2, 21, 15, 0.7) 40%, transparent 80%)'
          },
          zIndex: 2,
        }} 
      />

      {/* 3. Hero Content Section */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
        <Stack spacing={4} sx={{ maxWidth: { xs: '100%', md: '650px' } }}>
          
          <Typography 
            variant="h1" 
            sx={{ 
              color: '#fff', 
              fontWeight: 800, 
              fontSize: { xs: '2.8rem', md: '4.5rem' },
              lineHeight: 1.1,
              textShadow: '2px 2px 10px rgba(0,0,0,0.3)'
            }}
          >
            Championing Your <br />
            <span style={{ color: '#FFC107' }}>Financial Growth</span>
          </Typography>

          <Typography 
            variant="h5" 
            sx={{ color: 'rgba(255,255,255,0.9)', fontWeight: 300, lineHeight: 1.6 }}
          >
            Meet the leadership at Golden Generation DT Sacco, dedicated to 
            empowering our members through sustainable financial solutions.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button 
              variant="contained" 
              sx={{ 
                bgcolor: '#2E7D32', 
                color: '#fff', 
                px: 5, 
                py: 2, 
                fontSize: '1rem',
                borderRadius: '4px', // Squared like Kimisitu for corporate feel
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#1B5E20' }
              }}
            >
              OUR MISSION
            </Button>
            <Button 
              variant="outlined" 
              sx={{ 
                borderColor: '#fff', 
                color: '#fff', 
                px: 5, 
                borderWidth: 2,
                '&:hover': { borderWidth: 2, bgcolor: 'rgba(255,255,255,0.1)' }
              }}
            >
              JOIN US
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default AboutHero;