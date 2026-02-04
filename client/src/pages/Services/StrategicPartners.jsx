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


const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F', 
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.7)',
};

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
      
      <Box
        sx={{
          bgcolor: BRAND.dark,
          py: 8,
        }}
      >
        <Box sx={{ px: { xs: 2, md: 10 } }}>
          
          
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
                color: BRAND.gold, 
                mb: 6, 
              }}
            >
              Trusted Partners in Growth
            </Typography>
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
                      background: 'rgba(255, 255, 255, 0.03)', 
                      border: `1px solid rgba(236, 155, 20, 0.2)`, 
                      boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
                      transition:
                        'transform 0.35s ease, box-shadow 0.35s ease, border 0.35s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        border: `1px solid ${BRAND.gold}`,
                        boxShadow: `0 0 25px rgba(236, 155, 20, 0.2)`,
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
                            backgroundColor: '#ffffff',
                            p: 2,
                            borderBottom: `1px solid rgba(236, 155, 20, 0.2)`,
                            filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.25))',
                          }}
                        />
                      )}

                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            textAlign: 'center',
                            color: BRAND.gold, 
                            mb: 1,
                            letterSpacing: '0.5px',
                          }}
                        >
                          {partner.PartnerName}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: BRAND.textMuted, 
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

        <Footer />
      </Box>
    </motion.div>
  );
};

export default StrategicPartners;