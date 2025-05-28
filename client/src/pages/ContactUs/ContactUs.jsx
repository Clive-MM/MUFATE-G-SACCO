import React from 'react';
import { Box, Typography } from '@mui/material';

const ContactUs = () => {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          height: { xs: '40vh', md: '50vh' }, // 👈 reduced height
          backgroundImage: 'url(https://res.cloudinary.com/djydkcx01/image/upload/v1748438814/ChatGPT_Image_May_28_2025_04_25_45_PM_vedkd0.png)',
          backgroundSize: 'contain', // 👈 no cropping
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left center', // 👈 image anchored to left
          backgroundColor: '#000', // fallback fill
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          textAlign: 'left',
          color: '#fff',
          px: { xs: 3, md: 8 },
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
            }}
          >
            Let’s Get In Touch
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default ContactUs;
