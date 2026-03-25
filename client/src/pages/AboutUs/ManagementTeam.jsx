import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  Box, Typography, Card, CardMedia, CardContent, 
  Grid, Skeleton, Container, Fade 
} from '@mui/material';
import Footer from '../../components/Footer';

const ManagementTeam = () => {
  const [managementList, setManagementList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. PERFORMANCE: Fetching with loading state to prevent layout shift
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://mufate-g-sacco.onrender.com/management/view');
        setManagementList(response.data);
      } catch (error) {
        console.error('Error fetching management data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, disable: 'mobile' }); // Disable heavy AOS on slow mobile CPUs
  }, []);

  const COLORS = {
    gold: '#EC9B14',      
    dark: '#02150F',      
    border: 'rgba(236, 155, 20, 0.2)', // Subtler gold border
    glass: 'rgba(255, 255, 255, 0.03)',
  };

  return (
    <Box sx={{ background: COLORS.dark, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ pt: { xs: 12, md: 20 }, pb: 8, flexGrow: 1 }}>
        <Container maxWidth="lg">
          
          {/* HEADER SECTION */}
          <Typography
            variant="h4"
            align="center"
            sx={{
              fontWeight: 900,
              mb: { xs: 4, md: 10 },
              color: COLORS.gold,
              textTransform: 'uppercase',
              fontSize: { xs: '1.5rem', md: '2.5rem' },
              letterSpacing: '2px',
            }}
          >
            Management Team
          </Typography>

          {/* TEAM GRID: Forced 2-column on mobile, 3 on tablet, 4 on desktop */}
          <Grid container spacing={{ xs: 1.5, sm: 3, md: 4 }}>
            {loading ? (
              // UX: Loading Skeletons that match the real card shape
              Array.from(new Array(4)).map((_, i) => (
                <Grid item xs={6} sm={4} md={3} key={i}>
                  <Skeleton variant="rectangular" height={220} sx={{ bgcolor: COLORS.glass, borderRadius: 2 }} />
                  <Skeleton width="80%" sx={{ bgcolor: COLORS.glass, mt: 1 }} />
                  <Skeleton width="40%" sx={{ bgcolor: COLORS.glass }} />
                </Grid>
              ))
            ) : (
              managementList.map((member) => (
                <Grid item xs={6} sm={4} md={3} key={member.MGTID}>
                  <Fade in={true} timeout={500}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        background: COLORS.glass,
                        borderRadius: { xs: 2, md: 4 },
                        border: `1px solid ${COLORS.border}`,
                        backdropFilter: 'blur(10px)',
                        transition: 'transform 0.3s ease, border-color 0.3s ease',
                        '&:hover': {
                          transform: { md: 'translateY(-8px)' },
                          borderColor: COLORS.gold,
                        },
                      }}
                    >
                      {/* IMAGE: Optimized with lazy loading */}
                      <CardMedia
                        component="img"
                        image={member.ImageURL}
                        alt={member.MGTName}
                        loading="lazy"
                        sx={{
                          height: { xs: 160, sm: 220, md: 320 },
                          objectFit: 'cover',
                          objectPosition: 'top',
                        }}
                      />

                      {/* CONTENT: Force alignment of badges regardless of name length */}
                      <CardContent 
                        sx={{ 
                          p: { xs: 1.5, md: 3 }, 
                          textAlign: 'center', 
                          flexGrow: 1, 
                          display: 'flex', 
                          flexDirection: 'column', 
                          justifyContent: 'space-between' 
                        }}
                      >
                        <Typography
                          sx={{
                            color: '#FFF',
                            fontWeight: 800,
                            fontSize: { xs: '0.85rem', md: '1.1rem' },
                            textTransform: 'uppercase',
                            mb: 1.5,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            minHeight: '2.4em' // Ensures row alignment
                          }}
                        >
                          {member.MGTName}
                        </Typography>

                        <Typography
                          variant="caption"
                          sx={{
                            backgroundColor: COLORS.gold,
                            color: COLORS.dark,
                            fontWeight: 900,
                            px: 1.5,
                            py: 0.5,
                            borderRadius: '4px',
                            fontSize: { xs: '0.65rem', md: '0.75rem' },
                            display: 'inline-block',
                            width: 'fit-content',
                            alignSelf: 'center'
                          }}
                        >
                          {member.Designation}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default ManagementTeam;