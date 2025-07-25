import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const AboutSection = () => {
  // Array of image URLs
  const images = [
    "https://res.cloudinary.com/djydkcx01/image/upload/v1753423604/IMG_4947_wave6f.jpg",
    "https://res.cloudinary.com/djydkcx01/image/upload/v1753423603/IMG_5049_bwdgmv.jpg",
    "https://res.cloudinary.com/djydkcx01/image/upload/v1753423600/Delegates_following_proceedings...._tmrjcy.jpg",
    "https://res.cloudinary.com/djydkcx01/image/upload/v1753423598/1_10_m4w5gx.jpg",
    "https://res.cloudinary.com/djydkcx01/image/upload/v1753424586/IMG_9498_bwtmvs.jpg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-change image every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Box sx={{ backgroundColor: '#f6fef7', px: 0, py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          elevation={0}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            borderRadius: 4,
            overflow: 'hidden',
            width: '100%',
            mx: 'auto',
            maxWidth: '1300px',
            backgroundColor: '#fff',
            border: '2px solid transparent',
            backgroundImage:
              'linear-gradient(white, white), linear-gradient(to right, #64dd17, #b2f2bb)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'content-box, border-box',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.06)',
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
                mb: 2.5,
                maxWidth: '95%',
              }}
            >
              At MUFATE G SACCO, Mudete Factory Tea Growers SACCO LTD, we are committed to empowering our members through reliable,
              efficient, and transparent financial services. With over a decade of experience
              serving the tea farming community, our dedicated team ensures every transaction is
              handled with integrity and precision.
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
              We provide tailored savings, credit, and investment solutions designed to support
              your growth and prosperity. Your hard work in the fields deserves a financial partner
              you can trust—and that’s exactly what we deliver.
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
              transition: 'background-image 0.8s ease-in-out',
            }}
          />
        </Paper>
      </motion.div>
    </Box>
  );
};

export default AboutSection;
