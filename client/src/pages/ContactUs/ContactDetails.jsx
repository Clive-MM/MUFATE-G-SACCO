import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const ContactDetails = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #011407, #01240F)', // 🌑 Deep green brand background
        borderBottomLeftRadius: '18px',
        borderBottomRightRadius: '18px',
        px: { xs: 2, md: 8 },
        pt: { xs: 2, md: 4 },
        pb: { xs: 4, md: 6 },
        minHeight: '28vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        boxShadow: '0 0 22px rgba(255,215,0,0.25)', // Subtle gold glow
      }}
    >

      {/* 🌟 GOLD HEADING */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          textTransform: 'uppercase',
          fontSize: { xs: '1.6rem', md: '2.1rem' },
          mb: 2,
          background: 'linear-gradient(to right, #FFD700, #FFF4B5)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          textShadow: '0 0 10px rgba(255,215,0,0.35)',
        }}
      >
        Contact Us
      </Typography>

      {/* 🌟 Soft gold text */}
      <Typography
        variant="body1"
        sx={{
          color: '#FFF4B5',
          fontSize: { xs: '1rem', md: '1.15rem' },
          lineHeight: 1.8,
          textShadow: '0 0 8px rgba(0,0,0,0.6)',
        }}
      >
        Have a question, suggestion, or need support? Our team is ready to assist you
        with answers, guidance, and solutions. Call us on{' '}

        {/* Phone Numbers */}
        <Box component="span" sx={{ fontWeight: 'bold', color: '#FFD700' }}>
          +254791331932
        </Box>{' '}
        /{' '}
        <Box component="span" sx={{ fontWeight: 'bold', color: '#FFD700' }}>
          +254794515407
        </Box>{' '}

        {/* Email */}
        or write us an email at{' '}
        <Link
          href="mailto:info@mudetesacco.co.ke"
          underline="hover"
          sx={{
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #FFD700, #FFF4B5)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 0 8px rgba(255,215,0,0.35)',
          }}
        >
          info@mudetesacco.co.ke
        </Link>{' '}
        or interact with us on all social platforms.
      </Typography>
    </Box>
  );
};

export default ContactDetails;
