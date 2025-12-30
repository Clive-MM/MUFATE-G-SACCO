import React, { useEffect, useState } from "react";
import axios from "axios";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import {
  Container,
  Typography,
  Grid,
  
  CardMedia,
  CardContent,
  CircularProgress,
  Box,
  useTheme,
  
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";

const SaccoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  
  

  

  useEffect(() => {
    axios
      .get("https://mufate-g-sacco.onrender.com/gallery")
      .then((res) => {
        setPhotos(res.data.gallery || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to load gallery:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #76f15dff, #54f42cff)",
        py: { xs: 4, sm: 6 },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          background: "#fff",
          borderRadius: 3,
          boxShadow: "0px 5px 20px rgba(0,0,0,0.1)",
          py: 4,
          px: 3,
        }}
      >
        {/* ✅ Green Heading Style */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: { xs: "1.8rem", md: "2.5rem" },
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "#41E116",
            letterSpacing: "1px",
            mb: 4,
          }}
        >
          📸 GOLDEN GENERATION DT SACCO GALLERY
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" py={5}>
            <CircularProgress />
          </Box>
        ) : (
          <LightGallery speed={500} plugins={[]} elementClassNames="custom-gallery">
            <Grid container spacing={3} justifyContent="center">
              {photos.map((photo, idx) => (
                <Grid item xs={12} sm={6} md={4} key={idx}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        borderRadius: 3,
                        overflow: "hidden",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.03)",
                          boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3)",
                        },
                      }}
                    >
                      <a
                        href={photo.ImageURL}
                        data-sub-html={`<div style="text-align:center; padding:10px;">
                                          <h3 style="margin:0; font-size:20px; font-weight:bold;">${photo.Title}</h3>
                                        </div>`}
                      >
                        <CardMedia
                          component="img"
                          image={photo.ImageURL}
                          alt={photo.Title}
                          sx={{
                            width: "100%",
                            maxHeight: 400, 
                            objectFit: "contain", 
                            backgroundColor: "#fff",
                          }}
                        />
                      </a>
                      <CardContent sx={{ textAlign: "center" }}>
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: "bold",
                            fontSize: "1rem",
                            whiteSpace: "normal",
                            wordWrap: "break-word",
                          }}
                        >
                          {photo.Title}
                        </Typography>
                      </CardContent>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </LightGallery>
        )}
      </Container>
    </Box>
  );
};

export default SaccoGallery;
