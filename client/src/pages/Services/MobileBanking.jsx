import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import SmartphoneIcon from '@mui/icons-material/Smartphone';

// Syncing with your Footer's BRAND constant
const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F', // Matching the Footer Background
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.6)',
};

const MobileBanking = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: BRAND.dark, // Matched to Footer
        pt: { xs: 8, md: 12 },
        pb: { xs: 8, md: 12 },
        overflow: 'hidden',
        borderTop: `1px solid rgba(255,255,255,0.05)`, // Matching Footer border style
      }}
    >
      {/* Background Glow Effect */}
      <Box
        sx={{
          position: 'absolute',
          right: '10%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 400,
          height: 400,
          backgroundColor: 'rgba(236, 155, 20, 0.08)', // Subtle brand gold glow
          borderRadius: '50%',
          filter: 'blur(100px)',
          zIndex: 0,
        }}
      />

      <Container maxWidth="xl">
        <Grid container spacing={6} alignItems="center">
          
          {/* LEFT CONTENT */}
          <Grid item xs={12} md={7} sx={{ zIndex: 2 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {/* SECTION TAG */}
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: BRAND.gold,
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  fontSize: '0.9rem',
                  mb: 2,
                }}
              >
                <SmartphoneIcon sx={{ mr: 1, fontSize: '1.2rem' }} />
                M-Banking Services
              </Typography>

              {/* MAIN TITLE */}
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  color: BRAND.gold, // Solid gold to match your updated Hero
                  mb: 3,
                  fontSize: { xs: '2rem', md: '3rem' },
                  lineHeight: 1.2,
                  textTransform: 'uppercase',
                }}
              >
                Experience Banking <br /> at Your Fingertips
              </Typography>

              {/* DESCRIPTION */}
              <Typography
                sx={{
                  color: BRAND.textMuted, // Using Footer's muted text for elegance
                  fontSize: '1.05rem',
                  lineHeight: 1.8,
                  maxWidth: '600px',
                  mb: 4,
                }}
              >
                Experience the ease of banking from anywhere with <strong>Golden Generation DT Sacco’s</strong> M-Banking services. 
                Our mobile platform puts the power of banking in your hands — securely and conveniently.
              </Typography>

              {/* ACCESS BOX */}
              <Box 
                sx={{ 
                  p: 3, 
                  borderRadius: '8px', 
                  bgcolor: 'rgba(255,255,255,0.03)', 
                  border: `1px solid rgba(236, 155, 20, 0.2)` 
                }}
              >
                <Typography sx={{ color: BRAND.gold, fontWeight: 700, mb: 1 }}>
                  HOW TO ACCESS:
                </Typography>
                <Typography sx={{ color: BRAND.light, mb: 1 }}>
                  Dial <span style={{ color: BRAND.gold, fontWeight: 900, fontSize: '1.2rem' }}>*882*51#</span> to access your account.
                </Typography>
                <Typography sx={{ color: BRAND.light }}>
                  Deposit money using Paybill <span style={{ color: BRAND.gold, fontWeight: 900, fontSize: '1.2rem' }}>506492</span>.
                </Typography>
              </Box>
            </motion.div>
          </Grid>

          {/* RIGHT IMAGES */}
          <Grid item xs={12} md={5} sx={{ zIndex: 2 }}>
            <Box
              sx={{
                display: 'flex',
                gap: { xs: 2, md: 3 },
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {[
                "https://res.cloudinary.com/djydkcx01/image/upload/v1746212408/Withdraw_Money_euixjq.png",
                "https://res.cloudinary.com/djydkcx01/image/upload/v1746212284/Money_Deposit_ftr3ov.png",
              ].map((src, idx) => (
                <motion.img
                  key={idx}
                  src={src}
                  alt={`m-banking-${idx}`}
                  style={{
                    width: '100%',
                    maxWidth: idx === 0 ? '220px' : '200px',
                    height: 'auto',
                    borderRadius: '24px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                    marginTop: idx === 1 ? '40px' : '0px', // Staggered visual effect
                  }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MobileBanking;