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

  // Standardized Brand Colors from Golden Generation DT Sacco
  const COLORS = {
    gold: '#EC9B14',      
    dark: '#02150F',      
    light: '#F4F4F4',
  };

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
    <Box
      sx={{
        background: COLORS.dark,
        // Standardized padding to push content below the fixed Navbar
        pt: { xs: 14, md: 20 }, 
        pb: { xs: 6, md: 8 },
        minHeight: '100vh'
      }}
    >
      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, md: 10 } }}>
        
        {/* ⭐ Standardized Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 900,
              textTransform: 'uppercase',
              mb: 8, // Increased margin for better breathing room
              letterSpacing: '3px',
              color: COLORS.gold,
              fontSize: { xs: '1.5rem', md: '2.4rem' },
              textShadow: `0 0 15px ${COLORS.gold}33`,
            }}
          >
            Access SACCO Documents
          </Typography>
        </motion.div>

        {/* LOADING STATE */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <CircularProgress sx={{ color: COLORS.gold }} />
          </Box>
        ) : (
          <Grid container spacing={4} justifyContent="center">
            {resources.map((res, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card
                    sx={{
                      borderRadius: '22px', // Matches LoanCard style
                      p: 2,
                      backgroundColor: 'rgba(255,255,255,0.03)', // Subtle dark glass
                      border: `1px solid ${COLORS.gold}33`,
                      boxShadow: '0 8px 28px rgba(0,0,0,0.25)',
                      transition: '0.35s ease',
                      '&:hover': {
                        transform: 'translateY(-6px)',
                        border: `1px solid ${COLORS.gold}`,
                        boxShadow: `0 0 25px ${COLORS.gold}40`,
                      },
                    }}
                  >
                    <CardContent sx={{ textAlign: 'center' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 800,
                          mb: 3,
                          color: COLORS.light,
                          letterSpacing: '0.5px',
                          fontSize: '1.1rem'
                        }}
                      >
                        {res.Title}
                      </Typography>

                      <Button
                        onClick={() => handleDownload(res.FilePath)}
                        variant="contained"
                        startIcon={<CloudDownload />}
                        sx={{
                          background: COLORS.gold,
                          color: COLORS.dark,
                          px: 4,
                          fontWeight: 800,
                          borderRadius: '12px',
                          textTransform: 'uppercase',
                          fontSize: '0.75rem',
                          '&:hover': {
                            background: COLORS.light,
                            transform: 'scale(1.05)',
                          },
                          transition: 'all 0.3s ease',
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

      {/* GOLD DIVIDER before footer */}
      <Box
        sx={{
          height: '4px',
          background: COLORS.gold,
          mt: 10,
          opacity: 0.2
        }}
      />
      <Footer />
    </Box>
  );
};

export default ResourcesPage;