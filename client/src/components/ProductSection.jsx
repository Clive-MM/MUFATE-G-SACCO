import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent, CardActionArea, Button } from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './ProductsSection.css';

const products = [
  {
    id: 1,
    title: 'Loan Products',
    description:
      'Access affordable and flexible financing with our loan solutions. Whether for personal needs, business expansion, or emergencies, our loans come with competitive interest rates and member-friendly repayment terms.',
    icon: <AccountBalanceIcon fontSize="large" />,
  },
  {
    id: 2,
    title: 'Savings Products',
    description:
      'Build a strong financial foundation with our flexible savings plans. Mufate Sacco helps you save consistently and securely, offering products designed to support everything from daily expenses to long-term dreams.',
    icon: <SavingsIcon fontSize="large" />,
  },
];

const ProductsSection = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <Box className="products-section-wrapper">
      <Box className="section-header-split">
        <Typography className="split-title-text">OUR PRODUCTS</Typography>
      </Box>

      <Box className="our-products-section">
        <Box className="section-wrapper">
          <Box className="products-grid">
            {products.map((product, index) => (
              <Card
                key={product.id}
                className="product-card"
                onClick={() => setSelectedCard(index)}
                data-active={selectedCard === index ? 'true' : undefined}
                data-aos="fade-up"
              >
                <CardActionArea sx={{ height: '100%' }}>
                  <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Box className="product-icon">{product.icon}</Box>
                    <Typography variant="h6" fontWeight="bold" align="center" gutterBottom>
                      {product.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 2 }}>
                      {product.description}
                    </Typography>
                    <Button className="learn-more-btn" size="small">
                      LEARN MORE
                    </Button>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>

      <Box className="angled-divider-bottom" />
    </Box>
  );
};

export default ProductsSection;
