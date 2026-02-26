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

  useEffect(() => {
    if (!isMobile || loading) return;

    const interval = setInterval(() => {
      setSelectedCard((prev) => {
        const next = (prev + 1) % 3; 
        if (scrollRef.current) {
          const container = scrollRef.current;
          const card = container.children[next];
          if (card) {
            container.scrollTo({
              left: card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2,
              behavior: 'smooth'
            });
          }
        }
        return next;
      });
    }, 6000); 

    return () => clearInterval(interval);
  }, [isMobile, loading]);

  const identityCards = [
    { id: 0, title: 'Our Mission', icon: <FlagIcon sx={{ fontSize: { xs: 40, md: 50 } }} />, content: mission },
    {
      id: 1,
      title: 'Our Values',
      icon: <StarIcon sx={{ fontSize: { xs: 40, md: 50 } }} />,
      content: (
        <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {coreValues.map((v, i) => (
            <Typography key={i} component="li" sx={{ color: BRAND.lightGold, fontWeight: 500, fontSize: { xs: '0.8rem', md: '0.95rem' } }}>
              • {v}
            </Typography>
          ))}
        </Box>
      ),
    },
    { id: 2, title: 'Our Vision', icon: <VisibilityIcon sx={{ fontSize: { xs: 40, md: 50 } }} />, content: vision },
  ];

  return (
    <Box sx={{ bgcolor: BRAND.dark, py: { xs: 8, md: 12 }, width: '100%' }}>
      <Container maxWidth="xl">
        <Typography 
          variant="h2" 
          textAlign="center" 
          sx={{ 
            color: BRAND.gold, 
            fontWeight: 900, 
            mb: { xs: 6, md: 10 }, 
            textTransform: 'uppercase',
            fontSize: { xs: '1.8rem', md: '3.5rem' },
            letterSpacing: '0.1rem'
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
                gap: { xs: 2, md: 4 },
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
                    minWidth: isMobile ? '85%' : 'auto', 
                    scrollSnapAlign: 'center',
                    flexShrink: 0,
                    height: '100%'
                  }}
                >
                  <Card 
                    component={motion.div}
                    whileHover={!isMobile ? { y: -8 } : {}}
                    sx={{ 
                      bgcolor: selectedCard === index ? 'rgba(236, 155, 20, 0.08)' : 'rgba(255, 255, 255, 0.03)', 
                      border: selectedCard === index ? `2px solid ${BRAND.gold}` : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '24px',
                      color: BRAND.light,
                      transition: 'all 0.4s ease-in-out',
                      height: isMobile ? '380px' : '450px', // Standardized height
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: selectedCard === index ? `0 0 30px rgba(236, 155, 20, 0.2)` : 'none',
                    }}
                  >
                    <CardActionArea
                      onClick={() => setSelectedCard(index)}
                      sx={{ height: '100%', width: '100%', p: { xs: 2, md: 3 } }}
                    >
                      <CardContent sx={{ 
                        height: '100%',
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        textAlign: 'center',
                        justifyContent: 'center'
                      }}>
                        <Box sx={{ color: BRAND.gold, mb: 2 }}>
                          {card.icon}
                        </Box>
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            color: BRAND.gold, 
                            fontWeight: 800, 
                            mb: 2, 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.05rem',
                            fontSize: { xs: '1.1rem', md: '1.4rem' }
                          }}
                        >
                          {card.title}
                        </Typography>
                        
                        {/* THE FIX: Fixed height box with overflow control for typography */}
                        <Box sx={{ 
                          opacity: 0.9, 
                          lineHeight: 1.6, 
                          fontSize: { xs: '0.85rem', md: '1rem' },
                          // Use Clamp to prevent elongated cards
                          display: '-webkit-box',
                          WebkitLineClamp: isMobile ? 6 : 8, 
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}>
                          {card.content}
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Box>
              ))}
            </Box>

            {/* DOT INDICATORS */}
            {isMobile && (
              <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ mt: 2 }}>
                {identityCards.map((_, i) => (
                  <Box
                    key={i}
                    onClick={() => {
                      setSelectedCard(i);
                      if (scrollRef.current) {
                        const container = scrollRef.current;
                        const card = container.children[i];
                        container.scrollTo({
                          left: card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2,
                          behavior: 'smooth'
                        });
                      }
                    }}
                    sx={{
                      width: selectedCard === i ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      bgcolor: selectedCard === i ? BRAND.gold : 'rgba(255, 255, 255, 0.2)',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
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