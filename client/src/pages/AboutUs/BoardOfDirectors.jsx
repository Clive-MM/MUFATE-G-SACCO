import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Box, 
  Typography, 
  Card, 
  CardMedia, 
  CardContent, 
  Grid, 
  Container, 
  CircularProgress 
} from '@mui/material';
import { motion } from 'framer-motion';
import Footer from '../../components/Footer';

const BoardOfDirectors = () => {
  const [bodList, setBodList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://mufate-g-sacco.onrender.com/bod/view')
      .then(response => {
        setBodList(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching BOD data:', error);
        setLoading(false);
      });
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
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        // Precise padding to ensure content starts exactly below the navbar
        pt: { xs: 14, md: 22 }, 
        pb: 5,
      }}
    >
      <Container maxWidth="xl">
        {/* HEADER SECTION */}
        <Box sx={{ mb: { xs: 6, md: 10 }, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                color: COLORS.gold,
                textTransform: 'uppercase',
                fontSize: { xs: '2rem', md: '3.5rem' },
                letterSpacing: '0.1rem',
                mb: 1
              }}
            >
              Our Board
            </Typography>
            <Box 
              sx={{ 
                width: '60px', 
                height: '4px', 
                bgcolor: COLORS.gold, 
                mx: 'auto', 
                borderRadius: '2px',
                mb: 2
              }} 
            />
            <Typography
              sx={{
                color: COLORS.light,
                fontSize: { xs: '0.9rem', md: '1.1rem' },
                opacity: 0.7,
                maxWidth: '600px',
                mx: 'auto',
                fontWeight: 300,
                px: 2
              }}
            >
              A dedicated team of professionals steering Golden Generation DT SACCO towards a prosperous future.
            </Typography>
          </motion.div>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: COLORS.gold }} />
          </Box>
        ) : (
          <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
            {bodList.map((member, index) => (
              <Grid
                item
                xs={6} // 2 columns on mobile
                sm={4} // 3 columns on tablet
                md={3} // 4 columns on desktop
                key={member.BODID}
              >
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  sx={{ height: '100%' }}
                >
                  <Card
                    sx={{
                      borderRadius: { xs: '16px', md: '24px' },
                      overflow: "hidden",
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: "0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      "&:hover": {
                        transform: { md: "translateY(-10px)" },
                        borderColor: COLORS.gold,
                        bgcolor: 'rgba(236, 155, 20, 0.03)',
                        "& .member-img": { transform: 'scale(1.08)' }
                      },
                    }}
                  >
                    {/* IMAGE CONTAINER */}
                    <Box sx={{ overflow: 'hidden', position: 'relative' }}>
                      <CardMedia
                        component="img"
                        image={member.ImageURL}
                        alt={member.Name}
                        className="member-img"
                        sx={{
                          height: { xs: 200, sm: 280, md: 380 },
                          width: '100%',
                          objectFit: "cover",
                          objectPosition: "top",
                          transition: '0.6s ease',
                        }}
                      />
                    </Box>

                    {/* CONTENT AREA */}
                    <CardContent 
                      sx={{ 
                        textAlign: "center", 
                        p: { xs: 2, md: 3 }, 
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 900,
                          fontSize: { xs: "0.9rem", md: "1.2rem" },
                          color: COLORS.gold,
                          textTransform: "uppercase",
                          lineHeight: 1.2,
                          mb: 1
                        }}
                      >
                        {member.Name}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: "0.65rem", md: "0.8rem" },
                          color: COLORS.light,
                          fontWeight: 700,
                          letterSpacing: 1,
                          textTransform: 'uppercase',
                          opacity: 0.6,
                          pt: 1,
                          borderTop: `1px solid rgba(255, 255, 255, 0.1)`
                        }}
                      >
                        {member.Designation}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <Box sx={{ mt: 10 }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default BoardOfDirectors;