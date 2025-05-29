import React from 'react';
import { Box, Typography } from '@mui/material';

const ContactUs = () => {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          height: { xs: '40vh', md: '80vh' },
          position: 'relative',
          backgroundImage: 'url(https://res.cloudinary.com/djydkcx01/image/upload/v1748438814/ChatGPT_Image_May_28_2025_04_25_45_PM_vedkd0.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          px: { xs: 3, md: 8 },
          color: '#fff',
        }}
      >
        {/* Main Heading */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
            zIndex: 1,
          }}
        >
          Let’s Get In Touch
        </Typography>

        {/* Subtext */}
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            maxWidth: '600px',
            fontWeight: 'normal',
            textShadow: '1px 1px 6px rgba(0,0,0,0.4)',
            lineHeight: 1.6,
            fontStyle: 'italic',
            zIndex: 1,
          }}
        >
          Have any questions or need support? Our team is ready to help you with anything you need.
        </Typography>
      </Box>
    </>
  );
};

export default ContactUs;
