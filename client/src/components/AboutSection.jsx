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
          
          {/* HEADER (Newsroom Style) */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="h2"
              component={motion.h2}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
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
            <Typography 
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
            </Typography>
          </Box>

          {/* GRID (3 PER ROW ON DESKTOP) */}
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            sx={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)'
              },
              gap: 3,
            }}
          >
            {services.map((service, index) => (
              <Card 
                key={index}
                component={motion.div}
                whileHover={{ y: -10 }}
                elevation={0}
                sx={{ 
                  bgcolor: 'transparent',
                  borderRadius: '12px',
                  border: `1px solid ${selectedCard === index ? BRAND.gold : 'rgba(236, 155, 20, 0.15)'}`,
                  transition: '0.3s ease-in-out',
                  height: '100%'
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
                    bgcolor: selectedCard === index ? 'rgba(236, 155, 20, 0.1)' : 'rgba(255, 255, 255, 0.02)',
                    '&:hover': {
                      bgcolor: 'rgba(236, 155, 20, 0.15)',
                    },
                  }}
                >
                  <Box sx={{ 
                    mb: 3, 
                    color: BRAND.gold,
                    filter: selectedCard === index ? 'drop-shadow(0 0 8px rgba(236, 155, 20, 0.5))' : 'none'
                  }}>
                    {service.icon}
                  </Box>
                  
                  <CardContent sx={{ p: 0 }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 800, 
                        color: BRAND.gold, 
                        textTransform: 'uppercase',
                        fontSize: '1.25rem',
                        mb: 2,
                        letterSpacing: '0.05em'
                      }}
                    >
                      {service.title}
                    </Typography>
                    <Typography 
                      sx={{ 
                        color: BRAND.textMuted, 
                        fontSize: '0.95rem', 
                        lineHeight: 1.6 
                      }}
                    >
                      {service.desc}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>

          {/* READ MORE BUTTON (News Style) */}
          <Button 
            component={RouterLink} 
            to="/about/who-we-are" 
            variant="contained" 
            sx={{ 
              bgcolor: BRAND.gold,
              color: BRAND.dark,
              fontWeight: 900,
              px: 6,
              py: 2,
              borderRadius: '0px', // Square edge for the "Newsroom" look
              fontSize: '1rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              '&:hover': {
                bgcolor: BRAND.light,
                transform: 'scale(1.05)'
              }
            }}
          >
            Read More
          </Button>

        </Stack>
      </Container>
    </Box>
  );
};

export default AboutSection;