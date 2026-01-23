import React from 'react';
import { Box } from '@mui/material';

const AboutHero = () => {
  const HERO_IMAGE = "https://res.cloudinary.com/djydkcx01/image/upload/v1752730090/IMG_9698_nwftoq.jpg";

  return (
    <Box 
      sx={{ 
        width: '100%',
        position: 'relative',
        backgroundColor: '#02150F',
        overflow: 'hidden',
        
        // This 'aspectRatio' ensures the container is always the exact shape
        // of your photo. No more cropped feet or cut-off side people.
        aspectRatio: { 
          xs: '4/3', // Square-ish for mobile
          md: '16/7' // Wider for desktop
        },

        // Background Configuration
        backgroundImage: `url(${HERO_IMAGE})`,
        /* 'contain' ensures 100% of the image is always visible.
           If you prefer it to fill the screen edges, keep 'cover' 
           but the aspectRatio above will prevent the cropping.
        */
        backgroundSize: 'cover', 
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Top Navbar Protection Overlay */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100px',
          background: 'linear-gradient(to bottom, rgba(2,21,15,0.9), transparent)',
          zIndex: 1
        }} 
      />

      {/* Bottom Blend Overlay */}
      <Box 
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '15%',
          background: 'linear-gradient(to bottom, transparent, #02150F)',
          zIndex: 2
        }} 
      />
    </Box>
  );
};

export default AboutHero;