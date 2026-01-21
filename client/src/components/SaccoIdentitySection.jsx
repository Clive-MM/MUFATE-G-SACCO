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

// Unified Brand Colors - synchronized with StatsSection
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
      icon: <FlagIcon sx={{ fontSize: { xs: 35, md: 50 }, color: BRAND.gold }} />,
      content: mission,
    },
    {
      title: 'Our Values',
      icon: <StarIcon sx={{ fontSize: { xs: 35, md: 50 }, color: BRAND.gold }} />,
      content: (
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
          {coreValues.map((v, i) => (
            <Typography
              key={i}
              component="li"
              sx={{
                color: BRAND.lightGold,
                mb: 0.5,
                fontSize: { xs: '0.9rem', md: '1rem' },
                fontWeight: 500,
                textShadow: `0 0 8px rgba(236, 155, 20, 0.3)`,
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
      icon: <VisibilityIcon sx={{ fontSize: { xs: 35, md: 50 }, color: BRAND.gold }} />,
      content: vision,
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: BRAND.dark,
        py: { xs: 8, md: 15 },
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Background Decoration Glow - matches Stats style */}
      <Box sx={{
        position: 'absolute',
        top: '20%',
        right: '-5%',
        width: { xs: '250px', md: '400px' },
        height: { xs: '250px', md: '400px' },
        bgcolor: BRAND.gold,
        filter: 'blur(100px)',
        opacity: 0.05,
        borderRadius: '50%',
        zIndex: 0
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* HEADER SECTION - Styled exactly like "Our Impact In Numbers" */}
        <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 }, px: 1 }}>
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
                fontSize: { xs: "1.8rem", sm: "2.8rem", md: "4rem" },
                letterSpacing: { xs: "0.02em", md: "0.1em" },
                mb: { xs: 2, md: 3 }
              }}
            >
              Our Identity
            </Typography>
            <Typography 
              sx={{ 
                color: BRAND.light, 
                maxWidth: "850px", 
                mx: 'auto', 
                fontSize: { xs: "0.9rem", md: "1.15rem" }, 
                opacity: 0.85,
                lineHeight: { xs: 1.6, md: 1.8 },
                fontWeight: 300,
                px: { xs: 2, md: 0 }
              }}
            >
              Driven by purpose and guided by integrity, we stand as a beacon of 
              financial empowerment for the Golden Generation.
            </Typography>
          </motion.div>
        </Box>

        {/* 3-CARD ROW LAYOUT - Matches Stats grid logic */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
            <CircularProgress sx={{ color: BRAND.gold }} />
          </Box>
        ) : (
          <Grid 
            container 
            spacing={{ xs: 2, sm: 3, md: 4 }}
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
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  sx={{ width: '100%', maxWidth: { xs: '350px', md: '100%' } }} 
                >
                  <Paper
                    elevation={0}
                    sx={{
                      py: { xs: 5, md: 8 }, 
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
                    {/* Icon Box - Styled like Stats Icons */}
                    <Box sx={{ mb: { xs: 2, md: 3 }, filter: `drop-shadow(0 0 10px rgba(236, 155, 20, 0.4))` }}>
                      {card.icon}
                    </Box>

                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 900,
                        color: BRAND.gold,
                        fontSize: { xs: '1.2rem', md: '1.6rem' }, 
                        mb: 2,
                        letterSpacing: '0.05em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {card.title}
                    </Typography>

                    <Box
                      sx={{
                        lineHeight: 1.8,
                        fontSize: { xs: '0.95rem', md: '1.05rem' },
                        color: BRAND.light,
                        opacity: 0.8,
                        textAlign: 'center',
                        fontWeight: 300,
                      }}
                    >
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