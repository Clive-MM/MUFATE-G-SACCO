import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const HeroBanner = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: `url("https://res.cloudinary.com/djydkcx01/image/upload/v1747941107/ChatGPT_Image_May_22_2025_10_11_23_PM_aoofyb.png")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: { xs: '60vh', md: '75vh' },
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'center', md: 'flex-end' },
        px: { xs: 2, md: 10 },
        color: '#EC9B14', // Gold text
        textAlign: { xs: 'center', md: 'left' },
        overflow: 'hidden',

        /* Deep dark-green gradient overlay */
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background:
            'linear-gradient(to right, rgba(1,20,7,0.85), rgba(1,20,7,0.45), rgba(0,0,0,0))',
          zIndex: 1,
        },

        /* Subtle gold glow */
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          right: 0,
          width: '40%',
          height: '40%',
          background: 'radial-gradient(circle, rgba(255,215,0,0.15), transparent)',
          zIndex: 1,
        },
      }}
    >
      {/* TEXT BLOCK */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        style={{ position: 'relative', zIndex: 2, maxWidth: '450px' }}
      >
        <Typography
          variant="h3"
          fontWeight={900}
          sx={{
            mb: 2,
            fontSize: { xs: '1.8rem', md: '2.6rem' },
            lineHeight: 1.3,
            background: 'linear-gradient(to right, #FFD700, #FFF4B5)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 0 12px rgba(255,215,0,0.35)',
          }}
        >
          Secure Banking on the Go
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '0.95rem', md: '1.05rem' },
            lineHeight: 1.7,
            color: '#FFF4B5',
            textShadow: '0 0 10px rgba(0,0,0,0.7)',
          }}
        >
          With GOLDEN GENERATION DT SACCO’s mobile banking services, managing your 
          finances has never been easier. Enjoy secure, 24/7 access to your account 
          right from your phone — whether you're checking balances, transferring 
          funds, or paying bills on the go.
        </Typography>
      </motion.div>
    </Box>
  );
};

export default HeroBanner;
