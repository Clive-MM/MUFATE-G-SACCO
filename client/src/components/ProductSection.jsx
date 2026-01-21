import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Button,
  Container,
} from '@mui/material';
import { motion } from 'framer-motion';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link as RouterLink } from 'react-router-dom';

// Identical Brand Palette
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
    icon: <AccountBalanceIcon sx={{ fontSize: 50 }} />,
    link: '/products/loan-products',
  },
  {
    id: 1,
    title: 'Savings Products',
    description: 'Achieve financial stability with tailored savings plans designed to help you grow your wealth and prepare for future goals.',
    icon: <SavingsIcon sx={{ fontSize: 50 }} />,
    link: '/products/savings-products',
  },
  {
    id: 2,
    title: 'Investment Solutions',
    description: 'Multiply your earnings through secure, high-yield investment opportunities that empower members to build long-term success.',
    icon: <TrendingUpIcon sx={{ fontSize: 50 }} />,
    link: '/products/investment-solutions',
  },
];

const ProductsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    // Matching the background and padding of SaccoIdentitySection
    <Box sx={{ bgcolor: BRAND.dark, py: { xs: 8, md: 12 }, width: '100%' }}>
      <Container maxWidth="xl">
        {/* Section Title - Identical Styling */}
        <Typography 
          variant="h2" 
          textAlign="center" 
          data-aos="fade-up"
          sx={{ 
            color: BRAND.gold, 
            fontWeight: 900, 
            mb: 10, 
            textTransform: 'uppercase',
            fontSize: { xs: '2.5rem', md: '3.75rem' } // Standardized size
          }}
        >
          Our Products
        </Typography>

        {/* Products Grid - Using identical Grid logic */}
        <Box
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            justifyContent: 'center', 
            gap: 4,
            maxWidth: '1200px',
            mx: 'auto' 
          }}
        >
          {products.map((product, index) => (
            <Card 
              key={product.id}
              component={motion.div}
              whileHover={{ y: -8 }}
              data-aos="zoom-in"
              sx={{ 
                bgcolor: 'rgba(255, 255, 255, 0.03)', 
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                color: BRAND.light,
                transition: 'all 0.3s ease-in-out',
                height: '100%',
                display: 'flex',
                boxShadow: 'none',
              }}
            >
              <CardActionArea
                onClick={() => setSelectedProduct(index)}
                component={RouterLink}
                to={product.link}
                data-active={selectedProduct === index ? '' : undefined}
                sx={{
                  width: '100%',
                  p: 3, // Matching SaccoIdentitySection padding
                  '&[data-active]': {
                    backgroundColor: 'rgba(236, 155, 20, 0.08)',
                    borderColor: BRAND.gold,
                    boxShadow: `0 0 20px rgba(236, 155, 20, 0.1)`,
                  },
                }}
              >
                <CardContent sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  textAlign: 'center',
                }}>
                  <Box sx={{ color: BRAND.gold, mb: 3 }}>
                    {product.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: BRAND.gold, 
                      fontWeight: 800, 
                      mb: 3, 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.1rem' 
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Box sx={{ opacity: 0.8, lineHeight: 1.8, fontSize: '1.05rem' }}>
                    {product.description}
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>

        {/* Action Button - Styled to match the brand identity */}
        <Box textAlign="center" mt={8} data-aos="fade-up">
          <Button
            component={RouterLink}
            to="/products"
            variant="contained"
            sx={{
              bgcolor: BRAND.gold,
              color: BRAND.dark,
              fontWeight: 800,
              px: 5,
              py: 1.5,
              borderRadius: '50px',
              fontSize: '1rem',
              textTransform: 'uppercase',
              '&:hover': {
                bgcolor: BRAND.lightGold,
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 20px ${BRAND.gold}44`,
              },
            }}
          >
            View All Products
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductsSection;