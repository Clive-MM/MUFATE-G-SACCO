import React from 'react';
import { Box, Typography, Container, useTheme, useMediaQuery } from '@mui/material';
import { motion } from 'framer-motion';
import ContactDetails from './ContactDetails';

// Centralized Brand Tokens (Sync this with your other components)
const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  glass: 'rgba(2, 21, 15, 0.8)'
};

const ContactUs = () => {
  const theme = useTheme();
  const isSmallPhone = useMediaQuery('(max-width:360px)');

  return (
    <Box
      sx={{
        backgroundColor: BRAND.dark,
        minHeight: '100vh',
        overflowX: 'hidden',
        // Smooth scroll for the whole page
        scrollBehavior: 'smooth'
      }}
    >

      {/* HERO SECTION WITH ENHANCED DEPTH */}
      <Box
        sx={{
          position: 'relative',
          height: {
            xs: '60vh',
            sm: '65vh',
            md: '70vh',
          },
          backgroundImage:
            'url(https://res.cloudinary.com/djydkcx01/image/upload/v1755499112/ChatGPT_Image_Aug_18_2025_09_37_29_AM_qzkjzi.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: { md: 'fixed' }, // Subtle Parallax effect for desktop
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
        }}
      >
        {/* MULTI-LAYER GRADIENT OVERLAY */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at center, rgba(2,21,15,0.4) 0%, ${BRAND.dark} 95%)`,
            zIndex: 1,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to bottom, transparent 50%, ${BRAND.dark} 100%)`,
            zIndex: 1,
          }}
        />

        {/* HERO CONTENT */}
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
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
                lineHeight: 1,
                // Refined shadow for premium feel
                filter: 'drop-shadow(0 15px 15px rgba(0,0,0,0.8))',
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
                fontWeight: 400,
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}
            >
              Your financial growth is our priority. Whether you have questions about
              membership or need technical support, our dedicated team is here
              to ensure your experience is seamless.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* MAIN CONTENT SECTION */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 3,
          // Fluid overlap logic
          mt: {
            xs: -8,
            sm: -12,
            md: -18,
            lg: -22
          },
          pb: 10,

          px: { xs: 0, md: 2 }
        }}
      >
        <ContactDetails />
      </Box>

      {/* FOOTER CONFIDENCE MARK (Optional) */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography
          variant="caption"
          sx={{
            color: BRAND.gold,
            letterSpacing: '3px',
            fontWeight: 900,
            textTransform: 'uppercase',
            fontSize: '1.1rem', // This line increases the font height/size
            display: 'block'    // Ensures the size applies correctly if variant defaults to inline
          }}
        >
          GOLDEN GENERATION DT SACCO © {new Date().getFullYear()}
        </Typography>
      </Box>

    </Box>
  );
};

export default ContactUs;