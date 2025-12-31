import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ContactDetails from './ContactDetails';
import FeedbackForm from './FeedbackForm';

const BRAND_GOLD = '#EC9B14';
const BRAND_TEXT_LIGHT = '#F4F4F4';
const BRAND_DARK = '#02150F';

const ContactUs = () => {
  return (
    <Box sx={{ backgroundColor: BRAND_DARK, minHeight: '100vh' }}>
      {/* ===================== */}
      {/* HERO SECTION */}
      {/* ===================== */}
      <Box
        sx={{
          position: 'relative',
          height: {
            xs: '45vh',
            sm: '50vh',
            md: '55vh',
          },
          backgroundImage:
            'url(https://res.cloudinary.com/djydkcx01/image/upload/v1755499112/ChatGPT_Image_Aug_18_2025_09_37_29_AM_qzkjzi.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* DARK OVERLAY - Blends the image into the dark background */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to bottom, rgba(2,21,15,0.4), rgba(2,21,15,0.8), ${BRAND_DARK})`,
            zIndex: 1,
          }}
        />

        {/* HERO CONTENT */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          sx={{ position: 'relative', zIndex: 2, px: 2 }}
        >
          <Typography
            sx={{
              fontWeight: 900,
              textTransform: 'uppercase',
              fontSize: { xs: '2rem', md: '3.5rem' },
              color: BRAND_GOLD,
              letterSpacing: '0.1em',
              mb: 1,
              textShadow: '0 10px 30px rgba(0,0,0,0.5)',
            }}
          >
            Contact Us
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              color: BRAND_TEXT_LIGHT,
              maxWidth: '600px',
              mx: 'auto',
              opacity: 0.9,
            }}
          >
            We are here to help. Reach out to our team at any of our branches
            or connect with us online.
          </Typography>
        </Box>
      </Box>

      {/* ===================== */}
      {/* CONTACT DETAILS SECTION */}
      {/* ===================== */}
      <Box 
        sx={{ 
          position: 'relative',
          zIndex: 3,
          mt: -8, // Pulls the cards slightly into the hero fade for a modern look
          pb: 8
        }}
      >
        <ContactDetails />
      </Box>

      {/* ===================== */}
      {/* FEEDBACK SECTION */}
      {/* ===================== */}
      {/* <Box sx={{ py: 10, background: 'rgba(255,255,255,0.02)' }}>
        <FeedbackForm />
      </Box> */}
    </Box>
  );
};

export default ContactUs;