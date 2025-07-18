import React from 'react';
import { Box, Typography, Link } from '@mui/material';

const ContactDetails = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, rgba(54, 200, 46, 1), rgba(126, 228, 9, 1))',
        borderBottomLeftRadius: '16px',
        borderBottomRightRadius: '16px',
        px: { xs: 2, md: 8 },
        pt: { xs: 1, md: 2 }, // Reduced top padding
        pb: { xs: 2, md: 4 },
        mt: 0,
        minHeight: '25vh', // Reduced minimum height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Heading */}
      <Typography
        variant="h4"
        sx={{
          color: '#f1f4f5ff',
          fontWeight: 700,
          textTransform: 'uppercase',
          fontSize: { xs: '1.4rem', md: '2rem' },
          mb: 2,
        }}
      >
        Contact us
      </Typography>

      {/* Paragraph Content */}
      <Typography
        variant="body1"
        sx={{
          color: '#003B49',
          fontSize: { xs: '1rem', md: '1.1rem' },
          lineHeight: 1.7,
        }}
      >
        Have a question, suggestion, or need support? Reach out and our team will assist you shortly.
        Our team is ready to support you with answers, guidance, and solutions. Call us on{' '}
        <Box component="span" sx={{ fontWeight: 'bold', color: '#2c04f4ff' }}>
          +254791331932
        </Box>{' '}
        /{' '}
        <Box component="span" sx={{ fontWeight: 'bold', color: '#2c04f4ff' }}>
          +254794515407
        </Box>{' '}
        or write us an email at{' '}
        <Link
          href="mailto:info@mudetesacco.co.ke"
          underline="hover"
          sx={{ fontWeight: 'bold', color: '#2c04f4ff' }}
        >
          info@mudetesacco.co.ke
        </Link>{' '}
        or interact with us on all social platforms.
      </Typography>
    </Box>
  );
};

export default ContactDetails;
