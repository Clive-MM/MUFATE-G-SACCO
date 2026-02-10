import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CardContent,
  Chip,
  Divider,
  CircularProgress,
  Container
} from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { motion } from 'framer-motion';
import axios from 'axios';

// Aligned with your Footer branding
const BRAND = {
  gold: '#EC9B14',
  dark: '#02150F',
  light: '#F4F4F4',
  textMuted: 'rgba(244, 244, 244, 0.6)',
  cardBg: 'rgba(255, 255, 255, 0.03)'
};

const CareerListing = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await axios.get('https://mufate-g-sacco.onrender.com/careers');
        setCareers(res.data.careers);
      } catch (error) {
        console.error('❌ Failed to fetch career posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCareers();
  }, []);

  if (loading) {
    return (
      <Box sx={{ py: 10, textAlign: 'center', bgcolor: BRAND.dark }}>
        <CircularProgress sx={{ color: BRAND.gold }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: BRAND.dark,
        color: BRAND.light,
        px: { xs: 2, md: 0 },
        py: { xs: 8, md: 12 },
        minHeight: '60vh'
      }}
    >
      <Container maxWidth="lg">
        {/* SECTION TITLE */}
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontWeight: 900,
            color: BRAND.gold,
            mb: 6,
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          Explore Current Vacancies
        </Typography>

        {careers.length === 0 ? (
          <Typography
            textAlign="center"
            sx={{
              color: BRAND.textMuted,
              fontSize: '1.1rem',
              fontStyle: 'italic'
            }}
          >
            No vacant career opportunities at the moment.
          </Typography>
        ) : (
          careers.map((job) => (
            <motion.div
              key={job.CareerID}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              style={{
                backgroundColor: BRAND.cardBg,
                borderRadius: '12px',
                marginBottom: '32px',
                border: '1px solid rgba(236, 155, 20, 0.15)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                {/* JOB TITLE */}
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    mb: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    color: BRAND.gold,
                  }}
                >
                  <WorkOutlineIcon />
                  {job.JobTitle}
                </Typography>

                {/* JOB TYPE */}
                <Chip
                  label={job.JobType}
                  sx={{
                    backgroundColor: 'rgba(236, 155, 20, 0.1)',
                    color: BRAND.gold,
                    fontWeight: 700,
                    mb: 3,
                    borderRadius: '4px',
                    border: `1px solid ${BRAND.gold}`,
                    height: '28px'
                  }}
                />

                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, color: BRAND.light, mb: 1 }}
                >
                  Job Description
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: BRAND.textMuted,
                    fontSize: '1rem',
                    lineHeight: 1.7,
                    mb: 3
                  }}
                >
                  {job.JobDescription}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Typography variant="body2" sx={{ color: BRAND.light }}>
                    <strong style={{ color: BRAND.gold }}>Requirements:</strong> {job.Requirements}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      fontWeight: 'bold',
                      color: BRAND.gold,
                    }}
                  >
                    <AccessTimeIcon fontSize="small" />
                    Deadline: {job.Deadline}
                  </Typography>
                </Box>

                <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.05)' }} />

                <Typography
                  variant="body2"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: BRAND.textMuted,
                  }}
                >
                  <MailOutlineIcon fontSize="small" sx={{ color: BRAND.gold }} />
                  <strong>How to Apply:</strong> {job.ApplicationInstructions}
                </Typography>
              </CardContent>
            </motion.div>
          ))
        )}
      </Container>
    </Box>
  );
};

export default CareerListing;