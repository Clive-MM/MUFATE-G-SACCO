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
      {/* TEXT BLOCK */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        style={{ position: 'relative', zIndex: 2, maxWidth: '500px' }}
      >
        {/* MAIN HEADING - Solid Gold */}
        <Typography
          variant="h3"
          fontWeight={900}
          sx={{
            mb: 2,
            fontSize: { xs: '2rem', md: '3rem' }, // Slightly larger for impact
            lineHeight: 1.2,
            color: '#EC9B14', // Solid Brand Gold
            textTransform: 'uppercase', // Professional banking look
            letterSpacing: '1px',
            textShadow: '2px 2px 10px rgba(0,0,0,0.5)', // Adds depth against background
          }}
        >
          Secure Banking on the Go
        </Typography>

        {/* BODY TEXT - Solid Gold with Refined Weight */}
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '1rem', md: '1.15rem' }, // Increased size for readability
            fontWeight: 500, // Medium weight for better definition
            lineHeight: 1.8,
            color: '#EC9B14', // Solid Brand Gold
            letterSpacing: '0.4px',
            textShadow: '1px 1px 8px rgba(0,0,0,0.8)', // Stronger shadow for legibility
          }}
        >
          With **GOLDEN GENERATION DT SACCO’s** mobile banking services, managing your
          finances has never been easier. Enjoy secure, 24/7 access to your account
          right from your phone — whether you're checking balances, transferring
          funds, or paying bills on the go.
        </Typography>
      </motion.div>
    </Box>
  );
};

export default HeroBanner;
