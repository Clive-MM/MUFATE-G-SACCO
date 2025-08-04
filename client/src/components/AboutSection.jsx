import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import PaymentsIcon from '@mui/icons-material/Payments';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SavingsIcon from '@mui/icons-material/Savings';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

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
    }, 5000); // Slower transition

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
          elevation={3}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            borderRadius: 6,
            overflow: 'hidden',
            mx: 'auto',
            width: '100%',
            maxWidth: '1700px',
            backdropFilter: 'blur(12px)',
            background: 'rgba(255, 255, 255, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '20px 20px 60px #d8f5e0, -20px -20px 60px #ffffff',
          }}
        >
          {/* LEFT SIDE CONTENT */}
          <Box sx={{ flex: 1, p: { xs: 3, md: 5 } }}>
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

            <Typography
              variant="body1"
              sx={{
                color: '#444',
                fontSize: '1.08rem',
                lineHeight: 1.85,
                mb: 2,
              }}
            >
              At <strong>MUFATE G SACCO – Mudete Factory Tea Growers SACCO LTD</strong>, we empower our members with <strong>reliable, flexible, and transparent financial services</strong> designed for everyone — from tea farmers and salaried workers to business owners and personal account holders.
            </Typography>

            <List dense sx={{ pl: 0 }}>
              <ListItem
                sx={{
                  transition: '0.3s',
                  '&:hover': { transform: 'translateX(6px)', color: '#2e7d32' },
                }}
              >
                <ListItemIcon>
                  <PaymentsIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary={<strong>Salary Processing</strong>}
                  secondary="Seamless services for tea farmers, teachers, civil servants & private sector employees."
                />
              </ListItem>

              <ListItem
                sx={{
                  transition: '0.3s',
                  '&:hover': { transform: 'translateX(6px)', color: '#2e7d32' },
                }}
              >
                <ListItemIcon>
                  <AgricultureIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary={<strong>Agricultural Support</strong>}
                  secondary="Tailored solutions for farmers and growers."
                />
              </ListItem>

              <ListItem
                sx={{
                  transition: '0.3s',
                  '&:hover': { transform: 'translateX(6px)', color: '#2e7d32' },
                }}
              >
                <ListItemIcon>
                  <TrendingUpIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary={<strong>Business Growth</strong>}
                  secondary="Flexible credit and investment products for entrepreneurs."
                />
              </ListItem>

              <ListItem
                sx={{
                  transition: '0.3s',
                  '&:hover': { transform: 'translateX(6px)', color: '#2e7d32' },
                }}
              >
                <ListItemIcon>
                  <SavingsIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary={<strong>Smart Savings & Loans</strong>}
                  secondary="Secure your future with solutions you can trust."
                />
              </ListItem>

              <ListItem
                sx={{
                  transition: '0.3s',
                  '&:hover': { transform: 'translateX(6px)', color: '#2e7d32' },
                }}
              >
                <ListItemIcon>
                  <PhoneIphoneIcon color="success" />
                </ListItemIcon>
                <ListItemText
                  primary={<strong>Digital Banking</strong>}
                  secondary="Access your account anywhere, anytime through mobile banking."
                />
              </ListItem>
            </List>

            <Typography
              variant="body1"
              sx={{
                color: '#555',
                fontSize: '1.05rem',
                lineHeight: 1.9,
                mb: 2.5,
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
              flex: 1.2,
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
