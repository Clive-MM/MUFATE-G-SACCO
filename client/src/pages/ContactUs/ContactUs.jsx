import React from 'react';
import { Box, Typography } from '@mui/material';
import ContactDetails from './ContactDetails';
import FeedbackForm from './FeedbackForm';
import Footer from '../../components/Footer';

const ContactUs = () => {
  return (
    <>
      {/* ===========================
          HERO SECTION — GOLD BRAND
      ============================ */}
      <Box
        sx={{
          height: { xs: '80vh', md: '120vh' },
          position: 'relative',
          backgroundImage:
            'url(https://res.cloudinary.com/djydkcx01/image/upload/v1755499112/ChatGPT_Image_Aug_18_2025_09_37_29_AM_qzkjzi.png)',
          backgroundSize: 'cover',
          backgroundPosition: { xs: '70% center', md: 'center' },
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          px: { xs: 3, md: 8 },
          py: { xs: 4, md: 6 },
          color: '#fff',
          zIndex: 1,
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

        {/* =======================
            TITLE — GOLD GRADIENT
        ======================== */}
        <Typography
          sx={{
            fontSize: { xs: '1.9rem', sm: '2.4rem', md: '2.8rem' },
            fontWeight: 900,
            textTransform: 'uppercase',
            background: 'linear-gradient(to right, #FFD700, #FFF4B5)',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 0 12px rgba(0,0,0,0.7)',
            mt: { xs: '55vh', sm: '60vh', md: '65vh' },
            zIndex: 2,
          }}
        >
          Let’s Get In Touch
        </Typography>

        {/* ============================
            SUBTEXT — Soft Gold Text
        ============================= */}
        <Typography
          sx={{
            fontSize: { xs: '1.05rem', sm: '1.15rem', md: '1.25rem' },
            mt: 2,
            maxWidth: { xs: '100%', sm: '90%', md: '600px' },
            lineHeight: 1.7,
            color: '#FFF4B5',
            fontStyle: 'italic',
            textShadow: '0 0 10px rgba(0,0,0,0.6)',
            zIndex: 2,
          }}
        >
          Have any questions or need support? Our team is ready to help you with
          anything you need.
        </Typography>
      </Box>

      {/* ==============================
          CONTACT DETAILS  (Already rebranded)
      =============================== */}
      <ContactDetails />

      {/* FEEDBACK FORM (Already styled with gold/green) */}
      <FeedbackForm />

      {/* FOOTER */}
      <Footer />
    </>
  );
};

export default ContactUs;
