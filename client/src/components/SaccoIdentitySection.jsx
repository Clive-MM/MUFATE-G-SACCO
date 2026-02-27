import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardActionArea,
  Container,
  useTheme,
  useMediaQuery,
  Stack 
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
  
  const scrollRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchProfile = axios.get('https://mufate-g-sacco.onrender.com/sacco-profile');
    const fetchCoreValues = axios.get('https://mufate-g-sacco.onrender.com/corevalues');

    Promise.all([fetchProfile, fetchCoreValues])
      .then(([profileRes, valuesRes]) => {
        setMission(profileRes.data.MissionStatement || "");
        setVision(profileRes.data.VisionStatement || "");
        setCoreValues(valuesRes.data.core_values?.map((v) => v.CoreValueName) || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching identity data:', err);
        setLoading(false);
      });
  }, []);

  // Sync state with manual scroll
  const handleScroll = () => {
    if (scrollRef.current && isMobile) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth * 0.88;
      const index = Math.round(scrollPosition / cardWidth);
      if (index !== selectedCard) setSelectedCard(index);
    }
  };

  const identityCards = [
    { id: 0, title: 'Our Mission', icon: <FlagIcon sx={{ fontSize: { xs: 38, md: 50 } }} />, content: mission },
    {
      id: 1,
      title: 'Our Values',
      icon: <StarIcon sx={{ fontSize: { xs: 38, md: 50 } }} />,
      content: (
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, width: '100%' }}>
          {coreValues.map((v, i) => (
            <Typography key={i} sx={{ color: BRAND.lightGold, fontWeight: 600, fontSize: { xs: '0.7rem', md: '0.9rem' } }}>
              • {v}
            </Typography>
          ))}
        </Box>
      ),
    },
    { id: 2, title: 'Our Vision', icon: <VisibilityIcon sx={{ fontSize: { xs: 38, md: 50 } }} />, content: vision },
  ];

  return (
    <Box sx={{ bgcolor: BRAND.dark, py: { xs: 8, md: 15 }, width: '100%' }}>
      <Container maxWidth="xl">
        <Typography 
          variant="h2" 
          textAlign="center" 
          sx={{ 
            color: BRAND.gold, 
            fontWeight: 900, 
            mb: { xs: 6, md: 10 }, 
            textTransform: 'uppercase',
            fontSize: { xs: '2rem', md: '3.5rem' },
          }}
        >
          Our Identity
        </Typography>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
            <CircularProgress sx={{ color: BRAND.gold }} />
          </Box>
        ) : (
          <Stack spacing={4} alignItems="center">
            <Box
              ref={scrollRef}
              onScroll={handleScroll}
              sx={{
                width: '100%',
                display: isMobile ? 'flex' : 'grid',
                flexDirection: isMobile ? 'row' : 'unset',
                overflowX: isMobile ? 'auto' : 'visible',
                scrollSnapType: isMobile ? 'x mandatory' : 'none',
                gridTemplateColumns: {
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)'
                },
                gap: { xs: 2.5, md: 4 },
                maxWidth: '1200px',
                mx: 'auto',
                '&::-webkit-scrollbar': { display: 'none' },
                scrollbarWidth: 'none',
              }}
            >
              {identityCards.map((card, index) => (
                <Box 
                  key={card.id} 
                  sx={{ 
                    minWidth: isMobile ? '88%' : 'auto', 
                    scrollSnapAlign: 'center',
                    flexShrink: 0,
                    display: 'flex'
                  }}
                >
                  <Card 
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.03)', 
                      border: selectedCard === index ? `2px solid ${BRAND.gold}` : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '32px',
                      color: BRAND.light,
                      width: '100%',
                      // THE FIX: minHeight ensures a solid shape, but text wrapping handles the length
                      minHeight: { xs: '350px', md: '450px' }, 
                      display: 'flex',
                    }}
                  >
                    <CardActionArea sx={{ display: 'flex', alignItems: 'center' }}>
                      <CardContent sx={{ 
                        width: '100%',
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        textAlign: 'center',
                        p: { xs: 3, md: 5 }
                      }}>
                        <Box sx={{ color: BRAND.gold, mb: 3 }}>
                          {card.icon}
                        </Box>
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            color: BRAND.gold, 
                            fontWeight: 900, 
                            mb: 2, 
                            textTransform: 'uppercase', 
                            fontSize: { xs: '1.2rem', md: '1.6rem' }
                          }}
                        >
                          {card.title}
                        </Typography>
                        
                        {/* TEXT WRAPPING LOGIC */}
                        <Typography sx={{ 
                          opacity: 0.9, 
                          lineHeight: 1.6, 
                          fontSize: { xs: '0.85rem', md: '1.05rem' },
                          fontWeight: 500,
                          // Force wrapping into a "laptop-style" block
                          maxWidth: { xs: '260px', md: '100%' }, 
                          mx: 'auto',
                        }}>
                          {card.content}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Box>
              ))}
            </Box>

            {/* DOT INDICATORS */}
            {isMobile && (
              <Stack direction="row" spacing={1.5}>
                {identityCards.map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: selectedCard === i ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      bgcolor: selectedCard === i ? BRAND.gold : 'rgba(255, 255, 255, 0.2)',
                      transition: '0.4s all ease',
                    }}
                  />
                ))}
              </Stack>
            )}
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default SaccoIdentitySection;