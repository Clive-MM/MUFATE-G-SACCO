import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import MembershipInfo from './MembershipInfo';
import JoiningInstructions from './JoiningInstructions';
import MembershipBenefits from './MembershipBenefits';
import Footer from '../../components/Footer';

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

          /* TEXT SHOULD OVERLAY ABOVE EVERYTHING */
          color: '#fff',

          /* DARK GREEN OVERLAY + GOLD GLOW */
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background:
              'linear-gradient(to right, rgba(1, 20, 7, 0.75), rgba(1,20,7,0.35), transparent)',
            zIndex: 1,
          },

          /* GOLDEN EDGE GLOW ON BOTTOM */
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '22%',
            background:
              'linear-gradient(to top, rgba(255,215,0,0.28), transparent)',
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
            maxWidth: { xs: '95%', md: '700px' },
            py: { xs: 4, md: 6 },
          }}
        >
          {/* ⭐ GOLD REBRANDED HEADING */}
          <Typography
            variant="h3"
            fontWeight={900}
            gutterBottom
            sx={{
              fontSize: { xs: '1.8rem', md: '2.8rem' },
              textTransform: 'uppercase',
              letterSpacing: '1px',
              lineHeight: 1.2,

              /* TRUE SACCO GOLD GRADIENT */
              background: 'linear-gradient(to right, #FFD700, #FFF4B2)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',

              /* SOFT GOLD GLOW */
              textShadow: '0px 0px 12px rgba(255,215,0,0.65)',
            }}
          >
            Join Us Today and Start Your Journey
          </Typography>

          {/* ⭐ REBRANDED SUBHEADING (Warm Soft Gold) */}
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              color: '#FFECA8', // very readable warm gold
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.65,
              maxWidth: '600px',
              mx: 'auto',

              /* Subtle shadow for readability */
              textShadow: '0px 0px 6px rgba(0,0,0,0.55)',
            }}
          >
            Empowering communities through savings, investment, and unity for a better tomorrow.
          </Typography>
        </Box>
      </Box>

      {/* Additional Sections */}
      <MembershipInfo />
      <JoiningInstructions />
      <MembershipBenefits />
      <Footer />
    </Box>
  );
};

export default Membership;
