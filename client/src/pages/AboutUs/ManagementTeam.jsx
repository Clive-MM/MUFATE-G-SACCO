import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { 
  Box, Typography, Card, CardMedia, CardContent, 
  Grid, Skeleton, Container 
} from '@mui/material';
import Footer from '../../components/Footer';

const ManagementTeam = () => {
  const [managementList, setManagementList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Standard fetch with loading state for UX
    setLoading(true);
    axios
      .get('https://mufate-g-sacco.onrender.com/management/view')
      .then(response => {
        setManagementList(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching management data:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const COLORS = {
    gold: '#EC9B14',      
    dark: '#02150F',      
    textMuted: 'rgba(244, 244, 244, 0.6)', 
    light: '#F4F4F4',
  };

  return (
    <Box
      sx={{
        background: COLORS.dark,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        pt: { xs: 12, md: 18 }, // Mobile-first padding
        pb: 5,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontWeight: 900,
            mb: { xs: 5, md: 8 },
            letterSpacing: '3px',
            color: COLORS.gold,
            textTransform: 'uppercase',
            fontSize: { xs: '1.4rem', md: '2.2rem' },
            textShadow: `0 0 15px ${COLORS.gold}33`,
          }}
        >
          MANAGEMENT TEAM
        </Typography>

        {/* --- THE FIX --- */}
        {/* We REMOVE 'justifyContent="center"' here to prevent single centering */}
        <Grid 
          container 
          spacing={{ xs: 2, md: 4 }} 
          sx={{ flexGrow: 1 }}
        >
          {loading ? (
            // SKELETON LOADING STATE (Mobile-First 2-column)
            // Shows 6 shimmering placeholders immediately
            Array.from(new Array(6)).map((_, index) => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
                <Skeleton 
                  variant="rectangular" 
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.05)', 
                    borderRadius: 3, 
                    height: { xs: 180, md: 380 } 
                  }} 
                />
                <Skeleton sx={{ bgcolor: 'rgba(255,255,255,0.05)', mt: 1 }} width="80%" />
                <Skeleton sx={{ bgcolor: 'rgba(255,255,255,0.05)' }} width="60%" />
              </Grid>
            ))
          ) : (
            managementList.map(member => (
              <Grid 
                item 
                xs={6}    // Strictly 2 cards per row on mobile
                sm={6}    
                md={4}    // Stays 3 cards for laptop view (your original design)
                lg={3}    // 4 cards on larger screens
                key={member.MGTID} 
                data-aos="zoom-in"
                sx={{ display: 'flex' }} // Important for vertical alignment
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    background: `rgba(255,255,255,0.03)`,
                    border: `1px solid rgba(255,255,255,0.1)`,
                    backdropFilter: "blur(8px)",
                    transition: 'all 0.4s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%', // Fills the 50% grid item
                    "&:hover": {
                      // Original hover effect preserved for Desktop ONLY
                      transform: { md: 'translateY(-10px)' }, 
                      boxShadow: `0 20px 50px rgba(0,0,0,0.7), 0 0 20px ${COLORS.gold}33`,
                      borderColor: COLORS.gold,
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={member.ImageURL}
                    alt={member.MGTName}
                    // --- PERFORMANCE OPTIMIZATION FOR MOBILE ---
                    loading="lazy" 
                    sx={{ 
                      // Reduced height for 2-column mobile view
                      height: { xs: 160, sm: 220, md: 380 }, 
                      objectFit: 'cover',
                      objectPosition: "top",
                      filter: "brightness(0.9)",
                    }}
                  />

                  <CardContent 
                    sx={{ 
                      textAlign: 'center', 
                      p: { xs: 1.5, md: 3 }, 
                      flexGrow: 1, // Pushes content down
                      display: 'flex', 
                      flexDirection: 'column', 
                      justifyContent: 'space-between' // Aligns text & badge
                    }}
                  >
                    <div>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 900,
                          // Shrink font slightly for mobile 2-column fit
                          fontSize: { xs: '0.8rem', md: '1.1rem' }, 
                          color: COLORS.gold,
                          textTransform: 'uppercase',
                          mb: { xs: 1, md: 1.5 },
                          letterSpacing: 0.5,
                          // --- UX OPTIMIZATION ---
                          // Forces long names to only use 2 lines to keep grid aligned
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          minHeight: { xs: '2.4em', md: 'auto' } 
                        }}
                      >
                        {member.MGTName}
                      </Typography>
                    </div>

                    <div>
                      <Typography
                        variant="body2"
                        sx={{
                          display: 'inline-block',
                          px: { xs: 1, md: 2 },
                          py: { xs: 0.4, md: 0.8 },
                          borderRadius: '4px',
                          background: COLORS.gold,
                          color: COLORS.dark, 
                          fontWeight: 800,
                          // Scaled badge for mobile fit
                          fontSize: { xs: '0.6rem', md: '0.75rem' }, 
                          letterSpacing: '0.5px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {member.Designation}
                      </Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>

      <Box sx={{ mt: 'auto' }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default ManagementTeam;