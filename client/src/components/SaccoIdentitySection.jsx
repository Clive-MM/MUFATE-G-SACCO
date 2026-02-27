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
    }, 7000); // Increased to 7s to allow reading of broken-down statements

    return () => clearInterval(interval);
  }, [isMobile, loading]);

  const identityCards = [
    { id: 0, title: 'Our Mission', icon: <FlagIcon sx={{ fontSize: { xs: 38, md: 50 } }} />, content: mission },
    {
      id: 1,
      title: 'Our Values',
      icon: <StarIcon sx={{ fontSize: { xs: 38, md: 50 } }} />,
      content: (
        <Box component="ul" sx={{ 
          listStyle: 'none', 
          p: 0, 
          m: 0, 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', // Break values into 2 columns for better space
          gap: 1 
        }}>
          {coreValues.map((v, i) => (
            <Typography key={i} component="li" sx={{ color: BRAND.lightGold, fontWeight: 600, fontSize: { xs: '0.75rem', md: '0.9rem' } }}>
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
            letterSpacing: '0.15rem'
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
                gap: { xs: 2.5, md: 4 },
                maxWidth: '1200px',
                mx: 'auto',
                '&::-webkit-scrollbar': { display: 'none' }, // Completely hides scroll styling
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
                    component={motion.div}
                    whileHover={!isMobile ? { y: -10, boxShadow: `0 20px 40px rgba(0,0,0,0.4)` } : {}}
                    sx={{ 
                      bgcolor: 'rgba(255, 255, 255, 0.03)', 
                      border: selectedCard === index ? `2.5px solid ${BRAND.gold}` : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '32px',
                      color: BRAND.light,
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      width: '100%',
                      minHeight: { xs: '380px', md: '480px' }, // Balanced height
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: selectedCard === index ? `0 15px 40px rgba(236, 155, 20, 0.15)` : 'none',
                    }}
                  >
                    <CardActionArea
                      onClick={() => setSelectedCard(index)}
                      sx={{ height: '100%', width: '100%', display: 'flex', alignItems: 'stretch' }}
                    >
                      <CardContent sx={{ 
                        width: '100%',
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center', 
                        textAlign: 'center',
                        p: { xs: 3, md: 5 }
                      }}>
                        <Box sx={{ 
                          color: BRAND.gold, 
                          mb: 3, 
                          transform: selectedCard === index ? 'scale(1.1)' : 'scale(1)',
                          transition: '0.4s'
                        }}>
                          {card.icon}
                        </Box>
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            color: BRAND.gold, 
                            fontWeight: 900, 
                            mb: 3, 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.1rem',
                            fontSize: { xs: '1.25rem', md: '1.6rem' }
                          }}
                        >
                          {card.title}
                        </Typography>
                        
                        {/* Typography Fix: No Scroll, Better Breakdowns */}
                        <Typography sx={{ 
                          opacity: 0.9, 
                          lineHeight: { xs: 1.6, md: 1.8 }, 
                          fontSize: { xs: '0.9rem', md: '1.1rem' },
                          fontWeight: 500,
                          // Breaks long statements into readable chunks
                          wordBreak: 'break-word',
                          hyphens: 'auto',
                          textAlign: 'center'
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
              <Stack direction="row" spacing={1.5} sx={{ mt: 2 }}>
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