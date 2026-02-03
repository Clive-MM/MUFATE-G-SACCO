import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardMedia,
  Typography,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from '../components/Footer';

// Standardized Brand Colors
const COLORS = {
  gold: '#EC9B14',      
  dark: '#02150F',      
  light: '#F4F4F4',
  textMuted: '#FFECA8',
  cardGlass: 'rgba(255, 255, 255, 0.03)',
};

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    axios
      .get('https://mufate-g-sacco.onrender.com/faqs')
      .then((res) => {
        setFaqs(res.data.faqs);
        setLoading(false);
      })
      .catch((err) => {
        console.error('❌ Failed to fetch FAQs:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ py: 10, textAlign: 'center', background: COLORS.dark, minHeight: '100vh' }}>
        <CircularProgress sx={{ color: COLORS.gold }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        m: 0,
        p: 0,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: COLORS.dark, // Unified background
      }}
    >
      <Card
        sx={{
          m: 0,
          borderRadius: 0,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          height: { xs: 'auto', md: '100vh' },
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }}
      >
        {/* FAQ Text Content Section */}
        <Box
          sx={{
            flex: 1,
            // Standardized Navbar clearance: pt: 14 for mobile, 20 for desktop
            pt: { xs: 14, md: 20 }, 
            pb: { xs: 6, md: 8 },
            px: { xs: 3, sm: 5, md: 8 },
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            background: 'linear-gradient(to right, rgba(0,0,0,0.4), transparent)',
            borderRight: { xs: 'none', md: `1px solid rgba(236, 155, 20, 0.1)` },
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant={isMobile ? 'h5' : 'h3'}
              sx={{
                fontWeight: 900,
                mb: 6,
                color: COLORS.gold,
                textAlign: isMobile ? 'center' : 'left',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                textShadow: `0 0 15px ${COLORS.gold}33`,
              }}
            >
              Frequently Asked Questions
            </Typography>
          </motion.div>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.FAQID}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Box
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  sx={{
                    p: 2.5,
                    borderRadius: '16px',
                    backgroundColor: hoveredIndex === index ? 'rgba(236, 155, 20, 0.08)' : COLORS.cardGlass,
                    border: hoveredIndex === index 
                      ? `1px solid ${COLORS.gold}66` 
                      : `1px solid rgba(255,255,255,0.05)`,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    cursor: 'pointer',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: hoveredIndex === index ? COLORS.gold : COLORS.light,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        backgroundColor: COLORS.gold,
                        flexShrink: 0,
                        boxShadow: hoveredIndex === index ? `0 0 10px ${COLORS.gold}` : 'none',
                      }}
                    />
                    {faq.Question}
                  </Typography>

                  <AnimatePresence>
                    {hoveredIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Typography
                          sx={{
                            mt: 2,
                            fontSize: '0.95rem',
                            color: COLORS.textMuted,
                            pl: 3,
                            lineHeight: 1.7,
                            borderLeft: `2px solid ${COLORS.gold}33`,
                          }}
                        >
                          {faq.Answer}
                        </Typography>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Box>
              </motion.div>
            ))}
          </Box>
        </Box>

        {/* Support Image Section */}
        <Box 
          sx={{ 
            flex: 1, 
            position: 'relative',
            display: { xs: 'none', md: 'block' } // Optional: hide on mobile to focus on text
          }}
        >
          <CardMedia
            component="img"
            sx={{
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              filter: 'grayscale(100%) contrast(1.1) brightness(0.7)',
            }}
            image="https://res.cloudinary.com/djydkcx01/image/upload/v1755502358/ChatGPT_Image_Aug_18_2025_10_32_14_AM_zmmyks.png"
            alt="Support Agent"
          />
          {/* Brand Overlay Gradient */}
          <Box 
            sx={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              background: `linear-gradient(to right, ${COLORS.dark}, transparent)`,
            }} 
          />
        </Box>
      </Card>

      <Footer />
    </Box>
  );
};

export default FAQs;