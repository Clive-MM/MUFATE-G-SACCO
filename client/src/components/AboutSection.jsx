import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Container,
  Grid,
  Stack
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// UNIFORM BRAND COLORS
const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F", // Deep SACCO Green
  light: "#F4F4F4",
};

const AboutSection = () => {
  const images = [
    'https://res.cloudinary.com/djydkcx01/image/upload/v1753423604/IMG_4947_wave6f.jpg',
    'https://res.cloudinary.com/djydkcx01/image/upload/v1753423603/IMG_5049_bwdgmv.jpg',
    'https://res.cloudinary.com/djydkcx01/image/upload/v1753423600/Delegates_following_proceedings...._tmrjcy.jpg',
    'https://res.cloudinary.com/djydkcx01/image/upload/v1753423598/1_10_m4w5gx.jpg',
    'https://res.cloudinary.com/djydkcx01/image/upload/v1753423599/MUFATE_Sacco_Vice_Chairman_Mr_H_Mukavale_rglyuo.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentIndex((prev) => (prev + 1) % images.length),
      5000
    );
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Box sx={{ bgcolor: BRAND.dark, py: { xs: 10, md: 15 }, overflow: 'hidden' }}>
      <Container maxWidth="xl">
        <Grid container spacing={8} alignItems="center">
          
          {/* LEFT SIDE: Typography matching HomepageSlider hierarchy */}
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                sx={{
                  color: BRAND.gold,
                  fontWeight: 800,
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.3em',
                  mb: 2,
                }}
              >
                Our Heritage
              </Typography>
              
              <Typography
                variant="h2"
                sx={{
                  color: BRAND.light,
                  fontWeight: 900,
                  fontSize: { xs: '1.5rem', md: '2.2rem' },
                  lineHeight: 1.1,
                  mb: 3,
                  textTransform: 'uppercase',
                  letterSpacing: '0.02em'
                }}
              >
                Golden Generation <br /> 
                <span style={{ color: BRAND.gold }}>DT SACCO</span>
              </Typography>

              <Typography
                sx={{
                  color: BRAND.light,
                  fontSize: '0.8rem',
                  lineHeight: 1.8,
                  maxWidth: '480px',
                  mb: 4,
                  opacity: 0.8
                }}
              >
                A trusted, member-owned institution serving tea farmers, salaried workers, 
                and entrepreneurs across Western Kenya. We preserve our strong roots 
                while opening doors to a broader common bond.
              </Typography>

              <List sx={{ mb: 5 }}>
                {[
                  { title: "Salary Processing", desc: "Seamless check-off for tea farmers & civil servants." },
                  { title: "Smart Savings", desc: "Goal-based accounts for long-term growth." },
                  { title: "Digital Banking", desc: "24/7 access via USSD and Mobile App." }
                ].map((item, i) => (
                  <ListItem key={i} sx={{ px: 0, py: 1.5 }}>
                    <ListItemIcon sx={{ minWidth: '30px' }}>
                      <Box sx={{ width: 5, height: 5, bgcolor: BRAND.gold, borderRadius: '50%' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Typography sx={{ color: BRAND.gold, fontWeight: 700, fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                          {item.title}
                        </Typography>
                      }
                      secondary={
                        <Typography sx={{ color: BRAND.light, fontSize: '0.75rem', opacity: 0.6, mt: 0.5 }}>
                          {item.desc}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              <Stack direction="row" spacing={3} alignItems="center">
                <Button
                  component={RouterLink}
                  to="/about/who-we-are"
                  sx={ButtonStyle}
                >
                  Learn More
                </Button>
                
                <Typography
                  sx={{
                    fontStyle: 'italic',
                    color: BRAND.gold,
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    opacity: 0.9
                  }}
                >
                  “Walking With You.”
                </Typography>
              </Stack>
            </motion.div>
          </Grid>

          {/* RIGHT SIDE: Modern Frameless Image Layering */}
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ position: 'relative', width: { xs: '100%', md: '90%' }, height: { xs: '350px', md: '550px' } }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{ width: '100%', height: '100%' }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        backgroundImage: `url(${images[currentIndex]})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        borderRadius: '2px',
                        boxShadow: `40px 40px 0px -10px rgba(236, 155, 20, 0.05)`, // Subtle brand offset
                      }}
                    />
                  </motion.div>
                </AnimatePresence>
                
                {/* Minimalist Geometric Accent */}
                <Box 
                  sx={{ 
                    position: 'absolute', 
                    top: -15, 
                    left: -15, 
                    width: '60px', 
                    height: '60px', 
                    borderTop: `1px solid ${BRAND.gold}`, 
                    borderLeft: `1px solid ${BRAND.gold}`,
                    opacity: 0.5
                  }} 
                />
              </Box>
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
};

// Button Style matching HomepageSlider for uniformity
const ButtonStyle = {
  bgcolor: BRAND.gold,
  color: BRAND.dark,
  fontWeight: 800,
  px: 4,
  py: 1.2,
  fontSize: '0.65rem',
  borderRadius: '2px',
  textTransform: 'uppercase',
  transition: '0.3s all ease-in-out',
  '&:hover': { 
    bgcolor: BRAND.light,
    color: BRAND.dark,
    transform: 'translateY(-2px)'
  }
};

export default AboutSection;