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
        
        // This ensures the container height matches the image width perfectly.
        // No more "zooming in" that cuts off people on the sides or bottom.
        aspectRatio: { 
          xs: '4/3',  // Taller for mobile screens
          md: '2.4/1' // Maintains the wide team shot for desktop
        },

        // Background Configuration
        backgroundImage: `url(${HERO_IMAGE})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        
        // This padding prevents the navbar from physically overlapping the faces
        pt: { xs: '70px', md: '100px' } 
      }}
    >
      {/* 1. Navbar Overlay: 
          Darkens the top edge so the white menu text stays visible 
          without needing to hide the team's heads.
      */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '140px',
          background: 'linear-gradient(to bottom, rgba(2,21,15,0.95), transparent)',
          zIndex: 1
        }} 
      />

      {/* 2. Bottom Blend Overlay */}
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