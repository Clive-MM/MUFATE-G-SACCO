import React from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';

const AboutHero = () => {
  const HERO_IMAGE = "https://res.cloudinary.com/djydkcx01/image/upload/v1752730090/IMG_9698_nwftoq.jpg";

  return (
    <Box 
      sx={{ 
        width: '100%', 
        height: { xs: '70vh', md: '85vh' }, 
        minHeight: '500px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#02150F',
      }}
    >
      {/* 1. Background Image - Scaled for 'Bust-up' impact like Image 2 */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: 'cover',
          // Anchoring to top/center ensures we see the faces clearly
          backgroundPosition: 'center 15%', 
          zIndex: 1,
        }} 
      />

      {/* 2. Gradient Overlays for Text Readability */}
      <Box 
        sx={{
          position: 'absolute',
          inset: 0,
          // Darkens the left side to make white text pop (like Kimisitu)
          background: {
            xs: 'rgba(0,0,0,0.5)',
            md: 'linear-gradient(to right, rgba(2,21,15,0.9) 20%, rgba(2,21,15,0.2) 60%, transparent)'
          },
          zIndex: 2,
        }} 
      />

      {/* 3. Hero Content Section */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 3 }}>
        <Stack spacing={3} sx={{ maxWidth: { xs: '100%', md: '600px' } }}>
          
          <Typography 
            variant="h1" 
            sx={{ 
              color: '#fff', 
              fontWeight: 800, 
              fontSize: { xs: '2.5rem', md: '4rem' },
              lineHeight: 1.1 
            }}
          >
            Empowering Your <br />
            <span style={{ color: '#FFC107' }}>Golden Future</span>
          </Typography>

          <Typography 
            variant="body1" 
            sx={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', fontWeight: 400 }}
          >
            Meet the dedicated leadership team at Golden Generation DT Sacco, 
            working tirelessly to champion your financial independence.
          </Typography>

          <Box>
            <Button 
              variant="contained" 
              sx={{ 
                bgcolor: '#2E7D32', 
                color: '#fff', 
                px: 4, 
                py: 1.5, 
                fontSize: '1rem',
                borderRadius: '50px',
                fontWeight: 'bold',
                '&:hover': { bgcolor: '#1B5E20' }
              }}
            >
              LEARN MORE »
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default AboutHero;