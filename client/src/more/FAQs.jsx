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

const BRAND_GOLD = '#EC9B14';
const BRAND_DARK = '#02150F';
const BRAND_TEXT_LIGHT = '#F4F4F4';
const BRAND_TEXT_MUTED = 'rgba(244, 244, 244, 0.6)';

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const theme = useTheme();
  // Fixed: isMobile is now used below to handle responsive spacing/alignment
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
        backgroundColor: BRAND_DARK,
        // Using isMobile logic or standard responsive objects
        pt: isMobile ? '80px' : '100px', 
      }}
    >
      {/* SECTION TITLE */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: 900,
          textTransform: 'uppercase',
          mt: isMobile ? 2 : 4, // Used isMobile here
          mb: 6,
          px: 2,
          letterSpacing: '3px',
          color: BRAND_GOLD,
          fontSize: { xs: '1.5rem', md: '2.2rem' },
          textShadow: `0 0 15px ${BRAND_GOLD}33`,
        }}
      >
        Frequently Asked Questions
      </Typography>

      <Card
        sx={{
          mx: { xs: 2, md: 5 },
          mb: 8,
          borderRadius: '16px',
          boxShadow: 0,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: { xs: 'auto', md: '65vh' }, 
          backgroundColor: 'rgba(255, 255, 255, 0.02)',
          border: `1px solid rgba(255,255,255,0.05)`,
          overflow: 'hidden',
        }}
      >
        {/* FAQ List Section */}
        <Box
          sx={{
            flex: 1.2,
            px: { xs: 2.5, sm: 3, md: 5 },
            py: { xs: 4, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {faqs.map((faq, index) => (
              <Box
                key={faq.FAQID}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                sx={{
                  p: 2.5,
                  borderRadius: '12px',
                  backgroundColor:
                    hoveredIndex === index
                      ? 'rgba(236, 155, 20, 0.08)'
                      : 'transparent',
                  border:
                    hoveredIndex === index
                      ? `1px solid ${BRAND_GOLD}`
                      : '1px solid rgba(255,255,255,0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: hoveredIndex === index ? BRAND_GOLD : BRAND_TEXT_LIGHT,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      backgroundColor: BRAND_GOLD,
                      flexShrink: 0,
                      boxShadow: hoveredIndex === index ? `0 0 10px ${BRAND_GOLD}` : 'none',
                    }}
                  />
                  {faq.Question}
                </Typography>

                {hoveredIndex === index && (
                  <Typography
                    sx={{
                      mt: 2,
                      fontSize: '0.9rem',
                      color: BRAND_TEXT_MUTED,
                      pl: 3.5,
                      lineHeight: 1.7,
                    }}
                  >
                    {faq.Answer}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Image Section */}
        <CardMedia
          component="img"
          sx={{
            flex: 0.8,
            height: { xs: 300, md: 'auto' },
            minHeight: '400px',
            objectFit: 'cover',
            filter: 'brightness(0.7) grayscale(30%)',
            transition: '0.5s ease',
            '&:hover': {
                filter: 'brightness(0.9) grayscale(0%)',
            }
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