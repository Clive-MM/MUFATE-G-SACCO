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
    <Box
      sx={{
        background: "linear-gradient(135deg, #f9f9f9, #eef5ff)",
        py: { xs: 4, sm: 6 },
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            fontSize: { xs: "1.8rem", md: "2.5rem" },
            fontWeight: "bold",
            color: "#333",
            mb: 4,
            borderBottom: "3px solid #1976d2",
            display: "inline-block",
            px: 2,
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
              gap={20}
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
                      borderRadius: 3,
                      overflow: "hidden",
                      transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.04)",
                        boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.3)",
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

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileHover={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ImageListItemBar
                          title={photo.Title}
                          sx={{
                            background:
                              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 70%, transparent 100%)",
                            "& .MuiImageListItemBar-title": {
                              fontWeight: "bold",
                              fontSize: "1rem",
                              whiteSpace: "normal", // ✅ No cutoff
                              overflow: "visible",
                              textOverflow: "unset",
                            },
                          }}
                        />
                      </motion.div>
                    </ImageListItem>
                  </Paper>
                </motion.div>
              ))}
            </ImageList>
          </LightGallery>
        )}
      </Container>
    </Box>
  );
};

export default SaccoGallery;
