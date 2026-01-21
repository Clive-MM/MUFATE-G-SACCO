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
import { motion, AnimatePresence } from 'framer-motion';

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
  textMuted: "rgba(244, 244, 244, 0.7)",
};

const AboutSection = () => {
  const [selectedCard, setSelectedCard] = useState(0);

  const services = [
    {
      title: "Salary Processing & Check-off",
      desc: "Seamless check-off services for tea farmers, teachers, civil servants and private sector employees.",
      icon: <PaymentsIcon sx={{ fontSize: 45 }} />
    },
    {
      title: "Agricultural & Tea-Grower Support",
      desc: "Tailored products for farmers and smallholder producers, supporting inputs, farm improvement and seasonal needs.",
      icon: <AgricultureIcon sx={{ fontSize: 45 }} />
    },
    {
      title: "Business & Development Loans",
      desc: "Competitive, well-structured credit for MSMEs, projects and personal development goals.",
      icon: <TrendingUpIcon sx={{ fontSize: 45 }} />
    },
    {
      title: "Smart Savings & Investment Accounts",
      desc: "Goal-based savings, fixed deposits and targeted products for education, emergencies and long-term growth.",
      icon: <SavingsIcon sx={{ fontSize: 45 }} />
    },
    {
      title: "Mobile & Digital Banking",
      desc: "24/7 access to your SACCO account through our USSD and mobile platforms – deposit, withdraw and check balances from anywhere.",
      icon: <PhoneIphoneIcon sx={{ fontSize: 45 }} />
    },
    {
      title: "Asset Financing",
      desc: "Get the machinery or equipment you need today with our asset financing. Repay comfortably over time, and enjoy full ownership.",
      icon: <PrecisionManufacturingIcon sx={{ fontSize: 45 }} />
    }
  ];

  return (
    <Box sx={{ bgcolor: BRAND.dark, py: { xs: 8, md: 12 }, width: '100%', overflow: 'hidden' }}>
      <Container maxWidth="xl">
        <Stack spacing={8} alignItems="center">
          
          {/* HEADER SECTION */}
          <Box sx={{ textAlign: 'center' }}>
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
                  mb: 2
                }}
              >
                About Us
              </Typography>
              {/* <Typography 
                sx={{ 
                  color: BRAND.light, 
                  maxWidth: "800px", 
                  mx: 'auto', 
                  fontSize: "1.1rem", 
                  opacity: 0.8,
                  lineHeight: 1.8 
                }}
              >
                <strong style={{ color: BRAND.gold }}>Golden Generation Deposit Taking SACCO</strong> is a trusted, member-owned financial institution serving tea farmers, salaried workers, and entrepreneurs.
              </Typography> */}
            </motion.div>
          </Box>

          {/* INTERACTIVE GRID */}
          <Box
            sx={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)'
              },
              gap: 4,
            }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -12, scale: 1.02 }}
              >
                <Card 
                  elevation={0}
                  sx={{ 
                    bgcolor: selectedCard === index ? 'rgba(236, 155, 20, 0.08)' : 'rgba(255, 255, 255, 0.03)',
                    borderRadius: '20px',
                    border: `1px solid ${selectedCard === index ? BRAND.gold : 'rgba(236, 155, 20, 0.15)'}`,
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    height: '100%',
                    position: 'relative',
                    overflow: 'visible',
                    // The "Glow" effect
                    boxShadow: selectedCard === index 
                      ? `0 0 30px rgba(236, 155, 20, 0.2)` 
                      : 'none',
                    backdropFilter: 'blur(10px)',
                    '&:hover': {
                      borderColor: BRAND.gold,
                      boxShadow: `0 15px 40px rgba(0, 0, 0, 0.4)`,
                    }
                  }}
                >
                  <CardActionArea
                    onClick={() => setSelectedCard(index)}
                    sx={{
                      height: '100%',
                      p: 4,
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
                        rotate: selectedCard === index ? [0, -10, 10, 0] : 0,
                        scale: selectedCard === index ? 1.1 : 1
                      }}
                      sx={{ 
                        mb: 3, 
                        color: BRAND.gold,
                        filter: selectedCard === index 
                          ? 'drop-shadow(0 0 12px rgba(236, 155, 20, 0.8))' 
                          : 'drop-shadow(0 4px 4px rgba(0,0,0,0.3))'
                      }}
                    >
                      {service.icon}
                    </Box>
                    
                    <CardContent sx={{ p: 0 }}>
                      <Typography 
                        variant="h5" 
                        sx={{ 
                          fontWeight: 800, 
                          color: BRAND.gold, 
                          textTransform: 'uppercase',
                          fontSize: '1.2rem',
                          mb: 2,
                          letterSpacing: '0.05em',
                          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                        }}
                      >
                        {service.title}
                      </Typography>
                      <Typography 
                        sx={{ 
                          color: BRAND.textMuted, 
                          fontSize: '0.95rem', 
                          lineHeight: 1.7,
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
                px: 8,
                py: 2.5,
                borderRadius: '0px', 
                fontSize: '1.1rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                boxShadow: `0 10px 20px rgba(0,0,0,0.4)`,
                transition: '0.3s',
                '&:hover': {
                  bgcolor: BRAND.light,
                  boxShadow: `0 0 25px ${BRAND.gold}`,
                }
              }}
            >
              Read More
            </Button>
          </motion.div>

        </Stack>
      </Container>
    </Box>
  );
};

export default AboutSection;