import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import CareerListing from './CareerListing';
import Footer from '../../components/Footer';

const Careers = () => {
  const [hero1, setHero1] = useState(null);
  const [hero2, setHero2] = useState(null);
  const [loading, setLoading] = useState(true);

  // Standardized Brand Colors
  const COLORS = {
    gold: '#EC9B14',      
    dark: '#02150F',      
    light: '#F4F4F4',
    textMuted: 'rgba(244, 244, 244, 0.7)',
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res1 = await axios.get('https://mufate-g-sacco.onrender.com/career-hero');
        const res2 = await axios.get('https://mufate-g-sacco.onrender.com/career-hero-2');
        setHero1(res1.data.career_hero);
        setHero2(res2.data.career_hero_2);
      } catch (error) {
        console.error('❌ Failed to fetch images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: COLORS.dark,
        }}
      >
        <CircularProgress sx={{ color: COLORS.gold }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: COLORS.dark,
        m: 0,
        p: 0,
        color: COLORS.light,
        minHeight: '100vh',
      }}
    >
      {/* HERO IMAGE SECTION */}
      <Box sx={{ position: 'relative', width: '100%' }}>
        <Box
          component="img"
          src={hero1?.ImagePath}
          alt={hero1?.Title || 'Career Hero'}
          sx={{
            width: '100%',
            height: { xs: '300px', md: '500px' },
            objectFit: 'cover',
            display: 'block',
            filter: 'brightness(0.7)', // Darker filter to make floating image pop
          }}
        />

        {/* SECONDARY IMAGE FLOATING CARD */}
        {hero2 && (
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              bottom: { xs: '-80px', md: '-120px' },
              zIndex: 5,
              px: 2,
            }}
          >
            <Box
              sx={{
                width: '100%',
                maxWidth: { xs: '90%', md: '700px' },
              }}
            >
              <motion.img
                src={hero2.ImagePath}
                alt="Career Sub Image"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: `0 0 35px ${COLORS.gold}44`,
                }}
                style={{
                  width: '100%',
                  borderRadius: '22px', // Brand standard radius
                  border: `2px solid ${COLORS.gold}33`,
                  boxShadow: '0 15px 40px rgba(0,0,0,0.5)',
                }}
              />
            </Box>
          </Box>
        )}
      </Box>

      {/* SPACER FOR FLOATING IMAGE */}
      <Box sx={{ height: { xs: 120, md: 180 } }} />

      {/* PAGE DESCRIPTION */}
      <Box sx={{ textAlign: 'center', px: 2, mb: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              fontSize: { xs: '1.8rem', md: '3rem' },
              letterSpacing: '3px',
              mb: 3,
              textTransform: 'uppercase',
              color: COLORS.gold,
              textShadow: `0 0 20px ${COLORS.gold}33`,
            }}
          >
            Join Our Team
          </Typography>

          <Typography
            variant="body1"
            sx={{
              maxWidth: '850px',
              mx: 'auto',
              fontSize: { xs: '1rem', md: '1.2rem' },
              lineHeight: 1.9,
              color: COLORS.textMuted,
              fontWeight: 500,
            }}
          >
            {hero1?.Description}
          </Typography>
        </motion.div>
      </Box>

      {/* CAREER LISTINGS SECTION */}
      <Box sx={{ background: 'rgba(255,255,255,0.02)', py: 4 }}>
        <CareerListing />
      </Box>

      {/* GOLD DIVIDER */}
      <Box
        sx={{
          height: '4px',
          background: COLORS.gold,
          mt: 8,
          opacity: 0.2,
          mx: 'auto',
          width: '80%',
        }}
      />

      <Footer />
    </Box>
  );
};

export default Careers;