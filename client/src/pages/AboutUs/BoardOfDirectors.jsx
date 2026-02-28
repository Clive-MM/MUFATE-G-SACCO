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
        pt: { xs: 10, md: 18 }, 
        pb: 5,
      }}
    >
      <Container maxWidth="xl">
        {/* TITLE SECTION */}
        <Box sx={{ mb: { xs: 5, md: 8 }, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                letterSpacing: { xs: '1px', md: '3px' },
                color: COLORS.gold,
                textTransform: 'uppercase',
                fontSize: { xs: '1.4rem', md: '2.5rem' },
                textShadow: `0 0 15px ${COLORS.gold}33`,
              }}
            >
              Our Leadership
            </Typography>
            <Typography
              sx={{
                color: COLORS.textMuted,
                fontSize: { xs: '0.8rem', md: '1rem' },
                mt: 1,
                fontWeight: 500
              }}
            >
              The Visionaries Behind Golden Generation DT SACCO
            </Typography>
          </motion.div>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
            <CircularProgress sx={{ color: COLORS.gold }} />
          </Box>
        ) : (
          <Grid container spacing={{ xs: 1.5, md: 4 }} justifyContent="center">
            {bodList.map((member, index) => (
              <Grid
                item
                xs={6} // 2 per row on mobile
                sm={4} // 3 per row on tablets
                md={3} // 4 per row on laptops
                key={member.BODID}
              >
                <Box
                  component={motion.div}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  sx={{ height: '100%' }}
                >
                  <Card
                    sx={{
                      borderRadius: { xs: 2, md: 3 },
                      overflow: "hidden",
                      background: `rgba(255,255,255,0.02)`,
                      border: `1px solid rgba(255,255,255,0.08)`,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: "all 0.4s ease",
                      "&:hover": {
                        transform: { md: "translateY(-10px)" },
                        borderColor: COLORS.gold,
                        boxShadow: `0 10px 30px rgba(0,0,0,0.5)`,
                      },
                    }}
                  >
                    {/* IMAGE - Reduced height for mobile to fit grid */}
                    <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        image={member.ImageURL}
                        alt={member.Name}
                        sx={{
                          height: { xs: 180, sm: 250, md: 320 },
                          objectFit: "cover",
                          objectPosition: "top",
                          filter: "grayscale(20%)",
                          transition: '0.6s ease',
                          "&:hover": { filter: "grayscale(0%)", transform: 'scale(1.05)' }
                        }}
                      />
                    </Box>

                    <CardContent 
                      sx={{ 
                        textAlign: "center", 
                        p: { xs: 1.5, md: 3 }, 
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: 1
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 800,
                          fontSize: { xs: "0.85rem", md: "1.1rem" },
                          color: COLORS.gold,
                          textTransform: "uppercase",
                          lineHeight: 1.2
                        }}
                      >
                        {member.Name}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          fontSize: { xs: "0.65rem", md: "0.75rem" },
                          color: COLORS.light,
                          fontWeight: 600,
                          opacity: 0.8,
                          letterSpacing: 0.5,
                          textTransform: 'uppercase',
                          borderTop: `1px solid ${COLORS.gold}44`,
                          pt: 1,
                          mt: 'auto'
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