import React, { useEffect, useState } from "react";
import axios from "axios";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import {
  Container,
  Typography,
  ImageList,
  ImageListItem,
  CircularProgress,
  Box,
  useMediaQuery,
  useTheme
} from "@mui/material";

const SaccoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isMd = useMediaQuery(theme.breakpoints.up("md"));

  // Dynamically set columns based on screen size
  const getCols = () => {
    if (isXs) return 1;
    if (isSm) return 2;
    if (isMd) return 3;
    return 4;
  };

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
          mb: 4
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
          <ImageList
            variant="masonry"
            cols={getCols()}
            gap={12}
            sx={{
              width: "100%",
              maxWidth: "1200px",
              margin: "auto"
            }}
          >
            {photos.map((photo, idx) => (
              <ImageListItem key={idx}>
                <a
                  href={photo.ImageURL}
                  data-sub-html={`<div style="text-align:center;"><h4>${photo.Title}</h4><p>${photo.Description}</p></div>`}
                >
                  <img
                    src={`${photo.ImageURL}`}
                    alt={photo.Title}
                    loading="lazy"
                    style={{
                      borderRadius: "10px",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                      transition: "transform 0.3s ease",
                      width: "100%",
                      display: "block"
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </a>
              </ImageListItem>
            ))}
          </ImageList>
        </LightGallery>
      )}
    </Container>
  );
};

export default SaccoGallery;
