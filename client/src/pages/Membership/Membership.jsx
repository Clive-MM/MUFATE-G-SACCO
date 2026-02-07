import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import MembershipInfo from './MembershipInfo';
import JoiningInstructions from './JoiningInstructions';
import MembershipBenefits from './MembershipBenefits';
import Footer from '../../components/Footer';


const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.6)',
};

const Membership = () => {
  return (
    <Box>

      
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

          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background:
              `linear-gradient(to right, rgba(2, 21, 15, 0.85), rgba(2, 21, 15, 0.45), transparent)`,
            zIndex: 1,
          },

       
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '22%',
            background:
              `linear-gradient(to top, ${BRAND.gold}47, transparent)`, // 47 is approx 28% opacity
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
          
          <Typography
            variant="h3"
            fontWeight={900}
            gutterBottom
            sx={{
              fontSize: { xs: '1.8rem', md: '2.8rem' },
              textTransform: 'uppercase',
              letterSpacing: '1px',
              lineHeight: 1.2,

             
              background: `linear-gradient(to right, ${BRAND.gold}, #FFD38A)`,
              WebkitBackgroundClip: 'text',
              color: 'transparent',

         
              textShadow: `0px 0px 12px ${BRAND.gold}A6`, 
            }}
          >
            Join Us Today and Start Your Journey
          </Typography>

          
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              color: BRAND.light, 
              opacity: 0.9,
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.65,
              maxWidth: '600px',
              mx: 'auto',

           
              textShadow: '0px 0px 6px rgba(0,0,0,0.55)',
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