import React, { useEffect, useState, useRef } from "react";
import { 
  Box, 
  Typography, 
  Alert, 
  Skeleton, 
  Container, 
  Card, 
  CardContent, 
  Stack, 
  useTheme, 
  useMediaQuery 
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";

const API = "https://mufate-g-sacco.onrender.com/clients";

const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F",
  light: "#F4F4F4",
};

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeStep, setActiveStep] = useState(0);

  const scrollRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    axios
      .get(API)
      .then((res) => setTestimonials(res.data?.clients ?? []))
      .catch(() => setError("Could not load reviews. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  // Performance: Auto-scroll logic for mobile only
  useEffect(() => {
    if (!isMobile || loading || testimonials.length === 0) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % testimonials.length;
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
    }, 7000); 

    return () => clearInterval(interval);
  }, [isMobile, loading, testimonials.length]);

  // Sync state with manual swipe
  const handleScroll = () => {
    if (scrollRef.current && isMobile) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth * 0.88;
      const index = Math.round(scrollPosition / cardWidth);
      if (index !== activeStep && index >= 0 && index < testimonials.length) {
        setActiveStep(index);
      }
    }
  };

  return (
    <Box sx={{ bgcolor: BRAND.dark, py: { xs: 8, md: 15 }, width: '100%', overflow: 'hidden' }}>
      <Container maxWidth="xl">
        <Typography
          variant="h2"
          textAlign="center"
          sx={{
            color: BRAND.gold,
            fontWeight: 900,
            mb: { xs: 6, md: 10 },
            textTransform: "uppercase",
            fontSize: { xs: "2.2rem", md: "3.75rem" },
            letterSpacing: '0.1rem'
          }}
        >
          Reviews
        </Typography>

        {error && (
          <Container maxWidth="sm">
            <Alert severity="error" sx={{ mb: 4, bgcolor: 'rgba(211, 47, 47, 0.1)', color: '#ff8a80' }}>
              {error}
            </Alert>
          </Container>
        )}

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
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Box key={i} sx={{ minWidth: isMobile ? '88%' : 'auto' }}>
                    <Card sx={{ bgcolor: 'rgba(255, 255, 255, 0.03)', borderRadius: '32px', height: '350px', p: 4 }}>
                      <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: 'rgba(255,255,255,0.1)', mb: 2 }} />
                      <Skeleton variant="text" height={150} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
                      <Skeleton variant="text" width="40%" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
                    </Card>
                  </Box>
                ))
              : testimonials.map((client, index) => (
                  <Box 
                    key={client.ClientID} 
                    sx={{ 
                      minWidth: isMobile ? '88%' : 'auto', 
                      scrollSnapAlign: 'center',
                      flexShrink: 0,
                      display: 'flex'
                    }}
                  >
                    <Card
                      component={motion.article}
                      whileHover={!isMobile ? { y: -10 } : {}}
                      sx={{
                        bgcolor: activeStep === index ? 'rgba(236, 155, 20, 0.05)' : 'rgba(255, 255, 255, 0.03)',
                        border: activeStep === index ? `2px solid ${BRAND.gold}` : '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '32px',
                        color: BRAND.light,
                        width: '100%',
                        minHeight: { xs: '320px', md: '420px' },
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.4s ease',
                        boxShadow: activeStep === index ? `0 15px 40px rgba(236, 155, 20, 0.15)` : 'none',
                      }}
                    >
                      <CardContent sx={{ p: { xs: 4, md: 5 }, textAlign: 'center', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Typography
                          sx={{
                            fontStyle: 'italic',
                            fontSize: { xs: '0.95rem', md: '1.1rem' },
                            lineHeight: 1.8,
                            color: BRAND.light,
                            opacity: 0.9,
                            mb: 4,
                            position: 'relative',
                            maxWidth: { xs: '260px', md: '100%' },
                            mx: 'auto',
                            '&::before': {
                               content: '"“"',
                               color: BRAND.gold,
                               fontSize: '3.5rem',
                               position: 'absolute',
                               top: -25,
                               left: -15,
                               opacity: 0.2
                            }
                          }}
                        >
                          {client.ClientStatistic}
                        </Typography>

                        <Typography
                          variant="h6"
                          sx={{
                            color: BRAND.gold,
                            fontWeight: 900,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1rem',
                            fontSize: '0.9rem'
                          }}
                        >
                          {client.ClientName}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
          </Box>

          {/* Dot Indicators for Mobile Navigation */}
          {isMobile && !loading && (
            <Stack direction="row" spacing={1.2} sx={{ mt: 1 }}>
              {testimonials.map((_, i) => (
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
      </Container>
    </Box>
  );
};

export default TestimonialsSection;