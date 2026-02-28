import React, { useEffect, useState, useRef, useMemo } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { CloudDownload, Search as SearchIcon } from '@mui/icons-material';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  
  const scrollRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const COLORS = {
    gold: '#EC9B14',      
    dark: '#02150F',      
    light: '#F4F4F4',
  };

  useEffect(() => {
    axios
      .get('https://mufate-g-sacco.onrender.com/resources/recent')
      .then(res => {
        setResources(res.data.resources || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching resources:', err);
        setLoading(false);
      });
  }, []);

  // PERFORMANCE: Filter resources based on search term
  const filteredResources = useMemo(() => {
    return resources.filter(res => 
      res.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [resources, searchTerm]);

  const handleDownload = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  const handleScroll = () => {
    if (scrollRef.current && isMobile) {
      const scrollPosition = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.offsetWidth * 0.85;
      const index = Math.round(scrollPosition / cardWidth);
      if (index !== activeStep && index >= 0 && index < filteredResources.length) {
        setActiveStep(index);
      }
    }
  };

  return (
    <Box
      sx={{
        background: COLORS.dark,
        pt: { xs: 12, md: 20 }, 
        pb: 0,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Container maxWidth="xl" sx={{ flex: 1 }}>
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontWeight: 900,
              textTransform: 'uppercase',
              mb: 4,
              letterSpacing: '0.1rem',
              color: COLORS.gold,
              fontSize: { xs: '1.8rem', md: '3.5rem' },
            }}
          >
            Resources
          </Typography>
        </motion.div>

        {/* 🔍 SEARCH BAR COMPONENT */}
        <Box sx={{ maxWidth: '600px', mx: 'auto', mb: { xs: 6, md: 10 }, px: 2 }}>
          <TextField
            fullWidth
            placeholder="Search documents (e.g. Loan Form)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: COLORS.gold }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: COLORS.light,
                borderRadius: '15px',
                bgcolor: 'rgba(255,255,255,0.05)',
                '& fieldset': { borderColor: 'rgba(236, 155, 20, 0.3)' },
                '&:hover fieldset': { borderColor: COLORS.gold },
                '&.Mui-focused fieldset': { borderColor: COLORS.gold },
              },
              '& .MuiInputBase-input::placeholder': {
                color: 'rgba(244, 244, 244, 0.5)',
                fontSize: '0.9rem'
              }
            }}
          />
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: COLORS.gold }} />
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
                pb: isMobile ? 4 : 0
              }}
            >
              <AnimatePresence mode="popLayout">
                {filteredResources.length > 0 ? (
                  filteredResources.map((res, idx) => (
                    <Box 
                      key={res.ID || idx} 
                      component={motion.div}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      sx={{ 
                        minWidth: isMobile ? '85%' : 'auto', 
                        scrollSnapAlign: 'center',
                        flexShrink: 0,
                        display: 'flex'
                      }}
                    >
                      <Card
                        sx={{
                          borderRadius: '24px',
                          p: { xs: 3, md: 4 },
                          backgroundColor: activeStep === idx && isMobile ? 'rgba(236, 155, 20, 0.08)' : 'rgba(255,255,255,0.03)',
                          border: activeStep === idx && isMobile ? `2px solid ${COLORS.gold}` : `1px solid rgba(255,255,255,0.1)`,
                          boxShadow: activeStep === idx && isMobile ? `0 15px 40px rgba(236, 155, 20, 0.2)` : '0 8px 28px rgba(0,0,0,0.25)',
                          transition: 'all 0.3s ease',
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center'
                        }}
                      >
                        <CardContent sx={{ textAlign: 'center' }}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 800,
                              mb: 4,
                              color: COLORS.light,
                              fontSize: { xs: '1rem', md: '1.2rem' },
                              minHeight: '3.5rem',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              textTransform: 'uppercase'
                            }}
                          >
                            {res.Title}
                          </Typography>

                          <Button
                            onClick={() => handleDownload(res.FilePath)}
                            variant="contained"
                            startIcon={<CloudDownload />}
                            fullWidth
                            sx={{
                              background: COLORS.gold,
                              color: COLORS.dark,
                              py: 1.5,
                              fontWeight: 900,
                              borderRadius: '12px',
                              textTransform: 'uppercase',
                              '&:hover': { background: COLORS.light },
                            }}
                          >
                            Download
                          </Button>
                        </CardContent>
                      </Card>
                    </Box>
                  ))
                ) : (
                  <Box sx={{ gridColumn: '1 / -1', textAlign: 'center', py: 10, width: '100%' }}>
                    <Typography sx={{ color: 'rgba(244, 244, 244, 0.5)', fontStyle: 'italic' }}>
                      No documents found matching "{searchTerm}"
                    </Typography>
                  </Box>
                )}
              </AnimatePresence>
            </Box>

            {/* Dot Indicators */}
            {isMobile && filteredResources.length > 1 && (
              <Stack direction="row" spacing={1.5}>
                {filteredResources.map((_, i) => (
                  <Box
                    key={i}
                    sx={{
                      width: activeStep === i ? 24 : 8,
                      height: 8,
                      borderRadius: 4,
                      bgcolor: activeStep === i ? COLORS.gold : 'rgba(255, 255, 255, 0.2)',
                      transition: '0.4s all ease',
                    }}
                  />
                ))}
              </Stack>
            )}
          </Stack>
        )}
      </Container>

      <Box sx={{ height: '1px', background: `linear-gradient(90deg, transparent, ${COLORS.gold}, transparent)`, mt: 10, opacity: 0.3 }} />
      <Footer />
    </Box>
  );
};

export default Resources;