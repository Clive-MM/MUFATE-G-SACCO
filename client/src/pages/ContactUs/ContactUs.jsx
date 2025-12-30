import React from 'react';
import { Box, Typography } from '@mui/material';
import ContactDetails from './ContactDetails';
import FeedbackForm from './FeedbackForm';

const BRAND_GOLD = '#EC9B14';
const BRAND_TEXT_LIGHT = '#F4F4F4';

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
            xs: '45vh',   // compact on mobile
            sm: '50vh',
            md: '55vh',   // wide & short on desktop (as per design)
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
        }}
      >
        {/* DARK OVERLAY */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(2,21,15,0.65), rgba(2,21,15,0.85))',
            zIndex: 0,
          }}
        />

        {/* CONTENT */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '900px',
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
              letterSpacing: '0.06em',
              color: BRAND_GOLD,
              mb: 1.5,
              textShadow: '0 4px 12px rgba(0,0,0,0.6)',
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
              maxWidth: '720px',
              mx: 'auto',
              textShadow: '0 2px 8px rgba(0,0,0,0.6)',
            }}
          >
            Have any questions or need support? Our team is ready to help you
            with anything you need.
          </Typography>
        </Box>

        {/* SOFT BOTTOM FADE (TRANSITION TO NEXT SECTION) */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '80px',
            background:
              'linear-gradient(to bottom, rgba(2,21,15,0), rgba(2,21,15,1))',
          }}
        />
      </Box>

      {/* ===================== */}
      {/* NEXT SECTIONS (UNCHANGED FOR NOW) */}
      {/* ===================== */}
      <ContactDetails />
      <FeedbackForm />
    </>
  );
};

export default ContactUs;
