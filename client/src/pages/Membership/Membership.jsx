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
              'linear-gradient(to right, rgba(1, 20, 7, 0.75), rgba(1,20,7,0.3), transparent)',
            zIndex: 1,
          },

          /* GOLDEN EDGE GLOW ON TOP */
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '20%',
            background:
              'linear-gradient(to top, rgba(232,196,106,0.25), transparent)',
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
          {/* GOLDEN HEADING */}
          <Typography
            variant="h3"
            fontWeight={900}
            gutterBottom
            sx={{
              fontSize: { xs: '1.8rem', md: '2.8rem' },
              textTransform: 'uppercase',
              lineHeight: 1.2,
              letterSpacing: '1px',
              background: 'linear-gradient(to right, #E8C46A, #F9E7C5)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: '0px 0px 10px rgba(232,196,106,0.45)',
            }}
          >
            Join Us Today and Start Your Journey
          </Typography>

          {/* SUBHEADING */}
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              color: '#F9E7C5', // warm soft gold text tone
              fontSize: { xs: '1rem', md: '1.15rem' },
              lineHeight: 1.6,
              maxWidth: '600px',
              mx: 'auto',
              textShadow: '0px 0px 6px rgba(0,0,0,0.45)',
            }}
          >
            Empowering communities through savings, investment, and unity for a better tomorrow.
          </Typography>
        </Box>
      </Box>

      <MembershipInfo />
      <JoiningInstructions />
      <MembershipBenefits />
      <Footer />
    </Box>
  );
};

export default Membership;
