import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Stack,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

// ICONS
import PaymentsIcon from '@mui/icons-material/Payments';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SavingsIcon from '@mui/icons-material/Savings';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';

const BRAND = {
  gold: "#EC9B14",
  dark: "#02150F",
  light: "#F4F4F4",
};

const ButtonStyle = {
  fontWeight: 700,
  px: { xs: 4, md: 6 },
  py: { xs: 1.5, md: 2 },
  borderRadius: '4px',
  fontSize: '0.9rem',
  textTransform: 'uppercase',
  transition: '0.3s ease-in-out',
  bgcolor: BRAND.gold,
  color: BRAND.dark,
  '&:hover': {
    bgcolor: BRAND.light,
    transform: 'translateY(-3px)',
    boxShadow: `0 10px 20px rgba(236, 155, 20, 0.2)`,
  },
};

const AboutSection = () => {
  const [selectedCard, setSelectedCard] = useState(0);

  const services = [
    {
      title: "Salary Processing & Check-off",
      desc: "Seamless check-off services for tea farmers, teachers, civil servants and private sector employees.",
      icon: <PaymentsIcon sx={{ fontSize: 40 }} />
    },
    {
      title: "Agricultural & Tea-Grower Support",
      desc: "Tailored products for farmers and smallholder producers, supporting inputs, farm improvement and seasonal needs.",
      icon: <AgricultureIcon sx={{ fontSize: 40 }} />
    },
    {
      title: "Business & Development Loans",
      desc: "Competitive, well-structured credit for MSMEs, projects and personal development goals.",
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />
    },
    {
      title: "Smart Savings & Investment Accounts",
      desc: "Goal-based savings, fixed deposits and targeted products for education, emergencies and long-term growth.",
      icon: <SavingsIcon sx={{ fontSize: 40 }} />
    },
    {
      title: "Mobile & Digital Banking",
      desc: "24/7 access to your SACCO account through our USSD and mobile platforms – deposit, withdraw and check balances from anywhere.",
      icon: <PhoneIphoneIcon sx={{ fontSize: 40 }} />
    },
    {
      title: "Asset Financing",
      desc: "Get the machinery or equipment you need today with our asset financing. Repay comfortably over time, and enjoy full ownership once you complete payment.",
      icon: <PrecisionManufacturingIcon sx={{ fontSize: 40 }} />
    }
  ];

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <Box sx={{ bgcolor: BRAND.dark, px: { xs: 2, md: 6 }, py: { xs: 8, md: 12 } }}>
      <Stack spacing={6} alignItems="center" sx={{ maxWidth: '1400px', mx: 'auto' }}>
        
        {/* HEADER SECTION */}
        <Box sx={{ textAlign: 'center', maxWidth: '800px' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Typography 
              variant="h2" 
              sx={{ 
                fontWeight: 900, 
                color: BRAND.gold, 
                mb: 3, 
                textTransform: 'uppercase', 
                fontSize: { xs: '2.2rem', md: '3.5rem' },
                letterSpacing: 2
              }}
            >
              About Us
            </Typography>
            <Typography sx={{ color: BRAND.light, fontSize: '1.1rem', lineHeight: 1.8, opacity: 0.9 }}>
              <strong style={{ color: BRAND.gold }}>Golden Generation Deposit Taking SACCO</strong> is a trusted, member-owned financial institution serving tea farmers, salaried workers, county workers and entrepreneurs.
            </Typography>
          </motion.div>
        </Box>

        {/* GRID SECTION WITH SELECT ACTION CARD LOGIC */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ width: '100%' }}
        >
          <Grid container spacing={3}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div variants={itemVariants} style={{ height: '100%' }}>
                  <Card 
                    elevation={0}
                    sx={{ 
                      height: '100%', 
                      bgcolor: 'transparent',
                      borderRadius: '16px',
                      border: `1px solid ${selectedCard === index ? BRAND.gold : 'rgba(236, 155, 20, 0.1)'}`,
                      transition: '0.3s ease'
                    }}
                  >
                    <CardActionArea
                      onClick={() => setSelectedCard(index)}
                      sx={{
                        height: '100%',
                        transition: '0.3s',
                        bgcolor: selectedCard === index ? 'rgba(236, 155, 20, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                        '&:hover': {
                          bgcolor: selectedCard === index ? 'rgba(236, 155, 20, 0.12)' : 'rgba(255, 255, 255, 0.05)',
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4, textAlign: 'center' }}>
                        <Box sx={{ 
                          mb: 3, 
                          color: selectedCard === index ? BRAND.light : BRAND.gold,
                          transition: '0.3s' 
                        }}>
                          {service.icon}
                        </Box>
                        
                        <Typography 
                          variant="h6" 
                          sx={{ 
                            fontWeight: 700, 
                            color: BRAND.gold, 
                            mb: 2,
                            minHeight: { md: '60px' },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {service.title}
                        </Typography>

                        <Typography sx={{ color: '#d0d0d0', fontSize: '0.95rem', lineHeight: 1.6 }}>
                          {service.desc}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* ACTION BUTTON */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Button 
            component={RouterLink} 
            to="/about/who-we-are" 
            variant="contained" 
            sx={ButtonStyle}
          >
            Learn More
          </Button>
        </motion.div>

      </Stack>
    </Box>
  );
};

export default AboutSection;