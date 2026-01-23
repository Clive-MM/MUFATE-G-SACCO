import React, { useState } from 'react';
import { Box, Typography, Container, Stack, Button, Paper } from '@mui/material';
import { 
  Room as RoomIcon, 
  Favorite as FavoriteIcon, 
  Verified as VerifiedIcon, 
  Map as MapIcon 
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const BRAND = { 
  gold: '#EC9B14', 
  dark: '#02150F', 
  bodyText: 'rgba(244, 244, 244, 0.6)',
  glass: 'rgba(255, 255, 255, 0.03)'
};

const BranchesSection = ({ branches = [], coreValues = [] }) => {
  // Default to first branch location or a general one
  const [selectedLocation, setSelectedLocation] = useState(branches[0]?.Location || "Kakamega, Kenya");

  return (
    <Box sx={{ 
      py: { xs: 8, md: 12 }, 
      bgcolor: BRAND.dark, // ✅ Unified with Footer
      position: 'relative'
    }}>
      <Container maxWidth="xl"> {/* Wider container to fit 4 columns comfortably */}
        
        {/* Header - Cleaned up (No gold line) */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Typography variant="overline" sx={{ color: BRAND.gold, fontWeight: 900, letterSpacing: 3 }}>
              OUR NETWORK
            </Typography>
            <Typography variant="h3" sx={{ 
              fontWeight: 900, 
              color: '#fff', 
              mt: 1,
              fontSize: { xs: '2.2rem', md: '3rem' },
              textTransform: 'uppercase' 
            }}>
              Our Presence
            </Typography>
          </motion.div>
        </Box>

        {/* 4-COLUMN GRID LAYOUT */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: '1fr 1fr', 
            md: '1fr 1.5fr 1fr 1fr' // Map (Column 2) is slightly wider for visibility
          }, 
          gap: 2.5,
          alignItems: 'start'
        }}>
          
          {/* COLUMN 1: Branch 1 */}
          {branches[0] && (
            <BranchCard 
              branch={branches[0]} 
              index={0} 
              isSelected={selectedLocation === branches[0].Location}
              onSelect={() => setSelectedLocation(branches[0].Location)}
            />
          )}

          {/* COLUMN 2: THE STICKY MAP (Center-Left) */}
          <Box sx={{ position: 'sticky', top: '100px', height: '100%' }}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedLocation}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Paper sx={mapContainerStyle}>
                  <Box sx={mapHeaderStyle}>
                    <MapIcon sx={{ color: BRAND.gold, fontSize: 20, mr: 1 }} />
                    <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.75rem', letterSpacing: 1 }}>
                      LIVE LOCATION
                    </Typography>
                  </Box>
                  <iframe
                    title="Live Branch Map"
                    width="100%"
                    height="380"
                    frameBorder="0"
                    style={{ border: 0, display: 'block' }}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedLocation)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    allowFullScreen
                  />
                </Paper>
              </motion.div>
            </AnimatePresence>
          </Box>

          {/* COLUMN 3: Branch 2 (or more if you map them) */}
          {branches[1] && (
            <BranchCard 
              branch={branches[1]} 
              index={2} 
              isSelected={selectedLocation === branches[1].Location}
              onSelect={() => setSelectedLocation(branches[1].Location)}
            />
          )}

          {/* COLUMN 4: CORE VALUES */}
          <CoreValuesCard values={coreValues} />
        </Box>
      </Container>
    </Box>
  );
};

const BranchCard = ({ branch, index, isSelected, onSelect }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} 
    whileInView={{ opacity: 1, y: 0 }} 
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    <Box 
      onClick={onSelect}
      sx={{ 
        ...cardStyle, 
        borderColor: isSelected ? BRAND.gold : 'rgba(255, 255, 255, 0.1)',
        bgcolor: isSelected ? 'rgba(236, 155, 20, 0.08)' : BRAND.glass,
        boxShadow: isSelected ? `0 0 20px ${BRAND.gold}22` : 'none'
      }}
    >
      <Stack spacing={2} alignItems="center" sx={{ textAlign: 'center' }}>
        <Box sx={iconCircleStyle}>
          <RoomIcon sx={{ color: BRAND.gold, fontSize: 28 }} />
        </Box>
        <Box>
          <Typography variant="subtitle1" sx={{ fontWeight: 800, color: BRAND.gold, lineHeight: 1.2, mb: 1 }}>
            {branch.BranchName}
          </Typography>
          <Typography sx={{ color: '#fff', fontSize: '0.85rem', opacity: 0.8, mb: 1 }}>
            {branch.Location}
          </Typography>
          <Typography sx={{ color: BRAND.bodyText, fontSize: '0.75rem' }}>
            {branch.ContactNumber}
          </Typography>
        </Box>
        <Button 
          fullWidth
          variant={isSelected ? "contained" : "outlined"}
          sx={isSelected ? activeButtonStyle : ghostButtonStyle}
        >
          {isSelected ? "Showing" : "View Map"}
        </Button>
      </Stack>
    </Box>
  </motion.div>
);

const CoreValuesCard = ({ values }) => (
  <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
    <Box sx={{ ...cardStyle, background: 'rgba(236, 155, 20, 0.03)', borderColor: BRAND.gold }}>
      <Stack spacing={2} alignItems="center">
        <FavoriteIcon sx={{ fontSize: 32, color: BRAND.gold }} />
        <Typography variant="h6" sx={{ fontWeight: 800, color: '#fff', textAlign: 'center' }}>
          CORE VALUES
        </Typography>
        <Stack spacing={1} sx={{ width: '100%' }}>
          {values.slice(0, 6).map((v, i) => (
            <Stack key={i} direction="row" spacing={1} alignItems="center">
              <VerifiedIcon sx={{ fontSize: 14, color: BRAND.gold }} />
              <Typography sx={{ color: BRAND.bodyText, fontSize: '0.8rem', fontWeight: 500 }}>
                {v.CoreValueName}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Box>
  </motion.div>
);

/* ================= STYLES ================= */

const cardStyle = {
  p: 3,
  borderRadius: '24px',
  border: '1px solid',
  height: '100%',
  cursor: 'pointer',
  transition: '0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': { transform: 'translateY(-8px)', borderColor: BRAND.gold }
};

const mapContainerStyle = {
  overflow: 'hidden',
  borderRadius: '24px',
  bgcolor: '#000',
  border: `1px solid rgba(236, 155, 20, 0.4)`,
  boxShadow: '0 15px 40px rgba(0,0,0,0.6)'
};

const mapHeaderStyle = {
  p: 1.5,
  bgcolor: 'rgba(236, 155, 20, 0.15)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: `1px solid rgba(236, 155, 20, 0.2)`
};

const iconCircleStyle = {
  width: 54, height: 54, borderRadius: '14px',
  bgcolor: 'rgba(236, 155, 20, 0.1)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  border: '1px solid rgba(236, 155, 20, 0.2)'
};

const activeButtonStyle = {
  bgcolor: BRAND.gold, color: BRAND.dark, fontWeight: 800, fontSize: '0.75rem',
  borderRadius: '12px', '&:hover': { bgcolor: BRAND.gold }
};

const ghostButtonStyle = {
  color: BRAND.gold, borderColor: BRAND.gold, fontWeight: 700, fontSize: '0.75rem',
  borderRadius: '12px', '&:hover': { bgcolor: 'rgba(236, 155, 20, 0.1)', borderColor: BRAND.gold }
};

export default BranchesSection;