import React from 'react';
import { Box } from '@mui/material';

const AboutHero = () => {
  const HERO_IMAGE = "https://res.cloudinary.com/djydkcx01/image/upload/v1752730090/IMG_9698_nwftoq.jpg";

  return (
    <Box 
      sx={{ 
        width: '100%', 
        // We keep the height you requested
        height: { xs: '500px', md: '90vh' }, 
        minHeight: { xs: '450px', md: '750px' },
        position: 'relative',
        overflow: 'hidden',
        
        // Background Configuration
        backgroundImage: `url(${HERO_IMAGE})`,
        backgroundSize: 'cover', 
        /* Changing 'center center' to 'center 10%' ensures the 
          top of the image (the heads) stays within the top 
          section of the container.
        */
        backgroundPosition: 'center 10%', 
        backgroundRepeat: 'no-repeat',
        
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#02150F', 
        
        // Adds space so the faces don't start immediately under the navbar
        pt: { xs: '80px', md: '100px' }, 
      }}
    >
      {/* Overlay to slightly dim the top if the image 
         makes the navbar menu hard to read 
      */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '15%',
          background: 'linear-gradient(to bottom, rgba(2,21,15,0.7), transparent)',
          zIndex: 1
        }} 
      />

      {/* Bottom Gradient Overlay */}
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