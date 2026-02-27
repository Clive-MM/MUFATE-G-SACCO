import React, { useState, useRef, useEffect } from 'react';
import { Box, Typography, Container, Stack, Button, Paper, useTheme, useMediaQuery } from '@mui/material';
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedLocation, setSelectedLocation] = useState(branches[0]?.Location || "Kakamega, Kenya");

  // Performance: Scroll to map on mobile when a new branch is selected
  const mapRef = useRef(null);
  const handleSelect = (loc) => {
    setSelectedLocation(loc);
    if (isMobile && mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <Box sx={{ py: { xs: 6, md: 12 }, bgcolor: BRAND.dark, position: 'relative' }}>
      <Container maxWidth="xl"> 
        
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 8 } }}>
          <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Typography variant="overline" sx={{ color: BRAND.gold, fontWeight: 900, letterSpacing: 3 }}>
              OUR NETWORK
            </Typography>
            <Typography variant="h3" sx={{ 
              fontWeight: 900, 
              color: BRAND.gold, 
              mt: 1,
              fontSize: { xs: '1.8rem', md: '3rem' },
              textTransform: 'uppercase' 
            }}>
              Our Presence
            </Typography>
          </motion.div>
        </Box>

        {/* MOBILE SELECTOR: Horizontal Chips */}
        {isMobile && (
          <Box sx={{ 
            display: 'flex', 
            overflowX: 'auto', 
            gap: 2, 
            pb: 3, 
            px: 1,
            '&::-webkit-scrollbar': { display: 'none' } 
          }}>
            {branches.map((b, i) => (
              <Button
                key={i}
                variant={selectedLocation === b.Location ? "contained" : "outlined"}
                onClick={() => handleSelect(b.Location)}
                sx={{
                  flexShrink: 0,
                  borderRadius: '50px',
                  whiteSpace: 'nowrap',
                  borderColor: BRAND.gold,
                  color: selectedLocation === b.Location ? BRAND.dark : BRAND.gold,
                  bgcolor: selectedLocation === b.Location ? BRAND.gold : 'transparent',
                  fontWeight: 700,
                  textTransform: 'none'
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
          gap: 2.5,
          alignItems: 'start'
        }}>
          
          {/* COLUMN 1: Branch 1 (Hidden on Mobile, handled by selector) */}
          {!isMobile && branches[0] && (
            <BranchCard 
              branch={branches[0]} 
              index={0} 
              isSelected={selectedLocation === branches[0].Location}
              onSelect={() => handleSelect(branches[0].Location)}
            />
          )}

          {/* COLUMN 2: THE MAP (Always visible on mobile) */}
          <Box ref={mapRef} sx={{ position: { xs: 'relative', md: 'sticky' }, top: '100px', zIndex: 2 }}>
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
                      {isMobile ? selectedLocation.toUpperCase() : 'LIVE LOCATION'}
                    </Typography>
                  </Box>
                  <iframe
                    title="Live Branch Map"
                    width="100%"
                    height={isMobile ? "250" : "380"}
                    frameBorder="0"
                    style={{ border: 0, display: 'block' }}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(selectedLocation)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    allowFullScreen
                  />
                </Paper>
              </motion.div>
            </AnimatePresence>
          </Box>

          {/* COLUMN 3: Dynamic Info / Branch 2 */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
             {/* On mobile, show the current active branch details right under map */}
             {isMobile ? (
               <BranchCard 
                 branch={branches.find(b => b.Location === selectedLocation)} 
                 isSelected={true} 
                 isMobile={true}
               />
             ) : (
               branches[1] && (
                <BranchCard 
                  branch={branches[1]} 
                  index={2} 
                  isSelected={selectedLocation === branches[1].Location}
                  onSelect={() => handleSelect(branches[1].Location)}
                />
               )
             )}
          </Box>

          {/* COLUMN 4: CORE VALUES */}
          <CoreValuesCard values={coreValues} />
        </Box>
      </Container>
    </Box>
  );
};

const BranchCard = ({ branch, index, isSelected, onSelect, isMobile }) => {
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
          bgcolor: isSelected ? 'rgba(236, 155, 20, 0.08)' : BRAND.glass,
          p: isMobile ? 2 : 3
        }}
      >
        <Stack direction={isMobile ? "row" : "column"} spacing={2} alignItems="center" sx={{ textAlign: isMobile ? 'left' : 'center' }}>
          <Box sx={iconCircleStyle}>
            <RoomIcon sx={{ color: BRAND.gold, fontSize: isMobile ? 22 : 28 }} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: BRAND.gold, lineHeight: 1.2, mb: 0.5 }}>
              {branch.BranchName}
            </Typography>
            <Typography sx={{ color: '#fff', fontSize: '0.8rem', opacity: 0.8 }}>
              {branch.Location}
            </Typography>
          </Box>
          {!isMobile && (
            <Button 
              fullWidth
              variant={isSelected ? "contained" : "outlined"}
              sx={isSelected ? activeButtonStyle : ghostButtonStyle}
            >
              {isSelected ? "Showing" : "View Map"}
            </Button>
          )}
        </Stack>
      </Box>
    </motion.div>
  );
};

const CoreValuesCard = ({ values }) => (
  <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
    <Box sx={{ ...cardStyle, background: 'rgba(236, 155, 20, 0.03)', borderColor: BRAND.gold }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1.5} alignItems="center" justifyContent="center">
          <FavoriteIcon sx={{ fontSize: 24, color: BRAND.gold }} />
          <Typography variant="h6" sx={{ fontWeight: 800, color: '#fff', fontSize: '0.9rem' }}>
            CORE VALUES
          </Typography>
        </Stack>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: '1fr' }, 
          gap: 1.5 
        }}>
          {values.slice(0, 6).map((v, i) => (
            <Stack key={i} direction="row" spacing={1} alignItems="center">
              <VerifiedIcon sx={{ fontSize: 14, color: BRAND.gold }} />
              <Typography sx={{ color: BRAND.bodyText, fontSize: '0.75rem', fontWeight: 500 }}>
                {v.CoreValueName}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
  </motion.div>
);

// --- STYLES (Optimized for Mobile) ---

const cardStyle = {
  p: 3,
  borderRadius: '20px',
  border: '1px solid',
  cursor: 'pointer',
  transition: '0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': { borderColor: BRAND.gold }
};

const mapContainerStyle = {
  overflow: 'hidden',
  borderRadius: '20px',
  bgcolor: '#000',
  border: `1px solid rgba(236, 155, 20, 0.4)`,
};

const mapHeaderStyle = {
  p: 1,
  bgcolor: 'rgba(236, 155, 20, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const iconCircleStyle = {
  width: { xs: 44, md: 54 }, height: { xs: 44, md: 54 }, 
  borderRadius: '12px',
  bgcolor: 'rgba(236, 155, 20, 0.1)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  border: '1px solid rgba(236, 155, 20, 0.2)',
  flexShrink: 0
};

const activeButtonStyle = {
  bgcolor: BRAND.gold, color: BRAND.dark, fontWeight: 800, fontSize: '0.7rem',
  mt: 2, borderRadius: '10px', '&:hover': { bgcolor: BRAND.gold }
};

const ghostButtonStyle = {
  color: BRAND.gold, borderColor: BRAND.gold, fontWeight: 700, fontSize: '0.7rem',
  mt: 2, borderRadius: '10px', '&:hover': { bgcolor: 'rgba(236, 155, 20, 0.1)', borderColor: BRAND.gold }
};

export default BranchesSection;