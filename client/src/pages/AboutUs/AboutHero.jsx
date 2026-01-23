import React from 'react';
import { Box } from '@mui/material';

const AboutHero = () => {
  const HERO_IMAGE = "https://res.cloudinary.com/djydkcx01/image/upload/v1752730090/IMG_9698_nwftoq.jpg";

  return (
    <Box 
      sx={{ 
        width: '100%',
        // Aspect ratio ensures the container keeps the shape of the photo 
        // to prevent cropping of the team members.
        aspectRatio: { xs: '16/9', md: '25/9' }, 
        minHeight: { xs: '300px', md: '500px' },
        position: 'relative',
        
        // Background Configuration
        backgroundImage: `url(${HERO_IMAGE})`,
        backgroundSize: '100% 100%', // Forces the image to occupy full width and height
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#02150F', 
      }}
    >
      {/* Bottom Gradient Overlay: 
        This is kept only to ensure a smooth visual blend into the 
        content section below the hero.
      */}
      <Box 
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '20%',
          background: 'linear-gradient(to bottom, transparent, #02150F)',
          zIndex: 1
        }} 
      />
    </Box>
  );
};

export default AboutHero;