import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const ContactDetails = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #011407, #01240F)', // Deep green brand background
        borderBottomLeftRadius: '18px',
        borderBottomRightRadius: '18px',
        px: { xs: 2, sm: 3, md: 8 },
        pt: { xs: 2, sm: 3, md: 4 },
        pb: { xs: 4, sm: 5, md: 6 },
        minHeight: { xs: '32vh', sm: '28vh', md: '26vh' }, // Adjust height for all devices
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        boxShadow: '0 0 22px rgba(255,215,0,0.25)', // Gold glow
      }}
    >

      {/* 🌟 GOLD HEADING */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: 900,
          textTransform: 'uppercase',
          fontSize: { xs: '1.5rem', sm: '1.7rem', md: '2.1rem' },
          mb: 2,
          background: 'linear-gradient(to right, #FFD700, #FFF4B5)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          textShadow: '0 0 10px rgba(255,215,0,0.35)',
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        Contact Us
      </Typography>

      {/* 🌟 Paragraph Text */}
      <Typography
        variant="body1"
        sx={{
          color: '#FFF4B5',
          fontSize: { xs: '0.95rem', sm: '1rem', md: '1.15rem' },
          lineHeight: 1.8,
          textShadow: '0 0 8px rgba(0,0,0,0.6)',
          textAlign: { xs: 'center', md: 'left' },
          px: { xs: 1, md: 0 },
        }}
      >
        Have a question, suggestion, or need support?
        Our team is ready to assist you with answers, guidance, and solutions.
        Call us on{' '}

        
        <Box
          component="span"
          sx={{
            fontWeight: 'bold',
            color: '#FFD700',
            mx: 0.5,
          }}
        >
          +254791331932
        </Box>
        /
        <Box
          component="span"
          sx={{
            fontWeight: 'bold',
            color: '#FFD700',
            mx: 0.5,
          }}
        >
          +254794515407
        </Box>

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
