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
    axios
      .get('https://mufate-g-sacco.onrender.com/resources/recent')
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
      {/* 🌑 Deep Green Background Brand */}
      <Box sx={{ background: 'linear-gradient(135deg, #011407, #01240F)' }}>
        <Box sx={{ pt: 6, pb: 6, px: { xs: 2, md: 10 } }}>
          
          {/* ⭐ Gold Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '1.8rem', md: '2.4rem' },
                letterSpacing: '1px',
                textTransform: 'uppercase',
                background: 'linear-gradient(to right, #FFD700, #FFF4B5)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                mb: 5,
              }}
            >
              Access SACCO Documents
            </Typography>
          </motion.div>

          {/* LOADING */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
              <CircularProgress sx={{ color: '#FFD700' }} />
            </Box>
          ) : (
            <Grid container spacing={4} justifyContent="center">
              {resources.map((res, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    whileHover={{ scale: 1.03 }}
                  >
                    {/* 📄 Document Card */}
                    <Card
                      sx={{
                        borderRadius: 3,
                        p: 2,
                        backgroundColor: '#01240F',
                        border: '1px solid rgba(255,215,0,0.2)',
                        boxShadow:
                          '0 10px 25px rgba(0,0,0,0.45), 0 0 18px rgba(255,215,0,0.25)',
                        transition:
                          'transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-6px)',
                          border: '1px solid #FFD700',
                          boxShadow:
                            '0 15px 35px rgba(0,0,0,0.5), 0 0 25px rgba(255,215,0,0.4)',
                        },
                      }}
                    >
                      <CardContent sx={{ textAlign: 'center' }}>
                        {/* Title */}
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 800,
                            mb: 2,
                            background: 'linear-gradient(to right, #FFD700, #FFF4B5)',
                            WebkitBackgroundClip: 'text',
                            color: 'transparent',
                            letterSpacing: '0.5px',
                          }}
                        >
                          {res.Title}
                        </Typography>

                        {/* Download Button */}
                        <Button
                          onClick={() => handleDownload(res.FilePath)}
                          variant="contained"
                          startIcon={<CloudDownload />}
                          sx={{
                            background:
                              'linear-gradient(135deg, #FFD700, #E6C200)',
                            color: '#000',
                            px: 3,
                            fontWeight: 700,
                            borderRadius: '25px',
                            boxShadow: '0 4px 12px rgba(255,215,0,0.35)',
                            '&:hover': {
                              background:
                                'linear-gradient(135deg, #E6C200, #FFD700)',
                              transform: 'scale(1.07)',
                              boxShadow: '0 6px 18px rgba(255,215,0,0.55)',
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

        <Box sx={{ mt: '-10px' }}>
          <Footer />
        </Box>
      </Box>
    </motion.div>
  );
};

export default ResourcesPage;
