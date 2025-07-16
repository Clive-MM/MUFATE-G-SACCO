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
    axios.get('https://mufate-g-sacco.onrender.com/partnerships')
      .then(res => setPartners(res.data.partnerships))
      .catch(err => console.error('Error fetching partners:', err));
  }, []);

  return (
    // ✅ Soft radial background and animation container
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Box sx={{ background: 'radial-gradient(circle at top, #f0f4f8, #e3eaf1)' }}>
        <Box sx={{ pt: 6, pb: 6, px: { xs: 2, md: 10 } }}>

          {/* ✅ Animated headline */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.8rem', md: '2.2rem' },
                textAlign: 'center',
                color: '#003b5c',
                letterSpacing: '0.5px',
                mb: 1,
              }}
            >
              Trusted Partners in Growth
            </Typography>

            <Box
              sx={{
                height: '4px',
                width: '70px',
                backgroundColor: '#0077cc',
                mx: 'auto',
                borderRadius: '8px',
                mb: 5,
              }}
            />
          </motion.div>

          <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
            {partners.map((partner, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <Card
                    sx={{
                      maxWidth: 345,
                      mx: 'auto',
                      borderRadius: 3,
                      boxShadow: 3,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        boxShadow: '0 8px 25px rgba(0, 123, 255, 0.3)',
                      },
                    }}
                  >
                    <CardActionArea>
                      {partner.LogoImageURL && (
                        <CardMedia
                          component="img"
                          image={partner.LogoImageURL}
                          alt={partner.PartnerName}
                          sx={{
                            height: 180,
                            objectFit: 'contain',
                            backgroundColor: '#fff',
                            p: 2,
                            filter: 'drop-shadow(0 0 8px rgba(0, 0, 0, 0.15))',
                          }}
                        />

                      )}
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: '#003b5c',
                            textAlign: 'center',
                          }}
                        >
                          {partner.PartnerName}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: 'text.secondary',
                            textAlign: 'center',
                            mt: 1,
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

        {/* 🔽 Footer with no margin conflict */}
        <Box sx={{ mt: '-24px' }}>
          <Footer />
        </Box>
      </Box>
    </motion.div>
  );
};

export default StrategicPartners;
