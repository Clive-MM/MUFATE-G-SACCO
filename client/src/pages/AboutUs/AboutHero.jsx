import React from 'react';
import { Box } from '@mui/material';

const AboutHero = () => {
  const HERO_IMAGE = "https://res.cloudinary.com/djydkcx01/image/upload/v1752730090/IMG_9698_nwftoq.jpg";

  return (
    <Box 
      sx={{ 
        width: '100%', 
        // Generous height to allow the full team to be visible
        height: { xs: '500px', md: '90vh' }, 
        minHeight: { xs: '450px', md: '750px' },
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#02150F', 
        
        // Background Configuration
        backgroundImage: `url(${HERO_IMAGE})`,
        backgroundSize: 'cover', 
        /* 'center bottom' is the key here. It anchors the bottom of the 
           photo (the feet/grass) to the bottom of the container so 
           nothing is cut off at the lower side.
        */
        backgroundPosition: 'center bottom', 
        backgroundRepeat: 'no-repeat',
        
        display: 'flex',
        flexDirection: 'column',
        /* Adding top padding pushes the entire container's "visual start" 
           below your navbar so heads don't overlap with the menu.
        */
        pt: { xs: '80px', md: '120px' }, 
      }}
    >
      {/* Top Shadow Overlay: 
          Helps the white navbar text stay readable against the building background.
      */}
      <Box 
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '20%',
          background: 'linear-gradient(to bottom, rgba(2,21,15,0.8), transparent)',
          zIndex: 1
        }} 
      />

      {/* Bottom Gradient Overlay: 
          Kept subtle (15%) to blend into the next section without hiding the feet.
      */}
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