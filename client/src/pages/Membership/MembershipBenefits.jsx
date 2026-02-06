import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

// --- UNIFIED BRAND TOKENS ---
const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.6)',
};

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
        // Updated to use your unified BRAND.dark color
        background: `linear-gradient(to bottom, ${BRAND.dark}, #03241A)`, 
        color: BRAND.light,
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
          // Added a subtle gold border to tie the image into the theme
          borderRight: { md: `1px solid ${BRAND.gold}33` } 
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
        {/* GOLDEN HEADING - Updated with BRAND.gold */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 900,
            textTransform: 'uppercase',
            fontSize: { xs: '1.4rem', md: '2rem' },
            mb: 1,
            background: `linear-gradient(to right, ${BRAND.gold}, #FFD38A)`,
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textShadow: `0px 0px 10px ${BRAND.gold}66`, // Matches registration glow
          }}
        >
          Membership Benefits
        </Typography>

        {/* BENEFITS LIST */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {benefits.map((benefit, idx) => (
            <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {/* Added a small gold bullet for extra brand alignment */}
              <Box sx={{ width: 6, height: 6, bgcolor: BRAND.gold, borderRadius: '50%' }} />
              <Typography
                sx={{
                  fontSize: { xs: '1rem', md: '1.15rem' },
                  lineHeight: 1.6,
                  color: BRAND.light,
                  opacity: 0.9,
                  textShadow: '0px 0px 4px rgba(0,0,0,0.4)',
                }}
              >
                {benefit}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default MembershipBenefits;