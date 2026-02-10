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

  const COLORS = {
    gold: '#EC9B14',
    dark: '#02150F',
    light: '#F4F4F4',
    textMuted: '#FFECA8',
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
      <Box sx={{ height: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: COLORS.dark }}>
        <CircularProgress sx={{ color: COLORS.gold }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        fontFamily: `'Segoe UI', sans-serif`,
        background: COLORS.dark,
        m: 0,
        p: 0,
        color: COLORS.textMuted,
        /* MATCHING BOSA PRODUCTS PADDING */
        pt: { xs: 12, md: 18 }, 
      }}
    >
      {/* HERO IMAGE SECTION */}
      <Box sx={{ position: 'relative', width: '100%', textAlign: 'center' }}>
        <Box
          component="img"
          src={hero1?.ImagePath}
          alt={hero1?.Title || 'Career Hero'}
          sx={{
            width: '100%',
            /* CHANGE: Instead of cover, we use 'contain' or 'auto' 
               to ensure the image is never cropped. 
            */
            height: 'auto',
            maxHeight: '80vh', 
            objectFit: 'contain', // This ensures the whole image fits in the box
            display: 'block',
            mx: 'auto'
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
              bottom: { xs: '-80px', sm: '-100px', md: '-120px' }, // Slightly adjusted to not hide too much hero
              zIndex: 5,
              px: { xs: 2, sm: 4, md: 0 },
            }}
          >
            <Box sx={{ width: '100%', maxWidth: { xs: '90%', sm: '80%', md: '600px' } }}>
              <motion.img
                src={hero2.ImagePath}
                alt="Career Sub Image"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                whileHover={{ scale: 1.03, boxShadow: `0 0 35px ${COLORS.gold}88` }}
                style={{
                  width: '100%',
                  borderRadius: '22px',
                  border: `1px solid ${COLORS.gold}44`
                }}
              />
            </Box>
          </Box>
        )}
      </Box>

      {/* SPACER */}
      <Box sx={{ height: { xs: 120, sm: 140, md: 180 } }} />

      {/* DESCRIPTION */}
      <Box sx={{ textAlign: 'center', mt: 4, px: 2, mb: 6 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            fontSize: { xs: '1.6rem', sm: '2rem', md: '2.6rem' },
            letterSpacing: '3px',
            mb: 2,
            textTransform: 'uppercase',
            color: COLORS.gold,
            textShadow: `0 0 18px ${COLORS.gold}73`,
          }}
        >
          Careers
        </Typography>

        <Typography
          variant="body1"
          sx={{
            maxWidth: '900px',
            mx: 'auto',
            fontSize: { xs: '1rem', md: '1.15rem' },
            lineHeight: 1.85,
            color: COLORS.textMuted,
            fontWeight: 500,
          }}
        >
          {hero1?.Description}
        </Typography>
      </Box>

      <CareerListing />
      <Footer />
    </Box>
  );
};

export default Careers;