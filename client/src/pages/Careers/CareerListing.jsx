import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  Divider,
  CircularProgress,
} from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import axios from 'axios';

const CareerListing = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await axios.get('http://localhost:5000/careers');
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
          <Card
            key={job.CareerID}
            sx={{
              mb: 5,
              borderRadius: '20px',
              backgroundColor: '#fff',
              boxShadow: 4,
              transition: 'transform 0.4s ease, box-shadow 0.4s ease',
              '&:hover': {
                transform: 'scale(1.03)',
                boxShadow: '0 0 25px rgba(100, 221, 23, 0.6)',
                border: '2px solid #64dd17',
              },
              maxWidth: 900,
              mx: 'auto',
              px: 2,
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
                variant="body1"
                sx={{
                  color: '#333',
                  fontSize: '1.05rem',
                  mb: 1,
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
                  mb: 1,
                  fontWeight: 'bold',
                  color: '#333',
                }}
              >
                Deadline: {job.Deadline}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Typography
                variant="body2"
                sx={{
                  color: '#555',
                  fontSize: '0.95rem',
                }}
              >
                <strong>How to Apply:</strong> {job.ApplicationInstructions}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default CareerListing;
