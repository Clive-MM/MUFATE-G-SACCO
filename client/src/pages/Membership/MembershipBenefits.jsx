import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const benefits = [
  'Secure and trusted savings platform.',
  'Access to affordable loans and affordable rates.',
  'Earn dividends on share capital.',
  'Welfare support and community benefits through benevolent funds.',
  'Financial training and empowerment.',
];

const MembershipBenefits = () => {
  return (
    <Box
      sx={{
        width: '100%',
        background: 'linear-gradient(to bottom, #011B0A, #012A12)', // DARK GREEN BRAND
        color: '#FFECA8',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        px: 0,
        py: { xs: 4, md: 6 },
        gap: { xs: 4, md: 8 },
        maxWidth: '1600px',
        mx: 'auto',
        height: { xs: 'auto', md: '75vh' },
      }}
    >
      {/* LEFT: IMAGE */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          width: { xs: '100%', md: '45%' },
          height: { xs: '250px', md: 'calc(75vh - 96px)' },
          ml: 0,
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src="https://res.cloudinary.com/djydkcx01/image/upload/v1748374069/ChatGPT_Image_May_27_2025_10_27_37_PM_quotxo.png"
          alt="Growing savings"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </Paper>

      {/* RIGHT: TEXT */}
      <Box
        sx={{
          flex: 1,
          px: { xs: 3, md: 6 },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        {/* GOLDEN HEADING */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            textTransform: 'uppercase',
            fontSize: { xs: '1.4rem', md: '2rem' },
            mb: 1,
            background: 'linear-gradient(to right, #FFD700, #FFF4B2)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textShadow: '0px 0px 10px rgba(255,215,0,0.4)',
          }}
        >
          Membership Benefits
        </Typography>

        {/* BENEFITS LIST */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {benefits.map((benefit, idx) => (
            <Typography
              key={idx}
              sx={{
                fontSize: { xs: '1rem', md: '1.15rem' },
                lineHeight: 1.6,
                color: '#FFECA8',
                textShadow: '0px 0px 4px rgba(0,0,0,0.4)',
              }}
            >
              {benefit}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MembershipBenefits;
