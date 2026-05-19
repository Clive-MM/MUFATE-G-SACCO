import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Container,
  Stack,
  useTheme,
  useMediaQuery,
  CircularProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';

const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F', 
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.7)',
};

const StrategicPartners = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeStep, setActiveStep] = useState(0);
  
  const scrollRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    axios
      .get('https://mufate-g-sacco.onrender.com/partnerships')
      .then((res) => {
        setPartners(res.data.partnerships || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching partners:', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isMobile || loading || partners.length === 0) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % partners.length;
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
    }, 5000); 

    return () => clearInterval(interval);
  }, [isMobile, loading, partners.length]);

  const handleScroll = () => {
    if (scrollRef.current && isMobile) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth * 0.85;
      const index = Math.round(scrollPosition / cardWidth);
      if (index !== activeStep && index >= 0 && index < partners.length) {
        setActiveStep(index);
      }
    }
  };

  return (
    <Box sx={{ bgcolor: BRAND.dark, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ py: { xs: 8, md: 12 }, flex: 1 }}>
        <Container maxWidth="xl">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2.2rem', md: '3.5rem' },
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '0.1rem',
                color: BRAND.gold, 
                mb: { xs: 6, md: 10 }, 
              }}
            >
              Partners in Growth
            </Typography>
          </motion.div>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
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
                  
                  // CHANGED: Configured grid to scale up to 4 columns on medium/large viewports
                  gridTemplateColumns: {
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(4, 1fr)' 
                  },
                  
                  // CHANGED: Slightly optimized gap to give 4 cards comfortable breathing room
                  gap: { xs: 2.5, md: 3 },
                  maxWidth: '1400px', 
                  
                  mx: 'auto',
                  '&::-webkit-scrollbar': { display: 'none' },
                  scrollbarWidth: 'none',
                  pb: isMobile ? 4 : 0
                }}
              >
                {partners.map((partner, idx) => (
                  <Box 
                    key={idx} 
                    sx={{ 
                      minWidth: isMobile ? '85%' : 'auto', 
                      scrollSnapAlign: 'center',
                      flexShrink: 0,
                      display: 'flex'
                    }}
                  >
                    <Card
                      component={motion.div}
                      whileHover={!isMobile ? { y: -12 } : {}}
                      sx={{
                        borderRadius: '24px',
                        background: 'rgba(255, 255, 255, 0.03)', 
                        border: activeStep === idx && isMobile ? `2px solid ${BRAND.gold}` : `1px solid rgba(255, 255, 255, 0.1)`, 
                        boxShadow: activeStep === idx && isMobile ? `0 0 30px rgba(236, 155, 20, 0.2)` : '0 10px 25px rgba(0,0,0,0.4)',
                        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden'
                      }}
                    >
                      <CardActionArea sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                        {partner.LogoImageURL && (
                          <CardMedia
                            component="img"
                            image={partner.LogoImageURL}
                            alt={partner.PartnerName}
                            sx={{
                              // CHANGED: Reduced desktop image height slightly so cards don't look overly tall/skinny
                              height: { xs: 160, md: 170 }, 
                              objectFit: 'contain',
                              backgroundColor: '#ffffff',
                              p: 3, // Slightly reduced padding for a better logo scale
                            }}
                          />
                        )}

                        <CardContent sx={{ p: { xs: 3, md: 3 }, textAlign: 'center', flexGrow: 1 }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 800,
                              color: BRAND.gold, 
                              mb: 1.5,
                              textTransform: 'uppercase',
                              // CHANGED: Shrunk typography slightly so multi-word names don't wrap awkwardly
                              fontSize: { xs: '1.1rem', md: '1.1rem' } 
                            }}
                          >
                            {partner.PartnerName}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              color: BRAND.textMuted, 
                              lineHeight: 1.7,
                              fontSize: { xs: '0.85rem', md: '0.9rem' },
                              maxWidth: '280px',
                              mx: 'auto'
                            }}
                          >
                            {partner.Description}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Box>
                ))}
              </Box>

              {isMobile && partners.length > 0 && (
                <Stack direction="row" spacing={1.5}>
                  {partners.map((_, i) => (
                    <Box
                      key={i}
                      sx={{
                        width: activeStep === i ? 24 : 8,
                        height: 8,
                        borderRadius: 4,
                        bgcolor: activeStep === i ? BRAND.gold : 'rgba(255, 255, 255, 0.2)',
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
      <Footer />
    </Box>
  );
};

export default StrategicPartners;