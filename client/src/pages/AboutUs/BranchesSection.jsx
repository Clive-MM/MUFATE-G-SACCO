import React from 'react';
import { Box, Typography, Container, Stack, Button } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VerifiedIcon from '@mui/icons-material/Verified';
import { motion } from 'framer-motion';

const BRAND = { 
  gold: '#EC9B14', 
  dark: '#02150F', 
  darkLighter: '#032419', 
  bodyText: 'rgba(255, 255, 255, 0.7)',
  glass: 'rgba(255, 255, 255, 0.03)'
};

const BranchesSection = ({ branches = [], coreValues = [] }) => {
  return (
    <Box sx={{ 
      py: { xs: 8, md: 12 }, 
      background: `radial-gradient(circle at 50% 0%, ${BRAND.darkLighter} 0%, ${BRAND.dark} 100%)`,
      position: 'relative'
    }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Typography variant="overline" sx={{ color: BRAND.gold, fontWeight: 700, letterSpacing: 3 }}>
              Our Network
            </Typography>
            <Typography variant="h3" sx={{ 
              fontWeight: 900, 
              color: '#fff', 
              mt: 1,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              textTransform: 'uppercase' 
            }}>
              Our Presence
            </Typography>
            <Box sx={{ width: 60, height: 4, bgcolor: BRAND.gold, mx: 'auto', mt: 2, borderRadius: 2 }} />
          </motion.div>
        </Box>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, 
          gap: 4 
        }}>
          {/* Branch Cards */}
          {branches.map((branch, index) => (
            <BranchCard key={index} branch={branch} index={index} />
          ))}

          {/* Core Values Card - Styled Differently for Contrast */}
          <CoreValuesCard values={coreValues} />
        </Box>
      </Container>
    </Box>
  );
};

const BranchCard = ({ branch, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true }}
    transition={{ delay: index * 0.1, duration: 0.5 }}
  >
    <Box sx={cardStyle}>
      <Stack spacing={2} alignItems="center" sx={{ textAlign: 'center', height: '100%' }}>
        <Box sx={iconCircleStyle}>
          <RoomIcon sx={{ fontSize: 32, color: BRAND.gold }} />
        </Box>
        
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: BRAND.gold, mb: 1 }}>
            {branch.BranchName}
          </Typography>
          <Typography sx={{ color: '#fff', fontSize: '0.95rem', opacity: 0.9, mb: 1 }}>
            {branch.Location}
          </Typography>
          <Typography sx={{ color: BRAND.bodyText, fontSize: '0.85rem' }}>
            {branch.ContactNumber}
          </Typography>
        </Box>

        <Button 
          fullWidth
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.Location)}`}
          target="_blank"
          sx={buttonStyle}
        >
          View on Map
        </Button>
      </Stack>
    </Box>
  </motion.div>
);

const CoreValuesCard = ({ values }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }} 
    whileInView={{ opacity: 1, scale: 1 }} 
    viewport={{ once: true }}
    transition={{ delay: 0.4 }}
  >
    <Box sx={{ ...cardStyle, background: 'rgba(236, 155, 20, 0.05)', borderColor: BRAND.gold }}>
      <Stack spacing={2} alignItems="center">
        <FavoriteIcon sx={{ fontSize: 40, color: BRAND.gold }} />
        <Typography variant="h5" sx={{ fontWeight: 800, color: BRAND.gold, textTransform: 'uppercase' }}>
          Core Values
        </Typography>
        
        <Box sx={{ width: '100%', textAlign: 'left', mt: 1 }}>
          {values.map((v, i) => (
            <Stack key={i} direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1.5 }}>
              <VerifiedIcon sx={{ fontSize: 18, color: BRAND.gold, opacity: 0.8 }} />
              <Typography sx={{ color: '#fff', fontSize: '0.9rem', fontWeight: 500 }}>
                {v.CoreValueName}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
  </motion.div>
);

/* ================= THEMED STYLES ================= */

const cardStyle = {
  background: BRAND.glass,
  backdropFilter: 'blur(15px)',
  borderRadius: '32px',
  border: '1px solid rgba(255, 255, 255, 0.08)',
  padding: { xs: 4, md: 5 },
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  '&:hover': { 
    transform: 'translateY(-12px)', 
    borderColor: BRAND.gold,
    boxShadow: `0 20px 40px rgba(0,0,0,0.4), 0 0 20px rgba(236, 155, 20, 0.1)`,
    background: 'rgba(255, 255, 255, 0.06)'
  }
};

const iconCircleStyle = {
  width: 70,
  height: 70,
  borderRadius: '20px',
  background: 'rgba(236, 155, 20, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  mb: 1,
  border: '1px solid rgba(236, 155, 20, 0.2)'
};

const buttonStyle = {
  mt: 2,
  py: 1.5,
  borderRadius: '16px',
  textTransform: 'none',
  fontWeight: 700,
  fontSize: '0.9rem',
  color: BRAND.dark,
  backgroundColor: BRAND.gold,
  border: `1px solid ${BRAND.gold}`,
  transition: '0.3s',
  '&:hover': { 
    backgroundColor: 'transparent', 
    color: BRAND.gold,
    boxShadow: `0 0 15px ${BRAND.gold}44`
  }
};

export default BranchesSection;