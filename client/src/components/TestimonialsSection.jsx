import React, { useEffect, useState } from "react";
import { Box, Typography, Alert, Skeleton } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import "aos/dist/aos.css";
import AOS from "aos";
import "./TestimonialsSection.css";

const API = "https://mufate-g-sacco.onrender.com/clients";

// brand colors used in Products heading
const GOLD = "#FFD700";
const LIGHT_GOLD = "#FFE066";
const DARK_BG =
  "linear-gradient(135deg, #021409 0%, #013716 45%, #000a06 100%)";

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
      className="testimonials-section"
      role="region"
      aria-label="Member reviews"
      sx={{ background: DARK_BG }}
    >
      {/* SECTION TITLE — styled exactly like the Products heading */}
      <Typography
        variant="h4"
        data-aos="fade-up"
        sx={{
          fontWeight: 800,
          textAlign: "center",
          mb: 6,
          textTransform: "uppercase",
          letterSpacing: 1.5,
          color: "transparent",
          backgroundImage: `linear-gradient(to right, ${GOLD}, ${LIGHT_GOLD})`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: { xs: "1.9rem", md: "2.4rem" },
          textShadow: `0 0 12px ${GOLD}88`,
          marginTop: "-0.5rem", // small upward nudge if needed to match vertical placement
        }}
      >
        REVIEWS
      </Typography>

      {error && (
        <Alert severity="error" className="testimonial-alert">
          {error}
        </Alert>
      )}

      <Box className="testimonials-grid">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Box key={i} className="testimonial-card">
                <Skeleton variant="text" height={90} />
                <Skeleton variant="text" width="50%" />
              </Box>
            ))
          : testimonials.map((client, index) => (
              <motion.article
                key={client.ClientID}
                className="testimonial-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ scale: 1.04 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <blockquote className="testimonial-quote">
                  {client.ClientStatistic}
                </blockquote>

                <footer className="testimonial-name">
                  {client.ClientName}
                </footer>
              </motion.article>
            ))}
      </Box>
    </Box>
  );
};

export default TestimonialsSection;
