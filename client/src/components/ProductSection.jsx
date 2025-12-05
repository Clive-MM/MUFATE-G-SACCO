import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Button
} from '@mui/material';

import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link as RouterLink } from 'react-router-dom';

import './ProductsSection.css';

// Brand colors
const GOLD = '#FFD700';
const LIGHT_GOLD = '#FFE066';
const DEEP_GREEN = '#006400';
const DARK_BG = 'linear-gradient(135deg, #021409 0%, #013716 45%, #000a06 100%)';

const products = [
  {
    id: 1,
    title: 'Loan Products',
    description: 'Access affordable and flexible financing with our loan solutions.',
    icon: <SavingsIcon sx={{ fontSize: 55, color: GOLD }} />
  },
  {
    id: 2,
    title: 'Savings Solutions',
    description: 'Grow your wealth with rewarding and secure savings plans.',
    icon: <AccountBalanceIcon sx={{ fontSize: 55, color: GOLD }} />
  },
  {
    id: 3,
    title: 'Investment Options',
    description: 'Build a prosperous future with high-potential investment products.',
    icon: <TrendingUpIcon sx={{ fontSize: 55, color: GOLD }} />
  }
];

const ProductsSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <Box
      id="products"
      sx={{
        py: 10,
        px: { xs: 2, md: 6 },
        background: DARK_BG,
      }}
    >
      {/* Section Title */}
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          fontWeight: 800,
          mb: 6,
          color: 'transparent',
          backgroundImage: `linear-gradient(to right, ${GOLD}, ${LIGHT_GOLD})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: 1.5,
          textTransform: 'uppercase'
        }}
      >
        Our Products
      </Typography>

      {/* Product Grid */}
      <Box
        sx={{
          display: 'grid',
          gap: 4,
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
        }}
      >
        {products.map((product) => (
          <Card
            key={product.id}
            data-aos="fade-up"
            sx={{
              background: 'rgba(255, 255, 255, 0.06)',
              borderRadius: '18px',
              border: `1.8px solid rgba(255, 215, 0, 0.45)`,
              backdropFilter: 'blur(7px)',
              transition: '0.35s ease',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.55)',
              '&:hover': {
                transform: 'translateY(-8px) scale(1.02)',
                boxShadow:
                  '0 24px 36px rgba(0,0,0,0.7), 0 0 25px rgba(255,215,0,0.9)',
                border: `1.8px solid ${GOLD}`,
              },
            }}
          >
            <CardActionArea component={RouterLink} to={`/products/${product.id}`}>
              <CardContent sx={{ textAlign: 'center', py: 5 }}>
                {product.icon}

                <Typography
                  variant="h6"
                  sx={{
                    mt: 2,
                    fontWeight: 700,
                    color: GOLD,
                    textShadow: '0 0 12px rgba(255,215,0,0.65)',
                  }}
                >
                  {product.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    mt: 1.5,
                    color: LIGHT_GOLD,
                    opacity: 0.85,
                  }}
                >
                  {product.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>

      {/* CTA Button */}
      <Box textAlign="center" mt={6}>
        <Button
          component={RouterLink}
          to="/products"
          variant="contained"
          sx={{
            py: 1.2,
            px: 4,
            borderRadius: '10px',
            fontWeight: 700,
            backgroundImage: `linear-gradient(135deg, ${GOLD}, ${LIGHT_GOLD})`,
            color: DEEP_GREEN,
            boxShadow: '0 0 18px rgba(255,215,0,0.9)',
            '&:hover': {
              backgroundImage: `linear-gradient(135deg, ${LIGHT_GOLD}, ${GOLD})`,
              boxShadow: '0 0 30px rgba(255,215,0,1)',
              transform: 'translateY(-2px)',
            },
          }}
        >
          Explore All Products
        </Button>
      </Box>
    </Box>
  );
};

export default ProductsSection;
