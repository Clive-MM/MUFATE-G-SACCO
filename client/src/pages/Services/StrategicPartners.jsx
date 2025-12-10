import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from '@mui/material';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';

const StrategicPartners = () => {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    axios
      .get('https://mufate-g-sacco.onrender.com/partnerships')
      .then((res) => setPartners(res.data.partnerships))
      .catch((err) => console.error('Error fetching partners:', err));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* 🌟 Deep Green + Gold Luxury Background */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #011407, #01240F)',
          py: 8,
        }}
      >
        <Box sx={{ px: { xs: 2, md: 10 } }}>
          {/* 🌟 GOLD TITLE */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '1.9rem', md: '2.4rem' },
                textAlign: 'center',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                background: 'linear-gradient(to right, #FFD700, #FFF4B5)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 1,
              }}
            >
              Trusted Partners in Growth
            </Typography>

            {/* 🌟 Gold Divider */}
            <Box
              sx={{
                height: '4px',
                width: '90px',
                background: 'linear-gradient(to right, #FFD700, #E6C200)',
                mx: 'auto',
                borderRadius: '10px',
                mb: 5,
                boxShadow: '0 0 12px rgba(255,215,0,0.5)',
              }}
            />
          </motion.div>

          {/* 💼 PARTNERS GRID */}
          <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
            {partners.map((partner, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <Card
                    sx={{
                      maxWidth: 360,
                      mx: 'auto',
                      borderRadius: '20px',
                      background: '#01240F',
                      border: '1px solid rgba(255,215,0,0.2)',
                      boxShadow:
                        '0 10px 25px rgba(0,0,0,0.4), 0 0 25px rgba(255,215,0,0.15)',
                      transition:
                        'transform 0.35s ease, box-shadow 0.35s ease, border 0.35s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        border: '1px solid #FFD700',
                        boxShadow:
                          '0 18px 35px rgba(0,0,0,0.5), 0 0 35px rgba(255,215,0,0.4)',
                      },
                    }}
                  >
                    <CardActionArea>
                      {/* PARTNER LOGO */}
                      {partner.LogoImageURL && (
                        <CardMedia
                          component="img"
                          image={partner.LogoImageURL}
                          alt={partner.PartnerName}
                          sx={{
                            height: 180,
                            objectFit: 'contain',
                            backgroundColor: '#ffffff',
                            p: 2,
                            borderBottom: '1px solid rgba(255,215,0,0.2)',
                            filter:
                              'drop-shadow(0 0 10px rgba(0,0,0,0.25))',
                          }}
                        />
                      )}

                      {/* TEXT CONTENT */}
                      <CardContent>
                        {/* Partner Name */}
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            textAlign: 'center',
                            background:
                              'linear-gradient(to right, #FFD700, #FFF4B5)',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            mb: 1,
                            letterSpacing: '0.5px',
                          }}
                        >
                          {partner.PartnerName}
                        </Typography>

                        {/* Description */}
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#FFF4B5',
                            textAlign: 'center',
                            lineHeight: 1.6,
                          }}
                        >
                          {partner.Description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* FOOTER */}
        <Footer />
      </Box>
    </motion.div>
  );
};

export default StrategicPartners;
