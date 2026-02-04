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

// Colors pulled exactly from your Footer BRAND object
const BRAND_DARK = '#02150F';
const BRAND_GOLD = '#EC9B14';
const BRAND_TEXT_MUTED = 'rgba(244, 244, 244, 0.6)';
const BRAND_LIGHT = '#F4F4F4';

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
        // Changed main background to match Footer
        backgroundColor: BRAND_DARK,
      }}
    >
      <Card
        sx={{
          m: 0,
          borderRadius: 0,
          boxShadow: 0, // Set to 0 to blend with footer
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          height: { xs: 'auto', md: '70vh' },
          backgroundColor: BRAND_DARK, // Match Footer
        }}
      >
        {/* FAQ Section */}
        <Box
          sx={{
            flex: 1,
            px: { xs: 2.5, sm: 3, md: 5 },
            py: { xs: 5, sm: 6, md: 8 }, // Adjusted to align top levels
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start', // Align to top for horizontal parity with image
            background: BRAND_DARK, // Match Footer
            borderRight: { xs: 'none', md: `1px solid rgba(255, 255, 255, 0.05)` },
          }}
        >
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            sx={{
              fontWeight: 900, // Matches footer weight
              mb: 4,
              color: BRAND_GOLD, // Match Footer Gold
              textAlign: isMobile ? 'center' : 'left',
              letterSpacing: '0.03em',
              textTransform: 'uppercase', // Match footer heading style
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
                      ? 'rgba(236, 155, 20, 0.08)' // Themed hover
                      : 'transparent',
                  border:
                    hoveredIndex === index
                      ? `1px solid ${BRAND_GOLD}`
                      : '1px solid rgba(255,255,255,0.05)',
                  transition: 'all 0.25s ease-in-out',
                  cursor: 'pointer',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.05rem',
                    fontWeight: 600,
                    color: hoveredIndex === index ? BRAND_GOLD : BRAND_LIGHT,
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
                      backgroundColor: BRAND_GOLD,
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
                      color: BRAND_TEXT_MUTED, // Match footer text style
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

        {/* Image Section - Aligned to same level */}
        <Box 
          sx={{ 
            flex: 1, 
            pt: { xs: 0, md: 8 }, // Top padding matches FAQ section for horizontal level
            backgroundColor: BRAND_DARK 
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: '100%',
              height: { xs: 260, sm: 320, md: '100%' },
              objectFit: 'cover',
              filter: 'grayscale(100%) brightness(0.7)', // Slightly darker to blend with background
              borderTop: { xs: `1px solid rgba(255,255,255,0.05)`, md: 'none' },
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