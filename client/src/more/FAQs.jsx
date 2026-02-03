import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardMedia,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import axios from 'axios';
import Footer from '../components/Footer';

const GOLD = '#EC9B14'; // Standardized brand gold
const LIGHT_GOLD = '#FFEFA8';
const DEEP_DARK = '#02150F'; // Unified background color

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    axios
      .get('https://mufate-g-sacco.onrender.com/faqs')
      .then((res) => setFaqs(res.data.faqs))
      .catch((err) => console.error('❌ Failed to fetch FAQs:', err));
  }, []);

  return (
    <Box
      sx={{
        m: 0,
        p: 0,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: DEEP_DARK, // Uniform background color
      }}
    >
      <Card
        sx={{
          m: 0,
          borderRadius: 0,
          boxShadow: 'none',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          height: { xs: 'auto', md: '100vh' }, 
          backgroundColor: 'transparent',
          overflow: 'hidden', // Ensures "at a glance" fit
        }}
      >
        {/* FAQ Section */}
        <Box
          sx={{
            flex: 1,
            // Offset to prevent the header from being hidden behind the navbar
            pt: { xs: 12, md: 18 }, 
            px: { xs: 2.5, sm: 3, md: 5 },
            pb: { xs: 4, md: 4 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRight: { xs: 'none', md: `1px solid rgba(236, 155, 20, 0.15)` },
          }}
        >
          <Typography
            variant={isMobile ? 'h5' : 'h3'}
            sx={{
              fontWeight: 900,
              mb: 4,
              color: GOLD,
              textAlign: isMobile ? 'center' : 'left',
              textShadow: '0 0 15px rgba(0,0,0,0.8)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
            }}
          >
            Frequently Asked Questions
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {faqs.map((faq, index) => (
              <Box
                key={faq.FAQID}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                sx={{
                  p: 2,
                  borderRadius: '12px',
                  backgroundColor:
                    hoveredIndex === index
                      ? 'rgba(236, 155, 20, 0.1)'
                      : 'transparent',
                  border:
                    hoveredIndex === index
                      ? `1.5px solid ${GOLD}`
                      : '1.5px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: GOLD,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.5,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      mt: '8px',
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: GOLD,
                      flexShrink: 0,
                      boxShadow: hoveredIndex === index ? `0 0 8px ${GOLD}` : 'none',
                    }}
                  />
                  <span>{faq.Question}</span>
                </Typography>

                {hoveredIndex === index && (
                  <Box
                    component="div"
                    sx={{
                      mt: 1.5,
                      overflow: 'hidden',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '1rem',
                        color: LIGHT_GOLD,
                        pl: 3.5,
                        lineHeight: 1.6,
                      }}
                    >
                      {faq.Answer}
                    </Typography>
                  </Box>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Image Section - Maintained as original */}
        <CardMedia
          component="img"
          sx={{
            flex: 1,
            height: { xs: 300, md: '100%' },
            objectFit: 'cover',
            filter: 'grayscale(100%) contrast(1.1) brightness(0.7)',
            borderLeft: { xs: 'none', md: `1px solid ${GOLD}33` },
          }}
          image="https://res.cloudinary.com/djydkcx01/image/upload/v1755502358/ChatGPT_Image_Aug_18_2025_10_32_14_AM_zmmyks.png"
          alt="Support Agent"
        />
      </Card>

      <Footer />
    </Box>
  );
};

export default FAQs;