import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import SmartphoneIcon from '@mui/icons-material/Smartphone';

const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  textMuted: 'rgba(244, 244, 244, 0.7)',
};

const MobileBanking = () => {
  // Shared floating animation config
  const bounceTransition = {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: BRAND.dark,
        py: { xs: 8, md: 15 },
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* ================= BACKGROUND GRADIENT ================= */}
      <Box sx={{
        position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
        width: { xs: '100%', md: '45%' }, height: '300px',
        background: 'linear-gradient(135deg, #01240F, #014d1d)',
        borderTopLeftRadius: '100px', borderBottomLeftRadius: '100px',
        zIndex: 0, opacity: 0.6
      }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center">
          
          {/* LEFT COLUMN: TEXT CONTENT */}
          <Grid item xs={12} md={7}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div variants={itemVariants}>
                <Typography sx={{ display: 'flex', alignItems: 'center', color: BRAND.gold, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.85rem', mb: 1 }}>
                  <SmartphoneIcon sx={{ mr: 1, fontSize: '1.1rem' }} /> M-Banking Services
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography variant="h2" sx={{ fontWeight: 900, color: BRAND.gold, mb: 3, fontSize: { xs: '2.2rem', md: '3.8rem' }, lineHeight: 1.1, textTransform: 'uppercase' }}>
                  Experience Banking <br /> At Your Fingertips
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography sx={{ color: BRAND.textMuted, fontSize: '1.1rem', lineHeight: 1.8, maxWidth: '620px', mb: 4 }}>
                  Experience the ease of banking from anywhere with <strong>Golden Generation DT Sacco’s</strong> M-Banking services.
                </Typography>
              </motion.div>

              {/* HOW TO ACCESS CARD + INTEGRATED GLOW */}
              <motion.div 
                animate={{ y: [0, -10, 0] }} 
                transition={bounceTransition}
                style={{ position: 'relative', display: 'inline-block' }}
              >
                {/* Dynamic Glow for Card */}
                <Box sx={{
                  position: 'absolute', inset: 0,
                  backgroundColor: 'rgba(236, 155, 20, 0.1)',
                  filter: 'blur(30px)', zIndex: -1, borderRadius: '12px'
                }} />

                <Box sx={{ 
                  p: 3, borderRadius: '12px', 
                  bgcolor: 'rgba(255,255,255,0.03)', 
                  border: `1px solid rgba(236, 155, 20, 0.3)`,
                  backdropFilter: 'blur(10px)'
                }}>
                  <Typography sx={{ color: BRAND.gold, fontWeight: 800, mb: 1.5, fontSize: '0.9rem', letterSpacing: '1px' }}>
                    HOW TO ACCESS:
                  </Typography>
                  <Typography sx={{ color: '#FFF', mb: 1, fontSize: '1.05rem' }}>
                    Dial <span style={{ color: BRAND.gold, fontWeight: 900 }}>*882*51#</span> to access your account.
                  </Typography>
                  <Typography sx={{ color: '#FFF', fontSize: '1.05rem' }}>
                    Deposit money using Paybill <span style={{ color: BRAND.gold, fontWeight: 900 }}>506492</span>.
                  </Typography>
                </Box>
              </motion.div>
            </motion.div>
          </Grid>

          {/* RIGHT COLUMN: SMALLER PHONES + SYNCED GLOW */}
          <Grid item xs={12} md={5}>
            <Box sx={{
              display: 'flex', gap: { xs: 2, md: 3 },
              justifyContent: 'center', alignItems: 'center',
              position: 'relative'
            }}>
              {/* Dynamic Glow for Phones */}
              <motion.div
                animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }}
                transition={bounceTransition}
                style={{
                  position: 'absolute', width: '80%', height: '80%',
                  backgroundColor: 'rgba(236, 155, 20, 0.2)',
                  filter: 'blur(60px)', zIndex: 0, borderRadius: '50%'
                }}
              />

              {[
                "https://res.cloudinary.com/djydkcx01/image/upload/v1746212408/Withdraw_Money_euixjq.png",
                "https://res.cloudinary.com/djydkcx01/image/upload/v1746212284/Money_Deposit_ftr3ov.png",
              ].map((src, idx) => (
                <motion.img
                  key={idx}
                  src={src}
                  alt={`phone-ui-${idx}`}
                  style={{
                    // Reduced Dimensions to prevent cropping
                    width: { xs: '120px', sm: '160px', md: idx === 0 ? '220px' : '190px' },
                    height: 'auto',
                    borderRadius: '15px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
                    zIndex: 2,
                    position: 'relative'
                  }}
                  animate={{ y: [0, -15, 0] }}
                  transition={{ ...bounceTransition, delay: idx * 0.2 }}
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