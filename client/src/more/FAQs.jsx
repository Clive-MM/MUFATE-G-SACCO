import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from '@mui/material';
import axios from 'axios';
import Footer from '../components/Footer';

const FAQs = () => {
  const theme = useTheme();
  const [faqs, setFaqs] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/faqs')
      .then((res) => setFaqs(res.data.faqs))
      .catch((err) => console.error('❌ Failed to fetch FAQs:', err));
  }, []);

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, rgb(189, 225, 237), rgb(233, 241, 250))',
        px: { xs: 2, md: 8 },
        py: { xs: 4, md: 6 },
        borderRadius: '16px',
        minHeight: '75vh',
        overflow: 'hidden',
      }}
    >
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, boxShadow: 4 }}>
        {/* Left Side: FAQs */}
        <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 3 }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 3, color: '#003B49' }}>
              Frequently Asked Questions (FAQS)
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {faqs.map((faq, index) => (
                <Box
                  key={faq.FAQID}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  sx={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
                >
                  <Typography sx={{ fontSize: '1.1rem', fontWeight: 500, color: '#004D61' }}>
                    • {faq.Question}
                  </Typography>
                  {hoveredIndex === index && (
                    <Typography
                      sx={{
                        mt: 1,
                        fontSize: '0.95rem',
                        color: '#00695C',
                        transition: 'opacity 0.3s ease-in-out',
                        pl: 2,
                      }}
                    >
                      {faq.Answer}
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
          </CardContent>
        </Box>

        {/* Right Side: Image */}
        <CardMedia
          component="img"
          sx={{
            width: { xs: '100%', md: 350 },
            objectFit: 'cover',
            filter: 'grayscale(100%)',
            borderTopRightRadius: { md: '16px' },
            borderBottomRightRadius: { md: '16px' },
            borderBottomLeftRadius: { xs: '16px', md: 0 },
          }}
          image="https://res.cloudinary.com/djydkcx01/image/upload/v1748525338/ChatGPT_Image_May_29_2025_04_28_37_PM_ditgts.png"
          alt="Support Agent"
        />
      </Card>
      <Footer/>
    </Box>
  );
};

export default FAQs;
