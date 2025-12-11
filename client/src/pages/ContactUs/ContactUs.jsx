import React from 'react';
import { Box, Typography } from '@mui/material';
import ContactDetails from './ContactDetails';
import FeedbackForm from './FeedbackForm';
import Footer from '../../components/Footer';

const ContactUs = () => {
  return (
    <>
     
      <Box
        sx={{
          height: {
            xs: '75vh',     // Perfect for small phones
            sm: '85vh',     // Slightly taller tablets
            md: '110vh',    // Desktop
            lg: '120vh'
          },
          position: 'relative',
          backgroundImage:
            'url(https://res.cloudinary.com/djydkcx01/image/upload/v1755499112/ChatGPT_Image_Aug_18_2025_09_37_29_AM_qzkjzi.png)',
          backgroundSize: 'cover',
          backgroundPosition: {
            xs: 'center top',
            sm: 'center 20%',
            md: 'center'
          },
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'flex-start' },
          justifyContent: 'flex-end',
          px: { xs: 2, sm: 3, md: 8 },
          pb: { xs: 6, sm: 8, md: 10 },
          color: '#fff',
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        {/* Dark overlay for readability */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.65))',
            zIndex: 0,
          }}
        />

        
        <Typography
          sx={{
            fontSize: {
              xs: '1.9rem',
              sm: '2.3rem',
              md: '2.7rem',
              lg: '3rem'
            },
            fontWeight: 900,
            textTransform: 'uppercase',
            background: 'linear-gradient(to right, #FFD700, #FFF4B5)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 0 12px rgba(0,0,0,0.7)',
            zIndex: 1,
            mb: 1,
          }}
        >
          Let’s Get In Touch
        </Typography>

        
        <Typography
          sx={{
            fontSize: {
              xs: '1rem',
              sm: '1.1rem',
              md: '1.2rem'
            },
            maxWidth: { xs: '95%', sm: '85%', md: '620px' },
            lineHeight: 1.6,
            color: '#FFF4B5',
            fontStyle: 'italic',
            textShadow: '0 0 10px rgba(0,0,0,0.6)',
            zIndex: 1,
          }}
        >
          Have any questions or need support? Our team is ready to help you with
          anything you need.
        </Typography>
      </Box>

      <ContactDetails />

      
      <FeedbackForm />

  
      <Footer />
    </>
  );
};

export default ContactUs;
