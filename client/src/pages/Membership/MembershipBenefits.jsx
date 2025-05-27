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
        backgroundColor: '#004144',
        color: '#fff',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
        px: 0,
        py: { xs: 4, md: 6 },
        gap: { xs: 4, md: 8 },
        maxWidth: '1600px', // prevents excessive stretch on ultra-wide screens
        mx: 'auto', // centers the section
        height: { xs: 'auto', md: '75vh' },
      }}
    >
      {/* Left - Flush Image Card */}
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          width: { xs: '100%', md: '45%' },
          height: {
            xs: '250px', // capped height for small screens
            md: 'calc(75vh - 96px)',
          },
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

      {/* Right - Text */}
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
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            textTransform: 'uppercase',
            fontSize: { xs: '1.4rem', md: '2rem' },
            mb: 1,
          }}
        >
          Membership Benefits
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {benefits.map((benefit, idx) => (
            <Typography
              key={idx}
              sx={{
                fontSize: { xs: '1rem', md: '1.1rem' },
                lineHeight: 1.6,
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
