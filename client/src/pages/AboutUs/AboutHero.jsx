import React from 'react';
import { Box } from '@mui/material';

const AboutHero = () => {
  const HERO_IMAGE =
    "https://res.cloudinary.com/djydkcx01/image/upload/v1752730090/IMG_9698_nwftoq.jpg";

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#02150F',

        // ✅ Control hero height responsively (better than aspectRatio for full image)
        minHeight: { xs: '240px', sm: '320px', md: '480px', lg: '520px' },

        // ✅ FULL IMAGE WITHOUT CROPPING
        backgroundImage: `url(${HERO_IMAGE})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain', // ✅ THIS IS THE KEY FIX

        // ✅ improves quality & smoothness
        imageRendering: 'auto',
      }}
    >
      {/* ✅ Top dark overlay for navbar visibility */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: { xs: '90px', md: '140px' },
          background: 'linear-gradient(to bottom, rgba(2,21,15,0.95), transparent)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ✅ Bottom blend overlay */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '18%',
          background: 'linear-gradient(to top, rgba(2,21,15,1), transparent)',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
};

export default AboutHero;
