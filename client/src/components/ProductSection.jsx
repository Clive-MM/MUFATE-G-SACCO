import React, { useState, useRef } from 'react'; // Removed useEffect
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Button,
  Container,
  Stack,
  useTheme,
  useMediaQuery,
  // Removed CircularProgress
} from '@mui/material';
import { motion } from 'framer-motion';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Link as RouterLink } from 'react-router-dom';

const BRAND = {
  gold: "#EC9B14",
  lightGold: "#FFC25F",
  dark: "#02150F",
  light: "#F4F4F4",
};

const products = [
  {
    id: 0,
    title: 'Loan Products',
    description: 'Access affordable and flexible financing for personal growth, business expansion, and emergencies with member-friendly terms.',
    icon: <AccountBalanceIcon sx={{ fontSize: { xs: 40, md: 50 } }} />,
    link: '/products/fosa',
  },
  {
    id: 1,
    title: 'Savings Products',
    description: 'Achieve financial stability with tailored savings plans designed to help you grow your wealth and prepare for future goals.',
    icon: <SavingsIcon sx={{ fontSize: { xs: 40, md: 50 } }} />,
    link: '/products/savings',
  },
  {
    id: 2,
    title: 'Investment Solutions',
    description: 'Multiply your earnings through secure, high-yield investment opportunities that empower members to build long-term success.',
    icon: <TrendingUpIcon sx={{ fontSize: { xs: 40, md: 50 } }} />,
    link: '/products/bosa',
  },
];

const ProductsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState(0);
  const scrollRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleScroll = () => {
    if (scrollRef.current && isMobile) {
      const scrollPosition = scrollRef.current.scrollLeft;
      // Using clientWidth for more accurate snapping calculation
      const cardWidth = scrollRef.current.clientWidth * 0.88;
      const index = Math.round(scrollPosition / (cardWidth + 20)); // Added gap compensation
      if (index !== selectedProduct && index >= 0 && index < products.length) {
        setSelectedProduct(index);
      }
    }
  };

  return (
    <Box sx={{ bgcolor: BRAND.dark, py: { xs: 8, md: 15 }, width: '100%', overflow: 'hidden' }}>
      <Container maxWidth="xl">
        <Typography 
          variant="h2" 
          textAlign="center" 
          sx={{ 
            color: BRAND.gold, 
            fontWeight: 900, 
            mb: { xs: 6, md: 10 }, 
            textTransform: 'uppercase',
            fontSize: { xs: '2.2rem', md: '3.75rem' },
            letterSpacing: '0.1rem'
          }}
        >
          Our Products
        </Typography>

        <Stack spacing={4} alignItems="center">
          <Box
            ref={scrollRef}
            onScroll={handleScroll}
            sx={{
              width: '100%',
              display: isMobile ? 'flex' : 'grid',
              flexDirection: isMobile ? 'row' : 'unset',
              overflowX: isMobile ? 'auto' : 'visible',
              scrollSnapType: isMobile ? 'x mandatory' : 'none',
              gridTemplateColumns: {
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)'
              },
              gap: { xs: 2.5, md: 4 },
              maxWidth: '1200px',
              mx: 'auto',
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
            }}
          >
            {products.map((product, index) => (
              <Box 
                key={product.id} 
                sx={{ 
                  minWidth: isMobile ? '88%' : 'auto', 
                  scrollSnapAlign: 'center',
                  flexShrink: 0,
                  display: 'flex'
                }}
              >
                <Card 
                  component={motion.div}
                  whileHover={!isMobile ? { y: -10 } : {}}
                  sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.03)', 
                    border: selectedProduct === index ? `2.5px solid ${BRAND.gold}` : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '32px',
                    color: BRAND.light,
                    width: '100%',
                    minHeight: { xs: '360px', md: '450px' }, 
                    display: 'flex',
                    transition: 'border 0.4s ease, background 0.4s ease',
                    boxShadow: selectedProduct === index ? `0 15px 40px rgba(236, 155, 20, 0.15)` : 'none',
                  }}
                >
                  <CardActionArea 
                    component={RouterLink} 
                    to={product.link}
                    sx={{ display: 'flex', alignItems: 'center', height: '100%' }}
                  >
                    <CardContent sx={{ 
                      width: '100%',
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      textAlign: 'center',
                      p: { xs: 3, md: 5 }
                    }}>
                      <Box sx={{ color: BRAND.gold, mb: 3 }}>
                        {product.icon}
                      </Box>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          color: BRAND.gold, 
                          fontWeight: 900, 
                          mb: 2, 
                          textTransform: 'uppercase', 
                          fontSize: { xs: '1.2rem', md: '1.6rem' }
                        }}
                      >
                        {product.title}
                      </Typography>
                      
                      <Typography sx={{ 
                        opacity: 0.9, 
                        lineHeight: 1.6, 
                        fontSize: { xs: '0.88rem', md: '1.05rem' },
                        fontWeight: 500,
                        maxWidth: { xs: '260px', md: '100%' }, 
                        mx: 'auto',
                        mb: 3
                      }}>
                        {product.description}
                      </Typography>

                      <Box sx={{ 
                        mt: 'auto', 
                        display: 'flex', 
                        alignItems: 'center', 
                        color: BRAND.gold,
                        fontWeight: 700,
                        fontSize: '0.85rem'
                      }}>
                        EXPLORE <ArrowForwardIcon sx={{ ml: 1, fontSize: 18 }} />
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            ))}
          </Box>

          {isMobile && (
            <Stack direction="row" spacing={1.5} sx={{ mt: 1 }}>
              {products.map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    width: selectedProduct === i ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    bgcolor: selectedProduct === i ? BRAND.gold : 'rgba(255, 255, 255, 0.2)',
                    transition: '0.4s all ease',
                  }}
                />
              ))}
            </Stack>
          )}

          <Box mt={{ xs: 2, md: 4 }}>
            <Button
              component={RouterLink}
              to="/products/bosa"
              variant="contained"
              sx={{
                bgcolor: BRAND.gold,
                color: BRAND.dark,
                fontWeight: 900,
                px: { xs: 6, md: 10 },
                py: 2.5,
                borderRadius: '4px',
                fontSize: '1rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                '&:hover': {
                  bgcolor: BRAND.light,
                  boxShadow: `0 0 30px ${BRAND.gold}`,
                },
              }}
            >
              View All Products
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default ProductsSection;