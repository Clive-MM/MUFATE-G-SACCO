import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import MembershipInfo from './MembershipInfo';
import JoiningInstructions from './JoiningInstructions';


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
          color: '#fff',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to right, rgba(0,0,0,0.5), rgba(0,0,0,0))',
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
            fontWeight={700}
            gutterBottom
            sx={{
              fontSize: { xs: '1.8rem', md: '2.8rem' },
              textTransform: 'uppercase',
              lineHeight: 1.2,
              letterSpacing: '0.5px',
            }}
          >
            Join us today and start your journey
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mt: 2,
              color: '#e0e0e0',
              fontSize: { xs: '1rem', md: '1.15rem' },
              lineHeight: 1.6,
            }}
          >
            Empowering communities through savings, investment, and unity for a better tomorrow.
          </Typography>


        </Box>
      </Box>
      
      <MembershipInfo/>
      <JoiningInstructions/>
    </Box>

  );
};

export default Membership;
