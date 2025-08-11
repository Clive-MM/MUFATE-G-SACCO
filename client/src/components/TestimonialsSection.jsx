import React, { useEffect, useState } from "react";
import { Box, Typography, Alert, Skeleton } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import "./TestimonialsSection.css";

const API = "https://mufate-g-sacco.onrender.com/clients";

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(API)
      .then((res) => setTestimonials(res.data?.clients ?? []))
      .catch(() => setError("Could not load reviews. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Box className="testimonials-section" role="region" aria-label="Member reviews">
      <Typography className="testimonial-title" component="h2">
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
                <footer className="testimonial-name">{client.ClientName}</footer>
              </motion.article>
            ))}
      </Box>
    </Box>
  );
};

export default TestimonialsSection;
