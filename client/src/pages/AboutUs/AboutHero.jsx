import React from 'react';
import { Box } from '@mui/material';

const AboutHero = () => {
  return (
    <Box 
      sx={{ 
        width: '100%', 
        height: { xs: '50vh', sm: '60vh', md: '75vh' }, 
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#02150F'
      }}
    >
      <Box
        component="img"
        src="https://res.cloudinary.com/djydkcx01/image/upload/v1752730090/IMG_9698_nwftoq.jpg"
        alt="Golden Generation DT Sacco Team"
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover', 
          objectPosition: { xs: 'center 15%', md: 'center 25%' }, // Prevents cropping heads
          display: 'block',
        }}
      />
      {/* Aesthetic Overlay */}
      <Box 
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(2,21,15,0.2) 0%, rgba(2,21,15,0.8) 100%)'
        }} 
      />
    </Box>
  );
};

export default AboutHero;