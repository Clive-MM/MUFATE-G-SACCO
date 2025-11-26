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

const GOLD = '#FFD700';
const LIGHT_GOLD = '#FFEFA8';
const DEEP_GREEN = '#004225';

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
        background: `linear-gradient(135deg, #02160c 0%, ${DEEP_GREEN} 45%, #001009 100%)`,
      }}
    >
      <Card
        sx={{
          m: 0,
          borderRadius: 0,
          boxShadow: 6,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          height: { xs: 'auto', md: '70vh' },
          backgroundColor: 'transparent',
        }}
      >
        {/* FAQ Section */}
        <Box
          sx={{
            flex: 1,
            px: { xs: 2.5, sm: 3, md: 5 },
            py: { xs: 2.5, sm: 3, md: 4 },
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRight: { xs: 'none', md: `1px solid rgba(255, 215, 0, 0.25)` },
          }}
        >
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            sx={{
              fontWeight: 800,
              mb: 3,
              color: GOLD,
              textAlign: isMobile ? 'center' : 'left',
              textShadow: '0 0 10px rgba(0,0,0,0.8)',
              letterSpacing: '0.03em',
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
                  p: 1.8,
                  borderRadius: '12px',
                  backgroundColor:
                    hoveredIndex === index
                      ? 'rgba(255, 215, 0, 0.08)'
                      : 'transparent',
                  border:
                    hoveredIndex === index
                      ? `1px solid rgba(255, 215, 0, 0.4)`
                      : '1px solid rgba(255,255,255,0.06)',
                  boxShadow:
                    hoveredIndex === index
                      ? '0 0 18px rgba(0,0,0,0.7)'
                      : 'none',
                  transition: 'all 0.25s ease-in-out',
                  cursor: 'pointer',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: GOLD,
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1,
                  }}
                >
                  <Box
                    component="span"
                    sx={{
                      mt: '6px',
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      backgroundColor: GOLD,
                      flexShrink: 0,
                    }}
                  />
                  <span>{faq.Question}</span>
                </Typography>

                {hoveredIndex === index && (
                  <Typography
                    sx={{
                      mt: 1,
                      fontSize: '0.95rem',
                      color: LIGHT_GOLD,
                      pl: 3,
                      lineHeight: 1.5,
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
            height: { xs: 260, sm: 320, md: '100%' },
            objectFit: 'cover',
            filter: 'grayscale(100%)',
            borderTop: { xs: `1px solid rgba(255,215,0,0.35)`, md: 'none' },
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
