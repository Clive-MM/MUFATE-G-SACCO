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
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

// Brand Colors (Aligned with Identity Section)
const BRAND = {
  gold: "#EC9B14",
  lightGold: "#FFC25F",
  dark: "#02150F",
  light: "#F4F4F4",
};

const DARK_BG = 'linear-gradient(135deg, #021409 0%, #013716 45%, #000a06 100%)';

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
    <Box sx={{ background: DARK_BG, py: { xs: 8, md: 12 }, width: '100%' }}>
      <Container maxWidth="xl">
        {/* Section Title */}
        <Typography
          variant="h2"
          textAlign="center"
          data-aos="fade-up"
          sx={{
            color: BRAND.gold,
            fontWeight: 900,
            mb: 10,
            textTransform: 'uppercase',
            fontSize: { xs: '2.2rem', md: '3.5rem' },
            letterSpacing: '0.1rem'
          }}
        >
          Our Products
        </Typography>

        {/* Products Grid - Centered & Responsive */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            justifyContent: 'center',
            gap: 4,
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          {products.map((product, index) => (
            <Card
              key={product.id}
              component={motion.div}
              whileHover={{ y: -10 }}
              data-aos="zoom-in"
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '24px',
                color: BRAND.light,
                transition: 'all 0.3s ease-in-out',
                height: '100%',
                display: 'flex',
                overflow: 'hidden'
              }}
            >
              <CardActionArea
                onClick={() => setSelectedProduct(index)}
                component={RouterLink}
                to={product.link}
                data-active={selectedProduct === index ? '' : undefined}
                sx={{
                  width: '100%',
                  p: { xs: 2, md: 4 },
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
                  minHeight: { md: '300px' }
                }}>
                  <Box sx={{ color: BRAND.gold, mb: 3 }}>
                    {product.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 800,
                      color: BRAND.gold,
                      mb: 2,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05rem'
                    }}
                  >
                    {product.title}
                  </Typography>
                  <Typography
                    sx={{
                      color: BRAND.light,
                      opacity: 0.8,
                      lineHeight: 1.8,
                      fontSize: '1rem',
                    }}
                  >
                    {product.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>

        {/* View More Button */}
        <Box textAlign="center" mt={10} data-aos="fade-up">
          <Button
            component={RouterLink}
            to="/products"
            variant="contained"
            sx={{
              backgroundImage: `linear-gradient(135deg, ${BRAND.gold}, ${BRAND.lightGold})`,
              color: BRAND.dark,
              fontWeight: 800,
              px: 6,
              py: 2,
              borderRadius: '50px',
              fontSize: '1rem',
              textTransform: 'uppercase',
              letterSpacing: 2,
              boxShadow: `0 8px 20px rgba(236, 155, 20, 0.3)`,
              transition: '0.3s ease',
              '&:hover': {
                backgroundImage: `linear-gradient(135deg, ${BRAND.lightGold}, ${BRAND.gold})`,
                boxShadow: `0 12px 25px ${BRAND.gold}66`,
                transform: 'translateY(-3px)',
              },
            }}
          >
            Explore All Products
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductsSection;