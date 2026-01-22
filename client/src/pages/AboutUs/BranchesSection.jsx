import React from 'react';
import { Box, Card, CardContent, Typography, Container, Stack } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { motion } from 'framer-motion';

const BRAND = { gold: '#EC9B14', dark: '#02150F', darkLighter: '#032419', bodyText: 'rgba(255, 255, 255, 0.85)' };

const BranchesSection = ({ branches, coreValues }) => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, background: `radial-gradient(circle at top, ${BRAND.darkLighter}, ${BRAND.dark})` }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ fontWeight: 900, color: BRAND.gold, textAlign: 'center', mb: 6, textTransform: 'uppercase' }}>
          Our Presence
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(auto-fit, minmax(300px, 1fr))' }, gap: 4 }}>
          {/* Branch Cards */}
          {branches.map((branch, index) => (
            <BranchCard key={index} branch={branch} index={index} />
          ))}

          {/* Core Values Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card sx={cardStyle}>
              <CardContent sx={{ textAlign: 'center' }}>
                <FavoriteIcon sx={{ fontSize: 48, color: BRAND.gold, mb: 2 }} />
                <Typography variant="h5" sx={{ fontWeight: 800, color: BRAND.gold, mb: 2 }}>CORE VALUES</Typography>
                {coreValues.map((v, i) => (
                  <Typography key={i} sx={{ color: '#fff', fontSize: '0.95rem', mb: 0.5 }}>{v.CoreValueName}</Typography>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </Box>
      </Container>
    </Box>
  );
};

const BranchCard = ({ branch, index }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
    <Card sx={cardStyle}>
      <CardContent sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <RoomIcon sx={{ fontSize: 48, color: BRAND.gold, mb: 2 }} />
        <Typography variant="h6" sx={{ fontWeight: 800, color: BRAND.gold }}>{branch.BranchName}</Typography>
        <Typography sx={{ color: BRAND.bodyText, mb: 1 }}>{branch.Location}</Typography>
        <Typography sx={{ color: BRAND.bodyText, fontSize: '0.9rem' }}>
          <strong style={{ color: BRAND.gold }}>Contact:</strong> {branch.ContactNumber}
        </Typography>
        <Box component="a" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.Location)}`} target="_blank" sx={buttonStyle}>
          View Map
        </Box>
      </CardContent>
    </Card>
  </motion.div>
);

const cardStyle = {
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '24px',
  border: '1px solid rgba(236, 155, 20, 0.3)',
  height: '100%',
  transition: '0.3s',
  '&:hover': { transform: 'translateY(-10px)', border: '1px solid #EC9B14' }
};

const buttonStyle = {
  mt: 2, px: 3, py: 1, backgroundColor: '#EC9B14', color: '#02150F', borderRadius: '50px',
  textDecoration: 'none', fontWeight: 700, transition: '0.3s', '&:hover': { backgroundColor: '#fff' }
};

export default BranchesSection;