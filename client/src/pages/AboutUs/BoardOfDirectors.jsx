import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Box, Typography, Card, CardMedia, CardContent, Grid } from '@mui/material';
import Footer from '../../components/Footer';

const BoardOfDirectors = () => {
  const [bodList, setBodList] = useState([]);

  useEffect(() => {
    axios.get('https://mufate-g-sacco.onrender.com/bod/view')
      .then(response => setBodList(response.data))
      .catch(error => console.error('Error fetching BOD data:', error));
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ px: 4, py: 5, flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom align="center" fontWeight="bold" color="primary">
          Board of Directors
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {bodList.map(member => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={member.BODID} data-aos="fade-up">
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 2,
                  transition: 'all 0.4s ease',
                  border: '2px solid transparent',
                  '&:hover': {
                    boxShadow: '0 8px 16px rgba(34, 139, 34, 0.4)',
                    transform: 'translateY(-6px)',
                    borderColor: 'green',
                    '& .designation': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 0 12px rgba(34, 139, 34, 0.6)',
                    },
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={member.ImageURL}
                  alt={member.Name}
                  sx={{ objectFit: 'cover' }}
                />
                <CardContent sx={{ textAlign: 'center' }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      fontSize: '1.2rem',
                    }}
                  >
                    {member.Name}
                  </Typography>
                  <Typography
                    variant="body1"
                    className="designation"
                    sx={{
                      display: 'inline-block',
                      px: 2,
                      py: 0.5,
                      borderRadius: 1,
                      backgroundColor: 'rgba(0, 128, 0, 0.1)',
                      boxShadow: '0 2px 5px rgba(0, 128, 0, 0.2)',
                      fontWeight: 600,
                      color: '#2e7d32',
                      fontSize: '0.95rem',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {member.Designation}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
};

export default BoardOfDirectors;
