import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CardContent,
  Chip,
  Divider,
  CircularProgress,
} from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { motion } from 'framer-motion';
import axios from 'axios';

const CareerListing = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Standardized Brand Colors
  const COLORS = {
    gold: '#EC9B14',      
    dark: '#02150F',      
    light: '#F4F4F4',
    cardGlass: 'rgba(255, 255, 255, 0.05)',
  };

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
      <Box sx={{ py: 10, textAlign: 'center', background: COLORS.dark, minHeight: '100vh' }}>
        <CircularProgress sx={{ color: COLORS.gold }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: COLORS.dark,
        // Standardized padding to prevent Navbar overlap
        pt: { xs: 14, md: 20 }, 
        pb: { xs: 8, md: 12 },
        px: { xs: 2, md: 8 },
        minHeight: '100vh',
      }}
    >
      {/* SECTION TITLE - Standardized Style */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontWeight: 900,
            color: COLORS.gold,
            mb: 8,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            fontSize: { xs: '1.5rem', md: '2.4rem' },
            textShadow: `0 0 15px ${COLORS.gold}33`,
          }}
        >
          Explore Current Vacancies
        </Typography>
      </motion.div>

      {careers.length === 0 ? (
        <Typography
          textAlign="center"
          sx={{
            color: COLORS.light,
            opacity: 0.7,
            fontSize: '1.1rem',
          }}
        >
          No vacant career opportunities at the moment.
        </Typography>
      ) : (
        careers.map((job, idx) => (
          <motion.div
            key={job.CareerID}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
            style={{
              backgroundColor: COLORS.cardGlass,
              borderRadius: '22px', // Matches LoanCard & ResourceCard
              padding: '20px',
              marginBottom: '30px',
              maxWidth: '900px',
              marginLeft: 'auto',
              marginRight: 'auto',
              border: `1px solid ${COLORS.gold}33`,
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <CardContent>
              {/* JOB TITLE */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 900,
                  fontSize: '1.4rem',
                  mb: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  color: COLORS.gold,
                }}
              >
                <WorkOutlineIcon sx={{ fontSize: 28, color: COLORS.gold }} />
                {job.JobTitle}
              </Typography>

              {/* JOB TYPE */}
              <Chip
                label={job.JobType}
                sx={{
                  backgroundColor: COLORS.gold,
                  color: COLORS.dark,
                  fontWeight: 800,
                  mb: 3,
                  px: 1,
                  textTransform: 'uppercase',
                  fontSize: '0.7rem',
                  borderRadius: '8px',
                }}
              />

              <Divider sx={{ mb: 3, borderColor: 'rgba(255,255,255,0.1)' }} />

              {/* JOB DESCRIPTION */}
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ fontWeight: 800, color: COLORS.gold, textTransform: 'uppercase', fontSize: '0.85rem', mb: 1 }}>
                  Job Description
                </Typography>
                <Typography sx={{ color: COLORS.light, opacity: 0.9, lineHeight: 1.7 }}>
                  {job.JobDescription}
                </Typography>
              </Box>

              {/* REQUIREMENTS */}
              <Box sx={{ mb: 3 }}>
                <Typography sx={{ fontWeight: 800, color: COLORS.gold, textTransform: 'uppercase', fontSize: '0.85rem', mb: 1 }}>
                  Requirements
                </Typography>
                <Typography sx={{ color: COLORS.light, opacity: 0.8, fontSize: '0.95rem' }}>
                  {job.Requirements}
                </Typography>
              </Box>

              {/* DEADLINE & APPLICATION */}
              <Box sx={{ 
                mt: 4, 
                p: 2, 
                borderRadius: '12px', 
                background: 'rgba(0,0,0,0.2)', 
                border: `1px dashed ${COLORS.gold}44` 
              }}>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    fontWeight: 700,
                    color: COLORS.gold,
                    mb: 1,
                  }}
                >
                  <AccessTimeIcon sx={{ fontSize: 18 }} />
                  Deadline: {job.Deadline}
                </Typography>
                
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: COLORS.light,
                    fontSize: '0.9rem',
                  }}
                >
                  <MailOutlineIcon sx={{ fontSize: 18, color: COLORS.gold }} />
                  <strong>Apply via:</strong> {job.ApplicationInstructions}
                </Typography>
              </Box>
            </CardContent>
          </motion.div>
        ))
      )}
    </Box>
  );
};

export default CareerListing;