import React from 'react';
import { Box, Typography, Container, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import SmartphoneIcon from '@mui/icons-material/Smartphone';

const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F', 
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.7)',
};

const MobileBanking = () => {
  // Animation Variants for text stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
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
        borderTop: `1px solid rgba(255,255,255,0.05)`,
      }}
    >
      {/* ================= BACKGROUND ELEMENTS ================= */}
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: { xs: '100%', md: '45%' },
          height: '300px',
          background: 'linear-gradient(135deg, #01240F, #014d1d)',
          borderTopLeftRadius: '100px',
          borderBottomLeftRadius: '100px',
          zIndex: 0,
          opacity: 0.6
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          right: '20%',
          top: '50%',
          transform: 'translate(50%, -50%)',
          width: 400,
          height: 400,
          backgroundColor: 'rgba(236, 155, 20, 0.15)',
          borderRadius: '50%',
          filter: 'blur(90px)',
          zIndex: 1,
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2 }}>
        <Grid container spacing={4} alignItems="center">
          
          {/* LEFT COLUMN: TEXT CONTENT */}
          <Grid item xs={12} md={7}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div variants={itemVariants}>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: BRAND.gold,
                    fontWeight: 900,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontSize: '0.85rem',
                    mb: 1,
                  }}
                >
                  <SmartphoneIcon sx={{ mr: 1, fontSize: '1.1rem' }} />
                  M-Banking Services
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 900,
                    color: BRAND.gold,
                    mb: 3,
                    fontSize: { xs: '2.2rem', md: '3.8rem' },
                    lineHeight: 1.1,
                    textTransform: 'uppercase',
                    letterSpacing: '-1px'
                  }}
                >
                  Experience Banking <br /> At Your Fingertips
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Typography
                  sx={{
                    color: BRAND.textMuted,
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    maxWidth: '620px',
                    mb: 4,
                  }}
                >
                  Experience the ease of banking from anywhere with <strong>Golden Generation DT Sacco’s</strong> M-Banking services. 
                  Our mobile platform puts the power of banking in your hands — securely and conveniently.
                </Typography>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Box 
                  sx={{ 
                    p: 3, 
                    borderRadius: '12px', 
                    bgcolor: 'rgba(255,255,255,0.03)', 
                    border: `1px solid rgba(236, 155, 20, 0.3)`,
                    display: 'inline-block'
                  }}
                >
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

          {/* RIGHT COLUMN: PHONE IMAGES */}
          <Grid item xs={12} md={5}>
            <Box
              sx={{
                display: 'flex',
                gap: { xs: 2, md: 4 },
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
                  alt={`phone-ui-${idx}`}
                  style={{
                    width: '100%',
                    maxWidth: idx === 0 ? '260px' : '230px',
                    height: 'auto',
                    borderRadius: '20px',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                  }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ 
                    opacity: 1, 
                    // Y sequence: Start at 50 (initial), move to 0 (landed), then loop -15 to 0
                    y: [50, 0, -15, 0] 
                  }}
                  viewport={{ once: true }}
                  transition={{
                    opacity: { duration: 0.8, delay: idx * 0.4 },
                    y: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      // Times defines when each Y value in the array happens (0 to 1)
                      times: [0, 0.1, 0.5, 1], 
                      delay: idx * 0.4
                    }
                  }}
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