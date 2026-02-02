import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Stack,
  Container
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

// ICONS

import SavingsIcon from '@mui/icons-material/Savings';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PaymentsIcon from '@mui/icons-material/PaymentsIcon';
const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F",
  light: "#F4F4F4",
  textMuted: "rgba(244, 244, 244, 0.7)",
};

const AboutSection = () => {
  const [selectedCard, setSelectedCard] = useState(0);

  const services = [
    {
      title: "Smart Savings & Investment Solutions",
      desc: "Build your financial future through disciplined savings and rewarding investment accounts. From goal-based savings and fixed deposits to dividend-earning investments, our products help you grow your money safely while earning competitive returns.",
      icon: <SavingsIcon sx={{ fontSize: { xs: 40, md: 50 } }} />
    },
    {
      title: "Tailored & Affordable Loans",
      desc: "Built on the strength of our members’ savings and shared trust, we offer tailored loan products to meet diverse needs — from development and agribusiness support to business expansion, education, and emergencies. Enjoy affordable rates, flexible terms, and quick access to credit when you need it most.",
      icon: <AccountBalanceIcon sx={{ fontSize: { xs: 40, md: 50 } }} />
    },
    {
      title: "Asset Financing",
      desc: "Acquire the equipment, machinery, or tools you need today through our flexible asset financing. We fund your purchase and use the asset as security while you repay in affordable installments — giving you full ownership once the loan is cleared.",
      icon: <PrecisionManufacturingIcon sx={{ fontSize: { xs: 40, md: 50 } }} />
    },
     {
      title: "Mobile Banking & Digital Lending",
      desc: "Enjoy secure 24/7 access to your SACCO account through our USSD and mobile platforms. Deposit, withdraw, transfer funds, and even apply for loans instantly — anytime, anywhere, right from your phone.",
      icon: <PhoneIphoneIcon sx={{ fontSize: { xs: 40, md: 50 } }} />
    },
    {
      title: "Benevolent Funeral Cover",
      desc: "We believe in standing by our members when it matters most. Our Benevolent Fund offers a helping hand with funeral expenses for active contributors and their families.",
      icon: <FavoriteIcon sx={{ fontSize: { xs: 40, md: 50 } }} />
    },
    {
      title: "Timely Salary Processing",
      desc: "We provide a reliable payroll and check-off platform that ensures tea farmers, teachers, civil servants, and institutional employees receive their payments on time. Once funds or cheques are received, we promptly process and credit accounts to guarantee timely and seamless salary disbursement.",
      icon: <PaymentsIcon sx={{ fontSize: { xs: 40, md: 50 } }} />
    },

    
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <Box sx={{ 
      bgcolor: BRAND.dark, 
      py: { xs: 10, md: 15 }, 
      width: '100%', 
      overflow: 'hidden',
      position: 'relative' 
    }}>
      {/* BACKGROUND DECORATION */}
      <Box sx={{
        position: 'absolute',
        top: '10%',
        right: '-5%',
        width: '400px',
        height: '400px',
        bgcolor: BRAND.gold,
        filter: 'blur(150px)',
        opacity: 0.05,
        borderRadius: '50%',
        zIndex: 0
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={{ xs: 6, md: 10 }} alignItems="center">
          
          {/* HEADER SECTION */}
          <Box sx={{ textAlign: 'center', px: 2 }}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Typography
                variant="h2"
                sx={{
                  color: BRAND.gold,
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
                  letterSpacing: { xs: "0.05em", md: "0.1em" },
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))',
                  mb: 3
                }}
              >
                Why Choose Us
              </Typography>
              
            </motion.div>
          </Box>

          {/* INTERACTIVE GRID */}
          <Box
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            sx={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)'
              },
              gap: { xs: 3, md: 4 },
            }}
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card 
                  elevation={0}
                  sx={{ 
                    bgcolor: selectedCard === index ? 'rgba(236, 155, 20, 0.06)' : 'rgba(255, 255, 255, 0.02)',
                    borderRadius: '24px',
                    border: `1px solid ${selectedCard === index ? BRAND.gold : 'rgba(255, 255, 255, 0.08)'}`,
                    transition: 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    height: '100%',
                    backdropFilter: 'blur(10px)',
                    boxShadow: selectedCard === index 
                      ? `0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(236, 155, 20, 0.1)` 
                      : '0 10px 30px rgba(0,0,0,0.2)',
                    '&:hover': {
                      borderColor: BRAND.gold,
                      transform: 'translateY(-10px)',
                      bgcolor: 'rgba(236, 155, 20, 0.08)',
                      boxShadow: `0 25px 50px rgba(0, 0, 0, 0.5)`,
                    }
                  }}
                >
                  <CardActionArea
                    onClick={() => setSelectedCard(index)}
                    sx={{
                      height: '100%',
                      p: { xs: 4, md: 5 },
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    {/* Animated Icon Wrapper */}
                    <Box 
                      component={motion.div}
                      animate={{ 
                        scale: selectedCard === index ? 1.15 : 1,
                        filter: selectedCard === index 
                          ? 'drop-shadow(0 0 15px rgba(236, 155, 20, 0.6))' 
                          : 'drop-shadow(0 0 0px rgba(236, 155, 20, 0))'
                      }}
                      sx={{ 
                        mb: 4, 
                        color: BRAND.gold,
                        transition: '0.4s'
                      }}
                    >
                      {service.icon}
                    </Box>
                    
                    <CardContent sx={{ p: 0 }}>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 900, 
                          color: BRAND.gold, 
                          textTransform: 'uppercase',
                          fontSize: { xs: '1.1rem', md: '1.25rem' },
                          mb: 2.5,
                          letterSpacing: '0.1em',
                        }}
                      >
                        {service.title}
                      </Typography>
                      <Typography 
                        sx={{ 
                          color: BRAND.textMuted, 
                          fontSize: { xs: '0.9rem', md: '0.95rem' }, 
                          lineHeight: 1.8,
                          fontWeight: 400
                        }}
                      >
                        {service.desc}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            ))}
          </Box>

          {/* ACTION BUTTON */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              component={RouterLink} 
              to="/about/who-we-are" 
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
                boxShadow: `0 15px 30px rgba(0,0,0,0.4)`,
                transition: '0.4s ease',
                '&:hover': {
                  bgcolor: BRAND.light,
                  boxShadow: `0 0 30px ${BRAND.gold}`,
                }
              }}
            >
              Discover More
            </Button>
          </motion.div>

        </Stack>
      </Container>
    </Box>
  );
};

export default AboutSection;