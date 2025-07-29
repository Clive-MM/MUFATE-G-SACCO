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
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Box,
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
    <Container maxWidth="xl" sx={{ py: { xs: 4, sm: 6 } }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontSize: { xs: "1.8rem", md: "2.5rem" },
          fontWeight: "bold",
          color: "#fff",
          mb: 4,
        }}
      >
        📸 MUFATE G SACCO GALLERY
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
                <a
                  href={photo.ImageURL}
                  data-sub-html={`<div style="text-align:center;"><h4>${photo.Title}</h4><p>${photo.Description}</p></div>`}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.03)",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={photo.ImageURL}
                      alt={photo.Title}
                      sx={{
                        width: "100%",
                        height: { xs: 200, sm: 250, md: 300 },
                        objectFit: "cover",
                        borderRadius: "12px 12px 0 0",
                      }}
                    />
                    <CardContent>
                      <Typography
                        variant="subtitle1"
                        align="center"
                        sx={{ fontWeight: 600, color: "#1565c0" }}
                      >
                        {photo.Title}
                      </Typography>
                    </CardContent>
                  </Card>
                </a>
              </Grid>
            ))}
          </Grid>
        </LightGallery>
      )}
    </Container>
  );
};

export default SaccoGallery;
