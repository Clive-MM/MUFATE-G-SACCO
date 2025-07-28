import React, { useEffect, useState } from "react";
import axios from "axios";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Grid,
} from "@mui/material";

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
        background: "linear-gradient(to bottom, #62ee0aff, #64dd17)", // Dark green → bright green
        py: 6,
      }}
    >
      <Container maxWidth="xl">
        {/* Heading */}
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            color: "#FFD700", // Gold heading
            fontWeight: "bold",
            textTransform: "uppercase",
            mb: 4,
            letterSpacing: "1px",
            textShadow: "0 0 6px rgba(255, 215, 0, 0.8)",
            fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
          }}
        >
          SACCO Gallery
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" py={5}>
            <CircularProgress sx={{ color: "#FFD700" }} /> {/* Gold spinner */}
          </Box>
        ) : (
          <LightGallery speed={500} plugins={[]} elementClassNames="custom-gallery">
            <Grid
              container
              spacing={{ xs: 2, sm: 3 }}
              justifyContent="center"
              sx={{ position: "relative" }}
            >
              {photos.map((photo, idx) => (
                <Grid
                  key={idx}
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  data-src={photo.ImageURL}
                  data-sub-html={`<div style="text-align:center;"><h4>${photo.Title}</h4><p>${photo.Description}</p></div>`}
                  style={{ cursor: "pointer" }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      height: 300,
                      borderRadius: 3,
                      overflow: "hidden",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                      backgroundImage: `url(${photo.ImageURL})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      transition: "transform 0.4s ease, box-shadow 0.4s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 12px 30px rgba(100, 221, 23, 0.6)",
                      },
                    }}
                  >
                    {/* Overlay Content */}
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        bgcolor: "rgba(0,0,0,0.6)",
                        p: 2,
                        transition: "background 0.3s ease",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: "bold",
                          fontSize: "1rem",
                          textAlign: "center",
                          color: "#FFD700", // Gold text
                          textShadow: "0px 2px 5px rgba(0,0,0,0.8)",
                        }}
                      >
                        {photo.Title}
                      </Typography>
                    </Box>
                  </Box>
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
