import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import ContactDetails from './ContactDetails';

const BRAND_GOLD = '#EC9B14';
const BRAND_TEXT_LIGHT = '#F4F4F4';
const BRAND_DARK = '#02150F';

const ContactUs = () => {
  return (
    <Box sx={{ backgroundColor: BRAND_DARK, minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* HERO SECTION */}
      <Box
        sx={{
          position: 'relative',
          height: {
            xs: '50vh',   // Taller on mobile for better text clearance
            sm: '55vh',
            md: '60vh',
          },
          backgroundImage:
            'url(https://res.cloudinary.com/djydkcx01/image/upload/v1755499112/ChatGPT_Image_Aug_18_2025_09_37_29_AM_qzkjzi.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {/* GRADIENT OVERLAY */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to bottom, rgba(2,21,15,0.3), rgba(2,21,15,0.7) 70%, ${BRAND_DARK} 100%)`,
            zIndex: 1,
          }}
        />

        {/* HERO CONTENT */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Typography
              sx={{
                fontWeight: 900,
                textTransform: 'uppercase',
                fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem' },
                color: BRAND_GOLD,
                letterSpacing: { xs: '0.05em', md: '0.2em' },
                mb: 2,
                lineHeight: 1.1,
                textShadow: '0 10px 30px rgba(0,0,0,0.6)',
              }}
            >
              Get In Touch
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: '1rem', md: '1.25rem' },
                color: BRAND_TEXT_LIGHT,
                maxWidth: '700px',
                mx: 'auto',
                px: 2,
                lineHeight: 1.6,
                opacity: 0.9,
                fontWeight: 300,
              }}
            >
              Have a question or need assistance? Our team is ready to support you. 
              Reach out through our branches or send us a message below.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* MAIN CONTENT SECTION */}
      <Box 
        sx={{ 
          position: 'relative',
          zIndex: 3,
          // Negative margin pulls cards over the hero image fade
          mt: { xs: -5, sm: -8, md: -12 }, 
          pb: 10,
          px: { xs: 1, sm: 2, md: 0 } // Extra padding on very small screens
        }}
      >
        <ContactDetails />
      </Box>

    </Box>
  );
};

export default ContactUs;