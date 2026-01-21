import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  CircularProgress,
  Paper,
  Container,
} from '@mui/material';
import { motion } from 'framer-motion';
import FlagIcon from '@mui/icons-material/Flag';
import StarIcon from '@mui/icons-material/Star';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';

// Unified Brand Colors from previous component
const BRAND = {
  gold: "#EC9B14",
  lightGold: "#FFC25F",
  dark: "#02150F",
  light: "#F4F4F4",
  textMuted: "rgba(244, 244, 244, 0.7)",
};

const SaccoIdentitySection = () => {
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  const [coreValues, setCoreValues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = axios.get('https://mufate-g-sacco.onrender.com/sacco-profile');
    const fetchCoreValues = axios.get('https://mufate-g-sacco.onrender.com/corevalues');

    Promise.all([fetchProfile, fetchCoreValues])
      .then(([profileRes, valuesRes]) => {
        setMission(profileRes.data.MissionStatement);
        setVision(profileRes.data.VisionStatement);
        setCoreValues(valuesRes.data.core_values.map((v) => v.CoreValueName));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching identity data:', err);
        setLoading(false);
      });
  }, []);

  const identityCards = [
    {
      title: 'Our Mission',
      icon: FlagIcon,
      content: mission,
    },
    {
      title: 'Our Values',
      icon: StarIcon,
      content: (
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
          {coreValues.map((v, i) => (
            <Typography
              key={i}
              component="li"
              sx={{
                color: BRAND.lightGold,
                textAlign: 'center',
                mb: 1,
                fontSize: { xs: '0.9rem', md: '0.95rem' },
                textShadow: `0 0 8px rgba(236, 155, 20, 0.5)`,
                fontWeight: 600
              }}
            >
              {v}
            </Typography>
          ))}
        </Box>
      ),
    },
    {
      title: 'Our Vision',
      icon: VisibilityIcon,
      content: vision,
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: BRAND.dark,
        py: { xs: 10, md: 15 },
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Aesthetic Background Glow */}
      <Box sx={{
        position: 'absolute',
        top: '15%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        height: '400px',
        bgcolor: BRAND.gold,
        filter: 'blur(180px)',
        opacity: 0.03,
        zIndex: 0
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* HEADER SECTION */}
        <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 12 } }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              sx={{
                color: BRAND.gold,
                fontWeight: 900,
                textTransform: 'uppercase',
                fontSize: { xs: "2.5rem", md: "4rem" },
                letterSpacing: "0.1em",
                mb: 2,
                textShadow: `0 0 15px rgba(236, 155, 20, 0.2)`,
              }}
            >
              Our Identity
            </Typography>
            <Box sx={{ width: '80px', height: '4px', bgcolor: BRAND.gold, mx: 'auto', borderRadius: '2px' }} />
          </motion.div>
        </Box>

        {/* 3-CARD ROW LAYOUT */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
            <CircularProgress sx={{ color: BRAND.gold }} />
          </Box>
        ) : (
          <Grid 
            container 
            spacing={{ xs: 4, md: 3, lg: 5 }} // Spacing between the 3 cards
            justifyContent="center"
            alignItems="stretch"
          >
            {identityCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -12 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    sx={{ height: '100%' }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        py: { xs: 6, md: 8 },
                        px: { xs: 3, md: 4 },
                        height: '100%',
                        textAlign: 'center',
                        borderRadius: '32px', // More rounded for modern feel
                        backdropFilter: 'blur(12px)',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        transition: 'all 0.4s ease-in-out',
                        '&:hover': {
                          borderColor: BRAND.gold,
                          bgcolor: 'rgba(236, 155, 20, 0.07)',
                          boxShadow: `0 30px 60px rgba(0,0,0,0.6), 0 0 20px rgba(236, 155, 20, 0.1)`,
                        },
                      }}
                    >
                      {/* Radial Badge from your style */}
                      <Box
                        sx={{
                          width: 70,
                          height: 70,
                          borderRadius: '50%',
                          background: `radial-gradient(circle, ${BRAND.lightGold}, ${BRAND.gold})`,
                          boxShadow: `0 0 20px rgba(236, 155, 20, 0.5)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 4,
                        }}
                      >
                        <IconComponent sx={{ color: BRAND.dark, fontSize: 32 }} />
                      </Box>

                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 900,
                          color: BRAND.gold,
                          textTransform: 'uppercase',
                          letterSpacing: '0.15em',
                          fontSize: '1.4rem',
                          mb: 3,
                          textShadow: `0 0 10px rgba(236, 155, 20, 0.3)`,
                        }}
                      >
                        {card.title}
                      </Typography>

                      <Box
                        sx={{
                          lineHeight: 1.9,
                          fontSize: { xs: '1rem', md: '1.05rem' },
                          color: BRAND.light,
                          opacity: 0.85,
                          textAlign: 'center',
                        }}
                      >
                        {card.content}
                      </Box>
                    </Paper>
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default SaccoIdentitySection;