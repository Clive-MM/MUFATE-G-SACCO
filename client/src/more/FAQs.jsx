import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardMedia,
  Typography,
  useTheme,
  useMediaQuery,
  Container
} from '@mui/material';
import axios from 'axios';
import Footer from '../components/Footer';

// Using BRAND constants to match Footer exactly
const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.6)',
  success: '#25D366'
};

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
        bgcolor: BRAND.dark, // Same background as Footer
        fontFamily: "'Inter', sans-serif", // Standardizing font
      }}
    >
      <Card
        sx={{
          m: 0,
          borderRadius: 0,
          boxShadow: 'none', // Removed shadow for flat footer-like look
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          height: { xs: 'auto', md: '80vh' },
          backgroundColor: BRAND.dark,
          borderBottom: `1px solid rgba(255,255,255,0.05)`, // Matches Footer's border style
        }}
      >
        {/* FAQ Section */}
        <Box
          sx={{
            flex: 1,
            px: { xs: 2.5, sm: 3, md: 8 }, // Balanced padding
            py: { xs: 5, md: 10 }, // Aligned vertical level
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start', // Starts items from top
            bgcolor: BRAND.dark,
          }}
        >
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            sx={{
              fontWeight: 900,
              mb: 5,
              color: BRAND.gold,
              textAlign: isMobile ? 'center' : 'left',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            Frequently Asked Questions
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                  border: `1px solid ${
                    hoveredIndex === index ? BRAND.gold : 'rgba(255,255,255,0.05)'
                  }`,
                  transition: '0.3s ease',
                  cursor: 'pointer',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: hoveredIndex === index ? BRAND.gold : BRAND.light,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      backgroundColor: BRAND.gold,
                      flexShrink: 0,
                    }}
                  />
                  {faq.Question}
                </Typography>

                {hoveredIndex === index && (
                  <Typography
                    sx={{
                      mt: 2,
                      fontSize: '0.88rem',
                      color: BRAND.textMuted,
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

        {/* Image Section - Aligned to start at the same top level */}
        <Box 
          sx={{ 
            flex: 1, 
            height: '100%',
            pt: { xs: 0, md: 10 }, // Matches the py of the FAQ Section to align tops
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: '90%', // Slightly smaller to create "breathing room"
              height: { xs: 350, md: '70%' },
              margin: '0 auto',
              objectFit: 'cover',
              borderRadius: '20px', // Softer modern look
              filter: 'grayscale(40%) brightness(0.8)', // Blends better with dark theme
              border: `1px solid rgba(236, 155, 20, 0.2)`,
            }}
            image="https://res.cloudinary.com/djydkcx01/image/upload/v1755502358/ChatGPT_Image_Aug_18_2025_10_32_14_AM_zmmyks.png"
            alt="Support Agent"
          />
        </Box>
      </Card>

      <Footer />
    </Box>
  );
};

export default FAQs;