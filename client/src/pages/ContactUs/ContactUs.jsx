import React from 'react';
import { Box, Typography, Container, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import ContactDetails from './ContactDetails';

const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4'
};

const HERO_IMAGE =
  'https://res.cloudinary.com/djydkcx01/image/upload/v1755499112/ChatGPT_Image_Aug_18_2025_09_37_29_AM_qzkjzi.png';

const ContactUs = () => {
  const isMobile = useMediaQuery('(max-width:900px)');
  const isSmallPhone = useMediaQuery('(max-width:360px)');

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: '100vh',
        overflowX: 'hidden',
        scrollBehavior: 'smooth',

        /* 🌍 GLOBAL BACKGROUND IMAGE */
        backgroundImage: `url(${HERO_IMAGE})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: isMobile ? 'center top' : 'center',
        backgroundSize: isMobile ? 'contain' : 'cover',
        backgroundAttachment: isMobile ? 'scroll' : 'fixed'
      }}
    >
      {/* 🌑 BRAND TINT OVERLAY */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: `
            linear-gradient(
              to bottom,
              rgba(2,21,15,0.55) 0%,
              rgba(2,21,15,0.8) 55%,
              #02150F 100%
            )
          `
        }}
      />

      {/* ================= HERO CONTENT ================= */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          height: { xs: '60vh', sm: '65vh', md: '70vh' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="lg">
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Typography
              sx={{
                fontWeight: 900,
                textTransform: 'uppercase',
                fontSize: {
                  xs: isSmallPhone ? '1.8rem' : '2.5rem',
                  sm: '3.5rem',
                  md: '4.5rem'
                },
                color: BRAND.gold,
                letterSpacing: { xs: '0.1em', md: '0.25em' },
                mb: 2,
                filter: 'drop-shadow(0 15px 15px rgba(0,0,0,0.8))'
              }}
            >
              Get In Touch
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: '0.95rem', md: '1.2rem' },
                color: BRAND.light,
                maxWidth: '750px',
                mx: 'auto',
                px: 3,
                lineHeight: 1.8,
                opacity: 0.85,
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}
            >
              Your financial growth is our priority. Whether you have questions
              about membership or need technical support, our dedicated team is
              here to ensure your experience is seamless.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ================= FLOATING CONTENT ================= */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,

          /* 📱 MOBILE-OPTIMIZED OVERLAP */
          mt: {
            xs: -6,
            sm: -10,
            md: -18,
            lg: -22
          },
          pb: 10,
          px: { xs: 0, md: 2 }
        }}
      >
        <ContactDetails />
      </Box>

      {/* ================= FOOTER MARK ================= */}
      <Box sx={{ mt: 4, textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <Typography
          sx={{
            color: BRAND.gold,
            letterSpacing: '3px',
            fontWeight: 900,
            textTransform: 'uppercase',
            fontSize: '1.35rem'
          }}
        >
          GOLDEN GENERATION DT SACCO © {new Date().getFullYear()}
        </Typography>
      </Box>
    </Box>
  );
};

export default ContactUs;
