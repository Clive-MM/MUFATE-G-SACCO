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

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    axios.get('https://mufate-g-sacco.onrender.com/faqs')
      .then((res) => setFaqs(res.data.faqs))
      .catch((err) => console.error('❌ Failed to fetch FAQs:', err));
  }, []);

  return (
    <Box
      sx={{
        m: 0,
        p: 0,
        background: 'linear-gradient(to bottom right, #2e7d32,rgba(10, 245, 18, 0.83))',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
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
        {/* FAQ Section with SACCO Gradient + Glass Effect */}
        <Box
          sx={{
            flex: 1,
            px: { xs: 2, sm: 3, md: 5 },
            py: { xs: 2, sm: 3, md: 4 },
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            color: '#003B49',
          }}
        >
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            sx={{
              fontWeight: 'bold',
              mb: 3,
              color: '#ffffff',
              textAlign: isMobile ? 'center' : 'left',
              textShadow: '1px 1px rgba(0,0,0,0.3)',
            }}
          >
            Frequently Asked Questions
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {faqs.map((faq, index) => (
              <Box
                key={faq.FAQID}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                sx={{
                  p: 2,
                  borderRadius: '10px',
                  backgroundColor: hoveredIndex === index ? 'rgba(255,255,255,0.25)' : 'transparent',
                  boxShadow: hoveredIndex === index ? '0 0 12px rgba(255, 255, 255, 0.3)' : 'none',
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#ffffff',
                    transition: 'color 0.3s',
                    textAlign: 'left',
                  }}
                >
                  • {faq.Question}
                </Typography>
                {hoveredIndex === index && (
                  <Typography
                    sx={{
                      mt: 1,
                      fontSize: '0.95rem',
                      color: '#e0f2f1',
                      pl: 2,
                      animation: 'fadeIn 0.4s ease-in-out',
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
            height: { xs: 250, sm: 300, md: '100%' },
            objectFit: 'cover',
            filter: 'grayscale(100%)',
            borderTop: { xs: '1px solid #ccc', md: 'none' },
          }}
          image="https://res.cloudinary.com/djydkcx01/image/upload/v1748525338/ChatGPT_Image_May_29_2025_04_28_37_PM_ditgts.png"
          alt="Support Agent"
        />
      </Card>

      <Footer />
    </Box>
  );
};

export default FAQs;
