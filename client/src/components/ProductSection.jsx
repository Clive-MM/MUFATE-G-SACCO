import React, {  useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Button,
} from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link as RouterLink } from 'react-router-dom';

// Brand Colors
const GOLD = '#FFD700';
const LIGHT_GOLD = '#FFE066';
// const DEEP_GREEN = '#006400';
const DARK_BG =
  'linear-gradient(135deg, #021409 0%, #013716 45%, #000a06 100%)';

// Product List
const products = [
  {
    id: 1,
    title: 'Loan Products',
    description:
      'Access affordable and flexible financing for personal growth, business expansion, and emergencies. Our loan solutions come with competitive rates and member-friendly repayment terms.',
    icon: <AccountBalanceIcon sx={{ fontSize: 52, color: GOLD }} />,
    link: '/products/loan-products',
  },
  {
    id: 2,
    title: 'Savings Products',
    description:
      'Achieve financial stability with our tailored savings plans designed to help you grow your wealth and prepare for future goals with confidence.',
    icon: <SavingsIcon sx={{ fontSize: 52, color: GOLD }} />,
    link: '/products/savings-products',
  },
  {
    id: 3,
    title: 'Investment Solutions',
    description:
      'Multiply your earnings through secure, high-yield investment opportunities that empower members to build long-term financial success.',
    icon: <TrendingUpIcon sx={{ fontSize: 52, color: GOLD }} />,
    link: '/products/investment-solutions',
  },
];

const ProductsSection = () => {
  useEffect(() => {
    AOS.init({ duration: 1200 });
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        py: 10,
        px: { xs: 3, md: 8 },
        background: DARK_BG,
      }}
    >
      {/* Section Title */}
      <Typography
        variant="h4"
        data-aos="fade-up"
        sx={{
          fontWeight: 800,
          textAlign: 'center',
          mb: 6,
          textTransform: 'uppercase',
          letterSpacing: 1.5,
          color: 'transparent',
          backgroundImage: `linear-gradient(to right, ${GOLD}, ${LIGHT_GOLD})`,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: { xs: '1.9rem', md: '2.4rem' },
          textShadow: `0 0 12px ${GOLD}88`,
        }}
      >
        Our Products
      </Typography>

      {/* Products Grid */}
      <Box
        sx={{
          display: 'grid',
          gap: 4,
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        {products.map((product) => (
          <Card
            key={product.id}
            data-aos="zoom-in"
            sx={{
              background:
                'linear-gradient(145deg, rgba(0,40,20,0.35), rgba(0,0,0,0.45))',
              borderRadius: '18px',
              border: `1.5px solid ${GOLD}44`,
              boxShadow: `0 12px 22px rgba(0,0,0,0.65)`,
              transition: '0.35s ease',
              '&:hover': {
                transform: 'translateY(-8px)',
                border: `1.5px solid ${GOLD}`,
                boxShadow: `0 18px 38px rgba(0,0,0,0.9), 
                            0 0 22px ${GOLD}AA`,
              },
            }}
          >
            <CardActionArea component={RouterLink} to={product.link}>
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Box sx={{ mb: 2 }}>{product.icon}</Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    color: GOLD,
                    textShadow: `0 0 8px ${GOLD}55`,
                    mb: 1,
                  }}
                >
                  {product.title}
                </Typography>
                <Typography
                  sx={{
                    color: LIGHT_GOLD,
                    opacity: 0.9,
                    fontSize: '0.95rem',
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
      <Box textAlign="center" mt={6} data-aos="fade-up">
        <Button
          component={RouterLink}
          to="/products"
          variant="contained"
          sx={{
            backgroundImage: `linear-gradient(135deg, ${GOLD}, ${LIGHT_GOLD})`,
            color: '#000',
            fontWeight: 700,
            px: 4,
            py: 1.4,
            borderRadius: '30px',
            fontSize: '1rem',
            textTransform: 'uppercase',
            letterSpacing: 1,
            boxShadow: `0 0 12px ${GOLD}99`,
            transition: '0.3s ease',
            '&:hover': {
              backgroundImage: `linear-gradient(135deg, ${LIGHT_GOLD}, ${GOLD})`,
              boxShadow: `0 0 22px ${GOLD}`,
              transform: 'translateY(-3px)',
            },
          }}
        >
          Explore More
        </Button>
      </Box>
    </Box>
  );
};

export default ProductsSection;
