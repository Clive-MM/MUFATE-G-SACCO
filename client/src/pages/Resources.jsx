import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
} from '@mui/material';
import { CloudDownload } from '@mui/icons-material';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://mufate-g-sacco.onrender.com/resources/recent')
      .then(res => {
        setResources(res.data.resources);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching resources:', err);
        setLoading(false);
      });
  }, []);

  const handleDownload = (fileUrl) => {
    window.open(fileUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Box sx={{ background: 'radial-gradient(circle at top, #e8f5e9, #1b5e20)' }}>
        <Box sx={{ pt: 6, pb: 6, px: { xs: 2, md: 10 } }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '1.8rem', md: '2.2rem' },
                color: '#64dd17',
                letterSpacing: '0.5px',
                mb: 5,
              }}
            >
              Access SACCO Documents.
            </Typography>
          </motion.div>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={4} justifyContent="center">
              {resources.map((res, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card
                      sx={{
                        borderRadius: 4,
                        p: 2,
                        backgroundColor: '#ffffff',
                        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 8px 25px rgba(255, 215, 0, 0.25)',
                        },
                      }}
                    >
                      <CardContent sx={{ textAlign: 'center' }}>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 700, mb: 2, color: '#2e7d32' }}
                        >
                          {res.Title}
                        </Typography>
                        <Button
                          onClick={() => handleDownload(res.FilePath)}
                          variant="contained"
                          startIcon={<CloudDownload />}
                          sx={{
                            backgroundColor: '#1b5e20',
                            color: '#fff',
                            px: 3,
                            fontWeight: 600,
                            '&:hover': {
                              backgroundColor: '#33691e',
                              boxShadow: '0 0 12px #ffd700',
                              transform: 'scale(1.06)',
                            },
                            transition: 'all 0.3s ease-in-out',
                          }}
                        >
                          Download
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        <Box sx={{ mt: '-24px' }}>
          <Footer />
        </Box>
      </Box>
    </motion.div>
  );
};

export default ResourcesPage;
