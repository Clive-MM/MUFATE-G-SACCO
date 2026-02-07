import React from 'react';
import {
  Box,
  Typography,
  Container,
  useMediaQuery,
  useTheme,
  IconButton // Added this
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess'; // Added this
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

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Box
      sx={{
        backgroundColor: BRAND.dark,
        minHeight: '100vh',
        position: 'relative',
        overflowX: 'hidden',
        backgroundImage: 'url(https://res.cloudinary.com/djydkcx01/image/upload/v1755499112/ChatGPT_Image_Aug_18_2025_09_37_29_AM_qzkjzi.png)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: { xs: 'contain', md: 'cover' },
        backgroundPosition: { xs: 'top center', md: 'center center' },
        backgroundAttachment: isMobile ? 'scroll' : 'fixed',
      }}
    >
      {/* Background Overlay */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          background: isMobile
            ? `linear-gradient(to bottom, rgba(2,21,15,0.4) 0%, ${BRAND.dark} 40%, ${BRAND.dark} 100%)`
            : `linear-gradient(to bottom, rgba(2,21,15,0.7) 0%, ${BRAND.dark} 100%)`,
          zIndex: 1,
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 2 }}>
        {/* Header Section */}
        <Box
          sx={{
            height: { xs: '40vh', md: '65vh' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            px: 2,
            pt: { xs: 5, md: 0 }
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
                  fontSize: { xs: isSmallPhone ? '2.2rem' : '2.8rem', sm: '4rem', md: '5rem' },
                  color: BRAND.gold,
                  letterSpacing: { xs: '0.05em', md: '0.15em' },
                  mb: 2,
                  lineHeight: 1.1,
                  filter: 'drop-shadow(0 10px 10px rgba(0,0,0,0.8))',
                }}
              >
                Get In {isMobile && <br />} Touch
              </Typography>

              <Typography
                sx={{
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  color: BRAND.light,
                  maxWidth: '700px',
                  mx: 'auto',
                  lineHeight: { xs: 1.6, md: 1.8 },
                  opacity: 0.95,
                  fontWeight: 500,
                  textShadow: '0 2px 10px rgba(0,0,0,0.8)',
                  px: { xs: 2, md: 0 }
                }}
              >
                Your financial growth is our priority. Whether you have questions
                about membership or need technical support, our team is here.
              </Typography>
            </Box>
          </Container>
        </Box>

        {/* Contact Details Section */}
        <Box sx={{
          mt: { xs: 2, md: -15 },
          pb: 10,
          px: { xs: 1, md: 0 }
        }}>
          <ContactDetails />
        </Box>

        {/* Footer Section with Back to Top */}
        <Box sx={{ py: 6, textAlign: 'center', position: 'relative', px: { xs: 2, md: 4 } }}>
          {/* Flex container to keep text centered while button is pushed far right */}
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>

            {/* TYPOGRAPHY GROUP */}
            <Box>
              <Typography
                sx={{
                  color: BRAND.gold,
                  letterSpacing: '3px',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  fontSize: { xs: '0.9rem', md: '1.35rem' }
                }}
              >
                GOLDEN GENERATION DT SACCO © {new Date().getFullYear()}
              </Typography>

              <Typography sx={{
                color: BRAND.gold,
                opacity: 0.85,
                fontSize: '0.85rem',
                fontWeight: 600,
                mt: 1,
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                All Rights Reserved
              </Typography>
            </Box>

            {/* BACK TO TOP ARROW - Positioned at far right */}
            <IconButton
              onClick={handleScrollToTop}
              component={motion.button}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
              sx={{
                position: 'absolute',
                right: 0, // Pushes it to the far right margin
                color: BRAND.gold,
                border: `2px solid ${BRAND.gold}`,
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(236, 155, 20, 0.1)',
                  boxShadow: `0 0 15px ${BRAND.gold}`,
                },
              }}
            >
              <ExpandLessIcon sx={{ fontSize: '2rem' }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ContactUs;