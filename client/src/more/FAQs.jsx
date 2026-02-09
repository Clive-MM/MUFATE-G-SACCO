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

// Updated constants to match Footer BRAND colors exactly
const BRAND_GOLD = '#EC9B14';
const BRAND_DARK = '#02150F';
const BRAND_TEXT_LIGHT = '#F4F4F4';
const BRAND_TEXT_MUTED = 'rgba(244, 244, 244, 0.6)';

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
        // Background matches footer color exactly
        backgroundColor: BRAND_DARK,
      }}
    >
      <Card
        sx={{
          m: 0,
          borderRadius: 0,
          boxShadow: 0,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          height: { xs: 'auto', md: '75vh' }, // Slightly increased to fit content
          backgroundColor: 'transparent',
          borderBottom: `1px solid rgba(255,255,255,0.05)`,
        }}
      >
        {/* FAQ Section */}
        <Box
          sx={{
            flex: 1,
            px: { xs: 2.5, sm: 3, md: 5 },
            py: { xs: 5, sm: 6, md: 8 },
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: BRAND_DARK,
            borderRight: { xs: 'none', md: `1px solid rgba(255, 255, 255, 0.05)` },
          }}
        >
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            sx={{
              fontWeight: 900, // Matches footer weight
              mb: 4,
              color: BRAND_GOLD,
              textAlign: isMobile ? 'center' : 'left',
              letterSpacing: '2px', // Matches footer letter spacing
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
                  borderRadius: '8px',
                  backgroundColor:
                    hoveredIndex === index
                      ? 'rgba(236, 155, 20, 0.05)'
                      : 'transparent',
                  border:
                    hoveredIndex === index
                      ? `1px solid ${BRAND_GOLD}`
                      : '1px solid rgba(255,255,255,0.05)',
                  transition: '0.3s ease',
                  cursor: 'pointer',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: hoveredIndex === index ? BRAND_GOLD : BRAND_TEXT_LIGHT,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.5,
                    transition: '0.3s',
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      mt: '7px',
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: BRAND_GOLD,
                      flexShrink: 0,
                    }}
                  />
                  <span>{faq.Question}</span>
                </Typography>

                {hoveredIndex === index && (
                  <Typography
                    sx={{
                      mt: 1.5,
                      fontSize: '0.88rem',
                      color: BRAND_TEXT_MUTED, // Matches footer text muted style
                      pl: 3,
                      lineHeight: 1.8,
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
            flex: 1,
            height: { xs: 300, sm: 350, md: '100%' },
            objectFit: 'cover',
            filter: 'brightness(0.6) grayscale(100%)', 
            borderTop: { xs: `1px solid rgba(255,255,255,0.05)`, md: 'none' },
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