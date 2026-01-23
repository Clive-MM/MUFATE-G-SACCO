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
        
        // SOLUTION: Set the container to match the image's natural shape.
        // This prevents the "zoom" that cuts off feet and heads.
        aspectRatio: { 
          xs: '4/3',   // Square-ish for mobile so people aren't tiny
          sm: '16/9',  // Standard widescreen for tablets
          md: '2.2/1'  // Cinematic wide for desktop
        },

        backgroundImage: `url(${HERO_IMAGE})`,
        backgroundSize: 'cover', 
        // We anchor to the top so faces are never lost under the navbar
        backgroundPosition: 'center top', 
        backgroundRepeat: 'no-repeat',
        
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* 1. TOP OVERLAY: Protects the Navbar visibility */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '120px',
          background: 'linear-gradient(to bottom, rgba(2,21,15,0.9), transparent)',
          zIndex: 1
        }} 
      />

      {/* 2. BOTTOM OVERLAY: Blends into the next section */}
      <Box 
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '20%',
          background: 'linear-gradient(to bottom, transparent, #02150F)',
          zIndex: 2
        }} 
      />
    </Box>
  );
};

export default AboutHero;