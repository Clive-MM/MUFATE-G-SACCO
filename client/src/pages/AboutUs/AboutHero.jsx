import React from 'react';
import { Box } from '@mui/material';

const AboutHero = () => {
  const HERO_IMAGE = "https://res.cloudinary.com/djydkcx01/image/upload/v1752730090/IMG_9698_nwftoq.jpg";

  return (
    <Box 
      sx={{ 
        width: '100%', 
        // Increased height from 70vh to 85vh to prevent aggressive bottom cropping
        height: { xs: '450px', md: '85vh' }, 
        // Increased min-height for better visibility on larger screens
        minHeight: { xs: '400px', md: '700px' },
        position: 'relative',
        overflow: 'hidden',
        
        // Background Configuration
        backgroundImage: `url(${HERO_IMAGE})`,
        backgroundSize: 'cover', 
        /* Changed to 'center center' to balance the crop between 
           the top (roof) and bottom (grass/feet) 
        */
        backgroundPosition: 'center center', 
        backgroundRepeat: 'no-repeat',
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#02150F', 
      }}
    >
      {/* Bottom Gradient Overlay 
         Reduced height to 15% so it doesn't cover the team's legs/feet 
      */}
      <Box 
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '15%',
          background: 'linear-gradient(to bottom, transparent, #02150F)',
          zIndex: 1
        }} 
      />
    </Box>
  );
};

export default AboutHero;