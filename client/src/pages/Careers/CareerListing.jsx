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
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #215732, #0a3d2e)',
        px: { xs: 2, md: 8 },
        py: { xs: 6, md: 10 },
        fontFamily: `'Segoe UI', sans-serif`,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: 'center',
          fontWeight: 800,
          color: '#fff',
          mb: 5,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          textShadow: '0 0 6px #f2a922',
        }}
      >
        Explore Current Vacancies
      </Typography>

      {careers.length === 0 ? (
        <Typography textAlign="center" color="#ffffffcc">
          No active career opportunities at the moment.
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
              backgroundColor: '#fff',
              borderRadius: '20px',
              padding: '24px',
              marginBottom: '40px',
              maxWidth: '900px',
              marginLeft: 'auto',
              marginRight: 'auto',
              boxShadow: '0px 5px 20px rgba(0,0,0,0.15)',
              border: '2px solid transparent',
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#014421',
                  fontSize: '1.4rem',
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <WorkOutlineIcon sx={{ fontSize: 24, color: '#2e7d32' }} />
                {job.JobTitle}
              </Typography>

              <Chip
                label={job.JobType}
                sx={{
                  backgroundColor: '#2e7d32',
                  color: '#fff',
                  fontWeight: 600,
                  mb: 2,
                  px: 2,
                  fontSize: '0.8rem',
                }}
              />

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: '#2e7d32',
                  mb: 0.5,
                  fontSize: '1.05rem',
                }}
              >
                Job Description:
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: '#333',
                  fontSize: '1.05rem',
                  mb: 1.5,
                }}
              >
                {job.JobDescription}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  fontStyle: 'italic',
                  mb: 1,
                  color: '#2e3d35',
                  fontSize: '0.95rem',
                }}
              >
                <strong>Requirements:</strong> {job.Requirements}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontWeight: 'bold',
                  color: '#333',
                  mb: 1,
                }}
              >
                <AccessTimeIcon sx={{ fontSize: 18, color: '#014421' }} />
                Deadline: {job.Deadline}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="body2"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: '#555',
                  fontSize: '0.95rem',
                }}
              >
                <MailOutlineIcon sx={{ fontSize: 18, color: '#014421' }} />
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
