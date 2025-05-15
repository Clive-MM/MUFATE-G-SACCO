import React from 'react';
import { Container, Typography, Box, Paper, Divider } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import FlagIcon from '@mui/icons-material/Flag';
import VisibilityIcon from '@mui/icons-material/Visibility';

const AboutUsSection = () => {
  return (
    <Box sx={{ background: 'linear-gradient(to bottom, #f4fff5, #ffffff)', py: 5 }}>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ px: 6, py: 5, borderRadius: 3 }}>
          {/* About Us Header */}
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#43a047',
              display: 'flex',
              alignItems: 'center',
              mb: 2
            }}
          >
            <InfoIcon sx={{ mr: 1 }} /> About Us
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', fontSize: '1rem', lineHeight: 1.8, mb: 3 }}
          >
            Mufate ‘G’ Sacco Society Limited is a savings and credit cooperative society started in 1987
            that provides financial services to farmers, business community and other institutions.
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* Mission Section */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h6"
              sx={{
                color: '#2e7d32',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                mb: 1
              }}
            >
              <FlagIcon sx={{ mr: 1 }} /> Our Mission
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
              To empower our customers economically through mobilization of resources & provision of quality,
              diversified and competitive financial solutions.
            </Typography>
          </Box>

          {/* Vision Section */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                color: '#2e7d32',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                mb: 1
              }}
            >
              <VisibilityIcon sx={{ mr: 1 }} /> Our Vision
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
              To be a leading financial service provider nationally.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AboutUsSection;
