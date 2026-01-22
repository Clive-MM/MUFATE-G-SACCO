import React from 'react';
import { Box } from '@mui/material';

const AboutHero = () => {
  const HERO_IMAGE = "https://res.cloudinary.com/djydkcx01/image/upload/v1752730090/IMG_9698_nwftoq.jpg";

  return (
    <Box 
      sx={{ 
        width: '100%', 
        // Height is fixed on desktop but remains flexible on mobile to prevent cropping
        height: { xs: 'auto', md: '80vh' }, 
        minHeight: { xs: '300px', md: '600px' },
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#02150F', // Deep green matches brand identity
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* 1. Blurred Background Layer - Occupies the "Whole Section" */}
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
          filter: 'blur(20px) brightness(0.3)', // Darkened for premium feel
          transform: 'scale(1.1)', // Prevents white edges from blur
          zIndex: 1,
        }}
      />

      {/* 2. Main Team Image - Fully Contained (No Cropping) */}
      <Box
        component="img"
        src={HERO_IMAGE}
        alt="Golden Generation DT Sacco Team"
        sx={{
          width: '100%',
          height: '100%',
          // Ensures the entire team is visible regardless of screen size
          objectFit: 'contain', 
          position: 'relative',
          zIndex: 2,
          display: 'block',
          // Adds a soft glow to separate image from blurred background
          boxShadow: '0 0 50px rgba(0,0,0,0.5)', 
        }}
      />

      {/* 3. Gradient Overlay - Smooth transition to next section */}
      <Box 
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '20%',
          background: 'linear-gradient(to bottom, transparent, #02150F)',
          zIndex: 3
        }} 
      />
    </Box>
  );
};

export default AboutHero;