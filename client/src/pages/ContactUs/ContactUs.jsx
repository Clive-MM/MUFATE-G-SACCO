import React from 'react';
import { Box, Typography } from '@mui/material';
import ContactDetails from './ContactDetails';
import FeedbackForm from './FeedbackForm';
import Footer from '../../components/Footer';


const ContactUs = () => {
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          height: { xs: '80vh', md: '120vh' },
          position: 'relative',
          backgroundImage:
            'url(https://res.cloudinary.com/djydkcx01/image/upload/v1748438814/ChatGPT_Image_May_28_2025_04_25_45_PM_vedkd0.png)',
          backgroundSize: 'cover',
          backgroundPosition: { xs: '70% center', md: 'center' },
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          // Adjust vertical alignment to start from the top
          justifyContent: 'flex-start', // Changed from 'center'
          px: { xs: 3, md: 8 },
          py: { xs: 4, md: 6 },
          color: '#fff',
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
            fontWeight: 'bold',
            textShadow: '2px 2px 8px rgba(0,0,0,0.6)',
            zIndex: 1,
            // Add margin-top to push the text down, especially for mobile
            mt: { xs: '45vh', sm: '50vh', md: '55vh' }, // Adjust these values as needed
          }}
        >
          Let’s Get In Touch
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
            mt: 2,
            maxWidth: { xs: '100%', sm: '90%', md: '600px' },
            fontWeight: 'normal',
            textShadow: '1px 1px 6px rgba(0,0,0,0.4)',
            lineHeight: 1.6,
            fontStyle: 'italic',
            wordWrap: 'break-word',
            zIndex: 1,
          }}
        >
          Have any questions or need support? Our team is ready to help you with anything you need.
        </Typography>
      </Box>

      {/* Contact Info Section */}
      <ContactDetails />
      <FeedbackForm/>
      <Footer/>
      
    </>
  );
};

export default ContactUs;