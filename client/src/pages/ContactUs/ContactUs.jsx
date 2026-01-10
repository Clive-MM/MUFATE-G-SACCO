import React from 'react';
import { Box, Typography, Container, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import ContactDetails from './ContactDetails';

const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
};

const ContactUs = () => {
  const isSmallPhone = useMediaQuery('(max-width:360px)');
  const isMobile = useMediaQuery('(max-width:900px)');

  return (
    <Box
      sx={{
        backgroundColor: BRAND.dark,
        minHeight: '100vh',
        position: 'relative',
        // STEP 1: Global Background Image
        backgroundImage: 'url(https://res.cloudinary.com/djydkcx01/image/upload/v1755499112/ChatGPT_Image_Aug_18_2025_09_37_29_AM_qzkjzi.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // STEP 9: Mobile Friendliness - Disable fixed background on mobile for better performance
        backgroundAttachment: isMobile ? 'scroll' : 'fixed',
        overflowX: 'hidden',
      }}
    >
      {/* STEP 2: Global Dark Overlay for Brand Dominance */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          background: `linear-gradient(to bottom, rgba(2,21,15,0.7) 0%, ${BRAND.dark} 100%)`,
          zIndex: 1,
        }}
      />

      {/* STEP 4: Z-Index Layering (Content sits on Layer 2) */}
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        
        {/* STEP 3: Transparent Hero Section */}
        <Box
          sx={{
            height: { xs: '50vh', md: '65vh' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            px: 2
          }}
        >
          <Container maxWidth="lg">
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <Typography
                sx={{
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  fontSize: { xs: isSmallPhone ? '2rem' : '2.8rem', sm: '4rem', md: '5rem' },
                  color: BRAND.gold,
                  letterSpacing: '0.15em',
                  mb: 2,
                  filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.8))',
                }}
              >
                Get In Touch
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  color: BRAND.light,
                  maxWidth: '700px',
                  mx: 'auto',
                  lineHeight: 1.8,
                  opacity: 0.9,
                  textShadow: '0 2px 10px rgba(0,0,0,0.8)'
                }}
              >
                Your financial growth is our priority. Whether you have questions 
                about membership or need technical support, our team is here.
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* STEP 5: Natural Overlap */}
        <Box sx={{ mt: { xs: -5, md: -15 }, pb: 10 }}>
          <ContactDetails />
        </Box>

        {/* FOOTER */}
        <Box sx={{ py: 6, textAlign: 'center' }}>
          <Typography
            sx={{
              color: BRAND.gold,
              letterSpacing: '3px',
              fontWeight: 900,
              textTransform: 'uppercase',
              fontSize: { xs: '1rem', md: '1.35rem' }
            }}
          >
            GOLDEN GENERATION DT SACCO © {new Date().getFullYear()}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUs;