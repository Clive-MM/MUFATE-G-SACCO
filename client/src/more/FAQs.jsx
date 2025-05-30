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
    axios.get('http://localhost:5000/faqs')
      .then((res) => setFaqs(res.data.faqs))
      .catch((err) => console.error('❌ Failed to fetch FAQs:', err));
  }, []);

  return (
    <Box
      sx={{
        m: 0,
        p: 0,
        background: 'linear-gradient(to bottom right, #c0e0f7, #eaf6fb)',
        minHeight: '100vh',
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
        }}
      >
        {/* FAQ Section */}
        <Box
          sx={{
            flex: 1,
            px: { xs: 2, sm: 3, md: 5 },
            py: { xs: 2, sm: 3, md: 4 },
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            sx={{
              fontWeight: 'bold',
              mb: 3,
              color: '#003B49',
              textAlign: isMobile ? 'center' : 'left',
              textShadow: '1px 1px #b0c4de',
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
                  backgroundColor: hoveredIndex === index ? '#e0f7fa' : 'transparent',
                  boxShadow: hoveredIndex === index ? '0 0 12px rgba(0, 172, 193, 0.6)' : 'none',
                  transition: 'all 0.3s ease-in-out',
                  cursor: 'pointer',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#004D61',
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
                      color: '#00695C',
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
