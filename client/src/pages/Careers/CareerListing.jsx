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
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <CircularProgress sx={{ color: '#E8C46A' }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #011B0A, #012A12)',
        px: { xs: 2, md: 8 },
        py: { xs: 6, md: 10 },
        fontFamily: `'Segoe UI', sans-serif`,
      }}
    >
      {/* SECTION TITLE */}
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          fontWeight: 900,
          background: 'linear-gradient(to right, #FFD700, #FFF4B2)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          mb: 5,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          textShadow: '0 0 18px rgba(255,215,0,0.55)',
        }}
      >
        Explore Current Vacancies
      </Typography>

      {careers.length === 0 ? (
        <Typography
          textAlign="center"
          sx={{
            color: '#FFECA8',
            fontSize: '1.1rem',
            textShadow: '0 0 8px rgba(0,0,0,0.4)',
          }}
        >
          No vacant career opportunities at the moment.
        </Typography>
      ) : (
        careers.map((job) => (
          <motion.div
            key={job.CareerID}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            whileHover={{ scale: 1.02 }}
            style={{
              backgroundColor: 'rgba(255,255,255,0.07)',
              borderRadius: '18px',
              padding: '26px',
              marginBottom: '40px',
              maxWidth: '900px',
              marginLeft: 'auto',
              marginRight: 'auto',
              border: '1px solid rgba(255,215,0,0.35)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <CardContent>
              {/* JOB TITLE */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  fontSize: '1.45rem',
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  background: 'linear-gradient(to right, #FFD700, #FFF4B2)',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  textShadow: '0 0 10px rgba(255,215,0,0.5)',
                }}
              >
                <WorkOutlineIcon sx={{ fontSize: 26, color: '#FFD700' }} />
                {job.JobTitle}
              </Typography>

              {/* JOB TYPE */}
              <Chip
                label={job.JobType}
                sx={{
                  backgroundColor: '#013D19',
                  color: '#FFD700',
                  fontWeight: 700,
                  mb: 2,
                  px: 2.5,
                  border: '1px solid rgba(255,215,0,0.55)',
                }}
              />

              {/* DESCRIPTION LABEL */}
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  color: '#FFECA8',
                  mb: 1,
                  fontSize: '1.1rem',
                }}
              >
                Job Description:
              </Typography>

              {/* JOB DESCRIPTION */}
              <Typography
                variant="body1"
                sx={{
                  color: '#FFF',
                  opacity: 0.85,
                  fontSize: '1.05rem',
                  lineHeight: 1.6,
                }}
              >
                {job.JobDescription}
              </Typography>

              {/* REQUIREMENTS */}
              <Typography
                variant="body2"
                sx={{
                  mt: 1.5,
                  fontStyle: 'italic',
                  color: '#FFECA8',
                  fontSize: '1rem',
                }}
              >
                <strong>Requirements:</strong> {job.Requirements}
              </Typography>

              {/* DEADLINE */}
              <Typography
                variant="body2"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontWeight: 'bold',
                  color: '#FFF4B2',
                  mt: 2,
                }}
              >
                <AccessTimeIcon sx={{ fontSize: 18, color: '#FFD700' }} />
                Deadline: {job.Deadline}
              </Typography>

              <Divider
                sx={{
                  my: 2,
                  borderColor: 'rgba(255,215,0,0.3)',
                }}
              />

              {/* APPLICATION INSTRUCTIONS */}
              <Typography
                variant="body2"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: '#FFF',
                  opacity: 0.85,
                  fontSize: '1rem',
                }}
              >
                <MailOutlineIcon sx={{ fontSize: 18, color: '#FFD700' }} />
                <strong>How to Apply:</strong> {job.ApplicationInstructions}
              </Typography>
            </CardContent>
          </motion.div>
        ))
      )}
    </Box>
  );
};

export default CareerListing;
