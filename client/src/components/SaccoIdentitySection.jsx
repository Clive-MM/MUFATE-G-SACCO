import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardActionArea,
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
  const [selectedCard, setSelectedCard] = useState(0);

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
    { id: 0, title: 'Our Mission', icon: <FlagIcon sx={{ fontSize: 50 }} />, content: mission },
    {
      id: 1,
      title: 'Our Values',
      icon: <StarIcon sx={{ fontSize: 50 }} />,
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
    { id: 2, title: 'Our Vision', icon: <VisibilityIcon sx={{ fontSize: 50 }} />, content: vision },
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
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
            <CircularProgress sx={{ color: BRAND.gold }} />
          </Box>
        ) : (
          <Box
            sx={{
              width: '100%',
              display: 'grid',
              // Standardizes the card widths and wraps them
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              // Centers the grid items if they don't fill the whole row
              justifyContent: 'center', 
              gap: 4,
              // Limits the total width on huge screens to keep things looking tight
              maxWidth: '1200px',
              mx: 'auto' 
            }}
          >
            {identityCards.map((card, index) => (
              <Card 
                key={card.id}
                component={motion.div}
                whileHover={{ y: -8 }}
                sx={{ 
                  bgcolor: 'rgba(255, 255, 255, 0.03)', 
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '24px',
                  color: BRAND.light,
                  transition: 'all 0.3s ease-in-out',
                  height: '100%',
                  display: 'flex',
                }}
              >
                <CardActionArea
                  onClick={() => setSelectedCard(index)}
                  data-active={selectedCard === index ? '' : undefined}
                  sx={{
                    width: '100%',
                    p: 3,
                    '&[data-active]': {
                      backgroundColor: 'rgba(236, 155, 20, 0.08)',
                      borderColor: BRAND.gold,
                      boxShadow: `0 0 20px rgba(236, 155, 20, 0.1)`,
                    },
                  }}
                >
                  <CardContent sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    textAlign: 'center',
                  }}>
                    <Box sx={{ color: BRAND.gold, mb: 3 }}>
                      {card.icon}
                    </Box>
                    <Typography 
                      variant="h5" 
                      sx={{ color: BRAND.gold, fontWeight: 800, mb: 3, textTransform: 'uppercase', letterSpacing: '0.1rem' }}
                    >
                      {card.title}
                    </Typography>
                    <Box sx={{ opacity: 0.8, lineHeight: 1.8, fontSize: '1.05rem' }}>
                      {card.content}
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default SaccoIdentitySection;