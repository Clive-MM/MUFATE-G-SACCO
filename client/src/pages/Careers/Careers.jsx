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
    <Box
      sx={{
        fontFamily: `'Segoe UI', sans-serif`,
        background: '#f8fff3',
        m: 0,
        p: 0,
      }}
    >
      {/* Hero Image 1 Section */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        <Box
          component="img"
          src={hero1?.ImagePath}
          alt={hero1?.Title || 'Career Hero'}
          sx={{
            width: '100%',
            maxHeight: { xs: '350px', sm: '450px', md: '550px' },
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {/* Overlay Hero2 */}
        {hero2 && (
          <Box
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              bottom: { xs: '-30px', sm: '-50px', md: '-80px' },
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              zIndex: 5,
              px: 2,
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
                boxShadow: '0 0 30px rgba(0, 255, 100, 0.8)',
              }}
              style={{
                width: '100%',
                maxWidth: '350px',
                borderRadius: '12px',
              }}
            />
          </Box>
        )}
      </Box>

      {/* Spacer for mobile to avoid tight overlap */}
      <Box sx={{ height: { xs: 80, sm: 100, md: 120 } }} />

      {/* Description Section */}
      <Box sx={{ textAlign: 'center', mt: 4, px: 2, mb: 6 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            fontSize: { xs: '1.6rem', sm: '2rem', md: '2.8rem' },
            letterSpacing: '0.5px',
            color: '#64dd17',
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
            fontSize: { xs: '1rem', md: '1.15rem' },
            lineHeight: 1.8,
            color: '#050c01ff',
            fontWeight: 500,
            letterSpacing: '0.3px',
          }}
        >
          {hero1?.Description}
        </Typography>
      </Box>

      {/* Career listings and footer */}
      <CareerListing />
      <Footer />
    </Box>
  );
};

export default Careers;
