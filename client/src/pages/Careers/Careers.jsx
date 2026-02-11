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

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
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
        <CircularProgress sx={{ color: COLORS.gold, thickness: 5 }} />
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
        pt: { xs: 12, md: 18 }, 
      }}
    >
      {/* HERO IMAGE SECTION */}
      <Box sx={{ position: 'relative', width: '100%' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Box
            component="img"
            src={hero1?.ImagePath}
            alt={hero1?.Title || 'Career Hero'}
            sx={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              display: 'block',
              filter: 'brightness(0.85) contrast(1.1)', // Subtle punchy look
            }}
          />
        </motion.div>

        {/* SECONDARY IMAGE WITH FLOAT ANIMATION */}
        {hero2 && (
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              bottom: { xs: '-120px', sm: '-140px', md: '-160px' },
              zIndex: 5,
              px: { xs: 2, sm: 4, md: 0 },
            }}
          >
            <Box sx={{ width: '100%', maxWidth: { xs: '90%', sm: '80%', md: '600px' } }}>
              <motion.img
                src={hero2.ImagePath}
                alt="Career Sub Image"
                /* Idle Floating Animation */
                animate={{ 
                  y: [0, -15, 0],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: `0 0 45px ${COLORS.gold}AA` 
                }}
                style={{
                  width: '100%',
                  borderRadius: '22px',
                  border: `2px solid ${COLORS.gold}66`, // Made border slightly thicker
                  cursor: 'pointer'
                }}
              />
            </Box>
          </Box>
        )}
      </Box>

      <Box sx={{ height: { xs: 100, sm: 120, md: 160 } }} />

      {/* PAGE DESCRIPTION WITH REVEAL */}
      <Box 
        component={motion.div}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
        sx={{ textAlign: 'center', mt: 4, px: 2, mb: 6 }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            fontSize: { xs: '1.6rem', sm: '2rem', md: '2.6rem' },
            letterSpacing: '5px', // More spacing for a premium feel
            mb: 2,
            textTransform: 'uppercase',
            color: COLORS.gold,
            textShadow: `2px 2px 20px ${COLORS.gold}44`,
          }}
        >
          Careers
        </Typography>

        <Typography
          variant="body1"
          sx={{
            maxWidth: '800px', // Slightly narrower for better readability
            mx: 'auto',
            fontSize: { xs: '1rem', md: '1.15rem' },
            lineHeight: 1.85,
            color: COLORS.textMuted,
            fontWeight: 500,
            opacity: 0.9
          }}
        >
          {hero1?.Description}
        </Typography>
      </Box>

      {/* CAREER LISTINGS SECTION */}
      <Box sx={{ pb: 8 }}>
        <CareerListing />
      </Box>

      <Footer />
    </Box>
  );
};

export default Careers;