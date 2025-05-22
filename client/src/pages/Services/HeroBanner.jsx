import React from 'react';
import { Box, Typography } from '@mui/material';

const HeroBanner = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        backgroundImage: `url("https://res.cloudinary.com/djydkcx01/image/upload/v1747941107/ChatGPT_Image_May_22_2025_10_11_23_PM_aoofyb.png")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: { xs: '60vh', md: '70vh' },
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: { xs: 'center', md: 'flex-end' }, // Push to right on desktop
        px: { xs: 2, md: 10 },
        color: '#fff',
        textAlign: { xs: 'center', md: 'left' },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to right, rgba(0,0,0,0.4), rgba(0,0,0,0))',
          zIndex: 1,
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          maxWidth: { xs: '90%', md: '450px' },
          pr: { md: 5 },
          py: 2,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={500}
          gutterBottom
          sx={{
            mb: 2,
            fontSize: { xs: '1.6rem', md: '2.2rem' },
          }}
        >
          Secure banking on the go
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: '0.95rem', md: '1rem' },
            lineHeight: 1.6,
          }}
        >
          With Mufate G’s mobile banking services, managing your finances has never been easier.
          Enjoy secure, 24/7 access to your account right from your phone —
          whether you're checking balances, transferring funds, or paying bills on the go.
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroBanner;
