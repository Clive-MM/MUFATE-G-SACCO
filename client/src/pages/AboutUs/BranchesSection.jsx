import React, { useState, useRef } from 'react'; // Removed useEffect
import { Box, Typography, Container, Stack, Button, Paper, useTheme, useMediaQuery } from '@mui/material';
import { 
  Room as RoomIcon, 
  Favorite as FavoriteIcon, 
  Verified as VerifiedIcon, 
  Map as MapIcon,
  Directions as DirectionsIcon // Corrected typo
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const BRAND = { 
  gold: '#EC9B14', 
  dark: '#02150F', 
  bodyText: 'rgba(244, 244, 244, 0.6)',
  glass: 'rgba(255, 255, 255, 0.03)'
};

const BranchesSection = ({ branches = [], coreValues = [] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedLocation, setSelectedLocation] = useState(branches[0]?.Location || "Kakamega, Kenya");

  const mapRef = useRef(null);
  
  const handleSelect = (loc) => {
    setSelectedLocation(loc);
    if (isMobile && mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openDirections = (location) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location)}`;
    window.open(url, '_blank');
  };

  return (
    <Box sx={{ py: { xs: 8, md: 15 }, bgcolor: BRAND.dark, position: 'relative' }}>
      <Container maxWidth="xl"> 
        
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 10 } }}>
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Typography variant="overline" sx={{ color: BRAND.gold, fontWeight: 900, letterSpacing: 3 }}>
              OUR NETWORK
            </Typography>
            <Typography variant="h2" sx={{ 
              fontWeight: 900, 
              color: BRAND.gold, 
              mt: 1,
              fontSize: { xs: '2.2rem', md: '3.5rem' },
              textTransform: 'uppercase' 
            }}>
              Our Presence
            </Typography>
          </motion.div>
        </Box>

        {isMobile && (
          <Box sx={{ 
            display: 'flex', 
            overflowX: 'auto', 
            gap: 1.5, 
            pb: 4, 
            px: 1,
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none'
          }}>
            {branches.map((b, i) => (
              <Button
                key={i}
                variant={selectedLocation === b.Location ? "contained" : "outlined"}
                onClick={() => handleSelect(b.Location)}
                sx={{
                  flexShrink: 0,
                  borderRadius: '12px',
                  px: 3,
                  py: 1,
                  whiteSpace: 'nowrap',
                  borderColor: BRAND.gold,
                  color: selectedLocation === b.Location ? BRAND.dark : BRAND.gold,
                  bgcolor: selectedLocation === b.Location ? BRAND.gold : 'transparent',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  '&:hover': { borderColor: BRAND.gold }
                }}
              >
                {b.BranchName}
              </Button>
            ))}
          </Box>
        )}

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { 
            xs: '1fr', 
            md: '1fr 1.5fr 1fr 1fr' 
          }, 
          gap: { xs: 3, md: 3 },
          alignItems: 'start'
        }}>
          
          {!isMobile && branches[0] && (
            <BranchCard 
              branch={branches[0]} 
              index={0} 
              isSelected={selectedLocation === branches[0].Location}
              onSelect={() => handleSelect(branches[0].Location)}
              onDirections={() => openDirections(branches[0].Location)}
            />
          )}

          <Box ref={mapRef} sx={{ position: { xs: 'relative', md: 'sticky' }, top: '100px', zIndex: 2 }}>
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedLocation}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <Paper sx={mapContainerStyle}>
                  <Box sx={mapHeaderStyle}>
                    <MapIcon sx={{ color: BRAND.gold, fontSize: 18, mr: 1 }} />
                    <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '0.7rem', letterSpacing: 1.5 }}>
                      {isMobile ? "TAP TO INTERACT" : "LIVE BRANCH LOCATION"}
                    </Typography>
                  </Box>
                  <iframe
                    title="Live Branch Map"
                    width="100%"
                    height={isMobile ? "300" : "400"}
                    frameBorder="0"
                    style={{ border: 0, display: 'block' }}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedLocation)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                    allowFullScreen
                  />
                </Paper>
              </motion.div>
            </AnimatePresence>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
             {isMobile ? (
               <BranchCard 
                 branch={branches.find(b => b.Location === selectedLocation)} 
                 isSelected={true} 
                 isMobile={true}
                 onDirections={() => openDirections(selectedLocation)}
               />
             ) : (
               branches[1] && (
                <BranchCard 
                  branch={branches[1]} 
                  index={2} 
                  isSelected={selectedLocation === branches[1].Location}
                  onSelect={() => handleSelect(branches[1].Location)}
                  onDirections={() => openDirections(branches[1].Location)}
                />
               )
             )}
          </Box>

          <CoreValuesCard values={coreValues} />
        </Box>
      </Container>
    </Box>
  );
};

const BranchCard = ({ branch, index, isSelected, onSelect, onDirections, isMobile }) => {
  if (!branch) return null;
  return (
    <motion.div 
      initial={isMobile ? false : { opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Box 
        onClick={onSelect}
        sx={{ 
          ...cardStyle, 
          borderColor: isSelected ? BRAND.gold : 'rgba(255, 255, 255, 0.1)',
          bgcolor: isSelected ? 'rgba(236, 155, 20, 0.06)' : BRAND.glass,
          transform: isSelected && !isMobile ? 'translateY(-5px)' : 'none'
        }}
      >
        <Stack spacing={2.5}>
          <Stack direction="row" spacing={2} alignItems="center">
            <Box sx={iconCircleStyle}>
              <RoomIcon sx={{ color: BRAND.gold, fontSize: 24 }} />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 900, color: BRAND.gold, fontSize: '1.1rem', lineHeight: 1.2 }}>
                {branch.BranchName}
              </Typography>
              <Typography sx={{ color: '#fff', fontSize: '0.85rem', fontWeight: 500, mt: 0.5 }}>
                {branch.Location}
              </Typography>
            </Box>
          </Stack>

          <Typography sx={{ color: BRAND.bodyText, fontSize: '0.8rem', lineHeight: 1.6 }}>
            Contact: {branch.ContactNumber}
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button 
              fullWidth
              variant="contained"
              startIcon={<DirectionsIcon />}
              onClick={(e) => { e.stopPropagation(); onDirections(); }}
              sx={actionButtonStyle}
            >
              Directions
            </Button>
          </Stack>
        </Stack>
      </Box>
    </motion.div>
  );
};

const CoreValuesCard = ({ values }) => (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
    <Box sx={{ ...cardStyle, background: 'rgba(236, 155, 20, 0.03)', borderColor: BRAND.gold }}>
      <Stack spacing={3}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <FavoriteIcon sx={{ fontSize: 28, color: BRAND.gold }} />
          <Typography variant="h6" sx={{ fontWeight: 900, color: '#fff', fontSize: '1rem', textTransform: 'uppercase' }}>
            Core Values
          </Typography>
        </Stack>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: '1fr' }, 
          gap: 2 
        }}>
          {values.slice(0, 6).map((v, i) => (
            <Stack key={i} direction="row" spacing={1} alignItems="center">
              <VerifiedIcon sx={{ fontSize: 16, color: BRAND.gold }} />
              <Typography sx={{ color: BRAND.bodyText, fontSize: '0.75rem', fontWeight: 600 }}>
                {v.CoreValueName}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
  </motion.div>
);

const cardStyle = {
  p: { xs: 3, md: 4 },
  borderRadius: '24px',
  border: '1px solid',
  cursor: 'pointer',
  transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  height: '100%',
  '&:hover': { borderColor: BRAND.gold }
};

const mapContainerStyle = {
  overflow: 'hidden',
  borderRadius: '24px',
  bgcolor: '#000',
  border: `1px solid rgba(236, 155, 20, 0.3)`,
  boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
};

const mapHeaderStyle = {
  p: 1.5,
  bgcolor: 'rgba(236, 155, 20, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: '1px solid rgba(236, 155, 20, 0.1)'
};

const iconCircleStyle = {
  width: 48, height: 48, 
  borderRadius: '12px',
  bgcolor: 'rgba(236, 155, 20, 0.1)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  border: '1px solid rgba(236, 155, 20, 0.2)',
  flexShrink: 0
};

const actionButtonStyle = {
  bgcolor: BRAND.gold, 
  color: BRAND.dark, 
  fontWeight: 900, 
  fontSize: '0.75rem',
  borderRadius: '12px',
  py: 1.2,
  textTransform: 'uppercase',
  '&:hover': { bgcolor: '#fff', color: BRAND.dark }
};

export default BranchesSection;