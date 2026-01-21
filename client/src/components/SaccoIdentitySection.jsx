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
            <Typography key={i} component="li" sx={{ color: BRAND.lightGold, mb: 0.5, fontSize: "0.95rem", fontWeight: 500 }}>
              {v}
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
    <Box sx={{ bgcolor: BRAND.dark, py: { xs: 10, md: 15 }, position: 'relative', overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ color: BRAND.gold, fontWeight: 900, textTransform: 'uppercase', fontSize: { xs: "2rem", md: "3.5rem" }, mb: 2 }}>
            Our Identity
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
            <CircularProgress sx={{ color: BRAND.gold }} />
          </Box>
        ) : (
          <Grid 
            container 
            spacing={4} // This creates the uniform gap shown in your first image
            alignItems="stretch" // This ensures all cards are the same height
          >
            {identityCards.map((card, index) => (
              <Grid item xs={12} md={4} key={index} sx={{ display: 'flex' }}>
                <Paper
                  component={motion.div}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  elevation={0}
                  sx={{
                    p: 4,
                    width: '100%', // Fill the grid column width
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: '20px',
                    bgcolor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: '0.3s',
                    '&:hover': {
                      borderColor: BRAND.gold,
                      bgcolor: 'rgba(236, 155, 20, 0.05)',
                    }
                  }}
                >
                  <Box sx={{ mb: 3 }}>{card.icon}</Box>
                  <Typography variant="h5" sx={{ color: BRAND.gold, fontWeight: 800, mb: 2, textTransform: 'uppercase' }}>
                    {card.title}
                  </Typography>
                  <Typography sx={{ color: BRAND.light, opacity: 0.8, lineHeight: 1.7 }}>
                    {card.content}
                  </Typography>
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