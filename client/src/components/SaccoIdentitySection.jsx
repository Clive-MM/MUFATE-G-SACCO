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
      icon: <FlagIcon sx={{ fontSize: { xs: 40, md: 50 }, color: BRAND.gold }} />,
      content: mission,
    },
    {
      title: 'Our Values',
      icon: <StarIcon sx={{ fontSize: { xs: 40, md: 50 }, color: BRAND.gold }} />,
      content: (
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
          {coreValues.map((v, i) => (
            <Typography
              key={i}
              component="li"
              variant="body2"
              sx={{
                color: BRAND.light,
                textAlign: 'center',
                mb: 0.5,
                fontSize: { xs: '0.9rem', md: '1rem' },
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
      icon: <VisibilityIcon sx={{ fontSize: { xs: 40, md: 50 }, color: BRAND.gold }} />,
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
      {/* Background Decoration Glow - Matches Stats Component */}
      <Box sx={{
        position: 'absolute',
        bottom: '10%',
        right: '-5%',
        width: { xs: '250px', md: '450px' },
        height: { xs: '250px', md: '450px' },
        bgcolor: BRAND.gold,
        filter: 'blur(130px)',
        opacity: 0.04,
        borderRadius: '50%',
        zIndex: 0
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* HEADER SECTION */}
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
                fontSize: { xs: "2.2rem", sm: "3rem", md: "4rem" },
                letterSpacing: { xs: "0.05em", md: "0.1em" },
                mb: 3
              }}
            >
              Our Identity
            </Typography>
            <Box 
              sx={{ 
                width: '80px', 
                height: '4px', 
                bgcolor: BRAND.gold, 
                mx: 'auto', 
                borderRadius: '2px',
                mb: 3
              }} 
            />
          </motion.div>
        </Box>

        {/* CONTENT GRID */}
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
            {identityCards.map((card, index) => (
              <Grid item xs={12} md={4} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  sx={{ width: '100%', maxWidth: { xs: '450px', md: 'none' } }}
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
                        boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(236, 155, 20, 0.1)`,
                      },
                    }}
                  >
                    <Box sx={{ 
                      mb: 3, 
                      filter: `drop-shadow(0 0 10px rgba(236, 155, 20, 0.4))` 
                    }}>
                      {card.icon}
                    </Box>

                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 900,
                        color: BRAND.gold,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        fontSize: { xs: '1.25rem', md: '1.5rem' },
                        mb: 2,
                      }}
                    >
                      {card.title}
                    </Typography>

                    <Box sx={{ 
                      color: BRAND.light, 
                      opacity: 0.9,
                      lineHeight: 1.8,
                      fontSize: { xs: '0.95rem', md: '1.05rem' },
                      fontWeight: 300
                    }}>
                      {card.content}
                    </Box>
                  </Paper>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default SaccoIdentitySection;