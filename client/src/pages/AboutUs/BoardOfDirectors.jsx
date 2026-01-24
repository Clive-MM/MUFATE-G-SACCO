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
    AOS.init({ duration: 900, once: true });
  }, []);

  const COLORS = {
    deepGreen: "#011407",
    deepGreen2: "#01240F",
    gold: "#FFD700",
    deepGold: "#E6C200",
    softGold: "#FFF4B5",
  };

  return (
    <Box
  sx={{
    background: "#02150F",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    // CHANGE THIS: 
    // Increase pt (padding-top) to push content below the navbar.
    // pt: 12 is usually enough for standard navbars (approx 96px)
    pt: { xs: 10, md: 15 }, 
    pb: 5,
  }}
>
      {/* TITLE */}
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: 900,
          mb: 5,
          letterSpacing: 1.5,
          background: `linear-gradient(to right, ${COLORS.gold}, ${COLORS.softGold})`,
          WebkitBackgroundClip: "text",
          color: "transparent",
          textShadow: `0 0 18px ${COLORS.gold}55`,
        }}
      >
        BOARD OF DIRECTORS
      </Typography>

      {/* GRID */}
      <Grid container spacing={4} justifyContent="center" px={4}>
        {bodList.map(member => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            key={member.BODID}
            data-aos="zoom-in"
          >
            <Card
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                background: `rgba(255,255,255,0.04)`,
                border: `1.5px solid ${COLORS.gold}44`,
                backdropFilter: "blur(6px)",
                transition: "all 0.4s ease",
                boxShadow: `0 10px 30px rgba(0,0,0,0.45)`,

                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: `0 20px 50px rgba(0,0,0,0.7), 0 0 35px ${COLORS.gold}55`,
                  borderColor: COLORS.gold,
                },
              }}
            >
              {/* IMAGE */}
              <CardMedia
                component="img"
                height="380"
                image={member.ImageURL}
                alt={member.Name}
                sx={{
                  objectFit: "cover",
                  objectPosition: "top",
                  filter: "brightness(0.95)",
                }}
              />

              {/* TEXT */}
              <CardContent sx={{ textAlign: "center", py: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 900,
                    fontSize: "1.25rem",
                    color: COLORS.softGold,
                    textTransform: "uppercase",
                    mb: 1,
                    letterSpacing: 1,
                    textShadow: `0 0 6px ${COLORS.gold}55`,
                  }}
                >
                  {member.Name}
                </Typography>

                <Typography
                  className="designation"
                  variant="body1"
                  sx={{
                    display: "inline-block",
                    px: 2,
                    py: 0.7,
                    borderRadius: "10px",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    color: COLORS.deepGreen,
                    background: COLORS.gold,
                    boxShadow: `0 0 12px ${COLORS.gold}55`,
                    transition: "all 0.3s ease",

                    "&:hover": {
                      transform: "scale(1.08)",
                      boxShadow: `0 0 20px ${COLORS.gold}`,
                    },
                  }}
                >
                  {member.Designation}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Footer />
    </Box>
  );
};

export default BoardOfDirectors;
