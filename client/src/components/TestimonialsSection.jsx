import React, { useEffect, useState } from "react";
import { Box, Typography, Alert, Skeleton } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import "./TestimonialsSection.css";

const parent = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.12, duration: 0.5, ease: "easeOut" }
  }
};
const child = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://mufate-g-sacco.onrender.com/clients")
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
        <Alert severity="error" sx={{ maxWidth: 960, mx: "auto", mb: 3 }}>
          {error}
        </Alert>
      )}

      <motion.div
        className="testimonials-grid"
        variants={parent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <Box key={i} className="testimonial-card">
                <Skeleton variant="text" height={90} />
                <Skeleton variant="text" width="40%" />
              </Box>
            ))
          : testimonials.map((client) => (
              <motion.article
                key={client.ClientID}
                className="testimonial-card"
                variants={child}
                whileHover={{ scale: 1.04 }}
              >
                <blockquote className="testimonial-quote">
                  {client.ClientStatistic}
                </blockquote>
                <footer className="testimonial-name">— {client.ClientName}</footer>
              </motion.article>
            ))}
      </motion.div>
    </Box>
  );
}
