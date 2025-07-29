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
  ImageListItemBar,
  CircularProgress,
  Box,
  useMediaQuery,
  useTheme,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";

const SaccoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const getCols = () => {
    if (isXs) return 1;
    if (isSm) return 2;
    return 3;
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
          <ImageList
            sx={{
              width: "100%",
              maxWidth: "1200px",
              margin: "auto",
            }}
            cols={getCols()}
            gap={16}
          >
            {photos.map((photo, idx) => (
              <motion.div
                key={idx}
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
                    borderRadius: 2,
                    overflow: "hidden",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "scale(1.03)",
                      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  <ImageListItem>
                    <a
                      href={photo.ImageURL}
                      data-sub-html={`<div style="text-align:center; padding:10px;">
                                        <h3 style="margin:0; font-size:20px; font-weight:bold;">${photo.Title}</h3>
                                      </div>`}
                    >
                      <img
                        src={photo.ImageURL}
                        alt={photo.Title}
                        loading="lazy"
                        style={{
                          width: "100%",
                          height: "250px",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </a>

                    <ImageListItemBar
                      title={photo.Title}
                      sx={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)",
                        "& .MuiImageListItemBar-title": {
                          fontWeight: "bold",
                          fontSize: "1rem",
                          whiteSpace: "normal", // ✅ Wrap text fully
                          overflow: "visible",
                          textOverflow: "unset",
                        },
                      }}
                    />
                  </ImageListItem>
                </Paper>
              </motion.div>
            ))}
          </ImageList>
        </LightGallery>
      )}
    </Container>
  );
};

export default SaccoGallery;
