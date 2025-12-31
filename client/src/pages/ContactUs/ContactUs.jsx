import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import ContactDetails from './ContactDetails';
import FeedbackForm from './FeedbackForm';

const BRAND_GOLD = '#EC9B14';
const BRAND_TEXT_LIGHT = '#F4F4F4';
const BRAND_DARK = '#02150F';

const ContactUs = () => {
  return (
    <>
      {/* ===================== */}
      {/* HERO SECTION */}
      {/* ===================== */}
      <Box
        sx={{
          position: 'relative',
          height: {
            xs: '45vh',
            sm: '50vh',
            md: '55vh',
          },
          backgroundImage:
            'url(https://res.cloudinary.com/djydkcx01/image/upload/v1755499112/ChatGPT_Image_Aug_18_2025_09_37_29_AM_qzkjzi.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 2, sm: 4, md: 8 },
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* DARK OVERLAY */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: `
              linear-gradient(
                to bottom,
                rgba(2,21,15,0.55),
                rgba(2,21,15,0.78),
                rgba(2,21,15,0.92)
              )
            `,
            zIndex: 0,
          }}
        />

        {/* HERO CONTENT */}
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          sx={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '820px',
          }}
        >
          <Typography
            sx={{
              fontWeight: 900,
              textTransform: 'uppercase',
              fontSize: {
                xs: '1.7rem',
                sm: '2.1rem',
                md: '2.6rem',
              },
              letterSpacing: {
                xs: '0.08em',
                md: '0.05em',
              },
              color: BRAND_GOLD,
              mb: 1.5,
              textShadow: '0 4px 14px rgba(0,0,0,0.65)',
            }}
          >
            Let’s Get In Touch
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: '0.95rem',
                sm: '1.05rem',
                md: '1.15rem',
              },
              lineHeight: 1.7,
              color: BRAND_TEXT_LIGHT,
              maxWidth: '700px',
              mx: 'auto',
              textShadow: '0 2px 10px rgba(0,0,0,0.6)',
            }}
          >
            Have any questions or need support? Our team is ready to help you
            with anything you need.
          </Typography>
        </Box>

        {/* HERO BOTTOM FADE (ENDS HERO CLEANLY) */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: { xs: '90px', md: '120px' },
            background:
              'linear-gradient(to bottom, rgba(2,21,15,0), rgba(2,21,15,1))',
          }}
        />
      </Box>

      {/* ===================== */}
      {/* VISUAL RESET BUFFER */}
      {/* ===================== */}
      <Box
        sx={{
          height: { xs: '60px', md: '90px' },
          background: BRAND_DARK,
        }}
      />

      {/* ===================== */}
      {/* CONTACT DETAILS SECTION */}
      {/* ===================== */}
      <Box
        sx={{
          background: `
            radial-gradient(circle at top, rgba(236,155,20,0.18), transparent 55%),
            linear-gradient(180deg, #02150F, #03140D)
          `,
        }}
      >
        <ContactDetails />
      </Box>

      {/* ===================== */}
      {/* FEEDBACK SECTION */}
      {/* ===================== */}
      <FeedbackForm />
    </>
  );
};

export default ContactUs;
