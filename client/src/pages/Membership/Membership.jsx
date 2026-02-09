import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import MembershipInfo from './MembershipInfo';
import JoiningInstructions from './JoiningInstructions';
import MembershipBenefits from './MembershipBenefits';
import Footer from '../../components/Footer';

// --- UNIFIED BRAND TOKENS (Synced with Footer) ---
const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.6)',
};

const Membership = () => {
  return (
    <Box>
      {/* HERO SECTION */}
      <Box
        role="banner"
        aria-label="Membership Hero Section"
        sx={{
          position: 'relative',
          backgroundImage: `url("https://res.cloudinary.com/djydkcx01/image/upload/v1748346596/ChatGPT_Image_May_27_2025_02_49_35_PM_dtvdqm.png")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: { xs: '60vh', md: '75vh' },
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 2, md: 10 },
          textAlign: 'center',
          color: BRAND.light,

          // DARK OVERLAY - Synced with BRAND.dark for seamless transition
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background:
              `linear-gradient(to right, rgba(2, 21, 15, 0.9), rgba(2, 21, 15, 0.5), transparent)`,
            zIndex: 1,
          },

          // GOLDEN BOTTOM FADE
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '22%',
            background:
              `linear-gradient(to top, ${BRAND.gold}33, transparent)`, // ~20% opacity gold
            zIndex: 1,
          },
        }}
      >
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          sx={{
            position: 'relative',
            zIndex: 2,
            maxWidth: { xs: '95%', md: '800px' },
            py: { xs: 4, md: 6 },
          }}
        >
          {/* HERO TITLE - Solid Brand Gold */}
          <Typography
            variant="h3"
            fontWeight={900}
            gutterBottom
            sx={{
              fontSize: { xs: '1.8rem', md: '3.2rem' },
              textTransform: 'uppercase',
              letterSpacing: '2px',
              lineHeight: 1.1,
              color: BRAND.gold,
              // Subtle glow to make text pop against dark overlay
              textShadow: `0px 4px 15px rgba(0,0,0,0.8)`, 
            }}
          >
            Join Us Today and Start Your Journey
          </Typography>

          {/* HERO SUBTEXT */}
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              color: BRAND.light, 
              opacity: 0.95,
              fontWeight: 500,
              fontSize: { xs: '1rem', md: '1.25rem' },
              lineHeight: 1.6,
              maxWidth: '650px',
              mx: 'auto',
              textShadow: '0px 2px 8px rgba(0,0,0,0.7)',
            }}
          >
            Empowering communities through savings, investment, and unity for a better tomorrow.
          </Typography>
        </Box>
      </Box>

      {/* SUBSEQUENT SECTIONS */}
      <MembershipInfo />
      <JoiningInstructions />
      <MembershipBenefits />
      <Footer />
    </Box>
  );
};

export default Membership;