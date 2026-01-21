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

// Unified Brand Colors
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
                fontSize: { xs: '0.9rem', md: '1rem' },
                textShadow: `0 0 8px rgba(236, 155, 20, 0.4)`,
                fontWeight: 500
              }}
            >
              • {v}
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
      {/* Background Decoration Glow - Unified with Stats Section */}
      <Box sx={{
        position: 'absolute',
        top: '10%',
        right: '-5%',
        width: { xs: '300px', md: '500px' },
        height: { xs: '300px', md: '500px' },
        bgcolor: BRAND.gold,
        filter: 'blur(150px)',
        opacity: 0.04,
        borderRadius: '50%',
        zIndex: 0
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* SECTION HEADING */}
        <Box sx={{ textAlign: 'center', mb: { xs: 8, md: 10 }, px: 2 }}>
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
                fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
                letterSpacing: { xs: "0.05em", md: "0.1em" },
                mb: 2,
                textShadow: `0 0 20px rgba(236, 155, 20, 0.3)`,
              }}
            >
              Our Identity
            </Typography>
            <Box sx={{ width: '60px', height: '4px', bgcolor: BRAND.gold, mx: 'auto', borderRadius: '2px' }} />
          </motion.div>
        </Box>

        {/* LOADING */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
            <CircularProgress sx={{ color: BRAND.gold }} />
          </Box>
        ) : (
          <Grid 
            container 
            spacing={{ xs: 3, md: 4 }} 
            justifyContent="center"
            alignItems="stretch"
          >
            {identityCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <Grid item xs={12} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -10 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                    sx={{ width: '100%', maxWidth: { xs: '400px', md: 'none' } }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        py: { xs: 6, md: 8 },
                        px: { xs: 3, md: 4 },
                        height: '100%',
                        textAlign: 'center',
                        borderRadius: '24px',
                        backdropFilter: 'blur(10px)',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        '&:hover': {
                          borderColor: BRAND.gold,
                          bgcolor: 'rgba(236, 155, 20, 0.06)',
                          boxShadow: `0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(236, 155, 20, 0.2)`,
                        },
                      }}
                    >
                      {/* Radial Icon Badge - Modernized from your code */}
                      <Box
                        sx={{
                          width: { xs: 60, md: 70 },
                          height: { xs: 60, md: 70 },
                          borderRadius: '50%',
                          background: `radial-gradient(circle, ${BRAND.lightGold}, ${BRAND.gold})`,
                          boxShadow: `0 0 20px rgba(236, 155, 20, 0.4)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 4,
                        }}
                      >
                        <IconComponent sx={{ color: BRAND.dark, fontSize: { xs: 30, md: 35 } }} />
                      </Box>

                      <Typography
                        variant="h5"
                        sx={{
                          fontWeight: 900,
                          color: BRAND.gold,
                          textTransform: 'uppercase',
                          letterSpacing: '0.15em',
                          fontSize: { xs: '1.2rem', md: '1.4rem' },
                          mb: 3,
                          textShadow: `0 0 10px rgba(236, 155, 20, 0.3)`,
                        }}
                      >
                        {card.title}
                      </Typography>

                      <Box
                        sx={{
                          lineHeight: 1.8,
                          fontSize: { xs: '0.95rem', md: '1.05rem' },
                          color: BRAND.light,
                          opacity: 0.9,
                          textAlign: 'center',
                          fontWeight: 300,
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