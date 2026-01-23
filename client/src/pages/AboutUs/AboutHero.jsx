import React from 'react';
import { Box } from '@mui/material';

const AboutHero = () => {
  const HERO_IMAGE = "https://res.cloudinary.com/djydkcx01/image/upload/v1752730090/IMG_9698_nwftoq.jpg";

  return (
    <Box 
      sx={{ 
        width: '100%', 
        // Height is fixed on desktop but remains flexible on mobile
        height: { xs: '350px', md: '70vh' }, 
        minHeight: { xs: '300px', md: '500px' },
        position: 'relative',
        overflow: 'hidden',
        
        // Background Configuration
        backgroundImage: `url(${HERO_IMAGE})`,
        /* 'cover' ensures the image fills the entire container 
           without stretching the people. 
        */
        backgroundSize: 'cover', 
        /* 'top' or 'center' keeps the heads of the team 
           visible if the container gets too narrow. 
        */
        backgroundPosition: 'center 20%', 
        backgroundRepeat: 'no-repeat',
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#02150F', 
      }}
    >
      {/* Bottom Gradient Overlay for smooth transition */}
      <Box 
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '25%',
          background: 'linear-gradient(to bottom, transparent, #02150F)',
          zIndex: 1
        }} 
      />
    </Box>
  );
};

export default AboutHero;