import React from 'react';
import { Box } from '@mui/material';

const AboutHero = () => {
  const HERO_IMAGE = "https://res.cloudinary.com/djydkcx01/image/upload/v1752730090/IMG_9698_nwftoq.jpg";

  return (
    <Box 
      sx={{ 
        width: '100%', 
        // We use 'auto' or a fixed max-height to ensure the full image shows
        height: { xs: 'auto', md: '70vh' }, 
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#02150F', // Deep green base
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: { xs: '60px', md: '0' } // Adjust for navbar height if needed
      }}
    >
      {/* 1. Blurred Background Layer (Prevents empty bars) */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(15px) brightness(0.4)', // Heavily blurred and darkened
          opacity: 0.6,
          zIndex: 1,
        }}
      />

      {/* 2. The Main Image (Contained & Full) */}
      <Box
        component="img"
        src={HERO_IMAGE}
        alt="Golden Generation DT Sacco Team"
        sx={{
          width: '100%',
          height: '100%',
          maxHeight: { xs: '400px', md: '70vh' },
          objectFit: 'contain', // THE KEY FIX: Ensures full image is visible
          position: 'relative',
          zIndex: 2,
          display: 'block',
        }}
      />

      {/* 3. Subtle Bottom Gradient for transition to the next section */}
      <Box 
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '150px',
          background: 'linear-gradient(to bottom, transparent, rgba(2,21,15,1))',
          zIndex: 3
        }} 
      />
    </Box>
  );
};

export default AboutHero;