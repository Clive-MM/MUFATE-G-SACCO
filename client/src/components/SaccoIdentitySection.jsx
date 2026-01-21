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

const BRAND = {
  gold: "#EC9B14",
  lightGold: "#FFC25F",
  dark: "#02150F",
  light: "#F4F4F4",
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
    { title: 'Our Mission', icon: <FlagIcon sx={{ fontSize: 50, color: BRAND.gold }} />, content: mission },
    {
      title: 'Our Values',
      icon: <StarIcon sx={{ fontSize: 50, color: BRAND.gold }} />,
      content: (
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
          {coreValues.map((v, i) => (
            <Typography key={i} component="li" sx={{ color: BRAND.lightGold, mb: 0.5, fontWeight: 500 }}>
              {v}
            </Typography>
          ))}
        </Box>
      ),
    },
    { title: 'Our Vision', icon: <VisibilityIcon sx={{ fontSize: 50, color: BRAND.gold }} />, content: vision },
  ];

  return (
    <Box sx={{ bgcolor: BRAND.dark, py: { xs: 8, md: 12 }, width: '100%' }}>
      <Container maxWidth="xl">
        <Typography 
          variant="h2" 
          textAlign="center" 
          sx={{ color: BRAND.gold, fontWeight: 900, mb: 10, textTransform: 'uppercase' }}
        >
          Our Identity
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}><CircularProgress sx={{ color: BRAND.gold }} /></Box>
        ) : (
          <Grid 
            container 
            spacing={8} // Matches your screenshot selection
            alignItems="stretch" // Forces all cards to have the same height
          >
            {identityCards.map((card, index) => (
              <Grid item xs={12} md={4} key={index} sx={{ display: 'flex' }}>
                <Paper
                  elevation={0}
                  component={motion.div}
                  whileHover={{ y: -10 }}
                  sx={{
                    p: 5,
                    width: '100%', // Ensures card fills the Grid column width
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: '24px',
                    bgcolor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'border-color 0.3s',
                    '&:hover': { borderColor: BRAND.gold }
                  }}
                >
                  <Box sx={{ mb: 3 }}>{card.icon}</Box>
                  <Typography variant="h5" sx={{ color: BRAND.gold, fontWeight: 800, mb: 3, textTransform: 'uppercase' }}>
                    {card.title}
                  </Typography>
                  <Box sx={{ color: BRAND.light, opacity: 0.8, lineHeight: 1.8 }}>
                    {card.content}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default SaccoIdentitySection;