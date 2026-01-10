import React from 'react';
import { Box, Typography, Container, useMediaQuery, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import ContactDetails from './ContactDetails';

const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
};

const ContactUs = () => {
  const theme = useTheme();
  const isSmallPhone = useMediaQuery('(max-width:360px)');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        backgroundColor: BRAND.dark,
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
        // --- RESPONSIVE BACKGROUND LOGIC ---
        backgroundImage: 'url(https://res.cloudinary.com/djydkcx01/image/upload/v1755499112/ChatGPT_Image_Aug_18_2025_09_37_29_AM_qzkjzi.png)',
        backgroundRepeat: 'no-repeat',
        /* FIX: On Laptop (md), use 'cover' and 'fixed'.
           On Mobile (xs), use 'contain' so the image isn't zoomed, 
           or '100% auto' to fit the width perfectly.
        */
        backgroundSize: { xs: 'contain', md: 'cover' },
        backgroundPosition: { xs: 'top center', md: 'center center' },
        backgroundAttachment: { xs: 'scroll', md: 'fixed' },
      }}
    >
      {/* Dark Overlay: Made lighter at the top for mobile to see the image clearly */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: isMobile 
            ? `linear-gradient(to bottom, rgba(2,21,15,0.4) 0%, ${BRAND.dark} 40%, ${BRAND.dark} 100%)`
            : `linear-gradient(to bottom, rgba(2,21,15,0.7) 0%, ${BRAND.dark} 100%)`,
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 2 }}>
        
        {/* Transparent Hero Section */}
        <Box
          sx={{
            // Reduced height on mobile to keep the text closer to the smaller image
            height: { xs: '40vh', md: '65vh' }, 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            px: 2,
            pt: { xs: 8, md: 0 }
          }}
        >
          <Container maxWidth="lg">
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                sx={{
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  fontSize: { xs: isSmallPhone ? '1.8rem' : '2.4rem', sm: '3.5rem', md: '5rem' },
                  color: BRAND.gold,
                  letterSpacing: { xs: '0.02em', md: '0.15em' },
                  mb: 1,
                  lineHeight: 1.1,
                  filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.9))',
                }}
              >
                Get In {isMobile && <br />} Touch
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: '0.9rem', md: '1.25rem' },
                  color: BRAND.light,
                  maxWidth: '600px',
                  mx: 'auto',
                  lineHeight: 1.5,
                  opacity: 0.9,
                  fontWeight: 500,
                  textShadow: '0 2px 8px rgba(0,0,0,1)',
                }}
              >
                Your financial growth is our priority.
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* Contact Details Section */}
        <Box sx={{ 
          // Pull cards up slightly, but not so much that they hide the mobile image
          mt: { xs: 2, md: -15 }, 
          pb: 10,
          px: { xs: 0, md: 0 } 
        }}>
          <ContactDetails />
        </Box>

        {/* FOOTER */}
        <Box sx={{ pb: 6, textAlign: 'center' }}>
          <Typography
            sx={{
              color: BRAND.gold,
              letterSpacing: '2px',
              fontWeight: 800,
              textTransform: 'uppercase',
              fontSize: { xs: '0.8rem', md: '1.2rem' },
              opacity: 0.8
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