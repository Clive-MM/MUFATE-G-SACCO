import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';

const Careers = () => {
  const [hero1, setHero1] = useState(null);
  const [hero2, setHero2] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res1 = await axios.get('http://localhost:5000/career-hero');
        const res2 = await axios.get('http://localhost:5000/career-hero-2');
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
          height: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ fontFamily: `'Segoe UI', sans-serif`, pb: 12 }}>
      {/* Hero Image 1 Section */}
      <Box sx={{ position: 'relative', width: '100%' }}>
        <Box
          component="img"
          src={hero1?.ImagePath}
          alt={hero1?.Title || 'Career Hero'}
          sx={{
            width: '100%',
            height: 'auto',
            objectFit: 'contain',
            display: 'block',
          }}
        />

        {/* Overlay Hero Image 2 - Centered & Glowing */}
        {hero2 && (
          <Box
            sx={{
              position: 'absolute',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              bottom: '-100px',
              zIndex: 5,
            }}
          >
            <motion.img
              src={hero2.ImagePath}
              alt="Career Sub Image"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              whileHover={{
                scale: 1.03,
                boxShadow: '0 0 30px rgba(0, 255, 100, 0.8)', // ✅ Green glow
              }}
              style={{
                width: '40%',
                borderRadius: '16px',
              }}
            />
          </Box>
        )}
      </Box>

      {/* Description Section */}
      <Box sx={{ textAlign: 'center', mt: 14, px: 2 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2.2rem', md: '2.8rem' },
            letterSpacing: '0.5px',
            color: '#014421', // ✅ Deep green brand color
            mb: 2,
            textTransform: 'uppercase',
          }}
        >
          Careers
        </Typography>
        <Typography
          variant="body1"
          sx={{
            maxWidth: '850px',
            mx: 'auto',
            fontSize: '1.15rem',
            lineHeight: 1.9,
            color: '#2e3d35', 
            fontWeight: 500,
            letterSpacing: '0.3px',
          }}
        >
          {hero1?.Description}
        </Typography>
      </Box>
    </Box>
  );
};

export default Careers;
