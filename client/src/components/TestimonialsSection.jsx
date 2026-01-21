import React, { useEffect, useState } from "react";
import { Box, Typography, Alert, Skeleton, Container, Card, CardContent } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import "aos/dist/aos.css";
import AOS from "aos";

const API = "https://mufate-g-sacco.onrender.com/clients";

// Identical Brand Palette
const BRAND = {
  gold: "#EC9B14",
  lightGold: "#FFC25F",
  dark: "#02150F",
  light: "#F4F4F4",
};

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });
    axios
      .get(API)
      .then((res) => setTestimonials(res.data?.clients ?? []))
      .catch(() =>
        setError("Could not load reviews. Please try again later.")
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box 
      sx={{ 
        bgcolor: BRAND.dark, 
        py: { xs: 8, md: 12 }, 
        width: '100%' 
      }}
    >
      <Container maxWidth="xl">
        {/* SECTION TITLE — Matching Identity Section exactly */}
        <Typography
          variant="h2"
          textAlign="center"
          data-aos="fade-up"
          sx={{
            color: BRAND.gold,
            fontWeight: 900,
            mb: 10,
            textTransform: "uppercase",
            fontSize: { xs: "2.5rem", md: "3.75rem" },
            letterSpacing: '0.1rem'
          }}
        >
          Reviews
        </Typography>

        {error && (
          <Container maxWidth="sm">
            <Alert 
              severity="error" 
              sx={{ mb: 4, bgcolor: 'rgba(211, 47, 47, 0.1)', color: '#ff8a80' }}
            >
              {error}
            </Alert>
          </Container>
        )}

        {/* Grid Layout — Matching Identity Section Logic */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            justifyContent: 'center',
            gap: 4,
            maxWidth: '1200px',
            mx: 'auto'
          }}
        >
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card 
                  key={i} 
                  sx={{ bgcolor: 'rgba(255, 255, 255, 0.03)', borderRadius: '24px', p: 2 }}
                >
                  <Skeleton variant="text" height={100} sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
                  <Skeleton variant="text" width="50%" sx={{ bgcolor: 'rgba(255,255,255,0.1)' }} />
                </Card>
              ))
            : testimonials.map((client, index) => (
                <Card
                  key={client.ClientID}
                  component={motion.article}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  whileHover={{ y: -8 }}
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '24px',
                    color: BRAND.light,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: '0.3s'
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: 'center' }}>
                    {/* Quote Text - White/Light with high opacity */}
                    <Typography
                      sx={{
                        fontStyle: 'italic',
                        fontSize: '1.1rem',
                        lineHeight: 1.8,
                        color: BRAND.light,
                        opacity: 0.9,
                        mb: 4,
                        position: 'relative',
                        '&::before': {
                           content: '"“"',
                           color: BRAND.gold,
                           fontSize: '3rem',
                           position: 'absolute',
                           top: -20,
                           left: -10,
                           opacity: 0.3
                        }
                      }}
                    >
                      {client.ClientStatistic}
                    </Typography>

                    {/* Footer Name - Bold Gold */}
                    <Typography
                      variant="h6"
                      sx={{
                        color: BRAND.gold,
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1rem',
                        fontSize: '1rem'
                      }}
                    >
                      {client.ClientName}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
        </Box>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;