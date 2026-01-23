import React, { useState } from 'react';
import { Box, Typography, Container, Stack, Button, Grid, Paper } from '@mui/material';
import { 
  Room as RoomIcon, 
  // Favorite as FavoriteIcon, 
  Verified as VerifiedIcon, 
  Map as MapIcon 
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const BRAND = { 
  gold: '#EC9B14', 
  dark: '#02150F', 
  bodyText: 'rgba(244, 244, 244, 0.6)',
  glass: 'rgba(255, 255, 255, 0.03)'
};

const BranchesSection = ({ branches = [], coreValues = [] }) => {
  // State to track the currently selected branch for the map
  const [selectedLocation, setSelectedLocation] = useState(branches[0]?.Location || "Kakamega, Kenya");

  return (
    <Box sx={{ 
      py: { xs: 8, md: 12 }, 
      bgcolor: BRAND.dark, // ✅ Unified with Footer background
      position: 'relative'
    }}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Typography variant="overline" sx={{ color: BRAND.gold, fontWeight: 900, letterSpacing: 3 }}>
              OUR NETWORK
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
            {/* ✅ Horizontal line removed as requested */}
          </motion.div>
        </Box>

        <Grid container spacing={4}>
          {/* LEFT: Branch List */}
          <Grid item xs={12} md={7}>
            <Stack spacing={3}>
              {branches.map((branch, index) => (
                <BranchCard 
                  key={index} 
                  branch={branch} 
                  index={index} 
                  isSelected={selectedLocation === branch.Location}
                  onSelect={() => setSelectedLocation(branch.Location)}
                />
              ))}
              <CoreValuesCard values={coreValues} />
            </Stack>
          </Grid>

          {/* RIGHT: Live Map Integration */}
          <Grid item xs={12} md={5}>
            <Box sx={{ position: 'sticky', top: '100px' }}>
              <motion.div 
                key={selectedLocation}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Paper sx={mapContainerStyle}>
                  <Box sx={mapHeaderStyle}>
                    <MapIcon sx={{ color: BRAND.gold, mr: 1 }} />
                    <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem' }}>
                      LIVE LOCATION
                    </Typography>
                  </Box>
                  <iframe
                    title="Branch Location"
                    width="100%"
                    height="450"
                    frameBorder="0"
                    style={{ border: 0, display: 'block' }}
                    src={`https://www.google.com/maps?q=${encodeURIComponent(selectedLocation)}&output=embed`}
                    allowFullScreen
                  />
                </Paper>
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const BranchCard = ({ branch, index, isSelected, onSelect }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }} 
    whileInView={{ opacity: 1, x: 0 }} 
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
  >
    <Box 
      onClick={onSelect}
      sx={{ 
        ...branchCardStyle, 
        borderColor: isSelected ? BRAND.gold : 'rgba(255, 255, 255, 0.08)',
        bgcolor: isSelected ? 'rgba(236, 155, 20, 0.05)' : BRAND.glass
      }}
    >
      <Stack direction="row" spacing={3} alignItems="center">
        <Box sx={iconCircleStyle}>
          <RoomIcon sx={{ color: BRAND.gold }} />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, color: BRAND.gold }}>
            {branch.BranchName}
          </Typography>
          <Typography sx={{ color: '#fff', fontSize: '0.9rem', opacity: 0.8 }}>
            {branch.Location}
          </Typography>
        </Box>
        <Button 
          variant={isSelected ? "contained" : "outlined"}
          sx={isSelected ? activeButtonStyle : ghostButtonStyle}
        >
          {isSelected ? "Active" : "View Map"}
        </Button>
      </Stack>
    </Box>
  </motion.div>
);

const CoreValuesCard = ({ values }) => (
  <Box sx={coreCardStyle}>
    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
      <VerifiedIcon sx={{ color: BRAND.gold, fontSize: 30 }} />
      <Typography variant="h5" sx={{ fontWeight: 900, color: '#fff' }}>CORE VALUES</Typography>
    </Stack>
    <Grid container spacing={2}>
      {values.map((v, i) => (
        <Grid item xs={6} sm={4} key={i}>
          <Typography sx={{ color: BRAND.bodyText, fontSize: '0.85rem', fontWeight: 600 }}>
             • {v.CoreValueName}
          </Typography>
        </Grid>
      ))}
    </Grid>
  </Box>
);

/* ================= THEMED STYLES ================= */

const branchCardStyle = {
  p: 3,
  borderRadius: '20px',
  border: '1px solid',
  cursor: 'pointer',
  transition: '0.3s ease',
  '&:hover': { transform: 'translateX(10px)', bgcolor: 'rgba(255,255,255,0.05)' }
};

const mapContainerStyle = {
  overflow: 'hidden',
  borderRadius: '32px',
  bgcolor: '#000',
  border: `1px solid rgba(236, 155, 20, 0.3)`,
  boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
};

const mapHeaderStyle = {
  p: 2,
  bgcolor: 'rgba(236, 155, 20, 0.1)',
  display: 'flex',
  alignItems: 'center',
  borderBottom: `1px solid rgba(236, 155, 20, 0.2)`
};

const coreCardStyle = {
  mt: 4,
  p: 4,
  borderRadius: '24px',
  background: 'linear-gradient(135deg, rgba(236, 155, 20, 0.1) 0%, transparent 100%)',
  border: '1px solid rgba(236, 155, 20, 0.2)'
};

const iconCircleStyle = {
  width: 50, height: 50, borderRadius: '12px',
  bgcolor: 'rgba(236, 155, 20, 0.1)',
  display: 'flex', alignItems: 'center', justifyContent: 'center'
};

const activeButtonStyle = {
  bgcolor: BRAND.gold, color: BRAND.dark, fontWeight: 900,
  borderRadius: '10px', '&:hover': { bgcolor: BRAND.gold }
};

const ghostButtonStyle = {
  color: BRAND.gold, borderColor: BRAND.gold, fontWeight: 700,
  borderRadius: '10px', '&:hover': { bgcolor: 'rgba(236, 155, 20, 0.1)', borderColor: BRAND.gold }
};

export default BranchesSection;