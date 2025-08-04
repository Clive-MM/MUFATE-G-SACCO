import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutSection = () => {
  const images = [
    "https://res.cloudinary.com/djydkcx01/image/upload/v1753423604/IMG_4947_wave6f.jpg",
    "https://res.cloudinary.com/djydkcx01/image/upload/v1753423603/IMG_5049_bwdgmv.jpg",
    "https://res.cloudinary.com/djydkcx01/image/upload/v1753423600/Delegates_following_proceedings...._tmrjcy.jpg",
    "https://res.cloudinary.com/djydkcx01/image/upload/v1753423598/1_10_m4w5gx.jpg",
    "https://res.cloudinary.com/djydkcx01/image/upload/v1753423599/MUFATE_Sacco_Vice_Chairman_Mr_H_Mukavale_rglyuo.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Box sx={{ backgroundColor: '#f6fef7', px: 1, py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          elevation={2}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            borderRadius: 6,
            overflow: 'hidden',
            width: '100%',
            mx: 'auto',
            maxWidth: '1500px',
            p: 0,
            backgroundColor: '#fefefe',
            backgroundImage:
              'linear-gradient(white, white), linear-gradient(to right, #64dd17, #b2f2bb)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'content-box, border-box',
            boxShadow: '10px 10px 20px #d8f5e0, -10px -10px 20px #ffffff',
          }}
        >
          {/* LEFT SIDE CONTENT */}
          <Box sx={{ flex: 1, p: { xs: 3, md: 5 } }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 'bold',
                  color: 'transparent',
                  backgroundImage: 'linear-gradient(to right, #64dd17, #003c3c)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3,
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                  fontSize: { xs: '1.8rem', md: '2.2rem' },
                }}
              >
                About Us
              </Typography>
            </motion.div>

            <Typography
              variant="body1"
              sx={{
                color: '#555',
                fontSize: '1.05rem',
                lineHeight: 1.9,
                mb: 2,
                maxWidth: '95%',
              }}
            >
              At <strong>MUFATE G SACCO – Mudete Factory Tea Growers SACCO LTD</strong>, we empower our members with <strong>reliable, flexible, and transparent financial services</strong> designed for everyone — from tea farmers and salaried workers to business owners and personal account holders.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#555',
                fontSize: '1.05rem',
                lineHeight: 1.9,
                mb: 2,
                maxWidth: '95%',
              }}
            >
              💼 <strong>Salary Processing</strong> – Seamless services for teachers, civil servants & private sector employees<br />
              🌾 <strong>Agricultural Support</strong> – Tailored solutions for farmers and growers<br />
              📈 <strong>Business Growth</strong> – Flexible credit and investment products for entrepreneurs<br />
              🏦 <strong>Smart Savings & Loans</strong> – Secure your future with solutions you can trust<br />
              📲 <strong>Digital Banking</strong> – Access your account anywhere, anytime
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: '#555',
                fontSize: '1.05rem',
                lineHeight: 1.9,
                mb: 2.5,
                maxWidth: '95%',
              }}
            >
              With over a decade of proven service, we’re more than just a SACCO — we’re your <strong>financial partner for every stage of life</strong>.
              <br /><br />
              <em>Join a SACCO that understands you, supports your goals, and grows with you.</em>
            </Typography>

            <Button
              component={RouterLink}
              to="/about/who-we-are"
              variant="contained"
              size="medium"
              sx={{
                backgroundColor: '#64dd17',
                color: '#fff',
                fontWeight: 'bold',
                px: 3,
                py: 1,
                borderRadius: '20px',
                fontSize: '0.9rem',
                transition: 'all 0.4s ease-in-out',
                boxShadow: '0 0 6px #64dd17',
                '&:hover': {
                  backgroundColor: '#76ff03',
                  transform: 'scale(1.08)',
                  boxShadow: '0 0 20px #76ff03',
                },
                '&:focus': {
                  outline: 'none',
                  boxShadow: '0 0 15px #76ff03',
                },
              }}
            >
              Learn More
            </Button>

            <Typography variant="subtitle2" sx={{ mt: 3, fontStyle: 'italic', color: '#777' }}>
              "Invest Here, Reap Here."
            </Typography>
          </Box>

          {/* RIGHT SIDE SLIDESHOW */}
          <Box
            sx={{
              flex: 1,
              minHeight: { xs: 300, md: 'auto' },
              backgroundImage: `url(${images[currentIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              transition: 'background-image 1.0s ease-in-out',
            }}
          />
        </Paper>
      </motion.div>
    </Box>
  );
};

export default AboutSection;
